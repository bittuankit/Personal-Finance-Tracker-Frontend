import { configureStore } from "@reduxjs/toolkit";
import { transactionsSlice } from "./transactionSlice";
import { serviceApi } from "./services";
import { userSlice } from "./userSlice";
import { userServiceApi } from "./userService";

export const store = configureStore({
  reducer: {
    transactions: transactionsSlice.reducer,
    [serviceApi.reducerPath]: serviceApi.reducer,
    users: userSlice.reducer,
    [userServiceApi.reducerPath]: userServiceApi.reducer,
  },

  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      serviceApi.middleware,
      userServiceApi.middleware
    ),
});
