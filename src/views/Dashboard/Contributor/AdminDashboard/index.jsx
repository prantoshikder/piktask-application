"use client";

import { useMediaQuery } from "@/components/ui-kit";
import React, { lazy, Suspense } from "react";
import AdminHeader from "../../../../components/ui/dashboard/contributor/Header";
import Sidebar from "../../../../components/ui/dashboard/contributor/Sidebar";
import Loader from "../../../../components/ui/Loader";
import Layout from "../../../../Layout";

const CurrentMonthStatus = lazy(() => import("../../../../components/Partials/ContributorDashboard/CurrentMonthStatus"));
const AuthorFiles = lazy(() => import("../../../../components/Partials/ContributorDashboard/AuthorFiles"));
const Blog = lazy(() => import("../../../../components/ui/Blog"));
const Footer = lazy(() => import("../../../../components/ui/Footer"));

const AdminDashboard = () => {
  const mobileView = useMediaQuery("(max-width:769px)");

  return (
    <Layout title="dashboard">
      <div>
        {mobileView ? null : <Sidebar className="mt-[0rem] max-[768.95px]:hidden" />}

        <main className="p-[0] ml-[28rem] max-[768.95px]:w-[100%] max-[768.95px]:ml-[0rem]">
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
