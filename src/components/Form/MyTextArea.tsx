import React from "react";
import TextareaAutosize from "@mui/base/TextareaAutosize";
import TextField, { TextFieldProps } from "@mui/material/TextField";
type MyTextAreaProps = {
  maxLength?: number;
  props: TextFieldProps;
};
const MyTextArea = (props: TextFieldProps & { maxLength: number }) => {
  return (
    <TextField
      size="small"
      {...props}
      sx={props.sx}
      label={props.label}
      fullWidth={props.fullWidth}
      inputProps={{ minRows: 4, maxLength: props.maxLength }}
      InputProps={{ inputComponent: TextareaAutosize }}
    />
  );
};

export default MyTextArea;
