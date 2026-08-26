"use client";

import { Button, Typography } from "@/components/ui-kit";
import { CloudUploadOutlined as CloudUploadIcon } from "@ant-design/icons";
import React from "react";
import { Link } from "@/lib/router";
import NotFoundImage from "../../../assets/banner/uploadFiles.png";

const ProductNotFound = ({ keywords, noCollection, contributorProductNotFound, publishContent, revisionContent, pendingContent, rejectFileContent }) => {
  return (
    <>
      {contributorProductNotFound ? (
        <div className="m-[0_auto] text-center">
          <div>
            <div className="w-[45rem] m-[0_auto] [&_img]:w-[100%] [&_img]:object-cover">
              <img src={NotFoundImage.src} alt="Piktask" />
            </div>

            {publishContent && <Typography variant="h3">There are no files published</Typography>}

            {revisionContent && <Typography variant="h3">No products are in revision</Typography>}

            {pendingContent && <Typography variant="h3">No products are in pending</Typography>}

            {rejectFileContent && <Typography variant="h3">No products are in rejectFile</Typography>}

            <Button className="text-[#fff] font-[400] font-['Roboto',sans-serif] capitalize text-[1.4rem] rounded-[3rem] opacity-[1] leading-[1.75] bg-[#0088f2] p-[0.5rem_1.4rem] [border:2px_solid] mt-[1.5rem] border-[transparent] [transition:all_0.3s_linear] hover:bg-[#0773c5] max-[768.95px]:hidden" component={Link} to="/contributor/upload">
              <CloudUploadIcon className="text-[2rem] mr-[.8rem]" />
              Upload files
            </Button>
          </div>
        </div>
      ) : (
        <div className="text-center w-[100%] p-[37px_0] bg-[white]">
          <div className="w-[100%]">
            <div className="w-[45rem] m-[0_auto] [&_img]:w-[100%] [&_img]:object-cover">
              <img src={NotFoundImage.src} alt="Piktask" />
            </div>
            <div>
              <Typography className="text-[2rem] font-[500]" variant="body1">
                {keywords ? `Sorry, did not find "${keywords}".` : <>{noCollection ? `Sorry, did not find the "${noCollection}".` : `Sorry, did not find.`}</>}
              </Typography>

              <Typography className="m-[2px] text-[1.5rem] [&_span]:text-[red]" variant="body1">
                You can <span>simplify</span>,<span>shorten</span>, or <span>reduce your filter criteria</span>.Or switch the language site and search again
              </Typography>

              <Button className="text-[#fff] font-[500] font-['Roboto',sans-serif] capitalize text-[1.5rem] rounded-[3rem] opacity-[1] leading-[1.75] bg-[#0088f2] m-[7px] p-[0.5rem_2.2rem] [transition:all_0.5s_linear] hover:border-[#0773c5] hover:bg-[#0773c5]" component={Link} to="/">
                Go Home
              </Button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ProductNotFound;
