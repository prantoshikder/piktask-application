"use client";

import { Grid } from "@mui/material";
import NavigateBeforeIcon from "@mui/icons-material/NavigateBefore";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import Spacing from "../../Spacing";
import Loader from "../Loader";
import PopularCategory from "../PopularCategory";
import useStyles from "./Carousel.styles";

function NavigateNextArrow(props) {
  const { className, onClick } = props;
  return (
    <div className={className} onClick={onClick}>
      <NavigateNextIcon />
    </div>
  );
}

function NavigatePrevArrow(props) {
  const { className, onClick } = props;
  return (
    <div className={className} onClick={onClick}>
      <NavigateBeforeIcon />
    </div>
  );
}

const CategoryCarousel = () => {
  const { classes } = useStyles();
  const categories = useSelector((state) => state.popularCategories);
  const [isLoading, setLoading] = useState(true);

  useEffect(() => {
    if (categories?.length > 0) {
      setLoading(false);
    }
  }, [categories]);

  const settings = {
    dots: false,
    infinite: true,
    autoplay: true,
    speed: 1000,
    slidesToShow: 4,
    slidesToScroll: 1,
    initialSlide: 0,
    arrows: true,
    nextArrow: <NavigateNextArrow />,
    prevArrow: <NavigatePrevArrow />,

    responsive: [
      {
        breakpoint: 1440,
        settings: {
          slidesToShow: 4,
          slidesToScroll: 1,
          infinite: true,
        },
      },
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
          infinite: true,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          initialSlide: 2,
          infinite: true,
        },
      },
      {
        breakpoint: 576,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          infinite: true,
        },
      },
    ],
  };

  return (
    <>
      {categories?.length >= 5 ? (
        <Slider {...settings} className={classes.carouselWrapper}>
          {Array.isArray(categories) && categories?.map((photo) => <PopularCategory key={photo.id} photo={photo} />)}
        </Slider>
      ) : (
        <>
          <Grid classes={{ container: classes.container }} container spacing={2}>
            {isLoading ? (
              <Loader />
            ) : (
              <>
                {Array.isArray(categories) &&
                  categories?.map((photo) => (
                    <Grid size={{ xs: 6, sm: 4, md: 3 }} key={photo?.id} className={classes.productItem}>
                      <PopularCategory key={photo.id} photo={photo} />
                    </Grid>
                  ))}
              </>
            )}
          </Grid>
          <Spacing space={{ height: "3rem" }} />
        </>
      )}
    </>
  );
};

export default CategoryCarousel;
