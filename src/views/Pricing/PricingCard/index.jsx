"use client";

import { Button, Typography } from "@/components/ui-kit";
import { CheckCircleFilled as CheckCircleIcon } from "@ant-design/icons";
import React from "react";

const PricingCard = ({ pricePlan }) => {
  return (
    <div className="p-[2rem] rounded-[15px] shadow-[0px_0px_10px_#ddd] [transition:all_0.3s_linear] hover:[transform:translateY(-7px)]">
      <div className="w-[20rem] m-[0_auto] min-h-[200px] [&_img]:h-[100%] [&_img]:w-[100%] [&_img]:object-cover">
        <img src={pricePlan?.image} alt={pricePlan?.title} width="200px" height="148px" />
      </div>
      <div className="text-center">
        <Typography variant="h1">${pricePlan?.price}</Typography>
        <Typography variant="h2">{pricePlan?.title}</Typography>
      </div>

      <div className="p-[3rem_2rem_1rem] text-center [&_p]:text-[1.6rem] [&_p]:leading-[3rem] [&_svg]:text-[1.6rem] [&_svg]:mb-[-0.2rem] [&_svg]:mr-[1rem] [&_svg]:text-[#0088f2]">
        <Typography>
          <CheckCircleIcon /> Lorem ipsum dolor sit amet.
        </Typography>
        <Typography>
          <CheckCircleIcon /> Lorem ipsum dolor sit amet.
        </Typography>
        <Typography>
          <CheckCircleIcon /> Lorem ipsum dolor sit amet.
        </Typography>
        <Typography>
          <CheckCircleIcon /> Lorem ipsum dolor sit amet.
        </Typography>
        <Typography>
          <CheckCircleIcon /> Lorem ipsum dolor sit amet.
        </Typography>

        <div className="text-center">
          <Button className="p-[0.5rem_6rem] bg-[#0088f2] text-[#fff] mt-[2.5rem] [border:.2rem_solid] border-[#0088f2] [transition:all_0.3s_linear] hover:bg-[#0773c5] hover:border-[#0773c5] hover:text-[#fff]">View Plan</Button>
        </div>
      </div>
    </div>
  );
};

export default PricingCard;
