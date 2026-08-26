"use client";

import { Button, Card, CardContent, Container, Grid, Typography } from "@/components/ui-kit";
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
import { expiredLoginTime, getBaseURL, imageObjSchema, joinImageUrl } from "../../../../helpers";
import Layout from "../../../../Layout";

const UserSideBar = lazy(() => import("../../../../components/ui/dashboard/user/UserSideBar"));
const Footer = lazy(() => import("../../../../components/ui/Footer"));

const UserFollowing = () => {
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
            <Grid size={{ xs: 12, sm: 3, md: 3 }} className="max-[576px]:max-w-[100%] max-[576px]:basis-[100%]">
              <UserSideBar />
            </Grid>
          </Suspense>

          <Suspense fallback={<Loader />}>
            <Grid size={{ xs: 12, sm: 9, md: 9 }} className="max-[576px]:max-w-[100%] max-[576px]:basis-[100%]">
              <SectionHeading title="My Follower" large />

              <Grid>
                {isLoading || followersItem?.length ? (
                  followersItem?.map((followItem) => (
                    <Grid size={{ xs: 12, sm: 12, md: 12 }} key={followItem?.user_id}>
                      <Card className="shadow-[0_1px_2px_0_rgb(0_0_0_/_10%)] mb-[1rem]">
                        <CardContent>
                          <div className="flex justify-between [border-bottom:1px_solid_#ddd] pb-[2rem]">
                            <div className="flex items-center justify-center relative max-[595px]:flex-col">
                              <div className="mr-[3rem] h-[9rem] w-[9rem] mt-[1rem] [&_img]:w-[100%] [&_img]:rounded-[100%] [&_img]:p-[0.2rem] [&_img]:shadow-[0px_0px_5px_#ddd] [&_img]:object-cover max-[595px]:w-[7rem] max-[595px]:h-[7rem] max-[595px]:mt-[2rem] max-[595px]:mb-[2rem] max-[595px]:mr-[0] max-[595px]:[&_img]:p-[0.4rem]">
                                {followItem?.avatar ? (
                                  <img src={joinImageUrl(getBaseURL().bucket_base_url + "/", followItem?.avatar)} alt={followItem?.username} />
                                ) : (
                                  <img src={authorImg.src} alt="Author" />
                                )}
                              </div>

                              <div className="text-[#000] max-[595px]:w-[auto] max-[595px]:text-center max-[595px]:items-center max-[595px]:flex max-[595px]:flex-col max-[595px]:justify-center">
                                <Typography className="text-[#575757] text-[2rem] mb-[.8rem] mt-[2rem] max-[479.95px]:mt-[0]" variant="h3">
                                  {followItem?.username}
                                </Typography>

                                <div className="flex items-center mb-[.4rem]">
                                  <Typography className={"text-[1.4rem] mr-[2.5rem] pr-[2.5rem] relative text-[#333333] before:content-[\"\"] before:absolute before:bg-[#ddd] before:w-[.16rem] before:h-[3.5rem] before:top-[0.5rem] before:right-[0] [&:last-child:before]:bg-[transparent] [&:last-child:before]:w-[0] [&_span]:text-[1.8rem] [&_span]:block [&_span]:font-[700] [&_span]:text-[#575757] max-[576px]:mr-[1.5rem] max-[576px]:pr-[1.5rem]"} variant="body2">
                                    Resources
                                    <span>{followItem?.total_images}</span>
                                  </Typography>

                                  <Typography className={"text-[1.4rem] mr-[2.5rem] pr-[2.5rem] relative text-[#333333] before:content-[\"\"] before:absolute before:bg-[#ddd] before:w-[.16rem] before:h-[3.5rem] before:top-[0.5rem] before:right-[0] [&:last-child:before]:bg-[transparent] [&:last-child:before]:w-[0] [&_span]:text-[1.8rem] [&_span]:block [&_span]:font-[700] [&_span]:text-[#575757] max-[576px]:mr-[1.5rem] max-[576px]:pr-[1.5rem]"} variant="body2">
                                    Followers
                                    <span>{followItem?.total_follower}</span>
                                  </Typography>
                                  <Typography className={"text-[1.4rem] mr-[2.5rem] pr-[2.5rem] relative text-[#333333] before:content-[\"\"] before:absolute before:bg-[#ddd] before:w-[.16rem] before:h-[3.5rem] before:top-[0.5rem] before:right-[0] [&:last-child:before]:bg-[transparent] [&:last-child:before]:w-[0] [&_span]:text-[1.8rem] [&_span]:block [&_span]:font-[700] [&_span]:text-[#575757] max-[576px]:mr-[1.5rem] max-[576px]:pr-[1.5rem]"} variant="body2">
                                    Downloads
                                    <span>{followItem?.total_download}</span>
                                  </Typography>
                                </div>
                              </div>
                            </div>

                            <div>
                              <Button component={Link} to={`/author/${followItem?.username}`} className="p-[0.6rem_1.5rem] bg-[#0088f2] text-[#fff] mt-[3.5rem] [border:.2rem_solid] border-[#0088f2] [transition:all_0.3s_linear] hover:bg-[#0773c5] hover:border-[#0773c5] hover:text-[#fff]">
                                View Profile
                              </Button>
                            </div>
                          </div>

                          <Spacing space={{ height: "2rem" }} />

                          <div>
                            <div className="flex justify-start items-start">
                              {followItem?.images.map((followerResource) => (
                                <Card key={followerResource?.id} className="h-[16rem] w-[26rem] m-[0.2rem] [&_img]:h-[100%] [&_img]:w-[100%] [&_img]:object-cover">
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
