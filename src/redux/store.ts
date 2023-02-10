import { configureStore } from "@reduxjs/toolkit";
import { persistStore, persistReducer, FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER } from "redux-persist";
import storage from "redux-persist/lib/storage";
import auth from "./auth/slice";
import leads from "./leads/slice";
import orders from "./orders/slice";
import courses from "./courses/slice";
import searchParams from "./searchParams/slice";
import instruments from "./instruments/slice";
import settings from "./settings/slice";
import status from "./status/slice";
import publicForm from "./publicForm/slice";
const persistConfig = {
  key: "root",
  version: 1,
  storage,
};
const authReducer = persistReducer(persistConfig, auth);
const store = configureStore({
  reducer: {
    auth: authReducer,
    leads,
    orders,
    courses,
    searchParams,
    instruments,
    settings,
    status,
    publicForm,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export let persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
export default store;
