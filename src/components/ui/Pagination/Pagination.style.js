"use client";

import { makeStyles } from "tss-react/mui";

const useStyles = makeStyles()((theme) => ({
  pagination: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    "& button:hover": {
      backgroundColor: "#0773c5",
      color: "#fff",
    },
  },
  prevButton: {
    padding: "0.7rem 4rem",
    backgroundColor: "#0088f2",
    color: "#fff",
    borderRadius: "0.2rem",
    marginRight: "1rem",
  },
  disablePreviousButton: {
    padding: "0.6rem 4rem",
    border: "2px solid #0088f2",
    color: "#0088f2",
    borderRadius: "0.2rem",
    marginRight: "1rem",
  },
  nextButton: {
    padding: "0.7rem 6rem",
    backgroundColor: "#0088f2",
    color: "#fff",
    borderRadius: "0.2rem",
    marginLeft: "1rem",
  },
  disableNextButton: {
    padding: "0.5rem 6rem",
    border: "2px solid #0088f2",
    color: "#0088f2",
    borderRadius: "0.2rem",
    marginLeft: "1rem",
  },
}));
export default useStyles;
