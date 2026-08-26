"use client";

/**
 * Drop-in replacement for the `@mui/material` surface this app used.
 *
 * Interactive components are Ant Design underneath; layout, text, list, table
 * and grid primitives are plain HTML, because Ant's equivalents are data-driven
 * (`items`/`columns`/`dataSource`) and would have changed both the markup and
 * the design. Every component forwards `className`, so the Tailwind classes
 * that carry the design keep working.
 */

export * from "./primitives";
export * from "./antd";
export { Grid } from "./grid";
export { useMediaQuery } from "./useMediaQuery";
