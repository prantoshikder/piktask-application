"use client";

import { List } from "@/components/ui-kit";
import React from "react";

const SocialShare = (props) => {
  const { socials, copyRightSocial, width = "20px", height = "20px" } = props;

  return (
    <div className={copyRightSocial ? `flex` : `flex justify-center items-center`}>
      <List className="flex justify-center [align-content:center]">
        {socials?.length > 0 &&
          socials?.map((media, index) => (
            <div key={index}>
              {media.socialUrl && (
                <a key={index} href={media.socialUrl} target="_blank" rel="noreferrer">
                  <img
                    className={copyRightSocial ? `w-[2.8rem] ml-[1rem]` : `w-[2rem] ml-[1rem] flex justify-center [align-content:center]`}
                    src={media.socialIcon}
                    alt={media.socialUrl}
                    width={width}
                    height={height}
                  />
                </a>
              )}
            </div>
          ))}
      </List>
    </div>
  );
};

export default SocialShare;
