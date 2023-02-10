import { SelectChangeEvent } from "@mui/material";
import React from "react";

const useSimpleForm = <T extends {}>(initialState: T, onSubmit: (args: T) => void) => {
  const [formData, setFormData] = React.useState<T>(initialState);
  const [isSendingForm, setTsSendingForm] = React.useState(false);
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement> | SelectChangeEvent) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setTsSendingForm(true);
    await onSubmit?.(formData);
    setTsSendingForm(false);
    setFormData(initialState);
  };

  return { formData, handleInputChange, handleSubmit, isSendingForm };
};

export default useSimpleForm;
