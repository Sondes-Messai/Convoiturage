import { createSlice } from "@reduxjs/toolkit";

import {
  getPayloadToken,
  isTokenValid,
  setToken,
} from "./..//services/tokenServices";

/**
 * initial state: {
 *  - isAuthenticated:  check if the user is already authenticated when openning the Application
 *  - token: the token of the user
 *  - user: the user data
 * }
 * @author Peter Mollet
 */
const initialState = {
  isAuthenticated: false,
  token: null,
  user: null,
};

export const authenticationSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    signIn: (state, action) => {
      const token = action.payload;
      state.token = token;
      const claims = getPayloadToken(token);
      console.log("claims : ", claims);
      const user = {
        username: claims.sub,
        role: claims.role,
      };
      state.user = user;
      state.isAuthenticated = isTokenValid(token);
      setToken(action.payload);
    },
    signOut: (state) => {
      localStorage.clear();
      sessionStorage.clear();
      state.isAuthenticated = false;
    },
    updateUser: (state, action) => {
      state.user = {...state.user , ...action.payload}
    },
  },
});

export const { signIn, signOut, updateUser } = authenticationSlice.actions;

export const selectIsLogged = (state) => state.auth.isAuthenticated;
export const selectUser = (state) => state.auth.user;
export const selectToken = (state) => state.auth.token;
export const selectHasRole = (state, role) => {
  if (!role || role == "") return true;
  const user = state.auth.user;
  if (!user) return false;
  return user.role;
};

export default authenticationSlice.reducer;
