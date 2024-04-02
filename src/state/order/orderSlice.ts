import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios, { InternalAxiosRequestConfig } from "axios";
import { PROXY } from "../../consts";
import { Order, OrderState } from "../../interfaces/order-interface";

const initialState: OrderState = {
  orders: [],
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

export const getAllOrders = createAsyncThunk("order", async () => {
  const response = await instance.get<Order[]>("order");

  return response.data;
});

const getOrdersInfoSlice = createSlice({
  name: "Orders",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getAllOrders.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(getAllOrders.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.orders = action.payload;
      })
      .addCase(getAllOrders.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message || "Network error";
      });
  },
});

export default getOrdersInfoSlice.reducer;
