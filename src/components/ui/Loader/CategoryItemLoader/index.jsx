"use client";

import React from "react";
import { Box, Grid } from "@mui/material";
import { Skeleton } from "@mui/material";
import useStyles from "./CategoryItemLoader.style";

const CategoryItemLoader = () => {
    const { classes } = useStyles();
    return (
    <Grid container wrap="nowrap">
      {Array(4).fill()
        .map((item, index) => (
          <Box className={classes.boxRoot} width={360} my={5} key={index}>
            <Skeleton variant="rect" width={360} height={250} />
            <Box pt={0.5}>
              <Skeleton className={classes.title} />
            </Box>
          </Box>
        ))}
    </Grid>
    );
};

export default CategoryItemLoader;