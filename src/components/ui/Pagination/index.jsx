"use client";

import { Button } from "@/components/ui-kit";
import React, { useEffect, useState } from "react";
import { useHistory } from "@/lib/router";
import Spacing from "../../Spacing";

const Pagination = (props) => {
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
      <div className="flex justify-center items-center [&_button:hover]:bg-[#0773c5] [&_button:hover]:text-[#fff]">
        <Button
          onClick={handlePreviousBtn}
          disabled={selected === 1 ? true : false}
          className={selected === 1 ? `p-[0.6rem_4rem] [border:2px_solid_#0088f2] text-[#0088f2] rounded-[0.2rem] mr-[1rem]` : `p-[0.7rem_4rem] bg-[#0088f2] text-[#fff] rounded-[0.2rem] mr-[1rem]`}
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
          className={selected === count ? `p-[0.5rem_6rem] [border:2px_solid_#0088f2] text-[#0088f2] rounded-[0.2rem] ml-[1rem]` : `p-[0.7rem_6rem] bg-[#0088f2] text-[#fff] rounded-[0.2rem] ml-[1rem]`}
        >
          Next
        </Button>
      </div>
    </>
  );
};

export default Pagination;
