"use client";

import { Button, Container, Grid } from "@mui/material";
import axios from "axios";
import React, { lazy, Suspense, useEffect, useState } from "react";
import { Link } from "@/lib/router";
import Spacing from "../../components/Spacing";
import Header from "../../components/ui/Header";
import CategoryItemLoader from "../../components/ui/Loader/CategoryItemLoader";
import ProductNotFound from "../../components/ui/ProductNotFound";
import { getBaseURL, imageObjSchema } from "../../helpers";
import Layout from "../../Layout";
import Loader from "./../../components/ui/Loader/index";
import useStyles from "./Categories.style";

const HeroSection = lazy(() => import("../../components/ui/Hero"));
const CallToAction = lazy(() => import("../../components/ui/CallToAction"));
const Footer = lazy(() => import("../../components/ui/Footer"));

const Categories = () => {
  const { classes } = useStyles();
  const [isLoading, setLoading] = useState(true);
  const [popularCategories, setPopularCategories] = useState([]);
  const [thumbnail, setThumbnail] = useState("");

  useEffect(() => {
    const CancelToken = axios.CancelToken;
    const source = CancelToken.source();

    axios
      .get(`${process.env.NEXT_PUBLIC_API_URL}/categories/popular?limit=50`, { cancelToken: source.token })
      .then(({ data }) => {
        if (data?.status) {
          setPopularCategories(data?.categories);
          setThumbnail(data?.categories[0]);
          setLoading(false);
        }
      })
      .catch((error) => {
        setLoading(false);
        console.log("Popular categories error: ", error);
      });

    return () => source.cancel();
  }, []);

  const imageThumbnail = encodeURI(`${getBaseURL().bucket_base_url}${getBaseURL().images}${thumbnail?.thumbnail}`);

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
    <Layout title="All Categories" ogImage={imageThumbnail}>
      <Header />

      <Suspense fallback={<Loader />}>
        <HeroSection title="Graphic Resources for Free Download" size="large" popularKeywords />
      </Suspense>

      <Spacing space={{ height: "4rem" }} />

      <Suspense fallback={<Loader />}>
        <Container>
          <Grid classes={{ container: classes.container }} container spacing={2}>
            {isLoading ? (
              <CategoryItemLoader />
            ) : (
              <>
                {popularCategories?.length ? (
                  popularCategories?.map((photo) => (
                    <Grid size={{ xs: 12, sm: 4, md: 3 }} key={photo.id} className={classes.productItem}>
                      <div className={classes.catItemWrapper}>
                        <div className={classes.catItem}>
                          <Link to={`/category/${photo.slug}`}>
                            <img
                              className={classes.catImage}
                              src={getBaseURL().bucket_base_url + getBaseURL().categories + photo?.thumbnail}
                              alt={`${photo?.name}`}
                            />
                          </Link>

                          <Button className={classes.catName} component={Link} to={`/category/${photo.slug}`}>
                            {photo?.name}
                          </Button>
                        </div>
                      </div>
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

      <Spacing space={{ height: "4rem" }} />

      <Suspense fallback={<Loader />}>
        <CallToAction
          title="Join Piktask Designer team"
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

export default Categories;
