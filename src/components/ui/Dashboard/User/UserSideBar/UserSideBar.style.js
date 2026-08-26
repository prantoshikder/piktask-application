"use client";

import { makeStyles } from "tss-react/mui";
import userBackground from "../../../../../assets/user/user-background.png";

const useStyles = makeStyles()((theme) => ({
  userProfile: {
    padding: "0",
    marginBottom: "1.6rem",
    boxShadow: "0 1px 2px 0 rgb(0 0 0 / 10%)",
    position: "relative",
    "&::before": {
      backgroundImage: `url(${userBackground})`,
      backgroundRepeat: "no-repeat",
      content: '""',
      position: "absolute",
      top: 0,
      left: 0,
      width: "100%",
      height: "100%",
    },
  },
  userProfileContent: {
    paddingTop: "4rem",
    paddingBottom: "4rem",
    position: "relative",
  },
  profileImage: {
    position: "relative",
    overflow: "hidden",
    "& img": {
      height: "12rem",
      Width: "12rem",
      borderRadius: "50%",
      objectFit: "cover",
      display: "flex",
      margin: "0 auto",
      padding: "0.2rem",
      boxShadow: "0px 0px 5px #ddd",
    },
    "&:hover": {
      "& $avatarOverlay": {
        opacity: 1,
        visibility: "visible",
        transition: "all 0.3s linear",
        cursor: "pointer",
      },
    },
  },
  avatarOverlay: {
    bottom: "0",
    left: "50%",
    position: "absolute",
    transform: "translateX(-50%)",
    opacity: 0,
    visibility: "hidden",
  },
  bgOverlay: {
    height: "6rem",
    width: "11.6rem",
    padding: "0.2rem",
    borderBottomRightRadius: "90px",
    borderBottomLeftRadius: "90px",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.6)",
    overflow: "hidden",
  },
  uploadIcon: {
    fontSize: "2.5rem",
    color: "#fff",
    cursor: "pointer",
  },
  profileInfo: {
    textAlign: "center",
    marginTop: "1rem",

    "& h2": {
      fontSize: "2.5rem",
      fontWeight: "700",
    },
    "& p": {
      fontSize: "1.4rem",
      marginTop: "0.2rem",
    },
  },
  socialIcons: {
    marginTop: "1.5rem",
  },
}));

export default useStyles;
