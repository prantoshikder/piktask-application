"use client";

import { makeStyles } from "tss-react/mui";

const useStyles = makeStyles()((theme) => ({
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
  dashboardGridContainer: {
    marginTop: "6rem",
    padding: "2rem",
    minHeight: "60vh",
  },
  headingWrapper: {
    display: "flex",
    justifyContent: "space-between",
    marginTop: "2rem",
    marginBottom: "3rem",

    "@media (max-width: 990px)": {
      flexDirection: "column",
      alignItems: "flex-start",

      "& h2": {
        marginBottom: "1.5rem",
      },
    },
  },
  contentWrapper: {
    "& h3": {
      fontSize: "1.5rem",
      fontWeight: 500,
      margin: "1rem 0",
      color: "#143340",
    },
    "& p": {
      fontSize: "1.4rem",
    },
  },
  actionBtn: {
    ...theme.typography.button,
    padding: ".2rem 2rem",
    backgroundColor: theme.palette.primary.main,
    marginLeft: "1rem",
    border: ".2rem solid",
    borderColor: "transparent",
    fontWeight: 500,
    fontSize: "1.6rem",

    "@media (max-width: 990px)": {
      marginBottom: "1.5rem",
      padding: ".4rem 2rem",
      fontSize: "1.4rem",
    },
  },
  deleteBtn: {
    backgroundColor: "#FB5252",
    transition: "all 0.3s linear",
    "&:hover": {
      borderColor: "#FB5252",
      color: "#FB5252",
    },

    "@media (max-width: 990px)": {
      marginLeft: 0,
    },
  },
  addFileBtn: {
    backgroundColor: "#0088f2",
    transition: "all 0.3s linear",
    "&:hover": {
      borderColor: "#0088f2",
      color: "#0088f2",
    },
  },
  workInfoBtn: {
    backgroundColor: "#EF9D38",
    transition: "all 0.3s linear",
    "&:hover": {
      borderColor: "#EF9D38",
      color: "#EF9D38",
    },
  },
  productItem: {
    position: "relative",
    "@media (max-width: 576px)": {
      maxWidth: "50%",
      flexBasis: "50%",
    },
  },
  pendingFileCard: {
    position: "relative",
    padding: "3.5rem 1rem 0",
    border: "2px solid transparent",
    height: "100%",

    "& img": {
      width: "100%",
      height: "10rem",
      borderRadius: theme.shape.borderRadius,
      objectFit: "cover",
    },
    "& h3": {
      fontSize: "1.4rem",
      marginBottom: "1rem",
      lineBreak: "anywhere",
    },
    "& p": {
      fontSize: "1.2rem",
    },
  },
  productInfo: {
    padding: "1rem 0",
  },
  btnWrapper: {
    position: "absolute",
    top: "1.5rem",
    right: "1.5rem",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 1,
  },
  deleteIcon: {
    color: "#DDD",
    border: "0.1rem solid",
    borderColor: "#DDDDDD",
    padding: "0.1rem",
    fontSize: "2.2rem",
    cursor: "pointer",
    transition: "all 0.3s linear",

    "&:hover": {
      borderColor: "#FB5252",
      color: "#FB5252",
    },
  },
  editItemContainer: {
    width: "45rem",
    padding: "3rem 4.5rem",

    "@media (max-width: 600px)": {
      width: "100%",
    },
  },
  editItemHeader: {
    padding: "1rem 2rem 0",
    "& hr": {
      border: "0 solid transparent",
      backgroundColor: "#ddd",
      height: "0.1rem",
    },
  },
  headingContent: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: "1.5rem",
  },
  closeIcon: {
    cursor: "pointer",
    fontSize: "3.5rem",
    color: "#B7B7B7",
    "&:hover": {
      color: "#FB5252",
    },
  },
}));

export default useStyles;
