"use client";

import { Dialog, Typography } from "@/components/ui-kit";
import { CloseOutlined as CloseIcon } from "@ant-design/icons";
import axios from "axios";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import { CustomBtn, InputField } from "../../../../../components/InputField";



const WithdrawModal = (props) => {
  const user = useSelector((state) => state.user);
  const {
    openWithdrawModal,
    setWithdrawModal,
    username,
    paymentGateway,
    paypalAccount,
    payoneerAccount,
    accountNumber,
    totalBalance,
    minWithdraw,
  } = props;

  const [isLoading, setLoading] = useState(true);
  const [authData, setAuthData] = useState("");
  const [errors, setErrors] = useState("");

  const closeWithdrawModal = () => {
    setWithdrawModal(false);
  };

  const handleAuthData = (e) => {
    const { value } = e.target;
    setAuthData(value);
    if (value < minWithdraw) {
      setErrors("Sorry, Minimum withdraw $25");
      return;
    } else if (value > totalBalance) {
      setErrors("Sorry, you don't have enough balance to withdraw");
      return;
    } else {
      setErrors("");
      return;
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (user?.isLoggedIn && !errors) {
      axios
        .post(
          `${process.env.NEXT_PUBLIC_API_URL}/contributor/withdrawals/request`,
          { amount: authData },
          { headers: { Authorization: user?.token } }
        )
        .then(({ data }) => {
          if (data?.status) {
            toast.success(data?.message);
            setWithdrawModal(false);
            setLoading(false);
          }
        })
        .catch((error) => {
          console.log("Withdrawals request", error.message);
          setLoading(false);
        });
    }
  };

  return (
    <>
      <Dialog
        open={openWithdrawModal}
        onClose={closeWithdrawModal}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        className="[&_.ant-modal-content]:w-[40rem]"
      >
        <div className="ml-[auto] p-[1rem] text-[#0088f2] cursor-pointer">
          <CloseIcon onClick={() => setWithdrawModal(false)} />
        </div>
        <div className="p-[0rem_5rem_4rem] max-w-[50rem]">
          <Typography variant="h5" className="text-center text-[1.6rem] font-[500] mb-[2rem]">
            {"Apply for withdrawal"}
          </Typography>
          <form onSubmit={handleSubmit}>
            <InputField label="User Name" name="userName" value={username} />
            {paymentGateway === "PayPal" && (
              <>
                <InputField
                  label="Paypal"
                  name="paypal"
                  value={paymentGateway}
                />
                <InputField label="Email" name="email" value={paypalAccount} />
              </>
            )}
            {paymentGateway === "Payoneer" && (
              <>
                <InputField
                  label="Payoneer"
                  name="payoneer"
                  value={paymentGateway}
                />
                <InputField
                  label="Email"
                  name="email"
                  value={payoneerAccount}
                />
              </>
            )}
            {paymentGateway === "Bank" && (
              <>
                <InputField label="Bank" name="bank" value={paymentGateway} />
                <InputField
                  label="Account Number"
                  name="account"
                  value={accountNumber}
                />
              </>
            )}
            <div className="[&_p]:text-[red] [&_p]:text-[1.2rem] [&_p]:font-[500] [&_p]:mb-[1rem] [&_p]:mt-[-1rem]">
              <InputField
                label="Amount"
                type="number"
                name="amount"
                value={authData}
                onChange={handleAuthData}
              />
              {errors && <Typography>{errors}</Typography>}
            </div>

            <CustomBtn type="submit" text="Apply" />
          </form>
        </div>
      </Dialog>
    </>
  );
};

export default WithdrawModal;
