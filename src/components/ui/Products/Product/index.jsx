"use client";

import { Button, Card, CardContent, CardMedia, IconButton, Typography } from "@/components/ui-kit";
import { UserOutlined as AccountCircleIcon } from "@ant-design/icons";
import { HeartOutlined as FavoriteBorderIcon } from "@ant-design/icons";
import axios from "axios";
// import crownIcon from "../../../../assets/icons/crown.svg";
import React, { useRef, useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "@/lib/router";
import { PinterestIcon, PinterestShareButton } from "react-share";
import { toast } from "react-toastify";
import downloadIcon from "../../../../assets/download.svg";
import { getBaseURL, getWords, joinImageUrl } from "../../../../helpers";
import SignUpModal from "../../../../views/Authentication/SignUpModal";

const Product = ({ photo = null }) => {
  const pathname = usePathname();
  const likeRef = useRef();
  const user = useSelector((state) => state.user);

  const title = photo?.title;
  const titleLength = title?.split(" ");

  const [likeCount, setLikeCount] = useState(photo?.total_likes);
  const [openAuthModal, setOpenAuthModal] = useState(false);
  const [isLike, setLike] = useState(false);

  const handleLikeBtn = () => {
    if (user?.id !== photo?.user_id && user?.isLoggedIn && user?.role === "user") {
      axios
        .post(`${process.env.NEXT_PUBLIC_API_URL}/images/${photo?.image_id}/like`, {}, { headers: { Authorization: user?.token } })
        .then(({ data }) => {
          if (data?.status) {
            setLike(true);
            setLikeCount((prevState) => prevState + 1);
          } else if (!data?.status) {
            toast.error(data.message);
            setLike(true);
          } else {
            console.log("Something wrong with the like");
          }
        })
        .catch((error) => console.log("Like error: ", error));
    } else {
      if (user?.isLoggedIn && user?.role === "contributor") {
        toast.error("Please, login as a user", { autoClose: 2200 });
      } else {
        toast.error("You can't Like yourself", { autoClose: 2200 });
        setOpenAuthModal(true);
      }
    }
  };

  function pikTaskEncodeURI(data) {
    if (data) {
      return (
        "/category" +
        encodeURI(`/${photo?.category.toLowerCase().trim().replace(/\s/g, "-")}/${data?.title.toLowerCase().trim().replace(/\s/g, "-")}&id=${data?.image_id}`)
      );
    }
  }

  return (
    <>
      <Card className="bg-[#F8F8F8] shadow-[0_1px_2px_0_rgb(0_0_0_/_10%)] z-[0] group relative rounded-none h-full [&:hover_.favourite]:visible [&:hover_.favourite]:opacity-100 group">
        <div className="right-[1rem] top-[1rem] absolute">
          {/* {photo?.item_for_sale === "sale" && (
            <IconButton
              disableRipple
              classes={{ root: "bg-[#FDAF01] mb-[8px] hover:bg-[rgb(68_68_68_/_60%)] [&_img]:w-[1.5rem]" }}
              className="rounded-[50%] w-[3rem] h-[3rem] z-[1] [transition:all_0.3s_linear] group-hover:opacity-[1] group-hover:visible"
              title="Premium for Commercial Use"
              component={Link}
              to={`/subscription`}
            >
              <img src={crownIcon.src} alt="Premium" />
            </IconButton>
          )} */}
          <IconButton
            disableRipple
            classes={{ root: "mb-[2px] invisible opacity-[0]" }}
            className="rounded-[50%] w-[3rem] h-[3rem] z-[1] [transition:all_0.3s_linear] group-hover:opacity-[1] group-hover:visible"
            title="Premium for Commercial Use"
            component={Link}
            to={`/subscription`}
          >
            <PinterestShareButton url={pathname} media={encodeURI(`${getBaseURL().bucket_base_url}${getBaseURL().images}${photo?.preview}`)}>
              <PinterestIcon size={30} round={true} />
            </PinterestShareButton>
          </IconButton>

          {!photo?.isLike && !isLike ? (
            <IconButton ref={likeRef} classes={{ root: "bg-[#ffffff] text-[16px] flex items-center justify-center cursor-pointer invisible opacity-[0] shadow-[rgba(50,50,93,0.25)_0px_13px_27px_-5px,rgba(0,0,0,0.3)_0px_8px_16px_-8px] hover:bg-[#0088f2] hover:text-[#ffffff] hover:border-[#0088f2] [&.disabled]:bg-[#0088f2] [&.disabled]:text-[#fff] [&.disabled]:border-[#0088f2] [&.disabled]:opacity-[0.5]!" }} className="rounded-[50%] w-[3rem] h-[3rem] z-[1] [transition:all_0.3s_linear] group-hover:opacity-[1] group-hover:visible" onClick={handleLikeBtn}>
              <FavoriteBorderIcon fontSize={"large"} />
            </IconButton>
          ) : (
            <IconButton ref={likeRef} classes={{ root: "bg-[#0088f2] text-[16px] flex items-center justify-center cursor-pointer invisible opacity-[0] border-[#469439] text-[#ffffff] hover:bg-[#0773c5] hover:border-[#0773c5]" }} className="rounded-[50%] w-[3rem] h-[3rem] z-[1] [transition:all_0.3s_linear]" onClick={handleLikeBtn}>
              <FavoriteBorderIcon fontSize={"large"} />
            </IconButton>
          )}
        </div>

        {photo?.extension === "png" ? (
          <div className="relative h-[240px]">
            <Link to={pikTaskEncodeURI(photo)}>
              <img
                className="w-[100%] h-[100%] object-cover"
                src={encodeURI(getBaseURL().bucket_base_url + getBaseURL().images + photo?.preview)}
                alt={`${photo?.title}`}
                width="361px"
                height="240px"
              />
            </Link>
          </div>
        ) : (
          <div className="relative h-[240px]">
            <Link to={pikTaskEncodeURI(photo)}>
              <img
                className="w-[100%] h-[100%] object-cover"
                src={encodeURI(getBaseURL().bucket_base_url + getBaseURL().images + photo?.preview)}
                alt={`${photo?.title}`}
                width="361px"
                height="240px"
              />
            </Link>
          </div>
        )}

        <div className="p-[1rem_0rem] flex flex-col">
          <CardContent className="p-[1px_16px]">
            <Link className="no-underline [&:hover_h2]:text-[#0088f2]" to={pikTaskEncodeURI(photo)} title={photo?.title}>
              <Typography variant="h3" className="text-[1.4rem] text-[#1B3F4E] mb-[.5rem] capitalize break-all">
                {titleLength?.length > 5 ? <>{getWords(5, photo?.title)}...</> : <>{photo?.title}</>}
              </Typography>
            </Link>
          </CardContent>

          <CardContent className="flex items-center justify-between pt-[0] mt-[auto] pb-[4px]!">
            <div className=" flex justify-between items-center">
              <Link to={`/author/${photo?.username}`} className="w-[37px] h-[37px] rounded-[100%] p-[0.2rem] shadow-[0px_0px_5px_#ddd] mr-[0.8rem]">
                {photo?.avatar ? (
                  <CardMedia
                    component="img"
                    className="w-[100%] h-[100%] rounded-[100%] text-[#000] cursor-pointer"
                    image={joinImageUrl(getBaseURL().bucket_base_url + "/", photo?.avatar)}
                    title={photo?.name}
                    width="33px"
                    height="33px"
                    alt={photo?.name}
                  />
                ) : (
                  <AccountCircleIcon className="w-[100%] h-[100%] rounded-[100%] text-[#000] cursor-pointer" />
                )}
              </Link>

              <Typography paragraph className="mb-[0] text-[14px] font-[500] text-[#1B3F4E] cursor-pointer no-underline" component={Link} to={`/author/${photo?.username}`}>
                {photo?.username}
              </Typography>
            </div>

            <Typography variant="body1" className="text-[12px] text-[#1B3F4E] font-[400] flex items-center">
              <img className="mr-[0.3rem] ml-[0.3rem]" src={downloadIcon.src} alt="Total Download" width="6px" height="10px" />
              {photo?.total_download}
              <FavoriteBorderIcon className="text-[#1B3F4E] text-[1.4rem] ml-[.8rem] mr-[.3rem] cursor-pointer" /> {likeCount}
            </Typography>

            <div className="flex [&_button]:h-[3.5rem] [&_button]:w-[9.7rem] [&_button]:text-[12px] [&_button:first-child]:mr-[1rem]">
              <Button className="text-[#97999F] font-[400] font-['Roboto',sans-serif] capitalize text-[1.2rem] rounded-[3rem] opacity-[1] leading-[1.75] bg-[#EEF0F5] w-[8.5rem] h-[3.5rem] [transition:all_0.3s_linear] group-hover:bg-[#0088f2] group-hover:text-[#fff]" component={Link} to={pikTaskEncodeURI(photo)}>
                Download
              </Button>
            </div>
          </CardContent>
        </div>
      </Card>
      <SignUpModal openAuthModal={openAuthModal} setOpenAuthModal={setOpenAuthModal} />
    </>
  );
};

export default Product;
