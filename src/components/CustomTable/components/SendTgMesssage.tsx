import GetAppIcon from "@mui/icons-material/GetApp";
import TelegramIcon from "@mui/icons-material/Telegram";
import { Typography } from "@mui/material";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import Paper from "@mui/material/Paper";
import Popover from "@mui/material/Popover";
import { Stack } from "@mui/system";
import React, { useState } from "react";
import useAppDispatch from "../../../hooks/useAppDispatch.hook";
import useHandleFile from "../../../hooks/useHandleFile.hook";
import { createSendMessage } from "../../../redux/settings/asyncActions";
import MyTextArea from "../../Form/MyTextArea";

type SendTgMesssageProps = {
  userId?: string;
};
const SendTgMesssage = ({ userId }: SendTgMesssageProps) => {
  const dispatch = useAppDispatch();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const { file, handleFile, handleClearFile } = useHandleFile();
  const [message, setMessage] = useState("");
  const [isSending, setIsSending] = useState(false);
  const handleClick = (event: any) => {
    //@ts-ignore
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
    setMessage("");
    handleClearFile();
    setIsSending(false);
  };
  const open = Boolean(anchorEl);

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSending(true);
    const fd = new FormData();
    if (userId) {
      fd.append("user_id", userId);
    }
    fd.append("message", message);
    if (file) {
      fd.append("file", file);
    }
    await dispatch(createSendMessage(fd));
    handleClose();
  };
  return (
    <>
      <IconButton onClick={handleClick} color="primary" size="small">
        <TelegramIcon />
      </IconButton>
      <Popover
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "top",
          horizontal: "left",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
      >
        <Box component={Paper} p={2} width={"15rem"}>
          <form onSubmit={onSubmit}>
            <Stack alignItems={"flex-start"} spacing={2}>
              <Typography variant="h5" color="primary">
                Send
              </Typography>
              <MyTextArea
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                maxLength={500}
                fullWidth
                required
              />
              <Stack
                sx={{ width: "100%" }}
                display={"flex"}
                direction={"row"}
                justifyContent={"space-between"}
                spacing={3}
              >
                <IconButton component="label" color="primary">
                  <input type="file" hidden onChange={handleFile} accept="image/*" />
                  <GetAppIcon />
                </IconButton>
                <Button disabled={isSending} variant="contained" size="small" type="submit">
                  Send
                </Button>
              </Stack>
            </Stack>
          </form>
        </Box>
      </Popover>
    </>
  );
};

export default SendTgMesssage;
