import { configureStore } from '@reduxjs/toolkit';
import resultSlice from './resultSlice';
import playerSlice from './playerSlice';

export const store = configureStore({
  reducer: {
    resultReducer: resultSlice,
    playerReducer: playerSlice,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
