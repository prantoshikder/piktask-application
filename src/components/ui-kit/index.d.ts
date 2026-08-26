import type * as React from "react";

/**
 * The kit is authored in JSX like the rest of the app. These declarations keep
 * the handful of .tsx consumers type-checking without forcing the whole kit to
 * TypeScript; props are intentionally loose because each component mirrors the
 * MUI prop surface it replaced.
 */
type AnyComponent = React.ComponentType<any>;

export declare const Box: AnyComponent;
export declare const Container: AnyComponent;
export declare const Paper: AnyComponent;
export declare const AppBar: AnyComponent;
export declare const Toolbar: AnyComponent;
export declare const Typography: AnyComponent;
export declare const Card: AnyComponent;
export declare const CardContent: AnyComponent;
export declare const CardMedia: AnyComponent;
export declare const List: AnyComponent;
export declare const MenuList: AnyComponent;
export declare const ListItem: AnyComponent;
export declare const ListItemText: AnyComponent;
export declare const ListItemIcon: AnyComponent;
export declare const ListItemButton: AnyComponent;
export declare const TableContainer: AnyComponent;
export declare const Table: AnyComponent;
export declare const TableHead: AnyComponent;
export declare const TableBody: AnyComponent;
export declare const TableRow: AnyComponent;
export declare const TableCell: AnyComponent;
export declare const Collapse: AnyComponent;
export declare const Grow: AnyComponent;
export declare const Fade: AnyComponent;

export declare const Button: AnyComponent;
export declare const IconButton: AnyComponent;
export declare const Input: AnyComponent;
export declare const TextField: AnyComponent;
export declare const TextareaAutosize: AnyComponent;
export declare const FormControl: AnyComponent;
export declare const FormControlLabel: AnyComponent;
export declare const Select: AnyComponent;
export declare const MenuItem: AnyComponent;
export declare const Checkbox: AnyComponent;
export declare const Radio: AnyComponent;
export declare const RadioGroup: AnyComponent;
export declare const Switch: AnyComponent;
export declare const Autocomplete: AnyComponent;

export declare const CircularProgress: AnyComponent;
export declare const LinearProgress: AnyComponent;
export declare const Skeleton: AnyComponent;
export declare const Tooltip: AnyComponent;

export declare const Dialog: AnyComponent;
export declare const DialogTitle: AnyComponent;
export declare const DialogContent: AnyComponent;
export declare const DialogContentText: AnyComponent;
export declare const DialogActions: AnyComponent;
export declare const Drawer: AnyComponent;
export declare const Popper: AnyComponent;
export declare const ClickAwayListener: AnyComponent;

export declare const Tabs: AnyComponent;
export declare const Tab: AnyComponent;
export declare const TabContext: AnyComponent;
export declare const TabList: AnyComponent;
export declare const TabPanel: AnyComponent;

export declare const Grid: AnyComponent;
export declare const CssBaseline: AnyComponent;

export declare function useMediaQuery(query: string | (() => string)): boolean;
