"use client";

import { Card, CardContent, List, ListItem } from "@mui/material";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import GetAppIcon from "@mui/icons-material/GetApp";
import PeopleOutlineIcon from "@mui/icons-material/PeopleOutlined";
import PersonOutlineIcon from "@mui/icons-material/PersonOutlined";
import PowerSettingsNewIcon from "@mui/icons-material/PowerSettingsNew";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "@/lib/router";
import { Link } from "@/lib/router";
import useStyles from "./UserSidebarMenu.style";

const UserSidebarMenu = () => {
  const { classes } = useStyles();
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
    <Card className={classes.userMenuList}>
      <CardContent>
        <List component="nav" aria-labelledby="nested-sidebar-nav">
          <ListItem className={classes.userMenuItem} classes={{ selected: classes.selectedItem }} component={Link} to="/user/profile" selected={value === 0}>
            <PersonOutlineIcon />
            <span>Edit Profile</span>
          </ListItem>

          <ListItem className={classes.userMenuItem} classes={{ selected: classes.selectedItem }} component={Link} to="/user/favorites" selected={value === 1}>
            <FavoriteBorderIcon />
            <span>Favourite</span>
          </ListItem>

          <ListItem className={classes.userMenuItem} classes={{ selected: classes.selectedItem }} component={Link} to="/user/downloads" selected={value === 2}>
            <GetAppIcon />
            <span>Downloads</span>
          </ListItem>

          <ListItem className={classes.userMenuItem} classes={{ selected: classes.selectedItem }} component={Link} to="/user/following" selected={value === 3}>
            <PeopleOutlineIcon />
            <span>Following</span>
          </ListItem>

          {/* <ListItem
                      className={classes.userMenuItem}
                      classes={{ selected: classes.selectedItem }}
                      component={Link}
                      to="/user/devices"
                      selected={value === 4}
                    >
                      <DevicesIcon />
                      <span>Devices</span>
                    </ListItem>

                    <ListItem
                      className={classes.userMenuItem}
                      classes={{ selected: classes.selectedItem }}
                      component={Link}
                      to="/user/subscription"
                      selected={value === 5}
                    >
                      <span>My Subscription</span>
                    </ListItem> */}

          <ListItem className={classes.userMenuItem} onClick={handleSignout}>
            <PowerSettingsNewIcon />
            <span>Logout</span>
          </ListItem>
        </List>
      </CardContent>
    </Card>
  );
};

export default UserSidebarMenu;
