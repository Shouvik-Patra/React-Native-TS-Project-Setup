import {UPDATE_USER_INFORMATION} from '@app/types';
import {createSlice, PayloadAction} from '@reduxjs/toolkit';

interface UserState {
  loading: boolean;
  error: string | null;
  userInfo: any;
  // Other user-related state properties
}

const initialState: UserState = {
  userInfo: null,
  loading: true,
  error: null,
  // Initialize other state properties
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    // fetch user information
    getUserInfoRequest(state) {
      state.loading = true;
      state.error = null;
    },
    getUserInfoSuccess(state, action: PayloadAction<any | null>) {
      state.loading = false;
      state.userInfo = action.payload;
      state.error = null;
    },
    getUserInfoFailure(state, action: PayloadAction<string>) {
      state.loading = false;
      state.error = action.payload;
    },

    // update user information
    updateUserInfoRequest(
      state,
      action: PayloadAction<UPDATE_USER_INFORMATION>,
    ) {
      state.loading = true;
      state.error = null;
    },
    updateUserInfoSuccess(state) {
      state.loading = false;
      state.error = null;
    },
    updateUserInfoFailure(state, action: PayloadAction<string>) {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const {
  // fetch user information
  getUserInfoRequest,
  getUserInfoSuccess,
  getUserInfoFailure,

  // update user information
  updateUserInfoRequest,
  updateUserInfoSuccess,
  updateUserInfoFailure,
} = userSlice.actions;

export default userSlice.reducer;
