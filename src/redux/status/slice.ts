import { createSlice } from "@reduxjs/toolkit";
import { createStatus, fetchStatus } from "./asyncActions";
import { IStatusState } from "./types";

const initialState: IStatusState = {
  data: [],
  isLoading: false,
  count: 0,
  isSendingStatus: false,
  currentPage: 1,
};

export const statusSlice = createSlice({
  name: "status",
  initialState,
  reducers: {
    setStatusPage(state, action) {
      state.currentPage = action.payload;
    },
    setStatusCount(state) {
      state.count++;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchStatus.fulfilled, (state, action) => {
      state.isLoading = false;
      state.data = action.payload.data;
    });
    builder.addCase(fetchStatus.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(fetchStatus.rejected, (state) => {
      state.isLoading = false;
      state.data = [];
    });
    builder.addCase(createStatus.fulfilled, (state, action) => {
      state.isSendingStatus = false;
    });
    builder.addCase(createStatus.pending, (state) => {
      state.isSendingStatus = true;
    });
    builder.addCase(createStatus.rejected, (state) => {
      state.isSendingStatus = false;
    });
  },
});

// Action creators are generated for each case reducer function
export const { setStatusPage, setStatusCount } = statusSlice.actions;

export default statusSlice.reducer;
