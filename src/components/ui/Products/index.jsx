"use client";

import { Button, Grid } from "@/components/ui-kit";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "@/lib/router";
import SectionHeading from "../Heading";
import Loader from "../Loader";
import Product from "./Product";



const Products = (props) => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  const { category, count, showHeading, piktaskCollection } = props;

  const [piktaskProduct, setPiktaskProduct] = useState([]);
  const [isLoading, setLoading] = useState(true);
  const [images, setImages] = useState([]);

  // Data load
  useEffect(() => {
    const cancelToken = axios.CancelToken;
    const source = cancelToken.source();

    let categoryURL;

    if (category?.id) {
      if (user?.id && user?.role === "user") {
        categoryURL = `${process.env.NEXT_PUBLIC_API_URL}/categories/${category?.id}?user_id=${user?.id}`;
      } else {
        categoryURL = `${process.env.NEXT_PUBLIC_API_URL}/categories/${category?.id}`;
      }

      axios
        .get(categoryURL, { cancelToken: source.token })
        .then(({ data }) => {
          if (data?.status) {
            setImages(data?.category_image);
            setLoading(false);

            dispatch({
              type: "CATEGORY_BASED_ITEMS",
              payload: {
                totalImages: data?.total,
                images: data?.category_image,
              },
            });
          }
        })
        .catch((error) => {
          if (axios.isCancel(error)) {
            // console.log("Request canceled", error.response);
          } else {
            // console.log("Else message, handles error");
          }
        });
    }

    return () => source.cancel();
  }, [dispatch, category?.id, user?.id, user?.role]);

  useEffect(() => {
    let categoryURL;
    const cancelToken = axios.CancelToken;
    const source = cancelToken.source();

    if (piktaskCollection) {
      if (user?.id && user?.role === "user") {
        categoryURL = `${process.env.NEXT_PUBLIC_API_URL}/categories/53?limit=16&user_id=${user?.id}`;
      } else {
        categoryURL = `${process.env.NEXT_PUBLIC_API_URL}/categories/53/?limit=16`;
      }
      axios
        .get(categoryURL, { cancelToken: source.token })
        .then(({ data }) => {
          if (data?.status) {
            setPiktaskProduct(data?.category_image);
            setLoading(false);

            dispatch({
              type: "CATEGORY_BASED_ITEMS",
              payload: {
                totalImages: data?.total,
                images: data?.category_image,
              },
            });
          }
        })
        .catch((error) => {
          console.log("Category error", error);
        });
    }

    return () => source.cancel();
  }, [user?.id, user?.role, piktaskCollection, dispatch]);

  return (
    <>
      {piktaskCollection ? (
        <>
          {piktaskProduct?.length !== 0 && (
            <SectionHeading title="Piktask Collection" large>
              <Button className="text-[#1B3F4E] font-[500] font-['Roboto',sans-serif] capitalize text-[1.3rem] rounded-[3rem] opacity-[1] leading-[1.75] p-[0.4rem_1rem] [transition:all_0.3s_linear] hover:bg-[#0088f2] hover:text-[#fff]" component={Link} to={"category/piktask-collection"}>
                See More
              </Button>
            </SectionHeading>
          )}

          <Grid classes={{ container: "mb-[2.2rem]" }} container spacing={2}>
            {isLoading ? (
              <Loader item={piktaskProduct} />
            ) : (
              <>
                {piktaskProduct?.length > 0 &&
                  piktaskProduct?.slice(0, 16).map((photo) => (
                    <Grid size={{ xs: 6, sm: 4, md: 3 }} key={photo?.image_id} className="max-[576px]:max-w-[100%] max-[576px]:basis-[100%]">
                      <Product key={photo?.image_id} catId={piktaskProduct?.id} photo={photo} />
                    </Grid>
                  ))}
              </>
            )}
          </Grid>
        </>
      ) : (
        <>
          {images?.length !== 0 && showHeading && (
            <SectionHeading title={category?.name} large>
              <Button className="text-[#1B3F4E] font-[500] font-['Roboto',sans-serif] capitalize text-[1.3rem] rounded-[3rem] opacity-[1] leading-[1.75] p-[0.4rem_1rem] [transition:all_0.3s_linear] hover:bg-[#0088f2] hover:text-[#fff]" component={Link} to={`category/${category?.slug}`}>
                See More
              </Button>
            </SectionHeading>
          )}

          <Grid classes={{ container: "mb-[2.2rem]" }} container spacing={2}>
            {isLoading ? (
              <Loader item={images} />
            ) : (
              <>
                {images?.length > 0 &&
                  images?.slice(0, count).map((photo) => (
                    <Grid size={{ xs: 6, sm: 4, md: 3 }} key={photo?.image_id} className="max-[576px]:max-w-[100%] max-[576px]:basis-[100%]">
                      <Product key={photo?.image_id} catId={category?.id} photo={photo} />
                    </Grid>
                  ))}
              </>
            )}
          </Grid>
        </>
      )}
    </>
  );
};

export default Products;
