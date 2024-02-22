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

export const register = createAsyncThunk(
  "auth/login",
  async (
    credentials: { email: string; password: string },
    { rejectWithValue }
  ) => {
    try {
      const response = await axios.post<Token>(
        `${PROXY}auth/register`,
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
      return rejectWithValue(error.response.data.message || "Network error");
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
        state.error = action.error.message!;
      });
  },
});

export default registerSlice.reducer;
