import { createSlice } from "@reduxjs/toolkit";
import { userAuth, userCheck } from "./asyncActions";
import { IAuthState } from "./types";
const initialState: IAuthState = {
  accessToken: "",
  isAuth: false,
  isLoading: false,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout(state) {
      state.isAuth = false;
      state.accessToken = "";
      window.localStorage.clear();
    },
  },
  extraReducers: (builder) => {
    builder.addCase(userAuth.fulfilled, (state, action) => {
      state.accessToken = action.payload.accessToken;
      state.isAuth = true;
      window.localStorage.setItem("token", action.payload.accessToken);
      state.isLoading = false;
    });
    builder.addCase(userAuth.pending, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(userAuth.rejected, (state, action) => {
      state.isAuth = false;
      state.isLoading = false;
      window.localStorage.removeItem("token");
    });
    builder.addCase(userCheck.fulfilled, (state, action) => {
      state.isAuth = true;
    });
    builder.addCase(userCheck.rejected, (state, action) => {
      state.isAuth = false;
      window.localStorage.clear();
    });
  },
});

// Action creators are generated for each case reducer function
export const { logout } = authSlice.actions;

export default authSlice.reducer;
