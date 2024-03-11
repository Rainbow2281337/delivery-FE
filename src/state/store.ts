import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./auth/auth-slice";
import registerReducer from "./register/register-slice";
import getProfileInfoReducer from "./profile/profile-slice";
import getUserTableReducer from "./admin/get-users-slice";
import deleteUserReducer from "./admin/delete-user-slice";
import addUserReducer from "./admin/add-user-slice";
import getRestaurantsReducer from "./restaurant/restaurant-slice";
import getFilteredRestaurantsReducer from "./restaurant/getFilteredRestaurants-slice";
import findRestaurantByIdReducer from "./restaurant/getRestaurantById-slice";
import deleteRestaurantReducer from "./admin/delete-restaurant-slice";
import addRestaurantReducer from "./admin/add-restaurant-slice";
import addReviewReducer from "./review/add-review.slice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    register: registerReducer,
    profileInfo: getProfileInfoReducer,
    userTable: getUserTableReducer,
    deleteUser: deleteUserReducer,
    add: addUserReducer,
    getRestaurants: getRestaurantsReducer,
    getFilteredRestaurants: getFilteredRestaurantsReducer,
    findRestaurantById: findRestaurantByIdReducer,
    deleteRestaurant: deleteRestaurantReducer,
    addRestaurant: addRestaurantReducer,
    addReview: addReviewReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
