"use client";

import { Button } from "@/components/ui-kit";
import React from "react";
import { Link } from "@/lib/router";
import { getBaseURL } from "../../../helpers";

const PopularCategory = ({ photo }) => {
  return (
    <div className="flex flex-col justify-center relative w-[100%]">
      <div className="m-[0_5px]">
        <Link to={`category/${photo.slug}`}>
          <img
            className="cursor-pointer w-[100%] h-[240px] object-cover"
            src={getBaseURL().bucket_base_url + getBaseURL().categories + photo?.thumbnail}
            alt={`${photo?.name}`}
            width="363px"
            height="240px"
          />
        </Link>
        <Button className="z-[99] bg-[#ffffff] text-[#333333] text-[1.7rem] h-[50px] w-[100%] rounded-[0]" component={Link} to={`category/${photo.slug}`}>
          {photo?.name}
        </Button>
      </div>
    </div>
  );
};

export default PopularCategory;
