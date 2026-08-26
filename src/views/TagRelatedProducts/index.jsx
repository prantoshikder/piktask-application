"use client";

import { CircularProgress, Container, Grid, Typography } from "@/components/ui-kit";
import axios from "axios";
import React, { lazy, Suspense, useEffect, useState } from "react";
import { useLocation, useParams } from "@/lib/router";
import Spacing from "../../components/Spacing";
import Header from "../../components/ui/Header";
import ProductNotFound from "../../components/ui/ProductNotFound";
import Product from "../../components/ui/Products/Product";
import Layout from "../../Layout";
import Loader from "./../../components/ui/Loader/index";
import { getBaseURL, imageObjSchema } from "./../../helpers/index";

const HeroSection = lazy(() => import("../../components/ui/Hero"));
const CallToAction = lazy(() => import("../../components/ui/CallToAction"));
const Footer = lazy(() => import("../../components/ui/Footer"));

const TagTemplate = () => {
  const { tagName } = useParams();
  const location = useLocation();
  const keywords = location.pathname.split("/tag/").pop().replace(/-/g, " ");
  const [isLoading, setLoading] = useState(true);
  const [tagRelatedProducts, setTagRelatedProducts] = useState(null);
  const [thumbnail, setThumbnail] = useState("");

  useEffect(() => {
    const schemaObj = {
      name: document.title,
      contentUrl: document.location.href,
      acquireLicensePage: document.location.href,
      thumbnailUrl: `${process.env.NEXT_PUBLIC_API_URL}/media_images/company/piktak_logo.jpg`,
    };

    imageObjSchema(schemaObj);
  }, []);

  useEffect(() => {
    const CancelToken = axios.CancelToken;
    const source = CancelToken.source();

    axios
      .get(`${process.env.NEXT_PUBLIC_API_URL}/client/search/?tag=${keywords}`, { cancelToken: source.token })
      .then(({ data }) => {
        if (data?.status) {
          setTagRelatedProducts(data?.results);
          setThumbnail(data?.results[0]);
          setLoading(false);
        }
      })
      .catch((error) => console.log(" Related Tag Image error: ", error));

    return () => source.cancel();
  }, [keywords]);

  const imageThumbnail = encodeURI(`${getBaseURL().bucket_base_url}${getBaseURL().images}${thumbnail?.preview}`);

  return (
    <Layout title={`${tagName}`} description={`${tagName}`} ogImage={imageThumbnail}>
      <Header />

      <Suspense fallback={<Loader />}>
        <HeroSection size="medium" popularKeywords title="Graphic Resources for Free Download" />
      </Suspense>

      <Suspense fallback={<Loader />}>
        <Container>
          {tagRelatedProducts?.length > 0 && (
            <Typography className="text-[2.2rem] p-[3.5rem_0_3.5rem] font-[500] max-[425.95px]:p-[2.5rem_0_3rem]" variant="h4">
              {`${tagRelatedProducts?.length} Resources for "${tagName.replace(/-/g, " ")}"`}
            </Typography>
          )}

          <Grid container spacing={2}>
            {tagRelatedProducts === null ? (
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
              <>
                {tagRelatedProducts?.length ? (
                  tagRelatedProducts?.map((photo) => (
                    <Grid size={{ xs: 12, sm: 4, md: 3 }} key={photo.image_id}>
                      <Product photo={photo} />
                    </Grid>
                  ))
                ) : (
                  <ProductNotFound />
                )}
              </>
            )}
          </Grid>
        </Container>
      </Suspense>

      <Spacing space={{ height: "5rem" }} />

      <Suspense fallback={<Loader />}>
        <CallToAction
          title="Join Designhill designer team"
          subtitle="Upload your first copyrighted design. Get $5 designer coupon packs"
          buttonText="Join Us"
          uppercase
        />
      </Suspense>

      <Suspense fallback={<Loader />}>
        <Footer />
      </Suspense>
    </Layout>
  );
};

export default TagTemplate;
