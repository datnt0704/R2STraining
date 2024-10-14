import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { fetchJson } from "../api";
import { LOGOUT } from "../actions";

const BASE_URL = "http://localhost:5000";

export const login = createAsyncThunk(
  "login",
  async (userInfor: { username: string; password: string }) => {
    const authInfor = await fetchJson(BASE_URL + "/auth");
    console.log("authInfor", authInfor);
    return authInfor;
  }
);

const initialState = {
  isLoggedIn: false,
  loading: "idle",
  error: "",
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder.addCase(LOGOUT, (state, action) => {
      state.isLoggedIn = false;
    });
    builder.addCase(login.fulfilled, (state, action: any) => {
      console.log("state", state);
      console.log("action", action);
      const formUserInfor = action.meta.arg;
      const authInfor = action.payload;
      if (
        formUserInfor.username === authInfor.username &&
        formUserInfor.password === authInfor.password
      ) {
        state.isLoggedIn = true;
      } else {
        state.isLoggedIn = false;
        state.error = "username or password is not correct";
      }
    });
    builder.addCase(login.rejected, (state, action) => {
      state.isLoggedIn = false;
    });
  },
});

export const authReducer = authSlice.reducer;
