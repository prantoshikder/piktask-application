"use client";

import { makeStyles } from "tss-react/mui";

const useStyles = makeStyles()((theme) => ({
  containerLeft: {
    display: "flex",
  },
  containerCenter: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  socialIconWrapper: {
    display: "flex",
    justifyContent: "center",
    alignContent: "center",
  },
  title: {
    color: theme.palette.common.white,
    fontSize: "1.4rem",
    fontWeight: 500,
    marginRight: "2.3rem",
    [theme.breakpoints.down(576)]: {
      marginRight: "0",
    },
  },
  socialIcon: {
    width: "2.8rem",
    marginLeft: "1rem",
  },
  socialMedia: {
    width: "2rem",
    marginLeft: "1rem",
    display: "flex",
    justifyContent: "center",
    alignContent: "center",
  },
}));

export default useStyles;
