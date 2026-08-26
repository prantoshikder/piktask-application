"use client";

import { Grid, Typography } from "@mui/material";
import React from "react";
import useStyles from "./Heading.styles";

const SectionHeading = (props) => {
  const { title, color, children, center, size, uppercase, heroTitle } = props;

  const primaryColor = "#1B3F4E";
  const { classes } = useStyles();
  const whiteColor = "#FFFFFF";

  return (
    <Grid container spacing={2} className={classes.headingContainer} style={{ padding: size === "large" ? "0 0.8rem 3rem" : size === "medium" ? "0 2.5rem 1.5rem" : "0 0.8rem 1.2rem", }}>
      <div
        style={
          center && {
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            width: "100%",
          }
        }
      >
        {heroTitle ? (
          <Typography
            className={classes.headingH1}
            variant="h1"
            style={{
              color: color === "white" ? whiteColor : primaryColor,
              textAlign: "center",
              textTransform: `${uppercase ? "uppercase" : "inherit"}`,
            }}
          >
            {title}
          </Typography>
        ) : (
          <Typography
            className={classes.headingH1}
            variant="h2"
            style={{
              color: color === "white" ? whiteColor : primaryColor,
              textAlign: "center",
              textTransform: `${uppercase ? "uppercase" : "inherit"}`,
            }}
          >
            {title}
          </Typography>
        )}
      </div>

      {children}
    </Grid>
  );
};

export default SectionHeading;
