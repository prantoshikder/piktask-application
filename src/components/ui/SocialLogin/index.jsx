"use client";

import { faFacebookF } from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import FacebookLogin from "@greatsumini/react-facebook-login";
import { GoogleLogin, GoogleOAuthProvider } from "@react-oauth/google";
import { Button } from "@mui/material";
import { jwtDecode as jwt_decode } from "jwt-decode";
import { useDispatch } from "react-redux";
import { useHistory, useLocation } from "@/lib/router";
import Spacing from "./../../Spacing/index";
import useStyles from "./SocialLogin.style";

/**
 * react-google-login and react-facebook-login are both unmaintained and do not
 * work on React 18+, so they were replaced with @react-oauth/google and
 * @greatsumini/react-facebook-login.
 *
 * The request bodies sent to /auth/google_login and /auth/facebook_login are
 * unchanged: Google still receives a Google ID token (the `credential` field is
 * the same JWT the old library called `tokenId`) and Facebook still receives
 * `accessToken` + `userID`.
 */
const clientId =
  process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID || "928238679381-jf4obccehr2mq8lotat83l4q0n6l6cqi.apps.googleusercontent.com";
const fbAppId = process.env.NEXT_PUBLIC_FACEBOOK_APP_ID || "2594350707375312";

const SocialLogin = (props) => {
  const { classes } = useStyles();
  const history = useHistory();
  const location = useLocation();
  const dispatch = useDispatch();
  const { setOpenAuthModal, role } = props;
  const { from } = location.state || { from: { pathname: "/" } };

  const completeLogin = (data, contributorTarget) => {
    if (!data?.status) return;

    setOpenAuthModal(false);
    const token = data.token;
    localStorage.setItem("token", token);
    const decodedToken = jwt_decode(token.split(" ")[1]);
    localStorage.setItem("profileImage", decodedToken.avatar);

    if (decodedToken.email) {
      dispatch({
        type: "SET_USER",
        payload: { ...decodedToken, token },
      });
    }

    if (decodedToken.role === "contributor") {
      history.push(contributorTarget);
    } else if (location.pathname) {
      history.push(location.pathname);
    } else {
      history.replace(from);
    }
  };

  //login with google
  const handleGoogleLogin = async (credentialResponse) => {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/google_login`, {
      method: "POST",
      body: JSON.stringify({
        token: credentialResponse.credential,
        role: role,
      }),
      headers: { "Content-Type": "application/json" },
    });

    completeLogin(await res.json(), "/contributor/dashboard");
  };

  //login with facebook
  const handleFacebookLogin = async (facebookData) => {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/facebook_login`, {
      method: "POST",
      body: JSON.stringify({
        accessToken: facebookData.accessToken,
        userID: facebookData.userID,
        role: role,
      }),
      headers: { "Content-Type": "application/json" },
    });

    completeLogin(await res.json(), "/contributor/upload");
  };

  return (
    <div className={classes.socialsButtons}>
      {/* Google's identity flow renders its own branded button; unlike the old
          library it cannot be swapped for a custom MUI button and still return
          an ID token. */}
      <GoogleOAuthProvider clientId={clientId}>
        <GoogleLogin onSuccess={handleGoogleLogin} onError={() => {}} text="signin" shape="pill" />
      </GoogleOAuthProvider>

      <Spacing space={{ margin: "0 0.5rem" }} />

      <FacebookLogin
        appId={fbAppId}
        onSuccess={handleFacebookLogin}
        onFail={() => {}}
        fields="name,email,picture"
        render={({ onClick }) => (
          <Button className={classes.facebookBtn} onClick={onClick}>
            <FontAwesomeIcon className={classes.facebookIconBtn} icon={faFacebookF} />
            <span>Facebook</span>
          </Button>
        )}
      />
    </div>
  );
};

export default SocialLogin;
