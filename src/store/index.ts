import { combineReducers } from "redux";
import { configureStore, isRejectedWithValue, Middleware, MiddlewareAPI } from "@reduxjs/toolkit";

import { quizSlice } from "./quiz/slice";
import { quizAPI } from "./quiz/api";
import { resultsAPI } from "./results/api";

export const rootReducer = combineReducers({
  [quizSlice.name]: quizSlice.reducer,
  [quizAPI.reducerPath]: quizAPI.reducer,
  [resultsAPI.reducerPath]: resultsAPI.reducer,
});

export const rtkQueryErrorLogger: Middleware = (api: MiddlewareAPI) => (next) => (action) => {
  if (isRejectedWithValue(action)) {
    alert("Произошла ошибка сервера!");
  }
  return next(action);
};

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(quizAPI.middleware).concat(resultsAPI.middleware).concat(rtkQueryErrorLogger),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
