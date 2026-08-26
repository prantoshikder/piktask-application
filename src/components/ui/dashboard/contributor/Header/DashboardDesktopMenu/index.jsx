"use client";

import { Button, Typography } from "@/components/ui-kit";
import { UserOutlined as AccountCircleIcon } from "@ant-design/icons";
import { CaretDownOutlined as ArrowDropDownIcon } from "@ant-design/icons";
import { CloudUploadOutlined as CloudUploadIcon } from "@ant-design/icons";
// import { BellOutlined as NotificationsIcon } from "@ant-design/icons";
import React, { useRef, useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "@/lib/router";
import { getBaseURL, joinImageUrl } from "../../../../../../helpers/index";
import CustomPopper from "../../../../CustomPopper/index";

const DashboardDesktopMenu = () => {
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
      <div className="h-[100%] flex m-[0rem_1.5rem] justify-between items-center max-[768.95px]:m-[0rem]">
        <div>
          <Button className="text-[#fff] font-[400] font-['Roboto',sans-serif] capitalize text-[1.4rem] rounded-[3rem] opacity-[1] leading-[1.75] bg-[#0088f2] p-[0.5rem_1.4rem] float-left [border:2px_solid] border-[transparent] [transition:all_0.3s_linear] hover:bg-[#0773c5] max-[768.95px]:hidden" component={Link} to="/contributor/upload">
            <CloudUploadIcon className="text-[2rem] mr-[.8rem]" />
            Upload
          </Button>
        </div>

        <div>
          <div className="flex items-end justify-end ml-[auto]">
            {/* <div className="h-[4rem] w-[4rem] rounded-[100%] bg-[#f1f1f1] mr-[1rem] cursor-pointer [&_svg]:text-[#0088f2] [&_svg]:m-[0.5rem_0.6rem] [&_svg]:text-[2.8rem]">
              <NotificationsIcon />
            </div> */}

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
              <Typography className="pl-[1rem] text-[1.8rem] font-[500] text-[#1B3F4E] max-[425.95px]:text-[1.4rem] max-[425.95px]:pl-[0.8rem]" variant="h4">
                {user ? user.username : "Design Studio"}
              </Typography>
              <ArrowDropDownIcon className="text-[3.5rem] text-[#376579] max-[425.95px]:text-[2rem]" />
            </div>
          </div>
        </div>
      </div>
      <CustomPopper open={open} handleToggle={handleToggle} anchorRef={anchorRef} handleClose={handleClose} handleListKeyDown={handleListKeyDown} />
    </>
  );
};

export default DashboardDesktopMenu;
