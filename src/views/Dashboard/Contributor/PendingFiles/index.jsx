"use client";

import { Button, Card, Drawer, Grid, Typography, useMediaQuery } from "@/components/ui-kit";
import { CloseOutlined as CloseIcon } from "@ant-design/icons";
import { DeleteOutlined as DeleteIcon } from "@ant-design/icons";
import { CircularProgress } from "@/components/ui-kit";
import axios from "axios";
import React, { lazy, Suspense, useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { useLocation } from "@/lib/router";
import { toast } from "react-toastify";
import Spacing from "../../../../components/Spacing";
import AdminHeader from "../../../../components/ui/dashboard/contributor/Header";
import Heading from "../../../../components/ui/dashboard/contributor/Heading";
import Sidebar from "../../../../components/ui/dashboard/contributor/Sidebar";
import Loader from "../../../../components/ui/Loader";
import Pagination from "../../../../components/ui/Pagination";
import ProductNotFound from "../../../../components/ui/ProductNotFound";
import { expiredLoginTime, getBaseURL } from "../../../../helpers";
import Layout from "../../../../Layout";
import EditItem from "./EditItem";

const Footer = lazy(() => import("../../../../components/ui/Footer"));

const PendingFiles = () => {
  const cardRef = useRef();
  const location = useLocation();
  const locationPath = location.pathname;
  const mobileView = useMediaQuery("(max-width:769px)");
  const user = useSelector((state) => state.user);

  const [selectedProducts, setSelectedProducts] = useState([]);
  const [pendingProducts, setPendingProducts] = useState([]);
  const [openModal, setOpenModal] = useState(false);
  const [isLoading, setLoading] = useState(true);
  const [addProductDetails, setAddProductDetails] = useState(false);
  const [successProduct, setSuccessProduct] = useState(false);
  const [productsSubmitted, setProductsSubmitted] = useState(false);

  const [pageCount, setPageCount] = useState(1);
  const [totalProduct, setTotalProduct] = useState();

  let limit = 36;
  const count = Math.ceil(totalProduct / limit);

  useEffect(() => {
    setAddProductDetails(!true);
    setSuccessProduct(!true);
    setProductsSubmitted(!true);

    const CancelToken = axios.CancelToken;
    const source = CancelToken.source();

    if (user?.isLoggedIn && user?.role === "contributor") {
      axios
        .get(`${process.env.NEXT_PUBLIC_API_URL}/contributor/images/not_submit?limit=${limit}&page=${pageCount}`, {
          cancelToken: source.token,
          headers: { Authorization: user?.token },
        })
        .then(({ data }) => {
          if (data?.images.length > 0) {
            setPendingProducts(data?.images);
            setTotalProduct(data?.total);
            setLoading(false);
          } else {
            setLoading(false);
          }
        })
        .catch((error) => {
          console.log("Not submit", error);
          setLoading(false);

          if (error.response.status === 401) {
            expiredLoginTime();
          }
        });

      return () => source.cancel();
    }
  }, [user?.isLoggedIn, user?.token, user?.role, addProductDetails, successProduct, pageCount, limit, productsSubmitted]);

  const handleDelete = (image_id) => {
    const CancelToken = axios.CancelToken;
    const source = CancelToken.source();

    if (user?.isLoggedIn && user?.role === "contributor") {
      axios
        .delete(`${process.env.NEXT_PUBLIC_API_URL}/images/${image_id}`, {
          cancelToken: source.token,
          headers: { Authorization: user?.token },
        })
        .then(({ data }) => {
          if (data?.status) {
            const index = pendingProducts.findIndex((item) => item.token_id === image_id);
            pendingProducts.splice(index, 1);
            setPendingProducts([...pendingProducts]);
            setLoading(false);
            toast.success(data.message);
          }
        })
        .catch((error) => {
          console.log("Product delete", error);
          setLoading(false);

          if (error.response.status === 401) {
            expiredLoginTime();
          }
        });

      return () => source.cancel();
    }
  };

  const selectedProduct = (e, product) => {
    // if (product.is_save === 1) return;

    if (!product.isSelected) {
      product.isSelected = true;
      e.currentTarget.style.border = "2px solid #0088f2";
    } else {
      product.isSelected = false;
      e.currentTarget.style.border = "";
    }

    setSelectedProducts((prevItems) => {
      const isSelected = prevItems.find((item) => item.id === product.id);

      if (isSelected) {
        const index = prevItems.findIndex((item) => item.id === product.id);
        prevItems.splice(index, 1);
        return prevItems.map((item) => (item.id === product.id ? { ...item, isSelected: false } : item));
      }
      return [...prevItems, { ...product }];
    });
  };

  const handleWorkInfo = () => {
    if (selectedProducts?.length > 0) {
      if (selectedProducts?.length > 12) {
        toast.error("You can not select more than 12");
        return;
      }
      setOpenModal(true);
    } else {
      toast.error("Please select at least 1 product");
      setOpenModal(false);
    }
  };

  const handleSubmit = async () => {
    let token_ids = [];
    pendingProducts.map((item) => item.is_save === 1 && token_ids.push(item.token_id));

    if (token_ids?.length === 0) {
      toast.error("No submit ready product found.");
      return;
    }

    const CancelToken = axios.CancelToken;
    const source = CancelToken.source();

    if (user?.isLoggedIn && user?.role === "contributor") {
      const url = `${process.env.NEXT_PUBLIC_API_URL}/images/submit`;
      try {
        const response = await axios({
          method: "put",
          url,
          cancelToken: source.token,
          headers: {
            Authorization: user?.token,
            "Content-Type": "application/json",
          },
          data: { images: token_ids },
        });
        if (response.data?.status) {
          pendingProducts.forEach((element) => {
            if (element.is_save === 1) {
              setProductsSubmitted(pendingProducts);
            }
          });
          toast.success(response.data?.message || "Image submitted successfully");
        }
      } catch (error) {
        console.log("Submit image", error);
        toast.success(error.response.data?.message || "Image submitted fail");

        if (error.response.status === 401) {
          expiredLoginTime();
        }
      }
    }

    return () => source.cancel();
  };

  return (
    <Layout title="Pending">
      <div>
        {mobileView ? null : <Sidebar className="mt-[0rem] max-[768.95px]:hidden" />}

        <main className="p-[0] ml-[28rem] max-[768.95px]:w-[100%] max-[768.95px]:ml-[0rem]">
          <AdminHeader />

          <Suspense fallback={<Loader />}>
            <div className="mt-[6rem] p-[2rem] min-h-[60vh]">
              <div className="flex justify-between mt-[2rem] mb-[3rem] max-[990px]:flex-col max-[990px]:items-start max-[990px]:[&_h2]:mb-[1.5rem]">
                <div className="[&_h3]:text-[1.5rem] [&_h3]:font-[500] [&_h3]:m-[1rem_0] [&_h3]:text-[#143340] [&_p]:text-[1.4rem]">
                  <Heading tag="h2">Not yet submitted</Heading>
                  <Typography variant="h3">This is your first upload!</Typography>
                  <Typography>
                    Upload and send your 20 best resources. Our team will review them to ensure they <br /> meet our requirements, so make sure they show your
                    true potential.
                  </Typography>
                </div>
                <div>
                  {/* <Button onClick={() => deleteSelectionProduct()} className="text-[#fff] font-[500] font-['Roboto',sans-serif] capitalize text-[1.6rem] rounded-[3rem] opacity-[1] leading-[1.75] p-[.2rem_2rem] bg-[#143340] ml-[1rem] [border:.2rem_solid] border-[transparent] max-[990px]:mb-[1.5rem] max-[990px]:p-[.4rem_2rem] max-[990px]:text-[1.4rem] bg-[#FB5252] [transition:all_0.3s_linear] hover:border-[#FB5252] hover:text-[#FB5252] max-[990px]:ml-[0]">
                  Delete File
                </Button> */}
                  {pendingProducts?.length > 0 && (
                    <Button className="text-[#fff] font-[500] font-['Roboto',sans-serif] capitalize text-[1.6rem] rounded-[3rem] opacity-[1] leading-[1.75] p-[.2rem_2rem] bg-[#143340] ml-[1rem] [border:.2rem_solid] border-[transparent] max-[990px]:mb-[1.5rem] max-[990px]:p-[.4rem_2rem] max-[990px]:text-[1.4rem] bg-[#0088f2] [transition:all_0.3s_linear] hover:border-[#0088f2] hover:text-[#0088f2]" onClick={() => handleSubmit()}>
                      Submit
                    </Button>
                  )}

                  {pendingProducts?.length > 0 && (
                    <Button className="text-[#fff] font-[500] font-['Roboto',sans-serif] capitalize text-[1.6rem] rounded-[3rem] opacity-[1] leading-[1.75] p-[.2rem_2rem] bg-[#143340] ml-[1rem] [border:.2rem_solid] border-[transparent] max-[990px]:mb-[1.5rem] max-[990px]:p-[.4rem_2rem] max-[990px]:text-[1.4rem] bg-[#EF9D38] [transition:all_0.3s_linear] hover:border-[#EF9D38] hover:text-[#EF9D38]" onClick={() => handleWorkInfo()}>
                      Add Work Information
                    </Button>
                  )}
                </div>
              </div>

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
                <Grid container spacing={2}>
                  {pendingProducts?.length > 0 ? (
                    pendingProducts?.map((product) => (
                      <Grid size={{ xs: 4, sm: 3, md: 2 }} key={product?.id} className="relative max-[576px]:max-w-[50%] max-[576px]:basis-[50%]">
                        <div className="absolute top-[1.5rem] right-[1.5rem] flex justify-center items-center z-[1]">
                          <DeleteIcon onClick={() => handleDelete(product?.token_id)} className="text-[#DDD] [border:0.1rem_solid] border-[#DDDDDD] p-[0.1rem] text-[2.2rem] cursor-pointer [transition:all_0.3s_linear] hover:border-[#FB5252] hover:text-[#FB5252]" />
                        </div>

                        <Card
                          className="relative p-[3.5rem_1rem_0] [border:2px_solid_transparent] h-[100%] [&_img]:w-[100%] [&_img]:h-[10rem] [&_img]:rounded-[4px] [&_img]:object-cover [&_h3]:text-[1.4rem] [&_h3]:mb-[1rem] [&_h3]:[line-break:anywhere] [&_p]:text-[1.2rem]"
                          onClick={(e) => {
                            selectedProduct(e, product);
                          }}
                          ref={cardRef}
                          style={{ border: product?.is_save === 1 && "2px solid #008000" }}
                        >
                          <img src={getBaseURL().bucket_base_url + getBaseURL().images + product?.original_file} alt={product?.original_name} />

                          <div className="p-[1rem_0]">
                            <Typography variant="h3">{product?.original_name}</Typography>
                            <Typography variant="body2">File Size: {(product.size / 1024 / 1024).toFixed(2)} MB</Typography>
                          </div>
                        </Card>
                      </Grid>
                    ))
                  ) : (
                    <ProductNotFound pendingContent contributorProductNotFound />
                  )}
                </Grid>
              )}

              {totalProduct > limit && <Pagination locationPath={locationPath} count={count} pageCount={pageCount} setPageCount={setPageCount} />}
            </div>
          </Suspense>

          <Spacing space={{ height: "5rem" }} />

          <Drawer anchor="right" open={openModal} onClose={() => setOpenModal(false)} className="w-[45rem] p-[3rem_4.5rem] max-[600px]:w-[100%]">
            <div className="p-[1rem_2rem_0] [&_hr]:[border:0_solid_transparent] [&_hr]:bg-[#ddd] [&_hr]:h-[0.1rem]">
              <div className="flex items-center justify-between mb-[1.5rem]">
                <Heading>Work Details</Heading>
                <CloseIcon className="cursor-pointer text-[3.5rem] text-[#B7B7B7] hover:text-[#FB5252]" onClick={() => setOpenModal(false)} />
              </div>
              <hr />
            </div>

            <EditItem
              setSelectedProducts={setSelectedProducts}
              setOpenModal={setOpenModal}
              products={selectedProducts}
              setAddProductDetails={setAddProductDetails}
              pendingProducts={pendingProducts}
              setSuccessProduct={setSuccessProduct}
            />
          </Drawer>

          <Suspense fallback={<Loader />}>
            <Footer />
          </Suspense>
        </main>
      </div>
    </Layout>
  );
};

export default PendingFiles;
