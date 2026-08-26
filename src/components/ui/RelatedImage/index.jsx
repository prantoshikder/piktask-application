"use client";

import { Grid } from "@/components/ui-kit";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Loader from "../Loader";
import Pagination from "../Pagination";
import Product from "../Products/Product";

const RelatedImage = ({ imageID }) => {
  const user = useSelector((state) => state.user);
  const [isLoading, setLoading] = useState(true);
  const [relatedImage, setRelatedImage] = useState([]);

  const [pageCount, setPageCount] = useState(1);
  const [totalProduct, setTotalProduct] = useState();
  let limit = 28;
  const count = Math.ceil(totalProduct / limit);

  useEffect(() => {
    // related product API
    let relatedImageURL;
    const CancelToken = axios.CancelToken;
    const source = CancelToken.source();

    if (user?.isLoggedIn && user?.id && user?.role === "user") {
      relatedImageURL = `${process.env.NEXT_PUBLIC_API_URL}/images/${imageID}/related_image?limit=${limit}&page=${pageCount}&user_id=${user?.id}`;
    } else {
      relatedImageURL = `${process.env.NEXT_PUBLIC_API_URL}/images/${imageID}/related_image?limit=${limit}&page=${pageCount}`;
    }
    axios
      .get(relatedImageURL, { cancelToken: source.token })
      .then(({ data }) => {
        if (data?.status) {
          setRelatedImage(data?.images);
          setTotalProduct(data?.total);
          setLoading(false);
        }
      })
      .catch((error) => {
        console.log("Related image error: ", error);
        setLoading(false);
      });

    return () => source.cancel();
  }, [imageID, user?.id, user?.isLoggedIn, user?.role, limit, pageCount]);

  return (
    <>
      <Grid container spacing={2}>
        {isLoading ? (
          <Loader />
        ) : (
          relatedImage?.length > 0 &&
          relatedImage?.map((photo) => (
            <Grid size={{ xs: 6, sm: 4, md: 3 }} key={photo?.image_id} className="max-[576px]:max-w-[100%] max-[576px]:basis-[100%]">
              <Product photo={photo} />
            </Grid>
          ))
        )}
      </Grid>
      {/* <div>
        <Button>Load More</Button>
      </div> */}
      {totalProduct > limit && <Pagination productPagination count={count} pageCount={pageCount} setPageCount={setPageCount} />}
    </>
  );
};

export default RelatedImage;
