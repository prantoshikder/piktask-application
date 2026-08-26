"use client";

import { Grid, Typography } from "@mui/material";
import moment from "moment";
import React from "react";
import { Link } from "@/lib/router";
import { getBaseURL, getWords } from "../../../../helpers";
import useStyles from "./Post.styles";

const Post = ({ post, recentBlog }) => {
  const { classes } = useStyles();

  return (
    <>
      {recentBlog ? (
        <div style={{ marginBottom: "2rem", width: "100%" }}>
          <Grid size={{ xs: 12, sm: 12, md: 12 }} className={classes.root}>
            <div className={classes.postWrapper}>
              <div className={classes.imageWrapper}>
                <Link to={`/blog/${post?.id}`} className={classes.singlePost} />
                <img
                  src={
                    getBaseURL().bucket_base_url +
                    getBaseURL().blog_images +
                    post?.thumbnail
                  }
                  alt={post?.title}
                />
              </div>
              <div className={classes.contentWrapper}>
                <Typography className={classes.title}>
                  {post?.category}
                </Typography>
                <Link to={`/blog/${post?.id}`} className={classes.titleLink}>
                  <Typography className={classes.description} variant="h2">
                    {getWords(4, post?.title)}...
                  </Typography>
                </Link>
                {/* <Typography className={classes.description} variant="h2">{getWords(4, post?.title)}...</Typography> */}
                <Typography className={classes.authorInfo}>
                  By {post?.username}{" "}
                  <span>{moment(post?.createdAt).format("LL")}</span>
                </Typography>
              </div>
            </div>
          </Grid>
        </div>
      ) : (
        <Grid size={{ xs: 6, sm: 6, md: 3 }} className={classes.root}>
          <div className={classes.postWrapper}>
            <div className={classes.imageWrapper}>
              <Link to={`/blog/${post?.id}`} className={classes.singlePost} />
              <img
                src={
                  getBaseURL().bucket_base_url +
                  getBaseURL().blog_images +
                  post?.thumbnail
                }
                alt={post?.title}
              />
            </div>
            <div className={classes.contentWrapper}>
              <Typography className={classes.title}>
                {post?.category}
              </Typography>
              <Link to={`/blog/${post?.id}`} className={classes.titleLink}>
                <Typography className={classes.description} variant="h2">
                  {getWords(10, post?.title)}...
                </Typography>
              </Link>
              <Typography className={classes.authorInfo}>
                By {post?.username}{" "}
                <span>{moment(post?.createdAt).format("LL")}</span>
              </Typography>
            </div>
          </div>
        </Grid>
      )}
    </>
  );
};

export default Post;
