"use client";

import { Card, CardContent, CircularProgress, Grid, Typography, useMediaQuery } from "@/components/ui-kit";
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

const Revision = () => {
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
      <div className="">
        {mobileView ? null : <Sidebar className="mt-[0rem] max-[768.95px]:hidden" />}

        <main className="p-[0] ml-[28rem] max-[768.95px]:w-[100%] max-[768.95px]:ml-[0rem]">
          <AdminHeader />

          <div className="mt-[10rem] m-[2rem] min-h-[60vh]">
            <div className="mt-[2rem] mb-[1.5rem] [&_p]:mt-[2rem] [&_p]:text-[1.5rem]">
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
                      <Grid size={{ xs: 3, sm: 2, md: 2 }} key={product?.id} className="max-[576px]:max-w-[100%] max-[576px]:basis-[100%]">
                        <Card className="relative h-[100%] [&_img]:w-[100%] [&_img]:h-[150px] [&_img]:object-cover [&_img]:rounded-[0.1rem] [&_.pk-card-content]:pb-[0rem]!">
                          <div className="p-[0.4rem_0.4rem_0rem_0.4rem] h-[120px] [&_img]:h-[100%] [&_img]:w-[100%] [&_img]:object-cover">
                            <img src={getBaseURL().bucket_base_url + getBaseURL().images + product?.original_file} alt={product.original_name} />
                          </div>
                          <CardContent className="p-[0rem] bg-[#f1f1f1] mt-[-0.39rem]! text-center [&_h3]:text-[1.4rem] [&_h3]:leading-[1.5] [&_h3]:text-[#114960] [&_h3]:text-center [&_h3]:p-[0.5rem_0rem_0rem] [&_p]:text-[1.2rem] [&_p]:leading-[1.5] [&_p]:pb-[0.5rem] [&_.pk-card-content]:p-[0rem]!">
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
