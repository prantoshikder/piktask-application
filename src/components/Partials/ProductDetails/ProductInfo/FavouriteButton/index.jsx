"use client";

import { makeStyles } from "tss-react/mui";
import { Button, Tooltip } from "@mui/material";
import FavoriteIcon from "@mui/icons-material/Favorite";
import axios from "axios";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import likeIcon from "../../../../../assets/icons/likeIcon.svg";
import SignUpModal from "../../../../../views/Authentication/SignUpModal";

const useStyles = makeStyles()((theme) => ({
  likeBtn: {
    padding: "1rem 1.5rem",
    backgroundColor: theme.palette.primary.main,
    "&:hover": {
      backgroundColor: theme.palette.secondary.main,
    },
    "& img": {
      width: "2.7rem",
    },

    [theme.breakpoints.down(480)]: {
      padding: "0.4rem 1.5rem",
    },
  },
  tooltip: {
    fontSize: "1.3rem",
  },
  likedBtn: {
    padding: "1rem 1.5rem",
    backgroundColor: "#E1E3EB",
    "& svg": {
      color: "#0088f2",
      fontSize: "2.9rem",
    },

    [theme.breakpoints.down(480)]: {
      padding: "0.4rem 1.5rem",
    },
  },
}));

const FavouriteButton = ({ productDetails }) => {
  const { classes } = useStyles();
  const user = useSelector((state) => state.user);

  const [role, setRole] = useState("");
  const [openAuthModal, setOpenAuthModal] = useState(false);

  //Handle like image
  const handleLikeBtn = (e) => {
    if (!user?.isLoggedIn) {
      setRole(e.target.closest("button").value);
      setOpenAuthModal(true);
    } else if (user?.id !== productDetails?.imageDetails?.user_id && user && user?.isLoggedIn && user?.role === "user") {
      axios
        .post(`${process.env.NEXT_PUBLIC_API_URL}/images/${productDetails?.imageID}/like`, {}, { headers: { Authorization: user?.token } })
        .then(({ data }) => {
          if (data?.status) {
            productDetails?.setLike(true);
            productDetails?.setLoading(false);
          } else if (!data?.status) {
            toast.error(data.message);
            productDetails?.setLike(true);
            productDetails?.setLoading(false);
          } else {
            console.log("Something wrong with the like");
            productDetails?.setLoading(false);
          }
        })
        .catch((error) => console.log("Like error: ", error));
    } else {
      if (user?.isLoggedIn && user?.role === "contributor") {
        toast.error("Please, login as a user", { autoClose: 2200 });
        setOpenAuthModal(true);
      } else {
        toast.error("You can't like yourself", { autoClose: 2000 });
      }
    }
  };
  return (
    <div>
      {user?.id !== productDetails?.imageDetails?.user_id && (
        <>
          {!productDetails?.isLike ? (
            <Button className={classes.likeBtn} onClick={handleLikeBtn} value="user">
              <img src={likeIcon} alt="like Button" width="27px" height="24px" />
            </Button>
          ) : (
            <Tooltip title="You already liked the image." placement="top" arrow classes={{ tooltip: classes.tooltip }}>
              <Button className={classes.likedBtn} onClick={handleLikeBtn}>
                <FavoriteIcon />
              </Button>
            </Tooltip>
          )}
        </>
      )}
      <SignUpModal openAuthModal={openAuthModal} setOpenAuthModal={setOpenAuthModal} role={role} />
    </div>
  );
};

export default FavouriteButton;
