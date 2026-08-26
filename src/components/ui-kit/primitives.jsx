"use client";

import { forwardRef } from "react";

/**
 * Layout and text primitives.
 *
 * These replace the MUI components that Ant Design has no equivalent for, or
 * whose Ant equivalent is data-driven (List, Table, Tabs take `items`/`columns`
 * rather than JSX children) and would therefore change the markup and the
 * design. They render plain HTML and pass `className` straight through, so the
 * Tailwind classes that carry the design keep working untouched.
 *
 * Props that only existed to drive MUI's own styling are accepted and dropped.
 */

const cx = (...parts) => parts.filter(Boolean).join(" ");

/** MUI's polymorphic `component` prop, e.g. <Button component={Link} to="/x">. */
function resolve(component, fallback) {
  return component || fallback;
}

/* ------------------------------------------------------------------ layout */

export const Box = forwardRef(function Box(
  { component, className, children, my, mx, mt, mb, pt, pb, p, width, height, style, ...rest },
  ref
) {
  const Tag = resolve(component, "div");
  const spacing = {
    ...(my !== undefined ? { marginTop: `${my * 8}px`, marginBottom: `${my * 8}px` } : null),
    ...(mx !== undefined ? { marginLeft: `${mx * 8}px`, marginRight: `${mx * 8}px` } : null),
    ...(mt !== undefined ? { marginTop: `${mt * 8}px` } : null),
    ...(mb !== undefined ? { marginBottom: `${mb * 8}px` } : null),
    ...(pt !== undefined ? { paddingTop: `${pt * 8}px` } : null),
    ...(pb !== undefined ? { paddingBottom: `${pb * 8}px` } : null),
    ...(p !== undefined ? { padding: `${p * 8}px` } : null),
    ...(width !== undefined ? { width } : null),
    ...(height !== undefined ? { height } : null),
  };
  return (
    <Tag ref={ref} className={className} style={{ ...spacing, ...style }} {...rest}>
      {children}
    </Tag>
  );
});

/**
 * MUI's Container: centred, horizontally padded, capped width.
 * The cap matches the project theme's `lg` breakpoint (1540px), which is what
 * MUI's default maxWidth="lg" resolved to here.
 */
export const Container = forwardRef(function Container(
  { component, className, children, maxWidth, disableGutters, fixed, ...rest },
  ref
) {
  const Tag = resolve(component, "div");
  return (
    <Tag
      ref={ref}
      className={cx("w-full mx-auto max-w-[1540px]", !disableGutters && "px-[1.6rem]", className)}
      {...rest}
    >
      {children}
    </Tag>
  );
});

export const Paper = forwardRef(function Paper(
  { component, className, children, elevation, square, variant, ...rest },
  ref
) {
  const Tag = resolve(component, "div");
  return (
    <Tag ref={ref} className={cx("bg-white", elevation !== 0 && "shadow-sm", className)} {...rest}>
      {children}
    </Tag>
  );
});

export const AppBar = forwardRef(function AppBar({ className, children, position, color, ...rest }, ref) {
  const positions = { fixed: "fixed top-0 left-0 right-0", absolute: "absolute", sticky: "sticky top-0", static: "static", relative: "relative" };
  return (
    <header ref={ref} className={cx("pk-appbar w-full z-[100]", positions[position] || "static", className)} {...rest}>
      {children}
    </header>
  );
});

export const Toolbar = forwardRef(function Toolbar({ className, children, disableGutters, variant, ...rest }, ref) {
  return (
    <div ref={ref} className={cx("flex items-center", className)} {...rest}>
      {children}
    </div>
  );
});

/* -------------------------------------------------------------------- text */

const HEADINGS = { h1: "h1", h2: "h2", h3: "h3", h4: "h4", h5: "h5", h6: "h6", subtitle1: "h6", subtitle2: "h6" };

/**
 * MUI Typography. Ant's Typography.Title injects its own margins and font
 * sizes, which would fight the Tailwind classes, so this renders the plain tag.
 */
export const Typography = forwardRef(function Typography(
  { component, variant = "body1", className, children, gutterBottom, noWrap, align, color, display, paragraph, ...rest },
  ref
) {
  const Tag = resolve(component, HEADINGS[variant] || (paragraph ? "p" : "p"));
  return (
    <Tag
      ref={ref}
      className={cx(noWrap && "truncate", align && `text-${align}`, gutterBottom && "mb-[0.35em]", className)}
      {...rest}
    >
      {children}
    </Tag>
  );
});

/* -------------------------------------------------------------------- card */

