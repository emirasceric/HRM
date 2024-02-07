import { configureStore } from "@reduxjs/toolkit";
import accountReducer from "./slices/accountSlice";
import employeeReducer from "./slices/employeeSlice";
import projectReducer from "./slices/projectSlice";

export const store = configureStore({
  reducer: {
    accountReducer,
    employeeReducer,
    projectReducer,
  },
});

export default store;
