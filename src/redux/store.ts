import { configureStore } from '@reduxjs/toolkit';
import jobReducer from './slices/jobSlice';
import authReducer from './slices/authSlice'; // <-- import the auth slice

export const store = configureStore({
  reducer: {
    jobs: jobReducer,
    auth: authReducer, // <-- register the auth reducer here
  },
});

// TypeScript types
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
