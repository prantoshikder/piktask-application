# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

Package manager is **yarn**.

```bash
yarn dev                   # Next dev server on :3000
yarn build                 # production build (Turbopack) + TypeScript check
yarn start                 # stage static assets + run the standalone server
yarn lint                  # eslint (flat config)
yarn deploy-production     # next build && scripts/deploy.sh
```

There is no test runner. CRA's `react-scripts test` and the default `App.test.tsx` were removed during the Next migration and nothing replaced them, so `yarn build` (which type-checks) plus `yarn lint` are the only automated gates.

`yarn lint` currently reports ~50 pre-existing problems (`react-hooks/set-state-in-effect`, `react/no-unescaped-entities`, `react-hooks/immutability`). These are inherited CRA-era patterns, not build breakage — Next 16 no longer runs ESLint during `next build`, so they do not block anything. Do not treat a non-zero `yarn lint` exit as a regression you caused; check whether your file is among the reported ones.

`yarn start` is not `next start`: `output: "standalone"` makes `next start` refuse to run, so the script copies `.next/static` and `public/` next to the emitted server and runs `node .next/standalone/server.js`.

Pinned for compatibility, do not bump casually:
- **eslint 9.x** — `eslint-config-next` 16 peers on ESLint 9; ESLint 10 crashes with `scopeManager.addGlobals is not a function`.
- **typescript 5.x** — `typescript-eslint` hard-errors with "does not support TS 7.0".

## Architecture

Next.js 16 (App Router, Turbopack) / React 19 / Ant Design 6 / Tailwind 4 / Redux. This was migrated from Create React App; the layout of `src/` still reflects that origin, and several compatibility layers exist specifically to avoid rewriting ~200 CRA-era components. Understand those layers before "cleaning them up".

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

**Tailwind CSS v4 is the only styling system for application code.** The CRA-era
`makeStyles`/tss-react and styled-components layers were removed entirely: 87
style files (~8,900 lines, 865 rules) were translated into Tailwind classes on
the elements themselves. There is exactly one stylesheet, `src/app/globals.css`,
and there are no `*.styles.js` files. Do not reintroduce `makeStyles`.

The translation was mechanical and deliberately faithful rather than idiomatic,
so expect arbitrary values everywhere — `text-[1.4rem]`, `bg-[#143340]`,
`max-[959.95px]:...`, `[&_img]:w-[15rem]`, `[transition:all_0.3s_linear]`. That
is intentional: it reproduces the original design exactly. Anything Tailwind has
no utility for uses arbitrary-property syntax (`[border:1px_solid_#ccc]`).

Two things in `globals.css` are load-bearing:

- `html { font-size: 62.5% }` — every rem value in the app was authored against
  it (`1.4rem` === 14px). Removing it rescales the entire UI.
- `@layer antd;` declared **before** `@import "tailwindcss"`. `ThemeRegistry`
  wraps Ant in `StyleProvider layer`, which puts everything Ant generates in that
  layer. Because the layer is declared first it has the lowest priority, so a
  Tailwind utility beats Ant's own component styles even when Ant's selector is
  more specific. Delete the layer statement and Ant silently wins again.

Ant Design supplies the interactive components; Ant's `reset.css` is deliberately
**not** imported, because Tailwind's preflight plus the base rules here already
own the element reset and loading both would fight over the design.

Patterns worth knowing:

- **Parent-hover effects** use `group` / `group-hover:`. These were MUI v4 JSS
  `$ruleName` selectors, which stopped working outside JSS.
- **Responsive background images** are set as CSS custom properties in a `style`
  prop and consumed by `bg-[image:var(--x)]` with `max-[768.95px]:` /
  `max-[575.95px]:` variants — a bundled asset URL cannot be a static class.
- **Grid** is `<Grid container spacing={3}>` / `<Grid size={{ xs: 12, sm: 6 }}>`,
  a 12-column system on this project's breakpoints. See the ui-kit section below.

### Known dead CSS

`src/components/ui/Blog/index.jsx` carries `[@media(max-width:768)]:...`. The
media query is invalid CSS - a length needs a unit - so it never matches and the
rule never applies. It was equally dead in the CRA source (`@media (max-width: 768)`),
and was left as-is to keep rendering identical. Adding `px` would silently change
the layout, so treat it as an intentional decision, not an oversight.

