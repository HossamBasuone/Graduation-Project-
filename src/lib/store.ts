import { configureStore } from "@reduxjs/toolkit";
import { authReducer } from "./authSlice";

export let store = configureStore({
  reducer: {
    auth: authReducer,
  },
});
typeof store.getState;
export type AppDispatch = typeof store.dispatch;
