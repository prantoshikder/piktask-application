"use client";

import { makeStyles } from "tss-react/mui";

const useStyles = makeStyles()((theme) => ({
  cardMain: {
    padding: "2rem",
    borderRadius: 15,
    boxShadow: "0px 0px 10px #ddd",
    transition: "all 0.3s linear",

    "&:hover": {
      transform: "translateY(-7px)",
    },
  },
  cardImage: {
    width: "20rem",
    margin: "0 auto",
    minHeight: 200,
    "& img": {
      height: "100%",
      width: "100%",
      objectFit: "cover",
    },
  },
  cardHeading: {
    textAlign: "center",
  },
  cardContent: {
    padding: "3rem 2rem 1rem",
    textAlign: "center",

    "& p": {
      fontSize: "1.6rem",
      lineHeight: "3rem",
    },
    "& svg": {
      fontSize: "1.6rem",
      marginBottom: "-0.2rem",
      marginRight: "1rem",
      color: "#0088f2",
    },
  },
  cardButton: {
    textAlign: "center",
  },
  viewPlanButton: {
    padding: "0.5rem 6rem",
    backgroundColor: "#0088f2",
    color: "#fff",
    marginTop: "2.5rem",
    border: ".2rem solid",
    borderColor: "#0088f2",
    transition: "all 0.3s linear",
    "&:hover": {
      backgroundColor: "#0773c5",
      borderColor: "#0773c5",
      color: "#fff",
    },
  },
}));

export default useStyles;