### Image data comes from Unsplash

`NEXT_PUBLIC_API_URL` is `/api`, which points at this app's own route handlers in
`src/app/api/` rather than the original `piktask.com/api` backend (kept commented
out in `.env.local`). Those handlers call Unsplash via `src/server/unsplash.js`
and map its responses onto the payload shape the components were written
against - `image_id`, `preview`, `avatar`, `total_downloads`, and so on - so no
component needed rewriting.

Implemented: `/client/urls`, `/images`, `/images/:id`, `/images/:id/related_image`,
`/categories`, `/categories/popular`, `/categories/:slug`, `/client/search`
(accepts `?title=` or `?tag=`), `/client/search/popular_keyword`, `/contributor/top`.
Unsplash topics stand in for categories and photographers for contributors.

Everything else - auth, uploads, earnings, withdrawals, favourites, blogs - has
no Unsplash equivalent and is answered by the catch-all `src/app/api/[...path]`
with `{ status: false }` and HTTP 501, so those screens show their empty state
instead of throwing a network error.

Things to respect when touching this:

- **`UNSPLASH_ACCESS_KEY` is server-only.** It has no `NEXT_PUBLIC_` prefix on
  purpose; adding one would ship the key to the browser. `src/server/unsplash.js`
  imports `server-only` to enforce that.
- **Rate limit.** Unsplash Demo apps allow **50 requests/hour**. Every fetch sets
  `next: { revalidate: 3600 }`; removing that caching will exhaust the quota in
  minutes. A 403 from Unsplash is surfaced as HTTP 429.
- **Base URLs are empty by design.** `/client/urls` returns empty strings because
  Unsplash serves absolute URLs, so the `getBaseURL()` concatenations in the
  components become no-ops. Use `joinImageUrl(base, value)` from `src/helpers`
  when joining - it returns absolute values untouched.
- **Attribution is not wired into the UI yet.** The payloads carry `attribution`
  and `unsplash_url`, but Unsplash's API terms require a visible photographer
  credit linking back to their profile and to Unsplash, and require calling the
  photo's `download_location` when a user downloads. Both are outstanding.

### The ui-kit (there is no MUI)

MUI was removed. Nothing imports `@mui/*`, `@emotion/*` or `tss-react` any more.
Components come from **`@/components/ui-kit`**, which presents the MUI prop
surface the ~106 call sites were written against, so the JSX did not have to be
rewritten. Import from the kit, never from `antd` directly, unless you are adding
something genuinely new.

The kit is split by what Ant can actually replace:

- `ui-kit/antd.jsx` — **real Ant Design components** behind MUI-shaped props:
  Button, IconButton, Input, TextField, TextareaAutosize, Select, Checkbox,
  Radio/RadioGroup, Switch, Autocomplete, Tooltip, Skeleton, Dialog (Ant Modal),
  Drawer, CircularProgress (Spin), LinearProgress (Progress). Prop translation
  happens here — e.g. MUI hands `onChange` an event, Ant hands it a value.
- `ui-kit/primitives.jsx` — **plain HTML**: Typography, Container, Box, Paper,
  Card/CardContent/CardMedia, List/ListItem, Table/TableRow/TableCell, AppBar,
  Toolbar, Collapse, Grow. Ant's equivalents are data-driven (`items`,
  `columns`, `dataSource`) rather than compositional, so using them would have
  changed both the markup and the design. These render the tag and pass
  `className` through.
- `ui-kit/grid.jsx` + the `pk-grid-*` rules in `globals.css` — a **12-column**
  grid on this project's breakpoints (xs 480, sm 960, md 1280, lg 1540, xl 1920).
  Ant's Row/Col are 24-column on Ant's own scale (sm = 576), which would have
  reflowed all 52 grid files. Widths are passed as `--pk-<breakpoint>` custom
  properties and applied by media queries.
- `ui-kit/useMediaQuery.js` — raw `matchMedia`; call sites pass explicit query
  strings, and Ant's `Grid.useBreakpoint()` is keyed to Ant's scale.

