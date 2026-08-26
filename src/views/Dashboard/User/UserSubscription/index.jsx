"use client";

import { Container, Grid } from "@mui/material";
import React from "react";
import Spacing from "../../../../components/Spacing";
import UserSideBar from "../../../../components/ui/dashboard/user/UserSideBar";
import Footer from "../../../../components/ui/Footer";
import Header from "../../../../components/ui/Header";
import Layout from "../../../../Layout";

const UserSubscription = () => {
  return (
    <Layout title="Subscription">
      <Header />

      <Spacing space={{ height: "5rem" }} />
      <Container>
        <Grid container spacing={4}>
          <Grid size={{ xs: 12, sm: 9, md: 9 }}>
            <UserSideBar />
          </Grid>
          <Grid size={{ xs: 12, sm: 9, md: 9 }}>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Illo ut inventore nesciunt laborum error a voluptatem, quam cum dolore officiis deserunt
              iste facere tenetur incidunt?
            </p>
          </Grid>
        </Grid>
      </Container>
      <Spacing space={{ height: "5rem" }} />
      <Footer />
    </Layout>
  );
};

export default UserSubscription;
