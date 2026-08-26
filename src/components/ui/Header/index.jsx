"use client";

import { makeStyles } from "tss-react/mui";
import { AppBar, Container, useMediaQuery } from "@mui/material";
import React, { useEffect, useState } from "react";
import DesktopMenu from "./DesktopMenu";
import MobileMenu from "./MobileMenu";

const useStyles = makeStyles()((theme) => ({
  mainHeader: {
    "& > .MuiAppBar-colorPrimary": {
      background: "#001c30",
      padding: "0.4rem 0",
      [theme.breakpoints.down(769)]: {
        padding: "1.2rem 0",
      },
      [theme.breakpoints.down(480)]: {
        padding: "0.8rem 0",
      },
    },
  },
  fixedHeader: {
    position: "sticky",
    width: "100%",
    zIndex: 99,
    top: 0,
    scrollBehavior: "smooth",
    transition: "all 0.5s linear",

    "& > .MuiAppBar-colorPrimary": {
      background: "#001c30",
      padding: "0.4rem 0",
      [theme.breakpoints.down(769)]: {
        padding: "1.2rem 0",
      },
      [theme.breakpoints.down(480)]: {
        padding: "0.8rem 0",
      },
    },
  },
}));

const Header = () => {
  const { classes } = useStyles();
  const mobileMenu = useMediaQuery("(max-width:769px)");
  const [fixedHeaderMenu, setFixedHeaderMenu] = useState(false);

  const fixedHeader = () => {
    if (window.scrollY >= 300) {
      setFixedHeaderMenu(true);
    } else {
      setFixedHeaderMenu(false);
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", fixedHeader);

    return () => window.removeEventListener("scroll", fixedHeader);
  }, []);

  return (
    <div className={fixedHeaderMenu ? `${classes.fixedHeader}` : `${classes.mainHeader}`}>
      <AppBar position="static">
        <Container>{mobileMenu ? <MobileMenu /> : <DesktopMenu />}</Container>
      </AppBar>
    </div>
  );
};
export default Header;