Icons are `@ant-design/icons`, aliased at the import so call-site names are
unchanged (`import { CloseOutlined as CloseIcon } from "@ant-design/icons"`).

`src/components/ui/Theme.js` is now an **Ant `ConfigProvider` theme** (tokens
only: colours, font, and screen sizes matching the project breakpoints). It no
longer carries typography or spacing — Tailwind owns those.

**Styling hooks.** The Tailwind classes used to reach into MUI's internals
(`[&>.MuiAppBar-colorPrimary]:bg-[#001c30]`, `[&_.MuiSvgIcon-root]`, ...). Those
class names no longer exist, so the kit exposes stable ones and all 113 selectors
were remapped:

| was | now | on |
| --- | --- | --- |
| `.MuiAppBar-colorPrimary` | `.pk-appbar` | AppBar |
| `.MuiSvgIcon-root` | `.anticon` | Ant icons |
| `.MuiCardContent-root` | `.pk-card-content` | CardContent |
| `.MuiTabs-flexContainer` | `.pk-tabs` | Tabs |
| `.MuiFormControlLabel-label` | `.pk-form-label` | FormControlLabel |
| `.MuiListItem-root.Mui-selected` | `.pk-selected` | ListItem |
| `.MuiOutlinedInput-input` | `.ant-input` | Input |
| `.MuiDialog-paperWidthSm` | `.ant-modal-content` | Dialog |

Renaming or removing those hook classes silently breaks styling somewhere - the
header background was exactly this failure. The 75 `.MuiInputLabel-*` rules were
**deleted**, not remapped: they animated MUI's floating label, and Ant renders a
static label above the field.

**Baseline geometry.** `globals.css` `@layer components` restores what MUI
provided and Ant does not: `.ant-btn { height: auto }` (Ant pins buttons to a
32px control height, which clipped labels out of their pill), plus `.pk-button`
and `.pk-tab` padding — the latter is what spaces the header nav apart.

Props that existed only to drive MUI's own styling (`variant`, `disableRipple`,
`elevation`, `color`) are accepted and dropped by the kit. If you see a React
"does not recognize the X prop on a DOM element" warning, a kit component is
missing a prop from its destructure.

### Static assets

`import logo from "./logo.png"` returns a **StaticImageData object**, not a URL
string as it did under CRA. Always use `.src` when feeding a plain DOM attribute
or CSS: `<img src={logo.src}>`, `` `url(${banner.src})` ``. Passing the bare
object renders `src="[object Object]"`. (`next/image` is the exception — it wants
the object — but the app does not currently use it.)

### State and auth

`src/redux/store.js` exports `makeStore()` (Redux Toolkit `configureStore`), created per-request in a ref by `src/app/StoreProvider.jsx` so state cannot leak between concurrent server renders. The reducers themselves are the original plain switch reducers with inline string action types (`dispatch({ type: "SET_USER", payload })`) — there are still no action creators or thunks.

JWT-in-`localStorage`, no axios interceptors. The stored token includes the `Bearer ` prefix, hence `token.split(" ")[1]` before decoding. `jwt-decode` v4 is a named export; files alias it (`import { jwtDecode as jwt_decode }`) to keep call sites unchanged. Authenticated requests pass `headers: { Authorization: user?.token }`; on 401 call `expiredLoginTime()`.

Firebase (`src/database/index.ts`) uses the modular v12 SDK and is guarded with `getApps().length` because modules evaluate more than once. Social login uses `@react-oauth/google` and `@greatsumini/react-facebook-login` — the originals were React-17-only. The request bodies to `/auth/google_login` and `/auth/facebook_login` are unchanged (Google's `credential` is the same ID token the old library called `tokenId`).

Environment variables are `NEXT_PUBLIC_*` in `.env.local` (CRA's `REACT_APP_*` in a committed `.env`). `.env.local` is gitignored; note the previously committed values remain in git history.

### Deployment

`output: "standalone"` in `next.config.mjs`. **The app server-renders and can no longer be served as static files by nginx.** The droplet needs Node 20+, a process manager, and nginx reverse-proxying to the Node process — see the header comment in `scripts/deploy.sh`.

<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->
