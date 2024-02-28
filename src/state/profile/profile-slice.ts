import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { User } from "./interfaces/user-profile-interface";
import { PROXY } from "../../consts";

interface UserProfileState extends User {
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
}

const initialState: UserProfileState = {
  email: null,
  firstName: null,
  lastName: null,
  address: null,
  phoneNumber: null,
  role: null,
  status: "idle",
  error: null,
};

const token = sessionStorage.getItem("access_token");

export const getProfileInfo = createAsyncThunk("auth/profile", async () => {
  try {
    const response = await axios.get<User>(`${PROXY}auth/profile`, {
      headers: {
        Authorization: `${token}`,
      },
    });
    return response.data;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    if (
      error.response &&
      error.response.status >= 400 &&
      error.response.status < 500
    ) {
      throw new Error(error.response?.data.message);
    } else {
      return error.response?.data.message || "Network error";
    }
  }
});

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
      });
  },
});

export const { logout: logoutAction } = getProfileInfoSlice.actions;
export default getProfileInfoSlice.reducer;
