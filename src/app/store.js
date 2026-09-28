import { configureStore } from "@reduxjs/toolkit";
import tasksReducer from "../features/tasksSlice";
import usersReducer from "../features/usersSlice";
import settingsReducer from "../features/settingsSlice";

export const store = configureStore({
  reducer: {
    tasks: tasksReducer,
    users: usersReducer,
    settings: settingsReducer,
  },
});