import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { Token } from "../auth/interfaces/user-interface";
import { PROXY } from "../../consts";

interface UserRegisterTokenState {
  access_token: string | null;
  isAuthenticated: boolean;
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
}

const initialState: UserRegisterTokenState = {
  access_token: null,
  isAuthenticated: false,
  status: "idle",
  error: null,
};

const instance = axios.create({
  baseURL: PROXY,
});

export const register = createAsyncThunk(
  "auth/register",
  async (credentials: {
    email: string;
    password: string;
    firstName: string;
    lastName: string;
    address: string;
    phoneNumber: string;
  }) => {
    try {
      const response = await instance.post<Token>(
        "auth/register",
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

const registerSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(register.pending, (state) => {
        state.status = "loading";
        state.isAuthenticated = false;
        state.error = null;
      })
      .addCase(register.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.isAuthenticated = true;
        state.access_token = action.payload.access_token;

        sessionStorage.setItem("access_token", action.payload.access_token);
      })
      .addCase(register.rejected, (state, action) => {
        state.status = "failed";
        state.isAuthenticated = false;
        state.error = action.error.message || "Network error";

        sessionStorage.removeItem("access_token");
      });
  },
});

export default registerSlice.reducer;
