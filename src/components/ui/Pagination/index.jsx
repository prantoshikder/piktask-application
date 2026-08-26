"use client";

import { Button } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useHistory } from "@/lib/router";
import Spacing from "../../Spacing";
import useStyles from "./Pagination.style";

const Pagination = (props) => {
  const { classes } = useStyles();
  const history = useHistory();
  const { pageCount, setPageCount, count, locationPath, productPagination } = props;
  const [selected, setSelected] = useState(false);

  useEffect(() => {
    if (pageCount === 1) {
      setSelected(pageCount);
    } else {
      setSelected(pageCount);
    }

    if (productPagination) return;

    if (pageCount) {
      history.push(`${locationPath}?page=${pageCount}`);
    } else {
      history.push(`${locationPath}`);
    }
  }, [pageCount, count, history, locationPath, productPagination]);

  const handlePreviousBtn = () => {
    window.scrollTo(0, 0);
    if (productPagination) {
      if (pageCount <= 1) {
        setPageCount(pageCount);
      } else {
        setPageCount(pageCount - 1);
      }
    } else {
      if (pageCount <= 1) {
        setPageCount(pageCount);
      } else {
        setPageCount(pageCount - 1);
        history.push(`${locationPath}?page=${pageCount}`);
      }
    }
  };

  const handleNextBtn = () => {
    window.scrollTo(0, 0);
    if (productPagination) {
      setPageCount(pageCount + 1);
    } else {
      setPageCount(pageCount + 1);
      history.push(`${locationPath}?page=${pageCount}`);
    }
  };

  return (
    <>
      <Spacing space={{ height: "3rem" }} />
      <div className={classes.pagination}>
        <Button
          onClick={handlePreviousBtn}
          disabled={selected === 1 ? true : false}
          className={selected === 1 ? `${classes.disablePreviousButton}` : `${classes.prevButton}`}
        >
          Previous
        </Button>
        <div>
          <span>
            {pageCount} / {count}
          </span>
        </div>
        <Button
          onClick={handleNextBtn}
          disabled={selected === count ? true : false}
          className={selected === count ? `${classes.disableNextButton}` : `${classes.nextButton}`}
        >
          Next
        </Button>
      </div>
    </>
  );
};

export default Pagination;
