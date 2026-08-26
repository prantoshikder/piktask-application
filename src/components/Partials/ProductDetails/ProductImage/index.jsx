"use client";

import React, { useEffect } from "react";
import { getBaseURL } from "../../../../helpers";



const ProductImage = ({ imageDetails, setThumbnail }) => {
  const imageThumbnail = encodeURI(`${getBaseURL().bucket_base_url}${getBaseURL().images}${imageDetails?.preview}`);

  useEffect(() => {
    setThumbnail(imageThumbnail);
  }, [setThumbnail, imageThumbnail]);

  return (
    <div className="bg-[#fff] max-[479.95px]:bg-[transparent]">
      <img title={imageDetails.title} className="w-[100%] h-[100%] object-cover p-[2rem_2rem] max-[959.95px]:h-[auto] max-[479.95px]:p-[0]" src={imageThumbnail} alt={imageDetails?.original_name} width="817px" height="511px" />
    </div>
  );
};

export default ProductImage;
