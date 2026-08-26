"use client";

import { makeStyles } from "tss-react/mui";

const useStyles = makeStyles()((theme) => ({
  root: {
    height: "100%",
    display: "flex",
    margin: "0rem 1.5rem",
    justifyContent: "space-between",
    alignItems: "center",
    [theme.breakpoints.down(769)]: {
      margin: "0rem",
    },
  },

  headerInfo: {
    display: "flex",
    alignItems: "flex-end",
    justifyContent: "flex-end",
    marginLeft: "auto",
  },
  notificationIcon: {
    height: "4rem",
    width: "4rem",
    borderRadius: "100%",
    backgroundColor: "#f1f1f1",
    marginRight: "1rem",
    cursor: "pointer",
    "& svg": {
      color: "#0088f2",
      margin: "0.5rem 0.6rem",
      fontSize: "2.8rem",
    },
  },
  earningAmount: {
    fontSize: "1.8rem",
    fontWeight: 500,
    marginRight: "4rem",
    color: "#1B3F4E",
  },
  uploadBtn: {
    ...theme.typography.button,
    backgroundColor: "#0088f2",
    padding: "0.5rem 1.4rem",
    float: "left",
    fontSize: "1.4rem",
    border: "2px solid",
    borderColor: "transparent",
    transition: "all 0.3s linear",
    "&:hover": {
      backgroundColor: "#0773c5",
    },
    [theme.breakpoints.down(769)]: {
      display: "none",
    },
  },
  menuIcon: {
    fontSize: "4rem",
    cursor: "pointer",
    color: "#FFF",
    [theme.breakpoints.up(769)]: {
      display: "none",
    },
  },
  ButtoncrownIcon: {
    fontSize: "2rem",
    marginRight: ".8rem",
  },
  userProfile: {
    display: "flex",
    alignItems: "center",
    cursor: "pointer",
    [theme.breakpoints.down(426)]: {
      marginBottom: "-1rem",
    },
  },
  adminPhoto: {
    width: "4rem",
    height: "4rem",
    borderRadius: "100%",
    objectFit: "cover",
    [theme.breakpoints.down(769)]: {
      width: "3.5rem",
      height: "3.5rem",
    },
  },
  userName: {
    paddingLeft: "1rem",
    fontSize: "1.8rem",
    fontWeight: 500,
    color: "#1B3F4E",
    [theme.breakpoints.down(426)]: {
      fontSize: "1.4rem",
      paddingLeft: "0.8rem",
    },
  },
  avatar: {
    fontSize: "4.8rem",
    width: "4rem",
    height: "4rem",
    borderRadius: "100%",
    position: "relative",
    right: "-0.6rem",
    color: "#000",
    [theme.breakpoints.down(769)]: {
      fontSize: "4.2rem",
    },
    [theme.breakpoints.down(426)]: {
      fontSize: "3.5rem",
    },
  },
  arrowDown: {
    fontSize: "3.5rem",
    color: "#376579",
    [theme.breakpoints.down(426)]: {
      fontSize: "2rem",
    },
  },

  signUpBtn: {
    color: "#fff",
    fontSize: "1.8rem",
    fontWeight: 400,
    border: ".2rem solid #fff",
    marginRight: "16px",
    padding: "0px 14px",
    [theme.breakpoints.down(425)]: {
      fontSize: "13px",
      marginRight: "8px",
      padding: "0px 8px",
    },
  },
}));

export default useStyles;
