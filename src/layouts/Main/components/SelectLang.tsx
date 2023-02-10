import { MenuItem, Select, SelectChangeEvent } from "@mui/material";
import React from "react";
import { useTranslation } from "react-i18next";

const SelectLang = () => {
  const [value, setValue] = React.useState("ru");
  const { t, i18n } = useTranslation();
  React.useEffect(() => {
    if (window.localStorage.getItem("lang")) {
      setValue(window.localStorage.getItem("lang") as string);
    }
  }, []);
  const handleChange = (event: SelectChangeEvent) => {
    setValue(event.target.value as string);
    console.log(event.target.value);
    i18n.changeLanguage(event.target.value);
    window.localStorage.setItem("lang", event.target.value);
  };
  return (
    <Select defaultValue={value} value={value} onChange={handleChange} size="small">
      <MenuItem value="ru">ru</MenuItem>
      <MenuItem value="en">en</MenuItem>
    </Select>
  );
};

export default SelectLang;
