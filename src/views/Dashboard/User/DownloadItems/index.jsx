"use client";

import { Container, Grid } from "@/components/ui-kit";
import axios from "axios";
import React, { lazy, Suspense, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useLocation } from "@/lib/router";
import Spacing from "../../../../components/Spacing";
import Header from "../../../../components/ui/Header";
import SectionHeading from "../../../../components/ui/Heading";
import Loader from "../../../../components/ui/Loader";
import Pagination from "../../../../components/ui/Pagination";
import ProductNotFound from "../../../../components/ui/ProductNotFound";
import Product from "../../../../components/ui/Products/Product";
import { expiredLoginTime, imageObjSchema } from "../../../../helpers";
import Layout from "../../../../Layout";

const UserSideBar = lazy(() => import("../../../../components/ui/dashboard/user/UserSideBar"));
const Footer = lazy(() => import("../../../../components/ui/Footer"));



const DownloadItems = () => {
  const location = useLocation();
  const user = useSelector((state) => state.user);
  const locationPath = location.pathname;

  const [isLoading, setLoading] = useState(true);
  const [downloadsItem, setDownloadsItem] = useState([]);
  const [pageCount, setPageCount] = useState(1);
  const [totalProduct, setTotalProduct] = useState();
  let limit = 15;
  const count = Math.ceil(totalProduct / limit);

  useEffect(() => {
    setLoading(true);
    const CancelToken = axios.CancelToken;
    const source = CancelToken.source();

    if (user?.isLoggedIn) {
      axios
        .get(`${process.env.NEXT_PUBLIC_API_URL}/user/downloads?limit=${limit}&page=${pageCount}`, {
          cancelToken: source.token,
          headers: { Authorization: user?.token },
        })
        .then(({ data }) => {
          if (data?.status) {
            setDownloadsItem(data?.downloads);
            setTotalProduct(data?.total);
            setLoading(false);
          }
        })
        .catch((error) => {
          console.log("Category products error:", error);
          setLoading(false);
          if (error.response.status === 401) {
            expiredLoginTime();
          }
        });
    }

    return () => source.cancel();
  }, [user?.isLoggedIn, user?.token, pageCount, limit]);

  useEffect(() => {
    const schemaObj = {
      name: document.title,
      contentUrl: document.location.href,
      acquireLicensePage: document.location.href,
      thumbnailUrl: `${process.env.NEXT_PUBLIC_API_URL}/media_images/company/piktak_logo.jpg`,
    };

    imageObjSchema(schemaObj);
  }, []);

  return (
    <Layout title="Downloads">
      <Header />

      <Spacing space={{ height: "5rem" }} />

      <Container>
        <Grid container spacing={2}>
          <Suspense fallback={<Loader />}>
            <Grid size={{ xs: 12, sm: 3, md: 3 }} className="max-[576px]:max-w-[100%] max-[576px]:basis-[100%]">
              <UserSideBar />
            </Grid>
          </Suspense>

          <Suspense fallback={<Loader />}>
            <Grid size={{ xs: 12, sm: 9, md: 9 }} className="max-[576px]:max-w-[100%] max-[576px]:basis-[100%]">
              <SectionHeading title="Download" large />
              <Grid container spacing={2}>
                {isLoading ? (
                  <Loader />
                ) : (
                  <>
                    {downloadsItem?.length ? (
                      downloadsItem?.map((photo) => (
                        <Grid
                          size={{ xs: 6, sm: 4, md: 3 }}
                          key={photo.image_id}
                          //
                        >
                          <Product photo={photo} />
                        </Grid>
                      ))
                    ) : (
                      <ProductNotFound noCollection="Downloads" />
                    )}
                  </>
                )}
              </Grid>
              {totalProduct > limit && <Pagination locationPath={locationPath} count={count} pageCount={pageCount} setPageCount={setPageCount} />}
            </Grid>
          </Suspense>
        </Grid>
      </Container>

      <Spacing space={{ height: "3rem" }} />

      <Suspense fallback={<Loader />}>
        <Footer />
      </Suspense>
    </Layout>
  );
};

export default DownloadItems;
