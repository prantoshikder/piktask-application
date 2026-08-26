"use client";

import { makeStyles } from "tss-react/mui";

const useStyles = makeStyles()((theme) => ({
  inputField: {
    marginBottom: "2rem",
    "& .MuiInputLabel-outlined": {
      zIndex: 1,
      transform: "translate(14px, 17px) scale(1)",
      pointerEvents: "none",
    },
    "& .MuiInputLabel-outlined.MuiInputLabel-shrink": {
      transform: "translate(14px, -6px) scale(0.75)",
    },
    "& .MuiOutlinedInput-input": {
      padding: "15px 14px",
    },
  },
  primaryBtn: {
    paddingTop: ".6rem",
    paddingBottom: ".6rem",
    textTransform: "capitalize",
  },
  authBtn: {
    // backgroundColor: "#117A00",
    backgroundColor: "#0088f2",
    padding: "6px 16px",
    color: theme.palette.common.white,
    fontSize: "1.6rem",

    "&:hover": {
      backgroundColor: "#0773c5",
    },
  },
}));

export default useStyles;
