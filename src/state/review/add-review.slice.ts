import axios, { InternalAxiosRequestConfig } from "axios";
import { PROXY } from "../../consts";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { Review } from "../../interfaces/review-interface";

interface ReviewAddState extends Review {
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
}

const initialState: ReviewAddState = {
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

export const addReview = createAsyncThunk(
  "review",
  async (reviewData: {
    restaurantId: string | undefined;
    rating: number | null;
    comment: string;
  }) => {
    const response = await instance.post<Review>(
      "review",
      JSON.stringify(reviewData),
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    return response.data;
  }
);

const addReviewSlice = createSlice({
  name: "addReviewReducer",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(addReview.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(addReview.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.userId = action.payload.userId;
        state.restaurantId = action.payload.restaurantId;
        state.rating = action.payload.rating;
        state.comment = action.payload.comment;
        state.userFirstName = action.payload.userFirstName;
        state.userLastName = action.payload.userLastName;
      })
      .addCase(addReview.rejected, (state, action) => {
        state.status = "failed";
        if (action.error.code === "ERR_BAD_REQUEST") {
          state.error =
            "There was an error. Please check your data for the following errors: the rating should not be greater than 5, should not be less than 1, the rating should not be empty, comment should not be empty";
        } else {
          state.error = action.error.code || "An error occurred";
        }
      });
  },
});

export default addReviewSlice.reducer;
