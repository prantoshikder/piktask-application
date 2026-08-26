"use client";

import React, { useEffect } from "react";
import thumbnail from "../../assets/banner/hero-banner.jpg";
import CallToAction from "../../components/ui/CallToAction";
import Footer from "../../components/ui/Footer";
import Header from "../../components/ui/Header";
import HeroSection from "../../components/ui/Hero";
import PopularKeyWords from "../../components/ui/PopularKeyWords";
import { imageObjSchema } from "../../helpers";
import Layout from "../../Layout";

const TrendingSearch = () => {
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
    <Layout
      title="Trending Search result"
      description="Piktask provides millions of stock photos, creatives, backgrounds and illustrations for free to fullfil your graphic design needs."
      ogImage={thumbnail}
    >
      <Header />
      <HeroSection size="large" creativeWorksDone title="Graphic Resource for Free Download" />
      <PopularKeyWords />
      <CallToAction title="Join Piktask team" subtitle="Upload your first copyrighted design. Get $5 designer coupon packs" buttonText="Join Us" uppercase />
      <Footer />
    </Layout>
  );
};

export default TrendingSearch;
