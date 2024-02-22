import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./auth/auth-slice";
import registerReducer from "./register/register-slice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    register: registerReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
