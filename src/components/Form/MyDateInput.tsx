import { TextField } from "@mui/material";
import { DesktopDatePicker } from "@mui/x-date-pickers";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import React from "react";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { Dayjs } from "dayjs";

type MyDateInputProps = {
  label: string;
  value: Dayjs | null;
  onChangeValue: (val: Dayjs | null) => void;
};

const MyDateInput = ({ label, value, onChangeValue }: MyDateInputProps) => {
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DatePicker
        label={label}
        value={value}
        inputFormat="DD-MM-YYYY"
        onChange={(newValue) => onChangeValue(newValue)}
        renderInput={(params) => <TextField size="small" {...params} />}
      />
    </LocalizationProvider>
  );
};

export default MyDateInput;
