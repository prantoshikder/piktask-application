"use client";

import { Button, Checkbox, FormControlLabel, Radio, RadioGroup, TextField, Typography } from "@/components/ui-kit";
import axios from "axios";
import { jwtDecode as jwt_decode } from "jwt-decode";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useHistory, useLocation } from "@/lib/router";
import { toast } from "react-toastify";
import formIconBottom from "../../../assets/formIconBottom.png";
import formIconTop from "../../../assets/formIconTop.png";
import lockIcon from "../../../assets/password.png";
import Spacing from "../../../components/Spacing";
import Footer from "../../../components/ui/Footer";
import Header from "../../../components/ui/Header";
import { imageObjSchema } from "../../../helpers";
import Layout from "../../../Layout";

const Login = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const location = useLocation();
  const user = useSelector((state) => state.user);
  const { from } = location.state || { from: { pathname: "/" } };

  const [loading, setLoading] = useState(true);
  const [value, setValue] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("");

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

  const handleShowHidePassword = () => {
    setValue((value) => !value);
  };

  const handleUserRole = (e) => {
    setRole(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    if (!username) {
      toast.error("User name should not be empty!");
      setLoading(false);
      return;
    } else if (!password) {
      toast.error("Password is required!");
      setLoading(false);
      return;
    } else if (!role) {
      toast.error("Please, select your role.");
      setLoading(false);
      return;
    }

    axios
      .post(`${process.env.NEXT_PUBLIC_API_URL}/auth/login`, {
        username,
        password,
        role,
      })
      .then((res) => {
        if (res.data.status) {
          const token = res.data.token;
          localStorage.setItem("token", token);
          const decodedToken = jwt_decode(token.split(" ")[1]);
          localStorage.setItem("profileImage", decodedToken.avatar);

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
          } else if (decodedToken.role === "user") {
            history.push(location.state.from.pathname);
          } else {
            history.push(from);
          }

          setUsername("");
          setPassword("");
          setRole("");
          setLoading(false);
        }
      })
      .catch((error) => {
        setUsername("");
        setPassword("");
        setRole("");
        setLoading(false);
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
    <Layout title="Login">
      <Header />

      <div className="w-[53rem] left-[50%] relative [transform:translate(-50%,0%)] max-[768px]:w-[70%] max-[768px]:p-[0_2rem] max-[479.95px]:w-[100%]">
        <Spacing space={{ height: "5rem" }} />

        <div className="rounded-[1rem] overflow-hidden relative bg-[#fff] max-[768px]:p-[0_2.5rem]">
          <img src={formIconTop.src} alt="Background Icon" className="absolute top-[-.5rem] left-[0] w-[16rem] max-[768px]:w-[15rem] max-[479.95px]:w-[13rem]" />

          <div className="relative m-[2rem_0_2.5rem] max-[768px]:m-[0]">
            <div className="w-[46rem] m-[0_auto_3rem] max-[768px]:w-[100%] max-[768px]:mb-[1.5rem]">
              <div className="text-center m-[3rem_0_2.5rem] max-[768px]:m-[2rem_0_1em]">
                <Typography className="mb-[0.4rem] text-[2.4rem] text-center" variant="h2">
                  Sign In
                </Typography>
                <Typography className="text-[1.6rem]">Sign in with your email & password</Typography>
              </div>

              <div>
                <form onSubmit={handleSubmit} autoComplete="off" className="max-[768px]:[&_input]:p-[11px_14px] max-[768px]:[&_label]:text-[1.4rem] max-[768px]:[&_label]:top-[-.6rem]">
                  <TextField
                    fullWidth
                    variant="outlined"
                    label="User name / Email"
                    className="mb-[1.5rem] [&_input]:border-[#CBCBCB] [&_input:focus]:[outline-color:red] max-[768px]:mb-[1.5rem]"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
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

                  <FormControlLabel
                    value="end"
                    label="I can't remember my password"
                    labelPlacement="end"
                    control={<Checkbox color="primary" />}
                    className="pb-[3rem] mr-[0] [&_span]:text-[#143340] [&_span]:text-[1.3rem]"
                  />

                  <Button variant="contained" fullWidth className="bg-[#3B9EE8] text-[2rem] rounded-[0] font-[400] shadow-[none] mt-[-1.8rem] mb-[3rem] p-[0.8rem_2rem] [&_span]:text-[#fff] hover:bg-[#3092da] hover:shadow-[none] max-[768px]:mb-[.5rem] max-[768px]:p-[.5rem_2rem] max-[768px]:text-[1.6rem]" type="submit" disabled={!username || !password || !role}>
                    Sign In
                  </Button>

                  <Link to="/reset-password" className="text-[17px] text-[#469439] text-center block no-underline hover:underline max-[768px]:top-[-.6rem]">
                    Password Reset
                  </Link>
                  <Spacing space={{ height: "1rem" }} />
                </form>

                <Button component={Link} to="/registration" className="text-[#0088f2] block text-center text-[1.5rem] font-[500] hover:bg-[transparent] max-[768px]:mt-[18px] max-[768px]:relative max-[768px]:left-[50%] max-[768px]:[transform:translateX(-50%)] max-[768px]:inline-block">
                  Not a member? Sign up
                </Button>
              </div>
            </div>
          </div>
          <img src={formIconBottom.src} alt="Background" className="absolute bottom-[-.5rem] right-[-.1rem] w-[16rem] max-[768px]:w-[15rem] max-[479.95px]:w-[11rem]" />
        </div>

        <Spacing space={{ height: "5rem" }} />
      </div>
      <Footer />
    </Layout>
  );
};

export default Login;
