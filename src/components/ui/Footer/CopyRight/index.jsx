"use client";

import { Container, Grid, Typography } from "@mui/material";
import React from "react";
import { Link } from "@/lib/router";
import behance from "../../../../assets/icons/behance.svg";
import dribbble from "../../../../assets/icons/dribble.svg";
import facebook from "../../../../assets/icons/facebook.svg";
import instagram from "../../../../assets/icons/instagram.svg";
import linkedIn from "../../../../assets/icons/linkdin.svg";
import pinterest from "../../../../assets/icons/pintarest.svg";
import youTube from "../../../../assets/icons/youtube.svg";
import logo from "../../../../assets/Logo/piktask.png";
import SocialShare from "../../SocialShare";
import useStyles from "./CopyRight.styles";

const CopyRight = () => {
  const { classes } = useStyles();
  const socialMedia = [
    {
      socialUrl: "https://dribbble.com/piktask",
      socialIcon: dribbble,
    },
    {
      socialUrl: "https://www.behance.net/piktask/",
      socialIcon: behance,
    },
    {
      socialUrl: "https://www.instagram.com/piktaskltd/",
      socialIcon: instagram,
    },
    {
      socialUrl: "https://www.facebook.com/piktaskltd",
      socialIcon: facebook,
    },
    {
      socialUrl: "https://www.pinterest.com/piktaskltd",
      socialIcon: pinterest,
    },
    {
      socialUrl: "https://www.linkedin.com/company/piktask/",
      socialIcon: linkedIn,
    },
    {
      socialUrl: "https://www.youtube.com/channel/UCoZMhCh5CVHIjBbQhfZ_k0A",
      socialIcon: youTube,
    },
  ];

  return (
    <div className={classes.copyrightWrapper}>
      <Container className={classes.root}>
        <div>
          <Grid className={classes.gridRoot}>
            <Grid size={{ xs: 12, sm: 3, md: 3 }} className={classes.logoWrapper}>
              <Link to="/">
                <img className={classes.logo} src={logo} alt="Piktask" width="135px" height="40px" />
              </Link>
            </Grid>

            <Grid size={{ xs: 12, sm: 6, md: 6 }}>
              <Typography className={classes.copyRightText}>copyright &copy; Piktask - All Right Reserved, {new Date().getFullYear()}</Typography>
            </Grid>

            <Grid size={{ xs: 12, sm: 3, md: 3 }}>
              <SocialShare copyRightSocial socials={socialMedia} width="28px" height="28px" />
            </Grid>
          </Grid>
        </div>
      </Container>
    </div>
  );
};

export default CopyRight;
