"use client";

import { Checkbox, Dialog, DialogContent, FormControlLabel, Grid, Tab, Tabs, Typography } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
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
import useStyles from "./SignUpModal.styles";

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
  const { classes } = useStyles();
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
        className={classes.dialogModal}
      >
        <DialogContent style={{ padding: 0, overflow: "hidden" }}>
          <Grid container>
            <Grid size={{ xs: 12, sm: 5 }}>
              <div className={classes.leftPanel}>
                <img className={classes.authLogo} src={logoWhite} alt="Piktask" width="120px" height="47px" />
                <Typography>Enjoy Free Download Now!</Typography>
                <Typography>* Get 50% OFF Discount for Premium Plan</Typography>
                <Typography>* Download 6 Images for Free Everyday</Typography>
                <Typography>* 2,600,000+ Images to energize your Design</Typography>

                <Spacing space={{ height: 30 }} />

                <img src={authImage} alt="Piktask" />
              </div>
            </Grid>

            <Grid size={{ xs: 12, sm: 7 }}>
              <div className={classes.rightPanel}>
                <div className={classes.closeModal}>
                  <CloseIcon fontSize="large" onClick={() => setOpenAuthModal(false)} />
                </div>
                <Tabs
                  value={tabIndex}
                  onChange={handleChangeTab}
                  aria-label="authentication tabs"
                  className={classes.tabsWrapper}
                  classes={{ indicator: classes.menuUnderline }}
                  variant="fullWidth"
                >
                  <Tab label="Login" {...a11yProps(0)} className={classes.tabItem} classes={{ selected: classes.selected }} disableRipple />
                  <Tab label="Sign Up" {...a11yProps(1)} className={classes.tabItem} classes={{ selected: classes.selected }} disableRipple />
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

                <div className={classes.horizontalLine}>
                  <span>OR</span>
                </div>

                <Spacing space={{ height: "2.5rem" }} />

                {/* Tab panel for Sign In */}
                <TabPanel value={tabIndex} index={0}>
                  <form onSubmit={handleSignIn}>
                    <InputField label="User Name / Email" name="userName" value={authData.userName} onChange={handleAuthData} />

                    <div className={classes.passwordField}>
                      <InputField
                        label="Password"
                        type={passwordValue ? "text" : "password"}
                        name="password"
                        value={authData.password}
                        onChange={handleAuthData}
                      />
                      <img src={lockIcon} alt="Show or hide password" onClick={handleShowHidePassword} width="20px" height="23px" />
                    </div>

                    <CustomBtn disabled={isLoading} type="submit" text="Sign In" />
                  </form>

                  <Spacing space={{ height: "1.5rem" }} />

                  <Link to="/reset-password" className={classes.passwordResetLink}>
                    Password Reset
                  </Link>

                  <div className={classes.signUpLink}>
                    Not a member? <span onClick={handleChangeTab}>Sign Up</span>
                  </div>
                </TabPanel>

                {/* Tab panel for Sign Up */}
                <TabPanel value={tabIndex} index={1}>
                  <form onSubmit={handleSubmit}>
                    <InputField label="User Name" name="userName" value={authData.userName} onChange={handleAuthData} />

                    <InputField label="Email" name="email" value={authData.email} onChange={handleAuthData} />

                    <div className={classes.passwordField}>
                      <InputField
                        label="Password"
                        type={passwordValue ? "text" : "password"}
                        name="password"
                        value={authData.password}
                        onChange={handleAuthData}
                      />
                      <img src={lockIcon} alt="Show or hide password" onClick={handleShowHidePassword} width="20px" height="23px" />
                    </div>

                    <CustomBtn text="Sign Up" disabledBtn={!authData.userName || !authData.email || !authData.password} />
                  </form>

                  <Spacing space={{ height: "0.5rem" }} />

                  <FormControlLabel
                    className={classes.checkboxLabel}
                    control={<Checkbox name="receiveNewsLetter" size="medium" className={classes.checkbox} />}
                    label="I do not wish to receive news and promotions from Piktask LLC by email."
                  />

                  <div onClick={handleChangeTab} className={classes.authText}>
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
