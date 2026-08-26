"use client";

import { Button } from "@/components/ui-kit";
import axios from "axios";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import downArrowIconWhite from "../../../../../assets/icons/downArrowIconWhite.svg";
import SignUpModal from "../../../../../views/Authentication/SignUpModal";

const DownloadButton = ({ productDetails }) => {
  const user = useSelector((state) => state.user);

  const [role, setRole] = useState("");
  const [downloadCount, setDownloadCount] = useState(productDetails?.imageDetails?.user?.images?.total_downloads);
  const [openAuthModal, setOpenAuthModal] = useState(false);
  const [buttonLoading, setButtonLoading] = useState(false);

  //Handle download image
  const handleDownload = (e) => {
    setButtonLoading(true);

    const downloadAPI = {
      url: `${process.env.NEXT_PUBLIC_API_URL}/images/${productDetails?.imageID}/download/`,
      method: "get",
    };

    if (user && user?.isLoggedIn) {
      if (user?.role === "user") {
        downloadAPI.headers = { Authorization: user?.token };
        setButtonLoading(false);
      } else {
        setRole(e.target.closest("button").value);
        setOpenAuthModal(true);
        setButtonLoading(false);
        return;
      }
    }

    axios(downloadAPI)
      .then(({ data }) => {
        if (data?.url) {
          const link = document.createElement("a");
          link.href = data?.url;
          link.setAttribute("download", `${productDetails?.imageDetails?.title.replace(/\s/g, "-")}.${data?.extension}`);
          document.body.appendChild(link);
          link.click();

          setDownloadCount((prevState) => prevState + 1);
          setButtonLoading(false);
        }
      })
      .catch((error) => {
        if (user?.isLoggedIn && user?.role === "contributor") {
          toast.error("Please, login as a user", { autoClose: 2200 });
          setButtonLoading(false);
        } else if (user?.isLoggedIn && user?.role === "user") {
          toast.error(error.response.data.message);
          setButtonLoading(false);
        } else {
          toast.error(error.response.data.message);
          setRole(e.target.closest("button").value);
          setOpenAuthModal(true);
          setButtonLoading(false);
        }
      });
  };

  const intToString = (value) => {
    var suffixes = ["", "k", "m", "b", "t"];
    var suffixNum = Math.floor(("" + value).length / 3);
    var shortValue = parseFloat((suffixNum !== 0 ? value / Math.pow(1000, suffixNum) : value).toPrecision(2));
    if (shortValue % 1 !== 0) {
      shortValue = shortValue.toFixed(1);
    }

    const newValue = suffixes[suffixNum] ? suffixes[suffixNum] : 0;
    return shortValue + newValue;
  };

  return (
    <>
      <div className="relative max-[479.95px]:flex-[1]">
        <Button
          className={buttonLoading ? "text-[#fff] text-[17px] p-[1rem_10rem] mr-[4rem] bg-[#143340] hover:bg-[#143340] [&_img]:mr-[1.5rem] [&_img]:w-[1.2rem] [&:disabled]:text-[#fff] max-[768px]:text-[16px] max-[768px]:p-[0.8rem_9rem] max-[768px]:mr-[2.5rem] max-[479.95px]:text-[16px] max-[479.95px]:p-[0.4rem_5.1rem] max-[479.95px]:mr-[2.5rem]" : "text-[#fff] text-[17px] p-[1rem_10rem] mr-[4rem] bg-[#0088f2] hover:bg-[#143340] [&_img]:mr-[1.5rem] [&_img]:w-[1.2rem] max-[768px]:text-[16px] max-[768px]:p-[0.8rem_9rem] max-[768px]:mr-[2.5rem] max-[479.95px]:w-[100%] max-[479.95px]:text-[16px] max-[479.95px]:p-[0.4rem_6rem] max-[479.95px]:mr-[1.5rem]"}
          onClick={handleDownload}
          value="user"
          disableElevation
          disabled={buttonLoading}
        >
          <img src={downArrowIconWhite.src} alt="Download" width="12px" height="18px" />
          {buttonLoading ? "Downloading..." : "Download"}
        </Button>

        <div className="absolute top-[-15px] right-[25px] text-[#0088f2] text-[1.2rem] p-[.3rem_1.2rem] rounded-[3rem] bg-[#fff] [border:2px_solid_#0088f2] max-[768px]:right-[12px] max-[479.95px]:p-[.2rem_1rem] max-[479.95px]:right-[0]">
          {downloadCount ? intToString(downloadCount) : intToString(productDetails?.imageDetails?.user?.images?.total_downloads)}
        </div>
      </div>
      <SignUpModal openAuthModal={openAuthModal} setOpenAuthModal={setOpenAuthModal} role={role} />
    </>
  );
};

export default DownloadButton;
