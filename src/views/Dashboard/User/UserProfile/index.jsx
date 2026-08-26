"use client";

import { Button, Container, FormControl, FormControlLabel, Grid, TextField, Typography } from "@/components/ui-kit";
import { Switch } from "@/components/ui-kit";
import axios from "axios";
import React, { lazy, Suspense, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "@/lib/router";
import { toast } from "react-toastify";
import behanceIcon from "../../../../assets/icons/behance.svg";
import dribbbleIcon from "../../../../assets/icons/dribble.svg";
import facebookLogo from "../../../../assets/icons/facebook.svg";
import instagramLogo from "../../../../assets/icons/instagram.svg";
import linkedinLogo from "../../../../assets/icons/linkdin.svg";
import pinterestIcon from "../../../../assets/icons/pintarest.svg";
import shutterstockLogo from "../../../../assets/icons/shutterstock.svg";
import twitterLogo from "../../../../assets/icons/twitter-svg.svg";
import Spacing from "../../../../components/Spacing";
import Header from "../../../../components/ui/Header";
import Loader from "../../../../components/ui/Loader";
import { expiredLoginTime, imageObjSchema } from "../../../../helpers";
import Layout from "../../../../Layout";

const UserSideBar = lazy(() => import("../../../../components/ui/dashboard/user/UserSideBar"));
const Footer = lazy(() => import("../../../../components/ui/Footer"));

const UserProfile = () => {
  const user = useSelector((state) => state.user);
  const userProfile = useSelector((state) => state.userProfile);

  const [userProfileInfo, setUserProfileInfo] = useState({
    name: "",
    username: "",
    email: "",
    location: "",
    job_position: "",
    phone: "",
    website: "",
    shutterstock: "",
    pinterest: "",
    behance: "",
    dribbble: "",
    facebook: "",
    twitter: "",
    instagram: "",
    linkedin: "",
  });

  useEffect(() => {
    setUserProfileInfo({
      name: userProfile?.name || "",
      username: userProfile?.username || "",
      email: userProfile?.email || "",
      location: userProfile?.location || "",
      job_position: userProfile?.job_position || "",
      phone: userProfile?.phone || "",
      website: userProfile?.website || "",
      shutterstock: userProfile?.shutterstock || "",
      pinterest: userProfile?.pinterest || "",
      behance: userProfile?.behance || "",
      dribbble: userProfile?.dribbble || "",
      facebook: userProfile?.facebook || "",
      twitter: userProfile?.twitter || "",
      instagram: userProfile?.instagram || "",
      linkedin: userProfile?.linkedin || "",
    });
  }, [userProfile]);

  const [errors, setErrors] = useState({});
  const [checked, setChecked] = useState(true);

  const handleChange = (event) => {
    setChecked(event.target.checked);
  };

  //Update user profile
  const handleSubmit = (e) => {
    e.preventDefault();

    const CancelToken = axios.CancelToken;
    const source = CancelToken.source();

    const formData = new FormData();
    let emptyFieldCheck = 0;
    if (userProfileInfo.name) {
      formData.append("name", userProfileInfo.name);
      emptyFieldCheck++;
    }
    if (userProfileInfo.location) {
      formData.append("location", userProfileInfo.location);
      emptyFieldCheck++;
    }
    if (userProfileInfo.job_position) {
      formData.append("job_position", userProfileInfo.job_position);
      emptyFieldCheck++;
    }
    if (userProfileInfo.phone) {
      formData.append("phone", userProfileInfo.phone);
      emptyFieldCheck++;
    }
    if (userProfileInfo.website) {
      formData.append("website", userProfileInfo.website);
      emptyFieldCheck++;
    }
    if (userProfileInfo.shutterstock) {
      formData.append("shutterstock", userProfileInfo.shutterstock);
      emptyFieldCheck++;
    }
    if (userProfileInfo.pinterest) {
      formData.append("pinterest", userProfileInfo.pinterest);
      emptyFieldCheck++;
    }
    if (userProfileInfo.behance) {
      formData.append("behance", userProfileInfo.behance);
      emptyFieldCheck++;
    }
    if (userProfileInfo.dribbble) {
      formData.append("dribbble", userProfileInfo.dribbble);
      emptyFieldCheck++;
    }
    if (userProfileInfo.facebook) {
      formData.append("facebook", userProfileInfo.facebook);
      emptyFieldCheck++;
    }
    if (userProfileInfo.twitter) {
      formData.append("twitter", userProfileInfo.twitter);
      emptyFieldCheck++;
    }
    if (userProfileInfo.instagram) {
      formData.append("instagram", userProfileInfo.instagram);
    }
    if (userProfileInfo.linkedin) {
      formData.append("linkedin", userProfileInfo.linkedin);
      emptyFieldCheck++;
    }

    if (user?.isLoggedIn && user?.role === "user" && emptyFieldCheck) {
      const url = `${process.env.NEXT_PUBLIC_API_URL}/user/profile`;
      axios({
        method: "put",
        url,
        cancelToken: source.token,
        headers: {
          Authorization: user.token,
          "Content-Type": "application/json",
        },
        data: formData,
      })
        .then((res) => {
          if (res?.status === 200) {
            toast.success(res.data.message);
            setErrors({});
          }
        })
        .catch((error) => {
          const { errors } = error.response.data;
          setErrors(errors);
          if (error.response.status === 401) {
            expiredLoginTime();
          }
        });
    } else {
      toast.error("Please insert profile info");
    }

    return () => source.cancel();
  };

  useEffect(() => {
    const schemaObj = {
      name: document.title,
      contentUrl: document.location.href,
      acquireLicensePage: document.location.href,
      thumbnailUrl: `${process.env.NEXT_PUBLIC_API_URL}/media_images/company/piktak_logo.jpg`,
    };

    imageObjSchema(schemaObj);
  }, []);

  return (
    <Layout title="UserProfile">
      <Header />

      <Spacing space={{ height: "5rem" }} />

      <Container>
        <Grid container spacing={2}>
          <Suspense fallback={<Loader />}>
            <Grid size={{ xs: 12, sm: 3, md: 3 }} className="max-[576px]:max-w-[100%] max-[576px]:basis-[100%]">
              <UserSideBar />
            </Grid>
          </Suspense>

          <Suspense fallback={<Loader />}>
            <Grid size={{ xs: 12, sm: 9, md: 9 }} className="max-[576px]:max-w-[100%] max-[576px]:basis-[100%]">
              <div className="bg-[white]">
                <div className="flex mb-[2.5rem] justify-between max-[425.95px]:block">
                  <div>
                    <Typography className="text-[#114960] font-[700] p-[3rem] max-[425.95px]:p-[1.5rem_2.5rem]" variant="h4">
                      {/* Connect */}
                      Profile Settings
                    </Typography>
                  </div>
                </div>

                <hr className="border-[0] ml-[3%] w-[94%] h-[.1rem] bg-[rgb(112_112_112_/_38%)]" />

                <form onSubmit={handleSubmit}>
                  <div className="pb-[1rem] shadow-[0_1px_2px_0_rgb(0_0_0_/_10%)]">
                    <Grid className="p-[2rem] max-[425.95px]:p-[1.5rem]" container spacing={0}>
                      <Grid size={{ xs: 12, sm: 6, md: 6 }}>
                        <Typography className="text-[#114960] font-[700] p-[0_0_2rem_1rem]" variant="h4">
                          Personal data
                        </Typography>

                        <div className="p-[1rem]">
                          <TextField
                            fullWidth
                            variant="outlined"
                            label="Real Name"
                            className="mb-[1rem]"
                            name="name"
                            value={userProfileInfo.name}
                            onChange={(e) => setUserProfileInfo({ ...userProfileInfo, name: e.target.value })}
                          />

                          <TextField
                            fullWidth
                            variant="outlined"
                            label="Location"
                            className="mb-[1rem]"
                            name="location"
                            value={userProfileInfo.location}
                            onChange={(e) => setUserProfileInfo({ ...userProfileInfo, location: e.target.value })}
                          />

                          <TextField
                            fullWidth
                            variant="outlined"
                            label="Job Position"
                            className="mb-[1rem]"
                            name="job_position"
                            value={userProfileInfo.job_position}
                            onChange={(e) => setUserProfileInfo({ ...userProfileInfo, job_position: e.target.value })}
                          />

                          <TextField
                            fullWidth
                            variant="outlined"
                            label="Telephone Number"
                            className="mb-[1rem]"
                            name="phone"
                            type="number"
                            inputProps={{
                              inputMode: "numeric",
                              pattern: "[0-9]*",
                            }}
                            value={userProfileInfo.phone}
                            onChange={(e) => setUserProfileInfo({ ...userProfileInfo, phone: e.target.value })}
                          />
                        </div>
                      </Grid>

                      <Grid size={{ xs: 12, sm: 6, md: 6 }}>
                        <Typography className="text-[#114960] font-[700] p-[0_0_2rem_1rem]" variant="h4">
                          Account Information
                        </Typography>

                        <div className="p-[1rem]">
                          <TextField
                            fullWidth
                            variant="outlined"
                            label="User Name"
                            disabled
                            className="mb-[1rem]"
                            name="username"
                            value={userProfileInfo.username}
                          />

                          <TextField
                            fullWidth
                            disabled
                            variant="outlined"
                            label="Email"
                            className="mb-[1rem]"
                            name="email"
                            value={userProfileInfo.email}
                          />

                          <TextField
                            error={!!errors.website}
                            helperText={errors.website}
                            fullWidth
                            variant="outlined"
                            label="Website"
                            className="mb-[1rem]"
                            name="website"
                            value={userProfileInfo.website}
                            onChange={(e) => setUserProfileInfo({ ...userProfileInfo, website: e.target.value })}
                          />

                          <div className="flex items-center justify-between max-[425.95px]:flex-col">
                            <Link to="/reset-password" className="text-[17px] text-[#959595] text-center block no-underline [transition:all_0.3s_linear] hover:text-[#0088f2] hover:underline hover:[transition:all_0.3s_linear] max-[768px]:top-[-.6rem] max-[425.95px]:pb-[1rem]">
                              Change Password
                            </Link>
                            <Button type="submit" className="h-[5.5rem] w-[24rem] text-[#fff] [border:0.5px_solid_#0088f2] bg-[#0088f2] [transition:all_0.3s_linear] hover:bg-[#0773c5]">
                              Save Changes
                            </Button>
                          </div>
                        </div>
                      </Grid>
                    </Grid>

                    {/* Professional Portfolio section start  */}
                    <div className="mb-[2.5rem] justify-between">
                      <Typography className="text-[#114960] font-[700] p-[3rem] max-[425.95px]:p-[1.5rem_2.5rem]" variant="h4">
                        Professional Portfolio
                      </Typography>

                      <hr className="border-[0] ml-[3%] w-[94%] h-[.1rem] bg-[rgb(112_112_112_/_38%)]" />
                    </div>

                    <div className="p-[.6rem_2rem_0rem]">
                      <div className="flex items-center justify-center mb-[2rem] [&_legend]:hidden [&_legend]:w-[0] [&_legend]:h-[0] max-[960px]:w-[100%] max-[960px]:flex-col max-[960px]:mb-[2rem] max-[960px]:mb-[inherit] max-[960px]:last:mb-[0]">
                        <FormControl fullWidth classes={{ fullWidth: "mb-[1rem] mr-[1rem] ml-[1rem] max-[960px]:mb-[2rem] max-[960px]:last:mb-[0]" }} className="relative pl-[8rem] [&_fieldset]:rounded-tl-[0] [&_fieldset]:rounded-bl-[0] [&_fieldset]:[border-left-color:transparent] max-[768.95px]:pb-[1.7rem]">
                          <label htmlFor="shutterstock" className="absolute left-[0] top-[-.5rem] w-[8rem] h-[5.85rem] flex justify-center [border:1px_solid_rgba(0,0,0,0.23)] [&_img]:w-[2.5rem] [&_img]:h-[auto]">
                            <img src={shutterstockLogo.src} alt="Shutterstock Icon" width="25px" height="57px" />
                          </label>
                          <TextField
                            id="shutterstock"
                            error={!!errors.shutterstock}
                            helperText={errors.shutterstock}
                            label="Your Shutterstock Account"
                            variant="outlined"
                            className="[&_label]:text-[#B5B5B5] [&_label]:text-[1.6rem]"
                            placeholder="Your Shutterstock Account"
                            name="shutterstock"
                            value={userProfileInfo.shutterstock}
                            onChange={(e) => setUserProfileInfo({ ...userProfileInfo, shutterstock: e.target.value })}
                          />
                        </FormControl>
                      </div>

                      <div className="flex items-center justify-center mb-[2rem] [&_legend]:hidden [&_legend]:w-[0] [&_legend]:h-[0] max-[960px]:w-[100%] max-[960px]:flex-col max-[960px]:mb-[2rem] max-[960px]:mb-[inherit] max-[960px]:last:mb-[0]">
                        <FormControl fullWidth classes={{ fullWidth: "mb-[1rem] mr-[1rem] ml-[1rem] max-[960px]:mb-[2rem] max-[960px]:last:mb-[0]" }} className="relative pl-[8rem] [&_fieldset]:rounded-tl-[0] [&_fieldset]:rounded-bl-[0] [&_fieldset]:[border-left-color:transparent] max-[768.95px]:pb-[1.7rem]">
                          <label htmlFor="pinterest" className="absolute left-[0] top-[-.5rem] w-[8rem] h-[5.85rem] flex justify-center [border:1px_solid_rgba(0,0,0,0.23)] [&_img]:w-[2.5rem] [&_img]:h-[auto]">
                            <img src={pinterestIcon.src} alt="Pinterest Icon" width="25px" height="57px" />
                          </label>
                          <TextField
                            id="pinterest"
                            error={!!errors.pinterest}
                            helperText={errors.pinterest}
                            label="Your Pinterest Account"
                            variant="outlined"
                            className="[&_label]:text-[#B5B5B5] [&_label]:text-[1.6rem]"
                            placeholder="Your Pinterest Account"
                            name="pinterest"
                            value={userProfileInfo.pinterest}
                            onChange={(e) => setUserProfileInfo({ ...userProfileInfo, pinterest: e.target.value })}
                          />
                        </FormControl>
                      </div>

                      <div className="flex items-center justify-center mb-[2rem] [&_legend]:hidden [&_legend]:w-[0] [&_legend]:h-[0] max-[960px]:w-[100%] max-[960px]:flex-col max-[960px]:mb-[2rem] max-[960px]:mb-[inherit] max-[960px]:last:mb-[0]">
                        <FormControl fullWidth classes={{ fullWidth: "mb-[1rem] mr-[1rem] ml-[1rem] max-[960px]:mb-[2rem] max-[960px]:last:mb-[0]" }} className="relative pl-[8rem] [&_fieldset]:rounded-tl-[0] [&_fieldset]:rounded-bl-[0] [&_fieldset]:[border-left-color:transparent] max-[768.95px]:pb-[1.7rem]">
                          <label htmlFor="behance" className="absolute left-[0] top-[-.5rem] w-[8rem] h-[5.85rem] flex justify-center [border:1px_solid_rgba(0,0,0,0.23)] [&_img]:w-[2.5rem] [&_img]:h-[auto]">
                            <img src={behanceIcon.src} alt="Behance Icon" width="25px" height="57px" />
                          </label>
                          <TextField
                            id="behance"
                            error={!!errors.behance}
                            helperText={errors.behance}
                            label="Your Behance Account"
                            variant="outlined"
                            className="[&_label]:text-[#B5B5B5] [&_label]:text-[1.6rem]"
                            placeholder="Your Behance Account"
                            name="behance"
                            value={userProfileInfo.behance}
                            onChange={(e) => setUserProfileInfo({ ...userProfileInfo, behance: e.target.value })}
                          />
                        </FormControl>
                      </div>

                      <div className="flex items-center justify-center mb-[2rem] [&_legend]:hidden [&_legend]:w-[0] [&_legend]:h-[0] max-[960px]:w-[100%] max-[960px]:flex-col max-[960px]:mb-[2rem] max-[960px]:mb-[inherit] max-[960px]:last:mb-[0]">
                        <FormControl fullWidth classes={{ fullWidth: "mb-[1rem] mr-[1rem] ml-[1rem] max-[960px]:mb-[2rem] max-[960px]:last:mb-[0]" }} className="relative pl-[8rem] [&_fieldset]:rounded-tl-[0] [&_fieldset]:rounded-bl-[0] [&_fieldset]:[border-left-color:transparent] max-[768.95px]:pb-[1.7rem]">
                          <label htmlFor="dribbble" className="absolute left-[0] top-[-.5rem] w-[8rem] h-[5.85rem] flex justify-center [border:1px_solid_rgba(0,0,0,0.23)] [&_img]:w-[2.5rem] [&_img]:h-[auto]">
                            <img src={dribbbleIcon.src} alt="Dribbble Icon" width="25px" height="57px" />
                          </label>
                          <TextField
                            id="dribbble"
                            error={!!errors.dribbble}
                            helperText={errors.dribbble}
                            label="Your Dribbble Account"
                            variant="outlined"
                            className="[&_label]:text-[#B5B5B5] [&_label]:text-[1.6rem]"
                            placeholder="Your Dribbble Account"
                            name="dribbble"
                            value={userProfileInfo.dribbble}
                            onChange={(e) => setUserProfileInfo({ ...userProfileInfo, dribbble: e.target.value })}
                          />
                        </FormControl>
                      </div>
                    </div>

                    <div className="mb-[2.5rem] justify-between">
                      <Typography className="text-[#114960] font-[700] p-[3rem] max-[425.95px]:p-[1.5rem_2.5rem]" variant="h4">
                        Social Link
                      </Typography>

                      <hr className="border-[0] ml-[3%] w-[94%] h-[.1rem] bg-[rgb(112_112_112_/_38%)]" />
                    </div>
                    <div className="p-[.6rem_2rem_0rem]">
                      <div className="flex items-center justify-center mb-[2rem] [&_legend]:hidden [&_legend]:w-[0] [&_legend]:h-[0] max-[960px]:w-[100%] max-[960px]:flex-col max-[960px]:mb-[2rem] max-[960px]:mb-[inherit] max-[960px]:last:mb-[0]">
                        <FormControl fullWidth classes={{ fullWidth: "mb-[1rem] mr-[1rem] ml-[1rem] max-[960px]:mb-[2rem] max-[960px]:last:mb-[0]" }} className="relative pl-[8rem] [&_fieldset]:rounded-tl-[0] [&_fieldset]:rounded-bl-[0] [&_fieldset]:[border-left-color:transparent] max-[768.95px]:pb-[1.7rem]">
                          <label htmlFor="facebook" className="absolute left-[0] top-[-.5rem] w-[8rem] h-[5.85rem] flex justify-center [border:1px_solid_rgba(0,0,0,0.23)] [&_img]:w-[2.5rem] [&_img]:h-[auto]">
                            <img src={facebookLogo.src} alt="Facebook Icon" width="25px" height="57px" />
                          </label>
                          <TextField
                            id="facebook"
                            error={!!errors.facebook}
                            helperText={errors.facebook}
                            label="Your Facebook Account"
                            variant="outlined"
                            className="[&_label]:text-[#B5B5B5] [&_label]:text-[1.6rem]"
                            placeholder="Your Facebook Account"
                            name="facebook"
                            value={userProfileInfo.facebook}
                            onChange={(e) => setUserProfileInfo({ ...userProfileInfo, facebook: e.target.value })}
                          />
                        </FormControl>
                      </div>

                      <div className="flex items-center justify-center mb-[2rem] [&_legend]:hidden [&_legend]:w-[0] [&_legend]:h-[0] max-[960px]:w-[100%] max-[960px]:flex-col max-[960px]:mb-[2rem] max-[960px]:mb-[inherit] max-[960px]:last:mb-[0]">
                        <FormControl fullWidth classes={{ fullWidth: "mb-[1rem] mr-[1rem] ml-[1rem] max-[960px]:mb-[2rem] max-[960px]:last:mb-[0]" }} className="relative pl-[8rem] [&_fieldset]:rounded-tl-[0] [&_fieldset]:rounded-bl-[0] [&_fieldset]:[border-left-color:transparent] max-[768.95px]:pb-[1.7rem]">
                          <label htmlFor="twitter" className="absolute left-[0] top-[-.5rem] w-[8rem] h-[5.85rem] flex justify-center [border:1px_solid_rgba(0,0,0,0.23)] [&_img]:w-[2.5rem] [&_img]:h-[auto]">
                            <img src={twitterLogo.src} alt="Twitter Icon" width="25px" height="57px" />
                          </label>
                          <TextField
                            id="twitter"
                            error={!!errors.twitter}
                            helperText={errors.twitter}
                            label="Your Twitter Account"
                            variant="outlined"
                            className="[&_label]:text-[#B5B5B5] [&_label]:text-[1.6rem]"
                            placeholder="Your Twitter Account"
                            name="twitter"
                            value={userProfileInfo.twitter}
                            onChange={(e) => setUserProfileInfo({ ...userProfileInfo, twitter: e.target.value })}
                          />
                        </FormControl>
                      </div>

                      <div className="flex items-center justify-center mb-[2rem] [&_legend]:hidden [&_legend]:w-[0] [&_legend]:h-[0] max-[960px]:w-[100%] max-[960px]:flex-col max-[960px]:mb-[2rem] max-[960px]:mb-[inherit] max-[960px]:last:mb-[0]">
                        <FormControl fullWidth classes={{ fullWidth: "mb-[1rem] mr-[1rem] ml-[1rem] max-[960px]:mb-[2rem] max-[960px]:last:mb-[0]" }} className="relative pl-[8rem] [&_fieldset]:rounded-tl-[0] [&_fieldset]:rounded-bl-[0] [&_fieldset]:[border-left-color:transparent] max-[768.95px]:pb-[1.7rem]">
                          <label htmlFor="linkedin" className="absolute left-[0] top-[-.5rem] w-[8rem] h-[5.85rem] flex justify-center [border:1px_solid_rgba(0,0,0,0.23)] [&_img]:w-[2.5rem] [&_img]:h-[auto]">
                            <img src={linkedinLogo.src} alt="Linkedin Icon" width="25px" height="57px" />
                          </label>
                          <TextField
                            id="linkedin"
                            error={!!errors.linkedin}
                            helperText={errors.linkedin}
                            label="Your Linkedin Account"
                            variant="outlined"
                            className="[&_label]:text-[#B5B5B5] [&_label]:text-[1.6rem]"
                            placeholder="Your Linkedin Account"
                            name="linkedin"
                            value={userProfileInfo.linkedin}
                            onChange={(e) => setUserProfileInfo({ ...userProfileInfo, linkedin: e.target.value })}
                          />
                        </FormControl>
                      </div>

                      <div className="flex items-center justify-center mb-[2rem] [&_legend]:hidden [&_legend]:w-[0] [&_legend]:h-[0] max-[960px]:w-[100%] max-[960px]:flex-col max-[960px]:mb-[2rem] max-[960px]:mb-[inherit] max-[960px]:last:mb-[0]">
                        <FormControl fullWidth classes={{ fullWidth: "mb-[1rem] mr-[1rem] ml-[1rem] max-[960px]:mb-[2rem] max-[960px]:last:mb-[0]" }} className="relative pl-[8rem] [&_fieldset]:rounded-tl-[0] [&_fieldset]:rounded-bl-[0] [&_fieldset]:[border-left-color:transparent] max-[768.95px]:pb-[1.7rem]">
                          <label htmlFor="instagram" className="absolute left-[0] top-[-.5rem] w-[8rem] h-[5.85rem] flex justify-center [border:1px_solid_rgba(0,0,0,0.23)] [&_img]:w-[2.5rem] [&_img]:h-[auto]">
                            <img src={instagramLogo.src} alt="Instagram Icon" width="25px" height="57px" />
                          </label>
                          <TextField
                            id="instagram"
                            error={!!errors.instagram}
                            helperText={errors.instagram}
                            label="Your Instagram Account"
                            variant="outlined"
                            className="[&_label]:text-[#B5B5B5] [&_label]:text-[1.6rem]"
                            placeholder="Your Instagram Account"
                            name="instagram"
                            value={userProfileInfo.instagram}
                            onChange={(e) => setUserProfileInfo({ ...userProfileInfo, instagram: e.target.value })}
                          />
                        </FormControl>
                      </div>
                    </div>

                    <div className="flex justify-end p-[0_3rem_2rem_0]">
                      <Button className="p-[1rem_2rem] text-[#fff] text-[1.4rem] rounded-[.5rem] bg-[#ACB0C8] mr-[2rem] hover:bg-[rgb(149_154_185)]">Cancel</Button>

                      <Button type="submit" className="p-[1rem_2rem] text-[#fff] text-[1.4rem] rounded-[.5rem] bg-[#0088f2] [transition:all_0.3s_linear] hover:bg-[#0773c5]">
                        Save Changes
                      </Button>
                    </div>

                    <Typography className="p-[0_0_0_3rem] text-[#114960] font-[700] max-[425.95px]:p-[1.5rem]" variant="h4">
                      Notifications
                    </Typography>

                    <div className="flex m-[3rem] p-[2rem_3rem] items-center justify-between [border:0.5px_solid_rgb(0_0_0_/_23%)]">
                      <Typography className="font-[500]">I wish to receive newsletters,promotions and news from Piktask LLC</Typography>
                      <FormControlLabel
                        control={<Switch checked={checked} onChange={handleChange} inputProps={{ "aria-label": "controlled" }} />}
                        label="Primary"
                      />
                    </div>

                    <div className="bg-[#d7d7d76e] m-[3rem] p-[2rem] rounded-[4px] leading-[26px] text-justify">
                      <Typography>
                        Basic information on Data Protection: Piktask LLC stores your data to improve the service and, with your consent, offers news,
                        promotions and raffles, as well as projects and releases from Piktask LLC.
                        <Link to="#" className="ml-[0.5rem] text-[1.5rem] font-[700] text-[#5b5bf1] no-underline">
                          More information
                        </Link>
                      </Typography>
                    </div>
                  </div>
                </form>
              </div>
            </Grid>
          </Suspense>
        </Grid>
      </Container>

      <Spacing space={{ height: "5rem" }} />

      <Suspense fallback={<Loader />}>
        <Footer />
      </Suspense>
    </Layout>
  );
};

export default UserProfile;
