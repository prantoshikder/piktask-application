"use client";

import { makeStyles } from "tss-react/mui";
import React, { useEffect } from "react";
import { getBaseURL } from "../../../../helpers";

const useStyles = makeStyles()((theme) => ({
  imageWrapper: {
    backgroundColor: theme.palette.common.white,
    [theme.breakpoints.down(480)]: {
      backgroundColor: "transparent",
    },
  },
  image: {
    width: "100%",
    height: "100%",
    objectFit: "cover",
    padding: "2rem 2rem",

    [theme.breakpoints.down("sm")]: {
      height: "auto",
    },
    [theme.breakpoints.down(480)]: {
      padding: "0",
    },
  },
}));

const ProductImage = ({ imageDetails, setThumbnail }) => {
  const { classes } = useStyles();
  const imageThumbnail = encodeURI(`${getBaseURL().bucket_base_url}${getBaseURL().images}${imageDetails?.preview}`);

  useEffect(() => {
    setThumbnail(imageThumbnail);
  }, [setThumbnail, imageThumbnail]);

  return (
    <div className={classes.imageWrapper}>
      <img title={imageDetails.title} className={classes.image} src={imageThumbnail} alt={imageDetails?.original_name} width="817px" height="511px" />
    </div>
  );
};

export default ProductImage;
