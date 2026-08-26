"use client";

import { Container, Grid, Typography } from "@/components/ui-kit";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Redirect, useHistory, useLocation } from "@/lib/router";
import { toast } from "react-toastify";
import { CustomBtn, InputField } from "../../../components/InputField";
import Spacing from "../../../components/Spacing";
import Footer from "../../../components/ui/Footer";
import Header from "../../../components/ui/Header";
import { imageObjSchema } from "../../../helpers";
import Layout from "../../../Layout";
import HeroSection from "./../../../components/ui/Hero/index";

const ConfirmSignup = () => {
  const history = useHistory();
  const location = useLocation();
  const user = useSelector((state) => state.user);

  const [isRedirectTo, setRedirectTo] = useState(false);
  const [isLoading, setLoading] = useState(true);
  const [token, setToken] = useState("");
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

    document.body.style.backgroundColor = "#ECEEF5";

    if (token) {
      setLoading(false);
    }

    return () => {
      document.body.style.backgroundColor = "";
    };
  }, [token, user, history, location.pathname]);

  //For Set Password
  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);

    if (!token) {
      setLoading(true);
      setToken("");
      toast.error("Field should not be empty. ", { autoClose: 2200 });
      return;
    } else if (!token.match(/^(?=.*[0-9])/)) {
      setLoading(true);
      setToken("");
      toast.error("Token only contains numeric value", { autoClose: 2200 });
      return;
    } else if (token.match(/^(?=.*[0-9])/) && token.match(/^(?=.*[a-zA-Z])/)) {
      setLoading(true);
      setToken("");
      toast.error("Token only contains numeric values", { autoClose: 2200 });
      return;
    } else if (token.length < 8 || token.length > 8) {
      setLoading(true);
      setToken("");
      toast.error("Token should be 8 digit number", { autoClose: 2200 });
      return;
    }

    if (token) {
      axios
        .post(`${process.env.NEXT_PUBLIC_API_URL}/auth/verify/account`, { token })
        .then((res) => {
          if (res.status === 200) {
            toast.success(res.data.message);
            setLoading(false);
            setRole(res?.data.role);
            setToken("");
            setRedirectTo(true);
          }
        })
        .catch((error) => {
          toast.error(error.response.data.message);
          setLoading(false);
          setToken("");
        });
    }
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
    <Layout title="Confirm Signup">
      {/* if confirm redirect to login */}
      {isRedirectTo && <Redirect to={`/login?${role}`} />}
      <Header />

      <HeroSection title="Graphic Resources for Free Download" />

      <Spacing space={{ height: "10rem" }} />
      <Container>
        <Grid container spacing={0} alignItems="center" justifyContent="center">
          <Grid size={{ xs: 12, sm: 6, md: 6 }}>
            <div className="bg-[#fff] rounded-[4px] basis-[40%] max-[479.95px]:w-[30rem]" style={{ padding: "4rem" }}>
              <div className="text-center">
                <Typography className="text-[3rem] text-[#13303C]" variant="h2">
                  Confirm Signup
                </Typography>

                <Spacing space={{ height: "1.5rem" }} />

                <Typography className="text-[#13303C] w-[70%] m-[auto]">
                  We've sent you an email with some digits. Please check your email and enter below to confirm your signup.
                </Typography>
              </div>

              <Spacing space={{ height: "3.5rem" }} />

              <form autoComplete="off" onSubmit={handleSubmit}>
                <InputField label="Enter Token" name="token" value={token} onChange={(e) => setToken(e.target.value)} />

                <CustomBtn text="Confirm Signup" disabledBtn={isLoading} />
              </form>
            </div>
          </Grid>
        </Grid>
      </Container>

      <Spacing space={{ height: "10rem" }} />

      <Footer />
    </Layout>
  );
};

export default ConfirmSignup;
