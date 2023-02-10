import { Button, ButtonProps } from "@mui/material";
import React from "react";
import AddIcon from "@mui/icons-material/Add";
import { useTranslation } from "react-i18next";
const MyAddButton = ({ children, ...props }: ButtonProps) => {
  const { t } = useTranslation();
  return (
    <Button sx={{ mb: 1 }} variant="contained" size="small" startIcon={<AddIcon />} {...props}>
      {t("add")}
    </Button>
  );
};

export default MyAddButton;
