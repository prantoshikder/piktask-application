"use client";

import {
  AutoComplete as AntAutoComplete,
  Button as AntButton,
  Checkbox as AntCheckbox,
  Drawer as AntDrawer,
  Input as AntInput,
  Modal as AntModal,
  Progress as AntProgress,
  Radio as AntRadio,
  Select as AntSelect,
  Skeleton as AntSkeleton,
  Spin as AntSpin,
  Switch as AntSwitch,
  Tooltip as AntTooltip,
} from "antd";
import { createContext, forwardRef, useContext, useEffect, useRef } from "react";

/**
 * Ant Design components presented with the MUI prop names the call sites use,
 * so the 106 files that consume them did not have to be rewritten.
 *
 * Styling still comes from the Tailwind classes on each call site; Ant's own
 * CSS sits in `@layer antd`, which globals.css declares first, so the utility
 * classes continue to win.
 */

const cx = (...parts) => parts.filter(Boolean).join(" ");

/* ------------------------------------------------------------------ button */

/**
 * MUI's `component` prop turns a Button into a link. Rendering it as the given
 * component (rather than an Ant Button with `href`) keeps Next's client-side
 * navigation and matches what MUI produced: an <a> carrying the button classes.
 */
export const Button = forwardRef(function Button(
  { component: Component, className, children, variant, color, disableRipple, disableElevation, fullWidth, size, startIcon, endIcon, ...rest },
  ref
) {
  const content = (
    <>
      {startIcon}
      {children}
      {endIcon}
    </>
  );

  if (Component) {
    return (
      <Component ref={ref} className={cx("pk-button", fullWidth && "w-full", className)} {...rest}>
        {content}
      </Component>
    );
  }

  return (
    <AntButton
      ref={ref}
      className={cx(fullWidth && "w-full", className)}
      size={size === "medium" ? "middle" : size}
      block={fullWidth}
      {...rest}
    >
      {content}
    </AntButton>
  );
});

export const IconButton = forwardRef(function IconButton(
  { component: Component, className, children, color, size, edge, disableRipple, ...rest },
  ref
) {
  if (Component) {
    return (
      <Component ref={ref} className={cx("pk-button", className)} {...rest}>
        {children}
      </Component>
    );
  }
  return (
    <AntButton type="text" shape="circle" ref={ref} className={className} {...rest}>
      {children}
    </AntButton>
  );
});

/* ------------------------------------------------------------------- forms */

export const Input = forwardRef(function Input(
  { className, disableUnderline, fullWidth, disableRipple, inputProps, ...rest },
  ref
) {
  return <AntInput ref={ref} className={cx(fullWidth && "w-full", className)} {...rest} />;
});

export const TextField = forwardRef(function TextField(
  {
    className,
    label,
    variant,
    id,
    multiline,
    rows,
    minRows,
    maxRows,
    fullWidth,
    select,
    SelectProps,
    InputProps,
    InputLabelProps,
    helperText,
    error,
    children,
    ...rest
  },
  ref
) {
  // MUI's `select` TextField renders a real <select> when SelectProps.native is
  // set, and its children are <option> elements. Feeding those to an <input>
  // would crash ("input is a self-closing tag"), so the native element is used.
  const field = select ? (
    <select
      ref={ref}
      id={id}
      className="ant-input w-full"
      aria-invalid={error || undefined}
      {...rest}
    >
      {children}
    </select>
  ) : multiline ? (
    <AntInput.TextArea
      ref={ref}
      id={id}
      status={error ? "error" : undefined}
      rows={rows}
      autoSize={minRows || maxRows ? { minRows, maxRows } : undefined}
      {...rest}
    />
  ) : (
    <AntInput ref={ref} id={id} status={error ? "error" : undefined} {...rest} />
  );

  return (
    <div className={cx("w-full", className)}>
      {label && (
        <label htmlFor={id} className="ant-form-item-label block">
          {label}
        </label>
      )}
      {field}
      {helperText && <div className="ant-form-item-explain">{helperText}</div>}
    </div>
  );
});

