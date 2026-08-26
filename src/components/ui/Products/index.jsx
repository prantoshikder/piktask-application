"use client";

import { Button, Grid } from "@mui/material";
import { makeStyles } from "tss-react/mui";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "@/lib/router";
import SectionHeading from "../Heading";
import Loader from "../Loader";
import Product from "./Product";

const useStyles = makeStyles()((theme) => ({
  container: {
    marginBottom: "2.2rem",
  },
  productItem: {
    "@media (max-width: 576px)": {
      maxWidth: "100%",
      flexBasis: "100%",
    },
  },
  headingButton: {
    ...theme.typography.button,
    padding: "0.4rem 1rem",
    fontSize: "1.3rem",
    fontWeight: 500,
    color: "#1B3F4E",
    transition: "all 0.3s linear",

    "&:hover": {
      backgroundColor: theme.palette.secondary.main,
      color: "#fff",
    },
  },
}));

const Products = (props) => {
  const { classes } = useStyles();
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
              <Button className={classes.headingButton} component={Link} to={"category/piktask-collection"}>
                See More
              </Button>
            </SectionHeading>
          )}

          <Grid classes={{ container: classes.container }} container spacing={2}>
            {isLoading ? (
              <Loader item={piktaskProduct} />
            ) : (
              <>
                {piktaskProduct?.length > 0 &&
                  piktaskProduct?.slice(0, 16).map((photo) => (
                    <Grid size={{ xs: 6, sm: 4, md: 3 }} key={photo?.image_id} className={classes.productItem}>
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
              <Button className={classes.headingButton} component={Link} to={`category/${category?.slug}`}>
                See More
              </Button>
            </SectionHeading>
          )}

          <Grid classes={{ container: classes.container }} container spacing={2}>
            {isLoading ? (
              <Loader item={images} />
            ) : (
              <>
                {images?.length > 0 &&
                  images?.slice(0, count).map((photo) => (
                    <Grid size={{ xs: 6, sm: 4, md: 3 }} key={photo?.image_id} className={classes.productItem}>
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
