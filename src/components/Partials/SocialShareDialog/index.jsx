"use client";

import { makeStyles } from "tss-react/mui";
import { Dialog, DialogContent, DialogTitle, IconButton } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import React from "react";
import {
  FacebookIcon,
  FacebookMessengerIcon,
  FacebookMessengerShareButton,
  FacebookShareButton,
  LinkedinIcon,
  LinkedinShareButton,
  PinterestIcon,
  PinterestShareButton,
  TelegramIcon,
  TelegramShareButton,
  TwitterIcon,
  TwitterShareButton,
} from "react-share";
import { getBaseURL } from "./../../../helpers/index";

const useStyles = makeStyles()((theme) => ({
  socialShareWrapper: {
    display: "flex",
    justifyContent: "space-between",
  },
  socialShareTitle: {
    "& h2": {
      fontSize: "1.7rem !important",
    },
  },
  closeButton: {
    height: "50%",
    margin: "0.5rem",
    "& span svg": {
      fontSize: "2.5rem",
    },
  },
}));

const SocialShareDialog = ({ productDetails, setOpen, open }) => {
  const { classes } = useStyles();

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <Dialog onClose={handleClose} aria-labelledby="customized-dialog-title" open={open}>
      <div className={classes.socialShareWrapper}>
        <DialogTitle className={classes.socialShareTitle}>{"Use image social link"}</DialogTitle>

        <IconButton aria-label="close" className={classes.closeButton} onClick={handleClose}>
          <CloseIcon />
        </IconButton>
      </div>

      <DialogContent dividers>
        <div
          style={{
            padding: "2rem",
            minWidth: "300px",
            display: "flex",
            justifyContent: "space-between",
          }}
        >
          <PinterestShareButton
            url={productDetails?.shareUrl}
            media={encodeURI(`${getBaseURL().bucket_base_url}${getBaseURL().images}${productDetails?.imageDetails?.preview}`)}
          >
            <PinterestIcon size={40} style={{ margin: "0.4rem" }} round={true} />
          </PinterestShareButton>

          <FacebookShareButton url={productDetails?.shareUrl}>
            <FacebookIcon size={40} style={{ margin: "0.4rem" }} round={true} />
          </FacebookShareButton>

          <FacebookMessengerShareButton url={productDetails?.shareUrl}>
            <FacebookMessengerIcon size={40} style={{ margin: "0.4rem" }} round={true} />
          </FacebookMessengerShareButton>

          <TwitterShareButton url={productDetails?.shareUrl}>
            <TwitterIcon size={40} style={{ margin: "0.4rem" }} round={true} />
          </TwitterShareButton>

          <LinkedinShareButton url={productDetails?.shareUrl}>
            <LinkedinIcon size={40} style={{ margin: "0.4rem" }} round={true} />
          </LinkedinShareButton>

          <TelegramShareButton url={productDetails?.shareUrl}>
            <TelegramIcon size={40} style={{ margin: "0.4rem" }} round={true} />
          </TelegramShareButton>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default SocialShareDialog;
