import Divider from "@mui/material/Divider";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import { useState } from "react";
import MyAddButton from "../../../components/UI/MyAddButton";
import useAppDispatch from "../../../hooks/useAppDispatch.hook";
import useSimpleForm from "../../../hooks/useSimpleForm";
import { createBot } from "../../../redux/settings/asyncActions";
import { setSettingsCount } from "../../../redux/settings/slice";
type FormType = {
  bot_token: string;
};
const CreateBot = () => {
  const dispatch = useAppDispatch();

  const { formData, handleInputChange, handleSubmit, isSendingForm } = useSimpleForm<FormType>(
    { bot_token: "" },
    async () => {
      if (window.confirm("Is it correct")) {
        await dispatch(createBot({ bot_token: bot_token }));
        dispatch(setSettingsCount());
      }
    }
  );
  const { bot_token } = formData;
  return (
    <>
      <Typography variant="h6" component={"p"} color={"primary"}>
        Create bot
      </Typography>
      <Typography component={"p"} color={"info"}>
        Insert token
      </Typography>

      <form onSubmit={handleSubmit}>
        <TextField name="bot_token" value={bot_token} onChange={handleInputChange} size="small" fullWidth required />
        <MyAddButton disabled={isSendingForm} type="submit" sx={{ mt: 1 }} />
      </form>
    </>
  );
};

export default CreateBot;
