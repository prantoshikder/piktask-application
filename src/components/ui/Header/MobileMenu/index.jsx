"use client";

import { Button, Drawer, MenuItem, MenuList, Toolbar } from "@mui/material";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import CloseIcon from "@mui/icons-material/Close";
import MenuIcon from "@mui/icons-material/Menu";
import React, { useRef, useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "@/lib/router";
import signInIcon from "../../../../assets/icons/signInIcon.svg";
import logo from "../../../../assets/Logo/piktask.png";
import { getBaseURL } from "./../../../../helpers/index";
import SignUpModal from "./../../../../views/Authentication/SignUpModal/index";
import useStyles from "./MobileMenu.styles";

const MobileMenu = () => {
  const { classes } = useStyles();
  const anchorRef = useRef(null);
  const user = useSelector((state) => state.user);
  const [openAuthModal, setOpenAuthModal] = useState(false);
  const [role, setRole] = useState("");
  const [openMobileMenu, setOpenMobileMenu] = useState(false);
  const [open, setOpen] = useState(false);

  const handleMobileMenu = () => {
    setOpenMobileMenu(true);
  };

  const handleToggle = () => {
    setOpen((prevState) => !prevState);
  };

  const handleClick = (e) => {
    setRole(e.target.closest("button").value);
    setOpenAuthModal(true);
  };

  return (
    <>
      <div className={classes.container}>
        <Toolbar disableGutters className={classes.menuWrapper}>
          <div>
            <Button component={Link} to="/" className={classes.headerLogo} disableRipple onClick={() => setOpenMobileMenu(false)}>
              <img src={logo} className={classes.logo} alt="Piktask" width="110px" height="29px" />
            </Button>
          </div>

          <div className={classes.menuButton}>
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
                      <img className={classes.avatar} src={getBaseURL().bucket_base_url + "/" + user?.avatar} alt={user?.username} />
                    ) : (
                      <img className={classes.avatar} src={user?.avatar} alt={user?.username} />
                    )}
                  </>
                ) : (
                  <AccountCircleIcon className={classes.avatar} />
                )}
                <ArrowDropDownIcon className={classes.arrowDown} />
              </div>
            ) : (
              <div>
                <Button className={classes.signInBtn} onClick={handleClick} value="user">
                  <img className={classes.crownIcon} src={signInIcon} alt="Crown" width="14px" height="14px" />
                  Sign In
                </Button>
              </div>
            )}
            <MenuIcon onClick={handleMobileMenu} className={classes.menuIcon} />
          </div>
        </Toolbar>
      </div>

      <SignUpModal openAuthModal={openAuthModal} setOpenAuthModal={setOpenAuthModal} role={role} />

      <Drawer anchor="right" classes={{ paper: classes.paper }} open={openMobileMenu} onClose={() => setOpenMobileMenu(false)}>
        <div className={classes.closeIconWrapper}>
          <CloseIcon onClick={() => setOpenMobileMenu(false)} className={classes.closeIcon} />
          <Button component={Link} to="/" className={classes.drawerLogo} disableRipple onClick={() => setOpenMobileMenu(false)}>
            <img src={logo} className={classes.logo} alt="Piktask" width="115px" height="31px" />
          </Button>
        </div>

        <Toolbar disableGutters className={classes.wrapperMenu}>
          <MenuList className={classes.navItems}>
            <MenuItem onClick={() => setOpenMobileMenu(false)} classes={{ selected: classes.selected }}>
              <Link to="/category/business-card-mockup">Business Card Mockup</Link>
            </MenuItem>

            <MenuItem onClick={() => setOpenMobileMenu(false)} classes={{ selected: classes.selected }}>
              <Link to="/category/text-effect">Text Effect</Link>
            </MenuItem>

            <MenuItem onClick={() => setOpenMobileMenu(false)} classes={{ selected: classes.selected }}>
              <Link to="/category/social-media-banner">Social Media Banner</Link>
            </MenuItem>

            <MenuItem onClick={() => setOpenMobileMenu(false)} classes={{ selected: classes.selected }}>
              <Link to="/category/game">Game</Link>
            </MenuItem>

            <MenuItem onClick={() => setOpenMobileMenu(false)} classes={{ selected: classes.selected }}>
              <Link to="/category/logo-mockup">Logo Mockup</Link>
            </MenuItem>

            {user?.isLoggedIn && user?.role === "contributor" ? (
              <MenuItem onClick={() => setOpenMobileMenu(false)} classes={{ selected: classes.selected }}>
                <Link to="/contributor/dashboard">Sell your content</Link>
              </MenuItem>
            ) : (
              <MenuItem onClick={() => setOpenMobileMenu(false)} classes={{ selected: classes.selected }}>
                <Button style={{ color: "#fff", padding: 0 }} onClick={handleClick} value="contributor">
                  Sell your content
                </Button>
              </MenuItem>
            )}
          </MenuList>
        </Toolbar>
      </Drawer>
    </>
  );
};

export default MobileMenu;
