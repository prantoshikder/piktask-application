"use client";

import { Button, Grid, Typography } from "@mui/material";
import moment from "moment";
import React, { useState } from "react";
import shareIcon from "../../../../assets/icons/share.svg";
import AuthorSocialMedia from "../../AuthorSocialMedia";
import SocialShareDialog from "../../SocialShareDialog";
import AuthorProfileInfo from "./../../AuthorProfileInfo/index";
import CopyLink from "./../../CopyLink/index";
import DownloadButton from "./DownloadButton/index";
import FavouriteButton from "./FavouriteButton/index";
import FollowButton from "./FollowButton/index";
import { useCurrentUrl } from "@/lib/browser";
import useStyles from "./ProductInfo.styles";
import SaveButton from "./SaveButton";

const ProductInfo = ({ productDetails }) => {
  const { classes } = useStyles();
  const location = useCurrentUrl();

  const [open, setOpen] = useState(false);
  const handleClickOpen = () => {
    setOpen(true);
  };

  return (
    <>
      <div className={classes.productDetails}>
        <Typography className={classes.title} variant="h2">
          {productDetails?.imageDetails?.title}
        </Typography>

        <div className={classes.buttons}>
          <Typography className={classes.creationDate}>{productDetails?.imageDetails?.creation_ago}</Typography>
          <Button className={classes.button} onClick={handleClickOpen}>
            <img className={classes.buttonIcon} src={shareIcon} alt="Share" width="13px" height="14px" />
            Share
          </Button>

          <CopyLink location={location} />
          <SaveButton productDetails={productDetails} location={location} />
        </div>

        <Grid container className={classes.detailsContainer}>
          <Grid size={{ xs: 6 }} className={classes.gridItem}>
            <div className={classes.singleItem}>
              <Typography>
                <strong>Image ID: </strong>
                {productDetails?.imageDetails?.id}
              </Typography>

              <Typography>
                <strong>File Format: </strong>{" "}
                {productDetails?.imageDetails?.extension === ("jpg" || "png" || "jpeg") ? "Photo" : productDetails?.imageDetails?.extension?.toUpperCase()}
              </Typography>
            </div>

            <div className={classes.singleItem}>
              <Typography>
                <strong>Copyright Information: </strong>
                <br />
                Piktask
              </Typography>
            </div>
          </Grid>

          <Grid size={{ xs: 6 }} className={classes.gridItem}>
            <div className={classes.singleItem}>
              <Typography>
                <strong>Created: </strong>
                {moment(productDetails?.imageDetails?.createdAt).format("ll")}
              </Typography>

              <Typography>
                <strong>Category: </strong>
                {productDetails?.imageDetails?.category?.name}
              </Typography>
            </div>

            <div className={classes.singleItem}>
              <Typography>
                <strong>Scope of authorization: </strong>
                Personal/Enterprise
              </Typography>
            </div>
          </Grid>
        </Grid>

        <Grid container>
          <Grid className={classes.authorArea}>
            {/* Author info */}
            <AuthorProfileInfo productDetails={productDetails} />

            {/* Follow button */}
            <FollowButton productDetails={productDetails} />
          </Grid>
        </Grid>

        <Grid container>
          <AuthorSocialMedia productDetails={productDetails} />
        </Grid>

        {/* <div className={classes.premiumInfo}>
                <Typography variant="h4">
                  Premium User:
                  <Button
                    className={classes.premiumViewBtn}
                    component={Link}
                    to={`/subscription`}
                  >
                    View Plans
                  </Button>
                </Typography>
                <Typography>- High-Speed Unlimited Download</Typography>
                <Typography>
                  - For commercial use{" "}
                  <Link to="!#" className={classes.moreInfoBtn}>
                    More info
                  </Link>
                </Typography>
                <div>
                  <div className={classes.licenseButton}>
                    <Typography>Images license agreement</Typography>
                    <Button
                      className={classes.licenseBtn}
                      onClick={handleDialogOpen}
                    >
                      Download License
                    </Button>
                  </div>
                  <Dialog
                    className={classes.licenseDialog}
                    open={downloadLicenseDialog}
                    onClose={handleDialogClose}
                    aria-labelledby="alert-dialog-title"
                    aria-describedby="alert-dialog-description"
                  >
                    <DialogTitle className={classes.licenseTitle}>
                      {"Piktast License"}
                    </DialogTitle>
                    <DialogContent>
                      <DialogContentText id="alert-dialog-description">
                        Let Google help apps determine location. This means
                        sending anonymous location data to Google, even when no
                        apps are running.
                      </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                      <Button
                        onClick={handleDialogClose}
                        color="primary"
                        autoFocus
                      >
                        Download
                      </Button>
                    </DialogActions>
                  </Dialog>
                </div>
                <Typography>&copy; Copyright : Piktask</Typography>
              </div> */}

        <div className={classes.buttonGroup}>
          <DownloadButton productDetails={productDetails} />

          <FavouriteButton productDetails={productDetails} />
        </div>
      </div>

      <SocialShareDialog open={open} setOpen={setOpen} productDetails={productDetails} />
    </>
  );
};

export default ProductInfo;
