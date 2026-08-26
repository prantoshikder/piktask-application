"use client";

import { Button, Card, FormControl, Select, TextField, Typography, useMediaQuery } from "@mui/material";
import PhotoCameraIcon from "@mui/icons-material/PhotoCamera";
import axios from "axios";
import React, { lazy, Suspense, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import behanceIcon from "../../../../assets/icons/behance.svg";
import dribbbleIcon from "../../../../assets/icons/dribble.svg";
import facebookIcon from "../../../../assets/icons/facebook.svg";
import instagramIcon from "../../../../assets/icons/instagram.svg";
import linkedinIcon from "../../../../assets/icons/linkdin.svg";
import pinterestIcon from "../../../../assets/icons/pintarest.svg";
import shutterstockIcon from "../../../../assets/icons/shutterstock.svg";
import twitterIcon from "../../../../assets/icons/twitter-svg.svg";
import authorImage from "../../../../assets/user/userProfile.jpg";
import AdminHeader from "../../../../components/ui/dashboard/contributor/Header";
import Sidebar from "../../../../components/ui/dashboard/contributor/Sidebar";
import Loader from "../../../../components/ui/Loader";
import allCountry from "../../../../data/countryList.json";
import { expiredLoginTime, getBaseURL } from "../../../../helpers/index";
import Layout from "../../../../Layout";
import useStyles from "./AccountSettings.styles";

const Footer = lazy(() => import("../../../../components/ui/Footer"));

const AccountSettings = () => {
  const { classes } = useStyles();
  const dispatch = useDispatch();
  const mobileView = useMediaQuery("(max-width:769px)");
  const user = useSelector((state) => state.user);

  const [profilePicture, setProfilePicture] = useState("");
  const [paymentMethod, setPaymentMethod] = useState([]);
  const [payment, setPayment] = useState("");
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [locationAddress, setLocationAddress] = useState("");
  const [billingsAddress, setBillingsAddress] = useState("");
  const [zipCode, setZipCode] = useState("");
  const [countryName, setCountryName] = useState("");
  const [city, setCity] = useState("");
  const [phone, setPhone] = useState("");
  const [website, setWebsite] = useState("");
  const [shutterstock, setShutterstock] = useState("");
  const [pinterest, setPinterest] = useState("");
  const [behance, setBehance] = useState("");
  const [dribbble, setDribbble] = useState("");
  const [facebook, setFacebook] = useState("");
  const [twitter, setTwitter] = useState("");
  const [linkedin, setLinkedin] = useState("");
  const [instagram, setInstagram] = useState("");
  const [isLoading, setLoading] = useState(true);

  //bank info state
  const [accountName, setAccountName] = useState("");
  const [accountNumber, setAccountNumber] = useState("");
  const [routingNumber, setRoutingNumber] = useState("");
  const [branch, setBranch] = useState("");
  const [bankCountry, setBankCountry] = useState("");
  const [swiftCode, setSwiftCode] = useState("");
  const [paypalAccount, setPaypalAccount] = useState("");
  const [payoneerAccount, setPayoneerAccount] = useState("");

  const [countries, setCountries] = useState([]);

  const handleCountries = () => {
    setCountries(allCountry.countries);
  };

  // get contributor information
  useEffect(() => {
    const CancelToken = axios.CancelToken;
    const source = CancelToken.source();

    if (user?.isLoggedIn && user?.role === "contributor") {
      axios
        .get(`${process.env.NEXT_PUBLIC_API_URL}/contributor/profile`, {
          cancelToken: source.token,
          headers: { Authorization: user?.token },
        })
        .then(({ data }) => {
          if (data?.status) {
            setProfilePicture(data?.user.avatar);
            setName(data?.user.name);
            setUsername(data?.user.username);
            setEmail(data?.user.email);
            setLocationAddress(data?.user.location);
            setPhone(data?.user.phone);
            setWebsite(data?.user.website);
            setCountryName(data?.user.country_name);
            setCity(data?.user.city);
            setZipCode(data?.user.zip_code);
            setBillingsAddress(data?.user.billings_address);
            setAccountName(data?.user.account_name);
            setAccountNumber(data?.user.account_number);
            setRoutingNumber(data?.user.routing_number);
            setBranch(data?.user.branch);
            setBankCountry(data?.user.bank_country);
            setSwiftCode(data?.user.swift_code);
            setPaypalAccount(data?.user.paypal_account);
            setPayoneerAccount(data?.user.payoneer_account);
            setShutterstock(data?.user.shutterstock);
            setPinterest(data?.user.pinterest);
            setBehance(data?.user.behance);
            setDribbble(data?.user.dribbble);
            setFacebook(data?.user.facebook);
            setTwitter(data?.user.twitter);
            setLinkedin(data?.user.linkedin);
            setInstagram(data?.user.instagram);
            setPayment(data?.user.payment_gateway);
            setLoading(false);
          }
        })
        .catch((error) => {
          console.log(error.message);
          setLoading(false);
          if (error.response.status === 401) {
            expiredLoginTime();
          }
        });
    }

    return () => source.cancel();
  }, [user?.token, user?.isLoggedIn, user?.role]);

  //Update contributor profile
  const handleSubmit = (e) => {
    e.preventDefault();

    const CancelToken = axios.CancelToken;
    const source = CancelToken.source();

    const formData = new FormData();
    let checkEmptyField = 0;
    if (name) {
      formData.append("name", name);
      checkEmptyField++;
    }
    if (locationAddress) {
      formData.append("location", locationAddress);
      checkEmptyField++;
    }
    if (phone) {
      formData.append("phone", phone);
      checkEmptyField++;
    }
    if (website) {
      formData.append("website", website);
      checkEmptyField++;
    }
    if (billingsAddress) {
      formData.append("billings_address", billingsAddress);
      checkEmptyField++;
    }
    if (countryName) {
      formData.append("country_name", countryName);
      checkEmptyField++;
    }
    if (city) {
      formData.append("city", city);
      checkEmptyField++;
    }
    if (zipCode) {
      formData.append("zip_code", zipCode);
      checkEmptyField++;
    }
    if (accountName) {
      formData.append("account_name", accountName);
      checkEmptyField++;
    }
    if (accountNumber) {
      formData.append("account_number", accountNumber);
      checkEmptyField++;
    }
    if (routingNumber) {
      formData.append("routing_number", routingNumber);
      checkEmptyField++;
    }
    if (branch) {
      formData.append("branch", branch);
      checkEmptyField++;
    }
    if (bankCountry) {
      formData.append("bank_country", bankCountry);
      checkEmptyField++;
    }
    if (swiftCode) {
      formData.append("swift_code", swiftCode);
      checkEmptyField++;
    }
    if (paypalAccount) {
      formData.append("paypal_account", paypalAccount);
      checkEmptyField++;
    }
    if (payoneerAccount) {
      formData.append("payoneer_account", payoneerAccount);
      checkEmptyField++;
    }
    if (shutterstock) {
      formData.append("shutterstock", shutterstock);
      checkEmptyField++;
    }
    if (pinterest) {
      formData.append("pinterest", pinterest);
      checkEmptyField++;
    }
    if (behance) {
      formData.append("behance", behance);
      checkEmptyField++;
    }
    if (dribbble) {
      formData.append("dribbble", dribbble);
      checkEmptyField++;
    }
    if (facebook) {
      formData.append("facebook", facebook);
      checkEmptyField++;
    }
    if (twitter) {
      formData.append("twitter", twitter);
      checkEmptyField++;
    }
    if (instagram) {
      formData.append("instagram", instagram);
      checkEmptyField++;
    }
    if (linkedin) {
      formData.append("linkedin", linkedin);
      checkEmptyField++;
    }
    if (payment) {
      formData.append("payment_gateway", payment);
      checkEmptyField++;
    }

    if (checkEmptyField) {
      const url = `${process.env.NEXT_PUBLIC_API_URL}/contributor/profile`;
      axios({
        method: "put",
        url,
        cancelToken: source.token,
        headers: {
          Authorization: user?.token,
          "Content-Type": "application/json",
        },
        data: formData,
      })
        .then((res) => {
          if (res?.status === 200) {
            toast.success(res.data.message);
          }
        })
        .catch((error) => {
          console.log("Contributor profile", error);
          if (error.response.status === 401) {
            expiredLoginTime();
          }
        });
    } else {
      toast.error("Please insert profile info", { autoClose: 2200 });
    }

    return () => source.cancel();
  };

  //payment getWay
  useEffect(() => {
    const CancelToken = axios.CancelToken;
    const source = CancelToken.source();

    if (user?.isLoggedIn && user?.role === "contributor") {
      axios
        .get(`${process.env.NEXT_PUBLIC_API_URL}/payment`, {
          cancelToken: source.token,
          headers: { Authorization: user?.token },
        })
        .then(({ data }) => {
          if (data?.status) {
            setPaymentMethod(data.gateways);
          }
        })
        .catch((error) => {
          console.log(error.message);
          if (error.response.status === 401) {
            expiredLoginTime();
          }
        });
    }

    return () => source.cancel();
  }, [user.token, user?.isLoggedIn, user?.role]);

  const handleUpdateImage = (e) => {
    e.preventDefault();
    const file = e.target.files[0];
    if (!file?.name?.match(/\.(jpg|jpeg|png|gif)$/) && file !== undefined) {
      toast.error("You can only upload .jpg, .jpeg, .png, .gif etc");
      return;
    }

    const formData = new FormData();
    formData.append("profile_picture", file);

    const CancelToken = axios.CancelToken;
    const source = CancelToken.source();

    const url = `${process.env.NEXT_PUBLIC_API_URL}/profile/profile_picture`;
    if (user?.isLoggedIn && user?.role === "contributor") {
      axios({
        method: "put",
        url,
        cancelToken: source.token,
        headers: {
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
          console.log(error);
          setLoading(false);
          if (error.response.status === 401) {
            expiredLoginTime();
          }
        });
    }

    return () => source.cancel();
  };

  return (
    <Layout title="Profile">
      <div className={classes.adminRoot}>
        {mobileView ? null : <Sidebar className={classes.adminSidebar} />}

        <main className={classes.content}>
          <AdminHeader />

          <Suspense fallback={<Loader />}>
            <div className={classes.profileContentWrapper}>
              <div className={classes.settingsHero}>
                <div className={classes.authorProfileImage}>
                  {profilePicture ? (
                    <div>
                      <img src={getBaseURL().bucket_base_url + "/" + profilePicture} alt={user?.username} width="90px" height="90px" />
                    </div>
                  ) : (
                    <img src={authorImage} alt={user?.username} width="90px" height="90px" />
                  )}

                  <div className={classes.avatarOverlay}>
                    <div className={classes.bgOverlay}>
                      <label htmlFor="upload_photo">
                        <PhotoCameraIcon className={classes.uploadIcon} />
                        <input type="file" name="profile_picture" accept="image/*" id="upload_photo" style={{ display: "none" }} onChange={handleUpdateImage} />
                      </label>
                    </div>
                  </div>
                </div>
              </div>
              {/* Ends Hero */}

              <div className={classes.settingsFormWrapper}>
                <form onSubmit={handleSubmit} className={classes.selectPeriodFrom}>
                  <Card className={classes.cardRoot}>
                    <div className={classes.headingWrapper}>
                      <Typography className={classes.settingsFormTitle} variant="h4">
                        Personal Information
                      </Typography>
                      <hr className={classes.seperator} />
                    </div>

                    <div className={classes.cardWrapper}>
                      <div className={classes.fieldsGroup}>
                        <FormControl fullWidth classes={{ fullWidth: classes.fullWidth }}>
                          <TextField
                            id="name"
                            label="Name"
                            variant="outlined"
                            className={`${classes.inputField}`}
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                          />
                        </FormControl>

                        <FormControl fullWidth classes={{ fullWidth: classes.fullWidth }} className={classes.lastField}>
                          <TextField id="username" label="User Name" variant="outlined" className={`${classes.inputField}`} value={username} disabled />
                        </FormControl>
                      </div>

                      <div className={classes.fieldsGroup}>
                        <FormControl fullWidth classes={{ fullWidth: classes.fullWidth }}>
                          <TextField id="email" label="Email" variant="outlined" className={`${classes.inputField}`} value={email} />
                        </FormControl>

                        <FormControl fullWidth classes={{ fullWidth: classes.fullWidth }}>
                          <TextField
                            fullWidth
                            variant="outlined"
                            label="Website"
                            className={`${classes.inputField}`}
                            name="website"
                            value={website}
                            onChange={(e) => setWebsite(e.target.value)}
                          />
                        </FormControl>
                      </div>

                      <div className={classes.fieldsGroup}>
                        <FormControl fullWidth classes={{ fullWidth: classes.fullWidth }} className={classes.lastField}>
                          <TextField
                            id="phonenumber"
                            label="Phone Number"
                            type="number"
                            variant="outlined"
                            className={`${classes.inputField}`}
                            value={phone}
                            onChange={(e) => setPhone(e.target.value)}
                          />
                        </FormControl>

                        <FormControl variant="outlined" fullWidth classes={{ fullWidth: classes.fullWidth }}>
                          <TextField
                            SelectProps={{
                              native: true,
                            }}
                            select
                            variant="outlined"
                            label="Country"
                            className={`${classes.inputField}`}
                            value={countryName}
                            onChange={(e) => setCountryName(e.target.value)}
                            onClick={handleCountries}
                          >
                            {countries.length === 0 && (
                              <>{countryName ? <option value={countryName}>{countryName}</option> : <option value="Bangladesh">Bangladesh</option>}</>
                            )}
                            {countries.map((option, index) => (
                              <option key={index} value={option.country}>
                                {option.country}
                              </option>
                            ))}
                          </TextField>
                        </FormControl>
                      </div>

                      <div className={classes.fieldsGroup}>
                        <FormControl fullWidth classes={{ fullWidth: classes.fullWidth }}>
                          <TextField
                            id="city"
                            label="Your State/City"
                            variant="outlined"
                            className={`${classes.inputField}`}
                            value={city}
                            onChange={(e) => setCity(e.target.value)}
                          ></TextField>
                        </FormControl>

                        <FormControl fullWidth classes={{ fullWidth: classes.fullWidth }} className={classes.lastField}>
                          <TextField
                            id="postalcode"
                            label="Zip/Postal Code"
                            variant="outlined"
                            className={`${classes.inputField}`}
                            value={zipCode}
                            onChange={(e) => setZipCode(e.target.value)}
                          />
                        </FormControl>
                      </div>

                      <div className={classes.fieldsGroup}>
                        <FormControl fullWidth classes={{ fullWidth: classes.fullWidth }}>
                          <TextField
                            id="address"
                            label="Current Address"
                            variant="outlined"
                            className={`${classes.inputField}`}
                            value={locationAddress}
                            onChange={(e) => setLocationAddress(e.target.value)}
                          />
                        </FormControl>

                        <FormControl fullWidth classes={{ fullWidth: classes.fullWidth }} className={classes.lastField}>
                          <TextField
                            id="billingaddress"
                            label="Billing Address"
                            variant="outlined"
                            className={`${classes.inputField}`}
                            value={billingsAddress}
                            onChange={(e) => setBillingsAddress(e.target.value)}
                          />
                        </FormControl>
                      </div>
                    </div>
                    {/* Card Wrapper ends */}
                  </Card>

                  <Card className={classes.cardRoot}>
                    <div className={classes.headingWrapper}>
                      <Typography className={classes.settingsFormTitle} variant="h4">
                        Add Payment Method
                      </Typography>
                      <hr className={classes.seperator} />
                    </div>

                    <div className={classes.cardWrapper}>
                      <div className={classes.fieldsGroup}>
                        <FormControl variant="outlined" fullWidth classes={{ fullWidth: classes.fullWidth }}>
                          <Select native value={payment} onChange={(e) => setPayment(e.target.value)} className={classes.selectArea}>
                            {paymentMethod ? (
                              paymentMethod?.map((paymentValue, index) => (
                                <option key={index} value={paymentValue.name}>
                                  {paymentValue.name}
                                </option>
                              ))
                            ) : (
                              <option>PayPal</option>
                            )}
                          </Select>
                        </FormControl>

                        {payment === "PayPal" && (
                          <FormControl fullWidth classes={{ fullWidth: classes.fullWidth }}>
                            <TextField
                              fullWidth
                              variant="outlined"
                              label="Paypal Email"
                              name="paypalEmail"
                              className={`${classes.inputField}`}
                              value={paypalAccount}
                              onChange={(e) => setPaypalAccount(e.target.value)}
                            />
                          </FormControl>
                        )}

                        {payment === "Payoneer" && (
                          <FormControl fullWidth classes={{ fullWidth: classes.fullWidth }}>
                            <TextField
                              fullWidth
                              variant="outlined"
                              label="Payoneer Email"
                              name="payoneerEmail"
                              className={`${classes.inputField}`}
                              value={payoneerAccount}
                              onChange={(e) => setPayoneerAccount(e.target.value)}
                            />
                          </FormControl>
                        )}

                        {payment === "Bank" && (
                          <FormControl fullWidth classes={{ fullWidth: classes.fullWidth }}>
                            <TextField
                              id="name"
                              label="Account Name"
                              variant="outlined"
                              className={`${classes.inputField}`}
                              placeholder="Account Name"
                              value={accountName}
                              onChange={(e) => setAccountName(e.target.value)}
                            />
                          </FormControl>
                        )}
                      </div>

                      {payment === "Bank" && (
                        <div>
                          <div className={classes.fieldsGroup}>
                            <FormControl fullWidth classes={{ fullWidth: classes.fullWidth }} className={classes.inputImage}>
                              <TextField
                                type="number"
                                id="accountNumber"
                                label="Account Number"
                                variant="outlined"
                                className={`${classes.inputField}`}
                                placeholder="Account Number"
                                value={accountNumber}
                                onChange={(e) => setAccountNumber(e.target.value)}
                              />
                            </FormControl>

                            <FormControl fullWidth classes={{ fullWidth: classes.fullWidth }}>
                              <TextField
                                id="routingNumber"
                                type="number"
                                label="Routing Number"
                                variant="outlined"
                                className={`${classes.inputField}`}
                                placeholder="Routing Number"
                                value={routingNumber}
                                onChange={(e) => setRoutingNumber(e.target.value)}
                              />
                            </FormControl>
                          </div>

                          <div className={classes.fieldsGroup}>
                            <FormControl fullWidth classes={{ fullWidth: classes.fullWidth }} className={classes.inputImage}>
                              <TextField
                                type="number"
                                id="swiftCode"
                                label="Swift Code"
                                variant="outlined"
                                className={`${classes.inputField}`}
                                placeholder="Swift Code"
                                value={swiftCode}
                                onChange={(e) => setSwiftCode(e.target.value)}
                              />
                            </FormControl>

                            <FormControl fullWidth classes={{ fullWidth: classes.fullWidth }}>
                              <TextField
                                id="branch"
                                label="Branch"
                                variant="outlined"
                                className={`${classes.inputField}`}
                                placeholder="Branch"
                                value={branch}
                                onChange={(e) => setBranch(e.target.value)}
                              />
                            </FormControl>
                          </div>

                          <div>
                            <FormControl className={classes.bankCountryName} classes={{ fullWidth: classes.fullWidth }}>
                              <TextField
                                id="bankCountry"
                                label="Country"
                                variant="outlined"
                                className={`${classes.inputField}`}
                                placeholder="Bank Country"
                                value={bankCountry}
                                onChange={(e) => setBankCountry(e.target.value)}
                              />
                            </FormControl>
                            <Button type="submit" className={classes.profileInfoSaveBtn}>
                              Save Changes
                            </Button>
                          </div>
                        </div>
                      )}
                    </div>
                  </Card>
                  {/* Add payment method ends */}

                  <Card className={classes.cardRoot}>
                    <div className={classes.headingWrapper}>
                      <Typography className={classes.settingsFormTitle} variant="h4">
                        Professional Portfolio
                      </Typography>
                      <hr className={classes.seperator} />
                    </div>

                    <div className={classes.cardWrapper}>
                      <div className={`${classes.fieldsGroup} ${classes.linkField}`}>
                        <FormControl fullWidth classes={{ fullWidth: classes.fullWidth }} className={classes.portfolioLink}>
                          <label htmlFor="shutterstock" className={classes.portfolioIconWrapper}>
                            <img src={shutterstockIcon} alt="Shutterstock Icon" width="25px" height="57px" />
                          </label>

                          <TextField
                            id="shutterstock"
                            // error={!!errors.shutterstock}
                            // helperText={errors.shutterstock}
                            label="Your Shutterstock Account"
                            variant="outlined"
                            className={`${classes.inputField}`}
                            placeholder="Your Shutterstock Account"
                            value={shutterstock}
                            onChange={(e) => setShutterstock(e.target.value)}
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
                            label="Your Pinterest Account"
                            variant="outlined"
                            className={`${classes.inputField}`}
                            placeholder="Your Pinterest Account"
                            value={pinterest}
                            onChange={(e) => setPinterest(e.target.value)}
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
                            // error={!!errors.behance}
                            // helperText={errors.behance}
                            label="Your Behance Account"
                            variant="outlined"
                            className={`${classes.inputField}`}
                            placeholder="Your Behance Account"
                            value={behance}
                            onChange={(e) => setBehance(e.target.value)}
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
                            // error={!!errors.dribbble}
                            // helperText={errors.dribbble}
                            label="Your Dribbble Account"
                            variant="outlined"
                            className={`${classes.inputField}`}
                            placeholder="Your Dribbble Account"
                            value={dribbble}
                            onChange={(e) => setDribbble(e.target.value)}
                          />
                        </FormControl>
                      </div>
                    </div>
                  </Card>
                  {/* Ends Professional Portfolio */}

                  <Card className={classes.cardRoot}>
                    <div className={classes.headingWrapper}>
                      <Typography className={classes.settingsFormTitle} variant="h4">
                        Social Link
                      </Typography>
                      <hr className={classes.seperator} />
                    </div>

                    <div className={classes.cardWrapper}>
                      <div className={`${classes.fieldsGroup} ${classes.linkField}`}>
                        <FormControl fullWidth classes={{ fullWidth: classes.fullWidth }} className={classes.portfolioLink}>
                          <label htmlFor="facebook" className={classes.portfolioIconWrapper}>
                            <img src={facebookIcon} className={classes.facebookIcon} alt="Facebook Icon" width="25px" height="57px" />
                          </label>
                          <TextField
                            id="facebook"
                            // error={!!errors.facebook}
                            // helperText={errors.facebook}
                            label="Your Facebook Account"
                            variant="outlined"
                            className={`${classes.inputField}`}
                            placeholder="Your Facebook Account"
                            value={facebook}
                            onChange={(e) => setFacebook(e.target.value)}
                          />
                        </FormControl>
                      </div>

                      <div className={`${classes.fieldsGroup} ${classes.linkField}`}>
                        <FormControl fullWidth classes={{ fullWidth: classes.fullWidth }} className={classes.portfolioLink}>
                          <label htmlFor="twitter" className={classes.portfolioIconWrapper}>
                            <img src={twitterIcon} alt="Twitter Icon" width="25px" height="57px" />
                          </label>
                          <TextField
                            id="twitter"
                            // error={!!errors.twitter}
                            // helperText={errors.twitter}
                            label="Your Twitter Account"
                            variant="outlined"
                            className={`${classes.inputField}`}
                            placeholder="Your Twitter Account"
                            value={twitter}
                            onChange={(e) => setTwitter(e.target.value)}
                          />
                        </FormControl>
                      </div>

                      <div className={`${classes.fieldsGroup} ${classes.linkField}`}>
                        <FormControl fullWidth classes={{ fullWidth: classes.fullWidth }} className={classes.portfolioLink}>
                          <label htmlFor="linkedin" className={classes.portfolioIconWrapper}>
                            <img src={linkedinIcon} alt="Linkedin Icon" width="25px" height="57px" />
                          </label>
                          <TextField
                            id="linkedin"
                            // error={!!errors.linkedin}
                            // helperText={errors.linkedin}
                            label="Your Linkedin Account"
                            variant="outlined"
                            className={`${classes.inputField}`}
                            placeholder="Your Linkedin Account"
                            value={linkedin}
                            onChange={(e) => setLinkedin(e.target.value)}
                          />
                        </FormControl>
                      </div>

                      <div className={`${classes.fieldsGroup} ${classes.linkField}`}>
                        <FormControl fullWidth classes={{ fullWidth: classes.fullWidth }} className={classes.portfolioLink}>
                          <label htmlFor="instagram" className={classes.portfolioIconWrapper}>
                            <img src={instagramIcon} alt="Instagram Icon" width="25px" height="57px" />
                          </label>
                          <TextField
                            id="instagram"
                            // error={!!errors.instagram}
                            // helperText={errors.instagram}
                            label="Your Instagram Account"
                            variant="outlined"
                            className={`${classes.inputField}`}
                            placeholder="Your Instagram Account"
                            value={instagram}
                            onChange={(e) => setInstagram(e.target.value)}
                          />
                        </FormControl>
                      </div>
                    </div>
                  </Card>
                  {/* Ends Professional Portfolio */}

                  <div className={classes.buttonGroup}>
                    <Button className={`${classes.settingsBtn} ${classes.restoreBtn}`}>Restore All Attributes</Button>
                    <Button type="submit" className={`${classes.settingsBtn} ${classes.saveBtn}`}>
                      Save All Changes
                    </Button>
                  </div>
                </form>
              </div>
            </div>
          </Suspense>
          {/* Ends form wrapper */}

          <Suspense fallback={<Loader />}>
            <Footer addminFooter />
          </Suspense>
        </main>
      </div>
    </Layout>
  );
};

export default AccountSettings;
