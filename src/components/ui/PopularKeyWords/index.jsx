"use client";

import { Button, Container, Grid, Typography } from "@mui/material";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "@/lib/router";
import useStyles from "./PopularKeyWords.style";

const PopularKeyWords = () => {
  const { classes } = useStyles();
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
      <div className={classes.tagWrapper}>
        <Container>
          <Grid container>
            <Grid className={classes.tagsContainer}>
              <Typography className={classes.tagTitle} variant="h3">
                Popular Search:
              </Typography>
              {popularSearchKeywords?.map((tag, index) => (
                <Button
                  className={classes.tagButton}
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
