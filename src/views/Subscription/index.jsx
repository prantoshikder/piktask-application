"use client";

import React from "react";
import Footer from "../../components/ui/Footer";
import Header from "../../components/ui/Header";
import HeroSection from "../../components/ui/Hero";
import Layout from "../../Layout";

const Subscription = () => {
  return (
    <Layout title="Subscription" description="This is subscription page">
      <Header />
      <HeroSection />
      <h1 className="h-[200px] text-center pt-[80px]">Subscription page are coming soon....</h1>
      <Footer />
    </Layout>
  );
};

export default Subscription;
