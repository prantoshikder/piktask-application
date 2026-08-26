"use client";

import { makeStyles } from "tss-react/mui";

// const drawerWidth = 280;

const useStyles = makeStyles()((theme) => ({
  // Mobile Menu
  mobileSidebarMenu: {
    backgroundColor: "#001c30",
    height: "100%",

    "& span": {
      color: "#fff",
    },

    "& .MuiListItem-root.Mui-selected": {
      backgroundColor: "#022238",
    },
  },
  dropdownMenu: {
    "& svg": {
      color: "#91999D",
    },
  },
  selected: {
    color: "#fff",
  },
}));

export default useStyles;
