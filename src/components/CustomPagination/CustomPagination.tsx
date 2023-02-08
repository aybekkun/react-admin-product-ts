import { Pagination } from "@mui/material";
import React, { ChangeEvent } from "react";

type CustomPaginationProps = {
  onChangePage: (value: number) => void;
  total: number;
  currentPage: number;
};
const CustomPagination = ({ onChangePage, total = 0, currentPage = 1 }: CustomPaginationProps) => {
  const onChange = (event: ChangeEvent<unknown>, value: number) => {
    onChangePage(value);
  };
  return (
    <Pagination sx={{ pt: 1 }} count={Math.ceil(total / 10)} color="primary" page={currentPage} onChange={onChange} />
  );
};

export default CustomPagination;
