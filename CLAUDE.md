# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

Package manager is **yarn**.

```bash
yarn dev                   # Next dev server on :3000
yarn build                 # production build (Turbopack) + TypeScript check
yarn start                 # serve the production build
yarn lint                  # eslint (flat config)
yarn deploy-production     # next build && scripts/deploy.sh
```

There is no test runner. CRA's `react-scripts test` and the default `App.test.tsx` were removed during the Next migration and nothing replaced them, so `yarn build` (which type-checks) plus `yarn lint` are the only automated gates.

`yarn lint` currently reports ~50 pre-existing problems (`react-hooks/set-state-in-effect`, `react/no-unescaped-entities`, `react-hooks/immutability`). These are inherited CRA-era patterns, not build breakage — Next 16 no longer runs ESLint during `next build`, so they do not block anything. Do not treat a non-zero `yarn lint` exit as a regression you caused; check whether your file is among the reported ones.

Pinned for compatibility, do not bump casually:
- **eslint 9.x** — `eslint-config-next` 16 peers on ESLint 9; ESLint 10 crashes with `scopeManager.addGlobals is not a function`.
- **typescript 5.x** — `typescript-eslint` hard-errors with "does not support TS 7.0".

## Architecture

Next.js 16 (App Router, Turbopack) / React 19 / MUI 9 / Redux. This was migrated from Create React App; the layout of `src/` still reflects that origin, and several compatibility layers exist specifically to avoid rewriting ~200 CRA-era components. Understand those layers before "cleaning them up".

### Directory layout

- `src/app/` — App Router. Routes plus the providers/registries that used to be `index.tsx` + `App.jsx`.
- `src/views/` — the page components. **This was `src/pages/` under CRA and was renamed deliberately**: Next treats `src/pages/` as the Pages Router, which would collide with `src/app/`. Never recreate `src/pages/`.
- `src/components/`, `src/helpers/`, `src/redux/`, `src/lib/`, `src/Layout/` — unchanged from CRA apart from the codemods below.

Imports use the `@/*` → `./src/*` alias (see `tsconfig.json`) alongside the original relative paths.

### Routes

Every route is a thin **server** component in `src/app/<route>/page.jsx` that exports `metadata` and renders a client view from `src/views/`:

```jsx
import AboutUs from "@/views/AboutUs";
export const metadata = { title: "About Us" };
export default function Page() { return <AboutUs />; }
```

Protected routes wrap the view in `<PrivateRoute>` (`src/components/PrivateRoute`), which — as under CRA — only checks that a `token` exists in `localStorage`, with no role check. Because the token is browser-only, `PrivateRoute` renders `null` on the server and during first paint, then redirects to `/login?from=<path>` when absent.

Nearly every component under `src/components/` and `src/views/` carries `"use client"`. Data fetching is still client-side `axios` in `useEffect`; the App Router is providing SSR of markup, not server data loading.

### Compatibility layers (read before refactoring)

**`src/lib/router.jsx`** — a react-router-dom v5 shim. ~49 components still `import { Link, useHistory, useLocation, useParams, Redirect } from "@/lib/router"`, and it maps them onto `next/navigation`. Its `Link` accepts both `to` and `href`, which is why `component={Link} to=...` still works everywhere. Known gap: react-router location *state* has no equivalent, so the post-login "return to where I came from" flow is carried in a `?from=` query param instead.

Because `useLocation` calls `useSearchParams`, **every consumer needs a Suspense boundary**. The root layout wraps `{children}` in one; if you render such a component outside that tree, add your own or the build fails with `missing-suspense-with-csr-bailout`.

**`src/helpers/index.js` — `getBaseURL()`** — used at ~77 call sites to build image URLs, and it must work during SSR. It reads a module global first, then `localStorage`, and **always returns an object** (the CRA version returned `undefined` on a cold cache, which would throw). Seed it with `setBaseURL()`, never by writing `localStorage` directly.

The values come from the API's `/client/urls`. `src/app/layout.jsx` fetches this **on the server** (revalidated hourly) and passes it to `BaseUrlScript` so server-rendered HTML already has correct image URLs. `AppBootstrap` re-fetches it client-side only as a fallback. This replaced CRA's behaviour of blocking the entire UI behind a `<LinearProgress />` until the call returned.

**`src/Layout/index.jsx`** — no longer does anything SEO-related. It used to imperatively rewrite `<title>`, meta and og/twitter tags in `public/index.html`. It now only resets scroll position; its `title`/`description`/`canonical`/`og*` props are accepted but **ignored**. Put page metadata in the route's `metadata` export instead. `public/index.html` is gone; its head lives in `src/app/layout.jsx`.

### Styling

`makeStyles` comes from **`tss-react/mui`**, not MUI. MUI v5 removed JSS `makeStyles`, so all ~103 style files were converted. The API is curried and returns an object:

```js
const useStyles = makeStyles()((theme) => ({ ... }));   // note the extra ()
const { classes } = useStyles();                        // destructure, not `const classes =`
```

`src/app/ThemeRegistry.jsx` registers **two** emotion caches — `mui` and `tss`. Both are required: without the `tss` one, every `makeStyles` rule flashes unstyled before hydration. `styled-components` is still used by `globalStyles.ts` and four `*.styles.js` files, with its own SSR registry.

`src/components/ui/Theme.js` is MUI v9 (`components.styleOverrides`, not v4 `overrides`) and keeps non-standard keys the app spreads into styles (`theme.typography.colors`, `theme.typography.darkButton`). It also defines an `xl` breakpoint that v4 did not need. `globalStyles.ts` sets `html { font-size: 62.5% }`, so `1rem` = 10px throughout.

**Grid uses the v2 API.** MUI v9 removed `GridLegacy`, so there is no `item`/`xs` prop — it is `<Grid size={{ xs: 12, sm: 6 }}>`. All 52 Grid files were converted.

### State and auth

`src/redux/store.js` exports `makeStore()` (Redux Toolkit `configureStore`), created per-request in a ref by `src/app/StoreProvider.jsx` so state cannot leak between concurrent server renders. The reducers themselves are the original plain switch reducers with inline string action types (`dispatch({ type: "SET_USER", payload })`) — there are still no action creators or thunks.

JWT-in-`localStorage`, no axios interceptors. The stored token includes the `Bearer ` prefix, hence `token.split(" ")[1]` before decoding. `jwt-decode` v4 is a named export; files alias it (`import { jwtDecode as jwt_decode }`) to keep call sites unchanged. Authenticated requests pass `headers: { Authorization: user?.token }`; on 401 call `expiredLoginTime()`.

Firebase (`src/database/index.ts`) uses the modular v12 SDK and is guarded with `getApps().length` because modules evaluate more than once. Social login uses `@react-oauth/google` and `@greatsumini/react-facebook-login` — the originals were React-17-only. The request bodies to `/auth/google_login` and `/auth/facebook_login` are unchanged (Google's `credential` is the same ID token the old library called `tokenId`).

Environment variables are `NEXT_PUBLIC_*` in `.env.local` (CRA's `REACT_APP_*` in a committed `.env`). `.env.local` is gitignored; note the previously committed values remain in git history.

### Deployment

`output: "standalone"` in `next.config.mjs`. **The app server-renders and can no longer be served as static files by nginx.** The droplet needs Node 20+, a process manager, and nginx reverse-proxying to the Node process — see the header comment in `scripts/deploy.sh`.
