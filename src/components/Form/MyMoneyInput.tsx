import TextField, { TextFieldProps } from "@mui/material/TextField";
import React, { useState } from "react";
import { IMaskInput } from "react-imask";
import { ReactElement } from "react-imask/dist/mixin";

interface CustomProps {
  onChange: (event: { target: { name: string; value: string } }) => void;
  name: string;
}
const MoneyMaskCustom = React.forwardRef<ReactElement, CustomProps>(function PhoneMaskCustom(props, ref) {
  const { onChange, ...other } = props;
  return (
    <IMaskInput
      {...other}
      mask={Number}
      thousandsSeparator={" "}
      mapToRadix={["."]}
      unmask={true}
      min={0}
      max={999_999_999_999}
      inputRef={ref}
      onAccept={(value: any) => onChange({ target: { name: props.name, value } })}
      overwrite
    />
  );
});
const MyMoneyInput = (props: TextFieldProps) => {
  return (
    <>
      <TextField {...props} size="small" placeholder="" InputProps={{ inputComponent: MoneyMaskCustom as any }} />
    </>
  );
};

export default MyMoneyInput;
