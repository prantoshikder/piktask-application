"use client";

import { makeStyles } from "tss-react/mui";

const useStyles = makeStyles()((theme) => ({
  copyrightWrapper: {
    padding: "1.8rem 0rem",
    display: "flex",
    alignItems: "center",
    position: "relative",
    height: 80,
    "&::before": {
      background: "rgb(1 32 54)",
      content: '""',
      position: "absolute",
      top: 0,
      left: 0,
      width: "100%",
      height: "100%",
    },

    "@media (max-width: 768px)": {
      height: "auto",
    },
  },
  root: {
    height: "100%",
    zIndex: 1,
  },
  gridRoot: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    height: "100%",

    "@media (max-width: 768px)": {
      flexDirection: "column",
    },
  },
  logoWrapper: {
    display: "flex",
    // justifyContent:"center",
    "@media (max-width: 992px)": {
      marginRight: "2rem",
    },
  },
  logo: {
    width: "13.5rem",
  },
  copyRightText: {
    fontSize: "1.6rem",
    fontWeight: 400,
    color: theme.palette.common.white,
  },
}));

export default useStyles;
