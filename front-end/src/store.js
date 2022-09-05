import { configureStore } from "@reduxjs/toolkit";
import toDoReducer from "./features/toDo/toDoSlice";
import userReducer from "./features/user/userSlice";

export const store = configureStore({
  reducer: {
    todo: toDoReducer,
    user: userReducer,
  },
});
