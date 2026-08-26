"use client";

import { makeStyles } from "tss-react/mui";
import { Button } from "@mui/material";
import axios from "axios";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import SignUpModal from "../../../../../views/Authentication/SignUpModal";

const useStyles = makeStyles()((theme) => ({
  authorBtn: {
    ...theme.typography.button,
    marginRight: "2rem",
    padding: "0.5rem 2.5rem",
    fontSize: "1.5rem",

    [theme.breakpoints.down("sm")]: {
      padding: "0.7rem 5rem",
      marginBottom: "2rem",
    },
    [theme.breakpoints.down(480)]: {
      padding: ".4rem 1.8rem",
      fontSize: "1.4rem",
      marginBottom: "2rem",
      marginRight: "0rem",
    },
  },
  followBtn: {
    backgroundColor: theme.palette.primary.main,
    "&:hover": {
      backgroundColor: theme.palette.secondary.main,
    },
  },
}));

const FollowButton = ({ productDetails }) => {
  const { classes } = useStyles();
  const user = useSelector((state) => state.user);

  const [role, setRole] = useState("");
  const [openAuthModal, setOpenAuthModal] = useState(false);

  //Handle follow author
  const handleFollower = (e) => {
    if (!user?.isLoggedIn) {
      setRole(e.target.closest("button").value);
      setOpenAuthModal(true);
    } else if (user?.id !== productDetails?.imageDetails?.user_id && user && user?.isLoggedIn && user?.role === "user") {
      axios
        .post(
          `${process.env.NEXT_PUBLIC_API_URL}/contributor/followers/${productDetails?.imageDetails?.user_id}`,
          {},
          { headers: { Authorization: user?.token } }
        )
        .then((response) => {
          if (response?.status === 200) {
            productDetails?.setFollowing(!productDetails?.isFollowing);
            productDetails?.setLoading(false);
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
  };

  return (
    <>
      {user?.id !== productDetails?.imageDetails?.user_id && (
        <Button className={`${classes.authorBtn} ${classes.followBtn}`} onClick={handleFollower} value="user">
          {!productDetails?.isFollowing ? <>Follow</> : <>Following</>}
        </Button>
      )}
      <SignUpModal openAuthModal={openAuthModal} setOpenAuthModal={setOpenAuthModal} role={role} />
    </>
  );
};

export default FollowButton;
