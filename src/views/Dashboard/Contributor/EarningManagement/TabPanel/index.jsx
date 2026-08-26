"use client";

import { Box } from "@/components/ui-kit";
import React from "react";



const TabPanel = ({ children, index, value, ...other }) => {
  return (
    <div role="tabpanel" hidden={value !== index} id={`tabpanel-${index}`} aria-labelledby={`data-tab-${index}`} {...other}>
      {value === index && <Box className="bg-[#FFF] p-[2rem]">{children}</Box>}
    </div>
  );
};

export default TabPanel;
