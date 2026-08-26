"use client";

import { Button, Container, Typography, useMediaQuery } from "@mui/material";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
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
import useStyles from "./Hero.styles";

const HeroSection = (props) => {
  const { classes } = useStyles();
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
          className={classes.contributorHero}
          style={{
            backgroundImage: `url(${contributorBG})`,
            minHeight: size === "large" ? "50rem" : "25rem",
          }}
        >
          <Container>
            <div className={classes.contributorMenu}>
              <Button className={classes.contributorLogo} component={Link} to="/">
                <img src={contributorLogo} alt="contributorLogo" />
              </Button>

              {user?.token && user?.role === "contributor" && user?.isLoggedIn ? (
                <div
                  className={classes.userAvatarArea}
                  onClick={handleToggle}
                  aria-controls={open ? "menu-list-grow" : undefined}
                  aria-haspopup="true"
                  ref={anchorRef}
                >
                  {user?.isLoggedIn && user?.avatar ? (
                    <img className={classes.avatar} src={user?.avatar} alt={user?.username} />
                  ) : (
                    <AccountCircleIcon className={classes.avatar} />
                  )}
                  <ArrowDropDownIcon className={classes.arrowDown} />
                </div>
              ) : (
                <Button className={classes.contributorLogin} onClick={handleClick} value="contributor">
                  Login or Join Now
                </Button>
              )}
            </div>
            <div>
              <div className={classes.contributorContent}>
                <Typography variant="h2">Become a Contributor</Typography>
                <Typography variant="h1">Share your creations and earn money doing what you love</Typography>
                <Button className={classes.joinNowBtn} onClick={handleClick} value="contributor">
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
          className={classes.heroWrapper}
          style={{
            padding: mobileView ? (size === "large" ? "3rem 0" : "3rem 0") : size === "large" ? "5rem 0" : "3rem 0",
          }}
        >
          <Container>
            <div className={classes.contentWrapper}>
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
                <div className={classes.heroButtonWrapper}>
                  <Button ref={popularButtonRef} className={classes.popularButton} component={Link} to="/" disableRipple>
                    Popular
                  </Button>

                  <Button ref={recentButtonRef} className={classes.recentButton} component={Link} to="/recent/new-design" disableRipple>
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
