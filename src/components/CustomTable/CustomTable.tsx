import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { IColumns } from "../../@types/columns.type";
import TableLoading from "./components/TableLoading";

type CustomTableProps<T> = {
  columns: IColumns<T>[];
  source: T[];
  currentPage?: number;
  loading?: boolean;
};
const CustomTable = <T extends {}>({ source, columns, currentPage = 1, loading = false }: CustomTableProps<T>) => {
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>№</TableCell>
            {columns.map((column, i: number) => (
              <TableCell key={i}>{column.title}</TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {!loading ? (
            source.map((row: T, i: number) => (
              <TableRow key={i} sx={{ "&:last-child td, &:last-child th": { border: 0 } }}>
                <TableCell>{(currentPage - 1) * 10 + i + 1}</TableCell>
                {columns.map((column: any, i) => (
                  <TableCell key={i}>
                    {column.render
                      ? column.render(row[`${column.dataIndex}` as keyof T], row)
                      : row[`${column.dataIndex}` as keyof T]}
                  </TableCell>
                ))}
              </TableRow>
            ))
          ) : (
            <TableLoading span={columns.length + 1} />
          )}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default CustomTable;
