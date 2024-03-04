import axios, { InternalAxiosRequestConfig } from "axios";
import { UsersTable } from "./interfaces/get-user-interface";
import { PROXY } from "../../consts";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState: UsersTable = {
  users: [],
  status: "idle",
  error: null,
};

const instance = axios.create({
  baseURL: PROXY,
});

instance.interceptors.request.use(
  async (config: InternalAxiosRequestConfig) => {
    const token = sessionStorage.getItem("access_token");

    if (token) {
      config.headers.Authorization = token;
    }

    return config;
  },
  (error) => {
    if (axios.isAxiosError(error)) {
      if (error.status === 401) {
        return Promise.reject(error.response?.data);
      }
    } else {
      Promise.reject("Error occured, try again later");
    }
  }
);

export const getUserTable = createAsyncThunk("user/list", async () => {
  const response = await instance.get("user/list");

  return response.data;
});

const getUserTableSlice = createSlice({
  name: "User table",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getUserTable.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(getUserTable.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.users = action.payload;
      })
      .addCase(getUserTable.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message || "Network error";
        state.users = [];
      });
  },
});

export default getUserTableSlice.reducer;
