"use client";

import { Button, Container } from "@mui/material";
import { lazy, Suspense, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "@/lib/router";
import piktaskImg from "../../assets/piktask.jpg";
import Spacing from "../../components/Spacing";
import Header from "../../components/ui/Header";
import HeroSection from "../../components/ui/Hero";
import Loader from "../../components/ui/Loader";
import { imageObjSchema } from "../../helpers";
import useStyles from "./Home.styles";

const Layout = lazy(() => import("../../Layout"));
const SectionHeading = lazy(() => import("../../components/ui/Heading"));
const CategoryCarousel = lazy(() => import("../../components/ui/Carousel"));
// const Blog = lazy(() => import("../../components/ui/Blog"));
const Footer = lazy(() => import("../../components/ui/Footer"));
const Products = lazy(() => import("../../components/ui/Products"));
const CallToAction = lazy(() => import("../../components/ui/CallToAction"));

const Home = () => {
  const { classes } = useStyles();
  const categories = useSelector((state) => state.popularCategories);
  const [popularCats, setPopularCats] = useState([]);
  const [scrolling, setScrolling] = useState(0);
  let [index, setIndex] = useState(0);

  useEffect(() => {
    const schemaObj = {
      name: document.title,
      contentUrl: document.location.href,
      acquireLicensePage: document.location.href,
      thumbnailUrl: `${process.env.NEXT_PUBLIC_API_URL}/media_images/company/piktak_logo.jpg`,
    };

    imageObjSchema(schemaObj);
  }, []);

  // onScroll data load function.
  // This used to assign window.onscroll during render, which both leaked a new
  // handler on every render and crashed on the server.
  useEffect(() => {
    const handleScroll = () => {
      setScrolling(window.pageYOffset);
      const currentPosition = scrolling;

      if (categories.length && currentPosition % 50 > 30 && index < categories.length) {
        const category = categories[index];
        setIndex((prev) => prev + 1);
        popularCats.push(category);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [categories, index, popularCats, scrolling]);

  return (
    <Suspense fallback={<Loader />}>
      <Layout
        title="Graphic Resources for Free Download"
        description="Graphic Resources for Free Download"
        ogUrl=""
        ogType=""
      >
        <Header />

        <HeroSection size="large" popularKeywords heroButton title="Graphic Resources for Free Download" />

        <Container>
          <Suspense fallback={<Loader />}>
            <Spacing space={{ height: "3rem" }} />
            <SectionHeading title="Popular Album Collection" large>
              <Button className={classes.headingButton} component={Link} to="/categories">
                See More
              </Button>
            </SectionHeading>

            <Spacing space={{ height: "1.2rem" }} />

            {/* Carousel with Categories */}

            <CategoryCarousel />
          </Suspense>
        </Container>

        <Container>
          <Suspense fallback={<Loader />}>
            <Products piktaskCollection />
          </Suspense>
        </Container>

        {/* <Container>
          <Suspense fallback={<Loader />}>
            <Products category={categories[0]} showHeading count={8} />
          </Suspense>
        </Container> */}

        {popularCats?.length &&
          popularCats
            .filter((cat) => cat.id !== 53)
            ?.map((category, index) => (
              <Container key={category?.id}>
                <Suspense fallback={<Loader />}>
                  <Products key={category?.id} category={category} showHeading count={8} />
                </Suspense>
              </Container>
            ))}

        <Suspense fallback={<Loader />}>
          <CallToAction
            title="Daily 10 image/photos Download"
            subtitle="Top website templates with the highest sales volume."
            // buttonLink="/subscription"
            buttonText="Get Started"
          />
        </Suspense>

        {/* <Container>
        <SectionHeading title="Top Selling Author" large>
        <Button
        className={classes.headingButton}
        component={Link}
            to="/sellers"
            >
            See More
            </Button>
            </SectionHeading>
            </Container>
            Top selling author 
          <TopSeller homeTopSeller /> */}
        {/* BLOG SECTION */}

        {/* <Suspense fallback={<Loader />}>
          <Blog />
        </Suspense> */}

        <Suspense fallback={<Loader />}>
          <Footer />
        </Suspense>
      </Layout>
    </Suspense>
  );
};

export default Home;
