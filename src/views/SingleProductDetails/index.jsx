"use client";

import { Container } from "@/components/ui-kit";
import { useState } from "react";
import { useLocation } from "@/lib/router";
import ProductDetails from "../../components/Partials/ProductDetails";
import Spacing from "../../components/Spacing";
import Footer from "../../components/ui/Footer";
import Header from "../../components/ui/Header";
import SectionHeading from "../../components/ui/Heading";
import HeroSection from "../../components/ui/Hero";
import RelatedImage from "../../components/ui/RelatedImage";
import TagButtons from "../../components/ui/TagButtons";
import { useCurrentUrl } from "@/lib/browser";
import Layout from "../../Layout";

const SingleProductDetails = () => {
  const location = useLocation();
  const shareUrl = useCurrentUrl();
  const imageID = location.pathname.split("=").pop();

  const [productTitle, setProductTitle] = useState("");
  const [allTags, setAllTags] = useState([]);
  const [thumbnail, setThumbnail] = useState("");

  return (
    <Layout title={`${productTitle}`} ogImage={thumbnail}>
      <Header />

      <HeroSection size="medium" heroTitle title="Graphic Resources for Free Download" />

      <Container className="mt-[4.5rem]">
        <ProductDetails
          location={location}
          setAllTags={setAllTags}
          imageID={imageID}
          shareUrl={shareUrl}
          setProductTitle={setProductTitle}
          setThumbnail={setThumbnail}
        />

        <Spacing space={{ height: "2.5rem" }}></Spacing>

        <SectionHeading title="Related Products" subtitle="Top website templates with the highest sales volume." size="large" />

        <RelatedImage imageID={imageID} />

        <TagButtons allTags={allTags} />
      </Container>

      <Footer />
    </Layout>
  );
};

export default SingleProductDetails;
