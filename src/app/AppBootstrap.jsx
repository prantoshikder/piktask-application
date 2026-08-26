"use client";

import axios from "axios";
import { jwtDecode } from "jwt-decode";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { expiredLoginTime, getBaseURL, setBaseURL } from "../helpers";

/**
 * The mount-time side effects that used to live in CRA's App.jsx.
 *
 * Difference from CRA: this no longer gates rendering on the /client/urls
 * response. That call is made by the root layout on the server and injected
 * before hydration, so there is nothing to wait for; the fetch below is only a
 * fallback for when the server call failed.
 */
export default function AppBootstrap() {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);

  useEffect(() => {
    const source = axios.CancelToken.source();

    // Re-hydrate auth state from the token left in localStorage.
    const token = window.localStorage.getItem("token");
    const avatar = window.localStorage.getItem("profileImage");

    if (token) {
      try {
        const decodeToken = jwtDecode(token.split(" ")[1]);

        if (decodeToken.email) {
          dispatch({
            type: "SET_USER",
            payload: { ...decodeToken, token, avatar },
          });
        }
      } catch {
        // A malformed/rotated token should sign the user out rather than crash.
        window.localStorage.removeItem("token");
      }
    }

    axios
      .get(`${process.env.NEXT_PUBLIC_API_URL}/categories/popular?limit=6`, { cancelToken: source.token })
      .then(({ data }) => {
        if (data?.status) {
          dispatch({ type: "POPULAR_CATEGORIES", payload: [...data.categories] });
        }
      })
      .catch(() => {});

    // Fallback only: the server render normally supplies these.
    if (!getBaseURL().bucket_base_url) {
      axios
        .get(`${process.env.NEXT_PUBLIC_API_URL}/client/urls`, { cancelToken: source.token })
        .then(({ data }) => {
          if (data?.status) setBaseURL(data.urls);
        })
        .catch(() => {});
    }

    return () => source.cancel();
  }, [dispatch]);

  useEffect(() => {
    const source = axios.CancelToken.source();

    if (user?.isLoggedIn && user?.role === "contributor") {
      axios
        .get(`${process.env.NEXT_PUBLIC_API_URL}/contributor/images/total_count`, {
          cancelToken: source.token,
          headers: { Authorization: user?.token },
        })
        .then(({ data }) => {
          if (data?.status) {
            dispatch({ type: "TOTAL_PRODUCT_COUNT", payload: { ...data } });
          }
        })
        .catch((error) => {
          if (error?.response?.status === 401) {
            expiredLoginTime();
          }
        });
    }

    return () => source.cancel();
  }, [user?.isLoggedIn, user?.role, user?.token, dispatch]);

  return null;
}
