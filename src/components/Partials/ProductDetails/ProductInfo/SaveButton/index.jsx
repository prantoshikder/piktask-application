"use client";

import { makeStyles } from "tss-react/mui";
import PinterestIcon from "@mui/icons-material/Pinterest";
import React from "react";
import { PinterestShareButton } from "react-share";
import { getBaseURL } from "../../../../../helpers";

const useStyles = makeStyles()((theme) => ({
  tooltip: {
    fontSize: "1.3rem",
  },
  button: {
    fontSize: "1.5rem",
    padding: "0.8rem 2rem",
    backgroundColor: "#a70000",
    color: "#fff",
    fontWeight: 500,
    border: "1px solid #a70000",
    borderRadius: 20,
    marginLeft: "1.5rem",
    "& svg": {
      fontSize: "2rem",
      marginBottom: "-0.5rem",
      marginRight: "0.5rem",
    },
    [theme.breakpoints.up(1279)]: {
      marginLeft: ".8rem",
    },
    [theme.breakpoints.down(480)]: {
      padding: ".6rem 1.2rem",
      fontSize: "1.1rem",
      marginBottom: "0rem",
      marginLeft: "1rem",
    },
  },
  buttonIcon: {
    width: "1.3rem",
    padding: 0,
    marginRight: "0.8rem",
  },
}));

const SaveButton = ({ location, productDetails }) => {
  const { classes } = useStyles();
  return (
    <PinterestShareButton url={location} media={encodeURI(`${getBaseURL().bucket_base_url}${getBaseURL().images}${productDetails?.imageDetails?.preview}`)}>
      <div className={classes.button}>
        {/* <PinterestIcon size={20} round={true} /> */}
        <PinterestIcon />
        Save
      </div>
    </PinterestShareButton>
  );
};

export default SaveButton;
