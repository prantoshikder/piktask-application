"use client";

import { makeStyles } from "tss-react/mui";

const useStyles = makeStyles()((theme) => ({
  productItem: {
    "@media (max-width: 576px)": {
      maxWidth: "50%",
      flexBasis: "50%",
    },
  },
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
  rejectFilesWrapper: {
    marginTop: "10rem",
    margin: "2rem",
    minHeight: "50vh",
  },
  noItemsFound: {
    marginLeft: "1.5rem",
  },
  headingWrapper: {
    marginTop: "2rem",
    marginBottom: "1.5rem",
    "& p": {
      marginTop: "2rem",
      fontSize: "1.5rem",
    },
  },
  cardWrapper: {
    position: "relative",
    cursor: "pointer",
    height: "100%",
    "& img": {
      width: "100%",
      height: 150,
      borderRadius: "0.1rem",
    },
    "& .MuiCardContent-root": {
      paddingBottom: "0rem !important",
    },
  },
  cardImage: {
    padding: "0.4rem 0.4rem 0rem 0.4rem",
    height: 120,
    "& img": {
      height: "100%",
      width: "100%",
      objectFit: "cover",
    },
  },
  cardContent: {
    padding: "0rem",
    backgroundColor: "#f1f1f1",
    marginTop: "-0.39rem !important",
    "& h3": {
      fontSize: "1.4rem",
      lineHeight: "1.5",
      color: "#114960",
      textAlign: "center",
      padding: "0.5rem 0rem",
      lineBreak: "anywhere",
    },
    "& .MuiCardContent-root": {
      padding: "0rem !important",
    },
  },

  // Modal
  drawerRoot: {
    zIndex: "9999 !important",
  },
  paper: {
    width: "40rem",
    top: "0rem",
    height: "100%",
    borderTop: "1px solid #ddd",
  },
  closeIcon: {
    cursor: "pointer",
    fontSize: "2.5rem",
    color: "#B7B7B7",
    "&:hover": {
      color: "#0088f2",
    },
  },
  modalContainer: {
    "& hr": {
      border: "0 solid transparent",
      backgroundColor: "#ddd",
      height: "0.1rem",
    },
  },
  modalHeader: {
    padding: "2rem 2rem 0",
  },
  headingContent: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: "1.5rem",
  },

  rejectionMessage: {
    padding: "2rem",
    margin: "2.2rem 0",
    "& p": {
      color: "#B1B1B1",
      lineHeight: 1.6,
    },
  },
  article: {
    marginBottom: "2rem",
    paddingBottom: "2rem",
    borderBottom: "1px solid #ddd",
    "&:last-child": {
      marginBottom: "0rem",
      borderBottom: "0px solid transparent",
    },
  },
  headingTitle: {
    fontSize: "2rem",
    color: "#114960",
  },
  title: {
    fontSize: "2rem",
    marginBottom: "1.5rem",
    color: "#114960",
  },
}));

export default useStyles;
