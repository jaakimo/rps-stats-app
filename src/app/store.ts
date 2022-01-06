import { configureStore } from '@reduxjs/toolkit'
import gamesSlice from '../slices/gamesSlice'

export const store = configureStore({
  reducer: {
    gamesReducer: gamesSlice,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
