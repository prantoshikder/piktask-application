"use client";

import React from "react";
import { Box, Grid } from "@/components/ui-kit";
import { Skeleton } from "@/components/ui-kit";

const CategoryItemLoader = () => {
    return (
    <Grid container wrap="nowrap">
      {Array(4).fill()
        .map((item, index) => (
          <Box className="m-[2rem_1.5rem_0rem_0rem]" width={360} my={5} key={index}>
            <Skeleton variant="rect" width={360} height={250} />
            <Box pt={0.5}>
              <Skeleton className="h-[3rem] w-[360px] mb-[3rem]" />
            </Box>
          </Box>
        ))}
    </Grid>
    );
};

export default CategoryItemLoader;