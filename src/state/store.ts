import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./auth/auth-slice";
import registerReducer from "./register/register-slice";
import getProfileInfoReducer from "./profile/profile-slice";
import getUserTableReducer from "./admin/get-users-slice";
import deleteUserReducer from "./admin/delete-user-slice"; // remove
import addUserReducer from "./admin/add-user-slice"; // remove
import getRestaurantsReducer from "./restaurant/restaurant-slice";
import findRestaurantByIdReducer from "./restaurant/getRestaurantById-slice";
import deleteRestaurantReducer from "./admin/delete-restaurant-slice"; // remove
import addRestaurantReducer from "./admin/add-restaurant-slice"; // remove
import addReviewReducer from "./review/add-review.slice"; // remove
import getDishesReducer from "./restaurant/dish/dish-slice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    register: registerReducer,
    profileInfo: getProfileInfoReducer,
    userTable: getUserTableReducer,
    deleteUser: deleteUserReducer,
    add: addUserReducer,
    getRestaurants: getRestaurantsReducer,
    findRestaurantById: findRestaurantByIdReducer,
    deleteRestaurant: deleteRestaurantReducer,
    addRestaurant: addRestaurantReducer,
    addReview: addReviewReducer,
    getDishes: getDishesReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
