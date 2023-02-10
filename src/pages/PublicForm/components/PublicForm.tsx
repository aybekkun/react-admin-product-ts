import { MenuItem, MenuProps, Select, Stack, TextField, Typography } from "@mui/material";
import Button from "@mui/material/Button/Button";
import Skeleton from "@mui/material/Skeleton/Skeleton";
import React, { useEffect } from "react";
import MyPhoneInput from "../../../components/Form/MyPhoneInput";
import useAppDispatch from "../../../hooks/useAppDispatch.hook";
import useAppSelector from "../../../hooks/useAppSelector.hook";
import useSimpleForm from "../../../hooks/useSimpleForm";
import { createOrder, fetchCourses } from "../../../redux/publicForm/asyncActions";
import { fetchStatus } from "../../../redux/status/asyncActions";
const MenuPropsStyle: Partial<MenuProps> = {
  autoFocus: false,
  //OverflowX: "scroll",
  PaperProps: {
    style: {
      //maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      maxHeight: 300,
      overflowY: "scroll",
    },
  },
};
type FormType = {
  fio: string;
  phone: string;
  courseId: string;
};
const PublicForm = () => {
  const dispatch = useAppDispatch();
  const { courses, isLoading, isSending } = useAppSelector((state) => state.publicForm);
  const { data: status } = useAppSelector((state) => state.status);
  const orderedId = status.find((item) => item.name === "ordered")?.id;
  const { formData, handleInputChange, handleSubmit, isSendingForm } = useSimpleForm<FormType>(
    { fio: "", phone: "", courseId: "0" },
    async () => {
      await dispatch(
        createOrder({
          FIO: fio.trim(),
          phone: phone,
          courseId: Number(courseId),
          real_status: orderedId ? orderedId : 0,
        })
      );
    }
  );
  const { fio, phone, courseId } = formData;
  useEffect(() => {
    dispatch(fetchCourses());
    dispatch(fetchStatus());
  }, []);
  if (isLoading) {
    return <Skeleton width={"100%"} height={"15rem"} />;
  }
  return (
    <>
      <form onSubmit={handleSubmit}>
        <Stack direction={"column"} spacing={2}>
          <Typography variant="h4" color={"primary"} textAlign="center">
            Форма
          </Typography>
          <TextField value={fio} name="fio" onChange={handleInputChange} size="small" required fullWidth />
          <MyPhoneInput value={phone} name="phone" onChange={handleInputChange} size="small" required />
          <Select
            value={courseId !== "0" ? courseId : ""}
            name="courseId"
            onChange={handleInputChange}
            MenuProps={{ ...MenuPropsStyle }}
            required
            fullWidth
            size="small"
          >
            {courses.map((item, i) => (
              <MenuItem key={i} value={item.id}>
                {item.name}
              </MenuItem>
            ))}
          </Select>
          <Button disabled={isSending} type="submit">
            Отправить
          </Button>
        </Stack>
      </form>
    </>
  );
};

/* value={form.courseId}
        onChange={(e) => updateForm({ courseId: e.target.value })} */

export default PublicForm;
