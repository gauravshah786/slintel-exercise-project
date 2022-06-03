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