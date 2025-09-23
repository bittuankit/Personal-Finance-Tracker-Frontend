import { configureStore } from "@reduxjs/toolkit";
import { transactionsSlice } from "./slice";
import { serviceApi } from "./services";

export const store = configureStore({
  reducer: {
    transactions: transactionsSlice.reducer,
    [serviceApi.reducerPath]: serviceApi.reducer,
  },

  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(serviceApi.middleware),
});
