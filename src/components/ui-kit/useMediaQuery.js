"use client";

import { useEffect, useState } from "react";

/**
 * MUI's useMediaQuery. Ant offers Grid.useBreakpoint(), but that is keyed to
 * Ant's breakpoint scale; call sites here pass explicit queries built from the
 * project's own theme, so the raw matchMedia behaviour is what is needed.
 *
 * Returns false on the server and for the first client render so the markup
 * matches during hydration, exactly as MUI's default (noSsr: false) did.
 */
export function useMediaQuery(query) {
  const q = typeof query === "function" ? query() : query;
  const [matches, setMatches] = useState(false);

  useEffect(() => {
    if (!q || typeof window === "undefined") return undefined;

    const list = window.matchMedia(q);
    const update = () => setMatches(list.matches);

    update();
    list.addEventListener("change", update);
    return () => list.removeEventListener("change", update);
  }, [q]);

  return matches;
}

export default useMediaQuery;
