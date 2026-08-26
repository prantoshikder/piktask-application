"use client";

import { CircularProgress, Grid } from "@/components/ui-kit";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { getBaseURL, imageObjSchema } from "../../../helpers";
import ProductImage from "./ProductImage";
import ProductInfo from "./ProductInfo";



const ProductDetails = (props) => {
  const { imageID, setAllTags, location, shareUrl, setProductTitle, setThumbnail } = props;
  const user = useSelector((state) => state.user);

  // const [downloadLicenseDialog, setDownloadLicenseDialog] = useState(false);
  const [isFollowing, setFollowing] = useState(false);
  const [isLoading, setLoading] = useState(true);
  const [imageDetails, setImageDetails] = useState({});
  const [isLike, setLike] = useState(false);
  const [imageLink, setImageLink] = useState("");

  useEffect(() => {
    const CancelToken = axios.CancelToken;
    const source = CancelToken.source();

    // Match image ID
    axios
      .get(`${process.env.NEXT_PUBLIC_API_URL}/images/${imageID}`, { cancelToken: source.token })
      .then(({ data }) => {
        if (data?.success) {
          setImageDetails(data?.detail);
          setProductTitle(data?.detail.title);
          setImageLink(data?.detail.preview);
          if (data?.related_tags) {
            const tags = data?.related_tags;
            setAllTags(tags.filter((e) => e));
          }
          setLoading(false);

          if (user && user?.isLoggedIn && user.role === "user") {
            axios
              .get(`${process.env.NEXT_PUBLIC_API_URL}/contributor/follow_status/${data.detail.user_id}`, {
                cancelToken: source.token,
                headers: { Authorization: user.token },
              })
              .then((response) => {
                if (response.data.status) {
                  setFollowing(true);
                  setLoading(false);
                } else {
                  setFollowing(false);
                  setLoading(false);
                }
              });
          }
        }
      })
      .catch((error) => {
        console.log("Single image", error);
        setLoading(false);
      });

    // Like status API
    if (user && user?.isLoggedIn && user?.role === "user") {
      axios
        .get(`${process.env.NEXT_PUBLIC_API_URL}/images/${imageID}/like_status`, {
          headers: { cancelToken: source.token, Authorization: user?.token },
        })
        .then(({ data }) => {
          if (!data?.status) {
            setLike(false);
            setLoading(false);
          } else if (data?.status) {
            setLike(true);
            setLoading(false);
          } else {
            console.log("Image like status error");
            setLoading(false);
          }
        })
        .catch((error) => console.log("Like status error: ", error));
    }

    return () => source.cancel();
  }, [imageID, user, user?.token, setAllTags, setProductTitle]);

  useEffect(() => {
    const imageThumbnail = encodeURI(`${getBaseURL().bucket_base_url}${getBaseURL().images}${imageDetails?.preview}`);

    const schemaObj = {
      name: imageDetails.title,
      contentUrl: shareUrl,
      datePublished: imageDetails.createdAt,
      fileFormat: imageDetails.extension,
      acquireLicensePage: shareUrl,
      thumbnailUrl: imageThumbnail,
    };

    imageObjSchema(schemaObj);
  }, [imageDetails, shareUrl]);

  return isLoading ? (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        margin: "0 auto",
        height: 300,
      }}
    >
      <CircularProgress color="primary" />
    </div>
  ) : (
    <Grid container spacing={4}>
      <Grid size={{ xs: 12, sm: 6, md: 7 }} className="max-[959.95px]:max-w-[100%] max-[959.95px]:basis-[100%]">
        <ProductImage setThumbnail={setThumbnail} imageDetails={imageDetails} />
      </Grid>

      <Grid size={{ xs: 12, sm: 6, md: 5 }} className="max-[959.95px]:max-w-[100%] max-[959.95px]:basis-[100%]">
        <ProductInfo
          productDetails={{
            isFollowing,
            setFollowing,
            imageID,
            location,
            imageDetails,
            isLike,
            setLike,
            shareUrl,
            imageLink,
            setLoading,
          }}
        />
      </Grid>
    </Grid>
  );
};

export default ProductDetails;
