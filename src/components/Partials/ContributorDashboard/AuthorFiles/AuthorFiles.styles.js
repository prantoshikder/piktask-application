"use client";

import { makeStyles } from "tss-react/mui";

const useStyles = makeStyles()((theme) => ({
  filesGridContainer: {
    padding: "0rem 1rem 1rem 1rem",
  },
  loaderItem: {
    "@media (max-width: 576px)": {
      maxWidth: "100%",
      flexBasis: "100%",
    },
  },
  cardRoot: {
    height: "57.6rem",
    borderRadius: 0,
    boxShadow: "0 8px 12px 3px rgb(0 0 0 / 6%)",
    margin: "1rem",
  },
  cardHeading: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    padding: "1rem 0rem",

    "& h2": {
      fontSize: "1.8rem",
    },
  },
  loadMoreBtn: {
    ...theme.typography.button,
    padding: ".2rem 1.5rem",
    backgroundColor: "#fff",
    color: "#000",
    border: ".2rem solid",
    borderColor: "#0088f2",
    transition: "all 0.3s linear",
    "&:hover": {
      borderColor: "#0088f2",
      backgroundColor: "#0088f2",
      color: "#fff",
    },
  },
  authorCard: {
    padding: "2rem",
  },
  authorBadge: {
    position: "absolute",
    top: 0,
    right: "1.5rem",
    width: "4rem",
  },
  authorImg: {
    width: "5rem",
    height: "5rem",
    borderRadius: "100%",
    border: "2px solid #ECEEF5",
    padding: "2px",
    marginBottom: "0.5rem",
  },
  // Table
  tableContainer: {
    border: 0,
    boxShadow: "none",
    borderRadius: 0,
  },
  earningImg: {
    width: "10rem",
  },
  tableHead: {
    backgroundColor: "#ECEEF5",
    "& th": {
      borderBottom: "0px solid transparent",
    },
  },
  tableRowContent: {
    "& td": {
      borderColor: "#E3E3E3",
    },
    "&:last-child td": {
      border: 0,
    },
  },
  tableCell: {
    padding: "1rem",
    fontSize: "1.6rem",
    // textAlign: "center",
    "& svg": {
      marginBottom: "-0.19rem",
    },
  },
  authProductWrapper: {
    display: "flex",
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
  authorImgWrapper: {
    position: "relative",
    "& img": {
      marginBottom: 0,
    },
    "& img:first-child": {
      marginRight: "1rem",
    },
  },
  bestAuthorBadge: {
    position: "absolute",
    width: "1.8rem",
    objectFit: "cover",
    top: "1rem",
  },
}));

export default useStyles;
