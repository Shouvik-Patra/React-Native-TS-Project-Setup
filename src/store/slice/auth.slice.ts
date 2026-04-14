import {SIGN_IN_TYPE, SIGN_UP_TYPE} from '@app/types';
import {createSlice, PayloadAction} from '@reduxjs/toolkit';

interface AuthState {
  token: string;
  refreshToken: string;
  loading: boolean;
  error: string | null;
}

const initialState: AuthState = {
  refreshToken: '',
  token: '',
  loading: false,
  error: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    // Sign-in
    signInRequest(state, action: PayloadAction<SIGN_IN_TYPE>) {
      state.loading = true;
      state.error = null;
    },
    signInSuccess(
      state,
      action: PayloadAction<{token: string; refreshToken: string}>,
    ) {
      state.loading = false;
      state.token = action.payload.token;
      state.refreshToken = action.payload.refreshToken;
      state.error = null;
    },
    signInFailure(state, action: PayloadAction<string>) {
      state.loading = false;
      state.error = action.payload;
    },

    // Sign-up
    signUpRequest(state, action: PayloadAction<SIGN_UP_TYPE>) {
      state.loading = true;
      state.error = null;
    },
    signUpSuccess(state) {
      state.loading = false;
      state.error = null;
    },
    signUpFailure(state, action: PayloadAction<string>) {
      state.loading = false;
      state.error = action.payload;
    },

    // logout
    logoutRequest(state) {
      state.loading = true;
      state.error = null;
    },
    logoutSuccess(state) {
      state.refreshToken = '';
      state.token = '';
      state.loading = false;
      state.error = null;
    },
    logoutFailure(state, action: PayloadAction<string>) {
      state.loading = false;
      state.error = action.payload;
    },

    setToken(
      state,
      action: PayloadAction<{token: string; refreshToken: string}>,
    ) {
      state.loading = false;
      state.token = action.payload.token;
      state.refreshToken = action.payload.refreshToken;
      state.error = null;
    },
  },
});

export const {
  // Sign-in
  signInRequest,
  signInSuccess,
  signInFailure,
  // Sign-up
  signUpRequest,
  signUpSuccess,
  signUpFailure,
  //logout
  logoutRequest,
  logoutSuccess,
  logoutFailure,

  // set token
  setToken,
} = authSlice.actions;

export default authSlice.reducer;
