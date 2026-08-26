"use client";

import { makeStyles } from "tss-react/mui";

export const useStyles = makeStyles()((theme) => ({
  footerRoot: {
    backgroundColor: "#001c30",
  },
  root: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "8rem 0",
    [theme.breakpoints.down(769)]: {
      display: "none",
    },
  },
  footerWrapper: {
    "@media (max-width: 769px)": {
      marginTop: "2rem",
    },
    "@media (max-width: 576px)": {
      maxWidth: "100%",
      flexBasis: "100%",
      marginTop: "2rem",
    },
  },
  customFooterWrapper: {
    paddingLeft: "3rem !important",
  },
  footerHeading: {
    textTransform: "uppercase",
    marginBottom: "2.4rem",
    fontSize: "1.9rem",
    color: "#fff",
  },
  socialMediaTitle: {
    textTransform: "uppercase",
    marginTop: "2.4rem",
    marginBottom: "1rem",
    fontSize: "1.9rem",
  },
  menuWrapper: {
    listStyleType: "none",
    padding: 0,
  },
  navItem: {
    color: "#ddd",
    fontSize: "1.5rem",
    cursor: "pointer",
    padding: "0.8rem 0",
    transition: "color 0.3s linear",
    "&:first-child": {
      paddingTop: 0,
    },
    "&:hover": {
      textDecoration: "none",
      color: theme.palette.secondary.main,
    },
  },
  navLink: {
    fontSize: "1.5rem",
    textDecoration: "none",
    color: "#ddd",
    fontWeight: 400,
    fontFamily: "'Roboto', sans-serif",
    transition: "color 0.3s linear",
    cursor: "pointer",
    "&:hover": {
      textDecoration: "none",
      color: theme.palette.secondary.main,
    },
  },
  // mobile version
  collapseRoot: {
    backgroundColor: "#001c30",
    width: "100%",
    padding: "2rem 0rem",
    color: "#ddd",
  },
  listItemBtn: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "2rem",
    borderBottom: "1px solid #023458",
    "&:last-child": {
      borderBottom: "transparent",
    },
  },
  collapseInfo: {
    backgroundColor: "#023458",
    // padding: "2rem",
  },
  collapseNavLink: {
    color: "#ddd",
    fontSize: "1.5rem",
    textDecoration: "none",
    fontWeight: 400,
    padding: "2rem 4rem 0",
    fontFamily: "'Roboto', sans-serif",
    transition: "color 0.3s linear",
    cursor: "pointer",
    "&:hover": {
      textDecoration: "none",
      color: theme.palette.secondary.main,
    },
  },
  listItemIcon: {
    minWidth: "0 !important",
  },
  title: {
    padding: "0",
    fontSize: "1.4rem",
    fontWeight: "500",
  },
  arrowIcon: {
    width: "2em !important",
    height: "1.5em !important",
  },
}));
