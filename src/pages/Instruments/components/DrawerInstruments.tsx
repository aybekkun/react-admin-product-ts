import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import React, { FormEvent, useReducer, useState } from "react";
import MyMoneyInput from "../../../components/Form/MyMoneyInput";
import MyTextArea from "../../../components/Form/MyTextArea";
import MyAddButton from "../../../components/UI/MyAddButton";
import useAppDispatch from "../../../hooks/useAppDispatch.hook";
import useSimpleForm from "../../../hooks/useSimpleForm";
import { createInstruments } from "../../../redux/instruments/asyncActions";
import { setInstrumentsCount } from "../../../redux/instruments/slice";

type DrawerInstrumentsProps = {
  open: boolean;
  onClose: () => void;
  onFetch?: () => void;
  children?: React.ReactNode;
};
type FormType = {
  name: string;
  price: string;
  type: "Web" | "Telegram Bot";
};
type ReducerType = { type: string; name: string; description: string };
const DrawerInstruments = ({ onClose, open }: DrawerInstrumentsProps) => {
  const dispatch = useAppDispatch();
  const { formData, handleInputChange, handleSubmit, isSendingForm } = useSimpleForm<FormType>(
    { name: "", price: "", type: "Web" },
    async () => {
      await dispatch(createInstruments({ name: name, price: Number(price), type: type }));
      dispatch(setInstrumentsCount());
      onClose();
      //  console.log({ name: name, price: Number(price), type: type })
    }
  );
  const { name, price, type } = formData;

  return (
    <Drawer open={open} sx={{ zIndex: 100 }} anchor="right" onClose={onClose}>
      <Box p={2} width={300}>
        <Typography variant="h5" mb={2} color="primary">
          Instruments
        </Typography>
        <form onSubmit={handleSubmit}>
          <TextField
            name="name"
            value={name}
            onChange={handleInputChange}
            size="small"
            sx={{ mb: 2 }}
            fullWidth
            inputProps={{ maxLength: 200 }}
            label="Instruments name"
            required
          />
          <MyMoneyInput name="price" label={"Price"} value={price} onChange={handleInputChange} fullWidth required />
          {/* @ts-ignore */}
          <Select name="type" value={type} onChange={handleInputChange} sx={{ my: 2 }} fullWidth size="small" required>
            <MenuItem value={"Web"}>Web</MenuItem>
            <MenuItem value={"Telegram Bot"}>Telegram bot</MenuItem>
          </Select>
          <MyAddButton disabled={isSendingForm} type="submit" />
        </form>
      </Box>
    </Drawer>
  );
};

export default DrawerInstruments;
