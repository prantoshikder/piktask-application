"use client";

import { Button, Container, Grid, Typography } from "@/components/ui-kit";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link, useHistory, useLocation } from "@/lib/router";
import { toast } from "react-toastify";
import { CustomBtn, InputField } from "../../../components/InputField";
import Spacing from "../../../components/Spacing";
import Footer from "../../../components/ui/Footer";
import Header from "../../../components/ui/Header";
import HeroSection from "../../../components/ui/Hero";
import { imageObjSchema } from "../../../helpers";
import Layout from "../../../Layout";

const ResetPassword = () => {
  const history = useHistory();
  const location = useLocation();
  const user = useSelector((state) => state.user);
  const { from } = location.state || { from: { pathname: "/login" } };

  const [passwordChange, setPasswordChange] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [confirmPassword, setConfirmPassword] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [token, setToken] = useState("");

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

    document.body.style.backgroundColor = "#ECEEF5";

    return () => {
      document.body.style.backgroundColor = "";
    };
  }, [user, history, location.pathname]);

  // Reset Password
  const handleSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true);

    setPasswordChange(true);

    const validateEmail =
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    if (email && !validateEmail.test(String(email))) {
      toast.error("Your email is invalid", { autoClose: 2200 });
      setPasswordChange(false);
      setIsLoading(false);
      return;
    }

    if (email && !passwordChange) {
      axios
        .post(`${process.env.NEXT_PUBLIC_API_URL}/auth/forgot-password`, {
          email,
        })
        .then((res) => {
          if (res.status === 200) {
            toast.success(res.data.message);
          }
        })
        .catch((error) => {
          setPasswordChange(false);
          setEmail("");
          toast.error("No user found with this email", error.message);
        });
    }
    setIsLoading(false);
  };

  //For Set Password
  const handleSetPassword = () => {
    if (!token || !password || !confirmPassword) {
      setIsLoading(false);
      toast.error("All fields are required", { autoClose: 2200 });
      return;
    } else if (!token.match(/^(?=.*[0-9])/)) {
      setIsLoading(false);
      setToken("");
      toast.error("Token only contains numeric values", { autoClose: 2200 });
      return;
    } else if (token.match(/^(?=.*[0-9])/) && token.match(/^(?=.*[a-zA-Z])/)) {
      setIsLoading(false);
      setToken("");
      toast.error("Token only contains numeric values", { autoClose: 2200 });
      return;
    } else if (token.length < 8 || token.length > 8) {
      setIsLoading(false);
      setToken("");
      toast.error("Token should be 8 digit number", { autoClose: 2200 });
      return;
    } else if (password.length < 6) {
      setIsLoading(false);
      setPassword("");
      setConfirmPassword("");
      toast.error("Password should be at least 6 characters", {
        autoClose: 2200,
      });
      return;
    }
    //   else if(!password.match(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{6,})/)){
    //     toast.error("Password should contain at least a number, lowercase, uppercase and a special character @,#,%,& etc.");
    //     setLoading(false);
    //     return;
    // }
    else if (password !== confirmPassword) {
      setIsLoading(false);
      setPassword("");
      setConfirmPassword("");
      toast.error("Password not match");
      return;
    }

    if (passwordChange && token && password && confirmPassword) {
      axios
        .post(`${process.env.NEXT_PUBLIC_API_URL}/auth/reset-password`, {
          token,
          password,
          confirmPassword,
        })
        .then((res) => {
          if (res.status === 200) {
            toast.success(res.data.message);
            history.replace(from);
          }
        })
        .catch((error) => {
          toast.error(error.response.data.message);
          setToken("");
          setPassword("");
          setConfirmPassword("");
        });
    }
    setIsLoading(false);
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
    <Layout title="Reset Password">
      <Header />

      <HeroSection title="Graphic Resources for Free Download" />
      <Spacing space={{ height: "3.5rem" }} />

      <Container>
        <Grid container spacing={0} justifyContent="center">
          <Grid>
            <div className="bg-[#fff] rounded-[4px] basis-[40%] max-[479.95px]:w-[30rem]" style={{ padding: "2.5rem" }}>
              <div className="text-center">
                <Typography className="text-[3rem] text-[#13303C]" variant="h2">
                  Reset Password
                </Typography>

                <Spacing space={{ height: "1.5rem" }} />

                {!passwordChange && (
                  <Typography className="text-[#13303C] w-[70%] m-[auto]">
                    Enter your email address below and we’ll send a special reset password link to your inbox.
                  </Typography>
                )}

                {passwordChange && (
                  <Typography className="text-[#13303C] w-[70%] m-[auto]">
                    Enter your Token, New Password and Confirm Password <br /> to reset your password.
                  </Typography>
                )}
              </div>

              <Spacing space={{ height: "3.5rem" }} />

              <form autoComplete="off" onSubmit={handleSubmit}>
                {!passwordChange && <InputField label="Email" name="email" value={email} onChange={(e) => setEmail(e.target.value)} />}
                {passwordChange && <InputField label="Enter Your Token" name="token" value={token} onChange={(e) => setToken(e.target.value)} />}
                {passwordChange && <InputField label="New Password" name="password" value={password} onChange={(e) => setPassword(e.target.value)} />}
                {passwordChange && (
                  <InputField label="Confirm Password" name="confirmPassword" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} />
                )}

                {!passwordChange && <CustomBtn text="Reset Password" disabledBtn={isLoading || !email} />}
                {passwordChange && (
                  <CustomBtn text="Set Password" disabledBtn={isLoading || !token || !password || !confirmPassword} onClick={() => handleSetPassword()} />
                )}
              </form>

              <div className="flex justify-between mt-[1rem]">
                <Button component={Link} to="/login" className="text-[#117A00] text-[1.7rem] [text-transform:inherit] p-[0] hover:bg-[transparent]" disableRipple>
                  Login
                </Button>
                <Button component={Link} to="/registration" className="text-[#117A00] text-[1.7rem] [text-transform:inherit] p-[0] hover:bg-[transparent]" disableRipple>
                  Not a member? Sign up
                </Button>
              </div>
            </div>
          </Grid>
        </Grid>
      </Container>

      <Spacing space={{ height: "5rem" }} />

      <Footer />
    </Layout>
  );
};

export default ResetPassword;
