"use client";

import { Card, Grid } from "@/components/ui-kit";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { expiredLoginTime } from "../../../../../helpers";

const TotalCountHistory = () => {
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
          <Card className="flex items-center justify-between pt-[3rem] pb-[3rem] mt-[2rem] shadow-[rgb(0_0_0_/_5%)_0px_10px_15px_-3px,rgb(0_0_0_/_5%)_0px_4px_6px_-2px] mb-[3.5rem] max-[1024px]:flex-wrap max-[1024px]:justify-between max-[640px]:justify-center">
            <div className={"flex items-center flex-col relative w-[100%] after:content-[\"\"] after:absolute after:right-[0] after:top-[0] after:bg-[rgb(112_112_112_/_18%)] after:w-[1px] after:h-[100%] [&:last-child:after]:bg-[transparent] [&:last-child:after]:w-[0] [&:last-child:after]:h-[0] max-[1024px]:w-[auto] max-[1024px]:pr-[2rem] max-[1024px]:pl-[2rem] max-[1024px]:mb-[3rem] max-[577px]:w-[auto] max-[577px]:pr-[2rem] max-[577px]:pl-[2rem] max-[577px]:mb-[3rem] max-[577px]:after:bg-[transparent] max-[577px]:after:w-[0] max-[577px]:after:h-[0]"}>
              <div className="text-[#FDA701] text-[2.8rem] mb-[1rem] font-[600]">${totalSummary?.total_earning}</div>
              <span className="text-[#4D4D4D] text-[1.5rem] mb-[0.8rem]">Total Earning</span>
            </div>
            <div className={"flex items-center flex-col relative w-[100%] after:content-[\"\"] after:absolute after:right-[0] after:top-[0] after:bg-[rgb(112_112_112_/_18%)] after:w-[1px] after:h-[100%] [&:last-child:after]:bg-[transparent] [&:last-child:after]:w-[0] [&:last-child:after]:h-[0] max-[1024px]:w-[auto] max-[1024px]:pr-[2rem] max-[1024px]:pl-[2rem] max-[1024px]:mb-[3rem] max-[577px]:w-[auto] max-[577px]:pr-[2rem] max-[577px]:pl-[2rem] max-[577px]:mb-[3rem] max-[577px]:after:bg-[transparent] max-[577px]:after:w-[0] max-[577px]:after:h-[0]"}>
              <span className="text-[#FDA701] text-[2.8rem] mb-[1rem] font-[600] text-[#FB5252]">{totalSummary?.total_images}</span>
              <span className="text-[#4D4D4D] text-[1.5rem] mb-[0.8rem]">Total Files</span>
            </div>
            <div className={"flex items-center flex-col relative w-[100%] after:content-[\"\"] after:absolute after:right-[0] after:top-[0] after:bg-[rgb(112_112_112_/_18%)] after:w-[1px] after:h-[100%] [&:last-child:after]:bg-[transparent] [&:last-child:after]:w-[0] [&:last-child:after]:h-[0] max-[1024px]:w-[auto] max-[1024px]:pr-[2rem] max-[1024px]:pl-[2rem] max-[1024px]:mb-[3rem] max-[577px]:w-[auto] max-[577px]:pr-[2rem] max-[577px]:pl-[2rem] max-[577px]:mb-[3rem] max-[577px]:after:bg-[transparent] max-[577px]:after:w-[0] max-[577px]:after:h-[0]"}>
              <span className="text-[#FDA701] text-[2.8rem] mb-[1rem] font-[600] text-[#257DED]">{totalSummary?.total_followers}</span>
              <span className="text-[#4D4D4D] text-[1.5rem] mb-[0.8rem]">Total Follower</span>
            </div>
            <div className={"flex items-center flex-col relative w-[100%] after:content-[\"\"] after:absolute after:right-[0] after:top-[0] after:bg-[rgb(112_112_112_/_18%)] after:w-[1px] after:h-[100%] [&:last-child:after]:bg-[transparent] [&:last-child:after]:w-[0] [&:last-child:after]:h-[0] max-[1024px]:w-[auto] max-[1024px]:pr-[2rem] max-[1024px]:pl-[2rem] max-[1024px]:mb-[3rem] max-[577px]:w-[auto] max-[577px]:pr-[2rem] max-[577px]:pl-[2rem] max-[577px]:mb-[3rem] max-[577px]:after:bg-[transparent] max-[577px]:after:w-[0] max-[577px]:after:h-[0]"}>
              <span className="text-[#FDA701] text-[2.8rem] mb-[1rem] font-[600] text-[#117A00]">{totalSummary?.total_downloads}</span>
              <span className="text-[#4D4D4D] text-[1.5rem] mb-[0.8rem]">Total Download</span>
            </div>
            <div className={"flex items-center flex-col relative w-[100%] after:content-[\"\"] after:absolute after:right-[0] after:top-[0] after:bg-[rgb(112_112_112_/_18%)] after:w-[1px] after:h-[100%] [&:last-child:after]:bg-[transparent] [&:last-child:after]:w-[0] [&:last-child:after]:h-[0] max-[1024px]:w-[auto] max-[1024px]:pr-[2rem] max-[1024px]:pl-[2rem] max-[1024px]:mb-[3rem] max-[577px]:w-[auto] max-[577px]:pr-[2rem] max-[577px]:pl-[2rem] max-[577px]:mb-[3rem] max-[577px]:after:bg-[transparent] max-[577px]:after:w-[0] max-[577px]:after:h-[0]"}>
              <div className="text-[#FDA701] text-[2.8rem] mb-[1rem] font-[600]">${totalSummary?.balance}</div>
              <span className="text-[#4D4D4D] text-[1.5rem] mb-[0.8rem]">Available Balance</span>
            </div>
          </Card>
        </Grid>
      </Grid>
    </>
  );
};

export default TotalCountHistory;
