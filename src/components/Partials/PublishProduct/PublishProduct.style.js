"use client";

import { makeStyles } from "tss-react/mui";
const useStyles = makeStyles()((theme) => ({
  publishGridContainer: {
    padding: "0rem",
  },
  loaderItem: {
    "@media (max-width: 576px)": {
      maxWidth: "100%",
      flexBasis: "100%",
    },
  },
  cardRoot: {
    height: "auto",
    borderRadius: 0,
    boxShadow: "0 8px 12px 3px rgb(0 0 0 / 6%)",
  },
  productCard: {
    padding: "2rem",
  },
  // Table
  tableContainer: {
    border: 0,
    boxShadow: "none",
    borderRadius: 0,
  },
  tableHead: {
    backgroundColor: "#ECEEF5",
    "& th": {
      borderBottom: "0px solid transparent",
    },
  },
  tableCell: {
    padding: "1rem",
    fontSize: "1.6rem",
    textAlign: "center",

    "& svg": {
      marginBottom: "-0.19rem",
    },
  },
  tableRowContent: {
    "& td": {
      borderColor: "#E3E3E3",
    },

    "&:last-child td": {
      border: 0,
    },

    "&:nth-of-type(even)": {
      backgroundColor: theme.palette.action.hover,
    },
  },
  authProductWrapper: {
    display: "flex",
  },
  publishImg: {
    width: "10rem",
  },
  premiumIcon: {
    margin: "auto 1rem",
    height: "3rem",
    width: "3rem",
    borderRadius: "100%",
    backgroundColor: "#f1f1f1",
    cursor: "pointer",
    "& img": {
      margin: "0.8rem",
      width: "1.5rem",
    },
  },
}));

export default useStyles;
