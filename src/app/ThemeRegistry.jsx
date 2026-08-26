"use client";

import { StyleProvider } from "@ant-design/cssinjs";
import { AntdRegistry } from "@ant-design/nextjs-registry";
import { ConfigProvider } from "antd";
import theme from "../components/ui/Theme";

/**
 * Ant Design setup.
 *
 * - AntdRegistry flushes Ant's server-rendered styles into the streamed HTML.
 * - StyleProvider `layer` wraps everything Ant generates in `@layer antd`, which
 *   globals.css declares before Tailwind's layers. Layered CSS always loses to
 *   unlayered/later-layer CSS, so the Tailwind classes on each call site keep
 *   winning over Ant's component styles regardless of selector specificity.
 *
 * Ant's `reset.css` is deliberately not imported: Tailwind's preflight plus the
 * base rules in globals.css already own the element reset, and loading both
 * would fight over the existing design.
 */
export default function ThemeRegistry({ children }) {
  return (
    <AntdRegistry>
      <StyleProvider layer>
        <ConfigProvider theme={theme}>{children}</ConfigProvider>
      </StyleProvider>
    </AntdRegistry>
  );
}
