"use client";

import { Container, Typography } from "@/components/ui-kit";
import React, { useEffect } from "react";
import Spacing from "../../components/Spacing";
import Footer from "../../components/ui/Footer";
import Header from "../../components/ui/Header";
import HeroSection from "../../components/ui/Hero";
import { imageObjSchema } from "../../helpers";
import Layout from "../../Layout";

const CookiesPolicy = () => {
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
    <Layout title="Cookies policy">
      <Header />

      <HeroSection cookiesPolicy size="medium" isSearch />
      <Spacing space={{ height: "5rem" }} />
      <Container>
        <div className="p-[0rem_20rem] max-[768.95px]:p-[0_2rem]">
          <div>
            <div className="text-[black]! text-[2.2rem]">
              <Typography variant="h2">What we own : </Typography>
            </div>
            <Spacing space={{ height: "1rem" }} />
            <div>
              <Typography className="text-justify text-[#173050] text-[1.6rem] leading-[28px]">
                We own all the Piktask content that we have put on Piktask. This includes the design,Software,Website, Theme, Template,Idea, Feelings, and look
                and feel of the Piktask sites, and copyright, trademarks, designs and other intellectual property on Piktask. We own all the Softwares,
                Application, logos, service marks and trade names on Piktask site. You will not copy, distribute, modify or make derivative works of any of our
                Piktask Content or use any of our intellectual property in any way not expressly stated in these terms.
              </Typography>
              <Spacing space={{ height: "3rem" }} />
              <div className="text-[black]! text-[2.2rem]">
                <Typography variant="h2">Web browser cookies : </Typography>
              </div>
              <Spacing space={{ height: "1rem" }} />
              <Typography className="text-justify text-[#173050] text-[1.6rem] leading-[28px]">
                Our Site may use "cookies" to enhance User experience. User's web browser places cookies on their hard drive for record-keeping purposes and
                sometimes to track information about them. User may choose to set their web browser to refuse cookies, or to alert you when cookies are being
                sent. If they do so, note that some parts of the Site may not function properly.
              </Typography>
            </div>
          </div>
        </div>
      </Container>
      <Spacing space={{ height: "4rem" }} />
      <Footer />
    </Layout>
  );
};

export default CookiesPolicy;
