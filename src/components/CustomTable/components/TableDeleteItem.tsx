import { ButtonProps, IconButton, IconButtonProps } from "@mui/material";
import React from "react";
import DeleteIcon from "@mui/icons-material/Delete";
import { IconButtonTypeMap } from "@mui/material/IconButton";
import { useDispatch } from "react-redux";
type TableDeleteItemProps = {
  id?: number;
};

const TableDeleteItem = ({ id = 0, ...props }: TableDeleteItemProps | IconButtonProps) => {
  const dispatch = useDispatch();
  return (
    <IconButton {...props}>
      <DeleteIcon />
    </IconButton>
  );
};

export default TableDeleteItem;
