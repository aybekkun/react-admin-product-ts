import { IStatus } from "./types";
import { createAsyncThunk } from "@reduxjs/toolkit";

import { $authHost } from "../../api/axios";

export const fetchStatus = createAsyncThunk("status/fetchStatus", async (_, thunkAPI) => {
  try {
    const { data } = await $authHost.get<IStatus>(`/status`);
    return data;
  } catch (error) {
    return thunkAPI.rejectWithValue("Ошибка " + error);
  }
});
type createStatusProps = {
  name: string;
};
export const createStatus = createAsyncThunk("status/createStatus", async (params:createStatusProps, thunkAPI) => {
  try {
    const { data } = await $authHost.post(`/status`, params);
    return data;
  } catch (error) {
    return thunkAPI.rejectWithValue("Ошибка " + error);
  }
});

type deleteStatusProps = {
  id: number;
};

export const deleteStatus = createAsyncThunk("status/deleteStatus", async (params: deleteStatusProps, thunkAPI) => {
  try {
    const { data } = await $authHost.delete(`/status/${params.id}`);
    return data;
  } catch (error) {
    return thunkAPI.rejectWithValue("Ошибка " + error);
  }
});

type editStatusProps = {
  id: number;
  name: string;
};

export const editStatus = createAsyncThunk("status/editStatus", async (params: editStatusProps, thunkAPI) => {
  try {
    const { data } = await $authHost.patch(`/status/${params.id}`, { name: params.name });
    return data;
  } catch (error) {
    return thunkAPI.rejectWithValue("Ошибка " + error);
  }
});
