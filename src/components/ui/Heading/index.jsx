"use client";

import { Grid, Typography } from "@/components/ui-kit";
import React from "react";

const SectionHeading = (props) => {
  const { title, color, children, center, size, uppercase, heroTitle } = props;

  const primaryColor = "#1B3F4E";
  const whiteColor = "#FFFFFF";

  return (
    <Grid container spacing={2} className="p-[4.5rem_0] flex justify-between items-center text-center max-[479.95px]:p-[0rem] max-[479.95px]:items-baseline" style={{ padding: size === "large" ? "0 0.8rem 3rem" : size === "medium" ? "0 2.5rem 1.5rem" : "0 0.8rem 1.2rem", }}>
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
            className="text-[#fff] text-[2.2rem] mb-[0] max-[768.95px]:leading-[1.5] max-[576px]:text-[1.8rem]"
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
            className="text-[#fff] text-[2.2rem] mb-[0] max-[768.95px]:leading-[1.5] max-[576px]:text-[1.8rem]"
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
