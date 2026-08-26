"use client";

import { Button, Container, FormControl, FormControlLabel, Grid, TextField, Typography } from "@mui/material";
import Switch from "@mui/material/Switch";
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
import useStyles from "./UserProfile.style";

const UserSideBar = lazy(() => import("../../../../components/ui/dashboard/user/UserSideBar"));
const Footer = lazy(() => import("../../../../components/ui/Footer"));

const UserProfile = () => {
  const { classes } = useStyles();
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
            <Grid size={{ xs: 12, sm: 3, md: 3 }} className={classes.cardItem}>
              <UserSideBar />
            </Grid>
          </Suspense>

          <Suspense fallback={<Loader />}>
            <Grid size={{ xs: 12, sm: 9, md: 9 }} className={classes.cardItem}>
              <div className={classes.userProfileRoot}>
                <div className={classes.headingWrapper}>
                  <div>
                    <Typography className={classes.settingsFormTitle} variant="h4">
                      {/* Connect */}
                      Profile Settings
                    </Typography>
                  </div>
                </div>

                <hr className={classes.separator} />

                <form onSubmit={handleSubmit} className={classes.selectPeriodFrom}>
                  <div className={classes.cardRoot}>
                    <Grid className={classes.profileInfoField} container spacing={0}>
                      <Grid size={{ xs: 12, sm: 6, md: 6 }}>
                        <Typography className={classes.personalInfoTitle} variant="h4">
                          Personal data
                        </Typography>

                        <div className={classes.personalDataField}>
                          <TextField
                            fullWidth
                            variant="outlined"
                            label="Real Name"
                            className={classes.formControl}
                            name="name"
                            value={userProfileInfo.name}
                            onChange={(e) => setUserProfileInfo({ ...userProfileInfo, name: e.target.value })}
                          />

                          <TextField
                            fullWidth
                            variant="outlined"
                            label="Location"
                            className={classes.formControl}
                            name="location"
                            value={userProfileInfo.location}
                            onChange={(e) => setUserProfileInfo({ ...userProfileInfo, location: e.target.value })}
                          />

                          <TextField
                            fullWidth
                            variant="outlined"
                            label="Job Position"
                            className={classes.formControl}
                            name="job_position"
                            value={userProfileInfo.job_position}
                            onChange={(e) => setUserProfileInfo({ ...userProfileInfo, job_position: e.target.value })}
                          />

                          <TextField
                            fullWidth
                            variant="outlined"
                            label="Telephone Number"
                            className={classes.formControl}
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
                        <Typography className={classes.accountInfoTitle} variant="h4">
                          Account Information
                        </Typography>

                        <div className={classes.personalDataField}>
                          <TextField
                            fullWidth
                            variant="outlined"
                            label="User Name"
                            disabled
                            className={classes.formControl}
                            name="username"
                            value={userProfileInfo.username}
                          />

                          <TextField
                            fullWidth
                            disabled
                            variant="outlined"
                            label="Email"
                            className={classes.formControl}
                            name="email"
                            value={userProfileInfo.email}
                          />

                          <TextField
                            error={!!errors.website}
                            helperText={errors.website}
                            fullWidth
                            variant="outlined"
                            label="Website"
                            className={classes.formControl}
                            name="website"
                            value={userProfileInfo.website}
                            onChange={(e) => setUserProfileInfo({ ...userProfileInfo, website: e.target.value })}
                          />

                          <div className={classes.dataChangeBtn}>
                            <Link to="/reset-password" className={classes.passwordResetLink}>
                              Change Password
                            </Link>
                            <Button type="submit" className={classes.profileInfoSaveBtn}>
                              Save Changes
                            </Button>
                          </div>
                        </div>
                      </Grid>
                    </Grid>

                    {/* Professional Portfolio section start  */}
                    <div className={classes.portfolioHeadingWrapper}>
                      <Typography className={classes.settingsFormTitle} variant="h4">
                        Professional Portfolio
                      </Typography>

                      <hr className={classes.separator} />
                    </div>

                    <div className={classes.cardWrapper}>
                      <div className={`${classes.fieldsGroup} ${classes.linkField}`}>
                        <FormControl fullWidth classes={{ fullWidth: classes.fullWidth }} className={classes.portfolioLink}>
                          <label htmlFor="shutterstock" className={classes.portfolioIconWrapper}>
                            <img src={shutterstockLogo} alt="Shutterstock Icon" width="25px" height="57px" />
                          </label>
                          <TextField
                            id="shutterstock"
                            error={!!errors.shutterstock}
                            helperText={errors.shutterstock}
                            label="Your Shutterstock Account"
                            variant="outlined"
                            className={`${classes.inputField}`}
                            placeholder="Your Shutterstock Account"
                            name="shutterstock"
                            value={userProfileInfo.shutterstock}
                            onChange={(e) => setUserProfileInfo({ ...userProfileInfo, shutterstock: e.target.value })}
                          />
                        </FormControl>
                      </div>

                      <div className={`${classes.fieldsGroup} ${classes.linkField}`}>
                        <FormControl fullWidth classes={{ fullWidth: classes.fullWidth }} className={classes.portfolioLink}>
                          <label htmlFor="pinterest" className={classes.portfolioIconWrapper}>
                            <img src={pinterestIcon} alt="Pinterest Icon" width="25px" height="57px" />
                          </label>
                          <TextField
                            id="pinterest"
                            error={!!errors.pinterest}
                            helperText={errors.pinterest}
                            label="Your Pinterest Account"
                            variant="outlined"
                            className={`${classes.inputField}`}
                            placeholder="Your Pinterest Account"
                            name="pinterest"
                            value={userProfileInfo.pinterest}
                            onChange={(e) => setUserProfileInfo({ ...userProfileInfo, pinterest: e.target.value })}
                          />
                        </FormControl>
                      </div>

                      <div className={`${classes.fieldsGroup} ${classes.linkField}`}>
                        <FormControl fullWidth classes={{ fullWidth: classes.fullWidth }} className={classes.portfolioLink}>
                          <label htmlFor="behance" className={classes.portfolioIconWrapper}>
                            <img src={behanceIcon} alt="Behance Icon" width="25px" height="57px" />
                          </label>
                          <TextField
                            id="behance"
                            error={!!errors.behance}
                            helperText={errors.behance}
                            label="Your Behance Account"
                            variant="outlined"
                            className={`${classes.inputField}`}
                            placeholder="Your Behance Account"
                            name="behance"
                            value={userProfileInfo.behance}
                            onChange={(e) => setUserProfileInfo({ ...userProfileInfo, behance: e.target.value })}
                          />
                        </FormControl>
                      </div>

                      <div className={`${classes.fieldsGroup} ${classes.linkField}`}>
                        <FormControl fullWidth classes={{ fullWidth: classes.fullWidth }} className={classes.portfolioLink}>
                          <label htmlFor="dribbble" className={classes.portfolioIconWrapper}>
                            <img src={dribbbleIcon} alt="Dribbble Icon" width="25px" height="57px" />
                          </label>
                          <TextField
                            id="dribbble"
                            error={!!errors.dribbble}
                            helperText={errors.dribbble}
                            label="Your Dribbble Account"
                            variant="outlined"
                            className={`${classes.inputField}`}
                            placeholder="Your Dribbble Account"
                            name="dribbble"
                            value={userProfileInfo.dribbble}
                            onChange={(e) => setUserProfileInfo({ ...userProfileInfo, dribbble: e.target.value })}
                          />
                        </FormControl>
                      </div>
                    </div>

                    <div className={classes.socialHeadingWrapper}>
                      <Typography className={classes.settingsFormTitle} variant="h4">
                        Social Link
                      </Typography>

                      <hr className={classes.separator} />
                    </div>
                    <div className={classes.cardWrapper}>
                      <div className={`${classes.fieldsGroup} ${classes.linkField}`}>
                        <FormControl fullWidth classes={{ fullWidth: classes.fullWidth }} className={classes.portfolioLink}>
                          <label htmlFor="facebook" className={classes.portfolioIconWrapper}>
                            <img src={facebookLogo} className={classes.facebookIcon} alt="Facebook Icon" width="25px" height="57px" />
                          </label>
                          <TextField
                            id="facebook"
                            error={!!errors.facebook}
                            helperText={errors.facebook}
                            label="Your Facebook Account"
                            variant="outlined"
                            className={`${classes.inputField}`}
                            placeholder="Your Facebook Account"
                            name="facebook"
                            value={userProfileInfo.facebook}
                            onChange={(e) => setUserProfileInfo({ ...userProfileInfo, facebook: e.target.value })}
                          />
                        </FormControl>
                      </div>

                      <div className={`${classes.fieldsGroup} ${classes.linkField}`}>
                        <FormControl fullWidth classes={{ fullWidth: classes.fullWidth }} className={classes.portfolioLink}>
                          <label htmlFor="twitter" className={classes.portfolioIconWrapper}>
                            <img src={twitterLogo} alt="Twitter Icon" width="25px" height="57px" />
                          </label>
                          <TextField
                            id="twitter"
                            error={!!errors.twitter}
                            helperText={errors.twitter}
                            label="Your Twitter Account"
                            variant="outlined"
                            className={`${classes.inputField}`}
                            placeholder="Your Twitter Account"
                            name="twitter"
                            value={userProfileInfo.twitter}
                            onChange={(e) => setUserProfileInfo({ ...userProfileInfo, twitter: e.target.value })}
                          />
                        </FormControl>
                      </div>

                      <div className={`${classes.fieldsGroup} ${classes.linkField}`}>
                        <FormControl fullWidth classes={{ fullWidth: classes.fullWidth }} className={classes.portfolioLink}>
                          <label htmlFor="linkedin" className={classes.portfolioIconWrapper}>
                            <img src={linkedinLogo} alt="Linkedin Icon" width="25px" height="57px" />
                          </label>
                          <TextField
                            id="linkedin"
                            error={!!errors.linkedin}
                            helperText={errors.linkedin}
                            label="Your Linkedin Account"
                            variant="outlined"
                            className={`${classes.inputField}`}
                            placeholder="Your Linkedin Account"
                            name="linkedin"
                            value={userProfileInfo.linkedin}
                            onChange={(e) => setUserProfileInfo({ ...userProfileInfo, linkedin: e.target.value })}
                          />
                        </FormControl>
                      </div>

                      <div className={`${classes.fieldsGroup} ${classes.linkField}`}>
                        <FormControl fullWidth classes={{ fullWidth: classes.fullWidth }} className={classes.portfolioLink}>
                          <label htmlFor="instagram" className={classes.portfolioIconWrapper}>
                            <img src={instagramLogo} alt="Instagram Icon" width="25px" height="57px" />
                          </label>
                          <TextField
                            id="instagram"
                            error={!!errors.instagram}
                            helperText={errors.instagram}
                            label="Your Instagram Account"
                            variant="outlined"
                            className={`${classes.inputField}`}
                            placeholder="Your Instagram Account"
                            name="instagram"
                            value={userProfileInfo.instagram}
                            onChange={(e) => setUserProfileInfo({ ...userProfileInfo, instagram: e.target.value })}
                          />
                        </FormControl>
                      </div>
                    </div>

                    <div className={classes.buttonGroup}>
                      <Button className={`${classes.settingsBtn} ${classes.restoreBtn}`}>Cancel</Button>

                      <Button type="submit" className={`${classes.settingsBtn} ${classes.saveBtn}`}>
                        Save Changes
                      </Button>
                    </div>

                    <Typography className={classes.notification} variant="h4">
                      Notifications
                    </Typography>

                    <div className={classes.getNews}>
                      <Typography className={classes.getNewsTitle}>I wish to receive newsletters,promotions and news from Piktask LLC</Typography>
                      <FormControlLabel
                        control={<Switch checked={checked} onChange={handleChange} inputProps={{ "aria-label": "controlled" }} />}
                        label="Primary"
                      />
                    </div>

                    <div className={classes.basicInfo}>
                      <Typography>
                        Basic information on Data Protection: Piktask LLC stores your data to improve the service and, with your consent, offers news,
                        promotions and raffles, as well as projects and releases from Piktask LLC.
                        <Link to="#" className={classes.moreInfo}>
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
