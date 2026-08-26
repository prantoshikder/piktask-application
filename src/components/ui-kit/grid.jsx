"use client";

import { forwardRef } from "react";

/**
 * MUI Grid v2 replacement.
 *
 * Ant's Row/Col are a 24-column system keyed to Ant's own breakpoints
 * (sm = 576px), while this project is a 12-column layout on the theme's
 * breakpoints (sm = 960px). Using Row/Col would silently reflow all 52 grid
 * files, so the MUI behaviour is reproduced exactly instead: widths are handed
 * to CSS custom properties and applied by the media queries in globals.css.
 */

const SPACING_UNIT = 8;
const KEYS = ["xs", "sm", "md", "lg", "xl"];

const cx = (...parts) => parts.filter(Boolean).join(" ");

const widthFor = (value) => {
  if (value === true || value === "auto") return "auto";
  if (value === "grow") return "0";
  const n = Number(value);
  if (!Number.isFinite(n)) return undefined;
  return `${(n / 12) * 100}%`;
};

export const Grid = forwardRef(function Grid(
  {
    container = false,
    size,
    spacing,
    rowSpacing,
    columnSpacing,
    direction,
    justifyContent,
    alignItems,
    wrap,
    offset,
    className,
    style,
    children,
    ...rest
  },
  ref
) {
  const vars = {};

  if (container) {
    const col = (columnSpacing ?? spacing ?? 0) * SPACING_UNIT;
    const row = (rowSpacing ?? spacing ?? 0) * SPACING_UNIT;
    vars["--pk-col-gap"] = `${col}px`;
    vars["--pk-row-gap"] = `${row}px`;
  }

  if (size !== undefined) {
    if (typeof size === "object") {
      for (const key of KEYS) {
        const w = widthFor(size[key]);
        if (w !== undefined) vars[`--pk-${key}`] = w;
      }
    } else {
      const w = widthFor(size);
      if (w !== undefined) vars["--pk-xs"] = w;
    }
  }

  const flow = {
    ...(direction ? { flexDirection: direction === "column" ? "column" : direction } : null),
    ...(justifyContent ? { justifyContent } : null),
    ...(alignItems ? { alignItems } : null),
    ...(wrap ? { flexWrap: wrap } : null),
  };

  return (
    <div
      ref={ref}
      className={cx(container ? "pk-grid-container" : null, size !== undefined ? "pk-grid-item" : null, className)}
      style={{ ...vars, ...flow, ...style }}
      {...rest}
    >
      {children}
    </div>
  );
});

export default Grid;
