"use client";

import { Button, Container, Typography, useMediaQuery } from "@/components/ui-kit";
import mobileHeroBG from "../../../assets/banner/mobileHero-banner.jpg";
import tabletHeroBG from "../../../assets/banner/tabletHero-banner.jpg";
import heroBG from "../../../assets/banner/hero-banner.jpg";
import { UserOutlined as AccountCircleIcon } from "@ant-design/icons";
import { CaretDownOutlined as ArrowDropDownIcon } from "@ant-design/icons";
import React, { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "@/lib/router";
import contributorBG from "../../../assets/banner/contributorBG.jpg";
import contributorLogo from "../../../assets/Logo/piktask.png";
import SignUpModal from "../../../views/Authentication/SignUpModal";
import CustomPopper from "../CustomPopper";
import SectionHeading from "../Heading";
import Search from "../Search";
import SearchKeyWords from "../SearchKeyWords";

const HeroSection = (props) => {
  const recentButtonRef = useRef();
  const anchorRef = useRef(null);
  const popularButtonRef = useRef();
  const {
    size,
    popularKeywords,
    title,
    heroButton,
    isSearch,
    terms,
    copyrightInfo,
    license,
    cookiesPolicy,
    support,
    blogsTitle,
    guidLine,
    contact,
    contributorUser,
    aboutUs,
  } = props;

  const user = useSelector((state) => state.user);

  const [openAuthModal, setOpenAuthModal] = useState(false);
  const [open, setOpen] = useState(false);
  const [role, setRole] = useState("");
  const mobileView = useMediaQuery("(max-width:577px)");

  useEffect(() => {
    const recentImage = recentButtonRef?.current?.baseURI.split("/").includes("recent");
    if (recentImage) {
      recentButtonRef?.current?.classList?.add("active");
    } else {
      popularButtonRef?.current?.classList?.add("active");
    }
  }, []);

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
    setRole(e.currentTarget.value);
    setOpenAuthModal(true);
  };

  return (
    <>
      {contributorUser ? (
        <div
          className={"[background-position:center_center] bg-cover bg-no-repeat relative before:bg-[rgba(0,28,48,0.6)] before:content-[\"\"] before:absolute before:top-[0] before:left-[0] before:w-[100%] before:h-[100%]"}
          style={{
            backgroundImage: `url(${contributorBG.src})`,
            minHeight: size === "large" ? "50rem" : "25rem",
          }}
        >
          <Container>
            <div className="flex justify-between items-center">
              <Button className="[&_img]:w-[15rem]" component={Link} to="/">
                <img src={contributorLogo.src} alt="contributorLogo" />
              </Button>

              {user?.token && user?.role === "contributor" && user?.isLoggedIn ? (
                <div
                  className="cursor-pointer flex items-center"
                  onClick={handleToggle}
                  aria-controls={open ? "menu-list-grow" : undefined}
                  aria-haspopup="true"
                  ref={anchorRef}
                >
                  {user?.isLoggedIn && user?.avatar ? (
                    <img className="text-[4.8rem] w-[3.6rem] h-[3.6rem] rounded-[100%] relative right-[-0.6rem] text-[#FB5252]" src={user?.avatar} alt={user?.username} />
                  ) : (
                    <AccountCircleIcon className="text-[4.8rem] w-[3.6rem] h-[3.6rem] rounded-[100%] relative right-[-0.6rem] text-[#FB5252]" />
                  )}
                  <ArrowDropDownIcon className="text-[3.5rem] text-[#f1f1f1] cursor-pointer" />
                </div>
              ) : (
                <Button className="text-[#fff] font-[400] font-['Roboto',sans-serif] capitalize text-[1.4rem] rounded-[3rem] opacity-[1] leading-[1.75] p-[0.3rem_2rem] border-[#0088f2] ml-[1rem] mr-[1rem] [border:.2rem_solid_#0088f2] [transition:all_0.3s_linear] hover:bg-[#0088f2] hover:border-[#0088f2] max-[1024px]:pr-[1rem] max-[1024px]:pl-[1rem] max-[1024px]:text-[1.4rem]" onClick={handleClick} value="contributor">
                  Login or Join Now
                </Button>
              )}
            </div>
            <div>
              <div className="flex justify-center flex-col items-center max-w-[60rem] m-[0_auto] pt-[11rem] relative z-[1] [&_h2]:text-[#fff] [&_h2]:text-center [&_h2]:mb-[1rem] [&_h1]:text-[#fff] [&_h1]:text-center [&_h1]:mb-[2rem]">
                <Typography variant="h2">Become a Contributor</Typography>
                <Typography variant="h1">Share your creations and earn money doing what you love</Typography>
                <Button className="p-[0.5rem_2.5rem] text-[14px] font-[500] text-[#fff] rounded-[30px] [transition:all_0.3s_linear] bg-[#0088f2] [border:2px_solid_#0088f2] hover:bg-[#0773c5] hover:border-[#0773c5]" onClick={handleClick} value="contributor">
                  JOIN NOW
                </Button>
              </div>
            </div>
          </Container>

          <SignUpModal openAuthModal={openAuthModal} setOpenAuthModal={setOpenAuthModal} role={role} />

          <CustomPopper open={open} handleToggle={handleToggle} anchorRef={anchorRef} handleClose={handleClose} handleListKeyDown={handleListKeyDown} />
        </div>
      ) : (
        <div
          className={"[background-position:center_center] bg-cover bg-no-repeat flex items-center justify-center relative before:bg-[rgba(0,28,48,0.6)] before:content-[\"\"] before:absolute before:top-[0] before:left-[0] before:w-[100%] before:h-[100%] bg-[image:var(--hero-d)] max-[768.95px]:bg-[image:var(--hero-t)] max-[575.95px]:bg-[image:var(--hero-m)]"}
          style={{
            padding: mobileView ? (size === "large" ? "3rem 0" : "3rem 0") : size === "large" ? "5rem 0" : "3rem 0",
            "--hero-d": `url(${heroBG.src})`,
            "--hero-t": `url(${tabletHeroBG.src})`,
            "--hero-m": `url(${mobileHeroBG.src})`,
          }}
        >
          <Container>
            <div className="flex justify-center flex-col items-center max-w-[85rem] m-[0_auto] relative z-[1]">
              {title && <SectionHeading title={title} color="white" center size={size} heroTitle />}

              {terms && (
                <Typography
                  style={{
                    color: "white",
                    fontSize: "3rem",
                    fontWeight: "600",
                  }}
                >
                  Terms And Condition
                </Typography>
              )}

              {copyrightInfo && (
                <Typography
                  style={{
                    color: "white",
                    fontSize: "3rem",
                    fontWeight: "600",
                  }}
                  variant="h1"
                >
                  Copyright Information
                </Typography>
              )}

              {license && (
                <Typography
                  style={{
                    color: "white",
                    fontSize: "3rem",
                    fontWeight: "600",
                  }}
                  variant="h1"
                >
                  License Agreement
                </Typography>
              )}

              {cookiesPolicy && (
                <Typography
                  style={{
                    color: "white",
                    fontSize: "3rem",
                    fontWeight: "600",
                  }}
                  variant="h1"
                >
                  Cookies Policy
                </Typography>
              )}

              {aboutUs && (
                <Typography
                  style={{
                    color: "white",
                    fontSize: "3rem",
                    fontWeight: "600",
                  }}
                  variant="h1"
                >
                  About Us
                </Typography>
              )}

              {support && (
                <Typography
                  style={{
                    color: "white",
                    fontSize: "3rem",
                    fontWeight: "600",
                  }}
                  variant="h1"
                >
                  Support
                </Typography>
              )}

              {contact && (
                <Typography
                  style={{
                    color: "white",
                    fontSize: "3rem",
                    fontWeight: "600",
                  }}
                  variant="h1"
                >
                  How can we help you?
                </Typography>
              )}

              {blogsTitle && (
                <Typography
                  style={{
                    color: "white",
                    fontSize: "3rem",
                    fontWeight: "600",
                  }}
                  variant="h1"
                >
                  Piktask Blog
                </Typography>
              )}

              {guidLine && (
                <Typography
                  style={{
                    color: "white",
                    fontSize: "3rem",
                    fontWeight: "600",
                  }}
                  variant="h1"
                >
                  Piktask GuidLine
                </Typography>
              )}

              {!isSearch && <Search />}

              {popularKeywords && <SearchKeyWords popularKeywords={popularKeywords} heroButton={heroButton} />}

              {heroButton && (
                <div className="flex text-center justify-center max-[479.95px]:pt-[1.5rem]">
                  <Button ref={popularButtonRef} className="mr-[1rem] [border:2px_solid_#fff] p-[0.4rem_2.5rem] text-[14px] font-[500] text-[#fff] rounded-[30px] [transition:all_0.3s_linear] [&.active]:bg-[#0088f2] [&.active]:[border:2px_solid_#0088f2] hover:bg-[#0088f2] hover:text-[#fff]" component={Link} to="/" disableRipple>
                    Popular
                  </Button>

                  <Button ref={recentButtonRef} className="[border:2px_solid_#fff] p-[0.4rem_2.5rem] text-[14px] font-[500] text-[#fff] rounded-[30px] [transition:all_0.3s_linear] [&.active]:bg-[#0088f2] [&.active]:[border:2px_solid_#0088f2] hover:bg-[#0088f2] hover:text-[#fff]" component={Link} to="/recent/new-design" disableRipple>
                    Recent
                  </Button>
                </div>
              )}
            </div>
          </Container>
        </div>
      )}
    </>
  );
};

export default HeroSection;
