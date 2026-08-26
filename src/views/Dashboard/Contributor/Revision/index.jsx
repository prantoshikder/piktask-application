"use client";

import { Card, CardContent, CircularProgress, Grid, Typography, useMediaQuery } from "@mui/material";
import axios from "axios";
import React, { Suspense, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useLocation } from "@/lib/router";
import Spacing from "../../../../components/Spacing";
import AdminHeader from "../../../../components/ui/dashboard/contributor/Header";
import Heading from "../../../../components/ui/dashboard/contributor/Heading";
import Sidebar from "../../../../components/ui/dashboard/contributor/Sidebar";
import Footer from "../../../../components/ui/Footer";
import Loader from "../../../../components/ui/Loader";
import Pagination from "../../../../components/ui/Pagination";
import ProductNotFound from "../../../../components/ui/ProductNotFound";
import { expiredLoginTime, getBaseURL } from "../../../../helpers";
import Layout from "../../../../Layout";
import useStyles from "./Revision.styles";

const Revision = () => {
  const { classes } = useStyles();
  const location = useLocation();
  const locationPath = location.pathname;
  const mobileView = useMediaQuery("(max-width:769px)");
  const user = useSelector((state) => state.user);

  const [isLoading, setLoading] = useState(true);
  const [revisionProduct, setRevisionProduct] = useState([]);

  const [pageCount, setPageCount] = useState(1);
  const [totalProduct, setTotalProduct] = useState();

  let limit = 36;
  const count = Math.ceil(totalProduct / limit);

  useEffect(() => {
    const CancelToken = axios.CancelToken;
    const source = CancelToken.source();

    if (user?.isLoggedIn && user?.role === "contributor") {
      axios
        .get(`${process.env.NEXT_PUBLIC_API_URL}/contributor/images/pending?limit=${limit}&page=${pageCount}`, {
          cancelToken: source.token,
          headers: { Authorization: user?.token },
        })
        .then(({ data }) => {
          if (data?.images?.length > 0) {
            setRevisionProduct(data?.images);
            setTotalProduct(data?.total);
            setLoading(false);
          } else {
            setLoading(false);
          }
        })
        .catch((error) => {
          console.log("Revision product", error);
          setLoading(false);
          if (error.response.status === 401) {
            expiredLoginTime();
            console.log("Published file", error);
          }
        });

      return () => source.cancel();
    }
  }, [user?.isLoggedIn, user?.role, user?.token, pageCount, limit]);

  return (
    <Layout title="Under Revision">
      <div className={classes.adminRoot}>
        {mobileView ? null : <Sidebar className={classes.adminSidebar} />}

        <main className={classes.content}>
          <AdminHeader />

          <div className={classes.cardContentWrapper}>
            <div className={classes.headingWrapepr}>
              <Heading tag="h2">Under Revision</Heading>
              <Typography>
                Here you can see the submitted files. Our team will review them and check if they meet our <br /> requirements. The files could remain in this
                stage for a few days. Please be patient!
              </Typography>
            </div>

            <Spacing space={{ height: "3rem" }} />

            <Suspense fallback={<Loader />}>
              {isLoading ? (
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
                <Grid container spacing={2}>
                  {revisionProduct?.length > 0 ? (
                    revisionProduct?.map((product) => (
                      <Grid size={{ xs: 3, sm: 2, md: 2 }} key={product?.id} className={classes.productItem}>
                        <Card className={classes.cardWrapper}>
                          <div className={classes.cardImage}>
                            <img src={getBaseURL().bucket_base_url + getBaseURL().images + product?.original_file} alt={product.original_name} />
                          </div>
                          <CardContent className={classes.cardContent}>
                            <Typography variant="h3">{product.original_name}</Typography>
                            <Typography>File Size: {(product.size / 1024 / 1024).toFixed(2)} MB</Typography>
                          </CardContent>
                        </Card>
                      </Grid>
                    ))
                  ) : (
                    <ProductNotFound revisionContent contributorProductNotFound />
                  )}
                </Grid>
              )}

              {totalProduct > limit && <Pagination locationPath={locationPath} count={count} pageCount={pageCount} setPageCount={setPageCount} />}
            </Suspense>

            <Spacing space={{ height: "3rem" }} />
          </div>

          <Spacing space={{ height: "1.8rem" }} />

          <Footer />
        </main>
      </div>
    </Layout>
  );
};

export default Revision;
