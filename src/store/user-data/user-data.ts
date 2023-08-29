import { createSlice } from '@reduxjs/toolkit';

import { AuthorizationStatus, UserData } from '../../types/authorization';
import { checkAuthAction, loginAction, logoutAction } from '../api-actions';
import { NameSpace } from '../../constants/store';

const initialState: {
  authorizationStatus: AuthorizationStatus;
  user: UserData | null;
  authPendingStatus: boolean;
} = {
  authorizationStatus: AuthorizationStatus.Unknown,
  user: null,
  authPendingStatus: false
};

export const userData = createSlice({
  name: NameSpace.User,
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(checkAuthAction.fulfilled, (state, action) => {
        state.authorizationStatus = AuthorizationStatus.Auth;
        state.user = action.payload;
        state.authPendingStatus = false;
      })
      .addCase(checkAuthAction.rejected, (state) => {
        state.authorizationStatus = AuthorizationStatus.NoAuth;
        state.user = null;
        state.authPendingStatus = false;
      })
      .addCase(checkAuthAction.pending, (state) => {
        state.authPendingStatus = true;
      })
      .addCase(loginAction.fulfilled, (state, action) => {
        state.authorizationStatus = AuthorizationStatus.Auth;
        state.user = action.payload;
      })
      .addCase(loginAction.rejected, (state) => {
        state.authorizationStatus = AuthorizationStatus.NoAuth;
      })
      .addCase(logoutAction.fulfilled, (state) => {
        state.authorizationStatus = AuthorizationStatus.NoAuth;
        state.user = null;
      });
  }
});
