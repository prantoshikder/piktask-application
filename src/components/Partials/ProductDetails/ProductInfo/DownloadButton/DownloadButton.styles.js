"use client";

import { makeStyles } from "tss-react/mui";

const useStyles = makeStyles()((theme) => ({
  downloadWrapper: {
    position: "relative",
    [theme.breakpoints.down(480)]: {
      flex: 1,
    },
  },
  downloadingBtn: {
    color: "#fff",
    fontSize: 17,
    padding: "1rem 10rem",
    marginRight: "4rem",
    backgroundColor: theme.palette.primary.main,
    "&:hover": {
      backgroundColor: theme.palette.primary.main,
    },
    "& img": {
      marginRight: "1.5rem",
      width: "1.2rem",
    },
    "&.Mui-disabled": {
      color: theme.palette.common.white,
    },
    "@media (max-width: 768px)": {
      fontSize: 16,
      padding: "0.8rem 9rem",
      marginRight: "2.5rem",
    },
    [theme.breakpoints.down(480)]: {
      fontSize: 16,
      padding: "0.4rem 5.1rem",
      marginRight: "2.5rem",
    },
  },
  downloadBtn: {
    color: "#fff",
    fontSize: 17,
    padding: "1rem 10rem",
    marginRight: "4rem",
    backgroundColor: theme.palette.secondary.main,
    "&:hover": {
      backgroundColor: theme.palette.primary.main,
    },
    "& img": {
      marginRight: "1.5rem",
      width: "1.2rem",
    },
    "@media (max-width: 768px)": {
      fontSize: 16,
      padding: "0.8rem 9rem",
      marginRight: "2.5rem",
    },
    [theme.breakpoints.down(480)]: {
      width: "100%",
      fontSize: 16,
      padding: "0.4rem 6rem",
      marginRight: "1.5rem",
    },
  },
  downloadedImage: {
    position: "absolute",
    top: "-15px",
    right: "25px",
    color: "#0088f2",
    fontSize: "1.2rem",
    padding: ".3rem 1.2rem",
    borderRadius: "3rem",
    background: "#fff",
    border: "2px solid #0088f2",
    "@media (max-width: 768px)": {
      right: "12px",
    },
    [theme.breakpoints.down(480)]: {
      padding: ".2rem 1rem",
      right: 0,
    },
  },
}));

export default useStyles;
