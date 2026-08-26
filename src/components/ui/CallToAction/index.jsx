"use client";

import { Button, Container, Typography } from "@/components/ui-kit";
import mobileCallToAction from "../../../assets/banner/call-to-actionMobile.jpg";
import tabletCallToAction from "../../../assets/banner/call-to-actionTablet.jpg";
import callToAction from "../../../assets/banner/call-to-action.jpg";
import React, { useState } from "react";
import { Link } from "@/lib/router";
import SignUpModal from "../../../views/Authentication/SignUpModal";

const CallToAction = (props) => {
  const {title, subtitle, buttonText, buttonLink, buttonClicked, uppercase, contributorJoinNow,} = props;
  const [openAuthModal, setOpenAuthModal] = useState(false);
  const [role, setRole] = useState("");

  const handleClick = (e) => {
    setRole(e.currentTarget.value)
    setOpenAuthModal(true)
  }

  return (
    <div className={"bg-[#1b3f4e] bg-no-repeat bg-cover [background-position:center_center] relative text-center before:content-[\"\"] before:absolute before:top-[0] before:left-[0] before:w-[100%] before:h-[100%] before:bg-[rgba(0,28,48,0.4)] bg-[image:var(--cta-d)] max-[768.95px]:bg-[image:var(--cta-t)] max-[575.95px]:bg-[image:var(--cta-m)]"} style={{ "--cta-d": `url(${callToAction.src})`, "--cta-t": `url(${tabletCallToAction.src})`, "--cta-m": `url(${mobileCallToAction.src})` }}>
      <Container className="relative p-[2.5rem_0rem] max-[576px]:pr-[3rem] max-[576px]:pl-[3rem]">
        <Typography className="text-[#fff] text-[3rem] mb-[.8rem] max-[768px]:text-[3rem] max-[576px]:text-[2.5rem]" variant="h2">
          {title}
        </Typography>
        <Typography className="text-[#fff] text-[1.5rem] font-[500] mb-[2rem] max-[576px]:text-[1.5rem]" variant="body1">
          {subtitle}
        </Typography>

        {contributorJoinNow ? (
          <Button
            className="text-[#fff] font-[500] font-['Roboto',sans-serif] capitalize text-[1.3rem] rounded-[3rem] opacity-[1] leading-[1.75] bg-[#0088f2] p-[0.5rem_1.5rem] no-underline [border:2px_solid] border-[#0088f2] [transition:all_0.3s_linear] inline-block hover:bg-[#143340] hover:border-[#0088f2] max-[768px]:p-[.8rem_3.5rem]"
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
            className="text-[#fff] font-[500] font-['Roboto',sans-serif] capitalize text-[1.3rem] rounded-[3rem] opacity-[1] leading-[1.75] bg-[#0088f2] p-[0.5rem_1.5rem] no-underline [border:2px_solid] border-[#0088f2] [transition:all_0.3s_linear] inline-block hover:bg-[#143340] hover:border-[#0088f2] max-[768px]:p-[.8rem_3.5rem]"
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
