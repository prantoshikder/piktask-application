"use client";

import React from "react";
import { Link, useHistory } from "@/lib/router";
import { getBaseURL } from "./../../../../helpers/index";

const SearchItem = ({ item, selected }) => {
  const history = useHistory();

  const handleEnterPress = (event) => {
    event.preventDefault();
    if (selected) {
      selected?.forEach((element) => {
        if (event.keyCode === 13 && item?.image_id === selected?.image_id) {
          history.push(
            "/category" +
              encodeURI(
                `/${selected?.category.toLowerCase().trim().replace(/\s/g, "-")}/${selected?.title.toLowerCase().trim().replace(/\s/g, "-")}&id=${
                  selected?.image_id
                }`
              )
          );
        }
      });
    }
  };

  function pikTaskEncodeURI(data) {
    if (data) {
      return (
        "/category" +
        encodeURI(`/${data?.category.toLowerCase().trim().replace(/\s/g, "-")}/${data?.title.toLowerCase().trim().replace(/\s/g, "-")}&id=${data?.image_id}`)
      );
    }
  }

  return (
    <Link to={encodeURI(pikTaskEncodeURI(item))} className="flex items-start no-underline text-[#666] justify-between p-[1rem] [transition:box-shadow_0.3s_linear] hover:shadow-[0_0px_10px_rgb(0_0_0_/_6%)] hover:bg-[#f8f8f8] [&:focus-visible]:[border:1px_solid] [&:focus-visible]:border-[#444] [&:focus-visible]:[outline-offset:1px_solid_#666] [&_h2]:text-[14px] [&_h2]:font-[400]">
      <div className="flex [&_h2]:flex [&_h2]:justify-center [&_h2]:items-center" onKeyPress={handleEnterPress}>
        <div className="w-[60px] h-[100%] mr-[1.2rem] [&_img]:w-[100%]">
          <img src={encodeURI(getBaseURL().bucket_base_url + getBaseURL().images + item?.preview)} alt={item?.title} />
        </div>
        <h2>{item?.title}</h2>
      </div>
    </Link>
  );
};

export default SearchItem;
