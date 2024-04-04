import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios, { InternalAxiosRequestConfig } from "axios";
import { PROXY } from "../../consts";
import {
  OrderHistory,
  OrderHistoryState,
} from "../../interfaces/order-interface";

const initialState: OrderHistoryState = {
  orderHistory: [],
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

export const getOrderHistory = createAsyncThunk(
  "order/history",
  async ({ userId, status }: { userId: string | null; status?: string }) => {
    const response = await instance.get<OrderHistory[]>(
      `order/history/${userId}`,
      { params: { status } }
    );

    return response.data;
  }
);

const getOrderHistoryInfoSlice = createSlice({
  name: "Order history",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getOrderHistory.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(getOrderHistory.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.orderHistory = action.payload;
      })
      .addCase(getOrderHistory.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message || "Network error";
      });
  },
});

export default getOrderHistoryInfoSlice.reducer;
