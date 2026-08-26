"use client";

import { Button, Container, Drawer, Grid } from "@mui/material";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import CloseIcon from "@mui/icons-material/Close";
import MenuIcon from "@mui/icons-material/Menu";
import React, { useRef, useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "@/lib/router";
import logo from "../../../../../../assets/Logo/piktask.png";
import { getBaseURL } from "../../../../../../helpers/index";
import CustomPopper from "../../../../CustomPopper/index";
import MobileSidebarMenu from "../../Sidebar/MobileSidebarMenu/index";
import useStyles from "./DashboardMobileMenu.styles";

const DashboardMobileMenu = () => {
  const { classes } = useStyles();
  const anchorRef = useRef(null);
  const user = useSelector((state) => state.user);

  const [open, setOpen] = useState(false);
  const [openMobileMenu, setOpenMobileMenu] = useState(false);

  const handleMobileMenu = () => {
    setOpenMobileMenu(true);
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

  return (
    <>
      <Container classes={{ root: classes.root }}>
        <Grid container spacing={2} classes={{ container: classes.container }}>
          <Grid size={{ xs: 2 }}>
            <Link to="/" className={classes.adminLogoLink}>
              <img className={classes.adminLogo} src={logo} alt="Piktask" width="150px" height="40px" />
            </Link>
          </Grid>

          <Grid size={{ xs: 10 }} classes={{ item: classes.item }}>
            <div className={classes.headerInfo}>
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

                <ArrowDropDownIcon className={classes.arrowDown} />
              </div>
              <MenuIcon onClick={handleMobileMenu} className={classes.menuIcon} />
            </div>
          </Grid>
        </Grid>
      </Container>

      <Drawer anchor="right" classes={{ paper: classes.paper }} open={openMobileMenu} onClose={() => setOpenMobileMenu(false)}>
        <div className={classes.closeIconWrapper}>
          <CloseIcon onClick={() => setOpenMobileMenu(false)} className={classes.closeMenuIcon} />

          <Button component={Link} to="/" className={classes.logoWrapper} disableRipple>
            <img src={logo} className={classes.logo} alt="piktask" />
          </Button>
        </div>
        <MobileSidebarMenu />
      </Drawer>

      <CustomPopper open={open} handleToggle={handleToggle} anchorRef={anchorRef} handleClose={handleClose} handleListKeyDown={handleListKeyDown} />
    </>
  );
};

export default DashboardMobileMenu;
