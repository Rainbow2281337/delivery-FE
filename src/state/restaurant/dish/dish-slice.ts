import axios, { InternalAxiosRequestConfig } from "axios";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { Dish, DishState } from "../../../interfaces/dish-interface";
import { PROXY } from "../../../consts";

const initialState: DishState = {
  dishes: [],
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

export const getDishes = createAsyncThunk(
  "dish",
  async (restaurantId: string | undefined) => {
    const response = await instance.get<Dish[]>(
      `restaurant/${restaurantId}/dish`
    );

    return response.data;
  }
);

const getDishesSlice = createSlice({
  name: "Dishes",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getDishes.pending, (state) => {
        (state.status = "loading"), (state.error = null);
      })
      .addCase(getDishes.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.dishes = action.payload;
      })
      .addCase(getDishes.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message || "Network error";
      });
  },
});

export default getDishesSlice.reducer;
