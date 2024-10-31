import { configureStore } from "@reduxjs/toolkit";
import { authReducer } from "./features/slices/authSlice";
import { authApi } from "./features/services/authApi";
import { bankApi } from "./features/services/bankApi";
import { bankReducer } from "./features/slices/bankSlice";
import { summaryApi } from "./features/services/summaryApi";
import { marketApi } from "./features/services/marketApi";
import { ratioApi } from "./features/services/keyRatioApi";
import { analysisApi } from "./features/services/analysisApi";
import { sizeApi } from "./features/services/sizeApi";
import { individualBankApi } from "./features/services/individualBankApi";
import { organisationApi } from "./features/services/organisationApi";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    [authApi.reducerPath]: authApi.reducer,
    bank: bankReducer,
    [bankApi.reducerPath]: bankApi.reducer,
    [summaryApi.reducerPath]: summaryApi.reducer,
    [marketApi.reducerPath]: marketApi.reducer,
    [ratioApi.reducerPath]: ratioApi.reducer,
    [analysisApi.reducerPath]: analysisApi.reducer,
    [sizeApi.reducerPath]: sizeApi.reducer,
    [individualBankApi.reducerPath]: individualBankApi.reducer,
    [organisationApi.reducerPath]: organisationApi.reducer
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      authApi.middleware,
      bankApi.middleware,
      summaryApi.middleware,
      marketApi.middleware,
      ratioApi.middleware,
      analysisApi.middleware,
      sizeApi.middleware,
      individualBankApi.middleware,
      organisationApi.middleware
    ),
});
