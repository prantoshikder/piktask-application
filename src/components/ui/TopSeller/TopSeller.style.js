"use client";

import { makeStyles } from "tss-react/mui";

const useStyles = makeStyles()((theme) => ({
  productItem: {
    "@media (max-width: 576px)": {
      maxWidth: "100%",
      flexBasis: "100%",
    },
  },
}));

export default useStyles;