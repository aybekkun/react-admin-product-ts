import { createAsyncThunk } from "@reduxjs/toolkit";

import { $host, $authHost } from "../../api/axios";

export const fetchCourses = createAsyncThunk("publicForm/fetchCourses", async (_, thunkAPI) => {
  try {
    const res = await $host.get(`/course/all`);
    return res.data;
  } catch (error) {
    return thunkAPI.rejectWithValue("Ошибка " + error);
  }
});
type createOrderProps = {
  FIO: string;
  phone: string;
  courseId: number;
  real_status: number;
};
export const createOrder = createAsyncThunk("publicForm/createOrder", async (params: createOrderProps, thunkAPI) => {
  try {
    const res = await $host.post(`/order/create/public`, params);
    return res.data;
  } catch (error) {
    return thunkAPI.rejectWithValue("Ошибка " + error);
  }
});
