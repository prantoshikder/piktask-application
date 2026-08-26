"use client";

import { Button, Container, Drawer, Grid } from "@/components/ui-kit";
import { UserOutlined as AccountCircleIcon } from "@ant-design/icons";
import { CaretDownOutlined as ArrowDropDownIcon } from "@ant-design/icons";
import { CloseOutlined as CloseIcon } from "@ant-design/icons";
import { MenuOutlined as MenuIcon } from "@ant-design/icons";
import React, { useRef, useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "@/lib/router";
import logo from "../../../../../../assets/Logo/piktask.png";
import { getBaseURL, joinImageUrl } from "../../../../../../helpers/index";
import CustomPopper from "../../../../CustomPopper/index";
import MobileSidebarMenu from "../../Sidebar/MobileSidebarMenu/index";

const DashboardMobileMenu = () => {
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
      <Container classes={{ root: "h-[100%] flex m-[0rem_1.5rem] justify-between items-center max-[768.95px]:m-[0rem]" }}>
        <Grid container spacing={2}>
          <Grid size={{ xs: 2 }}>
            <Link to="/">
              <img className="w-[15rem] mt-[0.6rem]" src={logo.src} alt="Piktask" width="150px" height="40px" />
            </Link>
          </Grid>

          <Grid size={{ xs: 10 }} classes={{ item: "h-[100%] flex p-[0]! items-center ml-[auto] max-[768.95px]:mt-[1.3rem]" }}>
            <div className="flex items-center justify-end ml-[auto]">
              <div
                className="flex items-center cursor-pointer max-[425.95px]:mb-[-1rem]"
                onClick={handleToggle}
                aria-controls={open ? "menu-list-grow" : undefined}
                aria-haspopup="true"
                ref={anchorRef}
              >
                {user?.isLoggedIn && user?.role === "contributor" && user?.avatar && user?.avatar !== "null" ? (
                  <>
                    {user?.avatar_from === "own" ? (
                      <img className="text-[4.8rem] w-[4rem] h-[4rem] rounded-[100%] relative right-[-0.6rem] text-[#000] max-[768.95px]:text-[4.2rem] max-[425.95px]:text-[3.5rem]" src={joinImageUrl(getBaseURL().bucket_base_url + "/", user?.avatar)} alt={user?.username} width="40px" height="40px" />
                    ) : (
                      <img className="text-[4.8rem] w-[4rem] h-[4rem] rounded-[100%] relative right-[-0.6rem] text-[#000] max-[768.95px]:text-[4.2rem] max-[425.95px]:text-[3.5rem]" src={user?.avatar} alt={user?.username} width="40px" height="40px" />
                    )}
                  </>
                ) : (
                  <AccountCircleIcon className="text-[4.8rem] w-[4rem] h-[4rem] rounded-[100%] relative right-[-0.6rem] text-[#000] max-[768.95px]:text-[4.2rem] max-[425.95px]:text-[3.5rem]" />
                )}

                <ArrowDropDownIcon className="text-[3.5rem] text-[#376579] max-[425.95px]:text-[3rem]" />
              </div>
              <MenuIcon onClick={handleMobileMenu} className="text-[4rem] cursor-pointer text-[#001c30] max-[769px]:text-[3.5rem] max-[769px]:mb-[0.3rem] max-[426px]:text-[2.5rem] max-[426px]:mb-[-0.8rem]" />
            </div>
          </Grid>
        </Grid>
      </Container>

      <Drawer anchor="right" classes={{ paper: "w-[45%] max-[768.95px]:w-[50%] max-[479.95px]:w-[70%]" }} open={openMobileMenu} onClose={() => setOpenMobileMenu(false)}>
        <div className="bg-[rgb(1_32_54)] p-[1rem] shadow-[0px_0px_50px_50px_rgb(1_32_54)] flex justify-between items-center">
          <CloseIcon onClick={() => setOpenMobileMenu(false)} className="text-[3rem] cursor-pointer text-[#FFF]" />

          <Button component={Link} to="/" disableRipple>
            <img src={logo.src} className="w-[12rem]" alt="piktask" />
          </Button>
        </div>
        <MobileSidebarMenu />
      </Drawer>

      <CustomPopper open={open} handleToggle={handleToggle} anchorRef={anchorRef} handleClose={handleClose} handleListKeyDown={handleListKeyDown} />
    </>
  );
};

export default DashboardMobileMenu;
