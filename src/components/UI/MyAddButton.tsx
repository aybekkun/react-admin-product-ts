import { Button, ButtonProps } from "@mui/material";
import React from "react";
import AddIcon from "@mui/icons-material/Add";
const MyAddButton = ({ children, ...props }: ButtonProps) => {
  return (
    <Button sx={{mb:1}} variant="contained" size="small" startIcon={<AddIcon />} {...props}>
      Add
    </Button>
  );
};

export default MyAddButton;
