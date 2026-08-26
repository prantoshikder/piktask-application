"use client";

import { Button, Drawer, MenuItem, MenuList, Toolbar } from "@/components/ui-kit";
import { UserOutlined as AccountCircleIcon } from "@ant-design/icons";
import { CaretDownOutlined as ArrowDropDownIcon } from "@ant-design/icons";
import { CloseOutlined as CloseIcon } from "@ant-design/icons";
import { MenuOutlined as MenuIcon } from "@ant-design/icons";
import React, { useRef, useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "@/lib/router";
import signInIcon from "../../../../assets/icons/signInIcon.svg";
import logo from "../../../../assets/Logo/piktask.png";
import { getBaseURL, joinImageUrl } from "./../../../../helpers/index";
import SignUpModal from "./../../../../views/Authentication/SignUpModal/index";

const MobileMenu = () => {
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
      <div className="h-[100%]">
        <Toolbar disableGutters className="flex justify-between items-center">
          <div>
            <Button component={Link} to="/" className="w-[140px] p-[0] justify-start hover:bg-[transparent] [&_img]:w-[100%] [&_img]:h-[100%] max-[577px]:[&_img]:w-[100%] max-[577px]:[&_img]:h-[100%] max-[324.95px]:w-[10rem] max-[324.95px]:[&_img]:w-[100%]" disableRipple onClick={() => setOpenMobileMenu(false)}>
              <img src={logo.src} className="w-[10.5rem] block" alt="Piktask" width="110px" height="29px" />
            </Button>
          </div>

          <div className="flex justify-around items-center">
            {user?.isLoggedIn && user?.role === "user" ? (
              <div
                className="cursor-pointer flex items-center"
                onClick={handleToggle}
                aria-controls={open ? "menu-list-grow" : undefined}
                aria-haspopup="true"
                ref={anchorRef}
              >
                {user?.isLoggedIn && user?.avatar && user?.avatar !== "null" ? (
                  <>
                    {user?.avatar_from === "own" ? (
                      <img className="text-[4.8rem] w-[4.8rem] h-[4.8rem] rounded-[100%] object-cover relative right-[-0.6rem] text-[#FB5252] max-[769.95px]:w-[4rem] max-[769.95px]:h-[4rem]" src={joinImageUrl(getBaseURL().bucket_base_url + "/", user?.avatar)} alt={user?.username} />
                    ) : (
                      <img className="text-[4.8rem] w-[4.8rem] h-[4.8rem] rounded-[100%] object-cover relative right-[-0.6rem] text-[#FB5252] max-[769.95px]:w-[4rem] max-[769.95px]:h-[4rem]" src={user?.avatar} alt={user?.username} />
                    )}
                  </>
                ) : (
                  <AccountCircleIcon className="text-[4.8rem] w-[4.8rem] h-[4.8rem] rounded-[100%] object-cover relative right-[-0.6rem] text-[#FB5252] max-[769.95px]:w-[4rem] max-[769.95px]:h-[4rem]" />
                )}
                <ArrowDropDownIcon className="text-[5rem] text-[#244e5f]" />
              </div>
            ) : (
              <div>
                <Button className="text-[#fff] font-[400] font-['Roboto',sans-serif] capitalize text-[1.5rem] rounded-[3rem] opacity-[1] leading-[1.75] bg-[#0088f2] [border:.2rem_solid_#0088f2] p-[0.3rem_1rem] [transition:all_0.3s_linear] hover:bg-[#0773c5] hover:[border:.2rem_solid_#fff] max-[480px]:p-[.3rem_1.2rem]! max-[480px]:text-[1.4rem]" onClick={handleClick} value="user">
                  <img className="mr-[.5rem] h-[1.2rem]" src={signInIcon.src} alt="Crown" width="14px" height="14px" />
                  Sign In
                </Button>
              </div>
            )}
            <MenuIcon onClick={handleMobileMenu} className="text-[4rem] cursor-pointer text-[#FFF] ml-[1rem] max-[577px]:text-[3.5rem]" />
          </div>
        </Toolbar>
      </div>

      <SignUpModal openAuthModal={openAuthModal} setOpenAuthModal={setOpenAuthModal} role={role} />

      <Drawer anchor="right" classes={{ paper: "bg-[#001c30] max-[425.95px]:w-[70%] max-[320.95px]:w-[90%]" }} open={openMobileMenu} onClose={() => setOpenMobileMenu(false)}>
        <div className="bg-[rgb(1_32_54)] p-[1rem] flex justify-between items-center">
          <CloseIcon onClick={() => setOpenMobileMenu(false)} className="text-[3rem] cursor-pointer text-[#FFF]" />
          <Button component={Link} to="/" className="w-[115px] p-[0] justify-end hover:bg-[transparent] [&_img]:w-[100%] max-[577px]:w-[11rem] max-[577px]:[&_img]:w-[100%] max-[324.95px]:w-[10rem] max-[324.95px]:[&_img]:w-[100%]" disableRipple onClick={() => setOpenMobileMenu(false)}>
            <img src={logo.src} className="w-[10.5rem] block" alt="Piktask" width="115px" height="31px" />
          </Button>
        </div>

        <Toolbar disableGutters className="w-[30rem] flex-col">
          <MenuList className="w-[100%] [&_a]:text-[#fff] [&_a]:no-underline [&_a]:[transition:all_0.3s_linear] [&_a]:hover:text-[#FFCE00]">
            <MenuItem onClick={() => setOpenMobileMenu(false)} classes={{ selected: "text-[#FFCE00]" }}>
              <Link to="/category/business-card-mockup">Business Card Mockup</Link>
            </MenuItem>

            <MenuItem onClick={() => setOpenMobileMenu(false)} classes={{ selected: "text-[#FFCE00]" }}>
              <Link to="/category/text-effect">Text Effect</Link>
            </MenuItem>

            <MenuItem onClick={() => setOpenMobileMenu(false)} classes={{ selected: "text-[#FFCE00]" }}>
              <Link to="/category/social-media-banner">Social Media Banner</Link>
            </MenuItem>

            <MenuItem onClick={() => setOpenMobileMenu(false)} classes={{ selected: "text-[#FFCE00]" }}>
              <Link to="/category/game">Game</Link>
            </MenuItem>

            <MenuItem onClick={() => setOpenMobileMenu(false)} classes={{ selected: "text-[#FFCE00]" }}>
              <Link to="/category/logo-mockup">Logo Mockup</Link>
            </MenuItem>

            {user?.isLoggedIn && user?.role === "contributor" ? (
              <MenuItem onClick={() => setOpenMobileMenu(false)} classes={{ selected: "text-[#FFCE00]" }}>
                <Link to="/contributor/dashboard">Sell your content</Link>
              </MenuItem>
            ) : (
              <MenuItem onClick={() => setOpenMobileMenu(false)} classes={{ selected: "text-[#FFCE00]" }}>
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
