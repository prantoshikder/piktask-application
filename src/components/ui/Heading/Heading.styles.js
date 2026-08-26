"use client";

import { makeStyles } from "tss-react/mui";

const useStyles = makeStyles()((theme) => ({
  headingContainer: {
    padding: "4.5rem 0",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    textAlign: "center",

    [theme.breakpoints.down(480)]: {
      padding: "0rem",
      alignItems: "baseline",
    },
  },
  headingH1: {
    color: theme.palette.common.white,
    fontSize: "2.2rem",
    marginBottom: 0,

    [theme.breakpoints.down(769)]: {
      lineHeight: 1.5,
    },
    "@media (max-width: 576px)": {
      fontSize: "1.8rem",
    },
  },
  headingSubtitle: {
    color: theme.palette.common.white,
    fontSize: 16,
    marginBottom: "2.3rem",
    fontWeight: 400,
  },
}));

export default useStyles;
