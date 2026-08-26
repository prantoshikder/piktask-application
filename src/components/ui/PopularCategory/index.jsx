"use client";

import { Button } from "@mui/material";
import React from "react";
import { Link } from "@/lib/router";
import { getBaseURL } from "../../../helpers";
import useStyles from "./Category.styles";

const PopularCategory = ({ photo }) => {
  const { classes } = useStyles();

  return (
    <div className={classes.catItemWrapper}>
      <div className={classes.catItem}>
        <Link to={`category/${photo.slug}`}>
          <img
            className={classes.catImage}
            src={getBaseURL().bucket_base_url + getBaseURL().categories + photo?.thumbnail}
            alt={`${photo?.name}`}
            width="363px"
            height="240px"
          />
        </Link>
        <Button className={classes.catName} component={Link} to={`category/${photo.slug}`}>
          {photo?.name}
        </Button>
      </div>
    </div>
  );
};

export default PopularCategory;
