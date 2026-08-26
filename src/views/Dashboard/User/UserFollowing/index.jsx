"use client";

import { Button, Card, CardContent, Container, Grid, Typography } from "@mui/material";
import axios from "axios";
import React, { lazy, Suspense, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useLocation } from "@/lib/router";
import { Link } from "@/lib/router";
import authorImg from "../../../../assets/user/userProfile.jpg";
import Spacing from "../../../../components/Spacing";
import Header from "../../../../components/ui/Header";
import SectionHeading from "../../../../components/ui/Heading";
import Loader from "../../../../components/ui/Loader";
import Pagination from "../../../../components/ui/Pagination";
import ProductNotFound from "../../../../components/ui/ProductNotFound";
import { expiredLoginTime, getBaseURL, imageObjSchema } from "../../../../helpers";
import Layout from "../../../../Layout";
import useStyles from "./UserFollowing.style";

const UserSideBar = lazy(() => import("../../../../components/ui/dashboard/user/UserSideBar"));
const Footer = lazy(() => import("../../../../components/ui/Footer"));

const UserFollowing = () => {
  const { classes } = useStyles();
  const user = useSelector((state) => state.user);
  const location = useLocation();
  const locationPath = location.pathname;

  const [followersItem, setFollowersItem] = useState([]);
  const [isLoading, setLoading] = useState(true);
  const [pageCount, setPageCount] = useState(1);
  const [totalProduct, setTotalProduct] = useState();
  let limit = 5;
  const count = Math.ceil(totalProduct / limit);

  useEffect(() => {
    setLoading(true);
    const CancelToken = axios.CancelToken;
    const source = CancelToken.source();

    if (user?.isLoggedIn) {
      axios
        .get(`${process.env.NEXT_PUBLIC_API_URL}/user/following_list?limit=${limit}&page=${pageCount}`, {
          cancelToken: source.token,
          headers: { Authorization: user?.token },
        })
        .then(({ data }) => {
          if (data?.status) {
            setFollowersItem(data?.following);
            setTotalProduct(data?.total);
            setLoading(false);
          }
        })
        .catch((error) => {
          console.log("Category products error:", error);
          setLoading(false);
          if (error.response.status === 401) {
            expiredLoginTime();
          }
        });
    }

    return () => source.cancel();
  }, [user?.isLoggedIn, user?.token, pageCount, limit]);

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
    <Layout title="Followings">
      <Header />

      <Spacing space={{ height: "5rem" }} />

      <Container>
        <Grid container spacing={2}>
          <Suspense fallback={<Loader />}>
            <Grid size={{ xs: 12, sm: 3, md: 3 }} className={classes.cardItem}>
              <UserSideBar />
            </Grid>
          </Suspense>

          <Suspense fallback={<Loader />}>
            <Grid size={{ xs: 12, sm: 9, md: 9 }} className={classes.cardItem}>
              <SectionHeading title="My Follower" large />

              <Grid>
                {isLoading || followersItem?.length ? (
                  followersItem?.map((followItem) => (
                    <Grid size={{ xs: 12, sm: 12, md: 12 }} key={followItem?.user_id}>
                      <Card className={classes.followerProfileContent}>
                        <CardContent>
                          <div className={classes.followerProfile}>
                            <div className={classes.viewFollowerInfo}>
                              <div className={classes.followerImage}>
                                {followItem?.avatar ? (
                                  <img src={getBaseURL().bucket_base_url + "/" + followItem?.avatar} alt={followItem?.username} />
                                ) : (
                                  <img src={authorImg} alt="Author" />
                                )}
                              </div>

                              <div className={classes.followerInfo}>
                                <Typography className={classes.followerName} variant="h3">
                                  {followItem?.username}
                                </Typography>

                                <div className={classes.followerDetails}>
                                  <Typography className={classes.followerInfoItem} variant="body2">
                                    Resources
                                    <span>{followItem?.total_images}</span>
                                  </Typography>

                                  <Typography className={classes.followerInfoItem} variant="body2">
                                    Followers
                                    <span>{followItem?.total_follower}</span>
                                  </Typography>
                                  <Typography className={classes.followerInfoItem} variant="body2">
                                    Downloads
                                    <span>{followItem?.total_download}</span>
                                  </Typography>
                                </div>
                              </div>
                            </div>

                            <div className={classes.viewProfileBtn}>
                              <Button component={Link} to={`/author/${followItem?.username}`} className={classes.viewMoreBtn}>
                                View Profile
                              </Button>
                            </div>
                          </div>

                          <Spacing space={{ height: "2rem" }} />

                          <div className={classes.followerContent}>
                            <div className={classes.followerResources}>
                              {followItem?.images.map((followerResource) => (
                                <Card key={followerResource?.id} className={classes.followerFiles}>
                                  <img src={getBaseURL().bucket_base_url + getBaseURL().images + followerResource?.preview} alt="" />
                                </Card>
                              ))}
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    </Grid>
                  ))
                ) : (
                  <ProductNotFound noCollection="User Following" />
                )}
                {totalProduct > limit && <Pagination locationPath={locationPath} count={count} pageCount={pageCount} setPageCount={setPageCount} />}
              </Grid>
            </Grid>
          </Suspense>
        </Grid>
      </Container>

      <Spacing space={{ height: "3rem" }} />

      <Suspense fallback={<Loader />}>
        <Footer />
      </Suspense>
    </Layout>
  );
};

export default UserFollowing;
