"use client";

import { Button, Tooltip } from "@/components/ui-kit";
import { HeartFilled as FavoriteIcon } from "@ant-design/icons";
import axios from "axios";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import likeIcon from "../../../../../assets/icons/likeIcon.svg";
import SignUpModal from "../../../../../views/Authentication/SignUpModal";



const FavouriteButton = ({ productDetails }) => {
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
            <Button className="p-[1rem_1.5rem] bg-[#143340] hover:bg-[#0088f2] [&_img]:w-[2.7rem] max-[479.95px]:p-[0.4rem_1.5rem]" onClick={handleLikeBtn} value="user">
              <img src={likeIcon.src} alt="like Button" width="27px" height="24px" />
            </Button>
          ) : (
            <Tooltip title="You already liked the image." placement="top" arrow classes={{ tooltip: "text-[1.3rem]" }}>
              <Button className="p-[1rem_1.5rem] bg-[#E1E3EB] [&_svg]:text-[#0088f2] [&_svg]:text-[2.9rem] max-[479.95px]:p-[0.4rem_1.5rem]" onClick={handleLikeBtn}>
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
