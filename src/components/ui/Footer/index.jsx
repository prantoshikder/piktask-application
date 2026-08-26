"use client";

import { Collapse, Container, Grid, List, ListItem, ListItemIcon, Typography } from "@/components/ui-kit";
import { UpOutlined as ExpandLessRoundedIcon } from "@ant-design/icons";
import { DownOutlined as ExpandMoreRoundedIcon } from "@ant-design/icons";
import { ListItemButton } from "@/components/ui-kit";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "@/lib/router";
import SignUpModal from "../../../views/Authentication/SignUpModal";
import Copyright from "./CopyRight";

const Footer = () => {
  const user = useSelector((state) => state.user);

  const [openAuthModal, setOpenAuthModal] = useState(false);
  const [information, setInformation] = useState(true);
  const [contact, setContact] = useState(true);
  const [legal, setLegal] = useState(true);
  const [open, setOpen] = useState(true);
  const [role, setRole] = useState("");

  const handleClick = () => {
    setOpen(!open);
  };
  const handleLegal = () => {
    setLegal(!legal);
  };
  const handleContact = () => {
    setContact(!contact);
  };
  const handleInformation = () => {
    setInformation(!information);
  };

  //mobile responsive
  const [menuSate, setMenuSate] = useState({ mobileView: false });
  const { mobileView } = menuSate;

  useEffect(() => {
    const setResponsiveness = () => {
      return window.innerWidth < 769
        ? setMenuSate((prevState) => ({ ...prevState, mobileView: true }))
        : setMenuSate((prevState) => ({ ...prevState, mobileView: false }));
    };
    setResponsiveness();
    window.addEventListener("resize", () => setResponsiveness());
  }, []);

  const handleModalOpen = () => {
    setRole("contributor");
    setOpenAuthModal(true);
  };

  return (
    <footer className="bg-[#001c30]">
      {!mobileView ? (
        <Container classes={{ root: "flex justify-between items-center p-[8rem_0] max-[768.95px]:hidden" }}>
          <Grid container spacing={3}>
            <Grid size={{ xs: 6, sm: 3, md: 3 }} className="max-[769px]:mt-[2rem] max-[576px]:max-w-[100%] max-[576px]:basis-[100%] max-[576px]:mt-[2rem]">
              <Typography variant="h3" className="uppercase mb-[2.4rem] text-[1.9rem] text-[#fff]">
                Categories
              </Typography>

              <List className="list-none p-[0]">
                <ListItem className="text-[#ddd] text-[1.5rem] cursor-pointer p-[0.8rem_0] [transition:color_0.3s_linear] first:pt-[0] hover:no-underline hover:text-[#0088f2]">
                  <Link className="text-[1.5rem] no-underline text-[#ddd] font-[400] font-['Roboto',sans-serif] [transition:color_0.3s_linear] cursor-pointer hover:no-underline hover:text-[#0088f2]" to="/category/business-card-mockup">
                    Business Card Mockup
                  </Link>
                </ListItem>
                <ListItem className="text-[#ddd] text-[1.5rem] cursor-pointer p-[0.8rem_0] [transition:color_0.3s_linear] first:pt-[0] hover:no-underline hover:text-[#0088f2]">
                  <Link className="text-[1.5rem] no-underline text-[#ddd] font-[400] font-['Roboto',sans-serif] [transition:color_0.3s_linear] cursor-pointer hover:no-underline hover:text-[#0088f2]" to="/category/social-media-banner">
                    Social Media Banner
                  </Link>
                </ListItem>
                <ListItem className="text-[#ddd] text-[1.5rem] cursor-pointer p-[0.8rem_0] [transition:color_0.3s_linear] first:pt-[0] hover:no-underline hover:text-[#0088f2]">
                  <Link className="text-[1.5rem] no-underline text-[#ddd] font-[400] font-['Roboto',sans-serif] [transition:color_0.3s_linear] cursor-pointer hover:no-underline hover:text-[#0088f2]" to="/category/logo-mockup">
                    Logo Mockup
                  </Link>
                </ListItem>
                <ListItem className="text-[#ddd] text-[1.5rem] cursor-pointer p-[0.8rem_0] [transition:color_0.3s_linear] first:pt-[0] hover:no-underline hover:text-[#0088f2]">
                  <Link className="text-[1.5rem] no-underline text-[#ddd] font-[400] font-['Roboto',sans-serif] [transition:color_0.3s_linear] cursor-pointer hover:no-underline hover:text-[#0088f2]" to="/category/text-effect">
                    Text Effect
                  </Link>
                </ListItem>
              </List>
            </Grid>

            <Grid size={{ xs: 6, sm: 3, md: 3 }} className="max-[769px]:mt-[2rem] max-[576px]:max-w-[100%] max-[576px]:basis-[100%] max-[576px]:mt-[2rem]">
              <Typography variant="h3" className="uppercase mb-[2.4rem] text-[1.9rem] text-[#fff]">
                Content
              </Typography>

              <List className="list-none p-[0]">
                <ListItem className="text-[#ddd] text-[1.5rem] cursor-pointer p-[0.8rem_0] [transition:color_0.3s_linear] first:pt-[0] hover:no-underline hover:text-[#0088f2]">
                  <Link className="text-[1.5rem] no-underline text-[#ddd] font-[400] font-['Roboto',sans-serif] [transition:color_0.3s_linear] cursor-pointer hover:no-underline hover:text-[#0088f2]" to="/recent/new-design">
                    New resources
                  </Link>
                </ListItem>
                <ListItem className="text-[#ddd] text-[1.5rem] cursor-pointer p-[0.8rem_0] [transition:color_0.3s_linear] first:pt-[0] hover:no-underline hover:text-[#0088f2]">
                  <Link className="text-[1.5rem] no-underline text-[#ddd] font-[400] font-['Roboto',sans-serif] [transition:color_0.3s_linear] cursor-pointer hover:no-underline hover:text-[#0088f2]" to="/images/popular-images">
                    Most popular content
                  </Link>
                </ListItem>
                <ListItem className="text-[#ddd] text-[1.5rem] cursor-pointer p-[0.8rem_0] [transition:color_0.3s_linear] first:pt-[0] hover:no-underline hover:text-[#0088f2]">
                  <Link className="text-[1.5rem] no-underline text-[#ddd] font-[400] font-['Roboto',sans-serif] [transition:color_0.3s_linear] cursor-pointer hover:no-underline hover:text-[#0088f2]" to="/search-key/trending-search">
                    Search trends
                  </Link>
                </ListItem>
                <ListItem className="text-[#ddd] text-[1.5rem] cursor-pointer p-[0.8rem_0] [transition:color_0.3s_linear] first:pt-[0] hover:no-underline hover:text-[#0088f2]">
                  <Link className="text-[1.5rem] no-underline text-[#ddd] font-[400] font-['Roboto',sans-serif] [transition:color_0.3s_linear] cursor-pointer hover:no-underline hover:text-[#0088f2]" to="/allBlogs/blogs">
                    Blog
                  </Link>
                </ListItem>
              </List>
            </Grid>

            <Grid size={{ xs: 6, sm: 3, md: 3 }} className="max-[769px]:mt-[2rem] max-[576px]:max-w-[100%] max-[576px]:basis-[100%] max-[576px]:mt-[2rem]">
              <Typography variant="h3" className="uppercase mb-[2.4rem] text-[1.9rem] text-[#fff]">
                Information
              </Typography>

              <List className="list-none p-[0]">
                <ListItem className="text-[#ddd] text-[1.5rem] cursor-pointer p-[0.8rem_0] [transition:color_0.3s_linear] first:pt-[0] hover:no-underline hover:text-[#0088f2]">
                  <Link className="text-[1.5rem] no-underline text-[#ddd] font-[400] font-['Roboto',sans-serif] [transition:color_0.3s_linear] cursor-pointer hover:no-underline hover:text-[#0088f2]" to="/about-us">
                    About us
                  </Link>
                </ListItem>

                {user?.isLoggedIn && user?.role === "contributor" ? (
                  <ListItem className="text-[#ddd] text-[1.5rem] cursor-pointer p-[0.8rem_0] [transition:color_0.3s_linear] first:pt-[0] hover:no-underline hover:text-[#0088f2]" component={Link} to="/contributor/dashboard">
                    Sell Your Content
                  </ListItem>
                ) : (
                  <ListItem className="text-[#ddd] text-[1.5rem] cursor-pointer p-[0.8rem_0] [transition:color_0.3s_linear] first:pt-[0] hover:no-underline hover:text-[#0088f2]" onClick={handleModalOpen} value="contributor">
                    Sell Your Content
                  </ListItem>
                )}

                <ListItem className="text-[#ddd] text-[1.5rem] cursor-pointer p-[0.8rem_0] [transition:color_0.3s_linear] first:pt-[0] hover:no-underline hover:text-[#0088f2]">
                  <Link className="text-[1.5rem] no-underline text-[#ddd] font-[400] font-['Roboto',sans-serif] [transition:color_0.3s_linear] cursor-pointer hover:no-underline hover:text-[#0088f2]" to="/support">
                    Support
                  </Link>
                </ListItem>
                <ListItem className="text-[#ddd] text-[1.5rem] cursor-pointer p-[0.8rem_0] [transition:color_0.3s_linear] first:pt-[0] hover:no-underline hover:text-[#0088f2]">
                  <Link className="text-[1.5rem] no-underline text-[#ddd] font-[400] font-['Roboto',sans-serif] [transition:color_0.3s_linear] cursor-pointer hover:no-underline hover:text-[#0088f2]" to="/contact">
                    Contact
                  </Link>
                </ListItem>
              </List>
            </Grid>

            <Grid size={{ xs: 6, sm: 3, md: 3 }} className="max-[769px]:mt-[2rem] max-[576px]:max-w-[100%] max-[576px]:basis-[100%] max-[576px]:mt-[2rem]">
              <Typography variant="h3" className="uppercase mb-[2.4rem] text-[1.9rem] text-[#fff]">
                Legal
              </Typography>

              <List className="list-none p-[0]">
                <ListItem className="text-[#ddd] text-[1.5rem] cursor-pointer p-[0.8rem_0] [transition:color_0.3s_linear] first:pt-[0] hover:no-underline hover:text-[#0088f2]">
                  <Link className="text-[1.5rem] no-underline text-[#ddd] font-[400] font-['Roboto',sans-serif] [transition:color_0.3s_linear] cursor-pointer hover:no-underline hover:text-[#0088f2]" to="/terms-conditions">
                    Terms &amp; conditions
                  </Link>
                </ListItem>
                <ListItem className="text-[#ddd] text-[1.5rem] cursor-pointer p-[0.8rem_0] [transition:color_0.3s_linear] first:pt-[0] hover:no-underline hover:text-[#0088f2]">
                  <Link className="text-[1.5rem] no-underline text-[#ddd] font-[400] font-['Roboto',sans-serif] [transition:color_0.3s_linear] cursor-pointer hover:no-underline hover:text-[#0088f2]" to="/license-agreement">
                    License Agreement
                  </Link>
                </ListItem>
                <ListItem className="text-[#ddd] text-[1.5rem] cursor-pointer p-[0.8rem_0] [transition:color_0.3s_linear] first:pt-[0] hover:no-underline hover:text-[#0088f2]">
                  <Link className="text-[1.5rem] no-underline text-[#ddd] font-[400] font-['Roboto',sans-serif] [transition:color_0.3s_linear] cursor-pointer hover:no-underline hover:text-[#0088f2]" to="/copyright-information">
                    Copyright information
                  </Link>
                </ListItem>
                <ListItem className="text-[#ddd] text-[1.5rem] cursor-pointer p-[0.8rem_0] [transition:color_0.3s_linear] first:pt-[0] hover:no-underline hover:text-[#0088f2]">
                  <Link className="text-[1.5rem] no-underline text-[#ddd] font-[400] font-['Roboto',sans-serif] [transition:color_0.3s_linear] cursor-pointer hover:no-underline hover:text-[#0088f2]" to="/cookies-policy">
                    Cookies policy
                  </Link>
                </ListItem>
              </List>
            </Grid>
          </Grid>
        </Container>
      ) : (
        <List className="bg-[#001c30] w-[100%] p-[2rem_0rem] text-[#ddd]" component="nav" aria-labelledby="nested-list-subheader">
          <ListItemButton className="flex justify-between items-center p-[2rem] [border-bottom:1px_solid_#023458] last:[border-bottom:transparent]" disableRipple onClick={handleClick}>
            <ListItemIcon className="min-w-[0]!" />
            <ListItem className="p-[0] text-[1.4rem] font-[500]">CATEGORIES</ListItem>
            {open ? <ExpandMoreRoundedIcon className="w-[2em]! h-[1.5em]!" /> : <ExpandLessRoundedIcon className="w-[2em]! h-[1.5em]!" />}
          </ListItemButton>
          <Collapse className="bg-[#023458]" in={!open} timeout="auto" unmountOnExit>
            <List component="div">
              <ListItemButton sx={{ pl: 4 }}>
                <Link className="text-[#ddd] text-[1.5rem] no-underline font-[400] p-[2rem_4rem_0] font-['Roboto',sans-serif] [transition:color_0.3s_linear] cursor-pointer hover:no-underline hover:text-[#0088f2]" to="/category/business-card-mockup">
                  Business Card Mockup
                </Link>
              </ListItemButton>
              <br />
              <ListItemButton sx={{ pl: 4 }}>
                <Link className="text-[#ddd] text-[1.5rem] no-underline font-[400] p-[2rem_4rem_0] font-['Roboto',sans-serif] [transition:color_0.3s_linear] cursor-pointer hover:no-underline hover:text-[#0088f2]" to="/category/social-media-banner">
                  Social Media Banner
                </Link>
              </ListItemButton>
              <br />
              <ListItemButton sx={{ pl: 4 }}>
                <Link className="text-[#ddd] text-[1.5rem] no-underline font-[400] p-[2rem_4rem_0] font-['Roboto',sans-serif] [transition:color_0.3s_linear] cursor-pointer hover:no-underline hover:text-[#0088f2]" to="/category/logo-mockup">
                  Logo Mockup
                </Link>
              </ListItemButton>
              <br />
              <ListItemButton sx={{ pl: 4 }}>
                <Link className="text-[#ddd] text-[1.5rem] no-underline font-[400] p-[2rem_4rem_0] font-['Roboto',sans-serif] [transition:color_0.3s_linear] cursor-pointer hover:no-underline hover:text-[#0088f2]" to="/category/text-effect">
                  Text Effect
                </Link>
              </ListItemButton>
            </List>
          </Collapse>

          <ListItemButton className="flex justify-between items-center p-[2rem] [border-bottom:1px_solid_#023458] last:[border-bottom:transparent]" disableRipple onClick={handleContact}>
            <ListItemIcon className="min-w-[0]!" />
            <ListItem className="p-[0] text-[1.4rem] font-[500]">CONTENT</ListItem>
            {contact ? <ExpandMoreRoundedIcon className="w-[2em]! h-[1.5em]!" /> : <ExpandLessRoundedIcon className="w-[2em]! h-[1.5em]!" />}
          </ListItemButton>
          <Collapse className="bg-[#023458]" in={!contact} timeout="auto" unmountOnExit>
            <List component="div">
              <ListItemButton sx={{ pl: 4 }}>
                <Link className="text-[#ddd] text-[1.5rem] no-underline font-[400] p-[2rem_4rem_0] font-['Roboto',sans-serif] [transition:color_0.3s_linear] cursor-pointer hover:no-underline hover:text-[#0088f2]" to="/recent/new-design">
                  New resources
                </Link>
              </ListItemButton>
              <br />
              <ListItemButton sx={{ pl: 4 }}>
                <Link className="text-[#ddd] text-[1.5rem] no-underline font-[400] p-[2rem_4rem_0] font-['Roboto',sans-serif] [transition:color_0.3s_linear] cursor-pointer hover:no-underline hover:text-[#0088f2]" to="/images/popular-images">
                  The most popular content
                </Link>
              </ListItemButton>
              <br />
              <ListItemButton sx={{ pl: 4 }}>
                <Link className="text-[#ddd] text-[1.5rem] no-underline font-[400] p-[2rem_4rem_0] font-['Roboto',sans-serif] [transition:color_0.3s_linear] cursor-pointer hover:no-underline hover:text-[#0088f2]" to="/search-key/trending-search">
                  Search trends
                </Link>
              </ListItemButton>
              <br />
              <ListItemButton sx={{ pl: 4 }}>
                <Link className="text-[#ddd] text-[1.5rem] no-underline font-[400] p-[2rem_4rem_0] font-['Roboto',sans-serif] [transition:color_0.3s_linear] cursor-pointer hover:no-underline hover:text-[#0088f2]" to="/allBlogs/blogs">
                  Blog
                </Link>
              </ListItemButton>
            </List>
          </Collapse>

          <ListItemButton className="flex justify-between items-center p-[2rem] [border-bottom:1px_solid_#023458] last:[border-bottom:transparent]" disableRipple onClick={handleInformation}>
            <ListItemIcon className="min-w-[0]!" />
            <ListItem className="p-[0] text-[1.4rem] font-[500]">INFORMATION</ListItem>
            {information ? <ExpandMoreRoundedIcon className="w-[2em]! h-[1.5em]!" /> : <ExpandLessRoundedIcon className="w-[2em]! h-[1.5em]!" />}
          </ListItemButton>
          <Collapse className="bg-[#023458]" in={!information} timeout="auto" unmountOnExit>
            <List component="div">
              <ListItemButton sx={{ pl: 4 }}>
                <Link className="text-[#ddd] text-[1.5rem] no-underline font-[400] p-[2rem_4rem_0] font-['Roboto',sans-serif] [transition:color_0.3s_linear] cursor-pointer hover:no-underline hover:text-[#0088f2]" to="/about-us">
                  About us
                </Link>
              </ListItemButton>
              <br />
              <ListItemButton sx={{ pl: 4 }}>
                {user?.isLoggedIn && user?.role === "contributor" ? (
                  <Link className="text-[#ddd] text-[1.5rem] no-underline font-[400] p-[2rem_4rem_0] font-['Roboto',sans-serif] [transition:color_0.3s_linear] cursor-pointer hover:no-underline hover:text-[#0088f2]" to="/contributor/dashboard">
                    Sell your content
                  </Link>
                ) : (
                  <Link className="text-[#ddd] text-[1.5rem] no-underline font-[400] p-[2rem_4rem_0] font-['Roboto',sans-serif] [transition:color_0.3s_linear] cursor-pointer hover:no-underline hover:text-[#0088f2]" to="/contributor/join">
                    Sell your content
                  </Link>
                )}
              </ListItemButton>
              <br />
              <ListItemButton sx={{ pl: 4 }}>
                <Link className="text-[#ddd] text-[1.5rem] no-underline font-[400] p-[2rem_4rem_0] font-['Roboto',sans-serif] [transition:color_0.3s_linear] cursor-pointer hover:no-underline hover:text-[#0088f2]" to="/support">
                  Support
                </Link>
              </ListItemButton>
              <br />
              <ListItemButton sx={{ pl: 4 }}>
                <Link className="text-[#ddd] text-[1.5rem] no-underline font-[400] p-[2rem_4rem_0] font-['Roboto',sans-serif] [transition:color_0.3s_linear] cursor-pointer hover:no-underline hover:text-[#0088f2]" to="/contact">
                  Contact
                </Link>
              </ListItemButton>
            </List>
          </Collapse>

          <ListItemButton className="flex justify-between items-center p-[2rem] [border-bottom:1px_solid_#023458] last:[border-bottom:transparent]" disableRipple onClick={handleLegal}>
            <ListItemIcon className="min-w-[0]!" />
            <ListItem className="p-[0] text-[1.4rem] font-[500]">LEGAL</ListItem>
            {legal ? <ExpandMoreRoundedIcon className="w-[2em]! h-[1.5em]!" /> : <ExpandLessRoundedIcon className="w-[2em]! h-[1.5em]!" />}
          </ListItemButton>
          <Collapse className="bg-[#023458]" in={!legal} timeout="auto" unmountOnExit>
            <List component="div">
              <ListItemButton sx={{ pl: 4 }}>
                <Link className="text-[#ddd] text-[1.5rem] no-underline font-[400] p-[2rem_4rem_0] font-['Roboto',sans-serif] [transition:color_0.3s_linear] cursor-pointer hover:no-underline hover:text-[#0088f2]" to="/terms-conditions" rel="noreferrer">
                  Terms &amp; conditions
                </Link>
              </ListItemButton>
              <br />
              <ListItemButton sx={{ pl: 4 }}>
                <Link className="text-[#ddd] text-[1.5rem] no-underline font-[400] p-[2rem_4rem_0] font-['Roboto',sans-serif] [transition:color_0.3s_linear] cursor-pointer hover:no-underline hover:text-[#0088f2]" to="/license-agreement" rel="noreferrer">
                  License Agreement
                </Link>
              </ListItemButton>
              <br />
              <ListItemButton sx={{ pl: 4 }}>
                <Link className="text-[#ddd] text-[1.5rem] no-underline font-[400] p-[2rem_4rem_0] font-['Roboto',sans-serif] [transition:color_0.3s_linear] cursor-pointer hover:no-underline hover:text-[#0088f2]" to="/copyright-information" rel="noreferrer">
                  Copyright information
                </Link>
              </ListItemButton>
              <br />
              <ListItemButton sx={{ pl: 4 }}>
                <Link className="text-[#ddd] text-[1.5rem] no-underline font-[400] p-[2rem_4rem_0] font-['Roboto',sans-serif] [transition:color_0.3s_linear] cursor-pointer hover:no-underline hover:text-[#0088f2]" to="/cookies-policy" rel="noreferrer">
                  Cookies policy
                </Link>
              </ListItemButton>
            </List>
          </Collapse>
        </List>
      )}
      <Copyright />
      <SignUpModal openAuthModal={openAuthModal} setOpenAuthModal={setOpenAuthModal} role={role} />
    </footer>
  );
};

export default Footer;
