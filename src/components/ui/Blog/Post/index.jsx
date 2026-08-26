"use client";

import { Grid, Typography } from "@/components/ui-kit";
import moment from "moment";
import React from "react";
import { Link } from "@/lib/router";
import { getBaseURL, getWords } from "../../../../helpers";

const Post = ({ post, recentBlog }) => {
  return (
    <>
      {recentBlog ? (
        <div style={{ marginBottom: "2rem", width: "100%" }}>
          <Grid size={{ xs: 12, sm: 12, md: 12 }} className="flex flex-wrap max-[576px]:max-w-[100%] max-[576px]:basis-[100%]">
            <div className="bg-[#fff] group group">
              <div className="relative h-[230px] overflow-hidden [&_img]:[transition:all_0.3s_linear] [&_img]:w-[100%] [&_img]:h-[100%] group-hover:[&_img]:[transform:scale(1.1)_rotate(2deg)] group-hover:[&_img]:[transform:scale(1.1)_rotate(2deg)]">
                <Link to={`/blog/${post?.id}`} className={"content-[\"\"] absolute w-[100%] h-[100%] top-[0] left-[0] z-[1] [transition:all_0.3s_linear]"} />
                <img
                  src={
                    getBaseURL().bucket_base_url +
                    getBaseURL().blog_images +
                    post?.thumbnail
                  }
                  alt={post?.title}
                />
              </div>
              <div className="p-[1.6rem_2.5rem] shadow-[0_1px_2px_0_rgb(0_0_0_/_10%)]">
                <Typography className="text-[1.5rem] font-[700] mb-[0.8rem] [transition:color_0.3s_linear]">
                  {post?.category}
                </Typography>
                <Link to={`/blog/${post?.id}`} className="no-underline">
                  <Typography className="text-[2rem] mb-[0.8rem] [transition:color_0.3s_linear] [&_a:hover]:text-[#0088f2] [&_a:hover]:text-[#0088f2]" variant="h2">
                    {getWords(4, post?.title)}...
                  </Typography>
                </Link>
                {/* <Typography className="text-[2rem] mb-[0.8rem] [transition:color_0.3s_linear]" variant="h2">{getWords(4, post?.title)}...</Typography> */}
                <Typography className="text-[1.3rem] mt-[0.8rem] [transition:color_0.3s_linear]">
                  By {post?.username}{" "}
                  <span>{moment(post?.createdAt).format("LL")}</span>
                </Typography>
              </div>
            </div>
          </Grid>
        </div>
      ) : (
        <Grid size={{ xs: 6, sm: 6, md: 3 }} className="flex flex-wrap max-[576px]:max-w-[100%] max-[576px]:basis-[100%]">
          <div className="bg-[#fff]">
            <div className="relative h-[230px] overflow-hidden [&_img]:[transition:all_0.3s_linear] [&_img]:w-[100%] [&_img]:h-[100%]">
              <Link to={`/blog/${post?.id}`} className={"content-[\"\"] absolute w-[100%] h-[100%] top-[0] left-[0] z-[1] [transition:all_0.3s_linear]"} />
              <img
                src={
                  getBaseURL().bucket_base_url +
                  getBaseURL().blog_images +
                  post?.thumbnail
                }
                alt={post?.title}
              />
            </div>
            <div className="p-[1.6rem_2.5rem] shadow-[0_1px_2px_0_rgb(0_0_0_/_10%)]">
              <Typography className="text-[1.5rem] font-[700] mb-[0.8rem] [transition:color_0.3s_linear]">
                {post?.category}
              </Typography>
              <Link to={`/blog/${post?.id}`} className="no-underline">
                <Typography className="text-[2rem] mb-[0.8rem] [transition:color_0.3s_linear]" variant="h2">
                  {getWords(10, post?.title)}...
                </Typography>
              </Link>
              <Typography className="text-[1.3rem] mt-[0.8rem] [transition:color_0.3s_linear]">
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
