"use client";

import { CacheProvider } from "@emotion/react";
import { CssBaseline } from "@mui/material";
import { ThemeProvider } from "@mui/material/styles";
import { TssCacheProvider } from "tss-react";
import { NextAppDirEmotionCacheProvider } from "tss-react/next/appDir";
import theme from "../components/ui/Theme";

/**
 * Emotion/tss SSR plumbing for the App Router.
 *
 * Two separate caches are registered so that styles rendered on the server are
 * flushed into the streamed HTML instead of only being applied after hydration:
 *   - "mui" -> the emotion cache MUI's own components render through
 *   - "tss" -> the cache tss-react's makeStyles() rules render through
 *
 * Without the second provider every makeStyles rule in the app would flash
 * unstyled on first paint.
 */
export default function ThemeRegistry({ children }) {
  return (
    <NextAppDirEmotionCacheProvider options={{ key: "mui" }} CacheProvider={CacheProvider}>
      <NextAppDirEmotionCacheProvider options={{ key: "tss" }} CacheProvider={TssCacheProvider}>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          {children}
        </ThemeProvider>
      </NextAppDirEmotionCacheProvider>
    </NextAppDirEmotionCacheProvider>
  );
}
