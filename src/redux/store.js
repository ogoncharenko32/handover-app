import { configureStore } from "@reduxjs/toolkit";

import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";
import storage from "redux-persist/lib/storage";

import { authReducer } from "./auth/slice";
import { ticketsReducer } from "./tickets/slice";

const authConfig = {
  key: "auth",
  storage,
  whitelist: ["token"],
};

const shiftsConfig = {
  key: "shifts",
  storage,
  whitelist: ["selectedShiftId"],
};

export const store = configureStore({
  reducer: {
    auth: persistReducer(authConfig, authReducer),
    tickets: persistReducer(shiftsConfig, ticketsReducer),
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export const persistor = persistStore(store);
