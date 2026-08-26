"use client";

import { Card, CardContent, CircularProgress, Drawer, Grid, Typography, useMediaQuery } from "@/components/ui-kit";
import { CloseOutlined as CloseIcon } from "@ant-design/icons";
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

const RejectFiles = () => {
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
      <div className="">
        {mobileView ? null : <Sidebar className="mt-[0rem] max-[768.95px]:hidden" />}

        <main className="p-[0] ml-[28rem] max-[768.95px]:w-[100%] max-[768.95px]:ml-[0rem]">
          <AdminHeader />

          <Suspense fallback={<Loader />}>
            <div className="mt-[10rem] m-[2rem] min-h-[50vh]">
              <div className="mt-[2rem] mb-[1.5rem] [&_p]:mt-[2rem] [&_p]:text-[1.5rem]">
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
                      <Grid size={{ xs: 4, sm: 2, md: 2 }} key={product?.id} className="max-[576px]:max-w-[50%] max-[576px]:basis-[50%]">
                        <Card className="relative cursor-pointer h-[100%] [&_img]:w-[100%] [&_img]:h-[150px] [&_img]:rounded-[0.1rem] [&_.pk-card-content]:pb-[0rem]!" onClick={() => handleClick(product)}>
                          <div className="p-[0.4rem_0.4rem_0rem_0.4rem] h-[120px] [&_img]:h-[100%] [&_img]:w-[100%] [&_img]:object-cover">
                            <img src={getBaseURL().bucket_base_url + getBaseURL().images + product?.original_file} alt={product?.original_name} />
                          </div>

                          <CardContent className="p-[0rem] bg-[#f1f1f1] mt-[-0.39rem]! [&_h3]:text-[1.4rem] [&_h3]:leading-[1.5] [&_h3]:text-[#114960] [&_h3]:text-center [&_h3]:p-[0.5rem_0rem] [&_h3]:[line-break:anywhere] [&_.pk-card-content]:p-[0rem]!">
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
        className="[&_hr]:[border:0_solid_transparent] [&_hr]:bg-[#ddd] [&_hr]:h-[0.1rem]"
        classes={{ paper: "w-[40rem] top-[0rem] h-[100%] [border-top:1px_solid_#ddd]", root: "z-[9999]!" }}
      >
        <div className="p-[2rem_2rem_0]">
          <div className="flex items-center justify-between mb-[1.5rem]">
            <Typography variant="h3" className="text-[2rem] text-[#114960]">
              Reasons for rejection
            </Typography>
            <CloseIcon className="cursor-pointer text-[2.5rem] text-[#B7B7B7] hover:text-[#0088f2]" onClick={() => setOpenModal(false)} />
          </div>
        </div>
        <hr />

        <div className="p-[2rem] m-[2.2rem_0] [&_p]:text-[#B1B1B1] [&_p]:leading-[1.6]">
          {rejectMessage.length > 0 ? (
            rejectMessage.map((reject) => (
              <div key={reject?.reason_id} className="mb-[2rem] pb-[2rem] [border-bottom:1px_solid_#ddd] last:mb-[0rem] last:[border-bottom:0px_solid_transparent]">
                <Typography variant="h3" className="text-[2rem] mb-[1.5rem] text-[#114960]">
                  {reject?.title}
                </Typography>
                <Typography variant="body1">{reject?.description}. </Typography>
              </div>
            ))
          ) : (
            <div className="ml-[1.5rem]">
              <Typography>No products reason.</Typography>
            </div>
          )}
        </div>
      </Drawer>
    </Layout>
  );
};

export default RejectFiles;
