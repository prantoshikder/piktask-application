"use client";

import { makeStyles } from "tss-react/mui";

const useStyles = makeStyles()((theme) => ({
  cardWrapper: {
    display: "flex",
    alignItems: "center",
    // width: "100%",
    justifyContent: "space-between",
    paddingTop: "3rem",
    paddingBottom: "3rem",
    marginTop: "2rem",
    boxShadow:
      "rgb(0 0 0 / 5%) 0px 10px 15px -3px, rgb(0 0 0 / 5%) 0px 4px 6px -2px",
    marginBottom: "3.5rem",

    "@media (max-width: 1024px)": {
      flexWrap: "wrap",
      justifyContent: "space-between",
    },
    "@media (max-width: 640px)": {
      justifyContent: "center",
    },
  },
  graphBox: {
    display: "flex",
    alignItems: "center",
    flexDirection: "column",
    position: "relative",
    width: "100%",

    "&:after": {
      content: '""',
      position: "absolute",
      right: 0,
      top: 0,
      backgroundColor: "rgb(112 112 112 / 18%)",
      width: "1px",
      height: "100%",
    },
    "&:last-child:after": {
      backgroundColor: "transparent",
      width: 0,
      height: 0,
    },

    "@media (max-width: 1024px)": {
      width: "auto",
      paddingRight: "2rem",
      paddingLeft: "2rem",
      marginBottom: "3rem",

      // "&:after": {
      //   backgroundColor: "transparent",
      //   width: 0,
      //   height: 0,
      // },
    },
    "@media (max-width: 577px)": {
      width: "auto",
      paddingRight: "2rem",
      paddingLeft: "2rem",
      marginBottom: "3rem",

      "&:after": {
        backgroundColor: "transparent",
        width: 0,
        height: 0,
      },
    },
  },
  amount: {
    color: "#FDA701",
    fontSize: "2.8rem",
    marginBottom: "1rem",
    fontWeight: 600,
  },
  title: {
    color: "#4D4D4D",
    fontSize: "1.5rem",
    marginBottom: "0.8rem",
  },
  // totalEarningColor: {
  //   color: "#6EE671",
  // },
  paidDownloadColor: {
    color: "#FB5252",
  },
  freeDownloadColor: {
    color: "#257DED",
  },
  totalDownloadColor: {
    color: "#117A00",
  },
}));

export default useStyles;
