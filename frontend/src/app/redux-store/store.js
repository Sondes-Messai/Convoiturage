import { configureStore } from "@reduxjs/toolkit";

import authenticationReducer from "./authenticationSlice";
import rideReducer from "./rideSlice";
/**
 * To configure the store redux.
 *
 * @author Peter Mollet
 */
export const store = configureStore({
  reducer: {
    auth: authenticationReducer,
    ride: rideReducer,
  },
});
