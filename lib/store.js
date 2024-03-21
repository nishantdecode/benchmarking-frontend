import { configureStore } from '@reduxjs/toolkit';
import { authReducer } from './features/slices/authSlice';
import { authApi } from './features/services/authApi';
import { bankApi } from './features/services/bankApi';
import { bankReducer } from './features/slices/bankSlice';
import { summaryApi } from './features/services/summaryApi';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    [authApi.reducerPath]: authApi.reducer,
    bank: bankReducer,
    [bankApi.reducerPath]: bankApi.reducer,
    [summaryApi.reducerPath]: summaryApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(authApi.middleware, bankApi.middleware, summaryApi.middleware),
});