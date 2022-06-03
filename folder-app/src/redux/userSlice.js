import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import { signIn } from '../service/apiService';

const initialState = {
  username: null,
  token: null,
  // TODO: should separate user and login
  isFetching: false,
  isSuccess: false,
  isError: false,
  errorMessage: null,
};

export const signInUser = createAsyncThunk(
  '/login',
  async (credentials, { rejectWithValue }) => {
    try {
      const response = await signIn(credentials);
      return response;
    } catch (error) {
      console.log('Error', error);
      return rejectWithValue(error);
    }
  }
);

// export const signOutUser = createAsyncThunk(
//   '/logout',
//   async () => {
//     const response = await signOut();
//     return response;
//   },
// );

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    clearState: (state) => {
      state.isError = false;
      state.isSuccess = false;
      state.isFetching = false;
      return state;
    },
  },
  extraReducers: {
    // TODO: save store to localStorage - replace causes refresh
    [signInUser.fulfilled]: (state, { payload }) => {
      const { data } = payload;
      localStorage.setItem('isAuthenticated', true);
      localStorage.setItem('token', data.token);
      return {
        ...state,
        username: data.username,
        token: data.token,
        isFetching: false,
        isSuccess: true,
      };
    },
    [signInUser.rejected]: (state, { payload }) => {
      console.log('payload', payload.response.data.errorMessage);
      const { errorMessage } = payload.response.data;
      return {
        ...state,
        isFetching: false,
        isError: true,
        errorMessage
      };
    },
    [signInUser.pending]: (state) => ({
      ...state,
      isFetching: true,
    }),
    // [signOutUser.fulfilled]: (state, { payload }) => {
    //   localStorage.removeItem('isAuthenticated');
    //   localStorage.removeItem('token');
    //   console.log('payload', payload);
    //   return {
    //     ...state,
    //     ...initialState,
    //   };
    // },
    // [signOutUser.rejected]: (state, { payload }) => {
    //   console.log('payload', payload);
    //   return {
    //     ...state,
    //     isFetching: false,
    //     isError: true,
    //     errorMessage: payload.message,
    //   };
    // },
    // [signOutUser.pending]: (state) => ({
    //   ...state,
    //   isFetching: true,
    // }),
  },
});

export const { clearState } = userSlice.actions;

export default userSlice.reducer;

export const userSelector = (state) => state.user;
