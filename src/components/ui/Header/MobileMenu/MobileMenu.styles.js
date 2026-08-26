"use client";

import { makeStyles } from "tss-react/mui";

const useStyles = makeStyles()((theme) => ({
  container: {
    height: "100%",
  },
  menuWrapper: {
    // padding: "1.2rem 0",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },
  menuIcon: {
    fontSize: "4rem",
    cursor: "pointer",
    color: "#FFF",
    marginLeft: "1rem",

    "@media (max-width: 577px)": {
      fontSize: "3.5rem",
    },
  },
  menuButton: {
    display: "flex",
    justifyContent: "space-around",
    alignItems: "center",
  },
  sellContentBtn: {
    ...theme.typography.button,
    fontSize: "1.3rem",
    padding: "0.2rem 1rem",
    borderColor: "#0088f2",
    marginRight: "1rem",
    border: ".2rem solid #0088f2",
    transition: "all 0.3s linear",
    "&:hover": {
      backgroundColor: "#0088f2",
      borderColor: "#0088f2",
    },
    "@media (max-width: 480px)": {
      padding: ".3rem 1.2rem !important",
      fontSize: "1rem",
    },
  },
  userAvatarArea: {
    cursor: "pointer",
    display: "flex",
    alignItems: "center",
  },
  avatar: {
    fontSize: "4.8rem",
    width: "4.8rem",
    height: "4.8rem",
    borderRadius: "100%",
    objectFit: "cover",
    position: "relative",
    right: "-0.6rem",
    color: "#FB5252",

    [theme.breakpoints.down(770)]: {
      width: "4rem",
      height: "4rem",
    },
  },
  arrowDown: {
    fontSize: "5rem",
    color: "#244e5f",
  },
  signInBtn: {
    ...theme.typography.button,
    backgroundColor: "#0088f2",
    border: ".2rem solid #0088f2",
    fontSize: "1.5rem",
    padding: "0.3rem 1rem",
    transition: "all 0.3s linear",

    "&:hover": {
      backgroundColor: "#0773c5",
      border: ".2rem solid #fff",
    },

    "@media (max-width: 480px)": {
      padding: ".3rem 1.2rem !important",
      fontSize: "1.4rem",
    },
  },
  crownIcon: {
    marginRight: ".5rem",
    height: "1.2rem",
  },

  // Mobile Menu
  paper: {
    backgroundColor: "#001c30",

    [theme.breakpoints.down(426)]: {
      width: "70%",
    },
    [theme.breakpoints.down(321)]: {
      width: "90%",
    },
  },
  closeIconWrapper: {
    backgroundColor: "rgb(1 32 54)",
    padding: "1rem",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },
  closeIcon: {
    fontSize: "3rem",
    cursor: "pointer",
    color: "#FFF",
  },
  drawerLogo: {
    width: 115,
    padding: 0,
    "& .MuiButton-label": {
      justifyContent: "flex-end",
    },
    "&:hover": {
      background: "transparent",
    },
    "& img": {
      width: "100%",
    },
    "@media (max-width: 577px)": {
      width: "11rem",

      "& img": {
        width: "100%",
      },
    },
    [theme.breakpoints.down(325)]: {
      width: "10rem",
      "& img": {
        width: "100%",
      },
    },
  },
  headerLogo: {
    width: 140,
    padding: 0,
    "& .MuiButton-label": {
      justifyContent: "flex-start",
    },
    "&:hover": {
      background: "transparent",
    },
    "& img": {
      width: "100%",
      height: "100%",
    },
    "@media (max-width: 577px)": {
      // width: "11rem",

      "& img": {
        width: "100%",
        height: "100%",
      },
    },
    [theme.breakpoints.down(325)]: {
      width: "10rem",
      "& img": {
        width: "100%",
      },
    },
  },
  logo: {
    width: "10.5rem",
    display: "block",
  },
  wrapperMenu: {
    width: "30rem",
    flexDirection: "column",
  },
  navItems: {
    width: "100%",

    "& a": {
      color: theme.palette.common.white,
      textDecoration: "none",
      transition: "all 0.3s linear",
      "&:hover": {
        color: "#FFCE00",
      },
    },
  },
  selected: {
    color: "#FFCE00",
  },
}));

export default useStyles;
