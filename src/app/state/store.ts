import { configureStore } from '@reduxjs/toolkit';
import resultsSlice from './resultSlice';
import playerSlice from './playerSlice';

export const store = configureStore({
  reducer: {
    resultsReducer: resultsSlice,
    playerReducer: playerSlice,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
