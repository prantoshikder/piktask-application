"use client";

import { Button, Grid, Typography } from "@/components/ui-kit";
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
import SaveButton from "./SaveButton";

const ProductInfo = ({ productDetails }) => {
  const location = useCurrentUrl();

  const [open, setOpen] = useState(false);
  const handleClickOpen = () => {
    setOpen(true);
  };

  return (
    <>
      <div>
        <Typography className="pr-[2rem] text-[2.2rem] max-[479.95px]:text-[2rem] max-[479.95px]:pr-[0]" variant="h2">
          {productDetails?.imageDetails?.title}
        </Typography>

        <div className="flex mt-[1.5rem] items-center min-[1279px]:flex max-[624.95px]:flex">
          <Typography className="text-[1.5rem] mr-[10px] max-[479.95px]:text-[1.3rem]">{productDetails?.imageDetails?.creation_ago}</Typography>
          <Button className="text-[#14323F] font-[500] font-['Roboto',sans-serif] capitalize text-[1.3rem] rounded-[3rem] opacity-[1] leading-[1.75] p-[.6rem_2.5rem] [border:1px_solid_#D9DBE1] ml-[1.5rem] hover:bg-[#F0F7EF] min-[1279px]:ml-[.8rem] max-[479.95px]:p-[.6rem_1.2rem] max-[479.95px]:text-[1.1rem] max-[479.95px]:mb-[0rem] max-[479.95px]:ml-[1rem]" onClick={handleClickOpen}>
            <img className="w-[1.3rem] p-[0] mr-[0.8rem]" src={shareIcon.src} alt="Share" width="13px" height="14px" />
            Share
          </Button>

          <CopyLink location={location} />
          <SaveButton productDetails={productDetails} location={location} />
        </div>

        <Grid container className="w-[55rem] mt-[2rem] mb-[1rem] max-[767.95px]:w-[55rem] max-[479.95px]:w-[100%]">
          <Grid size={{ xs: 6 }} className="w-[100%] last:mb-[0]">
            <div className="mb-[1.3rem] pr-[1.2rem] [&_p]:text-[1.4rem] [&_p]:max-[479.95px]:text-[1.2rem]">
              <Typography>
                <strong>Image ID: </strong>
                {productDetails?.imageDetails?.id}
              </Typography>

              <Typography>
                <strong>File Format: </strong>{" "}
                {productDetails?.imageDetails?.extension === ("jpg" || "png" || "jpeg") ? "Photo" : productDetails?.imageDetails?.extension?.toUpperCase()}
              </Typography>
            </div>

            <div className="mb-[1.3rem] pr-[1.2rem] [&_p]:text-[1.4rem] [&_p]:max-[479.95px]:text-[1.2rem]">
              <Typography>
                <strong>Copyright Information: </strong>
                <br />
                Piktask
              </Typography>
            </div>
          </Grid>

          <Grid size={{ xs: 6 }} className="w-[100%] last:mb-[0]">
            <div className="mb-[1.3rem] pr-[1.2rem] [&_p]:text-[1.4rem] [&_p]:max-[479.95px]:text-[1.2rem]">
              <Typography>
                <strong>Created: </strong>
                {moment(productDetails?.imageDetails?.createdAt).format("ll")}
              </Typography>

              <Typography>
                <strong>Category: </strong>
                {productDetails?.imageDetails?.category?.name}
              </Typography>
            </div>

            <div className="mb-[1.3rem] pr-[1.2rem] [&_p]:text-[1.4rem] [&_p]:max-[479.95px]:text-[1.2rem]">
              <Typography>
                <strong>Scope of authorization: </strong>
                Personal/Enterprise
              </Typography>
            </div>
          </Grid>
        </Grid>

        <Grid container>
          <Grid className="w-[100%] flex items-center mt-[1.5rem] max-[479.95px]:justify-between">
            {/* Author info */}
            <AuthorProfileInfo productDetails={productDetails} />

            {/* Follow button */}
            <FollowButton productDetails={productDetails} />
          </Grid>
        </Grid>

        <Grid container>
          <AuthorSocialMedia productDetails={productDetails} />
        </Grid>

        {/* <div className="bg-[#E1E3EB] p-[1rem_2rem_2rem] w-[55rem] mt-[2rem] rounded-[1rem] [&_h4]:mb-[1rem] [&_h4]:text-[1.8rem] [&_h4]:flex [&_h4]:items-center [&_h4]:max-[479.95px]:text-[1.5rem] [&_p]:mb-[.6rem] [&_p]:text-[1.3rem] max-[479.95px]:w-[100%] max-[479.95px]:p-[1rem]">
                <Typography variant="h4">
                  Premium User:
                  <Button
                    className="bg-[#EDAF41] text-[#fff] p-[.5rem_2rem] ml-[2rem] [transition:all_0.3s_linear] hover:bg-[#EDAF41] max-[479.95px]:p-[.3rem_1.5rem] max-[479.95px]:ml-[2rem]"
                    component={Link}
                    to={`/subscription`}
                  >
                    View Plans
                  </Button>
                </Typography>
                <Typography>- High-Speed Unlimited Download</Typography>
                <Typography>
                  - For commercial use{" "}
                  <Link to="!#" className="text-[#117A00] no-underline text-[1.6rem]">
                    More info
                  </Link>
                </Typography>
                <div>
                  <div className="flex items-center justify-between">
                    <Typography>Images license agreement</Typography>
                    <Button
                      className="bg-[#CAD3D2] text-[#117A00] p-[.5rem_2rem] [transition:all_0.3s_linear] max-[479.95px]:p-[0.2rem_.6rem] max-[479.95px]:text-[1.2rem]"
                      onClick={handleDialogOpen}
                    >
                      Download License
                    </Button>
                  </div>
                  <Dialog
                    className="[&_div_div]:w-[50rem] [&_div_div]:max-[479.95px]:w-[100%]"
                    open={downloadLicenseDialog}
                    onClose={handleDialogClose}
                    aria-labelledby="alert-dialog-title"
                    aria-describedby="alert-dialog-description"
                  >
                    <DialogTitle className="[&_h2]:text-[1.8rem]!">
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

        <div className="mt-[25px] flex max-[479.95px]:justify-between max-[479.95px]:gap-[10px]">
          <DownloadButton productDetails={productDetails} />

          <FavouriteButton productDetails={productDetails} />
        </div>
      </div>

      <SocialShareDialog open={open} setOpen={setOpen} productDetails={productDetails} />
    </>
  );
};

export default ProductInfo;
