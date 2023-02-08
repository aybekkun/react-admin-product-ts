import { IOrders } from "./types";
import { createAsyncThunk } from "@reduxjs/toolkit";

import { $authHost } from "../../api/axios";
import { Dayjs } from "dayjs";
export type fetchOrdersProps = {
  take?: number;
  page?: number;
  name?: string;
  phone?: string;
  from?: null | Dayjs | string;
  to?: null | Dayjs | string;
  signal?: AbortSignal;
};
export const fetchOrders = createAsyncThunk("orders/fetchorders", async (params: fetchOrdersProps, thunkAPI) => {
  try {
    const { data } = await $authHost.get<IOrders>(`/order`, {
      params: params,
      signal: params.signal,
    });
    return data;
  } catch (error) {
    return thunkAPI.rejectWithValue("Ошибка " + error);
  }
});

// export const createordersComment = createAsyncThunk("orders/createordersComment", async (data, thunkAPI) => {
//   try {
//     const { id, ...comment } = data;
//     await $authHost.patch(`/lead/${id}`, comment);
//   } catch (error) {
//     return thunkAPI.rejectWithValue("Ошибка " + error);
//   }
// });
