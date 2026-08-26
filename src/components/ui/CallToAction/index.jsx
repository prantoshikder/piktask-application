"use client";

import { Button, Container, Typography } from "@mui/material";
import React, { useState } from "react";
import { Link } from "@/lib/router";
import SignUpModal from "../../../views/Authentication/SignUpModal";
import useStyles from "./CallToAction.styles";

const CallToAction = (props) => {
  const { classes } = useStyles();
  const {title, subtitle, buttonText, buttonLink, buttonClicked, uppercase, contributorJoinNow,} = props;
  const [openAuthModal, setOpenAuthModal] = useState(false);
  const [role, setRole] = useState("");

  const handleClick = (e) => {
    setRole(e.currentTarget.value)
    setOpenAuthModal(true)
  }

  return (
    <div className={classes.wrapper}>
      <Container className={classes.container}>
        <Typography className={classes.title} variant="h2">
          {title}
        </Typography>
        <Typography className={classes.subtitle} variant="body1">
          {subtitle}
        </Typography>

        {contributorJoinNow ? (
          <Button
            className={classes.moreButton}
            style={{ textTransform: uppercase ? "uppercase" : "capitalize" }}
            onClick={handleClick}
            value="contributor"
          >
            {buttonText}
          </Button>
        ) : (
          <Link
            // to={buttonLink && `${buttonLink}`}
            to="#!"
            className={classes.moreButton}
            style={{ textTransform: uppercase ? "uppercase" : "capitalize" }}
            onClick={buttonClicked}
          >
            {buttonText}
          </Link>
        )}
      </Container>
      <SignUpModal
        openAuthModal={openAuthModal}
        setOpenAuthModal={setOpenAuthModal}
        role={role}
      />
    </div>
  );
};

export default CallToAction;
