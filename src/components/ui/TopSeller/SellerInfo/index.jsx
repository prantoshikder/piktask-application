"use client";

import { Typography } from "@mui/material";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import React from "react";
import { Link } from "@/lib/router";
import coverImage from "../../../../assets/banner/sellerCoverPhoto.jpg";
import useStyles from "./SellerInfo.styles";

const SellerInfo = ({ photo }) => {
  const { classes } = useStyles();

  return (
    <div className={classes.sellerWrapper}>
      <div className={classes.sellerItem}>
        <Link to={`/${photo.username}`}>
          <div className={classes.sellerImage}>
            <div className={classes.sellerCoverImage}>
              {photo?.avatar ? (
                <img
                  className={classes.coverImage}
                  src={photo?.avatar}
                  alt={`${photo?.username}`}
                />
              ) : (
                <img
                  className={classes.coverImage}
                  src={coverImage}
                  alt="Author images"
                />
              )}
            </div>

            <div className={classes.sellerProfileImage}>
              {photo?.avatar ? (
                <img
                  className={classes.profileImage}
                  src={photo?.avatar}
                  alt={`${photo?.username}`}
                />
              ) : (
                <AccountCircleIcon className={classes.profileImage} />
              )}
            </div>
          </div>
        </Link>

        <div className={classes.sellerInfo}>
          <Typography variant="h2">{photo?.username}</Typography>
          {/* <Typography>Resources: {photo?.total_images}</Typography> */}
          <div className={classes.resourceDetails}>
            <Typography className={classes.infoItem} variant="body2">
              Resources
              <span>{photo?.total_images}</span>
            </Typography>
            <Typography className={classes.infoItem} variant="body2">
              Followers
              <span>{photo?.total_followers}</span>
            </Typography>
            <Typography className={classes.infoItem} variant="body2">
              Downloads
              <span>{photo?.total_downloads}</span>
            </Typography>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SellerInfo;
