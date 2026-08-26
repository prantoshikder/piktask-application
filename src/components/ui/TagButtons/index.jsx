"use client";

import { Button, Grid, Typography } from "@mui/material";
import React from "react";
import { Link } from "@/lib/router";
import useStyles from "./TagButtons.styles";

const TagButtons = ({ allTags }) => {
  const { classes } = useStyles();

  return (
    <>
      <Grid container>
        <Grid className={classes.tagsContainer}>
          <Typography className={classes.tagTitle} variant="h3">
            Related tags
          </Typography>
          <div>
            {allTags?.map((tag, index) => (
              <Button
                className={classes.tagButton}
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
