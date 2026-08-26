"use client";

import { Card, CardContent, List, ListItem } from "@/components/ui-kit";
import { HeartOutlined as FavoriteBorderIcon } from "@ant-design/icons";
import { DownloadOutlined as GetAppIcon } from "@ant-design/icons";
import { TeamOutlined as PeopleOutlineIcon } from "@ant-design/icons";
import { UserOutlined as PersonOutlineIcon } from "@ant-design/icons";
import { PoweroffOutlined as PowerSettingsNewIcon } from "@ant-design/icons";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "@/lib/router";
import { Link } from "@/lib/router";

const UserSidebarMenu = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);

  const [value, setValue] = useState("");

  useEffect(() => {
    if (window.location.pathname === "/user/profile" && value !== 0) {
      setValue(0);
    } else if (window.location.pathname === "/user/favorites" && value !== 1) {
      setValue(1);
    } else if (window.location.pathname === "/user/downloads" && value !== 2) {
      setValue(2);
    } else if (window.location.pathname === "/user/following" && value !== 3) {
      setValue(3);
    } else if (window.location.pathname === "/user/devices" && value !== 4) {
      setValue(4);
    } else if (window.location.pathname === "/user/subscription" && value !== 5) {
      setValue(5);
    }
  }, [value]);

  const handleSignout = () => {
    if (user && user?.token) {
      user.isLoggedIn = false;
      history.push("/");
      localStorage.removeItem("token");
      localStorage.removeItem("profileImage");

      dispatch({
        type: "LOGOUT",
        payload: {
          email: "",
          token: "",
        },
      });
    }
  };

  return (
    <Card className="shadow-[0_1px_2px_0_rgb(0_0_0_/_10%)]">
      <CardContent>
        <List component="nav" aria-labelledby="nested-sidebar-nav">
          <ListItem className="p-[1rem_1rem] text-[#676767] rounded-[1rem] mb-[1.2rem] cursor-pointer [transition:all_0.3s_linear] hover:bg-[#F4F7FF] hover:text-[#4A7AFF] [&_svg]:text-[2.2rem] [&_span]:text-[1.5rem] [&_span]:ml-[1.5rem]" classes={{ selected: "bg-[#F4F7FF]! text-[#4A7AFF]" }} component={Link} to="/user/profile" selected={value === 0}>
            <PersonOutlineIcon />
            <span>Edit Profile</span>
          </ListItem>

          <ListItem className="p-[1rem_1rem] text-[#676767] rounded-[1rem] mb-[1.2rem] cursor-pointer [transition:all_0.3s_linear] hover:bg-[#F4F7FF] hover:text-[#4A7AFF] [&_svg]:text-[2.2rem] [&_span]:text-[1.5rem] [&_span]:ml-[1.5rem]" classes={{ selected: "bg-[#F4F7FF]! text-[#4A7AFF]" }} component={Link} to="/user/favorites" selected={value === 1}>
            <FavoriteBorderIcon />
            <span>Favourite</span>
          </ListItem>

          <ListItem className="p-[1rem_1rem] text-[#676767] rounded-[1rem] mb-[1.2rem] cursor-pointer [transition:all_0.3s_linear] hover:bg-[#F4F7FF] hover:text-[#4A7AFF] [&_svg]:text-[2.2rem] [&_span]:text-[1.5rem] [&_span]:ml-[1.5rem]" classes={{ selected: "bg-[#F4F7FF]! text-[#4A7AFF]" }} component={Link} to="/user/downloads" selected={value === 2}>
            <GetAppIcon />
            <span>Downloads</span>
          </ListItem>

          <ListItem className="p-[1rem_1rem] text-[#676767] rounded-[1rem] mb-[1.2rem] cursor-pointer [transition:all_0.3s_linear] hover:bg-[#F4F7FF] hover:text-[#4A7AFF] [&_svg]:text-[2.2rem] [&_span]:text-[1.5rem] [&_span]:ml-[1.5rem]" classes={{ selected: "bg-[#F4F7FF]! text-[#4A7AFF]" }} component={Link} to="/user/following" selected={value === 3}>
            <PeopleOutlineIcon />
            <span>Following</span>
          </ListItem>

          {/* <ListItem
                      className="p-[1rem_1rem] text-[#676767] rounded-[1rem] mb-[1.2rem] cursor-pointer [transition:all_0.3s_linear] hover:bg-[#F4F7FF] hover:text-[#4A7AFF] [&_svg]:text-[2.2rem] [&_span]:text-[1.5rem] [&_span]:ml-[1.5rem]"
                      classes={{ selected: "bg-[#F4F7FF]! text-[#4A7AFF]" }}
                      component={Link}
                      to="/user/devices"
                      selected={value === 4}
                    >
                      <DevicesIcon />
                      <span>Devices</span>
                    </ListItem>

                    <ListItem
                      className="p-[1rem_1rem] text-[#676767] rounded-[1rem] mb-[1.2rem] cursor-pointer [transition:all_0.3s_linear] hover:bg-[#F4F7FF] hover:text-[#4A7AFF] [&_svg]:text-[2.2rem] [&_span]:text-[1.5rem] [&_span]:ml-[1.5rem]"
                      classes={{ selected: "bg-[#F4F7FF]! text-[#4A7AFF]" }}
                      component={Link}
                      to="/user/subscription"
                      selected={value === 5}
                    >
                      <span>My Subscription</span>
                    </ListItem> */}

          <ListItem className="p-[1rem_1rem] text-[#676767] rounded-[1rem] mb-[1.2rem] cursor-pointer [transition:all_0.3s_linear] hover:bg-[#F4F7FF] hover:text-[#4A7AFF] [&_svg]:text-[2.2rem] [&_span]:text-[1.5rem] [&_span]:ml-[1.5rem]" onClick={handleSignout}>
            <PowerSettingsNewIcon />
            <span>Logout</span>
          </ListItem>
        </List>
      </CardContent>
    </Card>
  );
};

export default UserSidebarMenu;
