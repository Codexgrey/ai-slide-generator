// src/redux/store.ts
import { configureStore } from '@reduxjs/toolkit'
import authReducer from './authSlice'
import slidesReducer from './slidesSlice'

export const store = configureStore({
  reducer: {
    auth: authReducer,
    slides: slidesReducer,
  },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch


