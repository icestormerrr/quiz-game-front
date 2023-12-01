import { combineReducers } from "redux";
import { configureStore } from "@reduxjs/toolkit";
import { PERSIST, persistReducer, persistStore } from "redux-persist";
import storage from "redux-persist/lib/storage";

import { quizSlice } from "./quiz/slice";
import { PERSIST_STORE_KEY } from "../config";
import { quizAPI } from "./quiz/api";

export const rootReducer = combineReducers({
  [quizSlice.name]: quizSlice.reducer,
  [quizAPI.reducerPath]: quizAPI.reducer,
});

const persistConfig = {
  key: PERSIST_STORE_KEY,
  storage,
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [PERSIST],
      },
    }).concat(quizAPI.middleware),
});

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
