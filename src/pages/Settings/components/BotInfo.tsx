import React, { useEffect } from "react";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import useAppSelector from "../../../hooks/useAppSelector.hook";
import { useDispatch } from "react-redux";
import { deleteBot, fetchSetting } from "../../../redux/settings/asyncActions";
import useAppDispatch from "../../../hooks/useAppDispatch.hook";
import { Box, Button, Skeleton } from "@mui/material";
import dayjs from "dayjs";
const BotInfo = () => {
  const dispatch = useAppDispatch();
  const { isLoading, data, count } = useAppSelector((state) => state.settings);
  useEffect(() => {
    const controller = new AbortController();
    const signal = controller.signal;
    dispatch(fetchSetting({ signal }));
    return () => {
      controller.abort();
    };
  }, [count]);
  const onClickDelete = () => {
    if (window.confirm("Delete")) {
      dispatch(deleteBot());
    }
  };

  return (
    <>
      <Typography variant="h6" color={"primary"}>
        Bot info
      </Typography>
      <Typography color={"info"}>
        {isLoading && data.id === 0 ? <Skeleton variant="text" sx={{ fontSize: "1rem" }} /> : data.bot_username}
      </Typography>
      <Divider />
      <Typography variant="h6" color={"primary"}>
        Contact
      </Typography>
      <Typography color={"info"}>
        {isLoading && data.id === 0 ? <Skeleton variant="text" sx={{ fontSize: "1rem" }} /> : data.contact}
      </Typography>
      <Divider />
      <Typography variant="h6" color={"primary"}>
        Date
      </Typography>
      <Typography color={"info"}>
        {isLoading && data.id === 0 ? (
          <Skeleton variant="text" sx={{ fontSize: "1rem" }} />
        ) : (
          dayjs(data.createdAt).format("DD-MM-YYYY")
        )}
      </Typography>
      <Divider />
      <Box display={"flex"} justifyContent="flex-end">
        <Button onClick={onClickDelete} size="small" color="error">
          Delete
        </Button>
      </Box>
    </>
  );
};

export default BotInfo;
