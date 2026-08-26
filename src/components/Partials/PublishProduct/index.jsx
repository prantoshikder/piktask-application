"use client";

import { Card, CardContent, CircularProgress, Grid, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@/components/ui-kit";
import { DollarOutlined as AttachMoneyIcon } from "@ant-design/icons";
import moment from "moment";
import React from "react";
import { Link } from "@/lib/router";
import { getBaseURL, getWords } from "./../../../helpers/index";
import ProductNotFound from "./../../ui/ProductNotFound/index";

const PublishProduct = (props) => {
  const { isLoading, allPublishProduct } = props;

  function pikTaskEncodeURI(data) {
    if (data) {
      return (
        "/category" +
        encodeURI(`/${data?.category.toLowerCase().trim().replace(/\s/g, "-")}/${data?.title.toLowerCase().trim().replace(/\s/g, "-")}&id=${data?.image_id}`)
      );
    }
  }

  return (
    <>
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
        <Grid container className="p-[0rem]">
          <Grid size={{ xs: 12, sm: 12, md: 12 }} className="max-[576px]:max-w-[100%] max-[576px]:basis-[100%]">
            <Card className="h-[auto] rounded-[0] shadow-[0_8px_12px_3px_rgb(0_0_0_/_6%)]">
              <CardContent className="p-[2rem]">
                {allPublishProduct?.length > 0 ? (
                  <TableContainer className="[border:0] shadow-[none] rounded-[0]" component={Paper}>
                    <Table aria-label="publish data table">
                      <TableHead>
                        <TableRow className="bg-[#ECEEF5] [&_th]:[border-bottom:0px_solid_transparent]">
                          <TableCell style={{ textAlign: "left" }} className="p-[1rem] text-[1.6rem] text-center [&_svg]:mb-[-0.19rem]">
                            Item
                          </TableCell>
                          <TableCell style={{ textAlign: "left" }} className="p-[1rem] text-[1.6rem] text-center [&_svg]:mb-[-0.19rem]">
                            Title
                          </TableCell>
                          <TableCell className="p-[1rem] text-[1.6rem] text-center [&_svg]:mb-[-0.19rem]">Type</TableCell>
                          <TableCell className="p-[1rem] text-[1.6rem] text-center [&_svg]:mb-[-0.19rem]">Like</TableCell>
                          <TableCell className="p-[1rem] text-[1.6rem] text-center [&_svg]:mb-[-0.19rem]">Download</TableCell>
                          <TableCell className="p-[1rem] text-[1.6rem] text-center [&_svg]:mb-[-0.19rem]">Earning</TableCell>
                          <TableCell className="p-[1rem] text-[1.6rem] text-center [&_svg]:mb-[-0.19rem]">Date</TableCell>
                        </TableRow>
                      </TableHead>

                      {allPublishProduct?.map((product) => (
                        <TableBody key={product?.image_id}>
                          <TableRow key={product?.image_id} className="[&_td]:border-[#E3E3E3] [&:last-child_td]:[border:0] [&:nth-of-type(even)]:bg-[rgba(0,0,0,0.04)]">
                            <TableCell className="p-[1rem] text-[1.6rem] text-center [&_svg]:mb-[-0.19rem] flex">
                              <Link to={pikTaskEncodeURI(product)}>
                                <img
                                  className="w-[10rem]"
                                  src={getBaseURL().bucket_base_url + getBaseURL().images + product?.preview}
                                  alt={product?.title}
                                />
                              </Link>

                              {/* {product?.item_for_sale === "sale" && (
                                          <div className="m-[auto_1rem] h-[3rem] w-[3rem] rounded-[100%] bg-[#f1f1f1] cursor-pointer [&_img]:m-[0.8rem] [&_img]:w-[1.5rem]">
                                            <img src={premiumFileSell} alt="Premium Product" />
                                          </div>
                                        )} */}
                            </TableCell>

                            <TableCell style={{ textAlign: "left" }} className="p-[1rem] text-[1.6rem] text-center [&_svg]:mb-[-0.19rem]">
                              {product?.title.split(" ").length > 4 ? <>{getWords(4, product?.title)}...</> : <>{product?.title}</>}
                            </TableCell>

                            <TableCell className="p-[1rem] text-[1.6rem] text-center [&_svg]:mb-[-0.19rem]">{product?.extension}</TableCell>

                            <TableCell className="p-[1rem] text-[1.6rem] text-center [&_svg]:mb-[-0.19rem]">{product?.total_likes}</TableCell>

                            <TableCell className="p-[1rem] text-[1.6rem] text-center [&_svg]:mb-[-0.19rem]">{product?.total_downloads}</TableCell>

                            <TableCell className="p-[1rem] text-[1.6rem] text-center [&_svg]:mb-[-0.19rem]">
                              <AttachMoneyIcon />
                              {product?.total_earning}
                            </TableCell>

                            <TableCell className="p-[1rem] text-[1.6rem] text-center [&_svg]:mb-[-0.19rem]">{moment(product?.createdAt).format("ll")}</TableCell>
                          </TableRow>
                        </TableBody>
                      ))}
                    </Table>
                  </TableContainer>
                ) : (
                  <ProductNotFound publishContent contributorProductNotFound />
                )}
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      )}
    </>
  );
};

export default PublishProduct;
