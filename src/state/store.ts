import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./auth/auth-slice";
import registerReducer from "./register/register-slice";
import getProfileInfoReducer from "./profile/profile-slice";
import getUserTableReducer from "./admin/get-users-slice";
import deleteUserReducer from "./admin/delete-user-slice";
import addUserReducer from "./admin/add-user-slice";
import getRestaurantReducer from "./restaurant/restaurant-slice";
import findRestaurantByIdReducer from "./restaurant/getRestaurantById-slice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    register: registerReducer,
    profileInfo: getProfileInfoReducer,
    userTable: getUserTableReducer,
    deleteUser: deleteUserReducer,
    add: addUserReducer,
    getRestaurants: getRestaurantReducer,
    findRestaurantById: findRestaurantByIdReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
