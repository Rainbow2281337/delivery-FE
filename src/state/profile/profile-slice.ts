import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios, { InternalAxiosRequestConfig } from "axios";
import { User } from "./interfaces/user-profile-interface";
import { PROXY } from "../../consts";

interface UserProfileState extends User {
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
}

const initialState: UserProfileState = {
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

export const getProfileInfo = createAsyncThunk("auth/profile", async () => {
  const response = await instance.get<User>("auth/profile");

  return response.data;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
});

export const logout = (state: UserProfileState) => {
  Object.assign(state, initialState);
};

const getProfileInfoSlice = createSlice({
  name: "Profile info",
  initialState,
  reducers: {
    logout: (state) => {
      logout(state);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getProfileInfo.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(getProfileInfo.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.id = action.payload.id;
        state.email = action.payload.email;
        state.firstName = action.payload.firstName;
        state.lastName = action.payload.lastName;
        state.address = action.payload.address;
        state.phoneNumber = action.payload.phoneNumber;
        state.role = action.payload.role;
      })
      .addCase(getProfileInfo.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message || "Network error";
        state.id = null;
        state.email = null;
        state.firstName = null;
        state.lastName = null;
        state.address = null;
        state.phoneNumber = null;
        state.role = null;
      });
  },
});

export const { logout: logoutAction } = getProfileInfoSlice.actions;
export default getProfileInfoSlice.reducer;
