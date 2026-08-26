"use client";

import { Button, FormControl, Select, Typography } from "@/components/ui-kit";
import moment from "moment";
import React, { useState } from "react";

const DateSelection = (props) => {
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
    <div className="p-[2rem] mb-[2rem] bg-[#fff] shadow-[0_8px_12px_3px_rgb(0_0_0_/_6%)]">
      <div className="pb-[1rem]">
        <div className="flex items-center flex-wrap max-[990px]:flex-col max-[990px]:items-start">
          <div className="mr-[1.8rem] max-[960px]:mb-[1.8rem]">
            <Typography className="text-[1.4rem] text-[#4D4D4D] mb-[.2rem]" variant="subtitle1">
              From
            </Typography>
            <FormControl variant="outlined" className="mr-[1.5rem] [&_select]:pt-[1.3rem] [&_select]:pb-[1.3rem] [&_select]:bg-[#fff] [&_fieldset]:border-[#E0E0E0]">
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
            <FormControl variant="outlined" className="mr-[1.5rem] [&_select]:pt-[1.3rem] [&_select]:pb-[1.3rem] [&_select]:bg-[#fff] [&_fieldset]:border-[#E0E0E0]">
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
            <FormControl variant="outlined" className="mr-[1.5rem] [&_select]:pt-[1.3rem] [&_select]:pb-[1.3rem] [&_select]:bg-[#fff] [&_fieldset]:border-[#E0E0E0]">
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
          <div className="mr-[1.8rem] max-[960px]:mb-[1.8rem]">
            <Typography className="text-[1.4rem] text-[#4D4D4D] mb-[.2rem]" variant="subtitle1">
              To
            </Typography>
            <FormControl variant="outlined" className="mr-[1.5rem] [&_select]:pt-[1.3rem] [&_select]:pb-[1.3rem] [&_select]:bg-[#fff] [&_fieldset]:border-[#E0E0E0]">
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
            <FormControl variant="outlined" className="mr-[1.5rem] [&_select]:pt-[1.3rem] [&_select]:pb-[1.3rem] [&_select]:bg-[#fff] [&_fieldset]:border-[#E0E0E0]">
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
            <FormControl variant="outlined" className="mr-[1.5rem] [&_select]:pt-[1.3rem] [&_select]:pb-[1.3rem] [&_select]:bg-[#fff] [&_fieldset]:border-[#E0E0E0]">
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

          <Button onClick={handleDateSubmit} className="p-[0.6rem_1.5rem] bg-[#0088f2] text-[#fff] mt-[2.5rem] [border:.2rem_solid] border-[#0088f2] [transition:all_0.3s_linear] hover:bg-[#0773c5] hover:border-[#0773c5] hover:text-[#fff]">
            {earningManagementBtn ? "Display Statistics" : "View More"}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default DateSelection;
