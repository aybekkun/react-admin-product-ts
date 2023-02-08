import TextField, { TextFieldProps } from "@mui/material/TextField";
import React, { useState } from "react";
import { IMaskInput } from "react-imask";
import { ReactElement } from "react-imask/dist/mixin";

interface CustomProps {
  onChange: (event: { target: { name: string; value: string } }) => void;
  name: string;
}
const PhoneMaskCustom = React.forwardRef<ReactElement, CustomProps>(function PhoneMaskCustom(props, ref) {
  const { onChange, ...other } = props;
  return (
    <IMaskInput
      {...other}
      mask={"+{998} 00 000 00 00"}
      unmask={true}
      definitions={{
        "#": /[0-9]/,
      }}
      inputRef={ref}
      onAccept={(value: any) => onChange({ target: { name: props.name, value } })}
      overwrite
    />
  );
});
const MyPhoneInput = (props: TextFieldProps) => {
  return (
    <>
      <TextField {...props} size="small" placeholder="Phone" InputProps={{ inputComponent: PhoneMaskCustom as any }} />
    </>
  );
};

export default MyPhoneInput;
