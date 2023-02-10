import { MenuItem, MenuProps, Select, Stack, TextField } from "@mui/material";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button/Button";
import Drawer from "@mui/material/Drawer";
import Typography from "@mui/material/Typography";
import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import MyPhoneInput from "../../../components/Form/MyPhoneInput";
import useAppDispatch from "../../../hooks/useAppDispatch.hook";
import useAppSelector from "../../../hooks/useAppSelector.hook";
import useSimpleForm from "../../../hooks/useSimpleForm";
import { fetchInstruments } from "../../../redux/instruments/asyncActions";
import { createLead } from "../../../redux/leads/asyncActions";
import { setLeadsCount } from "../../../redux/leads/slice";
import { fetchCourses } from "../../../redux/publicForm/asyncActions";
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
type DrawerLeadsProps = {
  open: boolean;
  onClose: () => void;
};
type FormType = {
  fio: string;
  phone: string;
  courseId: string;
};
const DrawerLeads = ({ open, onClose }: DrawerLeadsProps) => {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const { courses } = useAppSelector((state) => state.publicForm);
  const { data: status } = useAppSelector((state) => state.status);
  const { data: instruments } = useAppSelector((state) => state.instruments);

  useEffect(() => {
    (async function () {
      await dispatch(fetchCourses());
      await dispatch(fetchInstruments({}));
    })();
  }, []);
  const { formData, handleInputChange, handleSubmit, isSendingForm } = useSimpleForm<FormType>(
    { fio: "", phone: "", courseId: "0" },
    async () => {
      if (status && instruments) {
        await dispatch(
          createLead({
            FIO: fio,
            phone: phone.split(" ").join(""),
            courseId: Number(courseId),
            real_status: status.find((item) => item.name.toLowerCase() === "ordered")?.id,
            instrument: instruments.find((item) => item.name.toLowerCase() === "office")?.code,
          })
        );
        dispatch(setLeadsCount());
        onClose();
      }
    }
  );
  const { fio, phone, courseId } = formData;
  return (
    <Drawer open={open} sx={{ zIndex: 100 }} anchor="right" onClose={onClose}>
      <Box p={2} width={300}>
        <Typography variant="h5" mb={2} color="primary">
          {t("leads")}
        </Typography>
        <form onSubmit={handleSubmit}>
          <Stack direction={"column"} spacing={2}>
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
            <Button disabled={isSendingForm} type="submit">
              {t("add")}
            </Button>
          </Stack>
        </form>
      </Box>
    </Drawer>
  );
};

export default DrawerLeads;