export const Card = forwardRef(function Card({ component, className, children, elevation, raised, ...rest }, ref) {
  const Tag = resolve(component, "div");
  return (
    <Tag ref={ref} className={cx("bg-white overflow-hidden", className)} {...rest}>
      {children}
    </Tag>
  );
});

export const CardContent = forwardRef(function CardContent({ component, className, children, ...rest }, ref) {
  const Tag = resolve(component, "div");
  return (
    <Tag ref={ref} className={cx("pk-card-content", className)} {...rest}>
      {children}
    </Tag>
  );
});

export const CardMedia = forwardRef(function CardMedia(
  { component, className, children, image, src, title, alt, ...rest },
  ref
) {
  const Tag = resolve(component, "div");
  if (Tag === "img") {
    return <img ref={ref} className={className} src={src || image} alt={alt || title || ""} {...rest} />;
  }
  return (
    <Tag
      ref={ref}
      className={cx("bg-cover bg-center bg-no-repeat", className)}
      style={image ? { backgroundImage: `url(${image})` } : undefined}
      {...rest}
    >
      {children}
    </Tag>
  );
});

/* -------------------------------------------------------------------- list */

export const List = forwardRef(function List({ component, className, children, disablePadding, dense, ...rest }, ref) {
  const Tag = resolve(component, "ul");
  return (
    <Tag ref={ref} className={cx("list-none", className)} {...rest}>
      {children}
    </Tag>
  );
});

export const MenuList = List;

export const ListItem = forwardRef(function ListItem(
  { component, className, children, button, selected, disableGutters, dense, divider, alignItems, ...rest },
  ref
) {
  const Tag = resolve(component, "li");
  return (
    <Tag
      ref={ref}
      className={cx("flex items-center w-full", button && "cursor-pointer", selected && "pk-selected", className)}
      {...rest}
    >
      {children}
    </Tag>
  );
});

export const ListItemText = forwardRef(function ListItemText({ className, children, primary, secondary, ...rest }, ref) {
  return (
    <div ref={ref} className={cx("flex-1 min-w-0", className)} {...rest}>
      {primary !== undefined ? <span>{primary}</span> : children}
      {secondary !== undefined && <span className="block">{secondary}</span>}
    </div>
  );
});

export const ListItemIcon = forwardRef(function ListItemIcon({ className, children, ...rest }, ref) {
  return (
    <div ref={ref} className={cx("inline-flex shrink-0", className)} {...rest}>
      {children}
    </div>
  );
});

/* ------------------------------------------------------------------- table */

export const TableContainer = forwardRef(function TableContainer({ component, className, children, ...rest }, ref) {
  const Tag = resolve(component, "div");
  return (
    <Tag ref={ref} className={cx("w-full overflow-x-auto", className)} {...rest}>
      {children}
    </Tag>
  );
});

export const Table = forwardRef(function Table({ className, children, size, ...rest }, ref) {
  return (
    <table ref={ref} className={cx("w-full border-collapse", className)} {...rest}>
      {children}
    </table>
  );
});

export const TableHead = forwardRef(function TableHead({ className, children, ...rest }, ref) {
  return <thead ref={ref} className={className} {...rest}>{children}</thead>;
});

export const TableBody = forwardRef(function TableBody({ className, children, ...rest }, ref) {
  return <tbody ref={ref} className={className} {...rest}>{children}</tbody>;
});

export const TableRow = forwardRef(function TableRow({ className, children, hover, selected, ...rest }, ref) {
  return <tr ref={ref} className={className} {...rest}>{children}</tr>;
});

export const TableCell = forwardRef(function TableCell(
  { className, children, align, component, scope, padding, size, ...rest },
  ref
) {
  const Tag = resolve(component, "td");
  return (
    <Tag ref={ref} className={cx(align && `text-${align}`, className)} scope={scope} {...rest}>
      {children}
    </Tag>
  );
});

/* ------------------------------------------------------------- transitions */

/** MUI Collapse is a height transition; Ant's Collapse is an accordion. */
export const Collapse = forwardRef(function Collapse(
  { className, children, in: inProp, timeout, unmountOnExit, ...rest },
  ref
) {
  if (unmountOnExit && !inProp) return null;
  return (
    <div
      ref={ref}
      className={cx("overflow-hidden transition-all duration-300", inProp ? "max-h-[2000px]" : "max-h-0", className)}
      {...rest}
    >
      {children}
    </div>
  );
});

export const Grow = forwardRef(function Grow({ children, in: inProp, timeout, style, ...rest }, ref) {
  if (inProp === false) return null;
  return children;
});

export const Fade = Grow;

export default {};
