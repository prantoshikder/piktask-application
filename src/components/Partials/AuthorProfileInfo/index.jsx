"use client";

import { Typography } from "@/components/ui-kit";
import React from "react";
import { Link } from "@/lib/router";
import authorPhoto from "../../../assets/author.png";
import { getBaseURL, joinImageUrl } from "./../../../helpers/index";



const AuthorProfileInfo = ({ productDetails }) => {
  return (
    <div className="flex items-center w-[fit-content] mr-[5rem] max-[768px]:mb-[2rem] max-[479.95px]:mr-[6rem]">
      <Link to={`/author/${productDetails?.imageDetails?.user?.username}`}>
        {productDetails?.imageDetails?.user?.avatar ? (
          <img
            className="w-[4.5rem] h-[4.5rem] rounded-[50%] p-[0.2rem] shadow-[0px_0px_5px_#ddd] mr-[1.4rem] object-cover text-[#000] cursor-pointer max-[768px]:w-[5.8rem] max-[768px]:h-[5.8rem] max-[479.95px]:w-[4.5rem] max-[479.95px]:h-[4.5rem]"
            src={joinImageUrl(getBaseURL().bucket_base_url + "/", productDetails?.imageDetails?.user?.avatar)}
            alt={productDetails?.imageDetails?.user?.username}
            width="41px"
            height="41px"
          />
        ) : (
          <img className="w-[4.5rem] h-[4.5rem] rounded-[50%] p-[0.2rem] shadow-[0px_0px_5px_#ddd] mr-[1.4rem] object-cover text-[#000] cursor-pointer max-[768px]:w-[5.8rem] max-[768px]:h-[5.8rem] max-[479.95px]:w-[4.5rem] max-[479.95px]:h-[4.5rem]" src={authorPhoto.src} alt={productDetails?.imageDetails?.user?.username} width="41px" height="41px" />
        )}
      </Link>

      <div>
        <Typography className="text-[#0088f2] text-[1.6rem] font-[400] no-underline! cursor-pointer" variant="h3" component={Link} to={`/author/${productDetails?.imageDetails?.user?.username}`}>
          {productDetails?.imageDetails?.user?.username}
        </Typography>

        <Typography className="text-[1.4rem] font-[400] max-[479.95px]:text-[1.3rem]" variant="body2">
          {productDetails?.imageDetails?.user?.total_resources} Resources
        </Typography>
      </div>
    </div>
  );
};

export default AuthorProfileInfo;
