"use client";

import { Button, Checkbox, FormControlLabel, Radio, RadioGroup, TextField, Typography } from "@/components/ui-kit";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link, Redirect, useHistory, useLocation } from "@/lib/router";
import { toast } from "react-toastify";
import formIconBottom from "../../../assets/formIconBottom.png";
import formIconTop from "../../../assets/formIconTop.png";
import lockIcon from "../../../assets/password.png";
import Spacing from "../../../components/Spacing";
import Footer from "../../../components/ui/Footer";
import Header from "../../../components/ui/Header";
import { sendSignInLinkToEmail } from "firebase/auth";
import { auth } from "../../../database";
import { imageObjSchema } from "../../../helpers";
import Layout from "../../../Layout";

const Registration = () => {
  const history = useHistory();
  const location = useLocation();
  const user = useSelector((state) => state.user);

  // const [confirmValue, setConfirmValue] = useState(false);
  const [isRedirectTo, setRedirectTo] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [value, setValue] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("");

  const handleShowHidePassword = () => {
    setValue((value) => !value);
  };

  useEffect(() => {
    if (user?.isLoggedIn === true) {
      if (user?.role === "contributor") {
        history.push("/contributor/upload");
      } else if (user?.role === "user") {
        history.push("/");
      } else {
        history.goBack();
      }
    } else {
      history.push(location.pathname);
    }

    return () => {
      document.body.style.backgroundColor = "";
    };
  }, [user, history, location.pathname]);

  const handleUserRole = (e) => {
    setRole(e.target.value);
  };

  //Registration form submit and validation
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    const validateEmail =
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    if (username.length < 3 || username.length > 15) {
      toast.error("Username must be between 3 and 15 characters long", {
        autoClose: 2200,
      });
      setIsLoading(false);
      return;
    } else if (!/^[a-z0-9_.]+$/.test(username)) {
      toast.error("Username can only use lowercase letters, numbers, underscores, and dots", { autoClose: 2200 });
      setIsLoading(false);
      return;
    } else if (username.match(/^_/)) {
      toast.error("Username can not use only underscore. Ex: james_bond", {
        autoClose: 2200,
      });
      setIsLoading(false);
      return;
    } else if (username.match(/^\./)) {
      toast.error("Username can not use only dot. Ex: james.bond", {
        autoClose: 2200,
      });
      setIsLoading(false);
      return;
    } else if (username.match(/^[0-9]/)) {
      toast.error("Username can not be a number. Ex: bond007", {
        autoClose: 2200,
      });
      setIsLoading(false);
      return;
    } else if (email && !validateEmail.test(String(email))) {
      toast.error("Your email is invalid", { autoClose: 2200 });
      setIsLoading(false);
      return;
    } else if (password.length < 6) {
      toast.error("Password should be at least 6 characters", {
        autoClose: 2200,
      });
      setIsLoading(false);
      return;
    }

    //   else if(password.match(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{6,})/)){
    //     toast.error("Password should contain at least a number, lowercase, uppercase and a special character @,#,%,& etc.", { autoClose: 2200,});
    //     setIsLoading(false);
    //     return;
    // }

    axios
      .post(`${process.env.NEXT_PUBLIC_API_URL}/auth/signup`, {
        username,
        email,
        password,
        confirmPassword: password,
        role,
      })
      .then(async (res) => {
        if (res?.status === 200) {
          await sendSignInLinkToEmail(auth, email, {
            url: process.env.NEXT_PUBLIC_REGISTER_REDIRECT_URL,
            handleCodeInApp: true,
          });

          // Show success message to the user
          toast.success(`An email has been sent to ${email}. Please check and confirm your registration`);

          setUsername("");
          setEmail("");
          setPassword("");
          setRole("");
          setIsLoading(false);
          setRedirectTo(true);
        } else {
          console.warn("Something went wrong with signup");
        }
      })
      .catch((error) => {
        toast.error(error.response.data.message);
        setUsername("");
        setEmail("");
        setPassword("");
        setRole("");
      });
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
    <Layout title="Signup">
      {isRedirectTo && <Redirect to="/confirm-signup" />}
      <Header />
      <div className="w-[53rem] left-[50%] relative [transform:translate(-50%,0%)] max-[768px]:w-[70%] max-[768px]:p-[0_2rem] max-[479.95px]:w-[100%]">
        <Spacing space={{ height: "5rem" }} />

        <div className="rounded-[1rem] overflow-hidden relative bg-[#fff] max-[768px]:p-[0_2.5rem]">
          <img src={formIconTop.src} alt="Background Icon" className="absolute top-[-.5rem] left-[0] w-[16rem] max-[768px]:w-[15rem] max-[479.95px]:w-[13rem]" />
          <div className="relative m-[2rem_0_2.5rem] max-[768px]:m-[0]">
            <div className="w-[46rem] m-[0_auto_3rem] max-[768px]:w-[100%] max-[768px]:mb-[1.5rem]">
              <div className="text-center m-[3rem_0_2.5rem] max-[768px]:m-[2rem_0_1em]">
                <Typography className="mb-[0.4rem] text-[2.4rem] text-center" variant="h2">
                  Sign Up
                </Typography>
                <Typography className="text-[1.6rem]">With your social network</Typography>
              </div>

              <div>
                {/* <Typography variant="subtitle1">
                  Or
                </Typography> */}

                <div>
                  <form autoComplete="off" className="max-[768px]:[&_input]:p-[11px_14px] max-[768px]:[&_label]:text-[1.4rem] max-[768px]:[&_label]:top-[-.6rem]" onSubmit={handleSubmit}>
                    <TextField
                      fullWidth
                      variant="outlined"
                      label="User name"
                      className="mb-[1.5rem] [&_input]:border-[#CBCBCB] [&_input:focus]:[outline-color:red] max-[768px]:mb-[1.5rem]"
                      name="username"
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                    />
                    <TextField
                      fullWidth
                      variant="outlined"
                      label="Email"
                      className="mb-[1.5rem] [&_input]:border-[#CBCBCB] [&_input:focus]:[outline-color:red] max-[768px]:mb-[1.5rem]"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                    <div className="flex items-center relative [&_img]:absolute [&_img]:top-[1.5rem] [&_img]:right-[3rem] [&_img]:w-[2rem] [&_img]:cursor-pointer max-[768px]:[&_img]:w-[2rem]">
                      <TextField
                        fullWidth
                        variant="outlined"
                        label="Password"
                        type={value ? "text" : "password"}
                        className="mb-[1.5rem] [&_input]:border-[#CBCBCB] [&_input:focus]:[outline-color:red] max-[768px]:mb-[1.5rem]"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                      />
                      <img src={lockIcon.src} alt="Show or hide password" onClick={handleShowHidePassword} />
                    </div>

                    <RadioGroup onChange={handleUserRole} row aria-label="gender" name="row-radio-buttons-group">
                      <FormControlLabel value="user" control={<Radio />} label="User" />
                      <FormControlLabel value="contributor" control={<Radio />} label="Contributor" />
                    </RadioGroup>

                    <Typography variant="body1" className="text-center mb-[1rem] text-[1.3rem] font-[500] max-[768px]:p-[0] max-[768px]:mb-[1rem]">
                      Your password must be at least 6 characters long and must contain letters, numbers and special characters. Cannot contain whitespace.
                    </Typography>

                    <FormControlLabel
                      value="end"
                      label=" I do not wish to receive news and promotions from Piktask LLC by email."
                      labelPlacement="end"
                      control={<Checkbox color="primary" />}
                      className="pb-[3rem] mr-[0] [&_span]:text-[#143340] [&_span]:text-[1.3rem]"
                    />
                    <Button variant="contained" fullWidth className="bg-[#3B9EE8] text-[2rem] rounded-[0] font-[400] shadow-[none] mt-[-1.8rem] mb-[3rem] p-[0.8rem_2rem] [&_span]:text-[#fff] hover:bg-[#3092da] hover:shadow-[none] max-[768px]:mb-[.5rem] max-[768px]:p-[.5rem_2rem] max-[768px]:text-[1.6rem]" type="submit" disabled={!username || !email || !password || !role}>
                      Sign Up
                    </Button>
                  </form>

                  <Button component={Link} to="/login" className="text-[#0088f2] block text-center text-[1.5rem] font-[500] hover:bg-[transparent] max-[768px]:mt-[18px] max-[768px]:relative max-[768px]:left-[50%] max-[768px]:[transform:translateX(-50%)] max-[768px]:inline-block" disableRipple>
                    Already registered? Log in
                  </Button>
                </div>
              </div>
            </div>
          </div>
          <img src={formIconBottom.src} alt="Piktask" className="absolute bottom-[-.5rem] right-[-.1rem] w-[16rem] max-[768px]:w-[15rem] max-[479.95px]:w-[11rem]" />
        </div>
        <Spacing space={{ height: "5rem" }} />
      </div>
      <Footer />
    </Layout>
  );
};

export default Registration;
