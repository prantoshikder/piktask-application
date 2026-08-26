"use client";

import { makeStyles } from "tss-react/mui";

const useStyles = makeStyles()((theme) => ({
  dateRanges: {
    padding: "2rem",
    marginBottom: "2rem",
    backgroundColor: "#fff",
    boxShadow: "0 8px 12px 3px rgb(0 0 0 / 6%)",
  },
  statisticsFormWrapper: {
    paddingBottom: "1rem",
  },
  selectPeriodFrom: {
    display: "flex",
    alignItems: "center",
    flexWrap: "wrap",

    "@media (max-width: 990px)": {
      flexDirection: "column",
      alignItems: "flex-start",
    },
  },
  fieldTitle: {
    fontSize: "1.4rem",
    color: "#4D4D4D",
    marginBottom: ".2rem",
  },
  fields: {
    marginRight: "1.8rem",

    "@media (max-width: 960px)": {
      marginBottom: "1.8rem",
    },
  },
  formControl: {
    marginRight: "1.5rem",
    "& select": {
      paddingTop: "1.3rem",
      paddingBottom: "1.3rem",
      backgroundColor: theme.palette.common.white,
    },
    "& fieldset": {
      borderColor: "#E0E0E0",
    },
  },
  showMoreBtn: {
    padding: "0.6rem 1.5rem",
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
