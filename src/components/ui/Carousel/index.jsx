"use client";

import { Grid } from "@/components/ui-kit";
import { LeftOutlined as NavigateBeforeIcon } from "@ant-design/icons";
import { RightOutlined as NavigateNextIcon } from "@ant-design/icons";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import Spacing from "../../Spacing";
import Loader from "../Loader";
import PopularCategory from "../PopularCategory";

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
        <Slider {...settings} className="mb-[3rem] [&_.slick-list]:m-[0_0px] [&_.slick-arrow]:absolute [&_.slick-arrow]:top-[50%] [&_.slick-arrow]:[transform:translateY(-60.4%)] [&_.slick-arrow]:z-[1] [&_.slick-arrow]:text-[#1B3F4E] [&_.slick-arrow]:h-[83%] [&_.slick-arrow]:w-[150px] [&_.slick-arrow]:cursor-pointer [&_.slick-arrow]:[&_.anticon]:text-[rgb(20_51_64_/_94%)] [&_.slick-arrow]:[&_.anticon]:absolute [&_.slick-arrow]:[&_.anticon]:top-[50%] [&_.slick-arrow]:[&_.anticon]:[transform:translateY(-50%)] [&_.slick-arrow]:[&_.anticon]:text-[3.5rem] [&_.slick-arrow]:[&_.anticon]:bg-[#ddd] [&_.slick-arrow]:[&_.anticon]:rounded-[50%] [&_.slick-prev]:left-[0] [&_.slick-prev]:bg-[linear-gradient(90deg,rgba(0,0,0,0.7206232834930848)_0%,rgba(0,0,0,0)_100%)] [&_.slick-prev]:[&_.anticon]:left-[15%] [&_.slick-prev]:[&_.anticon]:[transition:all_0.3s_linear] [&_.slick-prev]:[&:hover_.anticon]:bg-[#0088f2] [&_.slick-prev]:[&:hover_.anticon]:text-[white] [&_.slick-next]:right-[-2px] [&_.slick-next]:bg-[linear-gradient(-90deg,rgba(0,0,0,0.7206232834930848)_0%,rgba(0,0,0,0)_100%)] [&_.slick-next]:[&_.anticon]:right-[15%] [&_.slick-next]:[&_.anticon]:[transition:all_0.3s_linear] [&_.slick-next]:[&:hover_.anticon]:bg-[#0088f2] [&_.slick-next]:[&:hover_.anticon]:text-[white]">
          {Array.isArray(categories) && categories?.map((photo) => <PopularCategory key={photo.id} photo={photo} />)}
        </Slider>
      ) : (
        <>
          <Grid container spacing={2}>
            {isLoading ? (
              <Loader />
            ) : (
              <>
                {Array.isArray(categories) &&
                  categories?.map((photo) => (
                    <Grid size={{ xs: 6, sm: 4, md: 3 }} key={photo?.id}>
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
