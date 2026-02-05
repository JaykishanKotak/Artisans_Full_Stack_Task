import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

export type UserDetails = {
  id?: string;
  email?: string;
  name?: string;
};

export type AuthState = {
  token: string | null;
  userDetails?: UserDetails;
};

const initialState: AuthState = {
  token: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    loginSucceeded(
      state,
      action: PayloadAction<{ access_token: string; userDetails: UserDetails }>,
    ) {
      state.token = action.payload.access_token;
      state.userDetails = action.payload.userDetails;
    },
    logout(state) {
      state.token = null;
      localStorage.clear();
      sessionStorage.clear();
    },
  },
});

export const { loginSucceeded, logout } = authSlice.actions;
export const authReducer = authSlice.reducer;
