"use client";

import { Dialog, DialogContent, DialogTitle, IconButton } from "@/components/ui-kit";
import { CloseOutlined as CloseIcon } from "@ant-design/icons";
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



const SocialShareDialog = ({ productDetails, setOpen, open }) => {
  const handleClose = () => {
    setOpen(false);
  };

  return (
    <Dialog onClose={handleClose} aria-labelledby="customized-dialog-title" open={open}>
      <div className="flex justify-between">
        <DialogTitle className="[&_h2]:text-[1.7rem]!">{"Use image social link"}</DialogTitle>

        <IconButton aria-label="close" className="h-[50%] m-[0.5rem] [&_span_svg]:text-[2.5rem]" onClick={handleClose}>
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
