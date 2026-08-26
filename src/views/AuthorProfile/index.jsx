"use client";

import { Button, CircularProgress, Container, Grid, Typography } from "@mui/material";
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
import { getBaseURL, imageObjSchema } from "../../helpers";
import Layout from "../../Layout";
import SignUpModal from "../Authentication/SignUpModal";
import Loader from "./../../components/ui/Loader/index";
import useStyles from "./AuthorProfile.styles";

const AuthorItems = lazy(() => import("../../components/ui/AuthorItems"));
const CallToAction = lazy(() => import("../../components/ui/CallToAction"));
const Footer = lazy(() => import("../../components/ui/Footer"));

const AuthorProfile = () => {
  const { classes } = useStyles();
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
          setThumbnail(getBaseURL().bucket_base_url + "/" + data?.profile?.avatar);
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

      <div className={classes.authorHero} style={{ backgroundImage: `url(${heroBanner})` }}>
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
                <Grid container className={classes.profileWrapper}>
                  <div className={classes.authorImg}>
                    {profileInfo?.avatar ? (
                      <img src={getBaseURL().bucket_base_url + "/" + profileInfo?.avatar} alt={profileInfo?.username} width="90px" height="90px" />
                    ) : (
                      <img src={authorImg} alt={profileInfo?.username} width="90px" height="90px" />
                    )}
                  </div>

                  <div className={classes.authorInfo}>
                    <Typography className={classes.authorName} variant="h3">
                      {profileInfo?.username}
                    </Typography>

                    <div className={classes.resourceDetails}>
                      <Typography className={classes.infoItem} variant="body2">
                        Resources
                        <span>{profileInfo?.total_images}</span>
                      </Typography>

                      <Typography className={classes.infoItem} variant="body2">
                        Followers
                        <span>{profileInfo?.total_followers}</span>
                      </Typography>

                      <Typography className={classes.infoItem} variant="body2">
                        Downloads
                        <span>{profileInfo?.total_downloads}</span>
                      </Typography>

                      {user?.id !== profileInfo?.id && (
                        <div>
                          <Button className={classes.followBtn} onClick={handleFollower} value="user">
                            {!isFollowing ? <>Follow</> : <>Following</>}
                          </Button>
                        </div>
                      )}
                    </div>

                    <div className={classes.authorSocials}>
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
