import { configureStore } from "@reduxjs/toolkit";
import apiReducer from "./apiSlice";

const store = configureStore({
  reducer: {
    api: apiReducer,
    // Add other reducers here if needed
  },
});

export default store;
