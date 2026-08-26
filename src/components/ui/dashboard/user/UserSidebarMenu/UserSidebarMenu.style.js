"use client";

import { makeStyles } from "tss-react/mui";
const useStyles = makeStyles()((theme) => ({
  userMenuList: {
    boxShadow: "0 1px 2px 0 rgb(0 0 0 / 10%)",
  },
  userMenuItem: {
    padding: "1rem 1rem",
    color: "#676767",
    borderRadius: "1rem",
    marginBottom: "1.2rem",
    cursor: "pointer",
    transition: "all 0.3s linear",
    "&:hover": {
      backgroundColor: "#F4F7FF",
      color: "#4A7AFF",
    },
    "& svg": {
      fontSize: "2.2rem",
    },
    "& span": {
      fontSize: "1.5rem",
      marginLeft: "1.5rem",
    },
  },
  selectedItem: {
    backgroundColor: "#F4F7FF !important",
    color: "#4A7AFF",
  },
}));

export default useStyles;
