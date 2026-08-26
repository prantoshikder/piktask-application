"use client";

import { Button, Card, CardContent, Typography } from "@/components/ui-kit";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useHistory, useLocation } from "@/lib/router";
import { signInWithEmailLink } from "firebase/auth";
import { auth } from "../../../database";
import { imageObjSchema } from "../../../helpers";
import Layout from "../../../Layout";

const EmailVerification = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const location = useLocation();
  const user = useSelector((state) => state.user);

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    setUsername(window.localStorage.getItem("userName"));
    setEmail(window.localStorage.getItem("email"));
    setPassword(window.localStorage.getItem("password"));
  }, []);

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
  }, [user, history, location.pathname]);

  const saveData = async () => {
    const result = await signInWithEmailLink(auth, email, window.location.href);
    console.log(result);

    try {
      if (result.user.emailVerified) {
        // Get User ID token
        const user = auth.currentUser;
        await user.updatePassword(password);
        const idTokenResult = await user.getIdTokenResult();

        dispatch({
          type: "LOGGED_IN_USER",
          payload: {
            email: user.email,
            token: idTokenResult.token,
          },
        });

        // Remove data from localstorage
        window.localStorage.removeItem("userName");
        window.localStorage.removeItem("email");
        window.localStorage.removeItem("password");
      }

      setTimeout(() => {
        history.push("/login");
      }, 3000);
    } catch (error) {
      console.log(error.message);
    }
  };
  // saveData() used to be invoked directly in the component body, which
  // signed the user in again on every render and dereferenced window during
  // server rendering. It runs once on mount now, and only when the values it
  // needs have been read out of localStorage.
  useEffect(() => {
    if (!email || !password) return;
    saveData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [email, password]);

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
    <Layout title="Email verification">
      <div className="w-[50rem] m-[auto]">
        <Card className="flex items-baseline justify-center flex-col">
          <CardContent>
            <Typography className="undefined" variant="h4" gutterBottom>
              Thank you very much to verify your email.
            </Typography>
            <br />
            <Typography variant="h5" component="h2"></Typography>
            <Typography variant="body1">Now you are redirecting to login page or click below to login</Typography>

            <Button className="p-[0] mt-[2rem] hover:bg-[transparent]" size="medium" disableRipple component={Link} to="/login">
              Login
            </Button>
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
};

export default EmailVerification;
