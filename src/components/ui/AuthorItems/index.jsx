"use client";

import { Container, Grid, Tab, Tabs } from "@/components/ui-kit";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Loader from "../Loader";
import ProductNotFound from "../ProductNotFound";
import Product from "../Products/Product";
import Pagination from "./../Pagination/index";
import { usePathname } from "next/navigation";

const AuthorItems = ({ imageSummery, userId }) => {
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
      <Grid container className="mt-[3.2rem] mb-[3.2rem] flex justify-center">
        <Tabs
          value={value}
          onChange={handleActiveButton}
          aria-label="Author item count"
          classes={{
            root: "shadow-[0_2px_13px_5px_rgb(0_0_0_/_10%)]",
            flexContainer: "bg-[#fff] flex items-center justify-center p-[1rem_0.6rem] flex-wrap max-[479.95px]:p-[0] max-[479.95px]:justify-start",
            indicator: "h-[0]",
          }}
        >
          {imageSummery?.length > 0 &&
            imageSummery?.map((tag, index) => (
              <Tab
                key={index}
                value={index}
                label={`${tag.extension} (${tag.images})`}
                className="bg-[#fff] shadow-[0px_3px_1px_-2px_rgb(0_0_0_/_20%),0px_2px_2px_0px_rgb(0_0_0_/_14%),0px_1px_5px_0px_rgb(0_0_0_/_12%)] flex-[1] m-[0_0.6rem] [border:none] rounded-[0] text-[1.4rem] font-[500] text-[#1B3F4E] uppercase [transition:all_0.3s_linear] hover:shadow-[none] hover:bg-[#0088f2] hover:text-[#fff] max-[479.95px]:flex-[auto]"
                classes={{ selected: "bg-[#0088f2] text-[#fff]" }}
                onClick={() => handleAuthorResource(tag)}
              />
            ))}
        </Tabs>
      </Grid>

      <Grid classes={{ container: "mb-[4rem]" }} container spacing={2}>
        {isLoading ? (
          <Loader />
        ) : (
          <>
            {authorAllResource?.length ? (
              authorAllResource?.map((photo) => (
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
      {totalProduct > limit && <Pagination productPagination locationPath={locationPath} count={count} pageCount={pageCount} setPageCount={setPageCount} />}
    </Container>
  );
};

export default AuthorItems;
