"use client";

import { Container, Grid, Typography } from "@/components/ui-kit";
import React, { useEffect } from "react";
import bdtaskMembers from "../../assets/aboutUs/bdtask_members.jpg";
import clientMeeting from "../../assets/aboutUs/meeting_with_client.jpg";
import thumbnail from "../../assets/banner/hero-banner.jpg";
import Spacing from "../../components/Spacing";
import Footer from "../../components/ui/Footer";
import Header from "../../components/ui/Header";
import HeroSection from "../../components/ui/Hero";
import { imageObjSchema } from "../../helpers";
import Layout from "../../Layout";

const AboutUs = () => {
  useEffect(() => {
    const schemaObj = {
      name: document.title,
      contentUrl: document.location.href,
      acquireLicensePage: document.location.href,
      thumbnailUrl: `${process.env.NEXT_PUBLIC_API_URL}/media_images/company/piktak_logo.jpg`,
    };

    imageObjSchema(schemaObj);
  }, []);

  return (
    <Layout title="About Us" ogImage={thumbnail}>
      <Header />
      <HeroSection aboutUs isSearch />
      <Spacing space={{ height: "5rem" }} />
      <Container>
        <div className="p-[0rem_20rem] max-[1199.95px]:p-[0_7rem] max-[768.95px]:p-[0_2rem]">
          <div>
            <div className="text-[black]! text-[2.2rem]">
              <Typography variant="h2">About Our Company</Typography>
            </div>
            <Spacing space={{ height: "1rem" }} />
            <div>
              <Grid container>
                <Grid size={{ xs: 12, sm: 6, md: 6 }}>
                  <Typography className="pr-[2rem] text-justify text-[#173050] text-[1.6rem] leading-[28px] max-[768.95px]:pr-[0rem]">
                    Piktask is one of the leading Software Company in Bangladesh. At Piktask we work with cutting edge technology to support our clients and
                    also bring the best quality product in the market. Currently, we have 7000 square feet well-decorated office with a cool working environment
                    situated at B-25, Mannan Plaza, 4th Floor, Khilkhet Dhaka-1229. Just as we are very serious about our product quality, we also make sure
                    every team member finds the working place as a place of comfort, fun and learning den. Since its inception, Piktask has played a major role
                    in some of the largest IT projects in the country. Internationally, Piktask has established itself as a key player in the small enterprise
                    solution with reasonable price even affordable to LDC (Least Developed Countries). Our diverse expertise extends beyond deployment to
                    provide operational, maintenance, support and business outsourcing services. Our technology specialists have years of experience delivering
                    successful solutions in different platform.
                  </Typography>
                </Grid>
                <Grid size={{ xs: 12, sm: 6, md: 6 }}>
                  <div className="w-[53rem] [&_img]:pt-[0.7rem] [&_img]:w-[100%] [&_img]:h-[100%] [&_img]:object-cover max-[1199.95px]:w-[100%] max-[768.95px]:w-[100%] max-[768.95px]:pt-[2rem]">
                    <img src={clientMeeting.src} alt="Piktask" />
                  </div>
                </Grid>
              </Grid>

              <Spacing space={{ height: "3rem" }} />

              <Grid container>
                <Grid size={{ xs: 12, sm: 5, md: 5 }}>
                  <div className="flex justify-between pr-[3rem] text-[black]! text-[2.2rem]">
                    <Typography variant="h2">History {"&"} background:</Typography>
                    <div className="h-[26.5rem] mt-[0.7rem] [border-right:0.7rem_solid_#0088f2] max-[899.95px]:hidden"></div>
                  </div>
                </Grid>
                <Grid size={{ xs: 12, sm: 7, md: 7 }}>
                  <Typography className="text-justify text-[#173050] text-[1.6rem] leading-[28px] max-[768.95px]:pt-[1rem]">
                    The story behind the making of Piktask is quite interesting. Three young software engineers were dreaming to become entrepreneurs. And who
                    are brothers in real life. Planning, executing, developing, nurturing and managing were the 5 key factors what makes this dream to come
                    true. In 2016 their fourth brother joined the company as a creative designer which made the company more dynamic. Though Piktask started
                    their journey in 2013 with the three founders Sumch Mohammad Tarek, Tanzil Ahmad {"&"} Tohidul Islam but it takes 3 long hard years to
                    establish as a limited company. Now in 2020, Piktask has more than 45+ team members who have successfully completed hundreds of projects
                    already. Recently Piktask launched an academic section where Piktask offers different types of professional It and soft skill courses.
                  </Typography>
                </Grid>
              </Grid>
              <Spacing space={{ height: "3rem" }} />
              <div className="w-[100%] [&_img]:pt-[0.7rem] [&_img]:w-[100%] [&_img]:h-[100%] [&_img]:object-cover">
                <img src={bdtaskMembers.src} alt="Piktask" />
              </div>

              <Spacing space={{ height: "2rem" }} />

              <Grid spacing={3} container>
                <Grid size={{ xs: 12, sm: 6, md: 6 }}>
                  <Typography variant="h2">Mission</Typography>
                  <Typography>
                    Making quality products with reasonable pricing and establish trust in digital products among the mass people.
                  </Typography>
                </Grid>
                <Grid size={{ xs: 12, sm: 6, md: 6 }}>
                  <Typography variant="h2">Vision</Typography>
                  <Typography>
                    The vision of Bdtask is to introduce technology to mass people to help them improve their lifestyle and solve problems in their daily life
                    through digitalization.
                  </Typography>
                </Grid>
              </Grid>
            </div>
          </div>
        </div>
      </Container>
      <Spacing space={{ height: "6rem" }} />
      <Footer />
    </Layout>
  );
};

export default AboutUs;
