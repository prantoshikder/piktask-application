"use client";

import { PinterestOutlined as PinterestIcon } from "@ant-design/icons";
import React from "react";
import { PinterestShareButton } from "react-share";
import { getBaseURL } from "../../../../../helpers";



const SaveButton = ({ location, productDetails }) => {
  return (
    <PinterestShareButton url={location} media={encodeURI(`${getBaseURL().bucket_base_url}${getBaseURL().images}${productDetails?.imageDetails?.preview}`)}>
      <div className="text-[1.5rem] p-[0.8rem_2rem] bg-[#a70000] text-[#fff] font-[500] [border:1px_solid_#a70000] rounded-[20px] ml-[1.5rem] [&_svg]:text-[2rem] [&_svg]:mb-[-0.5rem] [&_svg]:mr-[0.5rem] min-[1279px]:ml-[.8rem] max-[479.95px]:p-[.6rem_1.2rem] max-[479.95px]:text-[1.1rem] max-[479.95px]:mb-[0rem] max-[479.95px]:ml-[1rem]">
        {/* <PinterestIcon size={20} round={true} /> */}
        <PinterestIcon />
        Save
      </div>
    </PinterestShareButton>
  );
};

export default SaveButton;
