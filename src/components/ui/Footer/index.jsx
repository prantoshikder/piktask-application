"use client";

import { Collapse, Container, Grid, List, ListItem, ListItemIcon, Typography } from "@mui/material";
import ExpandLessRoundedIcon from "@mui/icons-material/ExpandLessRounded";
import ExpandMoreRoundedIcon from "@mui/icons-material/ExpandMoreRounded";
import ListItemButton from "@mui/material/ListItemButton";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "@/lib/router";
import SignUpModal from "../../../views/Authentication/SignUpModal";
import Copyright from "./CopyRight";
import { useStyles } from "./Footer.styles";

const Footer = () => {
  const { classes } = useStyles();
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
    <footer className={classes.footerRoot}>
      {!mobileView ? (
        <Container classes={{ root: classes.root }}>
          <Grid container spacing={3}>
            <Grid size={{ xs: 6, sm: 3, md: 3 }} className={classes.footerWrapper}>
              <Typography variant="h3" className={classes.footerHeading}>
                Categories
              </Typography>

              <List className={classes.menuWrapper}>
                <ListItem className={classes.navItem}>
                  <Link className={classes.navLink} to="/category/business-card-mockup">
                    Business Card Mockup
                  </Link>
                </ListItem>
                <ListItem className={classes.navItem}>
                  <Link className={classes.navLink} to="/category/social-media-banner">
                    Social Media Banner
                  </Link>
                </ListItem>
                <ListItem className={classes.navItem}>
                  <Link className={classes.navLink} to="/category/logo-mockup">
                    Logo Mockup
                  </Link>
                </ListItem>
                <ListItem className={classes.navItem}>
                  <Link className={classes.navLink} to="/category/text-effect">
                    Text Effect
                  </Link>
                </ListItem>
              </List>
            </Grid>

            <Grid size={{ xs: 6, sm: 3, md: 3 }} className={classes.footerWrapper}>
              <Typography variant="h3" className={classes.footerHeading}>
                Content
              </Typography>

              <List className={classes.menuWrapper}>
                <ListItem className={classes.navItem}>
                  <Link className={classes.navLink} to="/recent/new-design">
                    New resources
                  </Link>
                </ListItem>
                <ListItem className={classes.navItem}>
                  <Link className={classes.navLink} to="/images/popular-images">
                    Most popular content
                  </Link>
                </ListItem>
                <ListItem className={classes.navItem}>
                  <Link className={classes.navLink} to="/search-key/trending-search">
                    Search trends
                  </Link>
                </ListItem>
                <ListItem className={classes.navItem}>
                  <Link className={classes.navLink} to="/allBlogs/blogs">
                    Blog
                  </Link>
                </ListItem>
              </List>
            </Grid>

            <Grid size={{ xs: 6, sm: 3, md: 3 }} className={classes.footerWrapper}>
              <Typography variant="h3" className={classes.footerHeading}>
                Information
              </Typography>

              <List className={classes.menuWrapper}>
                <ListItem className={classes.navItem}>
                  <Link className={classes.navLink} to="/about-us">
                    About us
                  </Link>
                </ListItem>

                {user?.isLoggedIn && user?.role === "contributor" ? (
                  <ListItem className={classes.navItem} component={Link} to="/contributor/dashboard">
                    Sell Your Content
                  </ListItem>
                ) : (
                  <ListItem className={classes.navItem} onClick={handleModalOpen} value="contributor">
                    Sell Your Content
                  </ListItem>
                )}

                <ListItem className={classes.navItem}>
                  <Link className={classes.navLink} to="/support">
                    Support
                  </Link>
                </ListItem>
                <ListItem className={classes.navItem}>
                  <Link className={classes.navLink} to="/contact">
                    Contact
                  </Link>
                </ListItem>
              </List>
            </Grid>

            <Grid size={{ xs: 6, sm: 3, md: 3 }} className={classes.footerWrapper}>
              <Typography variant="h3" className={classes.footerHeading}>
                Legal
              </Typography>

              <List className={classes.menuWrapper}>
                <ListItem className={classes.navItem}>
                  <Link className={classes.navLink} to="/terms-conditions">
                    Terms &amp; conditions
                  </Link>
                </ListItem>
                <ListItem className={classes.navItem}>
                  <Link className={classes.navLink} to="/license-agreement">
                    License Agreement
                  </Link>
                </ListItem>
                <ListItem className={classes.navItem}>
                  <Link className={classes.navLink} to="/copyright-information">
                    Copyright information
                  </Link>
                </ListItem>
                <ListItem className={classes.navItem}>
                  <Link className={classes.navLink} to="/cookies-policy">
                    Cookies policy
                  </Link>
                </ListItem>
              </List>
            </Grid>
          </Grid>
        </Container>
      ) : (
        <List className={classes.collapseRoot} component="nav" aria-labelledby="nested-list-subheader">
          <ListItemButton className={classes.listItemBtn} disableRipple onClick={handleClick}>
            <ListItemIcon className={classes.listItemIcon} />
            <ListItem className={classes.title}>CATEGORIES</ListItem>
            {open ? <ExpandMoreRoundedIcon className={classes.arrowIcon} /> : <ExpandLessRoundedIcon className={classes.arrowIcon} />}
          </ListItemButton>
          <Collapse className={classes.collapseInfo} in={!open} timeout="auto" unmountOnExit>
            <List component="div">
              <ListItemButton sx={{ pl: 4 }}>
                <Link className={classes.collapseNavLink} to="/category/business-card-mockup">
                  Business Card Mockup
                </Link>
              </ListItemButton>
              <br />
              <ListItemButton sx={{ pl: 4 }}>
                <Link className={classes.collapseNavLink} to="/category/social-media-banner">
                  Social Media Banner
                </Link>
              </ListItemButton>
              <br />
              <ListItemButton sx={{ pl: 4 }}>
                <Link className={classes.collapseNavLink} to="/category/logo-mockup">
                  Logo Mockup
                </Link>
              </ListItemButton>
              <br />
              <ListItemButton sx={{ pl: 4 }}>
                <Link className={classes.collapseNavLink} to="/category/text-effect">
                  Text Effect
                </Link>
              </ListItemButton>
            </List>
          </Collapse>

          <ListItemButton className={classes.listItemBtn} disableRipple onClick={handleContact}>
            <ListItemIcon className={classes.listItemIcon} />
            <ListItem className={classes.title}>CONTENT</ListItem>
            {contact ? <ExpandMoreRoundedIcon className={classes.arrowIcon} /> : <ExpandLessRoundedIcon className={classes.arrowIcon} />}
          </ListItemButton>
          <Collapse className={classes.collapseInfo} in={!contact} timeout="auto" unmountOnExit>
            <List component="div">
              <ListItemButton sx={{ pl: 4 }}>
                <Link className={classes.collapseNavLink} to="/recent/new-design">
                  New resources
                </Link>
              </ListItemButton>
              <br />
              <ListItemButton sx={{ pl: 4 }}>
                <Link className={classes.collapseNavLink} to="/images/popular-images">
                  The most popular content
                </Link>
              </ListItemButton>
              <br />
              <ListItemButton sx={{ pl: 4 }}>
                <Link className={classes.collapseNavLink} to="/search-key/trending-search">
                  Search trends
                </Link>
              </ListItemButton>
              <br />
              <ListItemButton sx={{ pl: 4 }}>
                <Link className={classes.collapseNavLink} to="/allBlogs/blogs">
                  Blog
                </Link>
              </ListItemButton>
            </List>
          </Collapse>

          <ListItemButton className={classes.listItemBtn} disableRipple onClick={handleInformation}>
            <ListItemIcon className={classes.listItemIcon} />
            <ListItem className={classes.title}>INFORMATION</ListItem>
            {information ? <ExpandMoreRoundedIcon className={classes.arrowIcon} /> : <ExpandLessRoundedIcon className={classes.arrowIcon} />}
          </ListItemButton>
          <Collapse className={classes.collapseInfo} in={!information} timeout="auto" unmountOnExit>
            <List component="div">
              <ListItemButton sx={{ pl: 4 }}>
                <Link className={classes.collapseNavLink} to="/about-us">
                  About us
                </Link>
              </ListItemButton>
              <br />
              <ListItemButton sx={{ pl: 4 }}>
                {user?.isLoggedIn && user?.role === "contributor" ? (
                  <Link className={classes.collapseNavLink} to="/contributor/dashboard">
                    Sell your content
                  </Link>
                ) : (
                  <Link className={classes.collapseNavLink} to="/contributor/join">
                    Sell your content
                  </Link>
                )}
              </ListItemButton>
              <br />
              <ListItemButton sx={{ pl: 4 }}>
                <Link className={classes.collapseNavLink} to="/support">
                  Support
                </Link>
              </ListItemButton>
              <br />
              <ListItemButton sx={{ pl: 4 }}>
                <Link className={classes.collapseNavLink} to="/contact">
                  Contact
                </Link>
              </ListItemButton>
            </List>
          </Collapse>

          <ListItemButton className={classes.listItemBtn} disableRipple onClick={handleLegal}>
            <ListItemIcon className={classes.listItemIcon} />
            <ListItem className={classes.title}>LEGAL</ListItem>
            {legal ? <ExpandMoreRoundedIcon className={classes.arrowIcon} /> : <ExpandLessRoundedIcon className={classes.arrowIcon} />}
          </ListItemButton>
          <Collapse className={classes.collapseInfo} in={!legal} timeout="auto" unmountOnExit>
            <List component="div">
              <ListItemButton sx={{ pl: 4 }}>
                <Link className={classes.collapseNavLink} to="/terms-conditions" rel="noreferrer">
                  Terms &amp; conditions
                </Link>
              </ListItemButton>
              <br />
              <ListItemButton sx={{ pl: 4 }}>
                <Link className={classes.collapseNavLink} to="/license-agreement" rel="noreferrer">
                  License Agreement
                </Link>
              </ListItemButton>
              <br />
              <ListItemButton sx={{ pl: 4 }}>
                <Link className={classes.collapseNavLink} to="/copyright-information" rel="noreferrer">
                  Copyright information
                </Link>
              </ListItemButton>
              <br />
              <ListItemButton sx={{ pl: 4 }}>
                <Link className={classes.collapseNavLink} to="/cookies-policy" rel="noreferrer">
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
