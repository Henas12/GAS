import { configureStore } from '@reduxjs/toolkit';
import { apiSlice } from './slices/apiSlice';
// import cartSliceReducer from './slices/cartSlice';
import authReducer from './slices/authSlice';
import studentReducer from  './slices/studentSlice'
import userSlice from './slices/staffSilce';

const store = configureStore({
  reducer: {
    [apiSlice.reducerPath]: apiSlice.reducer,
  
    user: userSlice,
    student:studentReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(apiSlice.middleware),
  devTools: true,
});

export default store;