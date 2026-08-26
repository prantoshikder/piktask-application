"use client";

import { Container } from "@mui/material";
import React from "react";
import PageNotFound from "../../assets/banner/page-not-found.jpg";
import Footer from "../../components/ui/Footer";
import Header from "../../components/ui/Header";
import Layout from "../../Layout";
import useStyles from "./NotFoundPage.styles";

const NotFoundPage = () => {
  const { classes } = useStyles();
  return (
    <Layout title="Graphic Resources for Free Download">
      <Header />
      <div className={classes.pageNotFound}>
        <Container>
          <div className={classes.pageNotFoundImg}>
            <img src={PageNotFound} alt="PageNotFound" />
          </div>
        </Container>
      </div>
      <Footer />
    </Layout>
  );
};

export default NotFoundPage;
