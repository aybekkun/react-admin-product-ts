import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { fetchOrders } from "./asyncActions";
import { IOrders, IOrdersState } from "./types";

const initialState: IOrdersState = {
  data: [],
  total: 0,
  currentPage: 1,
  isLoading: false,
  count: 0,
  isSendingComment: false,
};

export const ordersSlice = createSlice({
  name: "orders",
  initialState,
  reducers: {
    setOrdersPage(state, action: PayloadAction<number>) {
      state.currentPage = action.payload;
    },
    setOrdersCount(state) {
      state.count++;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchOrders.fulfilled, (state, action: PayloadAction<IOrders>) => {
      state.isLoading = false;
      state.data = action.payload.data;
      state.total = action.payload.total;
    });
    builder.addCase(fetchOrders.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(fetchOrders.rejected, (state) => {
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
export const { setOrdersPage, setOrdersCount } = ordersSlice.actions;

export default ordersSlice.reducer;
