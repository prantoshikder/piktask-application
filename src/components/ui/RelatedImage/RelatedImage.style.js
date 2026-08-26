"use client";

import { makeStyles } from "tss-react/mui";

const useStyles = makeStyles()((theme) => ({
  productItem: {
    "@media (max-width: 576px)": {
      maxWidth: "100%",
      flexBasis: "100%",
    },
  },
  // loadMoreBtn: {
  //   padding: "0.6rem 1.5rem",
  //   backgroundColor: "#0088f2",
  //   color: "#fff",
  //   marginTop: "2.5rem",
  //   border: ".2rem solid",
  //   borderColor: "#0088f2",
  //   transition: "all 0.3s linear",
  //   "&:hover": {
  //     backgroundColor: "#0773c5",
  //     borderColor: "#0773c5",
  //     color: "#fff",
  //   },
  // },
}));

export default useStyles;
