"use client";

import { Typography } from "@/components/ui-kit";
import { UserOutlined as AccountCircleIcon } from "@ant-design/icons";
import React from "react";
import { Link } from "@/lib/router";
import coverImage from "../../../../assets/banner/sellerCoverPhoto.jpg";

const SellerInfo = ({ photo }) => {
  return (
    <div className="flex flex-col justify-center relative w-[100%] bg-[#fff]">
      <div>
        <Link to={`/${photo.username}`}>
          <div>
            <div>
              {photo?.avatar ? (
                <img
                  className="cursor-pointer w-[100%] h-[200px] object-cover"
                  src={photo?.avatar}
                  alt={`${photo?.username}`}
                />
              ) : (
                <img
                  className="cursor-pointer w-[100%] h-[200px] object-cover"
                  src={coverImage.src}
                  alt="Author images"
                />
              )}
            </div>

            <div className="h-[9rem] w-[9rem] m-[0_auto] mt-[-5rem]">
              {photo?.avatar ? (
                <img
                  className="rounded-[100%] p-[0.4rem] bg-[#fff] cursor-pointer w-[100%] h-[100%] object-cover text-[#000]"
                  src={photo?.avatar}
                  alt={`${photo?.username}`}
                />
              ) : (
                <AccountCircleIcon className="rounded-[100%] p-[0.4rem] bg-[#fff] cursor-pointer w-[100%] h-[100%] object-cover text-[#000]" />
              )}
            </div>
          </div>
        </Link>

        <div className="text-center p-[1.5rem_1rem] shadow-[0_1px_2px_0_rgb(0_0_0_/_10%)] [&_h2]:text-[#001c30] [&_h2]:text-[2rem] [&_h2]:font-[700]">
          <Typography variant="h2">{photo?.username}</Typography>
          {/* <Typography>Resources: {photo?.total_images}</Typography> */}
          <div className="flex justify-center items-center mb-[.4rem] m-[0_auto]">
            <Typography className={"text-[#9b979f] text-[1.3rem] mr-[2rem] pr-[2rem] relative before:content-[\"\"] before:absolute before:bg-[#ddd] before:w-[.16rem] before:h-[3.5rem] before:top-[0.5rem] before:right-[0] [&:last-child:before]:bg-[transparent] [&:last-child:before]:w-[0] [&_span]:text-[1.6rem] [&_span]:block [&_span]:font-[700] [&_span]:text-[#1b3f4e] last:mr-[0rem] last:pr-[0rem] max-[576px]:mr-[1.5rem] max-[576px]:pr-[1.5rem]"} variant="body2">
              Resources
              <span>{photo?.total_images}</span>
            </Typography>
            <Typography className={"text-[#9b979f] text-[1.3rem] mr-[2rem] pr-[2rem] relative before:content-[\"\"] before:absolute before:bg-[#ddd] before:w-[.16rem] before:h-[3.5rem] before:top-[0.5rem] before:right-[0] [&:last-child:before]:bg-[transparent] [&:last-child:before]:w-[0] [&_span]:text-[1.6rem] [&_span]:block [&_span]:font-[700] [&_span]:text-[#1b3f4e] last:mr-[0rem] last:pr-[0rem] max-[576px]:mr-[1.5rem] max-[576px]:pr-[1.5rem]"} variant="body2">
              Followers
              <span>{photo?.total_followers}</span>
            </Typography>
            <Typography className={"text-[#9b979f] text-[1.3rem] mr-[2rem] pr-[2rem] relative before:content-[\"\"] before:absolute before:bg-[#ddd] before:w-[.16rem] before:h-[3.5rem] before:top-[0.5rem] before:right-[0] [&:last-child:before]:bg-[transparent] [&:last-child:before]:w-[0] [&_span]:text-[1.6rem] [&_span]:block [&_span]:font-[700] [&_span]:text-[#1b3f4e] last:mr-[0rem] last:pr-[0rem] max-[576px]:mr-[1.5rem] max-[576px]:pr-[1.5rem]"} variant="body2">
              Downloads
              <span>{photo?.total_downloads}</span>
            </Typography>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SellerInfo;
