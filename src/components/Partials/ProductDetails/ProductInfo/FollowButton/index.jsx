"use client";

import { Button } from "@/components/ui-kit";
import axios from "axios";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import SignUpModal from "../../../../../views/Authentication/SignUpModal";



const FollowButton = ({ productDetails }) => {
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
        <Button className="text-[#fff] font-[400] font-['Roboto',sans-serif] capitalize text-[1.5rem] rounded-[3rem] opacity-[1] leading-[1.75] mr-[2rem] p-[0.5rem_2.5rem] max-[959.95px]:p-[0.7rem_5rem] max-[959.95px]:mb-[2rem] max-[479.95px]:p-[.4rem_1.8rem] max-[479.95px]:text-[1.4rem] max-[479.95px]:mb-[2rem] max-[479.95px]:mr-[0rem] bg-[#143340] hover:bg-[#0088f2]" onClick={handleFollower} value="user">
          {!productDetails?.isFollowing ? <>Follow</> : <>Following</>}
        </Button>
      )}
      <SignUpModal openAuthModal={openAuthModal} setOpenAuthModal={setOpenAuthModal} role={role} />
    </>
  );
};

export default FollowButton;
