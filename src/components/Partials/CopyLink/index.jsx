"use client";

import { makeStyles } from "tss-react/mui";
import { Button, ClickAwayListener, Tooltip } from "@mui/material";
import React, { useState } from "react";
import copyIcon from "../../../assets/icons/copy.svg";

const useStyles = makeStyles()((theme) => ({
  tooltip: {
    fontSize: "1.3rem",
  },
  button: {
    ...theme.typography.button,
    fontSize: "1.3rem",
    padding: ".6rem 2.5rem",
    fontWeight: 500,
    border: "1px solid #D9DBE1",
    color: "#14323F",
    marginLeft: "1.5rem",
    "&:hover": {
      backgroundColor: "#F0F7EF",
    },
    [theme.breakpoints.up(1279)]: {
      marginLeft: ".8rem",
    },
    [theme.breakpoints.down(480)]: {
      padding: ".6rem 1.2rem",
      fontSize: "1.1rem",
      marginBottom: "0rem",
      marginLeft: "1rem",
    },
  },
  buttonIcon: {
    width: "1.3rem",
    padding: 0,
    marginRight: "0.8rem",
  },
}));

const CopyLink = ({ location }) => {
  const { classes } = useStyles();

  const [copySuccess, setCopySuccess] = useState("");
  const [openCopyLink, setOpenCopyLink] = useState(false);

  const handleCopyUrl = (e) => {
    navigator.clipboard.writeText(location);
    setCopySuccess("Copied successfully!");
    setOpenCopyLink(true);
  };

  const handleTooltipClose = () => {
    setOpenCopyLink(false);
  };

  return (
    <ClickAwayListener onClickAway={handleTooltipClose}>
      <div>
        <Tooltip
          PopperProps={{
            disablePortal: true,
          }}
          onClose={handleTooltipClose}
          open={openCopyLink}
          placement="top"
          arrow
          leaveDelay={1500}
          title="Copied successfully!"
          classes={{ tooltip: classes.tooltip }}
        >
          <Button className={classes.button} onClick={() => handleCopyUrl()}>
            <img className={classes.buttonIcon} src={copyIcon} alt="Copy Link" width="13px" height="11px" />
            Copy Link
          </Button>
        </Tooltip>
      </div>
    </ClickAwayListener>
  );
};

export default CopyLink;
