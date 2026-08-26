"use client";

import { useEffect } from "react";

/**
 * Page shell.
 *
 * Under CRA this component imperatively rewrote <title>, the meta description,
 * canonical link and all og:/twitter: tags in public/index.html on mount. Next
 * owns document head now: each route exports `metadata` from its page.jsx, so
 * the SEO props below are accepted (to avoid touching ~30 call sites) but no
 * longer do anything. All that remains is the scroll-reset on navigation.
 *
 * When adding a page, put its title/description in the route's `metadata`
 * export rather than passing them here.
 */
const Layout = (props) => {
  const {
    title,
    description = "",
    keywords = "",
    author = "",
    children,
    canonical,
    ogType,
    ogUrl,
    ogImage,
    twitterImg,
    ...others
  } = props;

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return <div {...others}>{children}</div>;
};

export default Layout;
