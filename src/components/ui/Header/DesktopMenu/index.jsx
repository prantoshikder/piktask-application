"use client";

import { Button, Tab, Tabs, Toolbar } from "@/components/ui-kit";
import { UserOutlined as AccountCircleIcon } from "@ant-design/icons";
import { CaretDownOutlined as ArrowDropDownIcon } from "@ant-design/icons";
import React, { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { Link, NavLink } from "@/lib/router";
import signInIcon from "../../../../assets/icons/signInIcon.svg";
import logo from "../../../../assets/Logo/piktask.png";
import { getBaseURL, joinImageUrl } from "../../../../helpers";
import SignUpModal from "../../../../views/Authentication/SignUpModal";
import CustomPopper from "../../CustomPopper";

const DesktopMenu = () => {
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
  }, [user]);

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
      <div className="h-[100%]">
        <Toolbar disableGutters className="h-[100%] max-[768.95px]:hidden">
          <Button component={Link} to="/" className="w-[153px] mr-[2rem] p-[0] hover:bg-[transparent] max-[1024px]:w-[13rem] max-[1024px]:[&_img]:w-[100%]" disableRipple>
            <img src={logo.src} className="w-[100%] block" alt="Piktask" width="153px" height="41px" />
          </Button>

          <Tabs value={value} className="ml-[25px]" classes={{ indicator: "h-[0] bg-[transparent]" }} onChange={handleChange} aria-label="main navigation">
            <Tab className="opacity-[1] min-w-[1rem] text-[14px] [transition:all_0.3s_ease] [&.active]:text-[#0088f2] last:mr-[3rem] hover:text-[#0088f2] max-[1024px]:mr-[0] max-[1024px]:pl-[.5rem] max-[1024px]:text-[1.4rem] max-[1024px]:last:mr-[.5rem]" disableRipple component={NavLink} to={`/category/business-card-mockup`} label="Business Card Mockup" />

            <Tab className="opacity-[1] min-w-[1rem] text-[14px] [transition:all_0.3s_ease] [&.active]:text-[#0088f2] last:mr-[3rem] hover:text-[#0088f2] max-[1024px]:mr-[0] max-[1024px]:pl-[.5rem] max-[1024px]:text-[1.4rem] max-[1024px]:last:mr-[.5rem]" disableRipple component={NavLink} to="/category/text-effect" label="Text Effect" />

            <Tab className="opacity-[1] min-w-[1rem] text-[14px] [transition:all_0.3s_ease] [&.active]:text-[#0088f2] last:mr-[3rem] hover:text-[#0088f2] max-[1024px]:mr-[0] max-[1024px]:pl-[.5rem] max-[1024px]:text-[1.4rem] max-[1024px]:last:mr-[.5rem]" disableRipple component={NavLink} to="/category/social-media-banner" label="Social Media Banner" />

            <Tab className="opacity-[1] min-w-[1rem] text-[14px] [transition:all_0.3s_ease] [&.active]:text-[#0088f2] last:mr-[3rem] hover:text-[#0088f2] max-[1024px]:mr-[0] max-[1024px]:pl-[.5rem] max-[1024px]:text-[1.4rem] max-[1024px]:last:mr-[.5rem]" disableRipple component={NavLink} to="/category/game" label="Game" />

            <Tab className="opacity-[1] min-w-[1rem] text-[14px] [transition:all_0.3s_ease] [&.active]:text-[#0088f2] last:mr-[3rem] hover:text-[#0088f2] max-[1024px]:mr-[0] max-[1024px]:pl-[.5rem] max-[1024px]:text-[1.4rem] max-[1024px]:last:mr-[.5rem]" disableRipple component={NavLink} to="/category/logo-mockup" label="Logo Mockup" />
          </Tabs>

          <Toolbar disableGutters className="ml-[auto]">
            {user?.isLoggedIn && user?.role === "contributor" ? (
              <Button className="text-[#fff] font-[400] font-['Roboto',sans-serif] capitalize text-[1.4rem] rounded-[3rem] opacity-[1] leading-[1.75] p-[0.3rem_1rem] border-[#0088f2] ml-[1rem] mr-[1rem] [border:.2rem_solid_#0088f2] [transition:all_0.3s_linear] hover:bg-[#0088f2] hover:border-[#0088f2]" component={Link} to="/contributor/dashboard">
                Sell Your Content
              </Button>
            ) : (
              <Button className="text-[#fff] font-[400] font-['Roboto',sans-serif] capitalize text-[1.4rem] rounded-[3rem] opacity-[1] leading-[1.75] p-[0.3rem_1rem] border-[#0088f2] ml-[1rem] mr-[1rem] [border:.2rem_solid_#0088f2] [transition:all_0.3s_linear] hover:bg-[#0088f2] hover:border-[#0088f2]" onClick={handleClick} value="contributor">
                Sell Your Content
              </Button>
            )}

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
                      <img className="text-[4.8rem] w-[3.6rem] h-[3.6rem] rounded-[100%] object-cover relative right-[-0.6rem] text-[#FB5252]" src={joinImageUrl(getBaseURL().bucket_base_url + "/", user?.avatar)} alt={user?.username} width="36px" height="36px" />
                    ) : (
                      <img className="text-[4.8rem] w-[3.6rem] h-[3.6rem] rounded-[100%] object-cover relative right-[-0.6rem] text-[#FB5252]" src={user?.avatar} alt={user?.username} width="36px" height="36px" />
                    )}
                  </>
                ) : (
                  <AccountCircleIcon className="text-[4.8rem] w-[3.6rem] h-[3.6rem] rounded-[100%] object-cover relative right-[-0.6rem] text-[#FB5252]" />
                )}
                <ArrowDropDownIcon className="text-[3.5rem] text-[#244e5f]" />
              </div>
            ) : (
              <Button className="text-[#fff] font-[400] font-['Roboto',sans-serif] capitalize text-[1.4rem] rounded-[3rem] opacity-[1] leading-[1.75] bg-[#0088f2] [border:.2rem_solid_#0088f2] p-[0.3rem_1rem] [transition:all_0.3s_linear] hover:bg-[#0773c5] hover:[border:.2rem_solid_#fff] max-[480px]:p-[.8rem_1.5rem]!" onClick={handleClick} value="user">
                <img className="mr-[.5rem] h-[1.4rem]" src={signInIcon.src} alt="Crown" width="14px" height="14px" />
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
