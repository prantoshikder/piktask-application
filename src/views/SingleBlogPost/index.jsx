"use client";

import { Button, Container, FormControl, Grid, TextareaAutosize, Typography } from "@mui/material";
import axios from "axios";
import moment from "moment";
import React, { lazy, Suspense, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "@/lib/router";
import {
  EmailIcon,
  EmailShareButton,
  FacebookIcon,
  FacebookMessengerIcon,
  FacebookMessengerShareButton,
  FacebookShareButton,
  LinkedinIcon,
  LinkedinShareButton,
  TelegramIcon,
  TelegramShareButton,
  TwitterIcon,
  TwitterShareButton,
} from "react-share";
import { toast } from "react-toastify";
import Spacing from "../../components/Spacing";
import Post from "../../components/ui/Blog/Post";
import RelatedBlogs from "../../components/ui/Blog/RelatedBlogs";
import Header from "../../components/ui/Header";
import SectionHeading from "../../components/ui/Heading";
import { getBaseURL, imageObjSchema } from "../../helpers";
import Layout from "../../Layout";
import SignUpModal from "../Authentication/SignUpModal";
import Loader from "./../../components/ui/Loader/index";
import useStyles from "./SinglePost.styles";

const HeroSection = lazy(() => import("../../components/ui/Hero"));
const Footer = lazy(() => import("../../components/ui/Footer"));

const SingleBlogPost = () => {
  const { classes } = useStyles();
  const { id } = useParams();
  const shareUrl = window.location.href;
  const user = useSelector((state) => state.user);
  const [openAuthModal, setOpenAuthModal] = useState(false);

  const [blogDetails, setBlogDetails] = useState([]);
  const [thumbnail, setThumbnail] = useState("");
  const [isLoading, setLoading] = useState(false);

  const [recentBlogsPost, setRecentBlogsPost] = useState([]);

  useEffect(() => {
    setLoading(true);
    const CancelToken = axios.CancelToken;
    const source = CancelToken.source();

    // All Blogs API integration
    axios.get(`${process.env.NEXT_PUBLIC_API_URL}/blogs/${id}`, { cancelToken: source.token }).then(({ data }) => {
      if (data?.status) {
        setBlogDetails(data?.blog);
        setThumbnail(`${getBaseURL().bucket_base_url}${getBaseURL().blog_images}${data?.blog?.thumbnail}`);
        setLoading(false);
      }
    });

    // Recent Blogs API integration
    axios.get(`${process.env.NEXT_PUBLIC_API_URL}/blogs/`).then(({ data }) => {
      if (data?.status) {
        setRecentBlogsPost(data?.blogs);
        setLoading(false);
      }
    });

    return () => source.cancel();
  }, [id]);

  const [comment, setComment] = useState("");

  const handleCommentPost = (e) => {
    e.preventDefault();
    const CancelToken = axios.CancelToken;
    const source = CancelToken.source();

    if (!comment) {
      toast.error("Comment field is required", { autoClose: 2200 });
      return;
    }
    if (!user?.token) {
      setOpenAuthModal(true);
    } else {
      const formData = new FormData();
      formData.append("comment", comment);
      const url = `${process.env.NEXT_PUBLIC_API_URL}/blogs/${id}/blog_comment`;
      axios({
        method: "post",
        url,
        data: formData,
        headers: { cancelToken: source.token, Authorization: user.token },
      })
        .then((res) => {
          if (res?.status) {
            toast.success(res.data.message);
            setComment("");
            setLoading(false);
          }
        })
        .catch((error) => {
          const { errors } = error.response.data;
          for (let key in errors) {
            toast.error(errors[key]);
          }
          setLoading(false);
        });
    }

    return () => source.cancel();
  };

  useEffect(() => {
    const schemaObj = {
      name: document.title,
      contentUrl: document.location.href,
      acquireLicensePage: document.location.href,
      thumbnailUrl: `${process.env.NEXT_PUBLIC_API_URL}/media_images/company/piktak_logo.jpg`,
    };

    imageObjSchema(schemaObj);
  }, []);

  return (
    <Layout
      title={`${blogDetails?.title}`}
      description={`${blogDetails?.description?.split("\n")[0]}`}
      ogImage={thumbnail}
    >
      <Header />

      <Suspense fallback={<Loader />}>
        <HeroSection size="medium" />
      </Suspense>

      <Spacing space={{ height: "5rem" }} />

      <Suspense fallback={<Loader />}>
        <Container>
          <Grid container spacing={3} className={classes.blogContainer}>
            <Grid size={{ xs: 12, sm: 8, md: 8 }} className={classes.blogsItem}>
              <div className={classes.blogImageWrapper}>
                <img src={thumbnail} alt={blogDetails?.category} />
              </div>

              <Spacing space={{ height: "2rem" }} />
              <div className={classes.blogAuthorInfo}>
                <div className={classes.shareSocialMedia}>
                  <div>
                    <Typography style={{ fontWeight: "500", fontSize: "1.8rem" }}>{blogDetails?.category}</Typography>
                  </div>
                  <div style={{ display: "flex" }}>
                    <EmailShareButton url={shareUrl}>
                      <EmailIcon size={25} style={{ margin: "0.4rem" }} round={true} />
                    </EmailShareButton>

                    <FacebookShareButton url={shareUrl}>
                      <FacebookIcon size={25} style={{ margin: "0.4rem" }} round={true} />
                    </FacebookShareButton>

                    <FacebookMessengerShareButton url={shareUrl}>
                      <FacebookMessengerIcon size={25} style={{ margin: "0.4rem" }} round={true} />
                    </FacebookMessengerShareButton>

                    <TwitterShareButton url={shareUrl}>
                      <TwitterIcon size={25} style={{ margin: "0.4rem" }} round={true} />
                    </TwitterShareButton>

                    <LinkedinShareButton url={shareUrl}>
                      <LinkedinIcon size={25} style={{ margin: "0.4rem" }} round={true} />
                    </LinkedinShareButton>

                    <TelegramShareButton url={shareUrl}>
                      <TelegramIcon size={25} style={{ margin: "0.4rem" }} round={true} />
                    </TelegramShareButton>
                  </div>
                </div>
                <Typography variant="h3">{blogDetails?.title}</Typography>
                <Typography>
                  By {blogDetails?.username} <span>{moment(blogDetails?.createdAt).format("LL")}</span>
                </Typography>
              </div>

              <Spacing space={{ height: "3rem" }} />
              <div className={classes.blogContent}>
                <Typography>{blogDetails?.description}</Typography>
              </div>
              <Spacing space={{ height: "3rem" }} />

              <div className={classes.blogImageWrapper}>
                <img src={thumbnail} alt={blogDetails?.category} />
              </div>
              <Spacing space={{ height: "4rem" }} />
              <div className={classes.blogContent}>
                <Typography>{blogDetails?.description}</Typography>
              </div>
              <Spacing space={{ height: "4rem" }} />
              <div className={classes.blogContent}>
                <Typography>{blogDetails?.description}</Typography>
              </div>

              <Spacing space={{ height: "5rem" }} />

              <div>
                <form onSubmit={handleCommentPost}>
                  <FormControl fullWidth className={classes.fieldWrapper}>
                    <label htmlFor="description">Description</label>
                    <TextareaAutosize
                      id="description"
                      autoComplete="off"
                      className={classes.formDescription}
                      aria-label="minimum height"
                      minRows={6}
                      value={comment}
                      onChange={(e) => setComment(e.target.value)}
                    />
                  </FormControl>
                  <Button variant="contained" className={classes.sentBtn} type="submit" disabled={isLoading}>
                    {isLoading ? "Sending..." : "Send"}
                  </Button>
                </form>
              </div>
            </Grid>

            <Grid size={{ xs: 12, sm: 4, md: 4 }} className={classes.blogsItem}>
              <Grid container spacing={0} className={classes.postsWrapper}>
                <SectionHeading title="Recent Blog" large></SectionHeading>
                {recentBlogsPost?.length > 0 && recentBlogsPost?.slice(0, 3).map((post) => <Post recentBlog key={post?.id} post={post} />)}
              </Grid>
            </Grid>
          </Grid>

          <Spacing space={{ height: "5rem" }} />
          <div className={classes.blogContainer}>
            <RelatedBlogs blogID={id} />
          </div>
        </Container>
      </Suspense>

      <Spacing space={{ height: "2rem" }} />

      <SignUpModal openAuthModal={openAuthModal} setOpenAuthModal={setOpenAuthModal} />

      <Suspense fallback={<Loader />}>
        <Footer />
      </Suspense>
    </Layout>
  );
};

export default SingleBlogPost;
