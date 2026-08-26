"use client";

import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

/**
 * Route guard for the /contributor/* and /user/* trees.
 *
 * Same rule as the CRA version — presence of a token in localStorage, no role
 * check. It is a wrapper rather than a <Route> now: an unauthenticated visitor
 * is redirected to /login with the current path in `?from=` so the login flow
 * can send them back (previously carried in react-router location state).
 */
export default function PrivateRoute({ children }) {
  const router = useRouter();
  const pathname = usePathname();
  const [status, setStatus] = useState("checking");

  useEffect(() => {
    const token = window.localStorage.getItem("token");

    if (token) {
      setStatus("allowed");
    } else {
      setStatus("denied");
      router.replace(`/login?from=${encodeURIComponent(pathname)}`);
    }
  }, [router, pathname]);

  // The token only exists in the browser, so nothing protected may be rendered
  // on the server or during the first paint.
  if (status !== "allowed") return null;

  return <>{children}</>;
}
