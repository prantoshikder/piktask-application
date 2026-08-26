"use client";

import { List } from "@mui/material";
import React from "react";
import useStyles from "./SocialShare.styles";

const SocialShare = (props) => {
  const { classes } = useStyles();
  const { socials, copyRightSocial, width = "20px", height = "20px" } = props;

  return (
    <div className={copyRightSocial ? `${classes.containerLeft}` : `${classes.containerCenter}`}>
      <List className={classes.socialIconWrapper}>
        {socials?.length > 0 &&
          socials?.map((media, index) => (
            <div key={index}>
              {media.socialUrl && (
                <a key={index} href={media.socialUrl} target="_blank" rel="noreferrer">
                  <img
                    className={copyRightSocial ? `${classes.socialIcon}` : `${classes.socialMedia}`}
                    src={media.socialIcon}
                    alt={media.socialUrl}
                    width={width}
                    height={height}
                  />
                </a>
              )}
            </div>
          ))}
      </List>
    </div>
  );
};

export default SocialShare;
