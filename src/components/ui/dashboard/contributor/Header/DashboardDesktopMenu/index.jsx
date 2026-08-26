"use client";

import { Button, Typography } from "@mui/material";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
// import NotificationsIcon from "@mui/icons-material/Notifications";
import React, { useRef, useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "@/lib/router";
import { getBaseURL } from "../../../../../../helpers/index";
import CustomPopper from "../../../../CustomPopper/index";
import useStyles from "./DashboardDesktopMenu.styles";

const DashboardDesktopMenu = () => {
  const { classes } = useStyles();
  const anchorRef = useRef(null);
  const user = useSelector((state) => state.user);

  const [open, setOpen] = useState(false);

  const handleToggle = () => {
    setOpen((prevState) => !prevState);
  };

  const handleClose = (e) => {
    if (anchorRef.current && anchorRef.current.contains(e.target)) {
      return;
    }
    setOpen(false);
  };
  const handleListKeyDown = (e) => {
    if (e.key === "Escape") {
      e.preventDefault();
      setOpen(false);
    }
  };

  return (
    <>
      <div className={classes.root}>
        <div>
          <Button className={classes.uploadBtn} component={Link} to="/contributor/upload">
            <CloudUploadIcon className={classes.ButtoncrownIcon} />
            Upload
          </Button>
        </div>

        <div>
          <div className={classes.headerInfo}>
            {/* <div className={classes.notificationIcon}>
              <NotificationsIcon />
            </div> */}

            <div
              className={classes.userProfile}
              onClick={handleToggle}
              aria-controls={open ? "menu-list-grow" : undefined}
              aria-haspopup="true"
              ref={anchorRef}
            >
              {user?.isLoggedIn && user?.role === "contributor" && user?.avatar && user?.avatar !== "null" ? (
                <>
                  {user?.avatar_from === "own" ? (
                    <img className={classes.avatar} src={getBaseURL().bucket_base_url + "/" + user?.avatar} alt={user?.username} width="40px" height="40px" />
                  ) : (
                    <img className={classes.avatar} src={user?.avatar} alt={user?.username} width="40px" height="40px" />
                  )}
                </>
              ) : (
                <AccountCircleIcon className={classes.avatar} />
              )}
              <Typography className={classes.userName} variant="h4">
                {user ? user.username : "Design Studio"}
              </Typography>
              <ArrowDropDownIcon className={classes.arrowDown} />
            </div>
          </div>
        </div>
      </div>
      <CustomPopper open={open} handleToggle={handleToggle} anchorRef={anchorRef} handleClose={handleClose} handleListKeyDown={handleListKeyDown} />
    </>
  );
};

export default DashboardDesktopMenu;
