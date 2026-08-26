"use client";

import { Button, CardContent, CircularProgress, Grid, Typography } from "@/components/ui-kit";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "@/lib/router";
import box from "../../../../assets/dashboardicons/box.svg";
import arrowDown from "../../../../assets/dashboardicons/icon1.svg";
import moneyIcon from "../../../../assets/dashboardicons/money.svg";
import followerIcon from "../../../../assets/icons/followerIcon.png";
import { expiredLoginTime } from "../../../../helpers";
import Heading from "../../../ui/dashboard/contributor/Heading";

const CurrentMonthStatus = () => {
  const user = useSelector((state) => state.user);

  const [isLoading, setLoading] = useState(true);
  const [earnCurrentMonth, setEarnCurrentMonth] = useState({});
  const [earnPreviousMonth, setEarnPreviousMonth] = useState({});

  useEffect(() => {
    const CancelToken = axios.CancelToken;
    const source = CancelToken.source();

    // Author current month earning API integration
    if (user?.isLoggedIn && user?.role === "contributor") {
      var newDate = new Date();
      var firstDayCurrentMonth = new Date(newDate.getFullYear(), newDate.getMonth(), 2);
      var firstDay = firstDayCurrentMonth.toISOString().substring(0, 10);
      var todayCurrentMonth = newDate.toISOString().substring(0, 10);

      axios
        .get(`${process.env.NEXT_PUBLIC_API_URL}/contributor/dashboard/summery/?start=${firstDay}&end=${todayCurrentMonth}`, {
          cancelToken: source.token,
          headers: { Authorization: user?.token },
        })
        .then(({ data }) => {
          if (data?.status) {
            setEarnCurrentMonth(data?.user_statistics);
            setLoading(false);
          } else {
            setLoading(false);
          }
        })
        .catch((error) => {
          if (error.response.status === 401) {
            expiredLoginTime();
          }
          console.log("Dashboard summery", error.response.status);
          setLoading(false);
        });
    }

    // Author previous month earning API integration
    if (user?.isLoggedIn && user?.role === "contributor") {
      var previousDate = new Date();
      var previousMonthFirstDay = new Date(previousDate.getFullYear(), previousDate.getMonth() - 1, 2);
      var previousFirstDays = previousMonthFirstDay.toISOString().substring(0, 10);

      const previousMonthLastDay = new Date(previousDate.getFullYear(), previousDate.getMonth(), 1);
      var previousFirstDay = previousMonthLastDay.toISOString().substring(0, 10);

      axios
        .get(`${process.env.NEXT_PUBLIC_API_URL}/contributor/dashboard/summery/?start=${previousFirstDays}&end=${previousFirstDay}`, {
          cancelToken: source.token,
          headers: { Authorization: user?.token },
        })
        .then(({ data }) => {
          if (data?.status) {
            setEarnPreviousMonth(data?.user_statistics);
            setLoading(false);
          } else {
            setLoading(false);
          }
        })
        .catch((error) => {
          if (error.response.status === 401) {
            expiredLoginTime();
          }
          console.log("Dashboard summery", error);
          setLoading(false);
        });
    }

    return () => source.cancel();
  }, [user?.isLoggedIn, user?.role, user?.token]);

  return (
    <>
      {isLoading ? (
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            margin: "0 auto",
            height: 300,
          }}
        >
          <CircularProgress color="primary" />
        </div>
      ) : (
        <div className="p-[1.5rem_1rem_0rem_1rem] mt-[8rem]">
          <div className="flex items-center justify-between m-[0rem_1rem] [&_h2]:text-[1.8rem]">
            <Heading tag="h2">Current Month</Heading>
            <Button className="text-[#000] font-[400] font-['Roboto',sans-serif] capitalize text-[1.5rem] rounded-[3rem] opacity-[1] leading-[1.75] p-[.2rem_1.5rem] bg-[#fff] [border:.2rem_solid] border-[#0088f2] [transition:all_0.3s_linear] hover:border-[#0088f2] hover:bg-[#0088f2] hover:text-[#fff]" component={Link} to={`/contributor/earnings`}>
              More status
            </Button>
          </div>
          <Grid container>
            <Grid size={{ xs: 6, sm: 6, md: 3 }} className="max-[576px]:max-w-[50%] max-[576px]:basis-[50%]">
              <CardContent className="text-center m-[1rem] bg-[#fff] pb-[1.5rem] shadow-[0_8px_12px_3px_rgb(0_0_0_/_6%)] hover:[&_img]:[transform:rotate(360deg)] hover:[&_img]:[transition:all_0.5s_linear]">
                <div className="m-[0_auto] bg-[#EEEDFC] rounded-[100%] w-[4rem] h-[4rem] flex items-center justify-center [&_img]:w-[2rem] [&_img]:h-[2rem] max-[1170px]:w-[5rem] max-[1170px]:h-[5rem] max-[1170px]:[&_img]:w-[1.8rem] max-[1170px]:[&_img]:h-[1.8rem]">
                  <img src={moneyIcon.src} alt="Money" width="20px" height="20px" />
                </div>
                <Typography className="text-[2.5rem] m-[2rem_0rem] leading-[1] [&_span]:text-[#b6b6b6] [&_span]:text-[1.4rem] [&_span]:block [&_span]:mt-[.7rem] [&_span]:font-[400] max-[1170px]:text-[2.2rem] max-[1170px]:[&_span]:text-[1.4rem]" variant="h1">
                  ${earnCurrentMonth?.total_earning}
                  <span>Earning</span>
                </Typography>
                <Typography>Last month: ${earnPreviousMonth?.total_earning}</Typography>
              </CardContent>
            </Grid>

            <Grid size={{ xs: 6, sm: 6, md: 3 }} className="max-[576px]:max-w-[50%] max-[576px]:basis-[50%]">
              <CardContent className="text-center m-[1rem] bg-[#fff] pb-[1.5rem] shadow-[0_8px_12px_3px_rgb(0_0_0_/_6%)] hover:[&_img]:[transform:rotate(360deg)] hover:[&_img]:[transition:all_0.5s_linear]">
                <div className="m-[0_auto] bg-[#EEEDFC] rounded-[100%] w-[4rem] h-[4rem] flex items-center justify-center [&_img]:w-[2rem] [&_img]:h-[2rem] max-[1170px]:w-[5rem] max-[1170px]:h-[5rem] max-[1170px]:[&_img]:w-[1.8rem] max-[1170px]:[&_img]:h-[1.8rem]">
                  <img src={arrowDown.src} alt="Download" width="20px" height="20px" />
                </div>
                <Typography className="text-[2.5rem] m-[2rem_0rem] leading-[1] [&_span]:text-[#b6b6b6] [&_span]:text-[1.4rem] [&_span]:block [&_span]:mt-[.7rem] [&_span]:font-[400] max-[1170px]:text-[2.2rem] max-[1170px]:[&_span]:text-[1.4rem]" variant="h1">
                  {earnCurrentMonth?.total_downloads}
                  <span>Download</span>
                </Typography>
                <Typography>Last month: {earnPreviousMonth?.total_downloads}</Typography>
              </CardContent>
            </Grid>

            <Grid size={{ xs: 6, sm: 6, md: 3 }} className="max-[576px]:max-w-[50%] max-[576px]:basis-[50%]">
              <CardContent className="text-center m-[1rem] bg-[#fff] pb-[1.5rem] shadow-[0_8px_12px_3px_rgb(0_0_0_/_6%)] hover:[&_img]:[transform:rotate(360deg)] hover:[&_img]:[transition:all_0.5s_linear]">
                <div className="m-[0_auto] bg-[#EEEDFC] rounded-[100%] w-[4rem] h-[4rem] flex items-center justify-center [&_img]:w-[2rem] [&_img]:h-[2rem] max-[1170px]:w-[5rem] max-[1170px]:h-[5rem] max-[1170px]:[&_img]:w-[1.8rem] max-[1170px]:[&_img]:h-[1.8rem]">
                  <img src={followerIcon.src} alt="FollowerIcon" width="20px" height="20px" />
                </div>
                <Typography className="text-[2.5rem] m-[2rem_0rem] leading-[1] [&_span]:text-[#b6b6b6] [&_span]:text-[1.4rem] [&_span]:block [&_span]:mt-[.7rem] [&_span]:font-[400] max-[1170px]:text-[2.2rem] max-[1170px]:[&_span]:text-[1.4rem]" variant="h1">
                  {earnCurrentMonth?.total_follower}
                  <span>Follower</span>
                </Typography>
                <Typography>Last month: {earnPreviousMonth?.total_follower}</Typography>
              </CardContent>
            </Grid>

            <Grid size={{ xs: 6, sm: 6, md: 3 }} className="max-[576px]:max-w-[50%] max-[576px]:basis-[50%]">
              <CardContent className="text-center m-[1rem] bg-[#fff] pb-[1.5rem] shadow-[0_8px_12px_3px_rgb(0_0_0_/_6%)] hover:[&_img]:[transform:rotate(360deg)] hover:[&_img]:[transition:all_0.5s_linear]">
                <div className="m-[0_auto] bg-[#EEEDFC] rounded-[100%] w-[4rem] h-[4rem] flex items-center justify-center [&_img]:w-[2rem] [&_img]:h-[2rem] max-[1170px]:w-[5rem] max-[1170px]:h-[5rem] max-[1170px]:[&_img]:w-[1.8rem] max-[1170px]:[&_img]:h-[1.8rem]">
                  <img src={box.src} alt="Products" width="20px" height="20px" />
                </div>
                <Typography className="text-[2.5rem] m-[2rem_0rem] leading-[1] [&_span]:text-[#b6b6b6] [&_span]:text-[1.4rem] [&_span]:block [&_span]:mt-[.7rem] [&_span]:font-[400] max-[1170px]:text-[2.2rem] max-[1170px]:[&_span]:text-[1.4rem]" variant="h1">
                  {earnCurrentMonth?.total_image}
                  <span>Files</span>
                </Typography>
                <Typography>Last month: {earnPreviousMonth?.total_image}</Typography>
              </CardContent>
            </Grid>
          </Grid>
        </div>
      )}
    </>
  );
};

export default CurrentMonthStatus;
