"use client";

import { Button, Container, Grid, Typography } from "@/components/ui-kit";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "@/lib/router";
import Post from "./Post";

const Blog = () => {
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
    <div className="bg-[#f3f3f3] p-[3rem_0rem]">
      <Container>
        <Grid container className="flex justify-center flex-col items-center mb-[3rem]">
          <Typography className="text-[#001c30] text-[3rem] mb-[.5rem]" variant="h2">
            Piktask Guideline
          </Typography>
          <Typography className="text-[#001c30] text-[1.8rem]" variant="subtitle1">
            Tens of millions of designers are using png tree
          </Typography>
        </Grid>

        <Grid container spacing={2} className="mb-[2rem] flex justify-center flex-wrap [@media(max-width:768)]:justify-start">
          {blogsPost?.length > 0 && blogsPost?.slice(0, 4).map((post) => <Post key={post?.id} post={post} />)}
        </Grid>
        <div className="text-center">
          <Button to="/allBlogs/blogs" component={Link} className="text-[#fff] font-[400] font-['Roboto',sans-serif] capitalize text-[1.3rem] rounded-[3rem] opacity-[1] leading-[1.75] bg-[#0088f2] p-[0.5rem_2.5rem] [border:0.2rem_solid_transparent] [transition:all_0.3s_linear] hover:bg-[#0773c5] hover:border-[#0773c5]">
            See More
          </Button>
        </div>
      </Container>
    </div>
  );
};

export default Blog;
