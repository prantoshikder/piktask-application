"use client";

import { Checkbox, Dialog, DialogContent, FormControlLabel, Grid, Tab, Tabs, Typography } from "@/components/ui-kit";
import { CloseOutlined as CloseIcon } from "@ant-design/icons";
import axios from "axios";
import { jwtDecode as jwt_decode } from "jwt-decode";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect, useHistory, useLocation } from "@/lib/router";
import { Link } from "@/lib/router";
import { toast } from "react-toastify";
import authImage from "../../../assets/auth.png";
import logoWhite from "../../../assets/logo-white.png";
import lockIcon from "../../../assets/password.png";
import { CustomBtn, InputField } from "../../../components/InputField";
import Spacing from "../../../components/Spacing";
import SocialLogin from "../../../components/ui/SocialLogin";
import { sendSignInLinkToEmail } from "firebase/auth";
import { auth } from "../../../database";

const TabPanel = (props) => {
  const { children, value, index, ...other } = props;

  return (
    <div role="tabpanel" hidden={value !== index} id={`authentication-tabpanel-${index}`} aria-labelledby={`authentication-tab-${index}`} {...other}>
      {value === index && children}
    </div>
  );
};

function a11yProps(index) {
  return {
    id: `user-authentication-tab-${index}`,
    "aria-controls": `user-authentication-tabpanel-${index}`,
  };
}

