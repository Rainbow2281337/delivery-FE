import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { Token } from "./interfaces/user-interface";
import { PROXY } from "../../consts";

interface UserAuthTokenState {
  access_token: string | null;
  isAuthenticated: boolean;
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
}

const initialState: UserAuthTokenState = {
  access_token: null,
  isAuthenticated: false,
  status: "idle",
  error: null,
};

const instance = axios.create({
  baseURL: PROXY,
});

export const login = createAsyncThunk(
  "auth/login",
  async (credentials: { email: string; password: string }) => {
    try {
      const response = await instance.post<Token>(
        "auth/login",
        JSON.stringify(credentials),
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      return response.data;
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      if (
        error.response &&
        error.response.status >= 400 &&
        error.response.status < 500
      ) {
        throw new Error(error.response?.data.message);
      } else {
        return error.response?.data.message || "Network error";
      }
    }
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => {
        state.status = "loading";
        state.isAuthenticated = false;
        state.error = null;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.isAuthenticated = true;
        state.access_token = action.payload.access_token;

        if (state.access_token) {
          sessionStorage.setItem("access_token", action.payload.access_token);
        } else {
          state.error = action.payload;
        }
      })
      .addCase(login.rejected, (state, action) => {
        state.status = "failed";
        state.isAuthenticated = false;
        state.error = action.error.message || "Network error";

        sessionStorage.removeItem("access_token");
      });
  },
});

export default authSlice.reducer;
