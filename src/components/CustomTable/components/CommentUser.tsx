import React from "react";
import GetAppIcon from "@mui/icons-material/GetApp";
import TelegramIcon from "@mui/icons-material/Telegram";
import { Typography } from "@mui/material";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import Paper from "@mui/material/Paper";
import Popover from "@mui/material/Popover";
import { Stack } from "@mui/system";
import MyTextArea from "../../Form/MyTextArea";
import ChatBubbleOutlineIcon from "@mui/icons-material/ChatBubbleOutline";
import { useTranslation } from "react-i18next";
import useSimpleForm from "../../../hooks/useSimpleForm";
import useAppDispatch from "../../../hooks/useAppDispatch.hook";
import { createLeadsComment } from "../../../redux/leads/asyncActions";
type CommentUserProps = {
  id: number;
  fetch: () => void;
};
const CommentUser = ({ id, fetch = () => undefined }: CommentUserProps) => {
  const dispatch = useAppDispatch();
  const { t } = useTranslation();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const handleClick = (event: any) => {
    //@ts-ignore
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const { formData, handleInputChange, handleSubmit, isSendingForm } = useSimpleForm({ comment: "" }, async () => {
    await dispatch(createLeadsComment({ id: id, comment: comment }));
    fetch();
    handleClose();
  });
  const { comment } = formData;
  const open = Boolean(anchorEl);

  return (
    <>
      <IconButton onClick={handleClick} color="primary" size="small">
        <ChatBubbleOutlineIcon />
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
          <form onSubmit={handleSubmit}>
            <Stack alignItems={"flex-start"} spacing={2}>
              <Typography variant="h5" color="primary">
                {t("comment")}
              </Typography>
              <MyTextArea required value={comment} onChange={handleInputChange} name="comment" maxLength={200} />
              <Button type="submit" disabled={isSendingForm} size="small" variant="contained">
                Comment
              </Button>
            </Stack>
          </form>
        </Box>
      </Popover>
    </>
  );
};

export default CommentUser;
