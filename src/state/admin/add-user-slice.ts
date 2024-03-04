import axios, { InternalAxiosRequestConfig } from "axios";
import { User } from "../../interfaces/user-interface";
import { PROXY } from "../../consts";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

interface UserAddState extends User {
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
}

const initialState: UserAddState = {
  id: null,
  email: null,
  firstName: null,
  lastName: null,
  address: null,
  phoneNumber: null,
  role: null,
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

export const addUser = createAsyncThunk(
  "user",
  async (credentials: {
    email: string;
    password: string;
    firstName: string;
    lastName: string;
    address: string;
    phoneNumber: string;
    role: string;
  }) => {
    const response = await instance.post<User>(
      "user",
      JSON.stringify(credentials),
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    return response.data;
  }
);

const addUserSlice = createSlice({
  name: "add",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(addUser.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(addUser.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.id = action.payload.id;
        state.email = action.payload.email;
        state.firstName = action.payload.firstName;
        state.lastName = action.payload.lastName;
        state.address = action.payload.address;
        state.phoneNumber = action.payload.phoneNumber;
        state.role = action.payload.role;
      })
      .addCase(addUser.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message || "Network error";
      });
  },
});

export default addUserSlice.reducer;
