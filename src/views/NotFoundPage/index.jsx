"use client";

import { Container } from "@/components/ui-kit";
import React from "react";
import PageNotFound from "../../assets/banner/page-not-found.jpg";
import Footer from "../../components/ui/Footer";
import Header from "../../components/ui/Header";
import Layout from "../../Layout";

const NotFoundPage = () => {
  return (
    <Layout title="Graphic Resources for Free Download">
      <Header />
      <div className="bg-[#000] pt-[10rem]">
        <Container>
          <div className="h-[50rem] w-[100%] flex justify-center items-center m-[0_auto] [&_img]:h-[100%] [&_img]:w-[100%] [&_img]:object-cover max-[425.95px]:h-[40rem] max-[425.95px]:w-[100%]">
            <img src={PageNotFound.src} alt="PageNotFound" />
          </div>
        </Container>
      </div>
      <Footer />
    </Layout>
  );
};

export default NotFoundPage;
