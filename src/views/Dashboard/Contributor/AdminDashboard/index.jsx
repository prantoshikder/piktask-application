"use client";

import { useMediaQuery } from "@mui/material";
import React, { lazy, Suspense } from "react";
import AdminHeader from "../../../../components/ui/dashboard/contributor/Header";
import Sidebar from "../../../../components/ui/dashboard/contributor/Sidebar";
import Loader from "../../../../components/ui/Loader";
import Layout from "../../../../Layout";
import useStyles from "./admin.styles";

const CurrentMonthStatus = lazy(() => import("../../../../components/Partials/ContributorDashboard/CurrentMonthStatus"));
const AuthorFiles = lazy(() => import("../../../../components/Partials/ContributorDashboard/AuthorFiles"));
const Blog = lazy(() => import("../../../../components/ui/Blog"));
const Footer = lazy(() => import("../../../../components/ui/Footer"));

const AdminDashboard = () => {
  const { classes } = useStyles();
  const mobileView = useMediaQuery("(max-width:769px)");

  return (
    <Layout title="dashboard">
      <div className={classes.adminRoot}>
        {mobileView ? null : <Sidebar className={classes.adminSidebar} />}

        <main className={classes.content}>
          <AdminHeader />

          <Suspense fallback={<Loader />}>
            <CurrentMonthStatus />
          </Suspense>

          <Suspense fallback={<Loader />}>
            <AuthorFiles />
          </Suspense>

          <Suspense fallback={<Loader />}>
            <Blog />
          </Suspense>

          <Suspense fallback={<Loader />}>
            <Footer contributorFooter />
          </Suspense>
        </main>
      </div>
    </Layout>
  );
};

export default AdminDashboard;
