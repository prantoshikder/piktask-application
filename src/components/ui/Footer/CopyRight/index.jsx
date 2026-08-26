"use client";

import { Container, Grid, Typography } from "@/components/ui-kit";
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

const CopyRight = () => {
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
    <div className={"p-[1.8rem_0rem] flex items-center relative h-[80px] before:bg-[rgb(1_32_54)] before:content-[\"\"] before:absolute before:top-[0] before:left-[0] before:w-[100%] before:h-[100%] max-[768px]:h-[auto]"}>
      <Container className="h-[100%] z-[1]">
        <div>
          <Grid className="flex items-center justify-between h-[100%] max-[768px]:flex-col">
            <Grid size={{ xs: 12, sm: 3, md: 3 }} className="flex max-[992px]:mr-[2rem]">
              <Link to="/">
                <img className="w-[13.5rem]" src={logo.src} alt="Piktask" width="135px" height="40px" />
              </Link>
            </Grid>

            <Grid size={{ xs: 12, sm: 6, md: 6 }}>
              <Typography className="text-[1.6rem] font-[400] text-[#fff]">copyright &copy; Piktask - All Right Reserved, {new Date().getFullYear()}</Typography>
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
