"use client";

import { Button, Collapse, List, ListItem, ListItemText } from "@/components/ui-kit";
import { UpOutlined as ExpandLess, DownOutlined as ExpandMore } from "@ant-design/icons";
import { UserOutlined as AccountCircleIcon } from "@ant-design/icons";
import { IdcardOutlined as CardMembershipIcon } from "@ant-design/icons";
import { CloudUploadOutlined as CloudUploadIcon } from "@ant-design/icons";
import { DashboardOutlined as DashboardIcon } from "@ant-design/icons";
import { EuroOutlined as EuroIcon } from "@ant-design/icons";
import { QuestionCircleOutlined as HelpOutlineIcon } from "@ant-design/icons";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "@/lib/router";
import logo from "../../../../../assets/Logo/piktask.png";

const Sidebar = () => {
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
    <aside className="bg-[#012036] w-[28rem] h-[100%] fixed z-[9999] top-[0]">
      <div className="w-[160px] p-[0] hover:bg-[transparent] max-[1024px]:w-[12rem] max-[1024px]:[&_img]:w-[100%]">
        <Button component={Link} to="/" disableRipple>
          <img src={logo.src} className="ml-[5.5rem] mt-[1rem] w-[100%] block" alt="Piktask" />
        </Button>
      </div>

      <List component="nav" aria-labelledby="nested-sidebar-nav">
        <ListItem
          classes={{
            gutters: "pl-[3.6rem] text-[#fff] [&_div_span]:text-[#fff] [&_svg]:text-[#fff] [&_svg]:mr-[1rem]",
            selected: "bg-[#0088f2]! [&_span]:text-[#fff] [&_svg]:text-[#fff]! [&_a]:text-[#fff]",
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
            gutters: "pl-[3.6rem] text-[#fff] [&_div_span]:text-[#fff] [&_svg]:text-[#fff] [&_svg]:mr-[1rem]",
            selected: "bg-[#0088f2]! [&_span]:text-[#fff] [&_svg]:text-[#fff]! [&_a]:text-[#fff]",
          }}
          className="[&_svg]:text-[#91999D]"
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
          <List component="div" disablePadding className="bg-[#023458] [&_a]:pl-[6rem] [&_a]:[&_span]:text-[#fff]">
            <ListItem component={Link} to="/contributor/pending" selected={value === 1 && selectedItem === 2}>
              <ListItemText primary={`Not yet submitted(${totalProductCount?.notSubmit})`} />
            </ListItem>
            <ListItem component={Link} to="/contributor/revision" selected={value === 1 && selectedItem === 3}>
              <ListItemText primary={`Under Revision(${totalProductCount?.pendingCount})`} />
            </ListItem>
            <ListItem component={Link} to="/contributor/reject" selected={value === 1 && selectedItem === 4}>
              <ListItemText primary={`Rejections(${totalProductCount?.rejectCount})`} />
            </ListItem>
            <ListItem component={Link} to="/contributor/publish" selected={value === 1 && selectedItem === 5}>
              <ListItemText primary={`Published(${totalProductCount?.publishCount})`} />
            </ListItem>
          </List>
        </Collapse>

        <ListItem
          classes={{
            gutters: "pl-[3.6rem] text-[#fff] [&_div_span]:text-[#fff] [&_svg]:text-[#fff] [&_svg]:mr-[1rem]",
            selected: "bg-[#0088f2]! [&_span]:text-[#fff] [&_svg]:text-[#fff]! [&_a]:text-[#fff]",
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
            gutters: "pl-[3.6rem] text-[#fff] [&_div_span]:text-[#fff] [&_svg]:text-[#fff] [&_svg]:mr-[1rem]",
            selected: "bg-[#0088f2]! [&_span]:text-[#fff] [&_svg]:text-[#fff]! [&_a]:text-[#fff]",
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
            gutters: "pl-[3.6rem] text-[#fff] [&_div_span]:text-[#fff] [&_svg]:text-[#fff] [&_svg]:mr-[1rem]",
            selected: "bg-[#0088f2]! [&_span]:text-[#fff] [&_svg]:text-[#fff]! [&_a]:text-[#fff]",
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
            gutters: "pl-[3.6rem] text-[#fff] [&_div_span]:text-[#fff] [&_svg]:text-[#fff] [&_svg]:mr-[1rem]",
            selected: "bg-[#0088f2]! [&_span]:text-[#fff] [&_svg]:text-[#fff]! [&_a]:text-[#fff]",
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
