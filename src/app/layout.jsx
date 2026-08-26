import { imageBaseUrls } from "@/server/unsplash";
import { Roboto } from "next/font/google";
import { Suspense } from "react";
import "react-toastify/dist/ReactToastify.css";
import "slick-carousel/slick/slick-theme.css";
import "slick-carousel/slick/slick.css";
import { setBaseURL } from "../helpers";
import AppBootstrap from "./AppBootstrap";
import AppToaster from "./AppToaster";
import BaseUrlScript from "./BaseUrlScript";
import "./globals.css";
import StoreProvider from "./StoreProvider";
import ThemeRegistry from "./ThemeRegistry";

const roboto = Roboto({
  weight: ["300", "400", "500", "700"],
  subsets: ["latin"],
  display: "swap",
  variable: "--font-roboto",
});

const SITE_URL = "https://piktask.com";
const SITE_DESCRIPTION =
  "Piktask provides millions of stock photos, creatives, backgrounds and illustrations for free to fullfil your graphic design needs.";

/**
 * Replaces the hand-maintained <head> of CRA's public/index.html. Pages add
 * their own title/description by exporting `metadata` from their page.jsx,
 * which is what src/Layout used to do imperatively via document.querySelector.
 */
export const metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Free vectors, stock photos, & PSD download | Piktask",
    template: "%s | Piktask",
  },
  description: SITE_DESCRIPTION,
  alternates: { canonical: "/" },
  manifest: "/manifest.json",
  icons: {
    icon: "/favicon.ico",
    apple: "/logo192.png",
  },
  openGraph: {
    title: "Free vectors, stock photos, & PSD download | Piktask",
    description: SITE_DESCRIPTION,
    url: SITE_URL,
    siteName: "Piktaskltd",
    type: "article",
    images: [{ url: "/logo512.png", alt: "Free photos" }],
  },
  twitter: {
    card: "summary_large_image",
    site: "@piktask",
    creator: "@piktask",
    title: "Download photos for free",
    description: "Discover millions of free-copyright photos, mockups, vectors on Piktask",
    images: ["https://piktask.com/media_images/company/piktak_logo.jpg"],
  },
  other: {
    "fb:admins": "104711752018788",
    lang: "en",
  },
};

export const viewport = {
  themeColor: "#000000",
  width: "device-width",
  initialScale: 1,
};

const organizationSchema = {
  "@context": "http://schema.org",
  "@type": "Organization",
  logo: "https://piktask.com/media_images/company/piktask.jpg",
  name: "Piktask",
  sameAs: [
    "https://www.facebook.com/piktaskltd/",
    "https://dribbble.com/piktask/",
    "https://www.behance.net/piktask/",
    "https://www.linkedin.com/company/piktask/",
    "https://www.pinterest.es/piktaskltd/",
    "https://www.instagram.com/piktaskltd/",
    "https://www.youtube.com/channel/UCoZMhCh5CVHIjBbQhfZ_k0A",
  ],
  url: "https://www.piktask.com",
};

const websiteSchema = {
  "@context": "http://schema.org",
  "@type": "WebSite",
  name: "Piktask",
  url: "https://www.piktask.com/",
  potentialAction: {
    "@type": "SearchAction",
    target: "https://www.piktask.com/search/title={search_term_string}",
    "query-input": "required name=search_term_string",
  },
};

/**
 * Base URLs the app prefixes onto image paths.
 *
 * Images now come from Unsplash, which returns absolute URLs, so every base is
 * an empty string and the concatenations in the components are a no-op. This is
 * read directly rather than fetched: NEXT_PUBLIC_API_URL is the relative "/api",
 * which a server-side fetch cannot resolve.
 */
function fetchImageBaseUrls() {
  return imageBaseUrls();
}

export default function RootLayout({ children }) {
  const urls = fetchImageBaseUrls();

  // Make the URLs resolvable by getBaseURL() during this server render.
  if (urls) setBaseURL(urls);

  return (
    <html lang="en" className={roboto.variable}>
      {/* Browser extensions (password managers, colour pickers) commonly add
          attributes to <body> before React hydrates, which otherwise reports a
          hydration mismatch that no application change can fix. */}
      <body suppressHydrationWarning suppressContentEditableWarning>
        <ThemeRegistry>
          <StoreProvider>
            <BaseUrlScript urls={urls} />
            <AppBootstrap />
            <AppToaster />
            {/* useSearchParams() (via the react-router compatibility layer)
                requires a suspense boundary above every consumer. */}
            <Suspense fallback={null}>
              <div className="main-content">{children}</div>
            </Suspense>
          </StoreProvider>
        </ThemeRegistry>

        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
        />
        {/* Target that helpers/imageObjSchema() writes per-image JSON-LD into. */}
        <script data-test="image-object" type="application/ld+json" />
      </body>
    </html>
  );
}
