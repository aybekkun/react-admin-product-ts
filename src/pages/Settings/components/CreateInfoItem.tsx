import Divider from "@mui/material/Divider";
import Typography from "@mui/material/Typography";
import MyTextArea from "../../../components/Form/MyTextArea";
import MyAddButton from "../../../components/UI/MyAddButton";
import useAppDispatch from "../../../hooks/useAppDispatch.hook";
import useSimpleForm from "../../../hooks/useSimpleForm";
import { createBot, createContactInfo } from "../../../redux/settings/asyncActions";
import { setSettingsCount } from "../../../redux/settings/slice";
type FormType = {
  contact: string;
};
const CreateInfoItem = () => {
  const dispatch = useAppDispatch();

  const { formData, handleInputChange, handleSubmit, isSendingForm } = useSimpleForm<FormType>(
    { contact: "" },
    async () => {
      if (window.confirm("Is it correct")) {
        await dispatch(createContactInfo({ contact: contact }));
        dispatch(setSettingsCount());
      }
    }
  );
  const { contact } = formData;
  return (
    <>
      <Typography variant="h6" color={"primary"}>
        Description
      </Typography>
      <Typography color={"info"}>About bot</Typography>
      <Divider />
      <form onSubmit={handleSubmit}>
        <MyTextArea
          name="contact"
          value={contact}
          onChange={handleInputChange}
          sx={{ resize: "none" }}
          maxLength={300}
          fullWidth
        />
        <MyAddButton type="submit" disabled={isSendingForm} sx={{ mt: 1 }} />
      </form>
    </>
  );
};

export default CreateInfoItem;
