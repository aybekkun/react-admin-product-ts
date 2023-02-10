import { IconButton } from "@mui/material";
import React, { useState, useEffect } from "react";
import AddIcon from "@mui/icons-material/Add";
import { useSelector } from "react-redux";
import useAppSelector from "../../../hooks/useAppSelector.hook";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import useAppDispatch from "../../../hooks/useAppDispatch.hook";
import { setLeadsCount } from "../../../redux/leads/slice";
import { editUserStatus } from "../../../redux/leads/asyncActions";
type ChangeStatusUserProps = {
  userId: number;
  status: {
    id: number;
    name: string;
  };
};
const ChangeStatusUser = ({ status, userId }: ChangeStatusUserProps) => {
  const dispatch = useAppDispatch();
  const [value, setValue] = useState(``);
  useEffect(() => {
    setValue(String(status.id));
    return () => {
      setValue("");
    };
  }, [status.id]);

  const { data } = useAppSelector((state) => state.status);
  const handleChange = async (event: SelectChangeEvent) => {
    setValue(event.target.value);
    await dispatch(editUserStatus({ id: userId, real_status: Number(event.target.value) }));
    dispatch(setLeadsCount());
  };
  return (
    <Select
      onChange={handleChange}
      value={value}
      defaultValue={String(status.id)}
      size="small"
      sx={{ minWidth: 120, fontSize: "12px" }}
    >
      {data.map((item) => (
        <MenuItem key={item.id} value={item.id}>
          {item.name}
        </MenuItem>
      ))}
    </Select>
  );
};

export default ChangeStatusUser;
