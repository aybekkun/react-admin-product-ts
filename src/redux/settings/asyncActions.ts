import { ISettingsData } from "./types";
import { createAsyncThunk } from "@reduxjs/toolkit";

import { $authHost } from "../../api/axios";

export const fetchSetting = createAsyncThunk(
  "settings/fetchSetting",
  async (signal: { signal?: AbortSignal }, thunkAPI) => {
    try {
      const { data } = await $authHost.get<ISettingsData>(`/setting`, {
        signal: signal.signal,
      });
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue("Ошибка " + error);
    }
  }
);
type createContactInfoProps = {
  contact: string;
};

export const createContactInfo = createAsyncThunk(
  "settings/createContactInfo",
  async (params: createContactInfoProps, thunkAPI) => {
    try {
      const { data } = await $authHost.patch(`/setting`, params);
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue("Ошибка " + error);
    }
  }
);

type createBotProps = {
  bot_token: string;
};

export const createBot = createAsyncThunk("settings/createBot", async (params: createBotProps, thunkAPI) => {
  try {
    const { data } = await $authHost.post(`/setting`, params);
    return data;
  } catch (error) {
    return thunkAPI.rejectWithValue("Ошибка " + error);
  }
});

export const deleteBot = createAsyncThunk("settings/deleteBot", async (_, thunkAPI) => {
  try {
    const { data } = await $authHost.delete(`/setting`);
    return data;
  } catch (error) {
    return thunkAPI.rejectWithValue("Ошибка " + error);
  }
});

export const createSendMessage = createAsyncThunk("settings/createSendMessage", async (fd: FormData, thunkAPI) => {
  try {
    const { data } = await $authHost.post(`/setting/sendMessage`, fd);
    return data;
  } catch (error) {
    return thunkAPI.rejectWithValue("Ошибка " + error);
  }
});
