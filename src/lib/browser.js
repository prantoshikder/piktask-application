"use client";

import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

const SITE_ORIGIN = "https://piktask.com";

/**
 * SSR-safe replacement for reading `window.location.href` during render.
 *
 * On the server (and on the very first client render, so hydration matches)
 * this builds the URL from the canonical site origin. Once mounted it switches
 * to the real origin, so it stays correct on localhost and staging too.
 */
export const useCurrentUrl = () => {
  const pathname = usePathname();
  const [origin, setOrigin] = useState(SITE_ORIGIN);

  useEffect(() => {
    setOrigin(window.location.origin);
  }, []);

  return `${origin}${pathname}`;
};

export { usePathname };
