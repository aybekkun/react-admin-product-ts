import { configureStore } from "@reduxjs/toolkit";
import leads from "./leads/slice";
import orders from "./orders/slice";
import courses from "./courses/slice";
import searchParams from "./searchParams/slice";
import instruments from "./instruments/slice";
import settings from "./settings/slice";
export const store = configureStore({
  reducer: {
    leads,
    orders,
    courses,
    searchParams,
    instruments,
    settings,
  },
});

export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
