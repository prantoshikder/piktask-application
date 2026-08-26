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
  adminLogo: {
    width: "15rem",
    marginTop: "0.6rem",
    [theme.breakpoints.down(426)]: {
      // width: "11rem",
      // marginTop: "1rem",
    },
  },
  item: {
    height: "100%",
    display: "flex",
    padding: "0 !important",
    alignItems: "center",
    marginLeft: "auto",
    [theme.breakpoints.down(769)]: {
      marginTop: "1.3rem",
    },
  },
  headerInfo: {
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-end",
    marginLeft: "auto",
  },
  userProfile: {
    display: "flex",
    alignItems: "center",
    cursor: "pointer",
    [theme.breakpoints.down(426)]: {
      marginBottom: "-1rem",
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
      fontSize: "3rem",
    },
  },
  paper: {
    width: "45%",
    [theme.breakpoints.down(769)]: {
      width: "50%",
    },
    [theme.breakpoints.down(480)]: {
      width: "70%",
    },
  },
  logo: {
    width: "12rem",
  },
  closeIconWrapper: {
    backgroundColor: "rgb(1 32 54)",
    padding: "1rem",
    boxShadow: "0px 0px 50px 50px rgb(1 32 54)",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },
  menuIcon: {
    fontSize: "4rem",
    cursor: "pointer",
    color: "#001c30",
    "@media (max-width: 769px)": {
      fontSize: "3.5rem",
      marginBottom: "0.3rem",
    },
    "@media (max-width: 426px)": {
      fontSize: "2.5rem",
      marginBottom: "-0.8rem",
    },
  },
  closeMenuIcon: {
    fontSize: "3rem",
    cursor: "pointer",
    color: "#FFF",
  },
}));

export default useStyles;
