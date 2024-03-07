import axios, { InternalAxiosRequestConfig } from "axios";
import { PROXY } from "../../consts";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { Restaurant } from "../../interfaces/restaurant-interface";

interface RestaurantAddState extends Restaurant {
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
}

const initialState: RestaurantAddState = {
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

export const addRestaurant = createAsyncThunk(
  "addRestaurant",
  async (credentials: {
    title: string;
    cuisineType: string;
    address: string;
    openHours: string;
    closeHours: string;
    phoneNumber: string;
  }) => {
    const response = await instance.post<Restaurant>(
      "restaurant",
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

const addRestaurantSlice = createSlice({
  name: "add",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(addRestaurant.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(addRestaurant.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.id = action.payload.id;
        state.title = action.payload.title;
        state.cuisineType = action.payload.cuisineType;
        state.address = action.payload.address;
        state.openHours = action.payload.openHours;
        state.closeHours = action.payload.closeHours;
        state.phoneNumber = action.payload.phoneNumber;
      })
      .addCase(addRestaurant.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message || "Network error";
      });
  },
});

export default addRestaurantSlice.reducer;
