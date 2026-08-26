"use client";

import { Typography } from "@mui/material";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "@/lib/router";
import useStyles from "./SearchKeyWords.styles";

const SearchKeyWords = ({ popularKeywords }) => {
  const { classes } = useStyles();
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
        <div className={classes.popularSearch}>
          <Typography variant="h5" className={classes.searchTitle}>
            Popular Search :
          </Typography>
          {Array.isArray(popularSearchKeywords) &&
            popularSearchKeywords?.map((keyWord, index) => (
              <Link
                key={index}
                to={`/tag/${keyWord.toLowerCase().replace(/\s/g, "-")}`}
              >
                <Typography variant="h5" className={classes.searchTitle}>
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
