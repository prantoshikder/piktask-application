"use client";

import { Button, Card, CircularProgress, Typography } from "@mui/material";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import GetAppIcon from "@mui/icons-material/GetApp";
import PeopleOutlineIcon from "@mui/icons-material/PeopleOutlined";
import PersonOutlineIcon from "@mui/icons-material/PersonOutlined";
import PhotoCameraIcon from "@mui/icons-material/PhotoCamera";
import axios from "axios";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "@/lib/router";
import { toast } from "react-toastify";
import authorPhoto from "../../../../../assets/author.png";
import behanceIcon from "../../../../../assets/icons/behance.svg";
import dribbbleIcon from "../../../../../assets/icons/dribble.svg";
import facebookIcon from "../../../../../assets/icons/facebook.svg";
import instagramIcon from "../../../../../assets/icons/instagram.svg";
import linkedInIcon from "../../../../../assets/icons/linkdin.svg";
import pinterestIcon from "../../../../../assets/icons/pintarest.svg";
import shutterstockIcon from "../../../../../assets/icons/shutterstock.svg";
import twitterIcon from "../../../../../assets/icons/twitter-svg.svg";
import { getBaseURL } from "../../../../../helpers";
import SocialShare from "../../../SocialShare/index";
import CloseAccountModal from "../CloseAccountModal";
import UserSidebarMenu from "../UserSidebarMenu/index";
import useStyles from "./UserSideBar.style";

const UserSideBar = () => {
  const { classes } = useStyles();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);

  const [profilePicture, setProfilePicture] = useState("");
  const [userProfile, setUserProfile] = useState({});
  const [isLoading, setLoading] = useState(true);

  //mobile responsive
  const [menuSate, setMenuSate] = useState({ mobileView: false });
  const { mobileView } = menuSate;

  useEffect(() => {
    const setResponsiveness = () => {
      return window.innerWidth < 769
        ? setMenuSate((prevState) => ({ ...prevState, mobileView: true }))
        : setMenuSate((prevState) => ({ ...prevState, mobileView: false }));
    };
    setResponsiveness();
    window.addEventListener("resize", () => setResponsiveness());
  }, []);

  useEffect(() => {
    const CancelToken = axios.CancelToken;
    const source = CancelToken.source();

    // get user information
    if (user?.isLoggedIn && user?.role === "user") {
      axios
        .get(`${process.env.NEXT_PUBLIC_API_URL}/user/profile`, {
          headers: { cancelToken: source.token, Authorization: user?.token },
        })
        .then(({ data }) => {
          if (data?.status) {
            setUserProfile(data.user);
            setProfilePicture(data.user.avatar);

            dispatch({
              type: "USER_PROFILE",
              payload: {
                ...data?.user,
              },
            });

            setLoading(false);
          }
        })
        .catch((error) => {
          console.log("User profile", error.message);
          setLoading(false);
        });
    }

    return () => source.cancel();
  }, [user?.token, user?.isLoggedIn, user?.role, dispatch]);

  const handleUpdateImage = (e) => {
    e.preventDefault();
    const file = e.target.files[0];
    if (!file?.name?.match(/\.(jpg|jpeg|png|gif)$/) && file !== undefined) {
      toast.error("You can only upload .jpg, .jpeg, .png, .gif etc");
      return;
    }

    const CancelToken = axios.CancelToken;
    const source = CancelToken.source();

    const formData = new FormData();
    formData.append("profile_picture", file);

    const url = `${process.env.NEXT_PUBLIC_API_URL}/profile/profile_picture`;
    if (user?.isLoggedIn && user?.role === "user") {
      axios({
        method: "put",
        url,
        headers: {
          cancelToken: source.token,
          Authorization: user?.token,
          "Content-Type": "multipart/form-data",
        },
        data: formData,
      })
        .then(({ data }) => {
          if (data?.status) {
            toast.success(data?.message);
            setProfilePicture(data?.image);
            localStorage.setItem("profileImage", data?.image);

            dispatch({
              type: "SET_USER",
              payload: {
                ...user,
                avatar: data?.image,
              },
            });
            setLoading(false);
          }
        })
        .catch((error) => {
          console.log("profile image", error);
          setLoading(false);
        });
    }

    return () => source.cancel();
  };

  const socialMedia = [
    {
      socialUrl: userProfile?.facebook,
      socialIcon: facebookIcon,
    },
    {
      socialUrl: userProfile?.behance,
      socialIcon: behanceIcon,
    },
    {
      socialUrl: userProfile?.dribbble,
      socialIcon: dribbbleIcon,
    },
    {
      socialUrl: userProfile?.instagram,
      socialIcon: instagramIcon,
    },
    {
      socialUrl: userProfile?.linkedin,
      socialIcon: linkedInIcon,
    },
    {
      socialUrl: userProfile?.pinterest,
      socialIcon: pinterestIcon,
    },
    {
      socialUrl: userProfile?.shutterstock,
      socialIcon: shutterstockIcon,
    },
    {
      socialUrl: userProfile?.twitter,
      socialIcon: twitterIcon,
    },
  ];

  return (
    <>
      {mobileView ? (
        <div>
          <Button component={Link} to="/user/profile">
            <PersonOutlineIcon />
          </Button>
          <Button component={Link} to="/user/favorites">
            <FavoriteBorderIcon />
          </Button>
          <Button component={Link} to="/user/downloads">
            <GetAppIcon />
          </Button>
          <Button component={Link} to="/user/following">
            <PeopleOutlineIcon />
          </Button>
        </div>
      ) : (
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
            <>
              <Card className={classes.userProfile}>
                <div className={classes.userProfileContent}>
                  <div className={classes.profileImage}>
                    {profilePicture ? (
                      <div>
                        {user?.isLoggedIn && user?.avatar && user?.avatar !== "null" ? (
                          <>
                            {user?.avatar_from === "own" ? (
                              <img className={classes.avatar} src={getBaseURL().bucket_base_url + "/" + user?.avatar} alt={user?.username} />
                            ) : (
                              <img className={classes.avatar} src={user?.avatar} alt={user?.username} />
                            )}
                          </>
                        ) : (
                          <img src={getBaseURL().bucket_base_url + "/" + profilePicture} alt={user?.username} />
                        )}
                      </div>
                    ) : (
                      <img src={authorPhoto} alt={user?.username} />
                    )}
                    <div className={classes.avatarOverlay}>
                      <div className={classes.bgOverlay}>
                        <label htmlFor="upload_photo">
                          <PhotoCameraIcon className={classes.uploadIcon} />
                          <input
                            type="file"
                            name="profile_picture"
                            accept="image/*"
                            id="upload_photo"
                            style={{ display: "none" }}
                            onChange={handleUpdateImage}
                          />
                        </label>
                      </div>
                    </div>
                  </div>

                  <div className={classes.profileInfo}>
                    <Typography variant="h2">{user?.username}</Typography>
                    <Typography>{user?.email}</Typography>
                  </div>

                  <div className={classes.socialIcons}>
                    <SocialShare socials={socialMedia} />
                  </div>
                </div>
              </Card>

              <UserSidebarMenu />

              <CloseAccountModal />
            </>
          )}
        </>
      )}
    </>
  );
};

export default UserSideBar;
