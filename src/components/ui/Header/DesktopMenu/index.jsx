"use client";

import { Button, Tab, Tabs, Toolbar } from "@mui/material";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import React, { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { Link, NavLink } from "@/lib/router";
import signInIcon from "../../../../assets/icons/signInIcon.svg";
import logo from "../../../../assets/Logo/piktask.png";
import { getBaseURL } from "../../../../helpers";
import SignUpModal from "../../../../views/Authentication/SignUpModal";
import CustomPopper from "../../CustomPopper";
import useStyles from "./DesktopMenu.styles";

const DesktopMenu = ({ history }) => {
  const { classes } = useStyles();
  const anchorRef = useRef(null);
  const user = useSelector((state) => state.user);

  const [openAuthModal, setOpenAuthModal] = useState(false);
  const [role, setRole] = useState("");
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(0);

  useEffect(() => {
    return () => {
      document.body.style.backgroundColor = "";
    };
  }, [user, history]);

  const handleChange = (event, index) => {
    setValue(index);
  };
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

  const handleClick = (e) => {
    setRole(e.target.closest("button").value);
    setOpenAuthModal(true);
  };

  return (
    <>
      <div className={classes.container}>
        <Toolbar disableGutters className={classes.mainHeaderToolbar}>
          <Button component={Link} to="/" className={classes.logoWrapper} disableRipple>
            <img src={logo} className={classes.logo} alt="Piktask" width="153px" height="41px" />
          </Button>

          <Tabs value={value} className={classes.menuTab} classes={{ indicator: classes.menuUnderline }} onChange={handleChange} aria-label="main navigation">
            <Tab className={classes.menuItem} disableRipple component={NavLink} to={`/category/business-card-mockup`} label="Business Card Mockup" />

            <Tab className={classes.menuItem} disableRipple component={NavLink} to="/category/text-effect" label="Text Effect" />

            <Tab className={classes.menuItem} disableRipple component={NavLink} to="/category/social-media-banner" label="Social Media Banner" />

            <Tab className={classes.menuItem} disableRipple component={NavLink} to="/category/game" label="Game" />

            <Tab className={classes.menuItem} disableRipple component={NavLink} to="/category/logo-mockup" label="Logo Mockup" />
          </Tabs>

          <Toolbar disableGutters className={classes.toolBarContainer}>
            {user?.isLoggedIn && user?.role === "contributor" ? (
              <Button className={classes.sellContentBtn} component={Link} to="/contributor/dashboard">
                Sell Your Content
              </Button>
            ) : (
              <Button className={classes.sellContentBtn} onClick={handleClick} value="contributor">
                Sell Your Content
              </Button>
            )}

            {user?.isLoggedIn && user?.role === "user" ? (
              <div
                className={classes.userAvatarArea}
                onClick={handleToggle}
                aria-controls={open ? "menu-list-grow" : undefined}
                aria-haspopup="true"
                ref={anchorRef}
              >
                {user?.isLoggedIn && user?.avatar && user?.avatar !== "null" ? (
                  <>
                    {user?.avatar_from === "own" ? (
                      <img className={classes.avatar} src={getBaseURL().bucket_base_url + "/" + user?.avatar} alt={user?.username} width="36px" height="36px" />
                    ) : (
                      <img className={classes.avatar} src={user?.avatar} alt={user?.username} width="36px" height="36px" />
                    )}
                  </>
                ) : (
                  <AccountCircleIcon className={classes.avatar} />
                )}
                <ArrowDropDownIcon className={classes.arrowDown} />
              </div>
            ) : (
              <Button className={classes.signInBtn} onClick={handleClick} value="user">
                <img className={classes.crownIcon} src={signInIcon} alt="Crown" width="14px" height="14px" />
                Sign In
              </Button>
            )}
          </Toolbar>
        </Toolbar>
      </div>

      <CustomPopper open={open} handleToggle={handleToggle} anchorRef={anchorRef} handleClose={handleClose} handleListKeyDown={handleListKeyDown} />

      <SignUpModal openAuthModal={openAuthModal} setOpenAuthModal={setOpenAuthModal} role={role} />
    </>
  );
};

export default DesktopMenu;
