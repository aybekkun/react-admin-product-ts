import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import React, { FormEvent, useReducer, useState } from "react";
import MyTextArea from "../../../components/Form/MyTextArea";
import MyAddButton from "../../../components/UI/MyAddButton";
import useAppDispatch from "../../../hooks/useAppDispatch.hook";
import { createCourse } from "../../../redux/courses/asyncActions";
type DrawerCoursesProps = {
  open: boolean;
  onClose: () => void;
  onFetch: () => void;
  children?: React.ReactNode;
};
type ReducerType = { type: string; name: string; description: string };
const DrawerCourses = ({ onClose, open, onFetch }: DrawerCoursesProps) => {
  const dispatch = useAppDispatch();
  const [isSend, setIsSend] = useState(false);
  const [form, updateForm] = useReducer(
    (prev: any, next: any) => {
      return { ...prev, ...next };
    },
    { type: "create", name: "", description: "" }
  );
  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSend(true);
    await dispatch(createCourse({ name: form.name.trim(), description: form.description.trim() }));
    setIsSend(false);
    onFetch();
  };

  return (
    <Drawer open={open} sx={{ zIndex: 100 }} anchor="right" onClose={onClose}>
      <Box p={2} width={300}>
        <Typography variant="h5" mb={2} color="primary">
          Course
        </Typography>
        <form onSubmit={onSubmit}>
          <TextField
            value={form.name}
            onChange={(e) => updateForm({ name: e.target.value })}
            size="small"
            sx={{ mb: 2 }}
            fullWidth
            inputProps={{ maxLength: 200 }}
            label="Course name"
            required
          />
          <MyTextArea
            maxLength={200}
            value={form.description}
            onChange={(e) => updateForm({ description: e.target.value })}
            size="small"
            sx={{ mb: 2 }}
            fullWidth
            label="Course description"
            required
          />
          <MyAddButton disabled={isSend} type="submit" />
        </form>
      </Box>
    </Drawer>
  );
};

export default DrawerCourses;
