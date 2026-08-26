"use client";

import { makeStyles } from "tss-react/mui";

const useStyles = makeStyles()((theme) => ({
  container: {
    height: "100%",
  },
  mainHeaderToolbar: {
    height: "100%",
    [theme.breakpoints.down(769)]: {
      display: "none",
    },
  },
  logoWrapper: {
    width: 153,
    marginRight: "2rem",
    padding: 0,
    "&:hover": {
      background: "transparent",
    },

    "@media (max-width: 1024px)": {
      width: "13rem",

      "& img": {
        width: "100%",
      },
    },
  },
  logo: {
    width: "100%",
    display: "block",
  },
  menuTab: {
    marginLeft: 25,
  },
  menuUnderline: {
    height: 0,
    backgroundColor: "transparent",
  },
  menuItem: {
    opacity: 1,
    minWidth: "1rem",
    fontSize: 14,
    transition: "all 0.3s ease",
    "&.active": {
      color: theme.palette.secondary.main,
    },
    "&:last-child": {
      marginRight: "3rem",
    },
    "&:hover": {
      color: theme.palette.secondary.main,
    },

    "@media (max-width: 1024px)": {
      marginRight: 0,
      paddingLight: ".5rem",
      paddingLeft: ".5rem",
      fontSize: "1.4rem",

      "&:last-child": {
        marginRight: ".5rem",
      },
    },
  },
  toolBarContainer: {
    marginLeft: "auto",
  },
  sellContentBtn: {
    ...theme.typography.button,
    fontSize: "1.4rem",
    padding: "0.3rem 1rem",
    borderColor: "#0088f2",
    marginLeft: "1rem",
    marginRight: "1rem",
    border: ".2rem solid #0088f2",
    transition: "all 0.3s linear",
    "&:hover": {
      backgroundColor: "#0088f2",
      borderColor: "#0088f2",
    },
  },
  userAvatarArea: {
    cursor: "pointer",
    display: "flex",
    alignItems: "center",
  },
  avatar: {
    fontSize: "4.8rem",
    width: "3.6rem",
    height: "3.6rem",
    borderRadius: "100%",
    objectFit: "cover",
    position: "relative",
    right: "-0.6rem",
    color: "#FB5252",
  },
  arrowDown: {
    fontSize: "3.5rem",
    color: "#244e5f",
  },
  crownIcon: {
    marginRight: ".5rem",
    height: "1.4rem",
  },
  signInBtn: {
    ...theme.typography.button,
    backgroundColor: "#0088f2",
    border: ".2rem solid #0088f2",
    fontSize: "1.4rem",
    padding: "0.3rem 1rem",
    transition: "all 0.3s linear",

    "&:hover": {
      backgroundColor: "#0773c5",
      border: ".2rem solid #fff",
    },

    "@media (max-width: 480px)": {
      padding: ".8rem 1.5rem !important",
    },
  },
}));

export default useStyles;
