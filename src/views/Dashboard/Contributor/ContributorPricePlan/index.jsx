"use client";

import { Button, Grid, Typography, useMediaQuery } from "@mui/material";
import React, { lazy, Suspense, useState } from "react";
import Spacing from "../../../../components/Spacing";
import AdminHeader from "../../../../components/ui/dashboard/contributor/Header";
import Heading from "../../../../components/ui/dashboard/contributor/Heading";
import Sidebar from "../../../../components/ui/dashboard/contributor/Sidebar";
import Loader from "../../../../components/ui/Loader";
import Layout from "../../../../Layout";
import useStyles from "./ContributorPricePlan.styles";

const Footer = lazy(() => import("../../../../components/ui/Footer"));

const ContributorPricePlan = () => {
  const { classes } = useStyles();
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
      <div className={classes.adminRoot}>
        {mobileView ? null : <Sidebar className={classes.adminSidebar} />}

        <main className={classes.content}>
          <AdminHeader />
          <div className={classes.pricePlanGridContainer}>
            <Heading tag="h2">Contributor Price Plan</Heading>
            <Spacing space={{ height: "2rem" }} />
            <div className={classes.pricePlanBanner}></div>
            <Spacing space={{ height: "2rem" }} />
            <div>
              <Grid container spacing={2}>
                <Grid size={{ xs: 12, sm: 12, md: 12 }}>
                  {showViewDetails ? (
                    <div className={classes.priceInfo}>
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
                        <Button onClick={handleShowDetails} className={classes.detailsBtn}>View Details</Button>
                      </div> */}
                    </div>
                  ) : (
                    <div className={classes.priceInfo}>
                      <div>
                        <Typography variant="h2">Piktask Contributor Price Plan</Typography>
                        <Typography>Amount earning 1000 downloads</Typography>
                      </div>
                      <div>
                        <Button onClick={handleShowDetails} className={classes.detailsBtn}>
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
