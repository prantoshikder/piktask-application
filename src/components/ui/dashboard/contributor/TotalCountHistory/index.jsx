"use client";

import { Card, Grid } from "@mui/material";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { expiredLoginTime } from "../../../../../helpers";
import useStyles from "./TotalCountHistory.style";

const TotalCountHistory = () => {
  const { classes } = useStyles();
  const user = useSelector((state) => state.user);

  const [totalSummary, setTotalSummery] = useState({});

  useEffect(() => {
    const CancelToken = axios.CancelToken;
    const source = CancelToken.source();

    // Total earning summary API integration
    if (user?.isLoggedIn && user?.role === "contributor") {
      axios
        .get(`${process.env.NEXT_PUBLIC_API_URL}/contributor/earning/summary`, { cancelToken: source.token, headers: { Authorization: user?.token } })
        .then(({ data }) => {
          if (data?.status) {
            setTotalSummery(data?.total_summery);
          }
        })
        .catch((error) => {
          console.log("Earning summery", error);
          if (error.response.status === 401) {
            expiredLoginTime();
          }
        });
    }
  }, [user?.isLoggedIn, user?.role, user?.token]);

  return (
    <>
      <Grid container spacing={0}>
        <Grid size={{ xs: 12 }}>
          <Card className={classes.cardWrapper}>
            <div className={classes.graphBox}>
              <div className={classes.amount}>${totalSummary?.total_earning}</div>
              <span className={classes.title}>Total Earning</span>
            </div>
            <div className={classes.graphBox}>
              <span className={`${classes.amount} ${classes.paidDownloadColor}`}>{totalSummary?.total_images}</span>
              <span className={classes.title}>Total Files</span>
            </div>
            <div className={classes.graphBox}>
              <span className={`${classes.amount} ${classes.freeDownloadColor}`}>{totalSummary?.total_followers}</span>
              <span className={classes.title}>Total Follower</span>
            </div>
            <div className={classes.graphBox}>
              <span className={`${classes.amount} ${classes.totalDownloadColor}`}>{totalSummary?.total_downloads}</span>
              <span className={classes.title}>Total Download</span>
            </div>
            <div className={classes.graphBox}>
              <div className={classes.amount}>${totalSummary?.balance}</div>
              <span className={classes.title}>Available Balance</span>
            </div>
          </Card>
        </Grid>
      </Grid>
    </>
  );
};

export default TotalCountHistory;
