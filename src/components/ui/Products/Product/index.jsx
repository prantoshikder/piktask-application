"use client";

import { Button, CardContent, CardMedia, IconButton, Typography } from "@mui/material";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import axios from "axios";
// import crownIcon from "../../../../assets/icons/crown.svg";
import React, { useRef, useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "@/lib/router";
import { PinterestIcon, PinterestShareButton } from "react-share";
import { toast } from "react-toastify";
import downloadIcon from "../../../../assets/download.svg";
import { getBaseURL, getWords } from "../../../../helpers";
import SignUpModal from "../../../../views/Authentication/SignUpModal";
import { ButtonWrapper, CardFooter, CardWrapper, useStyles } from "./Product.styles";

const Product = ({ photo = null }) => {
  const pathname = usePathname();
  const { classes } = useStyles();
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
      <CardWrapper className={classes.container}>
        <div className={classes.buttonsWrapper}>
          {/* {photo?.item_for_sale === "sale" && (
            <IconButton
              disableRipple
              classes={{ root: classes.premiumIcon }}
              className={classes.iconBtn}
              title="Premium for Commercial Use"
              component={Link}
              to={`/subscription`}
            >
              <img src={crownIcon} alt="Premium" />
            </IconButton>
          )} */}
          <IconButton
            disableRipple
            classes={{ root: classes.pinterestIcon }}
            className={classes.iconBtn}
            title="Premium for Commercial Use"
            component={Link}
            to={`/subscription`}
          >
            <PinterestShareButton url={pathname} media={encodeURI(`${getBaseURL().bucket_base_url}${getBaseURL().images}${photo?.preview}`)}>
              <PinterestIcon size={30} round={true} />
            </PinterestShareButton>
          </IconButton>

          {!photo?.isLike && !isLike ? (
            <IconButton ref={likeRef} classes={{ root: classes.favouriteIcon }} className={classes.iconBtn} onClick={handleLikeBtn}>
              <FavoriteBorderIcon fontSize={"large"} />
            </IconButton>
          ) : (
            <IconButton ref={likeRef} classes={{ root: classes.favouriteIconBtn }} className={classes.iconBtn} onClick={handleLikeBtn}>
              <FavoriteBorderIcon fontSize={"large"} />
            </IconButton>
          )}
        </div>

        {photo?.extension === "png" ? (
          <div className={classes.itemTransparent}>
            <Link to={pikTaskEncodeURI(photo)}>
              <img
                className={classes.image}
                src={encodeURI(getBaseURL().bucket_base_url + getBaseURL().images + photo?.preview)}
                alt={`${photo?.title}`}
                width="361px"
                height="240px"
              />
            </Link>
          </div>
        ) : (
          <div className={classes.itemContainer}>
            <Link to={pikTaskEncodeURI(photo)}>
              <img
                className={classes.image}
                src={encodeURI(getBaseURL().bucket_base_url + getBaseURL().images + photo?.preview)}
                alt={`${photo?.title}`}
                width="361px"
                height="240px"
              />
            </Link>
          </div>
        )}

        <div className={classes.itemFooter}>
          <CardContent className={classes.productTitle}>
            <Link className={classes.titleLink} to={pikTaskEncodeURI(photo)} title={photo?.title}>
              <Typography variant="h3" className={classes.title}>
                {titleLength?.length > 5 ? <>{getWords(5, photo?.title)}...</> : <>{photo?.title}</>}
              </Typography>
            </Link>
          </CardContent>

          <CardContent className={classes.cardFooter}>
            <CardFooter className={classes.cardAuthorInfo}>
              <Link to={`/author/${photo?.username}`} className={classes.avatar}>
                {photo?.avatar ? (
                  <CardMedia
                    component="img"
                    className={classes.authorImage}
                    image={getBaseURL().bucket_base_url + "/" + photo?.avatar}
                    title={photo?.name}
                    width="33px"
                    height="33px"
                    alt={photo?.name}
                  />
                ) : (
                  <AccountCircleIcon className={classes.authorImage} />
                )}
              </Link>

              <Typography paragraph className={classes.profileName} component={Link} to={`/author/${photo?.username}`}>
                {photo?.username}
              </Typography>
            </CardFooter>

            <Typography variant="body1" className={classes.itemStatus}>
              <img className={classes.downloadIcon} src={downloadIcon} alt="Total Download" width="6px" height="10px" />
              {photo?.total_download}
              <FavoriteBorderIcon className={classes.heartIcon} /> {likeCount}
            </Typography>

            <ButtonWrapper>
              <Button className={classes.categoryButton} component={Link} to={pikTaskEncodeURI(photo)}>
                Download
              </Button>
            </ButtonWrapper>
          </CardContent>
        </div>
      </CardWrapper>
      <SignUpModal openAuthModal={openAuthModal} setOpenAuthModal={setOpenAuthModal} />
    </>
  );
};

export default Product;
