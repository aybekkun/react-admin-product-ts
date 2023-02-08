import { Button, ButtonProps } from "@mui/material";
import React from "react";

const MyButton = ({ children, ...props }: ButtonProps) => {
  return <Button {...props}>{children}</Button>;
};

export default MyButton;
