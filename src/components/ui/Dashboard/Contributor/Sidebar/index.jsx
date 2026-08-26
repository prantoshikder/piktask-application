"use client";

import { Button, Collapse, List, ListItem, ListItemText } from "@mui/material";
import { ExpandLess, ExpandMore } from "@mui/icons-material";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import CardMembershipIcon from "@mui/icons-material/CardMembership";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import DashboardIcon from "@mui/icons-material/Dashboard";
import EuroIcon from "@mui/icons-material/Euro";
import HelpOutlineIcon from "@mui/icons-material/HelpOutlined";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "@/lib/router";
import logo from "../../../../../assets/Logo/piktask.png";
import useStyles from "./Sidebar.styles";

const Sidebar = () => {
  const { classes } = useStyles();
  const [value, setValue] = useState("");
  const [open, setOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState("");
  const totalProductCount = useSelector((state) => state.totalProductCount);

  useEffect(() => {
    if (window.location.pathname === "/contributor/dashboard" && value !== 0) {
      setValue(0);
    } else if (window.location.pathname === "/contributor/upload" && value !== 1) {
      setOpen(true);
      setValue(1);
      setSelectedItem(1);
    } else if (window.location.pathname === "/contributor/pending" && value !== 2) {
      setOpen(true);
      setValue(1);
      setSelectedItem(2);
    } else if (window.location.pathname === "/contributor/revision" && value !== 3) {
      setOpen(true);
      setValue(1);
      setSelectedItem(3);
    } else if (window.location.pathname === "/contributor/reject" && value !== 4) {
      setOpen(true);
      setValue(1);
      setSelectedItem(4);
    } else if (window.location.pathname === "/contributor/publish" && value !== 5) {
      setOpen(true);
      setValue(1);
      setSelectedItem(5);
    } else if (window.location.pathname === "/contributor/earnings" && value !== 6) {
      setValue(6);
    } else if (window.location.pathname === "/contributor/contributor-price-plan" && value !== 7) {
      setValue(7);
    } else if (window.location.pathname === "/contributor/guidLine" && value !== 8) {
      setValue(8);
    } else if (window.location.pathname === "/contributor/settings" && value !== 9) {
      setValue(9);
    }
  }, [value]);

  const handleClick = () => {
    setOpen(!open);
  };

  return (
    <aside className={classes.sidebarWrapper}>
      <div className={classes.logoWrapper}>
        <Button component={Link} to="/" disableRipple>
          <img src={logo} className={classes.sidebarLogo} alt="Piktask" />
        </Button>
      </div>

      <List component="nav" aria-labelledby="nested-sidebar-nav">
        <ListItem
          classes={{
            gutters: classes.gutters,
            selected: classes.selectedItem,
          }}
          component={Link}
          to="/contributor/dashboard"
          selected={value === 0}
        >
          <DashboardIcon />
          <ListItemText primary="Dashboard" />
        </ListItem>

        <ListItem
          classes={{
            gutters: classes.gutters,
            selected: classes.selectedItem,
          }}
          className={classes.dropdownMenu}
          onClick={() => handleClick()}
          component={Link}
          to="/contributor/upload"
          selected={value === 1}
        >
          <CloudUploadIcon />
          <ListItemText primary="Files" />
          {open ? <ExpandLess /> : <ExpandMore />}
        </ListItem>

        <Collapse in={open} timeout="auto" unmountOnExit>
          <List component="div" disablePadding className={classes.submenuContainer}>
            <ListItem component={Link} to="/contributor/pending" className={classes.nested} selected={value === 1 && selectedItem === 2}>
              <ListItemText primary={`Not yet submitted(${totalProductCount?.notSubmit})`} />
            </ListItem>
            <ListItem component={Link} to="/contributor/revision" className={classes.nested} selected={value === 1 && selectedItem === 3}>
              <ListItemText primary={`Under Revision(${totalProductCount?.pendingCount})`} />
            </ListItem>
            <ListItem component={Link} to="/contributor/reject" className={classes.nested} selected={value === 1 && selectedItem === 4}>
              <ListItemText primary={`Rejections(${totalProductCount?.rejectCount})`} />
            </ListItem>
            <ListItem component={Link} to="/contributor/publish" className={classes.nested} selected={value === 1 && selectedItem === 5}>
              <ListItemText primary={`Published(${totalProductCount?.publishCount})`} />
            </ListItem>
          </List>
        </Collapse>

        <ListItem
          classes={{
            gutters: classes.gutters,
            selected: classes.selectedItem,
          }}
          component={Link}
          to="/contributor/earnings"
          selected={value === 6}
        >
          <EuroIcon />
          <ListItemText primary="Earning Management" />
        </ListItem>
        <ListItem
          classes={{
            gutters: classes.gutters,
            selected: classes.selectedItem,
          }}
          component={Link}
          to="/contributor/contributor-price-plan"
          selected={value === 7}
        >
          <CardMembershipIcon />
          <ListItemText primary="Contributor Price Plan" />
        </ListItem>
        <ListItem
          classes={{
            gutters: classes.gutters,
            selected: classes.selectedItem,
          }}
          component={Link}
          to="/contributor/guidLine"
          selected={value === 8}
        >
          <HelpOutlineIcon />
          <ListItemText primary="Guideline" />
        </ListItem>
        <ListItem
          classes={{
            gutters: classes.gutters,
            selected: classes.selectedItem,
          }}
          component={Link}
          to="/contributor/settings"
          selected={value === 9}
        >
          <AccountCircleIcon />
          <ListItemText primary="Account Setting" />
        </ListItem>
      </List>
    </aside>
  );
};

export default Sidebar;
