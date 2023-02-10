import { ILeads } from "./types";
import { createAsyncThunk } from "@reduxjs/toolkit";

import { $authHost } from "../../api/axios";
import { Dayjs } from "dayjs";
export type fetchLeadsProps = {
  take?: number;
  page?: number;
  name?: string;
  phone?: string;
  from?: null | Dayjs | string;
  to?: null | Dayjs | string;
  signal?: AbortSignal;
};
export const fetchLeads = createAsyncThunk("leads/fetchLeads", async (params: fetchLeadsProps, thunkAPI) => {
  try {
    const { data } = await $authHost.get<ILeads>(`/lead`, {
      params: params,
      signal: params.signal,
    });
    return data;
  } catch (error) {
    return thunkAPI.rejectWithValue("Ошибка " + error);
  }
});

type createLeadProps = {
  FIO?: string;
  phone?: string;
  courseId?: number;
  real_status?: number;
  instrument?: string;
};

export const createLead = createAsyncThunk("leads/createLead", async (params: createLeadProps, thunkAPI) => {
  try {
    const { data } = await $authHost.post(`/lead`, params);
    return data;
  } catch (error) {
    return thunkAPI.rejectWithValue("Ошибка " + error);
  }
});

type createLeadsCommentProps = {
  id: number;
  comment: string;
};

export const createLeadsComment = createAsyncThunk(
  "leads/createLeadsComment",
  async (params: createLeadsCommentProps, thunkAPI) => {
    try {
      const { id, ...comment } = params;
      const { data } = await $authHost.patch(`/lead/${id}`, comment);
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue("Ошибка " + error);
    }
  }
);

type editUserStatusProps = {
  id: number;
  real_status: number;
};

export const editUserStatus = createAsyncThunk(
  "leads/createLeadsComment",
  async (params: editUserStatusProps, thunkAPI) => {
    try {
      const { data } = await $authHost.patch(`/lead/${params.id}`, { real_status: params.real_status });
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue("Ошибка " + error);
    }
  }
);
