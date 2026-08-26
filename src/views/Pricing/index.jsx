"use client";

import { CircularProgress, Container, Grid } from "@mui/material";
import { makeStyles } from "tss-react/mui";
import React from "react";
import pricingImage2 from "../../assets/Pricing/expert.svg";
import pricingImage3 from "../../assets/Pricing/pro.svg";
import pricingImage1 from "../../assets/Pricing/started.svg";
import Spacing from "../../components/Spacing";
import Footer from "../../components/ui/Footer";
import Header from "../../components/ui/Header";
import PricingCard from "./PricingCard";

const useStyles = makeStyles()((theme) => ({
  productItem: {
    "@media (max-width: 576px)": {
      maxWidth: "100%",
      flexBasis: "100%",
    },
  },
}));

const Pricing = () => {
  const { classes } = useStyles();

  const pricePlanData = [
    {
      id: 1,
      title: "Piktask",
      price: 30,
      image: `${pricingImage1}`,
    },
    {
      id: 2,
      title: "Piktask LTD",
      price: 300,
      image: `${pricingImage2}`,
    },
    {
      id: 3,
      title: "Piktask LLC",
      price: 3000,
      image: `${pricingImage3}`,
    },
  ];

  return (
    <>
      <Header />

      <Spacing space={{ height: "3rem" }} />

      <Container>
        <h2>Pricing</h2>

        <Grid container spacing={5} style={{ marginTop: "3rem" }}>
          {pricePlanData === null ? (
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                margin: "0 auto",
                height: 300,
              }}
            >
              <CircularProgress color="primary" />
            </div>
          ) : (
            <>
              {pricePlanData?.length > 0 &&
                pricePlanData?.map((pricePlan) => (
                  <Grid size={{ xs: 6, sm: 4, md: 4 }} key={pricePlan?.id} className={classes.productItem}>
                    <PricingCard key={pricePlan?.id} pricePlan={pricePlan} />
                  </Grid>
                ))}
            </>
          )}
        </Grid>
      </Container>

      <Spacing space={{ height: "3rem" }} />

      <Footer />
    </>
  );
};

export default Pricing;
