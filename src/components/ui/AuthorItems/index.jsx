"use client";

import { Container, Grid, Tab, Tabs } from "@mui/material";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Loader from "../Loader";
import ProductNotFound from "../ProductNotFound";
import Product from "../Products/Product";
import Pagination from "./../Pagination/index";
import { usePathname } from "next/navigation";
import useStyles from "./AuthorItems.styles";

const AuthorItems = ({ imageSummery, userId }) => {
  const { classes } = useStyles();
  const locationPath = usePathname();
  const user = useSelector((state) => state.user);

  const [authorAllResource, setAuthorAllResource] = useState([]);
  const [isLoading, setLoading] = useState(true);
  const [value, setValue] = useState(0);
  const [productExtension, setProductExtension] = useState();
  const [extension, setExtension] = useState("");
  const [productCount, setProductCount] = useState("");

  const [pageCount, setPageCount] = useState(1);
  const [totalProduct, setTotalProduct] = useState("");
  let limit = 24;
  const count = Math.ceil(totalProduct / limit);

  const handleActiveButton = (event, newValue) => {
    setValue(newValue);
  };

  useEffect(() => {
    if (extension) {
      setProductExtension(extension);
      setTotalProduct(productCount);
    } else {
      setProductExtension(imageSummery[0]?.extension);
      setTotalProduct(imageSummery[0]?.images);
    }

    if (productExtension) {
      let url;

      if (user?.isLoggedIn && user?.id) {
        url = `${process.env.NEXT_PUBLIC_API_URL}/contributor/${userId}/images/${productExtension}?limit=${limit}&page=${pageCount}&userId=${user?.id}`;
      } else {
        url = `${process.env.NEXT_PUBLIC_API_URL}/contributor/${userId}/images/${productExtension}?limit=${limit}&page=${pageCount}`;
      }

      axios
        .get(url)
        .then(({ data }) => {
          if (data?.status) {
            setAuthorAllResource(data?.images);
            setLoading(false);
          }
        })
        .catch((error) => {
          console.log("All author resources", error);
          setLoading(false);
        });
    }
  }, [userId, imageSummery, user, limit, pageCount, productExtension, extension, productCount]);

  const handleAuthorResource = (tag) => {
    setProductExtension("");
    if (tag?.extension) {
      setProductCount(tag?.images);
      setExtension(tag?.extension);
      setPageCount(1);
    }
  };

  return (
    <Container>
      <Grid container className={classes.authorItemTags}>
        <Tabs
          value={value}
          onChange={handleActiveButton}
          aria-label="Author item count"
          classes={{
            root: classes.root,
            flexContainer: classes.flexContainer,
            indicator: classes.indicator,
          }}
        >
          {imageSummery?.length > 0 &&
            imageSummery?.map((tag, index) => (
              <Tab
                key={index}
                value={index}
                label={`${tag.extension} (${tag.images})`}
                className={classes.tagButton}
                classes={{ selected: classes.selected }}
                onClick={() => handleAuthorResource(tag)}
              />
            ))}
        </Tabs>
      </Grid>

      <Grid classes={{ container: classes.container }} container spacing={2}>
        {isLoading ? (
          <Loader />
        ) : (
          <>
            {authorAllResource?.length ? (
              authorAllResource?.map((photo) => (
                <Grid size={{ xs: 6, sm: 4, md: 3 }} key={photo.image_id} className={classes.productItem}>
                  <Product photo={photo} />
                </Grid>
              ))
            ) : (
              <ProductNotFound />
            )}
          </>
        )}
      </Grid>
      {totalProduct > limit && <Pagination productPagination locationPath={locationPath} count={count} pageCount={pageCount} setPageCount={setPageCount} />}
    </Container>
  );
};

export default AuthorItems;
