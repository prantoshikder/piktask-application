"use client";

import { makeStyles } from "tss-react/mui";

const useStyles = makeStyles()((theme) => ({
  adminRoot: {
    // display: "flex",
  },
  content: {
    padding: 0,
    marginLeft: "28rem",
    [theme.breakpoints.down(769)]: {
      width: "100%",
      marginLeft: "0rem",
    },
  },
  withdrawHistoryWrapper: {
    marginTop: "10rem",
    margin: "2rem",
  },
  headingWrapper: {
    display: "flex",
    justifyContent: "space-between",
  },
  // Selected period fields
  dateRanges: {
    padding: "2rem",
    marginBottom: "2rem",
    backgroundColor: "#fff",
    boxShadow: "0 8px 12px 3px rgb(0 0 0 / 6%)",
  },
  statisticsFormWrapper: {
    paddingBottom: "1rem",
    // marginBottom: "2rem",
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
    },
  },

  publishGridContainer: {
    paddingTop: "1rem",
    paddingBottom: "4rem",
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
    textAlign: "left",
  },
  statusSuccess: {
    color: "#03911a",
    textTransform: "capitalize",
  },
  statusDanger: {
    color: "#ff0000",
    textTransform: "capitalize",
  },
  statusPending: {
    color: "#0088f2",
    textTransform: "capitalize",
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
  invoiceButton: {
    padding: "0 1.5rem",
    backgroundColor: "#0088f2",
    color: "#fff",
    border: ".2rem solid",
    borderColor: "#0088f2",
    transition: "all 0.3s linear",
    "&:hover": {
      backgroundColor: "#0773c5",
      borderColor: "#0773c5",
    },
  },
}));

export default useStyles;
