"use client";

import { Typography } from "@/components/ui-kit";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "@/lib/router";

const SearchKeyWords = ({ popularKeywords }) => {
  const [popularSearchKeywords, setPopularSearchKeywords] = useState([]);

  useEffect(() => {
    axios
      .get(
        `${process.env.NEXT_PUBLIC_API_URL}/client/search/popular_keyword?limit=10`
      )
      .then(({ data }) => {
        if (data?.status) {
          const popularKeyword = data.keywords.filter((e) => e);
          setPopularSearchKeywords(popularKeyword);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
    <>
      {popularKeywords && (
        <div className="p-[2rem_0rem] w-[100%] flex flex-wrap justify-center [&_a]:no-underline max-[769px]:p-[2rem_3rem] max-[479.95px]:hidden">
          <Typography variant="h5" className="text-[#fff] text-[16px] m-[0px_5px] font-[400] max-[1024px]:mb-[1.5rem] max-[768px]:mb-[1rem] max-[479.95px]:mb-[0.5rem]">
            Popular Search :
          </Typography>
          {Array.isArray(popularSearchKeywords) &&
            popularSearchKeywords?.map((keyWord, index) => (
              <Link
                key={index}
                to={`/tag/${keyWord.toLowerCase().replace(/\s/g, "-")}`}
              >
                <Typography variant="h5" className="text-[#fff] text-[16px] m-[0px_5px] font-[400] max-[1024px]:mb-[1.5rem] max-[768px]:mb-[1rem] max-[479.95px]:mb-[0.5rem]">
                  {keyWord},
                </Typography>
              </Link>
            ))}
        </div>
      )}
    </>
  );
};

export default SearchKeyWords;
