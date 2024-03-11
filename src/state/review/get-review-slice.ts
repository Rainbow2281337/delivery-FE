import axios, { InternalAxiosRequestConfig } from "axios";
import { Review } from "../../interfaces/review-interface";
import { PROXY } from "../../consts";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

interface ReviewState extends Review {
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
}

const initialState: ReviewState = {
  userId: null,
  restaurantId: null,
  rating: null,
  comment: null,
  userFirstName: null,
  userLastName: null,
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

export const getReview = createAsyncThunk(
  "review",
  async (restaurantId?: string) => {
    const response = await instance.get<Review>("review", {
      params: {
        restaurantId: restaurantId,
      },
    });

    return response.data;
  }
);

const review = createSlice({
  name: "Review",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getReview.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(getReview.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.userId = action.payload.userId;
        state.restaurantId = action.payload.restaurantId;
        state.rating = action.payload.rating;
        state.comment = action.payload.comment;
        state.userFirstName = action.payload.userFirstName;
        state.userLastName = action.payload.userLastName;
      })
      .addCase(getReview.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message || "Network error";
      });
  },
});

export default review.reducer;
