"use client";

import { CircularProgress, Container, Grid, Typography } from "@/components/ui-kit";
import axios from "axios";
import React, { lazy, Suspense, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useLocation } from "@/lib/router";
import Spacing from "../../components/Spacing";
import Header from "../../components/ui/Header";
import Pagination from "../../components/ui/Pagination";
import ProductNotFound from "../../components/ui/ProductNotFound";
import Product from "../../components/ui/Products/Product";
import Layout from "../../Layout";
import SignUpModal from "../Authentication/SignUpModal";
import Loader from "./../../components/ui/Loader/index";
import { getBaseURL, imageObjSchema } from "./../../helpers/index";

const HeroSection = lazy(() => import("../../components/ui/Hero"));
const CallToAction = lazy(() => import("../../components/ui/CallToAction"));
const Footer = lazy(() => import("../../components/ui/Footer"));

const SearchResults = () => {
  const { pathname } = useLocation();
  const location = useLocation();
  const locationPath = location.pathname;
  const user = useSelector((state) => state.user);
  const keywords = location.pathname.split("=").pop().replace(/-/g, " ");

  const [openAuthModal, setOpenAuthModal] = useState(false);
  const [searchResults, setSearchResults] = useState(null);
  const [canonicalURL, setCanonicalURL] = useState("");
  const [isLoading, setLoading] = useState(false);

  const [totalProduct, setTotalProduct] = useState("");
  const [pageCount, setPageCount] = useState(1);
  const [thumbnail, setThumbnail] = useState("");

  let limit = 24;
  const count = Math.ceil(totalProduct / limit);

  // Expected shape is /search/title=<term>&category_id=<id>. A URL without an
  // "=" (a hand-typed /search/foo, for instance) used to crash the render.
  const [, searchQuery = "", categoryID] = pathname.split("=");
  const [keyword] = searchQuery.split("&");
  const [searchKey] = searchQuery.split("&");

  const prepareSearchQuery = () => {
    let url;
    if (categoryID && keyword) {
      url = `${process.env.NEXT_PUBLIC_API_URL}/client/search/?title=${searchKey.replace(/-/g, " ")}&category_id=${categoryID}&limit=${limit}&page=${pageCount}`;
    } else {
      url = `${process.env.NEXT_PUBLIC_API_URL}/client/search/?title=${searchKey.replace(/-/g, " ")}&limit=${limit}&page=${pageCount}`;
    }

    return encodeURI(url);
  };

  useEffect(() => {
    // Remove the parts after  "search" text from the URL
    const location = document.URL.split("/");
    location.pop();
    setCanonicalURL(location.join("/"));

    const url = prepareSearchQuery();
    const CancelToken = axios.CancelToken;
    const source = CancelToken.source();

    axios
      .get(url, { cancelToken: source.token })
      .then(({ data }) => {
        if (data?.status) {
          setSearchResults(data?.results);
          setThumbnail(data?.results[0]);
          setTotalProduct(data?.total);
          setLoading(false);
        }
      })
      .catch((error) => {
        console.log(error);
      });

    return () => source.cancel();
  }, [pathname, pageCount]);

  const handleJoinUsButton = () => {
    if (!user.token) {
      setOpenAuthModal(true);
    }
  };

  const imageThumbnail = encodeURI(`${getBaseURL().bucket_base_url}${getBaseURL().images}${thumbnail?.preview}`);

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
    <Layout title={`${searchKey}`} canonical={canonicalURL} ogImage={imageThumbnail}>
      <Header />

      <Suspense fallback={<Loader />}>
        <HeroSection size="large" popularKeywords title="Graphic Resources for Free Download" />
      </Suspense>

      <Suspense fallback={<Loader />}>
        <Container>
          {totalProduct > 0 && (
            <Typography className="text-[2.2rem] p-[3rem_0rem] max-[425.95px]:p-[2.5rem_0_3rem]" variant="h3">
              {`${totalProduct} Resources for "${searchKey.replace(/-/g, " ")}"`}
            </Typography>
          )}

          <Grid container spacing={2}>
            {searchResults === null ? (
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
                {searchResults.length ? (
                  searchResults?.map((photo) => (
                    <Grid size={{ xs: 6, sm: 4, md: 3 }} key={photo.image_id} className="max-[576px]:max-w-[100%] max-[576px]:basis-[100%]">
                      <Product photo={photo} />
                    </Grid>
                  ))
                ) : (
                  <ProductNotFound keywords={keywords} />
                )}
              </>
            )}
          </Grid>

          {totalProduct > limit && <Pagination locationPath={locationPath} count={count} pageCount={pageCount} setPageCount={setPageCount} />}
        </Container>
      </Suspense>

      <Spacing space={{ height: "3rem" }} />

      <Suspense fallback={<Loader />}>
        {!user.token ? (
          <CallToAction
            title="Join Piktask team"
            subtitle="Upload your first copyrighted design. Get $5 designer coupon packs"
            buttonText="Join Us"
            buttonClicked={() => handleJoinUsButton()}
          />
        ) : (
          <CallToAction
            title="Go Premium"
            subtitle="Upload your first copyrighted design. Get $5 designer coupon packs"
            buttonLink="/subscription"
            buttonText="See Plans"
          />
        )}
      </Suspense>

      {/* Sign up modal section*/}
      <SignUpModal openAuthModal={openAuthModal} setOpenAuthModal={setOpenAuthModal} />

      <Suspense fallback={<Loader />}>
        <Footer />
      </Suspense>
    </Layout>
  );
};

export default SearchResults;
