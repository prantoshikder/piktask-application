"use client";

import { makeStyles } from "tss-react/mui";

const useStyles = makeStyles()((theme) => ({
  adminRoot: {
    // display: "flex",
  },
  adminSidebar: {
    marginTop: "0rem",
    [theme.breakpoints.down(769)]: {
      display: "none",
    },
  },
  content: {
    padding: 0,
    marginLeft: "28rem",
    [theme.breakpoints.down(769)]: {
      width: "100%",
      marginLeft: "0rem",
    },
  },
  publishFileWrapper: {
    marginTop: "10rem",
    margin: "2rem",
    minHeight: "60vh",
  },
  noItemsFound: {
    marginLeft: "1.5rem",
  },
  headingWrapepr: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: "2rem",
    marginBottom: "1.5rem",
  },
  cardWrapper: {
    position: "relative",
    padding: "1.5rem",
    cursor: "pointer",
    "& img": {
      width: "100%",
      height: 150,
      borderRadius: theme.shape.borderRadius,
    },
    "& .MuiCardContent-root": {
      paddingBottom: "0rem !important",
    },
  },
  itemFooter: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    color: "#117A00",
    fontSize: "1.5rem",
  },
  cardContent: {
    padding: "1rem 1rem 1rem 0rem",
    "& h3": {
      fontSize: "2rem",
      marginBottom: "1rem",
      lineHeight: "1.5",
      color: "#114960",
    },
    "& h6": {
      fontSize: "1.5rem",
      fontWeight: 500,
      color: "#FF0000",
      cursor: "pointer",
    },
  },
}));

export default useStyles;
