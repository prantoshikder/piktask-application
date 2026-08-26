"use client";

import { AppBar, Container, useMediaQuery } from "@/components/ui-kit";
import React, { useEffect, useState } from "react";
import DesktopMenu from "./DesktopMenu";
import MobileMenu from "./MobileMenu";



const Header = () => {
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
    <div className={fixedHeaderMenu ? `sticky w-[100%] z-[99] top-[0] [scroll-behavior:smooth] [transition:all_0.5s_linear] [&>.pk-appbar]:bg-[#001c30] [&>.pk-appbar]:p-[0.4rem_0] [&>.pk-appbar]:max-[768.95px]:p-[1.2rem_0] [&>.pk-appbar]:max-[479.95px]:p-[0.8rem_0]` : `[&>.pk-appbar]:bg-[#001c30] [&>.pk-appbar]:p-[0.4rem_0] [&>.pk-appbar]:max-[768.95px]:p-[1.2rem_0] [&>.pk-appbar]:max-[479.95px]:p-[0.8rem_0]`}>
      <AppBar position="static">
        <Container>{mobileMenu ? <MobileMenu /> : <DesktopMenu />}</Container>
      </AppBar>
    </div>
  );
};
export default Header;
