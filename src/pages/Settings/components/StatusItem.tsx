import React, { useEffect, useReducer } from "react";
import useAppSelector from "../../../hooks/useAppSelector.hook";
import useAppDispatch from "../../../hooks/useAppDispatch.hook";
import { createStatus, deleteStatus, editStatus, fetchStatus } from "../../../redux/status/asyncActions";
import CancelIcon from "@mui/icons-material/Cancel";
import TextField from "@mui/material/TextField";
import { Box, ListItem, ListItemIcon, ListItemText, Typography } from "@mui/material";
import List from "@mui/material/List";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import AddIcon from "@mui/icons-material/Add";
import useSimpleForm from "../../../hooks/useSimpleForm";
import { setStatusCount } from "../../../redux/status/slice";
type FormTypeCreateStatus = {
  statusName: string;
  id?: number;
};
const StatusItem = () => {
  const dispatch = useAppDispatch();
  const { data, count } = useAppSelector((state) => state.status);
  const {
    formData: statusData,
    handleInputChange: onChangeCreate,
    handleSubmit: onSubmitCreate,
    isSendingForm: isCreating,
  } = useSimpleForm<FormTypeCreateStatus>({ statusName: "" }, async () => {
    if (window.confirm("Is it correct")) {
      await dispatch(createStatus({ name: statusName }));
      dispatch(setStatusCount());
    }
  });
  const { statusName } = statusData;
  const [form, updateForm] = useReducer(
    (prev: any, next: any) => {
      return { ...prev, ...next };
    },
    { type: "create", statusEdit: "", statusId: 0 }
  );
  useEffect(() => {
    (async function () {
      await dispatch(fetchStatus());
    })();
  }, [count]);

  const onSubmitEdit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    await dispatch(editStatus({ id: form.statusId, name: form.statusEdit.trim() }));
    updateForm({ type: "create" });
    dispatch(setStatusCount());
  };

  const onDelete = async (id: number) => {
    if (window.confirm("Delete status?")) {
      await dispatch(deleteStatus({ id: id }));
      dispatch(setStatusCount());
    }
  };
  const onClickEdit = (name: string, id: number) => {
    updateForm({ type: "edit", statusEdit: name, statusId: id });
  };

  return (
    <>
      <Typography variant="h5" color="primary">
        User status
      </Typography>
      {form.type === "create" ? (
        <form onSubmit={onSubmitCreate}>
          <Box position={"relative"} display={"flex"}>
            <TextField
              name="statusName"
              inputProps={{ minLength: 3, maxLength: 30 }}
              value={statusName}
              onChange={onChangeCreate}
              size="small"
              fullWidth
              required
            />
            <IconButton disabled={isCreating} type="submit" sx={{ position: "absolute", right: 0 }} color="primary">
              <AddIcon />
            </IconButton>
          </Box>
        </form>
      ) : (
        <form onSubmit={onSubmitEdit}>
          <Box position={"relative"} display={"flex"}>
            <TextField
              inputProps={{ minLength: 3, maxLength: 30 }}
              value={form.statusEdit}
              onChange={(e) => updateForm({ statusEdit: e.target.value })}
              size="small"
              fullWidth
              required
            />
            <IconButton type="submit" sx={{ position: "absolute", right: "2rem" }} color="primary">
              <AddIcon />
            </IconButton>
            <IconButton
              onClick={() => updateForm({ type: "create" })}
              sx={{ position: "absolute", right: 0 }}
              color="primary"
            >
              <CancelIcon />
            </IconButton>
          </Box>
        </form>
      )}

      <Box sx={{ maxHeight: 250, overflow: "auto" }}>
        <List>
          {data.map((item) => (
            <ListItem key={item.id}>
              <ListItemText primary={item.name} />
              <ListItemIcon>
                {item.name !== "started" && item.name !== "ordered" && item.name !== "registred" && (
                  <>
                    <IconButton onClick={() => onClickEdit(item.name, item.id)}>
                      <EditIcon />
                    </IconButton>
                    <IconButton onClick={() => onDelete(item.id)} color="error">
                      <DeleteIcon />
                    </IconButton>
                  </>
                )}
              </ListItemIcon>
            </ListItem>
          ))}
        </List>
      </Box>
    </>
  );
};

export default StatusItem;
