import axios, { InternalAxiosRequestConfig } from "axios";
import {
  Restaurant,
  RestaurantState,
} from "../../interfaces/restaurant-interface";
import { PROXY } from "../../consts";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState: RestaurantState = {
  restaurants: [],
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

export const getFilteredRestaurants = createAsyncThunk(
  "restaurant",
  async (params?: { [key: string]: string }) => {
    const response = await instance.get<Restaurant[]>("restaurant", {
      params: params,
    });

    return response.data;
  }
);

const getFilteredRestaurantsSlice = createSlice({
  name: "filteredRestaurants",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getFilteredRestaurants.pending, (state) => {
        (state.status = "loading"), (state.error = null);
      })
      .addCase(getFilteredRestaurants.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.restaurants = action.payload;
      })
      .addCase(getFilteredRestaurants.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message || "Network error";
        state.restaurants = [];
      });
  },
});

export default getFilteredRestaurantsSlice.reducer;
