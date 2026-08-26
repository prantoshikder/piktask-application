"use client";

import { Button, Card, CardContent, CircularProgress, Grid, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@/components/ui-kit";
import { DollarOutlined as AttachMoneyIcon } from "@ant-design/icons";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "@/lib/router";
import authorBadge from "../../../../assets/badge.png";
import authorPhoto from "../../../../assets/user/user-man.png";
import { expiredLoginTime, getBaseURL, joinImageUrl } from "../../../../helpers";
import Heading from "../../../ui/dashboard/contributor/Heading";
import ProductNotFound from "./../../../ui/ProductNotFound/index";

const AuthorFiles = () => {
  const user = useSelector((state) => state.user);

  const [isLoading, setLoading] = useState(true);
  const [topFiles, setTopFiles] = useState(null);
  const [authorFiles, setAuthorFiles] = useState(null);

  function pikTaskEncodeURI(data) {
    if (data) {
      return (
        "/category" + encodeURI(`/${data?.category.toLowerCase().trim().replace(/\s/g, "-")}/${data?.title.toLowerCase().replace(/\s/g, "-")}&id=${data?.id}`)
      );
    }
  }

  useEffect(() => {
    const CancelToken = axios.CancelToken;
    const source = CancelToken.source();

    // Author last file API integration
    if (user?.isLoggedIn && user?.role === "contributor") {
      axios
        .get(`${process.env.NEXT_PUBLIC_API_URL}/contributor/earning/images?limit=5`, { cancelToken: source.token, headers: { Authorization: user?.token } })
        .then(({ data }) => {
          if (data?.status) {
            setAuthorFiles(data?.images);
            setLoading(false);
          }
        })
        .catch((error) => {
          if (error.response.status === 401) {
            expiredLoginTime();
          }
          console.log("Latest file", error);
          setLoading(false);
        });
    }

    // Piktask top file API  integration
    if (user?.isLoggedIn && user?.role === "contributor") {
      axios
        .get(`${process.env.NEXT_PUBLIC_API_URL}/contributor/dashboard/top_files?limit=5`, { cancelToken: source.token, headers: { Authorization: user?.token } })
        .then(({ data }) => {
          if (data?.status) {
            setTopFiles(data?.images);
            setLoading(false);
          }
        })
        .catch((error) => {
          if (error.response.status === 401) {
            expiredLoginTime();
          }
          console.log("Piktask top files", error);
          setLoading(false);
        });
    }

    return () => source.cancel();
  }, [user?.token, user?.role, user?.isLoggedIn]);

  return (
    <Grid container className="p-[0rem_1rem_1rem_1rem]">
      <Grid size={{ xs: 12, sm: 12, md: 6 }} className="max-[576px]:max-w-[100%] max-[576px]:basis-[100%]">
        {authorFiles === null ? (
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
          <Card className="h-[57.6rem] rounded-[0] shadow-[0_8px_12px_3px_rgb(0_0_0_/_6%)] m-[1rem]">
            {authorFiles?.length ? (
              <CardContent className="p-[2rem]">
                <div className="flex items-center justify-between p-[1rem_0rem] [&_h2]:text-[1.8rem]">
                  <Heading tag="h2">Your Latest File's</Heading>
                  <Button className="text-[#000] font-[400] font-['Roboto',sans-serif] capitalize text-[1.5rem] rounded-[3rem] opacity-[1] leading-[1.75] p-[.2rem_1.5rem] bg-[#fff] [border:.2rem_solid] border-[#0088f2] [transition:all_0.3s_linear] hover:border-[#0088f2] hover:bg-[#0088f2] hover:text-[#fff]" component={Link} to={`/contributor/publish`}>
                    Load more
                  </Button>
                </div>
                <TableContainer className="[border:0] shadow-[none] rounded-[0]" component={Paper}>
                  <Table aria-label="earning data table">
                    <TableHead>
                      <TableRow className="bg-[#ECEEF5] [&_th]:[border-bottom:0px_solid_transparent]">
                        <TableCell align="left" className="p-[1rem] text-[1.6rem] [&_svg]:mb-[-0.19rem]">
                          Item
                        </TableCell>
                        <TableCell align="center" className="p-[1rem] text-[1.6rem] [&_svg]:mb-[-0.19rem]">
                          Type
                        </TableCell>
                        <TableCell align="center" className="p-[1rem] text-[1.6rem] [&_svg]:mb-[-0.19rem]">
                          Download
                        </TableCell>
                        <TableCell align="center" className="p-[1rem] text-[1.6rem] [&_svg]:mb-[-0.19rem]">
                          Earning
                        </TableCell>
                      </TableRow>
                    </TableHead>

                    <TableBody>
                      {authorFiles?.map((authLastFile) => (
                        <TableRow key={authLastFile?.id} className="[&_td]:border-[#E3E3E3] [&:last-child_td]:[border:0]">
                          <TableCell className="p-[1rem] text-[1.6rem] [&_svg]:mb-[-0.19rem] flex">
                            <Link to={pikTaskEncodeURI(authLastFile)}>
                              <img
                                className="w-[10rem]"
                                src={encodeURI(getBaseURL().bucket_base_url + getBaseURL().images + authLastFile?.preview)}
                                alt={authLastFile?.title}
                                width="100px"
                                height="62px"
                              />
                            </Link>

                            {/* {authLastFile?.item_for_sale === "sale" && (
                                  <div className="m-[auto_1rem] h-[3rem] w-[3rem] rounded-[100%] bg-[#f1f1f1] cursor-pointer [&_img]:m-[0.8rem] [&_img]:w-[1.5rem]">
                                    <img src={encodeURI(premiumFileSell)} alt="Premium Product" />
                                  </div>
                                )} */}
                          </TableCell>
                          <TableCell align="center" className="p-[1rem] text-[1.6rem] [&_svg]:mb-[-0.19rem]">
                            {authLastFile?.extension}
                          </TableCell>
                          <TableCell align="center" className="p-[1rem] text-[1.6rem] [&_svg]:mb-[-0.19rem]">
                            {authLastFile?.total_downloads}
                          </TableCell>
                          <TableCell align="center" className="p-[1rem] text-[1.6rem] [&_svg]:mb-[-0.19rem]">
                            <AttachMoneyIcon />
                            {authLastFile?.earn_per_image}
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>
              </CardContent>
            ) : (
              <ProductNotFound contributorProductNotFound />
            )}
          </Card>
        )}
      </Grid>

      <Grid size={{ xs: 12, sm: 12, md: 6 }} className="max-[576px]:max-w-[100%] max-[576px]:basis-[100%]">
        {topFiles === null ? (
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
          <Card className="h-[57.6rem] rounded-[0] shadow-[0_8px_12px_3px_rgb(0_0_0_/_6%)] m-[1rem]">
            <CardContent className="p-[2rem]">
              <div className="flex items-center justify-between p-[1rem_0rem] [&_h2]:text-[1.8rem]">
                <Heading style={{ padding: "0.4rem 0rem" }} tag="h2">
                  Piktask Top File's
                </Heading>
              </div>

              <TableContainer className="[border:0] shadow-[none] rounded-[0]" component={Paper}>
                <Table aria-label="earning data table">
                  <TableHead>
                    <TableRow className="bg-[#ECEEF5] [&_th]:[border-bottom:0px_solid_transparent]">
                      <TableCell align="left" className="p-[1rem] text-[1.6rem] [&_svg]:mb-[-0.19rem]">
                        Item
                      </TableCell>
                      <TableCell align="center" className="p-[1rem] text-[1.6rem] [&_svg]:mb-[-0.19rem]">
                        Type
                      </TableCell>
                      <TableCell align="center" className="p-[1rem] text-[1.6rem] [&_svg]:mb-[-0.19rem]">
                        Downloads
                      </TableCell>
                      <TableCell align="center" className="p-[1rem] text-[1.6rem] [&_svg]:mb-[-0.19rem]">
                        Author
                      </TableCell>
                    </TableRow>
                  </TableHead>

                  <TableBody>
                    {topFiles?.length > 0 ? (
                      topFiles?.map((topFile) => (
                        <TableRow key={topFile?.id} className="[&_td]:border-[#E3E3E3] [&:last-child_td]:[border:0]">
                          <TableCell className="p-[1rem] text-[1.6rem] [&_svg]:mb-[-0.19rem] flex">
                            <Link to={pikTaskEncodeURI(topFile)}>
                              <img
                                className="w-[10rem]"
                                src={encodeURI(getBaseURL().bucket_base_url + getBaseURL().images + topFile?.preview)}
                                alt={topFile?.title}
                                width="100px"
                                height="62px"
                              />
                            </Link>
                            {/* {topFile?.item_for_sale === "sale" && (
                                <div className="m-[auto_1rem] h-[3rem] w-[3rem] rounded-[100%] bg-[#f1f1f1] cursor-pointer [&_img]:m-[0.8rem] [&_img]:w-[1.5rem]">
                                  <img src={encodeURI(premiumFileSell)} alt="Premium Product" />
                                </div>
                              )} */}
                          </TableCell>
                          <TableCell align="center" className="p-[1rem] text-[1.6rem] [&_svg]:mb-[-0.19rem]">
                            {topFile?.extension}
                          </TableCell>
                          <TableCell align="center" className="p-[1rem] text-[1.6rem] [&_svg]:mb-[-0.19rem]">
                            {topFile?.total_downloads}
                          </TableCell>
                          <TableCell align="center" className="p-[1rem] text-[1.6rem] [&_svg]:mb-[-0.19rem] relative [&_img]:mb-[0] [&_img:first-child]:mr-[1rem]">
                            <Link to={`/author/${topFile?.username}`}>
                              {topFile?.avatar ? (
                                <img
                                  className="w-[5rem] h-[5rem] rounded-[100%] [border:2px_solid_#ECEEF5] p-[2px] mb-[0.5rem]"
                                  src={joinImageUrl(getBaseURL().bucket_base_url + "/", topFile?.avatar)}
                                  alt={topFile?.username}
                                  width="42px"
                                  height="42px"
                                />
                              ) : (
                                <img className="w-[5rem] h-[5rem] rounded-[100%] [border:2px_solid_#ECEEF5] p-[2px] mb-[0.5rem]" src={authorPhoto.src} alt={topFile?.username} width="42px" height="42px" />
                              )}
                            </Link>
                            <img className="absolute w-[1.8rem] object-cover top-[1rem]" src={authorBadge.src} alt="Badge" width="18px" height="31px" />
                          </TableCell>
                        </TableRow>
                      ))
                    ) : (
                      <ProductNotFound contributorProductNotFound />
                    )}
                  </TableBody>
                </Table>
              </TableContainer>
            </CardContent>
          </Card>
        )}
      </Grid>
    </Grid>
  );
};

export default AuthorFiles;
