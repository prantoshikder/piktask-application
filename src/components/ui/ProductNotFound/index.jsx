"use client";

import { Button, Typography } from "@mui/material";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import React from "react";
import { Link } from "@/lib/router";
import NotFoundImage from "../../../assets/banner/uploadFiles.png";
import useStyles from "./ProductNotFound.style";

const ProductNotFound = ({ keywords, noCollection, contributorProductNotFound, publishContent, revisionContent, pendingContent, rejectFileContent }) => {
  const { classes } = useStyles();

  return (
    <>
      {contributorProductNotFound ? (
        <div className={classes.productNotFround}>
          <div>
            <div className={classes.notFoundImage}>
              <img src={NotFoundImage} alt="Piktask" />
            </div>

            {publishContent && <Typography variant="h3">There are no files published</Typography>}

            {revisionContent && <Typography variant="h3">No products are in revision</Typography>}

            {pendingContent && <Typography variant="h3">No products are in pending</Typography>}

            {rejectFileContent && <Typography variant="h3">No products are in rejectFile</Typography>}

            <Button className={classes.uploadBtn} component={Link} to="/contributor/upload">
              <CloudUploadIcon className={classes.ButtoncrownIcon} />
              Upload files
            </Button>
          </div>
        </div>
      ) : (
        <div className={classes.notFoundSection}>
          <div className={classes.notFoundWrap}>
            <div className={classes.notFoundImage}>
              <img src={NotFoundImage} alt="Piktask" />
            </div>
            <div>
              <Typography className={classes.title} variant="body1">
                {keywords ? `Sorry, did not find "${keywords}".` : <>{noCollection ? `Sorry, did not find the "${noCollection}".` : `Sorry, did not find.`}</>}
              </Typography>

              <Typography className={classes.helperText} variant="body1">
                You can <span>simplify</span>,<span>shorten</span>, or <span>reduce your filter criteria</span>.Or switch the language site and search again
              </Typography>

              <Button className={classes.headingButton} component={Link} to="/">
                Go Home
              </Button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ProductNotFound;
