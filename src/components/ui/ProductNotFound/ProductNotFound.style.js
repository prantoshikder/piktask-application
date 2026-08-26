"use client";

import { makeStyles } from "tss-react/mui";

const useStyles = makeStyles()((theme) => ({
  productNotFround: {
    margin: "0 auto",
    // padding: "2rem 0",
    textAlign: "center",
  },
  uploadBtn: {
    ...theme.typography.button,
    backgroundColor: "#0088f2",
    padding: "0.5rem 1.4rem",
    fontSize: "1.4rem",
    border: "2px solid",
    marginTop: "1.5rem",
    borderColor: "transparent",
    transition: "all 0.3s linear",
    "&:hover": {
      backgroundColor: "#0773c5",
    },
    [theme.breakpoints.down(769)]: {
      display: "none",
    },
  },
  ButtoncrownIcon: {
    fontSize: "2rem",
    marginRight: ".8rem",
  },
  notFoundSection: {
    textAlign: "center",
    width: "100%",
    padding: "37px 0",
    backgroundColor: "white",
  },
  notFoundWrap: {
    width: "100%",
  },
  notFoundImage: {
    width: "45rem",
    margin: "0 auto",
    "& img": {
      width: "100%",
      objectFit: "cover",
    },
  },
  title: {
    fontSize: "2rem",
    fontWeight: 500,
  },
  helperText: {
    margin: "2px",
    fontSize: "1.5rem",
    "& span": {
      color: "red",
    },
  },
  headingButton: {
    ...theme.typography.button,
    backgroundColor: "#0088f2",
    margin: "7px",
    padding: "0.5rem 2.2rem",
    fontSize: "1.5rem",
    fontWeight: 500,
    color: "#fff",
    transition: "all 0.5s linear",

    "&:hover": {
      borderColor: "#0773c5",
      backgroundColor: "#0773c5",
    },
  },
}));
export default useStyles;
