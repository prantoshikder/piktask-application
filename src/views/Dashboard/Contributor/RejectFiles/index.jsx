"use client";

import { Card, CardContent, CircularProgress, Drawer, Grid, Typography, useMediaQuery } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
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
import useStyles from "./RejectFiles.styles";

const RejectFiles = () => {
  const { classes } = useStyles();
  const location = useLocation();
  const locationPath = location.pathname;
  const mobileView = useMediaQuery("(max-width:769px)");
  const user = useSelector((state) => state.user);

  const [rejectMessage, setRejectMessage] = useState([]);
  const [rejectProduct, setRejectProduct] = useState([]);
  const [openModal, setOpenModal] = useState(false);
  const [isLoading, setLoading] = useState(true);

  const [pageCount, setPageCount] = useState(1);
  const [totalProduct, setTotalProduct] = useState();

  let limit = 36;
  const count = Math.ceil(totalProduct / limit);

  useEffect(() => {
    const CancelToken = axios.CancelToken;
    const source = CancelToken.source();

    if (user?.isLoggedIn && user?.role === "contributor") {
      axios
        .get(`${process.env.NEXT_PUBLIC_API_URL}/contributor/images/rejected?limit=${limit}&page=${pageCount}`, {
          cancelToken: source.token,
          headers: { Authorization: user?.token },
        })
        .then(({ data }) => {
          if (data?.images?.length > 0) {
            setRejectProduct(data?.images);
            setTotalProduct(data?.total);
            setLoading(false);
          } else {
            setLoading(false);
          }
        })
        .catch((error) => {
          console.log("Rejected product", error);
          setLoading(false);
          if (error.response.status === 401) {
            expiredLoginTime();
          }
        });
    }

    return () => source.cancel();
  }, [user?.isLoggedIn, user?.role, user?.token, pageCount, limit]);

  const handleClick = (product) => {
    const CancelToken = axios.CancelToken;
    const source = CancelToken.source();

    // Reject API integration
    if (product?.token_id) {
      setOpenModal(true);

      axios
        .get(`${process.env.NEXT_PUBLIC_API_URL}/contributor/images/rejected/${product?.token_id}`, {
          cancelToken: source.token,
          headers: { Authorization: user?.token },
        })
        .then(({ data }) => {
          if (data?.status) {
            setRejectMessage(data.reasons);
          }
        })
        .catch((error) => {
          console.log("Reject issue", error);
          setLoading(false);
          if (error.response.status === 401) {
            expiredLoginTime();
          }
        });
    }

    return () => source.cancel();
  };

  return (
    <Layout title="RejectFiles">
      <div className={classes.adminRoot}>
        {mobileView ? null : <Sidebar className={classes.adminSidebar} />}

        <main className={classes.content}>
          <AdminHeader />

          <Suspense fallback={<Loader />}>
            <div className={classes.rejectFilesWrapper}>
              <div className={classes.headingWrapper}>
                <Heading tag="h2">Reject Files</Heading>
                <Typography>
                  Here you will see your rejected resources. The reason for rejection is specified in each <br /> case. For more information, consult our
                  Reasons for rejection.
                </Typography>
              </div>

              <Spacing space={{ height: "4rem" }} />

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
                  {rejectProduct?.length > 0 ? (
                    rejectProduct?.map((product) => (
                      <Grid size={{ xs: 4, sm: 2, md: 2 }} key={product?.id} className={classes.productItem}>
                        <Card className={classes.cardWrapper} onClick={() => handleClick(product)}>
                          <div className={classes.cardImage}>
                            <img src={getBaseURL().bucket_base_url + getBaseURL().images + product?.original_file} alt={product?.original_name} />
                          </div>

                          <CardContent className={classes.cardContent}>
                            <Typography variant="h3">{product?.original_name}</Typography>
                          </CardContent>
                        </Card>
                      </Grid>
                    ))
                  ) : (
                    <ProductNotFound rejectFileContent contributorProductNotFound />
                  )}
                </Grid>
              )}

              {totalProduct > limit && <Pagination locationPath={locationPath} count={count} pageCount={pageCount} setPageCount={setPageCount} />}
            </div>
          </Suspense>

          <Spacing space={{ height: "4rem" }} />

          <Footer />
        </main>
      </div>

      <Drawer
        anchor="right"
        open={openModal}
        onClose={() => setOpenModal(false)}
        className={classes.modalContainer}
        classes={{ paper: classes.paper, root: classes.drawerRoot }}
      >
        <div className={classes.modalHeader}>
          <div className={classes.headingContent}>
            <Typography variant="h3" className={classes.headingTitle}>
              Reasons for rejection
            </Typography>
            <CloseIcon className={classes.closeIcon} onClick={() => setOpenModal(false)} />
          </div>
        </div>
        <hr />

        <div className={classes.rejectionMessage}>
          {rejectMessage.length > 0 ? (
            rejectMessage.map((reject) => (
              <div key={reject?.reason_id} className={classes.article}>
                <Typography variant="h3" className={classes.title}>
                  {reject?.title}
                </Typography>
                <Typography variant="body1">{reject?.description}. </Typography>
              </div>
            ))
          ) : (
            <div className={classes.noItemsFound}>
              <Typography>No products reason.</Typography>
            </div>
          )}
        </div>
      </Drawer>
    </Layout>
  );
};

export default RejectFiles;
