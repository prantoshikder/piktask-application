"use client";

import { makeStyles } from "tss-react/mui";
const useStyles = makeStyles()((theme) => ({
  socialsButtons: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "1.5rem",
  },
  googleButton: {
    display: "flex",
    alignItems: "center",
    padding: "0.8rem 6rem",
    border: "1px solid #C74C37",
    borderRadius: "4px",
    color: "white",
    backgroundColor: "#C74C37",
    transition: "all 0.3s linear",
    "& span": {
      fontSize: "1.8rem",
      color: "#fff",
    },
    "&:hover": {
      backgroundColor: "#ab311d",
    },
    [theme.breakpoints.down(480)]: {
      padding: "0.6rem 6rem",
      "& span": {
        fontSize: "1.5rem",
      },
    },
  },
  googleIcon: {
    color: "white",
    fontSize: "1.6rem",
    marginRight: "0.8rem",
  },
  facebookBtn: {
    display: "flex",
    alignItems: "center",
    padding: "0.8rem 5rem",
    border: "1px solid #425993",
    borderRadius: "4px",
    color: "white",
    backgroundColor: "#425993",
    transition: "all 0.3s linear",
    "& span": {
      fontSize: "1.8rem",
      color: "#fff",
    },
    "&:hover": {
      backgroundColor: "#213567",
    },
    [theme.breakpoints.down(480)]: {
      padding: "0.6rem 5rem",
      "& span": {
        fontSize: "1.5rem",
      },
    },
  },
  facebookIconBtn: {
    color: "white",
    fontSize: "1.6rem",
    marginRight: "0.8rem !important",
  },
}));

export default useStyles;
