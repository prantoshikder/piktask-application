"use client";

import { Button, Container, Grid, Typography } from "@/components/ui-kit";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "@/lib/router";

const PopularKeyWords = () => {
  const [isLoading, setLoading] = useState(true);
  const [popularSearchKeywords, setPopularSearchKeywords] = useState([]);

  useEffect(() => {
    axios
      .get(
        `${process.env.NEXT_PUBLIC_API_URL}/client/search/popular_keyword?limit=30`
      )
      .then(({ data }) => {
        if (data?.status) {
          const popularSearch = data?.keywords;
          setPopularSearchKeywords(popularSearch.filter((e) => e));
        }
      })
      .catch((error) => {
        console.log("Popular search keywords", error);
        setLoading(false);
      });
  }, []);

  return (
    <>
      <div>
        <Container>
          <Grid container>
            <Grid className="flex flex-wrap mt-[4.5rem] mb-[2.8rem]">
              <Typography className="text-[2.2rem] mr-[2rem] max-[1279.95px]:block max-[959.95px]:w-[100%] max-[959.95px]:mb-[1.5rem]" variant="h3">
                Popular Search:
              </Typography>
              {popularSearchKeywords?.map((tag, index) => (
                <Button
                  className="text-[#143340] font-[400] font-['Roboto',sans-serif] capitalize text-[1.4rem] rounded-[3rem] opacity-[1] leading-[1.75] mb-[1.5rem] bg-[#F8F8F8] [border:1px_solid_rgb(150_164_173_/_54%)] p-[0.4rem_2rem] no-underline [&:not(last-child)]:mr-[1rem] hover:no-underline max-[959.95px]:mb-[1rem] max-[959.95px]:w-[auto] max-[959.95px]:text-[1.4rem]"
                  key={index}
                  tag={tag}
                  component={Link}
                  to={`/tag/${tag}`}
                >
                  {tag}
                </Button>
              ))}
            </Grid>
          </Grid>
        </Container>
      </div>
    </>
  );
};

export default PopularKeyWords;
