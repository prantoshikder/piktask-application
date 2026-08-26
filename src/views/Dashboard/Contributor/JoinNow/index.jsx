"use client";

import { Container, Typography } from "@/components/ui-kit";
import React from "react";
import rightArrow from "../../../../assets/icons/stepArrow.svg";
import Spacing from "../../../../components/Spacing";
import CallToAction from "../../../../components/ui/CallToAction";
import Footer from "../../../../components/ui/Footer";
import HeroSection from "../../../../components/ui/Hero";
import Layout from "../../../../Layout";

const JoinNow = () => {
  return (
    <Layout title="Join Now | Piktask">
      <HeroSection size="large" contributorUser isSearch />
      <Spacing space={{ height: "2.5rem" }} />
      {/* Instruction  */}
      <div className="bg-[#fff] p-[5rem]">
        <Container>
          <div className="flex justify-around items-center">
            <div className="flex justify-between items-center">
              <div className="flex justify-between items-center [&_h1]:text-[12rem] [&_h1]:text-[#ddd] [&_h1]:font-[700] [&_h1]:mr-[2rem] [&_h2]:text-[12rem] [&_h2]:text-[#ddd] [&_h2]:font-[700] [&_h2]:mr-[0.4rem] [&_h4]:text-[2rem] [&_h4]:text-[#143340] [&_h4]:font-[500] [&_h5]:text-[1.4rem] [&_h5]:text-[#0088f2] [&_h5]:font-[500] [&_p]:text-[1.4rem] [&_p]:text-[#143340] [&_p]:font-[400]">
                <div>
                  <Typography variant="h2">1</Typography>
                </div>
                <div>
                  <Typography>STEP 1</Typography>
                  <Typography variant="h4">Sign up</Typography>
                  <Typography variant="h5">Join now</Typography>
                </div>
              </div>
              <div className="ml-[14rem] [&_img]:w-[6rem]">
                <img src={rightArrow.src} alt="rightArrow" />
              </div>
            </div>
            <div className="flex justify-between items-center">
              <div className="flex justify-between items-center [&_h1]:text-[12rem] [&_h1]:text-[#ddd] [&_h1]:font-[700] [&_h1]:mr-[2rem] [&_h2]:text-[12rem] [&_h2]:text-[#ddd] [&_h2]:font-[700] [&_h2]:mr-[0.4rem] [&_h4]:text-[2rem] [&_h4]:text-[#143340] [&_h4]:font-[500] [&_h5]:text-[1.4rem] [&_h5]:text-[#0088f2] [&_h5]:font-[500] [&_p]:text-[1.4rem] [&_p]:text-[#143340] [&_p]:font-[400]">
                <div>
                  <Typography variant="h1">2</Typography>
                </div>
                <div>
                  <Typography>STEP 2</Typography>
                  <Typography variant="h4">Share your</Typography>
                  <Typography variant="h4">best artwork</Typography>
                </div>
              </div>
              <div className="ml-[14rem] [&_img]:w-[6rem]">
                <img src={rightArrow.src} alt="rightArrow" />
              </div>
            </div>
            <div className="flex justify-between items-center">
              <div className="flex justify-between items-center [&_h1]:text-[12rem] [&_h1]:text-[#ddd] [&_h1]:font-[700] [&_h1]:mr-[2rem] [&_h2]:text-[12rem] [&_h2]:text-[#ddd] [&_h2]:font-[700] [&_h2]:mr-[0.4rem] [&_h4]:text-[2rem] [&_h4]:text-[#143340] [&_h4]:font-[500] [&_h5]:text-[1.4rem] [&_h5]:text-[#0088f2] [&_h5]:font-[500] [&_p]:text-[1.4rem] [&_p]:text-[#143340] [&_p]:font-[400]">
                <div>
                  <Typography variant="h1">3</Typography>
                </div>
                <div>
                  <Typography>STEP 3</Typography>
                  <Typography variant="h4">Earn</Typography>
                  <Typography variant="h4">money</Typography>
                </div>
              </div>
            </div>
          </div>
        </Container>
      </div>

      <Spacing space={{ height: "2.5rem" }} />
      <CallToAction
        title="Daily 10 image/photos Download"
        subtitle="Top website templates with the highest sales volume."
        contributorJoinNow
        buttonText="Join Now"
      />
      <Footer />
    </Layout>
  );
};

export default JoinNow;
