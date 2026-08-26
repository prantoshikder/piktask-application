"use client";

import { Button, Checkbox, FormControlLabel, Radio, RadioGroup, TextField, Typography } from "@mui/material";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link, Redirect, useLocation } from "@/lib/router";
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
import useStyles from "../Auth.styles";

const Registration = ({ history }) => {
  const { classes } = useStyles();
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
      <div className={classes.rootContainer}>
        <Spacing space={{ height: "5rem" }} />

        <div className={classes.formPageContainer}>
          <img src={formIconTop} alt="Background Icon" className={classes.backgroundIconTop} />
          <div className={classes.formWrapper}>
            <div className={classes.formWrapperInner}>
              <div className={classes.formHeading}>
                <Typography className={classes.formTitle} variant="h2">
                  Sign Up
                </Typography>
                <Typography className={classes.formSubtitle}>With your social network</Typography>
              </div>

              <div>
                {/* <Typography variant="subtitle1" className={classes.formDevider}>
                  Or
                </Typography> */}

                <div>
                  <form autoComplete="off" className={classes.form} onSubmit={handleSubmit}>
                    <TextField
                      fullWidth
                      variant="outlined"
                      label="User name"
                      className={classes.formControl}
                      name="username"
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                    />
                    <TextField
                      fullWidth
                      variant="outlined"
                      label="Email"
                      className={classes.formControl}
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                    <div className={classes.passwordField}>
                      <TextField
                        fullWidth
                        variant="outlined"
                        label="Password"
                        type={value ? "text" : "password"}
                        className={classes.formControl}
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                      />
                      <img src={lockIcon} alt="Show or hide password" onClick={handleShowHidePassword} />
                    </div>

                    <RadioGroup onChange={handleUserRole} row aria-label="gender" name="row-radio-buttons-group">
                      <FormControlLabel value="user" control={<Radio />} label="User" />
                      <FormControlLabel value="contributor" control={<Radio />} label="Contributor" />
                    </RadioGroup>

                    <Typography variant="body1" className={classes.helpText}>
                      Your password must be at least 6 characters long and must contain letters, numbers and special characters. Cannot contain whitespace.
                    </Typography>

                    <FormControlLabel
                      value="end"
                      label=" I do not wish to receive news and promotions from Piktask LLC by email."
                      labelPlacement="end"
                      control={<Checkbox color="primary" />}
                      className={classes.checkboxLabel}
                    />
                    <Button variant="contained" fullWidth className={classes.formButton} type="submit" disabled={!username || !email || !password || !role}>
                      Sign Up
                    </Button>
                  </form>

                  <Button component={Link} to="/login" className={classes.formLink} disableRipple>
                    Already registered? Log in
                  </Button>
                </div>
              </div>
            </div>
          </div>
          <img src={formIconBottom} alt="Piktask" className={classes.backgroundIconBottom} />
        </div>
        <Spacing space={{ height: "5rem" }} />
      </div>
      <Footer />
    </Layout>
  );
};

export default Registration;
