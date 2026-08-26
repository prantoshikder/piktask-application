"use client";

import React from "react";
import { Link, useHistory } from "@/lib/router";
import { getBaseURL } from "./../../../../helpers/index";
import useStyles from "./SearchItem.styles";

const SearchItem = ({ item, selected }) => {
  const { classes } = useStyles();
  const history = useHistory();

  const handleEnterPress = (event) => {
    event.preventDefault();
    if (selected) {
      selected?.forEach((element) => {
        if (event.keyCode === 13 && item?.image_id === selected?.image_id) {
          history.push(
            "/category" +
              encodeURI(
                `/${selected?.category.toLowerCase().trim().replace(/\s/g, "-")}/${selected?.title.toLowerCase().trim().replace(/\s/g, "-")}&id=${
                  selected?.image_id
                }`
              )
          );
        }
      });
    }
  };

  function pikTaskEncodeURI(data) {
    if (data) {
      return (
        "/category" +
        encodeURI(`/${data?.category.toLowerCase().trim().replace(/\s/g, "-")}/${data?.title.toLowerCase().trim().replace(/\s/g, "-")}&id=${data?.image_id}`)
      );
    }
  }

  return (
    <Link to={encodeURI(pikTaskEncodeURI(item))} className={classes.searchItemWrapper}>
      <div className={classes.searchLeft} onKeyPress={handleEnterPress}>
        <div className={classes.thumbnail}>
          <img src={encodeURI(getBaseURL().bucket_base_url + getBaseURL().images + item?.preview)} alt={item?.title} />
        </div>
        <h2>{item?.title}</h2>
      </div>
    </Link>
  );
};

export default SearchItem;
