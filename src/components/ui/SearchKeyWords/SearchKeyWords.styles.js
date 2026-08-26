"use client";

import { makeStyles } from "tss-react/mui";

const useStyles = makeStyles()((theme) => ({
  popularSearch: {
    padding: "2rem 0rem",
    width: "100%",
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "center",
    "& a": {
      textDecoration: "none",
    },
    "@media (max-width: 769px)": {
      padding: "2rem 3rem",
    },
    [theme.breakpoints.down(480)]: {
      display: "none",
    },
  },
  searchTitle: {
    color: "#fff",
    fontSize: 16,
    margin: "0px 5px",
    fontWeight: 400,
    "@media (max-width: 1024px)": {
      marginBottom: "1.5rem",
    },
    "@media (max-width: 768px)": {
      marginBottom: "1rem",
    },
    [theme.breakpoints.down(480)]: {
      marginBottom: "0.5rem",
    },
  },
}));

export default useStyles;
