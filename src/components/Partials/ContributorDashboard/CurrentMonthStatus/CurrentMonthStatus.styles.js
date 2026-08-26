"use client";

import { makeStyles } from "tss-react/mui";

const useStyles = makeStyles()((theme) => ({
  dashboardGridContainer: {
    padding: "1.5rem 1rem 0rem 1rem",
    marginTop: "8rem",
  },
  totalStatus: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    margin: "0rem 1rem",
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
  loaderItem: {
    "@media (max-width: 576px)": {
      maxWidth: "50%",
      flexBasis: "50%",
    },
  },
  statisticsContent: {
    textAlign: "center",
    margin: "1rem",
    backgroundColor: "#fff",
    paddingBottom: "1.5rem",
    boxShadow: "0 8px 12px 3px rgb(0 0 0 / 6%)",
    "&:hover": {
      "& img": {
        transform: "rotate(360deg)",
        transition: "all 0.5s linear",
      },
    },
  },
  arrowIcon: {
    margin: "0 auto",
    backgroundColor: "#EEEDFC",
  },
  statisticsIcon: {
    borderRadius: "100%",
    width: "4rem",
    height: "4rem",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    // marginRight: "1.5rem",
    "& img": {
      width: "2rem",
      height: "2rem",
    },
    "@media (max-width: 1170px)": {
      width: "5rem",
      height: "5rem",
      "& img": {
        width: "1.8rem",
        height: "1.8rem",
      },
    },
  },
  totalCount: {
    fontSize: "2.5rem",
    margin: "2rem 0rem",
    lineHeight: 1,
    "& span": {
      color: "#b6b6b6",
      fontSize: "1.4rem",
      display: "block",
      marginTop: ".7rem",
      fontWeight: "400",
    },
    "@media (max-width: 1170px)": {
      fontSize: "2.2rem",
      "& span": {
        fontSize: "1.4rem",
      },
    },
  },
}));
export default useStyles;
