"use client";

import { useMediaQuery } from "@mui/material";
import axios from "axios";
import moment from "moment";
import React, { lazy, Suspense, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import DateSelection from "../../../../components/ui/dashboard/contributor/DateSelection/index";
import AdminHeader from "../../../../components/ui/dashboard/contributor/Header";
import Heading from "../../../../components/ui/dashboard/contributor/Heading";
import Sidebar from "../../../../components/ui/dashboard/contributor/Sidebar";
import Loader from "../../../../components/ui/Loader";
import Pagination from "../../../../components/ui/Pagination/index";
import { expiredLoginTime } from "../../../../helpers";
import Layout from "../../../../Layout";
import HistoryTable from "./HistoryTable";
import useStyles from "./WithdrawHistory.style";

const TotalCountHistory = lazy(() => import("../../../../components/ui/dashboard/contributor/TotalCountHistory"));
const Footer = lazy(() => import("../../../../components/ui/Footer"));

const WithdrawHistory = () => {
  const { classes } = useStyles();
  const locationPath = document.location.pathname;
  const user = useSelector((state) => state.user);
  const mobileView = useMediaQuery("(max-width:769px)");

  const [isLoading, setLoading] = useState(true);
  const [withdrawalHistory, setWithdrawalHistory] = useState([]);

  const [pageCount, setPageCount] = useState(1);
  const [totalProduct, setTotalProduct] = useState("");

  let limit = 20;
  const count = Math.ceil(totalProduct / limit);

  const dateFormat = "YYYY-MM-DD";
  let newDate = new Date();
  let firstDayCurrentMonth = new Date(newDate.getFullYear(), newDate.getMonth(), 1);
  let firstDay = firstDayCurrentMonth.toISOString().substring(0, 10);
  const today = moment(newDate).format(dateFormat);

  const [searchInput, setSearchInput] = useState({
    firstDay: firstDay,
    toDays: today,
  });

  useEffect(() => {
    const CancelToken = axios.CancelToken;
    const source = CancelToken.source();

    if (user?.isLoggedIn && user?.role === "contributor") {
      axios
        .get(
          `${process.env.NEXT_PUBLIC_API_URL}/contributor/withdrawals/history/?start=${searchInput.firstDay}&end=${searchInput.toDays}&limit=${limit}&page=${pageCount}`,
          { cancelToken: source.token, headers: { Authorization: user?.token } }
        )
        .then(({ data }) => {
          if (data?.status) {
            setWithdrawalHistory(data?.history);
            setTotalProduct(data?.total);
            setLoading(false);
          }
        })
        .catch((error) => {
          console.log("Withdrawals history", error.message);
          setLoading(false);
          if (error.response.status === 401) {
            expiredLoginTime();
          }
        });
    }

    return () => source.cancel();
  }, [user, pageCount, limit, searchInput]);

  return (
    <Layout title="Withdraw History">
      <div className={classes.adminRoot}>
        {mobileView ? null : <Sidebar className={classes.adminSidebar} />}

        <main className={classes.content}>
          <AdminHeader />
          <div className={classes.withdrawHistoryWrapper}>
            <div className={classes.headingWrapper}>
              <Heading tag="h2">Withdraw History</Heading>
            </div>

            <Suspense fallback={<Loader />}>
              <TotalCountHistory />
            </Suspense>

            <div className={classes.headingWrapper}>
              <Heading tag="h2">Records</Heading>
            </div>

            <Suspense fallback={<Loader />}>
              <DateSelection setSearchInput={setSearchInput} />

              <HistoryTable isLoading={isLoading} setLoading={setLoading} withdrawalHistory={withdrawalHistory} />
            </Suspense>

            {totalProduct > limit && <Pagination locationPath={locationPath} count={count} pageCount={pageCount} setPageCount={setPageCount} />}
          </div>

          <Suspense fallback={<Loader />}>
            <Footer />
          </Suspense>
        </main>
      </div>
    </Layout>
  );
};

export default WithdrawHistory;