export const TextareaAutosize = forwardRef(function TextareaAutosize(
  { className, minRows, maxRows, rowsMin, fullWidth, ...rest },
  ref
) {
  return (
    <AntInput.TextArea
      ref={ref}
      className={className}
      autoSize={{ minRows: minRows || rowsMin || 3, maxRows: maxRows || 12 }}
      {...rest}
    />
  );
});

export const FormControl = forwardRef(function FormControl(
  { className, children, variant, fullWidth, component: Component, ...rest },
  ref
) {
  const Tag = Component || "div";
  return (
    <Tag ref={ref} className={cx("inline-flex flex-col relative", fullWidth && "w-full", className)} {...rest}>
      {children}
    </Tag>
  );
});

/** MUI renders <Select><MenuItem value=...>; Ant wants options, so children are read. */
export const Select = forwardRef(function Select(
  { className, children, value, onChange, native, variant, displayEmpty, inputProps, label, labelId, fullWidth, ...rest },
  ref
) {
  const options = [];
  const collect = (nodes) => {
    for (const child of Array.isArray(nodes) ? nodes : [nodes]) {
      if (!child || typeof child !== "object") continue;
      if (Array.isArray(child)) { collect(child); continue; }
      if (child.props && "value" in child.props) {
        options.push({ value: child.props.value, label: child.props.children });
      }
    }
  };
  collect(children);

  return (
    <AntSelect
      ref={ref}
      className={cx("w-full", className)}
      value={value === "" ? undefined : value}
      // MUI hands the handler an event; Ant hands it the value.
      onChange={(v) => onChange?.({ target: { value: v } }, v)}
      options={options}
      {...rest}
    />
  );
});

/** Only read by <Select> above, but must still be a valid element. */
export const MenuItem = forwardRef(function MenuItem({ className, children, value, ...rest }, ref) {
  return (
    <div ref={ref} className={className} data-value={value} {...rest}>
      {children}
    </div>
  );
});

export const Checkbox = forwardRef(function Checkbox({ className, checked, onChange, color, size, ...rest }, ref) {
  return (
    <AntCheckbox
      ref={ref}
      className={className}
      checked={checked}
      onChange={(e) => onChange?.(e, e.target.checked)}
      {...rest}
    />
  );
});

export const Radio = forwardRef(function Radio({ className, color, size, ...rest }, ref) {
  return <AntRadio ref={ref} className={className} {...rest} />;
});

export const RadioGroup = forwardRef(function RadioGroup({ className, children, value, onChange, row, name, ...rest }, ref) {
  return (
    <AntRadio.Group
      ref={ref}
      className={cx(row && "flex flex-row", className)}
      value={value}
      name={name}
      onChange={(e) => onChange?.(e, e.target.value)}
      {...rest}
    >
      {children}
    </AntRadio.Group>
  );
});

export const FormControlLabel = forwardRef(function FormControlLabel(
  { className, control, label, value, labelPlacement, ...rest },
  ref
) {
  return (
    <label ref={ref} className={cx("inline-flex items-center gap-[0.5rem] cursor-pointer", className)} {...rest}>
      {control && (value !== undefined ? { ...control, props: { ...control.props, value } } : control)}
      <span className="pk-form-label">{label}</span>
    </label>
  );
});

/* -------------------------------------------------------------- feedback */

export const CircularProgress = forwardRef(function CircularProgress({ className, size, color, thickness, ...rest }, ref) {
  return (
    <span ref={ref} className={className}>
      <AntSpin size={typeof size === "number" ? (size > 40 ? "large" : "default") : size} {...rest} />
    </span>
  );
});

export const LinearProgress = forwardRef(function LinearProgress({ className, value, variant, color, ...rest }, ref) {
  const indeterminate = variant !== "determinate";
  return (
    <AntProgress
      ref={ref}
      className={className}
      percent={indeterminate ? 100 : value}
      showInfo={false}
      status={indeterminate ? "active" : "normal"}
      strokeWidth={4}
      {...rest}
    />
  );
});

