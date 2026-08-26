"use client";

import { Button, Container, Grid, Typography } from "@mui/material";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "@/lib/router";
import useStyles from "./Blog.styles";
import Post from "./Post";

const Blog = () => {
  const { classes } = useStyles();

  const [blogsPost, setBlogsPost] = useState([]);
  const [isLoading, setLoading] = useState(true);

  useEffect(() => {
    const CancelToken = axios.CancelToken;
    const source = CancelToken.source();

    axios.get(`${process.env.NEXT_PUBLIC_API_URL}/blogs/`, { cancelToken: source.token }).then(({ data }) => {
      if (data?.status) {
        setBlogsPost(data?.blogs);
        setLoading(false);
      }
    });

    return () => source.cancel();
  }, []);

  return (
    <div className={classes.wrapper}>
      <Container>
        <Grid container className={classes.headingWrapepr}>
          <Typography className={classes.heading} variant="h2">
            Piktask Guideline
          </Typography>
          <Typography className={classes.subheading} variant="subtitle1">
            Tens of millions of designers are using png tree
          </Typography>
        </Grid>

        <Grid container spacing={2} className={classes.postsWrapper}>
          {blogsPost?.length > 0 && blogsPost?.slice(0, 4).map((post) => <Post key={post?.id} post={post} />)}
        </Grid>
        <div className={classes.seeMoreButton}>
          <Button to="/allBlogs/blogs" component={Link} className={classes.moreButton}>
            See More
          </Button>
        </div>
      </Container>
    </div>
  );
};

export default Blog;
