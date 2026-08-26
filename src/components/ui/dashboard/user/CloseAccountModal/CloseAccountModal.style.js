"use client";

import { makeStyles } from "tss-react/mui";
const useStyles = makeStyles()((theme) => ({
  closedAccount: {
    marginTop: "1.6rem",
    boxShadow: "0 1px 2px 0 rgb(0 0 0 / 10%)",
    cursor: "pointer",
    "& a": {
      textDecoration: "none",
    },
    "& p": {
      fontSize: "1.6rem",
      fontWeight: "400",
      color: "#E21313",
      textAlign: "center",
      marginBottom: "-0.3rem",
    },
  },
  closeAccountDialog: {
    "& div div": {
      maxWidth: "100%",
      [theme.breakpoints.down(480)]: {
        width: "100%",
      },
    },
  },
  closeAccountTitle: {
    "& h2": {
      fontSize: "1.8rem !important",
    },
  },
  closeAccountsTitle: {
    padding: "1rem 0rem",

    "& h2": {
      fontSize: "1.8rem !important",
      paddingLeft: "0rem",
    },
  },
  keepAccountBtn: {
    color: "white",
    backgroundColor: theme.palette.primary.light,
    transition: "all 0.3s linier",
    "&:hover": {
      backgroundColor: "#0773c5",
    },
  },
  closeAccountBtn: {
    color: "white",
    backgroundColor: "#f91c0c",
    transition: "all 0.3s linier",
    "&:hover": {
      backgroundColor: "#b71c1c",
    },
  },
}));

export default useStyles;
