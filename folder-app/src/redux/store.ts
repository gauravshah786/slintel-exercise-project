import { configureStore } from '@reduxjs/toolkit';

import appReducer from './appSlice';
import userReducer from './userSlice';

const store = configureStore({
  reducer: {
    app: appReducer,
    user: userReducer
  }
});

export default store;

// TODO: create hooks instead of using AppDispatch as type everywhere
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
