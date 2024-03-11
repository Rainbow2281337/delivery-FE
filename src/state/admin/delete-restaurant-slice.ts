import axios, { InternalAxiosRequestConfig } from "axios";
import { RestaurantDeletionState } from "../../interfaces/restaurant-interface";
import { PROXY } from "../../consts";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState: RestaurantDeletionState = {
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

export const deleteRestaurant = createAsyncThunk(
  "restaurant/{id}",
  async (restaurantId: string | null) => {
    const response = await instance.delete(`restaurant/${restaurantId}`);
    return response.data;
  }
);

const deleteRestaurantSlice = createSlice({
  name: "restaurantDeleteReducer",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(deleteRestaurant.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(deleteRestaurant.fulfilled, (state) => {
        state.status = "succeeded";
      })
      .addCase(deleteRestaurant.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message || "Network error";
      });
  },
});

export default deleteRestaurantSlice.reducer;