export const Skeleton = forwardRef(function Skeleton(
  { className, variant, width, height, animation, ...rest },
  ref
) {
  const style = { width, height };
  if (variant === "circle" || variant === "circular") {
    return (
      <span ref={ref} className={className} style={style}>
        <AntSkeleton.Avatar active={animation !== false} size={typeof width === "number" ? width : "default"} {...rest} />
      </span>
    );
  }
  return (
    <span ref={ref} className={className} style={style}>
      <AntSkeleton.Node active={animation !== false} style={{ width: width || "100%", height: height || "1.2em" }} {...rest}>
        <span />
      </AntSkeleton.Node>
    </span>
  );
});

export const Tooltip = forwardRef(function Tooltip({ className, children, title, placement, arrow, ...rest }, ref) {
  return (
    <AntTooltip title={title} placement={placement} rootClassName={className} {...rest}>
      {children}
    </AntTooltip>
  );
});

/* ------------------------------------------------------------- overlays */

export const Dialog = forwardRef(function Dialog(
  { className, children, open, onClose, maxWidth, fullWidth, scroll, "aria-labelledby": labelledBy, ...rest },
  ref
) {
  return (
    <AntModal
      open={open}
      onCancel={(e) => onClose?.(e, "backdropClick")}
      footer={null}
      centered
      className={className}
      width={fullWidth ? "80%" : undefined}
      {...rest}
    >
      {children}
    </AntModal>
  );
});

export const DialogTitle = ({ className, children, ...rest }) => (
  <div className={cx("text-[1.8rem]", className)} {...rest}>{children}</div>
);
export const DialogContent = ({ className, children, dividers, ...rest }) => (
  <div className={className} {...rest}>{children}</div>
);
export const DialogContentText = ({ className, children, ...rest }) => (
  <p className={className} {...rest}>{children}</p>
);
export const DialogActions = ({ className, children, ...rest }) => (
  <div className={cx("flex items-center justify-end gap-[0.8rem]", className)} {...rest}>{children}</div>
);

export const Drawer = forwardRef(function Drawer(
  { className, children, open, onClose, anchor = "left", classes, variant, ...rest },
  ref
) {
  return (
    <AntDrawer
      open={open}
      onClose={onClose}
      placement={anchor}
      rootClassName={className}
      // MUI put the panel classes on classes.paper.
      classNames={{ content: classes?.paper, body: classes?.paper ? undefined : undefined }}
      styles={{ body: { padding: 0 } }}
      closable={false}
      {...rest}
    >
      {children}
    </AntDrawer>
  );
});

/** MUI Popper: anchored, non-portalled popup. Ant's Dropdown needs a trigger. */
export const Popper = forwardRef(function Popper(
  { className, children, open, anchorEl, transition, disablePortal, placement, modifiers, style, ...rest },
  ref
) {
  if (!open) return null;
  const content = typeof children === "function" ? children({ TransitionProps: {}, placement }) : children;
  return (
    <div ref={ref} className={cx("absolute", className)} style={style} {...rest}>
      {content}
    </div>
  );
});

export const ClickAwayListener = ({ children, onClickAway, mouseEvent, touchEvent }) => {
  const ref = useRef(null);

  useEffect(() => {
    const handler = (event) => {
      if (ref.current && !ref.current.contains(event.target)) onClickAway?.(event);
    };
    document.addEventListener("mousedown", handler);
    document.addEventListener("touchstart", handler);
    return () => {
      document.removeEventListener("mousedown", handler);
      document.removeEventListener("touchstart", handler);
    };
  }, [onClickAway]);

  return <div ref={ref}>{children}</div>;
};

/* ---------------------------------------------------------------- tabs */

