"use client";

import { useMediaQuery } from "@/components/ui-kit";
import React from "react";
import DashboardDesktopMenu from "./DashboardDesktopMenu";
import DashboardMobileMenu from "./DashboardMobileMenu/index";

const AdminHeader = () => {
  const mobileView = useMediaQuery("(max-width:769px)");

  return (
    <div position="fixed" className="bg-[#fff] shadow-[none] fixed w-[100%] h-[7rem] z-[99] pr-[28rem] top-[0] max-[768.95px]:w-[100%] max-[768.95px]:pr-[0rem]">
      <div className="w-[100%] h-[7rem] bg-[#fff] shadow-[0_8px_12px_3px_rgb(0_0_0_/_3%)]">{mobileView ? <DashboardMobileMenu /> : <DashboardDesktopMenu />}</div>
    </div>
  );
};

export default AdminHeader;
