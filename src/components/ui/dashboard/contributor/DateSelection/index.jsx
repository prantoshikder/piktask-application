"use client";

import { Button, FormControl, Select, Typography } from "@mui/material";
import moment from "moment";
import React, { useState } from "react";
import useStyles from "./DateSelection.style";

const DateSelection = (props) => {
  const { classes } = useStyles();
  const { setSearchInput, earningManagementBtn } = props;

  const fromMonths = moment.months();
  let [fromYear, setFromYear] = useState(moment().year());
  let [fromMonth, setFromMonth] = useState(moment().format("MMMM"));
  let [fromCurrentDate, setFromCurrentDate] = useState("01");

  // To
  const toMonths = moment.months();
  let [toYear, setToYear] = useState(moment().year());
  let [toMonth, setToMonth] = useState(moment().format("MMMM"));
  // let [toCurrentDate, setToCurrentDate] = useState("01");
  let [toCurrentDate, setToCurrentDate] = useState(moment().date());

  const getAllDays = () => {
    const days = [];
    for (let i = 0; i < moment().daysInMonth(); i++) {
      if (i + 1 < 10) {
        days.push("0" + (i + 1));
      } else {
        days.push(i + 1);
      }
    }
    return days;
  };

  const getAllYears = () => {
    const years = [];
    for (let i = 1990; i <= moment().year(); i++) {
      years.push(i);
    }
    return years.sort((a, b) => b - a);
  };

  const handleDateSubmit = (e) => {
    e.preventDefault();
    setSearchInput("");

    let fromDateMonths = moment().month(fromMonth).format("M");
    if (fromDateMonths < 10) {
      fromDateMonths = "0" + fromDateMonths;
    }
    const fromDate = fromYear + "-" + fromDateMonths + "-" + fromCurrentDate;

    let toDateMonths = moment().month(toMonth).format("M");
    if (toDateMonths < 10) {
      toDateMonths = "0" + toDateMonths;
    }
    const toDate = fromYear + "-" + toDateMonths + "-" + toCurrentDate;

    setSearchInput((prevState) => ({ ...prevState, firstDay: fromDate, toDays: toDate }));
  };

  return (
    <div className={classes.dateRanges}>
      <div className={classes.statisticsFormWrapper}>
        <div className={classes.selectPeriodFrom}>
          <div className={classes.fields}>
            <Typography className={classes.fieldTitle} variant="subtitle1">
              From
            </Typography>
            <FormControl variant="outlined" className={classes.formControl}>
              {/* <InputLabel htmlFor="months" >Months</InputLabel> */}
              <Select
                native
                value={fromMonth}
                onChange={(e) => setFromMonth(e.target.value)}
                inputProps={{
                  // name: 'age',
                  id: "months",
                }}
              >
                {fromMonths?.length > 0 &&
                  fromMonths?.map((month, index) => (
                    <option key={month} value={month}>
                      {month}
                    </option>
                  ))}
              </Select>
            </FormControl>
            <FormControl variant="outlined" className={classes.formControl}>
              {/* <InputLabel htmlFor="months" >Months</InputLabel> */}
              <Select
                native
                value={fromCurrentDate}
                onChange={(e) => setFromCurrentDate(e.target.value)}
                inputProps={{
                  id: "date",
                }}
              >
                {getAllDays().map((day) => (
                  <option key={day} value={day}>
                    {day}
                  </option>
                ))}
              </Select>
            </FormControl>
            <FormControl variant="outlined" className={classes.formControl}>
              {/* <InputLabel htmlFor="months" >Months</InputLabel> */}
              <Select
                native
                value={fromYear}
                onChange={(e) => setFromYear(e.target.value)}
                inputProps={{
                  id: "year",
                }}
              >
                {getAllYears().map((year) => (
                  <option key={year} value={year}>
                    {year}
                  </option>
                ))}
              </Select>
            </FormControl>
          </div>
          <div className={classes.fields}>
            <Typography className={classes.fieldTitle} variant="subtitle1">
              To
            </Typography>
            <FormControl variant="outlined" className={classes.formControl}>
              {/* <InputLabel htmlFor="months" >Months</InputLabel> */}
              <Select
                native
                value={toMonth}
                onChange={(e) => setToMonth(e.target.value)}
                inputProps={{
                  // name: 'age',
                  id: "months",
                }}
              >
                {toMonths?.length > 0 &&
                  toMonths?.map((month, index) => (
                    <option key={month} value={month}>
                      {month}
                    </option>
                  ))}
              </Select>
            </FormControl>
            <FormControl variant="outlined" className={classes.formControl}>
              {/* <InputLabel htmlFor="months" >Months</InputLabel> */}
              <Select
                native
                value={toCurrentDate}
                onChange={(e) => setToCurrentDate(e.target.value)}
                inputProps={{
                  id: "date",
                }}
              >
                {getAllDays().map((day) => (
                  <option key={day} value={day}>
                    {day}
                  </option>
                ))}
              </Select>
            </FormControl>
            <FormControl variant="outlined" className={classes.formControl}>
              {/* <InputLabel htmlFor="months" >Months</InputLabel> */}
              <Select
                native
                value={toYear}
                onChange={(e) => setToYear(e.target.value)}
                inputProps={{
                  id: "year",
                }}
              >
                {getAllYears().map((year) => (
                  <option key={year} value={year}>
                    {year}
                  </option>
                ))}
              </Select>
            </FormControl>
          </div>

          <Button onClick={handleDateSubmit} className={classes.showMoreBtn}>
            {earningManagementBtn ? "Display Statistics" : "View More"}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default DateSelection;
