import axios, { InternalAxiosRequestConfig } from "axios";
import { Restaurant } from "../../interfaces/restaurant-interface";
import { PROXY } from "../../consts";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

interface RestaurantByIdState extends Restaurant {
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
}

const initialState: RestaurantByIdState = {
  id: null,
  title: null,
  cuisineType: null,
  address: null,
  openHours: null,
  closeHours: null,
  phoneNumber: null,
  image: undefined,
  imageMimeType: undefined,
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

export const findRestaurantById = createAsyncThunk(
  "restaurant/{id}",
  async (restaurantId: string | undefined) => {
    // Accept userId as argument
    const response = await instance.get<Restaurant>(
      `restaurant/${restaurantId}`
    );

    return response.data;
  }
);

const findRestaurantByIdSlice = createSlice({
  name: "Find restaurant by id",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(findRestaurantById.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(findRestaurantById.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.id = action.payload.id;
        state.title = action.payload.title;
        state.cuisineType = action.payload.cuisineType;
        state.address = action.payload.address;
        state.openHours = action.payload.openHours;
        state.closeHours = action.payload.closeHours;
        state.phoneNumber = action.payload.phoneNumber;
      })
      .addCase(findRestaurantById.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message || "Network error";
      });
  },
});

export default findRestaurantByIdSlice.reducer;
