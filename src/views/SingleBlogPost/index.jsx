"use client";

import { Button, Container, FormControl, Grid, TextareaAutosize, Typography } from "@/components/ui-kit";
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
import { useCurrentUrl } from "@/lib/browser";
import Layout from "../../Layout";
import SignUpModal from "../Authentication/SignUpModal";
import Loader from "./../../components/ui/Loader/index";

const HeroSection = lazy(() => import("../../components/ui/Hero"));
const Footer = lazy(() => import("../../components/ui/Footer"));

const SingleBlogPost = () => {
  const { id } = useParams();
  const shareUrl = useCurrentUrl();
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
          <Grid container spacing={3} className="p-[0rem_15rem] max-[769px]:p-[0rem_2rem] max-[576px]:p-[0rem_0rem]">
            <Grid size={{ xs: 12, sm: 8, md: 8 }} className="max-[576px]:max-w-[100%] max-[576px]:basis-[100%]">
              <div className="h-[400px] shadow-[0px_0px_10px_#ddd] [&_img]:h-[100%] [&_img]:w-[100%] [&_img]:object-cover">
                <img src={thumbnail} alt={blogDetails?.category} />
              </div>

              <Spacing space={{ height: "2rem" }} />
              <div className="text-[#000] [&_h3]:leading-[4rem] [&_h3]:text-[3rem] [&_p]:leading-[3rem]">
                <div className="flex justify-between">
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
              <div className="[&_p]:leading-[3rem]">
                <Typography>{blogDetails?.description}</Typography>
              </div>
              <Spacing space={{ height: "3rem" }} />

              <div className="h-[400px] shadow-[0px_0px_10px_#ddd] [&_img]:h-[100%] [&_img]:w-[100%] [&_img]:object-cover">
                <img src={thumbnail} alt={blogDetails?.category} />
              </div>
              <Spacing space={{ height: "4rem" }} />
              <div className="[&_p]:leading-[3rem]">
                <Typography>{blogDetails?.description}</Typography>
              </div>
              <Spacing space={{ height: "4rem" }} />
              <div className="[&_p]:leading-[3rem]">
                <Typography>{blogDetails?.description}</Typography>
              </div>

              <Spacing space={{ height: "5rem" }} />

              <div>
                <form onSubmit={handleCommentPost}>
                  <FormControl fullWidth className="mb-[1.4rem] [&_label]:mb-[0.5rem] [&_label>span]:text-[red]">
                    <label htmlFor="description">Description</label>
                    <TextareaAutosize
                      id="description"
                      autoComplete="off"
                      className="relative w-[100%] max-w-[100%] text-[1.5rem] p-[1rem] rounded-[5px] shadow-[0_8px_12px_3px_rgb(0_0_0_/_6%)] border-[#ddd]"
                      aria-label="minimum height"
                      minRows={6}
                      value={comment}
                      onChange={(e) => setComment(e.target.value)}
                    />
                  </FormControl>
                  <Button variant="contained" className="p-[0.8rem_3.5rem] [border:none] rounded-[10rem] text-[1.4rem] cursor-pointer bg-[#0088f2] text-[white] [transition:all_0.3s_linear] hover:bg-[#0773c5] max-[479.95px]:w-[100%] max-[479.95px]:ml-[0%] max-[479.95px]:text-[14px] max-[479.95px]:p-[1rem_0.9rem] max-[479.95px]:[transform:translateX(0%)]" type="submit" disabled={isLoading}>
                    {isLoading ? "Sending..." : "Send"}
                  </Button>
                </form>
              </div>
            </Grid>

            <Grid size={{ xs: 12, sm: 4, md: 4 }} className="max-[576px]:max-w-[100%] max-[576px]:basis-[100%]">
              <Grid container spacing={0} className="mb-[2rem] flex justify-center flex-wrap [@media(max-width:768)]:justify-start">
                <SectionHeading title="Recent Blog" large></SectionHeading>
                {recentBlogsPost?.length > 0 && recentBlogsPost?.slice(0, 3).map((post) => <Post recentBlog key={post?.id} post={post} />)}
              </Grid>
            </Grid>
          </Grid>

          <Spacing space={{ height: "5rem" }} />
          <div className="p-[0rem_15rem] max-[769px]:p-[0rem_2rem] max-[576px]:p-[0rem_0rem]">
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
