import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { fetchLeads } from "./asyncActions";
import { ILeads, ILeadsState } from "./types";

const initialState: ILeadsState = {
  data: [],
  total: 0,
  currentPage: 1,
  isLoading: false,
  count: 0,
  isSendingComment: false,
};

export const leadsSlice = createSlice({
  name: "leads",
  initialState,
  reducers: {
    setLeadPage(state, action: PayloadAction<number>) {
      state.currentPage = action.payload;
    },
    setLeadsCount(state) {
      state.count++;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchLeads.fulfilled, (state, action: PayloadAction<ILeads>) => {
      state.isLoading = false;
      state.data = action.payload.data;
      state.total = action.payload.total;
    });
    builder.addCase(fetchLeads.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(fetchLeads.rejected, (state) => {
      state.isLoading = false;
      state.data = [];
      state.total = 0;
    });
    // builder.addCase(createLeadsComment.fulfilled, (state, action) => {
    //   state.isSendingComment = false;
    // });
    // builder.addCase(createLeadsComment.pending, (state) => {
    //   state.isSendingComment = true;
    // });
    // builder.addCase(createLeadsComment.rejected, (state) => {
    //   state.isSendingComment = false;
    // });
  },
});

// Action creators are generated for each case reducer function
export const { setLeadPage, setLeadsCount } = leadsSlice.actions;

export default leadsSlice.reducer;