const SignUpModal = (props) => {
  const history = useHistory();
  const location = useLocation();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  const { openAuthModal, setOpenAuthModal, role } = props;
  const { from } = location.state || { from: { pathname: "/" } };

  const [passwordValue, setPasswordValue] = useState(false);
  const [isRedirectTo, setRedirectTo] = useState(false);
  const [isLoading, setLoading] = useState(false);
  const [tabIndex, setTabIndex] = useState(0);
  const [authData, setAuthData] = useState({
    userName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  //Handle the password show and hide
  const handleShowHidePassword = () => {
    setPasswordValue((value) => !value);
  };

  useEffect(() => {
    return () => {
      document.body.style.backgroundColor = "";
    };
  }, []);

  const handleAuthData = (e) => {
    const { name, value } = e.target;
    setAuthData({ ...authData, [name]: value });
  };

  const handleCloseAuthModal = () => {
    setOpenAuthModal(false);
  };

  const handleChangeTab = () => {
    authData.userName = "";
    authData.password = "";
    return tabIndex === 0 ? setTabIndex(1) : tabIndex === 1 && setTabIndex(0);
  };

  //handle SignIn
  const handleSignIn = async (e) => {
    e.preventDefault();
    setLoading(true);

    if (!authData.userName) {
      toast.error("User name should not be empty!");
      setLoading(false);
      return;
    } else if (!authData.password) {
      toast.error("Password is required!");
      setLoading(false);
      return;
    }

    axios
      .post(`${process.env.NEXT_PUBLIC_API_URL}/auth/login`, {
        username: authData.userName,
        password: authData.password,
        role,
      })
      .then((res) => {
        if (res.data.status) {
          setOpenAuthModal(false);
          user.isLoggedIn = true;
          const token = res.data.token;
          localStorage.setItem("token", token);
          const decodedToken = jwt_decode(token.split(" ")[1]);
          localStorage.setItem("profileImage", decodedToken.avatar);
          setLoading(false);

          if (decodedToken.email) {
            dispatch({
              type: "SET_USER",
              payload: {
                ...decodedToken,
                token,
              },
            });
          }

          if (decodedToken.role === "contributor") {
            history.push("/contributor/upload");
          } else if (location.pathname) {
            history.push(location.pathname);
          } else {
            history.replace(from);
          }
        }
      })
      .catch((error) => {
        toast.error(error.response.data?.message);
        authData.userName = "";
        authData.password = "";
        setLoading(false);
      });
  };

  //Handle signUp form
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const validateEmail =
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    if (authData.userName.length < 3 || authData.userName.length > 15) {
      toast.error("Username must be between 3 and 15 characters long", {
        autoClose: 2200,
      });
      setLoading(false);
      return;
    } else if (!/^[a-z0-9_.]+$/.test(authData.userName)) {
      toast.error("Username can only use lowercase letters, numbers, underscores, and dots", { autoClose: 2200 });
      setLoading(false);
      return;
    } else if (authData.userName.match(/^_/)) {
      toast.error("Username can not use only underscore. Ex: james_bond", {
        autoClose: 2200,
      });
      setLoading(false);
      return;
    } else if (authData.userName.match(/^\./)) {
      toast.error("Username can not use only dot. Ex: james.bond", {
        autoClose: 2200,
      });
      setLoading(false);
      return;
    } else if (authData.userName.match(/^[0-9]/)) {
      toast.error("Username can not be a number. Ex: bond007", {
        autoClose: 2200,
      });
      setLoading(false);
      return;
    } else if (authData.email && !validateEmail.test(String(authData.email))) {
      toast.error("Your email is invalid", { autoClose: 2200 });
      setLoading(false);
      return;
    } else if (authData.password.length < 6) {
      toast.error("Password should be at least 6 characters", {
        autoClose: 2200,
      });
      setLoading(false);
      return;
    }

    //   else if(!authData.password.match(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{6,})/)){
    //     toast.error("Password should contain at least a number, lowercase, uppercase and a special character @,#,%,& etc.", { autoClose: 2200,});
    //     setLoading(false);
    //     return;
    // }

    axios
      .post(`${process.env.NEXT_PUBLIC_API_URL}/auth/signup`, {
        username: authData.userName,
        email: authData.email,
        password: authData.password,
        confirmPassword: authData.password,
        role: role,
      })
      .then(async (res) => {
        if (res?.status === 200) {
          await sendSignInLinkToEmail(auth, authData.email, {
            url: process.env.NEXT_PUBLIC_REGISTER_REDIRECT_URL,
            handleCodeInApp: true,
          });
          toast.success(`An email has been sent to ${authData.email}. Please check and confirm your registration`);
          authData.userName = "";
          authData.email = "";
          authData.password = "";
          setLoading(false);
          setRedirectTo(true);
        } else {
          console.warn("Something went wrong with signup");
          setLoading(false);
        }
      })
      .catch((error) => {
        toast.error(error.response.data.message);
        authData.userName = "";
        authData.email = "";
        authData.password = "";
        setLoading(false);
      });
  };

  return (
    <>
      {isRedirectTo && <Redirect to="/confirm-signup" />}
      <Dialog
        open={openAuthModal}
        onClose={handleCloseAuthModal}
        aria-labelledby="authentication-dialog"
        aria-describedby="authentication-dialog"
        style={{ backgroundColor: "rgb(20 51 64 / 77%)" }}
        className="[&_.ant-modal-content]:max-w-[800px]"
      >
        <DialogContent style={{ padding: 0, overflow: "hidden" }}>
          <Grid container>
            <Grid size={{ xs: 12, sm: 5 }}>
              <div className="bg-[#0088f2] p-[2.5rem] w-[100%] h-[100%] [&_p]:text-[#fff] [&_p]:font-[500] [&_p]:text-[13px] [&_p]:leading-[2] [&_img]:w-[100%] min-[1441px]:p-[2.5rem_2.5rem_7rem_2.5rem] max-[768.95px]:hidden">
                <img className="max-w-[120px] mb-[1.5rem]" src={logoWhite.src} alt="Piktask" width="120px" height="47px" />
                <Typography>Enjoy Free Download Now!</Typography>
                <Typography>* Get 50% OFF Discount for Premium Plan</Typography>
                <Typography>* Download 6 Images for Free Everyday</Typography>
                <Typography>* 2,600,000+ Images to energize your Design</Typography>

                <Spacing space={{ height: 30 }} />

                <img src={authImage.src} alt="Piktask" />
              </div>
            </Grid>

            <Grid size={{ xs: 12, sm: 7 }}>
              <div className="p-[2rem] h-[100%] max-[768.95px]:p-[1.5rem]">
                <div className="float-right mt-[-15px] text-[#0088f2] cursor-pointer max-[768.95px]:hidden max-[768.95px]:mt-[0]">
                  <CloseIcon onClick={() => setOpenAuthModal(false)} />
                </div>
                <Tabs
                  value={tabIndex}
                  onChange={handleChangeTab}
                  aria-label="authentication tabs"
                  className="[&_.pk-tabs]:justify-center [&_.pk-tabs]:pb-[2.5rem]"
                  classes={{ indicator: "h-[0] bg-[transparent]" }}
                  variant="fullWidth"
                >
                  <Tab label="Login" {...a11yProps(0)} className="text-[#646464] text-[17px] [transition:all_0.3s_linear] rounded-[0] hover:shadow-[rgba(33,35,38,0.1)_0px_10px_10px_-10px] hover:text-[#0088f2]" classes={{ selected: "text-[#0088f2] shadow-[rgba(33,35,38,0.1)_0px_10px_10px_-10px]" }} disableRipple />
                  <Tab label="Sign Up" {...a11yProps(1)} className="text-[#646464] text-[17px] [transition:all_0.3s_linear] rounded-[0] hover:shadow-[rgba(33,35,38,0.1)_0px_10px_10px_-10px] hover:text-[#0088f2]" classes={{ selected: "text-[#0088f2] shadow-[rgba(33,35,38,0.1)_0px_10px_10px_-10px]" }} disableRipple />
                </Tabs>
                {/* End tabs */}

                <Typography
                  style={{
                    textAlign: "center",
                    marginTop: "1.2rem",
                    marginBottom: "1.2rem",
                  }}
                >
                  with your social network
                </Typography>

                {/* Social login */}
                <SocialLogin setOpenAuthModal={setOpenAuthModal} role={role} />

                <Spacing space={{ height: "1rem" }} />

                <div className="bg-[#CBCBCB] h-[1px] relative [&_span]:absolute [&_span]:bg-[#fff] [&_span]:left-[50%] [&_span]:[transform:translate(-50%,-41%)] [&_span]:p-[0_5px] [&_span]:[font-style:italic] [&_span]:text-[13px]">
                  <span>OR</span>
                </div>

                <Spacing space={{ height: "2.5rem" }} />

                {/* Tab panel for Sign In */}
                <TabPanel value={tabIndex} index={0}>
                  <form onSubmit={handleSignIn}>
                    <InputField label="User Name / Email" name="userName" value={authData.userName} onChange={handleAuthData} />

                    <div className="flex items-center relative [&_img]:absolute [&_img]:top-[.8rem] [&_img]:right-[3rem] [&_img]:w-[2rem] [&_img]:cursor-pointer max-[768px]:[&_img]:w-[2rem]">
                      <InputField
                        label="Password"
                        type={passwordValue ? "text" : "password"}
                        name="password"
                        value={authData.password}
                        onChange={handleAuthData}
                      />
                      <img src={lockIcon.src} alt="Show or hide password" onClick={handleShowHidePassword} width="20px" height="23px" />
                    </div>

                    <CustomBtn disabled={isLoading} type="submit" text="Sign In" />
                  </form>

                  <Spacing space={{ height: "1.5rem" }} />

                  <Link to="/reset-password" className="text-[17px] text-[#0088f2] text-center block no-underline hover:underline">
                    Password Reset
                  </Link>

                  <div className="mt-[19%] text-[17px] text-center [&_span]:cursor-pointer [&_span]:text-[#0088f2]">
                    Not a member? <span onClick={handleChangeTab}>Sign Up</span>
                  </div>
                </TabPanel>

                {/* Tab panel for Sign Up */}
                <TabPanel value={tabIndex} index={1}>
                  <form onSubmit={handleSubmit}>
                    <InputField label="User Name" name="userName" value={authData.userName} onChange={handleAuthData} />

                    <InputField label="Email" name="email" value={authData.email} onChange={handleAuthData} />

                    <div className="flex items-center relative [&_img]:absolute [&_img]:top-[.8rem] [&_img]:right-[3rem] [&_img]:w-[2rem] [&_img]:cursor-pointer max-[768px]:[&_img]:w-[2rem]">
                      <InputField
                        label="Password"
                        type={passwordValue ? "text" : "password"}
                        name="password"
                        value={authData.password}
                        onChange={handleAuthData}
                      />
                      <img src={lockIcon.src} alt="Show or hide password" onClick={handleShowHidePassword} width="20px" height="23px" />
                    </div>

                    <CustomBtn text="Sign Up" disabledBtn={!authData.userName || !authData.email || !authData.password} />
                  </form>

                  <Spacing space={{ height: "0.5rem" }} />

                  <FormControlLabel
                    className="[&_.pk-form-label]:text-[13px] [&_.pk-form-label]:mb-[-14px] max-[768.95px]:hidden"
                    control={<Checkbox name="receiveNewsLetter" size="medium" className="[&_svg]:text-[2.5rem]" />}
                    label="I do not wish to receive news and promotions from Piktask LLC by email."
                  />

                  <div onClick={handleChangeTab} className="text-[17px] text-[#0088f2] text-center cursor-pointer mt-[1rem] max-[768.95px]:mt-[12.5%]">
                    Already registered? Log in
                  </div>
                </TabPanel>
              </div>
            </Grid>
          </Grid>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default SignUpModal;
