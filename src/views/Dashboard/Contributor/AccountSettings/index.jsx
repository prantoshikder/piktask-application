"use client";

import { Button, Card, FormControl, Select, TextField, Typography, useMediaQuery } from "@/components/ui-kit";
import mobileProfileBanner from "../../../../assets/banner/account-mobileProfile.jpg";
import tabletProfileBanner from "../../../../assets/banner/account-TabletProfile.jpg";
import profileBanner from "../../../../assets/banner/profile-banner.jpg";
import { CameraOutlined as PhotoCameraIcon } from "@ant-design/icons";
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
import { expiredLoginTime, getBaseURL, joinImageUrl } from "../../../../helpers/index";
import Layout from "../../../../Layout";

const Footer = lazy(() => import("../../../../components/ui/Footer"));

const AccountSettings = () => {
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
      <div className="">
        {mobileView ? null : <Sidebar className="mt-[0rem] max-[768.95px]:hidden" />}

        <main className="p-[0] ml-[28rem] max-[768.95px]:w-[100%] max-[768.95px]:ml-[0rem]">
          <AdminHeader />

          <Suspense fallback={<Loader />}>
            <div className="mt-[10rem] m-[2rem]">
              <div className={"[background-position:center_center] bg-cover bg-no-repeat flex items-center relative justify-center h-[20rem] mb-[2.5rem] p-[5rem_0] before:bg-[rgba(0,28,48,0.4)] before:content-[\"\"] before:absolute before:top-[0] before:left-[0] before:w-[100%] before:h-[100%] bg-[image:var(--settings-d)] max-[768.95px]:bg-[image:var(--settings-t)] max-[575.95px]:bg-[image:var(--settings-m)]"} style={{ "--settings-d": `url(${profileBanner.src})`, "--settings-t": `url(${tabletProfileBanner.src})`, "--settings-m": `url(${mobileProfileBanner.src})` }}>
                <div className="p-[0.5rem] bg-[#ddd] w-[10rem] h-[10rem] rounded-[50%] relative overflow-hidden z-[1] [&_img]:w-[100%] [&_img]:h-[100%] [&_img]:rounded-[50%] [&_img]:object-cover group group">
                  {profilePicture ? (
                    <div>
                      <img src={joinImageUrl(getBaseURL().bucket_base_url + "/", profilePicture)} alt={user?.username} width="90px" height="90px" />
                    </div>
                  ) : (
                    <img src={authorImage.src} alt={user?.username} width="90px" height="90px" />
                  )}

                  <div className="bottom-[0] left-[50%] absolute [transform:translateX(-50%)] opacity-[0] invisible group-hover:opacity-[1] group-hover:visible group-hover:[transition:all_0.3s_linear] group-hover:cursor-pointer group-hover:opacity-[1] group-hover:visible group-hover:[transition:all_0.3s_linear] group-hover:cursor-pointer">
                    <div className="w-[10rem] h-[10rem] rounded-[50%] flex justify-center items-center bg-[rgba(0,0,0,0.6)] overflow-hidden">
                      <label htmlFor="upload_photo">
                        <PhotoCameraIcon className="text-[2.5rem] text-[#fff] cursor-pointer" />
                        <input type="file" name="profile_picture" accept="image/*" id="upload_photo" style={{ display: "none" }} onChange={handleUpdateImage} />
                      </label>
                    </div>
                  </div>
                </div>
              </div>
              {/* Ends Hero */}

              <div>
                <form onSubmit={handleSubmit}>
                  <Card className="mb-[2.5rem] shadow-[rgba(0,0,0,0.1)_0px_10px_15px_-3px,rgba(0,0,0,0.05)_0px_4px_6px_-2px]">
                    <div className="mb-[3.5rem]">
                      <Typography className="text-[#114960] font-[700] p-[3rem]" variant="h4">
                        Personal Information
                      </Typography>
                      <hr className="border-[0] h-[.1rem] bg-[rgb(112_112_112_/_38%)] w-[100%]" />
                    </div>

                    <div className="p-[.6rem_2rem_2rem] mb-[2rem]">
                      <div className="flex items-center justify-center mb-[2rem] [&_legend]:hidden [&_legend]:w-[0] [&_legend]:h-[0] max-[960px]:w-[100%] max-[960px]:flex-col max-[960px]:mb-[0]">
                        <FormControl fullWidth classes={{ fullWidth: "mr-[1rem] ml-[1rem] max-[960px]:mb-[2rem]" }}>
                          <TextField
                            id="name"
                            label="Name"
                            variant="outlined"
                            className="[&_label]:text-[#114960] [&_label]:text-[1.3rem]"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                          />
                        </FormControl>

                        <FormControl fullWidth classes={{ fullWidth: "mr-[1rem] ml-[1rem] max-[960px]:mb-[2rem]" }} className="max-[960px]:mb-[2rem]!">
                          <TextField id="username" label="User Name" variant="outlined" className="[&_label]:text-[#114960] [&_label]:text-[1.3rem]" value={username} disabled />
                        </FormControl>
                      </div>

                      <div className="flex items-center justify-center mb-[2rem] [&_legend]:hidden [&_legend]:w-[0] [&_legend]:h-[0] max-[960px]:w-[100%] max-[960px]:flex-col max-[960px]:mb-[0]">
                        <FormControl fullWidth classes={{ fullWidth: "mr-[1rem] ml-[1rem] max-[960px]:mb-[2rem]" }}>
                          <TextField id="email" label="Email" variant="outlined" className="[&_label]:text-[#114960] [&_label]:text-[1.3rem]" value={email} />
                        </FormControl>

                        <FormControl fullWidth classes={{ fullWidth: "mr-[1rem] ml-[1rem] max-[960px]:mb-[2rem]" }}>
                          <TextField
                            fullWidth
                            variant="outlined"
                            label="Website"
                            className="[&_label]:text-[#114960] [&_label]:text-[1.3rem]"
                            name="website"
                            value={website}
                            onChange={(e) => setWebsite(e.target.value)}
                          />
                        </FormControl>
                      </div>

                      <div className="flex items-center justify-center mb-[2rem] [&_legend]:hidden [&_legend]:w-[0] [&_legend]:h-[0] max-[960px]:w-[100%] max-[960px]:flex-col max-[960px]:mb-[0]">
                        <FormControl fullWidth classes={{ fullWidth: "mr-[1rem] ml-[1rem] max-[960px]:mb-[2rem]" }} className="max-[960px]:mb-[2rem]!">
                          <TextField
                            id="phonenumber"
                            label="Phone Number"
                            type="number"
                            variant="outlined"
                            className="[&_label]:text-[#114960] [&_label]:text-[1.3rem]"
                            value={phone}
                            onChange={(e) => setPhone(e.target.value)}
                          />
                        </FormControl>

                        <FormControl variant="outlined" fullWidth classes={{ fullWidth: "mr-[1rem] ml-[1rem] max-[960px]:mb-[2rem]" }}>
                          <TextField
                            SelectProps={{
                              native: true,
                            }}
                            select
                            variant="outlined"
                            label="Country"
                            className="[&_label]:text-[#114960] [&_label]:text-[1.3rem]"
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

                      <div className="flex items-center justify-center mb-[2rem] [&_legend]:hidden [&_legend]:w-[0] [&_legend]:h-[0] max-[960px]:w-[100%] max-[960px]:flex-col max-[960px]:mb-[0]">
                        <FormControl fullWidth classes={{ fullWidth: "mr-[1rem] ml-[1rem] max-[960px]:mb-[2rem]" }}>
                          <TextField
                            id="city"
                            label="Your State/City"
                            variant="outlined"
                            className="[&_label]:text-[#114960] [&_label]:text-[1.3rem]"
                            value={city}
                            onChange={(e) => setCity(e.target.value)}
                          ></TextField>
                        </FormControl>

                        <FormControl fullWidth classes={{ fullWidth: "mr-[1rem] ml-[1rem] max-[960px]:mb-[2rem]" }} className="max-[960px]:mb-[2rem]!">
                          <TextField
                            id="postalcode"
                            label="Zip/Postal Code"
                            variant="outlined"
                            className="[&_label]:text-[#114960] [&_label]:text-[1.3rem]"
                            value={zipCode}
                            onChange={(e) => setZipCode(e.target.value)}
                          />
                        </FormControl>
                      </div>

                      <div className="flex items-center justify-center mb-[2rem] [&_legend]:hidden [&_legend]:w-[0] [&_legend]:h-[0] max-[960px]:w-[100%] max-[960px]:flex-col max-[960px]:mb-[0]">
                        <FormControl fullWidth classes={{ fullWidth: "mr-[1rem] ml-[1rem] max-[960px]:mb-[2rem]" }}>
                          <TextField
                            id="address"
                            label="Current Address"
                            variant="outlined"
                            className="[&_label]:text-[#114960] [&_label]:text-[1.3rem]"
                            value={locationAddress}
                            onChange={(e) => setLocationAddress(e.target.value)}
                          />
                        </FormControl>

                        <FormControl fullWidth classes={{ fullWidth: "mr-[1rem] ml-[1rem] max-[960px]:mb-[2rem]" }} className="max-[960px]:mb-[2rem]!">
                          <TextField
                            id="billingaddress"
                            label="Billing Address"
                            variant="outlined"
                            className="[&_label]:text-[#114960] [&_label]:text-[1.3rem]"
                            value={billingsAddress}
                            onChange={(e) => setBillingsAddress(e.target.value)}
                          />
                        </FormControl>
                      </div>
                    </div>
                    {/* Card Wrapper ends */}
                  </Card>

                  <Card className="mb-[2.5rem] shadow-[rgba(0,0,0,0.1)_0px_10px_15px_-3px,rgba(0,0,0,0.05)_0px_4px_6px_-2px]">
                    <div className="mb-[3.5rem]">
                      <Typography className="text-[#114960] font-[700] p-[3rem]" variant="h4">
                        Add Payment Method
                      </Typography>
                      <hr className="border-[0] h-[.1rem] bg-[rgb(112_112_112_/_38%)] w-[100%]" />
                    </div>

                    <div className="p-[.6rem_2rem_2rem] mb-[2rem]">
                      <div className="flex items-center justify-center mb-[2rem] [&_legend]:hidden [&_legend]:w-[0] [&_legend]:h-[0] max-[960px]:w-[100%] max-[960px]:flex-col max-[960px]:mb-[0]">
                        <FormControl variant="outlined" fullWidth classes={{ fullWidth: "mr-[1rem] ml-[1rem] max-[960px]:mb-[2rem]" }}>
                          <Select native value={payment} onChange={(e) => setPayment(e.target.value)} className="[&_svg]:w-[3rem] [&_svg]:text-[4rem] [&_svg]:top-[5px]">
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
                          <FormControl fullWidth classes={{ fullWidth: "mr-[1rem] ml-[1rem] max-[960px]:mb-[2rem]" }}>
                            <TextField
                              fullWidth
                              variant="outlined"
                              label="Paypal Email"
                              name="paypalEmail"
                              className="[&_label]:text-[#114960] [&_label]:text-[1.3rem]"
                              value={paypalAccount}
                              onChange={(e) => setPaypalAccount(e.target.value)}
                            />
                          </FormControl>
                        )}

                        {payment === "Payoneer" && (
                          <FormControl fullWidth classes={{ fullWidth: "mr-[1rem] ml-[1rem] max-[960px]:mb-[2rem]" }}>
                            <TextField
                              fullWidth
                              variant="outlined"
                              label="Payoneer Email"
                              name="payoneerEmail"
                              className="[&_label]:text-[#114960] [&_label]:text-[1.3rem]"
                              value={payoneerAccount}
                              onChange={(e) => setPayoneerAccount(e.target.value)}
                            />
                          </FormControl>
                        )}

                        {payment === "Bank" && (
                          <FormControl fullWidth classes={{ fullWidth: "mr-[1rem] ml-[1rem] max-[960px]:mb-[2rem]" }}>
                            <TextField
                              id="name"
                              label="Account Name"
                              variant="outlined"
                              className="[&_label]:text-[#114960] [&_label]:text-[1.3rem]"
                              placeholder="Account Name"
                              value={accountName}
                              onChange={(e) => setAccountName(e.target.value)}
                            />
                          </FormControl>
                        )}
                      </div>

                      {payment === "Bank" && (
                        <div>
                          <div className="flex items-center justify-center mb-[2rem] [&_legend]:hidden [&_legend]:w-[0] [&_legend]:h-[0] max-[960px]:w-[100%] max-[960px]:flex-col max-[960px]:mb-[0]">
                            <FormControl fullWidth classes={{ fullWidth: "mr-[1rem] ml-[1rem] max-[960px]:mb-[2rem]" }}>
                              <TextField
                                type="number"
                                id="accountNumber"
                                label="Account Number"
                                variant="outlined"
                                className="[&_label]:text-[#114960] [&_label]:text-[1.3rem]"
                                placeholder="Account Number"
                                value={accountNumber}
                                onChange={(e) => setAccountNumber(e.target.value)}
                              />
                            </FormControl>

                            <FormControl fullWidth classes={{ fullWidth: "mr-[1rem] ml-[1rem] max-[960px]:mb-[2rem]" }}>
                              <TextField
                                id="routingNumber"
                                type="number"
                                label="Routing Number"
                                variant="outlined"
                                className="[&_label]:text-[#114960] [&_label]:text-[1.3rem]"
                                placeholder="Routing Number"
                                value={routingNumber}
                                onChange={(e) => setRoutingNumber(e.target.value)}
                              />
                            </FormControl>
                          </div>

                          <div className="flex items-center justify-center mb-[2rem] [&_legend]:hidden [&_legend]:w-[0] [&_legend]:h-[0] max-[960px]:w-[100%] max-[960px]:flex-col max-[960px]:mb-[0]">
                            <FormControl fullWidth classes={{ fullWidth: "mr-[1rem] ml-[1rem] max-[960px]:mb-[2rem]" }}>
                              <TextField
                                type="number"
                                id="swiftCode"
                                label="Swift Code"
                                variant="outlined"
                                className="[&_label]:text-[#114960] [&_label]:text-[1.3rem]"
                                placeholder="Swift Code"
                                value={swiftCode}
                                onChange={(e) => setSwiftCode(e.target.value)}
                              />
                            </FormControl>

                            <FormControl fullWidth classes={{ fullWidth: "mr-[1rem] ml-[1rem] max-[960px]:mb-[2rem]" }}>
                              <TextField
                                id="branch"
                                label="Branch"
                                variant="outlined"
                                className="[&_label]:text-[#114960] [&_label]:text-[1.3rem]"
                                placeholder="Branch"
                                value={branch}
                                onChange={(e) => setBranch(e.target.value)}
                              />
                            </FormControl>
                          </div>

                          <div>
                            <FormControl className="w-[49%] pl-[1rem] [align-items:left] [justify-content:left] mb-[2rem] [&_legend]:hidden [&_legend]:w-[0] [&_legend]:h-[0] min-[2000px]:w-[49.6%] [@media(max-width:2250px)_and_(min-width:2100px)]:w-[49.5%] [@media(max-width:2000px)_and_(min-width:1700px)]:w-[49.3%] max-[960px]:w-[100%] max-[960px]:pl-[0rem]! max-[960px]:flex-col max-[960px]:mb-[0]" classes={{ fullWidth: "mr-[1rem] ml-[1rem] max-[960px]:mb-[2rem]" }}>
                              <TextField
                                id="bankCountry"
                                label="Country"
                                variant="outlined"
                                className="[&_label]:text-[#114960] [&_label]:text-[1.3rem]"
                                placeholder="Bank Country"
                                value={bankCountry}
                                onChange={(e) => setBankCountry(e.target.value)}
                              />
                            </FormControl>
                            <Button type="submit" className="h-[5.5rem] w-[24rem] text-[#fff] float-right mr-[1rem] [border:0.5px_solid_#0088f2] bg-[#0088f2] [transition:all_0.3s_linear] hover:bg-[#0773c5] max-[899.95px]:hidden">
                              Save Changes
                            </Button>
                          </div>
                        </div>
                      )}
                    </div>
                  </Card>
                  {/* Add payment method ends */}

                  <Card className="mb-[2.5rem] shadow-[rgba(0,0,0,0.1)_0px_10px_15px_-3px,rgba(0,0,0,0.05)_0px_4px_6px_-2px]">
                    <div className="mb-[3.5rem]">
                      <Typography className="text-[#114960] font-[700] p-[3rem]" variant="h4">
                        Professional Portfolio
                      </Typography>
                      <hr className="border-[0] h-[.1rem] bg-[rgb(112_112_112_/_38%)] w-[100%]" />
                    </div>

                    <div className="p-[.6rem_2rem_2rem] mb-[2rem]">
                      <div className="flex items-center justify-center mb-[2rem] [&_legend]:hidden [&_legend]:w-[0] [&_legend]:h-[0] max-[960px]:w-[100%] max-[960px]:flex-col max-[960px]:mb-[0] max-[960px]:mb-[inherit] max-[960px]:last:mb-[0]">
                        <FormControl fullWidth classes={{ fullWidth: "mr-[1rem] ml-[1rem] max-[960px]:mb-[2rem]" }} className="relative pl-[8rem] [&_fieldset]:rounded-tl-[0] [&_fieldset]:rounded-bl-[0] [&_fieldset]:[border-left-color:transparent]">
                          <label htmlFor="shutterstock" className="absolute left-[0] top-[-.5rem] w-[8rem] h-[5.85rem] flex justify-center [border:1px_solid_rgba(0,0,0,0.23)] [&_img]:w-[2.5rem] [&_img]:h-[auto]">
                            <img src={shutterstockIcon.src} alt="Shutterstock Icon" width="25px" height="57px" />
                          </label>

                          <TextField
                            id="shutterstock"
                            // error={!!errors.shutterstock}
                            // helperText={errors.shutterstock}
                            label="Your Shutterstock Account"
                            variant="outlined"
                            className="[&_label]:text-[#114960] [&_label]:text-[1.3rem]"
                            placeholder="Your Shutterstock Account"
                            value={shutterstock}
                            onChange={(e) => setShutterstock(e.target.value)}
                          />
                        </FormControl>
                      </div>

                      <div className="flex items-center justify-center mb-[2rem] [&_legend]:hidden [&_legend]:w-[0] [&_legend]:h-[0] max-[960px]:w-[100%] max-[960px]:flex-col max-[960px]:mb-[0] max-[960px]:mb-[inherit] max-[960px]:last:mb-[0]">
                        <FormControl fullWidth classes={{ fullWidth: "mr-[1rem] ml-[1rem] max-[960px]:mb-[2rem]" }} className="relative pl-[8rem] [&_fieldset]:rounded-tl-[0] [&_fieldset]:rounded-bl-[0] [&_fieldset]:[border-left-color:transparent]">
                          <label htmlFor="pinterest" className="absolute left-[0] top-[-.5rem] w-[8rem] h-[5.85rem] flex justify-center [border:1px_solid_rgba(0,0,0,0.23)] [&_img]:w-[2.5rem] [&_img]:h-[auto]">
                            <img src={pinterestIcon.src} alt="Pinterest Icon" width="25px" height="57px" />
                          </label>
                          <TextField
                            id="pinterest"
                            label="Your Pinterest Account"
                            variant="outlined"
                            className="[&_label]:text-[#114960] [&_label]:text-[1.3rem]"
                            placeholder="Your Pinterest Account"
                            value={pinterest}
                            onChange={(e) => setPinterest(e.target.value)}
                          />
                        </FormControl>
                      </div>

                      <div className="flex items-center justify-center mb-[2rem] [&_legend]:hidden [&_legend]:w-[0] [&_legend]:h-[0] max-[960px]:w-[100%] max-[960px]:flex-col max-[960px]:mb-[0] max-[960px]:mb-[inherit] max-[960px]:last:mb-[0]">
                        <FormControl fullWidth classes={{ fullWidth: "mr-[1rem] ml-[1rem] max-[960px]:mb-[2rem]" }} className="relative pl-[8rem] [&_fieldset]:rounded-tl-[0] [&_fieldset]:rounded-bl-[0] [&_fieldset]:[border-left-color:transparent]">
                          <label htmlFor="behance" className="absolute left-[0] top-[-.5rem] w-[8rem] h-[5.85rem] flex justify-center [border:1px_solid_rgba(0,0,0,0.23)] [&_img]:w-[2.5rem] [&_img]:h-[auto]">
                            <img src={behanceIcon.src} alt="Behance Icon" width="25px" height="57px" />
                          </label>
                          <TextField
                            id="behance"
                            // error={!!errors.behance}
                            // helperText={errors.behance}
                            label="Your Behance Account"
                            variant="outlined"
                            className="[&_label]:text-[#114960] [&_label]:text-[1.3rem]"
                            placeholder="Your Behance Account"
                            value={behance}
                            onChange={(e) => setBehance(e.target.value)}
                          />
                        </FormControl>
                      </div>

                      <div className="flex items-center justify-center mb-[2rem] [&_legend]:hidden [&_legend]:w-[0] [&_legend]:h-[0] max-[960px]:w-[100%] max-[960px]:flex-col max-[960px]:mb-[0] max-[960px]:mb-[inherit] max-[960px]:last:mb-[0]">
                        <FormControl fullWidth classes={{ fullWidth: "mr-[1rem] ml-[1rem] max-[960px]:mb-[2rem]" }} className="relative pl-[8rem] [&_fieldset]:rounded-tl-[0] [&_fieldset]:rounded-bl-[0] [&_fieldset]:[border-left-color:transparent]">
                          <label htmlFor="dribbble" className="absolute left-[0] top-[-.5rem] w-[8rem] h-[5.85rem] flex justify-center [border:1px_solid_rgba(0,0,0,0.23)] [&_img]:w-[2.5rem] [&_img]:h-[auto]">
                            <img src={dribbbleIcon.src} alt="Dribbble Icon" width="25px" height="57px" />
                          </label>
                          <TextField
                            id="dribbble"
                            // error={!!errors.dribbble}
                            // helperText={errors.dribbble}
                            label="Your Dribbble Account"
                            variant="outlined"
                            className="[&_label]:text-[#114960] [&_label]:text-[1.3rem]"
                            placeholder="Your Dribbble Account"
                            value={dribbble}
                            onChange={(e) => setDribbble(e.target.value)}
                          />
                        </FormControl>
                      </div>
                    </div>
                  </Card>
                  {/* Ends Professional Portfolio */}

                  <Card className="mb-[2.5rem] shadow-[rgba(0,0,0,0.1)_0px_10px_15px_-3px,rgba(0,0,0,0.05)_0px_4px_6px_-2px]">
                    <div className="mb-[3.5rem]">
                      <Typography className="text-[#114960] font-[700] p-[3rem]" variant="h4">
                        Social Link
                      </Typography>
                      <hr className="border-[0] h-[.1rem] bg-[rgb(112_112_112_/_38%)] w-[100%]" />
                    </div>

                    <div className="p-[.6rem_2rem_2rem] mb-[2rem]">
                      <div className="flex items-center justify-center mb-[2rem] [&_legend]:hidden [&_legend]:w-[0] [&_legend]:h-[0] max-[960px]:w-[100%] max-[960px]:flex-col max-[960px]:mb-[0] max-[960px]:mb-[inherit] max-[960px]:last:mb-[0]">
                        <FormControl fullWidth classes={{ fullWidth: "mr-[1rem] ml-[1rem] max-[960px]:mb-[2rem]" }} className="relative pl-[8rem] [&_fieldset]:rounded-tl-[0] [&_fieldset]:rounded-bl-[0] [&_fieldset]:[border-left-color:transparent]">
                          <label htmlFor="facebook" className="absolute left-[0] top-[-.5rem] w-[8rem] h-[5.85rem] flex justify-center [border:1px_solid_rgba(0,0,0,0.23)] [&_img]:w-[2.5rem] [&_img]:h-[auto]">
                            <img src={facebookIcon.src} alt="Facebook Icon" width="25px" height="57px" />
                          </label>
                          <TextField
                            id="facebook"
                            // error={!!errors.facebook}
                            // helperText={errors.facebook}
                            label="Your Facebook Account"
                            variant="outlined"
                            className="[&_label]:text-[#114960] [&_label]:text-[1.3rem]"
                            placeholder="Your Facebook Account"
                            value={facebook}
                            onChange={(e) => setFacebook(e.target.value)}
                          />
                        </FormControl>
                      </div>

                      <div className="flex items-center justify-center mb-[2rem] [&_legend]:hidden [&_legend]:w-[0] [&_legend]:h-[0] max-[960px]:w-[100%] max-[960px]:flex-col max-[960px]:mb-[0] max-[960px]:mb-[inherit] max-[960px]:last:mb-[0]">
                        <FormControl fullWidth classes={{ fullWidth: "mr-[1rem] ml-[1rem] max-[960px]:mb-[2rem]" }} className="relative pl-[8rem] [&_fieldset]:rounded-tl-[0] [&_fieldset]:rounded-bl-[0] [&_fieldset]:[border-left-color:transparent]">
                          <label htmlFor="twitter" className="absolute left-[0] top-[-.5rem] w-[8rem] h-[5.85rem] flex justify-center [border:1px_solid_rgba(0,0,0,0.23)] [&_img]:w-[2.5rem] [&_img]:h-[auto]">
                            <img src={twitterIcon.src} alt="Twitter Icon" width="25px" height="57px" />
                          </label>
                          <TextField
                            id="twitter"
                            // error={!!errors.twitter}
                            // helperText={errors.twitter}
                            label="Your Twitter Account"
                            variant="outlined"
                            className="[&_label]:text-[#114960] [&_label]:text-[1.3rem]"
                            placeholder="Your Twitter Account"
                            value={twitter}
                            onChange={(e) => setTwitter(e.target.value)}
                          />
                        </FormControl>
                      </div>

                      <div className="flex items-center justify-center mb-[2rem] [&_legend]:hidden [&_legend]:w-[0] [&_legend]:h-[0] max-[960px]:w-[100%] max-[960px]:flex-col max-[960px]:mb-[0] max-[960px]:mb-[inherit] max-[960px]:last:mb-[0]">
                        <FormControl fullWidth classes={{ fullWidth: "mr-[1rem] ml-[1rem] max-[960px]:mb-[2rem]" }} className="relative pl-[8rem] [&_fieldset]:rounded-tl-[0] [&_fieldset]:rounded-bl-[0] [&_fieldset]:[border-left-color:transparent]">
                          <label htmlFor="linkedin" className="absolute left-[0] top-[-.5rem] w-[8rem] h-[5.85rem] flex justify-center [border:1px_solid_rgba(0,0,0,0.23)] [&_img]:w-[2.5rem] [&_img]:h-[auto]">
                            <img src={linkedinIcon.src} alt="Linkedin Icon" width="25px" height="57px" />
                          </label>
                          <TextField
                            id="linkedin"
                            // error={!!errors.linkedin}
                            // helperText={errors.linkedin}
                            label="Your Linkedin Account"
                            variant="outlined"
                            className="[&_label]:text-[#114960] [&_label]:text-[1.3rem]"
                            placeholder="Your Linkedin Account"
                            value={linkedin}
                            onChange={(e) => setLinkedin(e.target.value)}
                          />
                        </FormControl>
                      </div>

                      <div className="flex items-center justify-center mb-[2rem] [&_legend]:hidden [&_legend]:w-[0] [&_legend]:h-[0] max-[960px]:w-[100%] max-[960px]:flex-col max-[960px]:mb-[0] max-[960px]:mb-[inherit] max-[960px]:last:mb-[0]">
                        <FormControl fullWidth classes={{ fullWidth: "mr-[1rem] ml-[1rem] max-[960px]:mb-[2rem]" }} className="relative pl-[8rem] [&_fieldset]:rounded-tl-[0] [&_fieldset]:rounded-bl-[0] [&_fieldset]:[border-left-color:transparent]">
                          <label htmlFor="instagram" className="absolute left-[0] top-[-.5rem] w-[8rem] h-[5.85rem] flex justify-center [border:1px_solid_rgba(0,0,0,0.23)] [&_img]:w-[2.5rem] [&_img]:h-[auto]">
                            <img src={instagramIcon.src} alt="Instagram Icon" width="25px" height="57px" />
                          </label>
                          <TextField
                            id="instagram"
                            // error={!!errors.instagram}
                            // helperText={errors.instagram}
                            label="Your Instagram Account"
                            variant="outlined"
                            className="[&_label]:text-[#114960] [&_label]:text-[1.3rem]"
                            placeholder="Your Instagram Account"
                            value={instagram}
                            onChange={(e) => setInstagram(e.target.value)}
                          />
                        </FormControl>
                      </div>
                    </div>
                  </Card>
                  {/* Ends Professional Portfolio */}

                  <div className="flex justify-end">
                    <Button className="p-[1rem_2rem] text-[#fff] text-[1.4rem] rounded-[.5rem] bg-[#ACB0C8] mr-[2rem] hover:bg-[rgb(149_154_185)]">Restore All Attributes</Button>
                    <Button type="submit" className="p-[1rem_2rem] text-[#fff] text-[1.4rem] rounded-[.5rem] bg-[#0088f2] [transition:all_0.3s_linear] hover:bg-[#0773c5]">
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
