"use client";

import { Button, Grid, Typography, useMediaQuery } from "@/components/ui-kit";
import mobilePricePlanBanner from "../../../../assets/banner/pricePlanBanner-mobile.jpg";
import tabletPricePlanBanner from "../../../../assets/banner/pricePlanBanner-tablet.jpg";
import pricePlanBanner from "../../../../assets/banner/pricePlanBanner.jpg";
import React, { lazy, Suspense, useState } from "react";
import Spacing from "../../../../components/Spacing";
import AdminHeader from "../../../../components/ui/dashboard/contributor/Header";
import Heading from "../../../../components/ui/dashboard/contributor/Heading";
import Sidebar from "../../../../components/ui/dashboard/contributor/Sidebar";
import Loader from "../../../../components/ui/Loader";
import Layout from "../../../../Layout";

const Footer = lazy(() => import("../../../../components/ui/Footer"));

const ContributorPricePlan = () => {
  const mobileView = useMediaQuery("(max-width:769px)");

  const [showViewDetails, setViewDetails] = useState(false);
  const handleShowDetails = () => {
    setViewDetails(true);
  };
  const handleDownloadEarning = () => {
    setViewDetails(false);
  };

  return (
    <Layout title="Contributor Price Plan">
      <div className="">
        {mobileView ? null : <Sidebar className="mt-[0rem] max-[768.95px]:hidden" />}

        <main className="p-[0] ml-[28rem] max-[768.95px]:w-[100%] max-[768.95px]:ml-[0rem]">
          <AdminHeader />
          <div className="mt-[10rem] m-[2rem]">
            <Heading tag="h2">Contributor Price Plan</Heading>
            <Spacing space={{ height: "2rem" }} />
            <div className="bg-center p-[100px_0] rounded-[1rem] bg-[image:var(--plan-d)] max-[768.95px]:bg-[image:var(--plan-t)] max-[575.95px]:bg-[image:var(--plan-m)]" style={{ "--plan-d": `url(${pricePlanBanner.src})`, "--plan-t": `url(${tabletPricePlanBanner.src})`, "--plan-m": `url(${mobilePricePlanBanner.src})` }}></div>
            <Spacing space={{ height: "2rem" }} />
            <div>
              <Grid container spacing={2}>
                <Grid size={{ xs: 12, sm: 12, md: 12 }}>
                  {showViewDetails ? (
                    <div className="p-[5rem_0] text-center [&_p]:text-[1.5rem] [&_p]:pb-[1rem]">
                      <div>
                        <Typography>You will earn royalties each time one of your approved images is downloaded by a Piktask customer.</Typography>
                        <Typography>
                          How much you earn per each download depends on one or a combination of the following: the license and subscription that was used for
                          each download.
                        </Typography>
                        <Typography>
                          For a detailed breakdown of earnings per download, please reference our{" "}
                          <span style={{ color: "blue", cursor: "pointer" }} onClick={handleDownloadEarning}>
                            Earnings Schedule
                          </span>{" "}
                          .
                        </Typography>
                      </div>
                      {/* <div>
                        <Button onClick={handleShowDetails} className="p-[0.2rem_3.5rem] bg-[#0088f2] text-[#fff] [border:.2rem_solid] border-[#0088f2] mr-[1rem] [transition:all_0.3s_linear] hover:bg-[#0773c5] hover:border-[#0773c5] hover:text-[#fff]">View Details</Button>
                      </div> */}
                    </div>
                  ) : (
                    <div className="p-[5rem_0] text-center [&_p]:text-[1.5rem] [&_p]:pb-[1rem]">
                      <div>
                        <Typography variant="h2">Piktask Contributor Price Plan</Typography>
                        <Typography>Amount earning 1000 downloads</Typography>
                      </div>
                      <div>
                        <Button onClick={handleShowDetails} className="p-[0.2rem_3.5rem] bg-[#0088f2] text-[#fff] [border:.2rem_solid] border-[#0088f2] mr-[1rem] [transition:all_0.3s_linear] hover:bg-[#0773c5] hover:border-[#0773c5] hover:text-[#fff]">
                          View Details
                        </Button>
                      </div>
                    </div>
                  )}
                </Grid>
              </Grid>
            </div>
          </div>

          <Spacing space={{ height: "2rem" }} />

          <Suspense fallback={<Loader />}>
            <Footer />
          </Suspense>
        </main>
      </div>
    </Layout>
  );
};

export default ContributorPricePlan;
