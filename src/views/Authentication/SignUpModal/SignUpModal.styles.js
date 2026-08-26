"use client";

import { makeStyles } from "tss-react/mui";

const useStyles = makeStyles()((theme) => ({
  // New user authentication modal
  dialogModal: {
    "& .MuiDialog-paperWidthSm": {
      maxWidth: 800,
    },
  },
  leftPanel: {
    backgroundColor: "#0088f2",
    padding: "2.5rem",
    width: "100%",
    height: "100%",
    "& p": {
      color: theme.palette.common.white,
      fontWeight: 500,
      fontSize: 13,
      lineHeight: 2,
    },
    "& img": {
      width: "100%",
    },
    [theme.breakpoints.up(1441)]: {
      padding: "2.5rem 2.5rem 7rem 2.5rem",
    },
    [theme.breakpoints.down(769)]: {
      display: "none",
    },
  },
  authLogo: {
    maxWidth: 120,
    marginBottom: "1.5rem",
  },
  checkbox: {
    "& svg": {
      fontSize: "2.5rem",
    },
  },
  checkboxLabel: {
    "& .MuiFormControlLabel-label": {
      fontSize: 13,
      marginBottom: -14,
    },
    [theme.breakpoints.down(769)]: {
      display: "none",
    },
  },

  // Auth right panel
  rightPanel: {
    padding: "2rem",
    height: "100%",
    [theme.breakpoints.down(769)]: {
      padding: "1.5rem",
    },
  },
  tabsWrapper: {
    "& .MuiTabs-flexContainer": {
      justifyContent: "center",
      paddingBottom: "2.5rem",
    },
  },
  menuUnderline: {
    height: 0,
    backgroundColor: "transparent",
  },
  tabItem: {
    color: "#646464",
    fontSize: 17,
    transition: "all 0.3s linear",
    borderRadius: 0,

    "&:hover": {
      boxShadow: "rgba(33, 35, 38, 0.1) 0px 10px 10px -10px",
      color: "#0088f2",
    },
  },
  selected: {
    color: "#0088f2",
    boxShadow: "rgba(33, 35, 38, 0.1) 0px 10px 10px -10px",
  },
  passwordResetLink: {
    fontSize: 17,
    color: "#0088f2",
    textAlign: "center",
    display: "block",
    textDecoration: "none",
    "&:hover": {
      textDecoration: "underline",
    },
  },

  closeModal: {
    float: "right",
    marginTop: -15,
    color: "#0088f2",
    cursor: "pointer",
    [theme.breakpoints.down(769)]: {
      display: "none",
      marginTop: 0,
    },
  },
  horizontalLine: {
    backgroundColor: "#CBCBCB",
    height: 1,
    position: "relative",
    "& span": {
      position: "absolute",
      backgroundColor: theme.palette.common.white,
      left: "50%",
      transform: "translate(-50%, -41%)",
      padding: "0 5px",
      fontStyle: "italic",
      fontSize: 13,
    },
  },
  authText: {
    fontSize: 17,
    color: "#0088f2",
    textAlign: "center",
    cursor: "pointer",
    marginTop: "1rem",
    [theme.breakpoints.down(769)]: {
      marginTop: "12.5%",
    },
  },
  passwordField: {
    display: "flex",
    alignItems: "center",
    position: "relative",
    "& img": {
      position: "absolute",
      top: ".8rem",
      right: "3rem",
      width: "2rem",
      cursor: "pointer",
    },
    "@media (max-width: 768px)": {
      "& img": {
        width: "2rem",
      },
    },
  },
  signUpLink: {
    marginTop: "19%",
    fontSize: 17,
    textAlign: "center",
    "& span": {
      cursor: "pointer",
      color: "#0088f2",
    },
  },
}));

export default useStyles;
