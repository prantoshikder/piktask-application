"use client";

import { useMediaQuery } from "@mui/material";
import React from "react";
import useStyles from "./AdminHeader.styles";
import DashboardDesktopMenu from "./DashboardDesktopMenu";
import DashboardMobileMenu from "./DashboardMobileMenu/index";

const AdminHeader = () => {
  const { classes } = useStyles();
  const mobileView = useMediaQuery("(max-width:769px)");

  return (
    <div position="fixed" className={classes.appbarHeader}>
      <div className={classes.fullWidth}>{mobileView ? <DashboardMobileMenu /> : <DashboardDesktopMenu />}</div>
    </div>
  );
};

export default AdminHeader;
