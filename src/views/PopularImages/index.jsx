"use client";

import { Container, Grid } from "@/components/ui-kit";
import axios from "axios";
import React, { lazy, Suspense, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Spacing from "../../components/Spacing";
import Header from "../../components/ui/Header";
import SectionHeading from "../../components/ui/Heading";
import Loader from "../../components/ui/Loader";
import ProductNotFound from "../../components/ui/ProductNotFound";
import Product from "../../components/ui/Products/Product";
// import { TopSeller } from "../../components/ui/TopSeller";
import Layout from "../../Layout";
import { getBaseURL, imageObjSchema } from "./../../helpers/index";

const HeroSection = lazy(() => import("../../components/ui/Hero"));
const CallToAction = lazy(() => import("../../components/ui/CallToAction"));
const Blog = lazy(() => import("../../components/ui/Blog"));
const Footer = lazy(() => import("../../components/ui/Footer"));

const PopularImages = () => {
  const user = useSelector((state) => state.user);

  const [isLoading, setLoading] = useState(true);
  const [thumbnail, setThumbnail] = useState("");
  const [popularProducts, setPopularProducts] = useState({});

  useEffect(() => {
    let recentUrl;
    const CancelToken = axios.CancelToken;
    const source = CancelToken.source();

    if (user && user?.id) {
      recentUrl = `${process.env.NEXT_PUBLIC_API_URL}/images?sort_by=popular&user_id=${user.id}`;
    } else {
      recentUrl = `${process.env.NEXT_PUBLIC_API_URL}/images?sort_by=popular`;
    }
    axios
      .get(recentUrl, { cancelToken: source.token })
      .then(({ data }) => {
        if (data?.status) {
          setPopularProducts(data?.images);
          setThumbnail(data?.images[0]);
          setLoading(false);
        }
      })
      .catch((error) => {
        console.log("Category products error:", error);
        setLoading(false);
      });

    return () => source.cancel();
  }, [user]);

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
    <Layout title="Popular Images" ogImage={imageThumbnail}>
      <Header />

      <Suspense fallback={<Loader />}>
        <HeroSection size="large" popularKeywords title="Graphic Resource for Free Download" />
      </Suspense>

      <Spacing space={{ height: "3rem" }} />

      <Container>
        <SectionHeading title="Popular Images" large />
        <Grid container spacing={2}>
          {isLoading ? (
            <Loader />
          ) : (
            <>
              {popularProducts?.length ? (
                popularProducts?.map((photo) => (
                  <Grid size={{ xs: 6, sm: 4, md: 3 }} key={photo.image_id} className="max-[576px]:max-w-[100%] max-[576px]:basis-[100%]">
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

      <Spacing space={{ height: "3rem" }} />

      <Suspense fallback={<Loader />}>
        <CallToAction
          title="Daily 10 image/photos Download"
          subtitle="Top website templates with the highest sales volume."
          buttonLink="/subscription"
          buttonText="Get Started"
        />
      </Suspense>

      {/* <Container>
        <SectionHeading title="Top Selling Author" large>
          <Button className="text-[#1B3F4E] font-[500] font-['Roboto',sans-serif] capitalize text-[1.3rem] rounded-[3rem] opacity-[1] leading-[1.75] p-[0.4rem_1rem] [transition:all_0.3s_linear] hover:bg-[#0088f2] hover:text-[#fff]" component={Link} to="/sellers">
            See More
          </Button>
        </SectionHeading>
      </Container> */}

      {/* Top selling author */}
      {/* <TopSeller homeTopSeller /> */}
      {/* BLOG SECTION */}
      <Suspense fallback={<Loader />}>
        <Blog />
      </Suspense>

      <Suspense fallback={<Loader />}>
        <Footer />
      </Suspense>
    </Layout>
  );
};

export default PopularImages;
