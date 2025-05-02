import { configureStore } from '@reduxjs/toolkit';
import jobReducer from '../slices/jobSlice';
import authReducer from '../slices/authSlice';

const store = configureStore({
  reducer: {
    jobs: jobReducer,
    auth: authReducer,
  },
});

export default store; // Default export
