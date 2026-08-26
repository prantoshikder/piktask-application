"use client";

import NextLink from "next/link";
import { useParams as useNextParams, usePathname, useRouter, useSearchParams } from "next/navigation";
import { forwardRef, useEffect, useMemo } from "react";

/**
 * react-router-dom v5 compatibility layer.
 *
 * The migration replaced react-router with the App Router's file-based routes,
 * but ~49 components consume the v5 hook/component API. Rather than rewrite all
 * of them, they now import the same names from here.
 *
 * Known gap: react-router's location *state* has no App Router equivalent.
 * The one thing the app used it for was the post-login "send me back where I
 * came from" redirect, which is now carried in a `?from=` query parameter
 * instead (see PrivateRoute).
 */

/** react-router `<Link to>` and next/link `<Link href>` both work. */
export const Link = forwardRef(function Link({ to, href, replace, innerRef, ...rest }, ref) {
  const target = to ?? href ?? "#";

  return <NextLink ref={innerRef ?? ref} href={target} replace={replace} {...rest} />;
});

export const NavLink = Link;

/** v5 useHistory(), backed by the App Router. */
export const useHistory = () => {
  const router = useRouter();

  return useMemo(
    () => ({
      push: (target) => router.push(toHref(target)),
      replace: (target) => router.replace(toHref(target)),
      goBack: () => router.back(),
      goForward: () => router.forward(),
      go: (delta) => (delta < 0 ? router.back() : router.forward()),
      block: () => () => {},
      listen: () => () => {},
    }),
    [router]
  );
};

/** v5 useLocation(). `state.from` is reconstructed from `?from=`. */
export const useLocation = () => {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  return useMemo(() => {
    const search = searchParams?.toString() ?? "";
    const from = searchParams?.get("from");

    return {
      pathname,
      search: search ? `?${search}` : "",
      hash: "",
      state: from ? { from: { pathname: from } } : undefined,
      key: "",
    };
  }, [pathname, searchParams]);
};

export const useParams = useNextParams;

export const useRouteMatch = () => {
  const pathname = usePathname();
  return { path: pathname, url: pathname, params: {}, isExact: true };
};

/** v5 `<Redirect to="..." />`. */
export const Redirect = ({ to, push = false }) => {
  const router = useRouter();
  const target = toHref(to);

  useEffect(() => {
    if (push) router.push(target);
    else router.replace(target);
  }, [router, target, push]);

  return null;
};

/** Accepts both a string and v5's `{ pathname, search, state }` object. */
function toHref(target) {
  if (!target) return "/";
  if (typeof target === "string") return target;

  const { pathname = "/", search = "" } = target;
  return `${pathname}${search}`;
}

export { useRouter };
