"use client";

import { Button, CircularProgress, Container, Grid, Typography } from "@/components/ui-kit";
import axios from "axios";
import React, { lazy, Suspense, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "@/lib/router";
import { toast } from "react-toastify";
import authorImg from "../../assets/author.png";
import heroBanner from "../../assets/banner/hero-banner.jpg";
import behanceIcon from "../../assets/icons/behance.svg";
import dribbbleIcon from "../../assets/icons/dribble.svg";
import facebookIcon from "../../assets/icons/facebook.svg";
import instagramIcon from "../../assets/icons/instagram.svg";
import linkedInIcon from "../../assets/icons/linkdin.svg";
import pinterestIcon from "../../assets/icons/pintarest.svg";
import shutterstockIcon from "../../assets/icons/shutterstock.svg";
import twitterIcon from "../../assets/icons/twitter.svg";
import Spacing from "../../components/Spacing";
import Header from "../../components/ui/Header";
import SocialShare from "../../components/ui/SocialShare";
import { getBaseURL, imageObjSchema, joinImageUrl } from "../../helpers";
import Layout from "../../Layout";
import SignUpModal from "../Authentication/SignUpModal";
import Loader from "./../../components/ui/Loader/index";

const AuthorItems = lazy(() => import("../../components/ui/AuthorItems"));
const CallToAction = lazy(() => import("../../components/ui/CallToAction"));
const Footer = lazy(() => import("../../components/ui/Footer"));

const AuthorProfile = () => {
  const { username } = useParams();
  const user = useSelector((state) => state.user);

  const [openAuthModal, setOpenAuthModal] = useState(false);
  const [imageSummery, setImageSummery] = useState([]);
  const [isFollowing, setFollowing] = useState(false);
  const [profileInfo, setProfileInfo] = useState({});
  const [isLoading, setLoading] = useState(true);
  const [role, setRole] = useState("");
  const [thumbnail, setThumbnail] = useState("");

  useEffect(() => {
    const CancelToken = axios.CancelToken;
    const source = CancelToken.source();

    axios
      .get(`${process.env.NEXT_PUBLIC_API_URL}/contributor/${username}/statistics`, { cancelToken: source.token })
      .then(({ data }) => {
        if (data?.status) {
          setProfileInfo(data?.profile);
          setThumbnail(joinImageUrl(getBaseURL().bucket_base_url + "/", data?.profile?.avatar));
          setImageSummery(data?.images_summary);
          setLoading(false);

          if (user && user?.isLoggedIn && user?.role === "user") {
            axios
              .get(`${process.env.NEXT_PUBLIC_API_URL}/contributor/follow_status/${data.profile.id}`, { headers: { Authorization: user?.token } })
              .then((response) => {
                if (response.data.status) {
                  setFollowing(true);
                  setLoading(false);
                } else {
                  setFollowing(false);
                  setLoading(false);
                }
              });
          }
        }
      })
      .catch((error) => {
        console.log("statistics", error);
        setLoading(false);
      });

    return () => source.cancel();
  }, [username, user]);

  const handleJoinUsButton = () => {
    if (!user.token) {
      setOpenAuthModal(true);
    }
  };

  const handleFollower = (e) => {
    const CancelToken = axios.CancelToken;
    const source = CancelToken.source();

    if (!user?.isLoggedIn) {
      setRole(e.target.closest("button").value);
      setOpenAuthModal(true);
    } else if (user?.isLoggedIn && user?.role === "user") {
      axios
        .post(
          `${process.env.NEXT_PUBLIC_API_URL}/contributor/followers/${profileInfo?.id}`,
          {},
          { cancelToken: source.token, headers: { Authorization: user?.token } }
        )
        .then((response) => {
          if (response?.status === 200) {
            setFollowing(!isFollowing);
          }
        })
        .catch((error) => console.log("Followers error: ", error));
    } else {
      if (user?.isLoggedIn && user?.role === "contributor") {
        toast.error("Please, login as a user", { autoClose: 2200 });
        setOpenAuthModal(true);
      } else {
        toast.error("You can't follow yourself", { autoClose: 2000 });
      }
    }

    return () => source.cancel();
  };

  const socialMedia = [
    {
      socialUrl: profileInfo?.facebook,
      socialIcon: facebookIcon,
    },
    {
      socialUrl: profileInfo?.behance,
      socialIcon: behanceIcon,
    },
    {
      socialUrl: profileInfo?.dribbble,
      socialIcon: dribbbleIcon,
    },
    {
      socialUrl: profileInfo?.instagram,
      socialIcon: instagramIcon,
    },
    {
      socialUrl: profileInfo?.linkedin,
      socialIcon: linkedInIcon,
    },
    {
      socialUrl: profileInfo?.pinterest,
      socialIcon: pinterestIcon,
    },
    {
      socialUrl: profileInfo?.shutterstock,
      socialIcon: shutterstockIcon,
    },
    {
      socialUrl: profileInfo?.twitter,
      socialIcon: twitterIcon,
    },
  ];

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
      title={`${profileInfo?.username}`}
      description={`Discover millions of free Vectors, Photos &amp; PSD files from ${profileInfo?.username} - Free Graphic Resources for personal and commercial use`}
      ogImage={thumbnail}
    >
      <Header />

      <div className={"[background-position:center_center] bg-cover bg-no-repeat flex items-center relative p-[3rem_0] before:content-[\"\"] before:absolute before:bg-[rgba(0,0,0,0.5)] before:opacity-[0.95] before:top-[0] before:left-[0] before:w-[100%] before:h-[100%]"} style={{ backgroundImage: `url(${heroBanner.src})` }}>
        <Container>
          {isLoading ? (
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                margin: "0 auto",
                height: 300,
              }}
            >
              <CircularProgress color="primary" />
            </div>
          ) : (
            <>
              {profileInfo ? (
                <Grid container className="items-center justify-center relative max-[595px]:flex-col">
                  <div className="mr-[3rem] h-[9rem] w-[9rem] [&_img]:w-[100%] [&_img]:rounded-[100%] [&_img]:p-[0.4rem] [&_img]:bg-[#707070] max-[595px]:w-[7rem] max-[595px]:h-[7rem] max-[595px]:mt-[2rem] max-[595px]:mb-[2rem] max-[595px]:mr-[0] max-[595px]:[&_img]:p-[0.4rem]">
                    {profileInfo?.avatar ? (
                      <img src={joinImageUrl(getBaseURL().bucket_base_url + "/", profileInfo?.avatar)} alt={profileInfo?.username} width="90px" height="90px" />
                    ) : (
                      <img src={authorImg.src} alt={profileInfo?.username} width="90px" height="90px" />
                    )}
                  </div>

                  <div className="text-[#fff] max-[595px]:w-[auto] max-[595px]:text-center max-[595px]:items-center max-[595px]:flex max-[595px]:flex-col max-[595px]:justify-center">
                    <Typography className="text-[#fff] text-[2rem] mb-[.8rem] mt-[2rem] max-[479.95px]:mt-[0]" variant="h3">
                      {profileInfo?.username}
                    </Typography>

                    <div className="flex items-center mb-[.4rem]">
                      <Typography className={"text-[1.4rem] mr-[2.5rem] pr-[2.5rem] relative before:content-[\"\"] before:absolute before:bg-[white] before:w-[.16rem] before:h-[3.5rem] before:top-[0.5rem] before:right-[0] [&:last-child:before]:bg-[transparent] [&:last-child:before]:w-[0] [&_span]:text-[1.8rem] [&_span]:block [&_span]:font-[700] max-[576px]:mr-[1.5rem] max-[576px]:pr-[1.5rem]"} variant="body2">
                        Resources
                        <span>{profileInfo?.total_images}</span>
                      </Typography>

                      <Typography className={"text-[1.4rem] mr-[2.5rem] pr-[2.5rem] relative before:content-[\"\"] before:absolute before:bg-[white] before:w-[.16rem] before:h-[3.5rem] before:top-[0.5rem] before:right-[0] [&:last-child:before]:bg-[transparent] [&:last-child:before]:w-[0] [&_span]:text-[1.8rem] [&_span]:block [&_span]:font-[700] max-[576px]:mr-[1.5rem] max-[576px]:pr-[1.5rem]"} variant="body2">
                        Followers
                        <span>{profileInfo?.total_followers}</span>
                      </Typography>

                      <Typography className={"text-[1.4rem] mr-[2.5rem] pr-[2.5rem] relative before:content-[\"\"] before:absolute before:bg-[white] before:w-[.16rem] before:h-[3.5rem] before:top-[0.5rem] before:right-[0] [&:last-child:before]:bg-[transparent] [&:last-child:before]:w-[0] [&_span]:text-[1.8rem] [&_span]:block [&_span]:font-[700] max-[576px]:mr-[1.5rem] max-[576px]:pr-[1.5rem]"} variant="body2">
                        Downloads
                        <span>{profileInfo?.total_downloads}</span>
                      </Typography>

                      {user?.id !== profileInfo?.id && (
                        <div>
                          <Button className="text-[#fff] font-[400] font-['Roboto',sans-serif] capitalize text-[1.3rem] rounded-[3rem] opacity-[1] leading-[1.75] [border:.2rem_solid] border-[#fff] p-[0.3rem_2rem] mr-[1.5rem] hover:bg-[#0088f2] hover:border-[#0088f2] max-[1099.95px]:w-[11rem] max-[1099.95px]:text-[1.1rem] max-[1099.95px]:mr-[0] max-[1099.95px]:pl-[0.7rem] max-[1099.95px]:pr-[0.7rem]" onClick={handleFollower} value="user">
                            {!isFollowing ? <>Follow</> : <>Following</>}
                          </Button>
                        </div>
                      )}
                    </div>

                    <div className="flex items-center [&_p]:text-[#fff]">
                      {socialMedia?.length > 0 && <Typography>Follow me: </Typography>}
                      <SocialShare title="Follow this author:" socials={socialMedia} />
                    </div>
                  </div>
                </Grid>
              ) : (
                <div
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    margin: "0 auto",
                    height: 300,
                  }}
                >
                  <CircularProgress color="primary" />
                </div>
              )}
            </>
          )}
        </Container>
      </div>

      <Suspense fallback={<Loader />}>
        <AuthorItems userId={profileInfo.id} imageSummery={imageSummery} />
      </Suspense>

      <Spacing space={{ height: "4rem" }} />

      <Suspense fallback={<Loader />}>
        {!user?.isLoggedIn ? (
          <CallToAction
            title="Join Piktask team"
            subtitle="Upload your first copyrighted design. Get $5 designer coupon packs"
            buttonText="Join Us"
            buttonClicked={() => handleJoinUsButton()}
          />
        ) : (
          <CallToAction
            title="Go Premium"
            subtitle="Upload your first copyrighted design. Get $5 designer coupon packs"
            buttonLink="/subscription"
            buttonText="See Plans"
          />
        )}
      </Suspense>

      {/* Sign up modal section*/}
      <SignUpModal openAuthModal={openAuthModal} setOpenAuthModal={setOpenAuthModal} role={role} />

      <Suspense fallback={<Loader />}>
        <Footer />
      </Suspense>
    </Layout>
  );
};

export default AuthorProfile;
