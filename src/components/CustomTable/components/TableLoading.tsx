import React from "react";
import TableCell from "@mui/material/TableCell";
import TableRow from "@mui/material/TableRow";

import Grid from "@mui/material/Grid";
import CircularProgress from "@mui/material/CircularProgress";
type TableLoadingProps = {
  span: number;
};
const TableLoading = ({ span }: TableLoadingProps) => {
  return (
    <TableRow>
      <TableCell colSpan={span}>
        <Grid container justifyContent={"center"} alignItems="center" sx={{ p: 5 }}>
          <CircularProgress />
        </Grid>
      </TableCell>
    </TableRow>
  );
};

export default TableLoading;
