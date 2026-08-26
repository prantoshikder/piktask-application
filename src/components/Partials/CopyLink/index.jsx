"use client";

import { Button, ClickAwayListener, Tooltip } from "@/components/ui-kit";
import React, { useState } from "react";
import copyIcon from "../../../assets/icons/copy.svg";



const CopyLink = ({ location }) => {
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
          classes={{ tooltip: "text-[1.3rem]" }}
        >
          <Button className="text-[#14323F] font-[500] font-['Roboto',sans-serif] capitalize text-[1.3rem] rounded-[3rem] opacity-[1] leading-[1.75] p-[.6rem_2.5rem] [border:1px_solid_#D9DBE1] ml-[1.5rem] hover:bg-[#F0F7EF] min-[1279px]:ml-[.8rem] max-[479.95px]:p-[.6rem_1.2rem] max-[479.95px]:text-[1.1rem] max-[479.95px]:mb-[0rem] max-[479.95px]:ml-[1rem]" onClick={() => handleCopyUrl()}>
            <img className="w-[1.3rem] p-[0] mr-[0.8rem]" src={copyIcon.src} alt="Copy Link" width="13px" height="11px" />
            Copy Link
          </Button>
        </Tooltip>
      </div>
    </ClickAwayListener>
  );
};

export default CopyLink;
