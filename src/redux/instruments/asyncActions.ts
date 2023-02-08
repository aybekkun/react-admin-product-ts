import { IInstruments } from "./types";
import { createAsyncThunk } from "@reduxjs/toolkit";

import { $authHost, $host } from "../../api/axios";

export type fetchInstrumentsProps = {
  page?: number;
  tale?: number;
  signal?: AbortSignal;
};

export const fetchInstruments = createAsyncThunk(
  "instruments/fetchInstruments",
  async (params: fetchInstrumentsProps, thunkAPI) => {
    try {
      const { data } = await $authHost.get<IInstruments>(`/instrument`, {
        params: params,
        signal: params.signal,
      });
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue("Ошибка " + error);
    }
  }
);

export type createInstrumentsProps = {
  name: string;
  price: number;
  type: string;
};

export const createInstruments = createAsyncThunk(
  "instruments/createInstruments",
  async (params: createInstrumentsProps, thunkAPI) => {
    try {
      const { data } = await $authHost.post(`/instrument`, params);
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue("Ошибка " + error);
    }
  }
);
