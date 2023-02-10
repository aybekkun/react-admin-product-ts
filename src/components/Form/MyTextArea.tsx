import React from "react";
import TextareaAutosize from "@mui/base/TextareaAutosize";
import TextField, { TextFieldProps } from "@mui/material/TextField";
import { ReactElement } from "react-imask/dist/mixin";
type MyTextAreaProps = {
  maxLength?: number;
  props: TextFieldProps;
};
interface CustomProps {
  onChange: (event: { target: { name: string; value: string } }) => void;
  name: string;
}
const TextAreaCustom = React.forwardRef<ReactElement, CustomProps>(function TextAreaCustom(props, ref) {
  return <TextareaAutosize style={{ resize: "none" }} {...props}></TextareaAutosize>;
});

const MyTextArea = (props: TextFieldProps & { maxLength: number }) => {
  return (
    <TextField
      size="small"
      {...props}
      sx={props.sx}
      label={props.label}
      fullWidth={props.fullWidth}
      inputProps={{ minRows: 4, maxLength: props.maxLength }}
      InputProps={{ inputComponent: TextAreaCustom as any }}
    />
  );
};
export default MyTextArea;
