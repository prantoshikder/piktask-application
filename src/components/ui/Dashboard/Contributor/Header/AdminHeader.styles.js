"use client";

import { makeStyles } from "tss-react/mui";

const useStyles = makeStyles()((theme) => ({
  appbarHeader: {
    backgroundColor: "#fff",
    boxShadow: "none",
    position: "fixed",
    width: "100%",
    height: "7rem",
    zIndex: 99,
    paddingRight: "28rem",
    top: 0,
    [theme.breakpoints.down(769)]: {
      width: "100%",
      paddingRight: "0rem",
    },
  },
  fullWidth: {
    width: "100%",
    height: "7rem",
    backgroundColor: "#fff",
    boxShadow: "0 8px 12px 3px rgb(0 0 0 / 3%)",
  },
}));

export default useStyles;
