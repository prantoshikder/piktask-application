"use client";

import { Typography } from "@/components/ui-kit";
import React from "react";

const Heading = ({ tag, children, ...rest }) => {
  return (
    <Typography variant={tag} {...rest}>
      {children}
    </Typography>
  );
};

export default Heading;
