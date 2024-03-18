import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios, { InternalAxiosRequestConfig } from "axios";
import { User } from "../../interfaces/user-interface";
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
});

export const deleteAccount = createAsyncThunk(
  "user/{id}",
  async (userId: string | null) => {
    const response = await instance.delete(`user/${userId}`);

    return response.data;
  }
);

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
      })
      .addCase(deleteAccount.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(deleteAccount.fulfilled, (state) => {
        Object.assign(state, initialState);
        sessionStorage.removeItem("access_token");
      })
      .addCase(deleteAccount.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message || "Account deletion failed";
      });
  },
});

export const { logout: logoutAction } = getProfileInfoSlice.actions;
export default getProfileInfoSlice.reducer;
