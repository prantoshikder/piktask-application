"use client";

import { Button, CircularProgress, TextField } from "@/components/ui-kit";
import React, { ChangeEvent, FC, MouseEvent } from "react";

type inputProps = {
  type?: string;
  label?: string;
  name?: string;
  length?: string;
  variant?: any;
  placeholder?: string | any;
  disabled?: boolean;
  others?: object;
  value: string | number;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
};
export const InputField: FC<inputProps> = (props) => {
  const {
    type,
    label,
    name,
    length,
    variant,
    placeholder,
    disabled,
    value,
    onChange,
    others,
  } = props;

  const defaultVariant = variant ? variant : "outlined";
  const fieldLength = length ? length : "fullWidth";

  return (
    <TextField
      type={type}
      label={label}
      name={name}
      placeholder={placeholder || label}
      variant={defaultVariant}
      style={{ ...others }}
      fullWidth
      className="mb-[2rem] [&_.ant-input]:p-[15px_14px]"
      value={value}
      onChange={onChange}
      disabled={disabled}
    />
  );
};

type ButtonProps = {
  text: string;
  disabledBtn?: boolean;
  isLoading?: boolean;
  styles?: object;
  onClick?: (e: MouseEvent<HTMLButtonElement>) => void;
};
export const CustomBtn: FC<ButtonProps> = (props) => {
  const { disabledBtn, isLoading, text, onClick, styles, ...rest } = props;

  return (
    <>
      <Button
        type="submit"
        size="medium"
        variant="contained"
        fullWidth
        className="bg-[#0088f2] p-[6px_16px] text-[#fff] text-[1.6rem] hover:bg-[#0773c5]"
        disableRipple
        onClick={onClick}
        style={{ ...styles }}
        disabled={isLoading || disabledBtn}
        {...rest}
      >
        {text}
      </Button>
      {isLoading && <CircularProgress size={24} />}
    </>
  );
};
