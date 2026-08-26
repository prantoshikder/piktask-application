"use client";

import { Button, Grid, Typography } from "@/components/ui-kit";
import React from "react";
import { Link } from "@/lib/router";

const TagButtons = ({ allTags }) => {
  return (
    <>
      <Grid container>
        <Grid className="flex-wrap items-center mt-[4.5rem] mb-[2.8rem]">
          <Typography className="text-[2.2rem] mb-[2rem] max-[959.95px]:w-[100%] max-[959.95px]:mb-[1.5rem]" variant="h3">
            Related tags
          </Typography>
          <div>
            {allTags?.map((tag, index) => (
              <Button
                className="text-[#143340] font-[400] font-['Roboto',sans-serif] capitalize text-[1.4rem] rounded-[3rem] opacity-[1] leading-[1.75] bg-[#F8F8F8] [border:1px_solid_rgb(150_164_173_/_54%)] p-[0.4rem_2.5rem] no-underline m-[0.2rem_0rem] [&:not(last-child)]:mr-[1.2rem] hover:no-underline max-[959.95px]:pr-[3.2rem] max-[959.95px]:pl-[3.2rem] max-[959.95px]:mb-[1.5rem] max-[959.95px]:w-[auto] max-[959.95px]:text-[1.5rem]"
                key={index}
                tag={tag}
                component={Link}
                to={`/tag/${tag.toLowerCase().trim().replace(/\s/g , "-")}`}
              >
                {tag}
              </Button>
            ))}
          </div>
        </Grid>
      </Grid>
    </>
  );
};

export default TagButtons;
