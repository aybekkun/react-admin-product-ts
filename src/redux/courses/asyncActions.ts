import { ICourses } from "./types";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { $authHost } from "../../api/axios";

export type fetchCoursesProps = {
  take?: number;
  page?: number;
  name?: string;
  signal?: AbortSignal;
};
export const fetchCourses = createAsyncThunk("courses/fetchCourses", async (params: fetchCoursesProps, thunkAPI) => {
  try {
    const { data } = await $authHost.get<ICourses>(`/course`, {
      params: params,
      signal: params.signal,
    });
    return data;
  } catch (error) {
    return thunkAPI.rejectWithValue("Ошибка " + error);
  }
});

export type createCourseProps = {
  name: string;
  description: string;
};

export const createCourse = createAsyncThunk("course/createCourse", async (params: createCourseProps, thunkAPI) => {
  try {
    const { data } = await $authHost.post(`course`, params);
    return data;
  } catch (error) {
    return thunkAPI.rejectWithValue("Ошибка " + error);
  }
});

export type deleteCourseProps = {
  id: number;
};

export const deleteCourse = createAsyncThunk("course/deleteCourse", async (params: deleteCourseProps, thunkAPI) => {
  try {
    const { data } = await $authHost.delete(`course/${params.id}`);
    return data;
  } catch (error) {
    return thunkAPI.rejectWithValue("Ошибка " + error);
  }
});

// export const createcoursesComment = createAsyncThunk("courses/createcoursesComment", async (data, thunkAPI) => {
//   try {
//     const { id, ...comment } = data;
//     await $authHost.patch(`/lead/${id}`, comment);
//   } catch (error) {
//     return thunkAPI.rejectWithValue("Ошибка " + error);
//   }
// });
