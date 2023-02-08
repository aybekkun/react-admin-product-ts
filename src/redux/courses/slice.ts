import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { deleteCourse, fetchCourses } from "./asyncActions";
import { ICourses, ICoursesState } from "./types";

const initialState: ICoursesState = {
  data: [],
  total: 0,
  currentPage: 1,
  isLoading: false,
  count: 0,
};

export const coursesSlice = createSlice({
  name: "courses",
  initialState,
  reducers: {
    setCoursesPage(state, action: PayloadAction<number>) {
      state.currentPage = action.payload;
    },
    setCoursesCount(state) {
      state.count++;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchCourses.fulfilled, (state, action: PayloadAction<ICourses>) => {
      state.isLoading = false;
      state.data = action.payload.data;
      state.total = action.payload.total;
    });
    builder.addCase(fetchCourses.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(fetchCourses.rejected, (state) => {
      state.isLoading = false;
      state.data = [];
      state.total = 0;
    });
    builder.addCase(deleteCourse.fulfilled, (state) => {
      state.count++;
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
export const { setCoursesPage, setCoursesCount } = coursesSlice.actions;

export default coursesSlice.reducer;