export const Tabs = forwardRef(function Tabs(
  { className, children, value, onChange, classes, variant, indicatorColor, textColor, centered, ...rest },
  ref
) {
  return (
    <div ref={ref} className={cx("pk-tabs flex items-center", className)} role="tablist" {...rest}>
      {Array.isArray(children)
        ? children.map((child, index) =>
            child && typeof child === "object"
              ? { ...child, props: { ...child.props, __selected: value === index, __onSelect: (e) => onChange?.(e, index) } }
              : child
          )
        : children}
    </div>
  );
});

export const Tab = forwardRef(function Tab(
  {
    component: Component,
    className,
    label,
    children,
    value,
    icon,
    onClick,
    __selected,
    __onSelect,
    disableRipple,
    wrapped,
    ...rest
  },
  ref
) {
  // MUI's Tab is routinely used as a link (`component={NavLink} to="...")`.
  // Rendering a plain <button> would both break navigation and drop the tab's
  // default padding, which is what spaced the header nav apart.
  const Tag = Component || "button";
  const isButton = Tag === "button";

  const handleClick = (event) => {
    __onSelect?.(event);
    onClick?.(event);
  };

  return (
    <Tag
      ref={ref}
      {...(isButton ? { type: "button" } : null)}
      role="tab"
      aria-selected={!!__selected}
      className={cx("pk-tab", __selected && "active", className)}
      onClick={handleClick}
      {...rest}
    >
      {icon}
      {label ?? children}
    </Tag>
  );
});

/** Tailwind's preflight already does what CssBaseline did. */
export const CssBaseline = () => null;

/* ------------------------------------------------------------- remaining */

export const Switch = forwardRef(function Switch({ className, checked, onChange, color, size, ...rest }, ref) {
  return (
    <AntSwitch
      ref={ref}
      className={className}
      checked={checked}
      onChange={(v, e) => onChange?.({ target: { checked: v } }, v)}
      {...rest}
    />
  );
});

export const Autocomplete = forwardRef(function Autocomplete(
  { className, options = [], value, onChange, getOptionLabel, renderInput, freeSolo, fullWidth, ...rest },
  ref
) {
  const items = options.map((option) => ({
    value: typeof option === "string" ? option : getOptionLabel?.(option) ?? String(option?.label ?? option?.name ?? ""),
  }));
  return (
    <AntAutoComplete
      ref={ref}
      className={cx("w-full", className)}
      options={items}
      value={value}
      onChange={(v) => onChange?.({ target: { value: v } }, v)}
      {...rest}
    />
  );
});

/** MUI's ListItemButton; `sx={{ pl: 4 }}` is the only sx used in the app. */
export const ListItemButton = forwardRef(function ListItemButton(
  { component: Component, className, children, sx, disableRipple, selected, ...rest },
  ref
) {
  const Tag = Component || "div";
  const style = sx?.pl !== undefined ? { paddingLeft: `${sx.pl * 8}px` } : undefined;
  return (
    <Tag
      ref={ref}
      className={cx("flex items-center w-full cursor-pointer", className)}
      style={style}
      {...rest}
    >
      {children}
    </Tag>
  );
});

/* ------------------------------------------- @mui/lab tab context shims */

const TabCtx = createContext(null);

export const TabContext = ({ value, children }) => (
  <TabCtx.Provider value={value}>{children}</TabCtx.Provider>
);

export const TabList = forwardRef(function TabList({ className, children, onChange, ...rest }, ref) {
  return (
    <div ref={ref} role="tablist" className={cx("flex items-center", className)} {...rest}>
      {Array.isArray(children)
        ? children.map((child) =>
            child && typeof child === "object"
              ? { ...child, props: { ...child.props, __onSelect: (e) => onChange?.(e, child.props.value) } }
              : child
          )
        : children}
    </div>
  );
});

export const TabPanel = ({ className, children, value, ...rest }) => {
  const active = useContext(TabCtx);
  if (active !== value) return null;
  return (
    <div role="tabpanel" className={className} {...rest}>
      {children}
    </div>
  );
};
