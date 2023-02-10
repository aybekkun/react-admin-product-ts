import { createSlice } from "@reduxjs/toolkit";
import { createOrder, fetchCourses } from "./asyncActions";
import { IPublicFormState } from "./types";
const initialState: IPublicFormState = {
  courses: [
    {
      id: 0,
      name: "Loading",
    },
  ],
  isLoading: false,
  isSending: false,
};

export const publicForm = createSlice({
  name: "publicForm",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchCourses.fulfilled, (state, action) => {
      state.isLoading = false;
      state.courses = action.payload;
    });
    builder.addCase(fetchCourses.pending, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(fetchCourses.rejected, (state, action) => {
      state.isLoading = false;
    });
    builder.addCase(createOrder.fulfilled, (state, action) => {
      state.isSending = false;
    });
    builder.addCase(createOrder.pending, (state, action) => {
      state.isSending = true;
    });
    builder.addCase(createOrder.rejected, (state, action) => {
      state.isSending = false;
    });
  },
});

// Action creators are generated for each case reducer function
// export const { logout } = publicForm.actions;

export default publicForm.reducer;
