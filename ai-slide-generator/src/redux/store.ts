import { configureStore } from '@reduxjs/toolkit';
import authReducer from './authSlice';
import slidesReducer from './slidesSlice';
import uiReducer from './uiSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    slides: slidesReducer,
    ui: uiReducer,
  },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch


