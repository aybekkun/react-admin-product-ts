import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import dayjs, { Dayjs } from "dayjs";

export interface ISearchParamsState {
  searchParams: {
    name: string;
    phone: string;
    from: null | Dayjs | string;
    to: null | Dayjs | string;
  };
}
const initialState: ISearchParamsState = {
  searchParams: {
    name: "",
    phone: "",
    from: null,
    to: null,
  },
};

export const searchParamsSlice = createSlice({
  name: "searchParams",
  initialState,
  reducers: {
    setSearchParamsName(state, action) {
      state.searchParams.name = action.payload;
    },
    setSearchParamsPhone(state, action) {
      state.searchParams.phone = action.payload;
    },
    setSearchParamsFrom(state, action: PayloadAction<Dayjs | null>) {
      state.searchParams.from = action.payload ? dayjs(action.payload).format("YYYY-MM-DD") : null;
    },
    setSearchParamsTo(state, action: PayloadAction<Dayjs | null>) {
      state.searchParams.to = action.payload ? dayjs(action.payload).format("YYYY-MM-DD") : null;
    },
    setSearchParamsClean(state) {
      state.searchParams = {
        name: "",
        phone: "",
        from: null,
        to: null,
      };
    },
  },
  //   extraReducers: (builder) => {},
});

// Action creators are generated for each case reducer function
export const {
  setSearchParamsName,
  setSearchParamsPhone,
  setSearchParamsFrom,
  setSearchParamsTo,
  setSearchParamsClean,
} = searchParamsSlice.actions;

export default searchParamsSlice.reducer;
