import { configureStore } from '@reduxjs/toolkit';
import { authReducer } from './features/slices/authSlice';
import { authApi } from './features/services/authApi';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    [authApi.reducerPath]: authApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(authApi.middleware),
});