import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import { 
  Credentials,
  SignInUserFailure,
  SignInUserSuccess
} from '../types/userTypes';
import type { RootState } from './store';
import { signIn } from '../service/apiService';

interface UserState {
  errorMessage: string | null,
  isError: boolean,
  isFetching: boolean,
  isSuccess: boolean,
  token: string | null,
  username: string | null
};

const initialState: UserState = {
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
  async (credentials: Credentials, { rejectWithValue }) => {
    try {
      const response: { data: SignInUserSuccess } = await signIn(credentials);
      return response.data;
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
  extraReducers: (builder) => {
    // TODO: save store to localStorage - replace causes refresh
    builder
      .addCase(signInUser.fulfilled, (state, { payload }) => {
        const { username, token } = payload as SignInUserSuccess ;
        // TODO: check isauthenticated getItem - parse from string to boolean
        localStorage.setItem('isAuthenticated', 'true');
        localStorage.setItem('token', token);
        return {
          ...state,
          username: username,
          token: token,
          isFetching: false,
          isSuccess: true,
        };
      })
      .addCase(signInUser.rejected, (state, action) => {
        const payload = action.payload as SignInUserFailure;
        console.log('payload', payload.response.data.errorMessage);
        const { errorMessage } = payload.response.data;
        return {
          ...state,
          isFetching: false,
          isError: true,
          errorMessage
        };
      })
      .addCase(signInUser.pending, (state) => ({
        ...state,
        isFetching: true,
      }))
  },
});

export const { clearState } = userSlice.actions;

export default userSlice.reducer;

export const userSelector = (state: RootState) => state.user;
