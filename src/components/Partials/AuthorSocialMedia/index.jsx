"use client";

import { Grid, Typography } from "@mui/material";
import React from "react";
import behanceIcon from "../../../assets/icons/behance.svg";
import dribbbleIcon from "../../../assets/icons/dribble.svg";
import facebookIcon from "../../../assets/icons/facebook.svg";
import instagramIcon from "../../../assets/icons/instagram.svg";
import linkedInIcon from "../../../assets/icons/linkdin.svg";
import pinterestIcon from "../../../assets/icons/pintarest.svg";
import shutterstockIcon from "../../../assets/icons/shutterstock.svg";
import twitterIcon from "../../../assets/icons/twitter.svg";
import SocialShare from "./../../ui/SocialShare/index";

const AuthorSocialMedia = ({ productDetails }) => {
  const socialMedia = [
    {
      socialUrl: productDetails?.imageDetails?.user?.facebook,
      socialIcon: facebookIcon,
    },
    {
      socialUrl: productDetails?.imageDetails?.user?.behance,
      socialIcon: behanceIcon,
    },
    {
      socialUrl: productDetails?.imageDetails?.user?.dribbble,
      socialIcon: dribbbleIcon,
    },
    {
      socialUrl: productDetails?.imageDetails?.user?.instagram,
      socialIcon: instagramIcon,
    },
    {
      socialUrl: productDetails?.imageDetails?.user?.linkedin,
      socialIcon: linkedInIcon,
    },
    {
      socialUrl: productDetails?.imageDetails?.user?.pinterest,
      socialIcon: pinterestIcon,
    },
    {
      socialUrl: productDetails?.imageDetails?.user?.shutterstock,
      socialIcon: shutterstockIcon,
    },
    {
      socialUrl: productDetails?.imageDetails?.user?.twitter,
      socialIcon: twitterIcon,
    },
  ];

  return (
    <Grid style={{ display: "flex", alignItems: "center" }}>
      {socialMedia?.length > 0 && <Typography>Follow me: </Typography>}
      <SocialShare socials={socialMedia} />
    </Grid>
  );
};

export default AuthorSocialMedia;
