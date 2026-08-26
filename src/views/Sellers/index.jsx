"use client";

import { Container, Grid } from "@/components/ui-kit";
import axios from "axios";
import React, { useEffect, useState } from "react";
import Spacing from "../../components/Spacing";
import Footer from "../../components/ui/Footer";
import Header from "../../components/ui/Header";
import HeroSection from "../../components/ui/Hero";
import SellerInfo from "../../components/ui/TopSeller/SellerInfo";
import Layout from "../../Layout";

const Sellers = () => {
  const [topSeller, setTopSeller] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  //data loading
  useEffect(() => {
    axios
      .get(`${process.env.NEXT_PUBLIC_API_URL}/contributor/top/`)
      .then(({ data }) => {
        if (data?.success) {
          setTopSeller(data.sellers);
          setIsLoading(false);
        }
      })
      .catch((error) => {
        console.log(error.message);
      });
  }, []);

  return (
    <Layout title="Seller | Piktask">
      <Header />
      <HeroSection />
      <Spacing space={{ height: "3rem" }} />
      <Container>
        <Grid container spacing={2}>
          {isLoading ? (
            <h2>Loading now......</h2>
          ) : (
            <>
              {topSeller?.map((photo) => (
                <Grid size={{ xs: 6, sm: 4, md: 3 }} key={photo.id} className="max-[576px]:max-w-[100%] max-[576px]:basis-[100%]">
                  <SellerInfo photo={photo} />
                </Grid>
              ))}
            </>
          )}
        </Grid>
      </Container>
      <Spacing space={{ height: "3rem" }} />
      <Footer />
    </Layout>
  );
};

export default Sellers;
