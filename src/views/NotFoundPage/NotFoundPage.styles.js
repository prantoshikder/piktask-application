"use client";

import { makeStyles } from "tss-react/mui";
// import pageNotFound from "../../assets/banner/page-not-found.jpg";

const useStyles = makeStyles()((theme) => ({
  pageNotFound: {
    // backgroundImage: `url(${pageNotFound})`,
    // backgroundPosition: "center center",
    // backgroundSize: "cover",
    // backgroundRepeat: "no-repeat",
    backgroundColor: "#000",
    paddingTop: "10rem",
    // height: "80vh",
  },
  pageNotFoundImg: {
    height: "50rem",
    width: "100%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    margin: "0 auto",
    "& img": {
      height: "100%",
      width: "100%",
      objectFit: "cover",
    },
    [theme.breakpoints.down(426)]: {
      height: "40rem",
      width: "100%",
    },
  },
}));

export default useStyles;
