import { createAsyncThunk } from "@reduxjs/toolkit";

import { $host, $authHost } from "../../api/axios";
type userAuthProps = {
  username: string;
  password: string;
};
export const userAuth = createAsyncThunk("auth/userAuth", async (params: userAuthProps, thunkAPI) => {
  try {
    const { username, password } = params;
    const res = await $host.post(`/auth/login`, { username, password });
    return res.data;
  } catch (error) {
    return thunkAPI.rejectWithValue("Ошибка " + error);
  }
});

export const userCheck = createAsyncThunk("auth/userCheck", async (_, thunkAPI) => {
  try {
    const res = await $authHost.get(`/auth/check`);
    return res.data;
  } catch (error) {
    return thunkAPI.rejectWithValue("Ошибка " + error);
  }
});
