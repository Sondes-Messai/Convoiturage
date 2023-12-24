import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  myRide: null,
};

const rideSlice = createSlice({
  name: "ride",
  initialState,
  reducers: {
     /**
     * méthode qui permet d'ajouter de nouvelle valeur ou mettre à jours des champs déjà existants
     */
     updateRide: (state, action) => {
      state.myRide = { ...state.myRide, ...action.payload };
    },
    /**
     * méthode qui réinitialise myRide à sa valeur initiale
     */
    resetRide: (state) => {
      state.myRide = initialState.myRide;
    },
  },
});


export const { updateRide,resetRide } = rideSlice.actions;
/**
 * méthode permettant de récupérer myRide du store
 */
export const selectRide = (state) => state.ride.myRide;
export default rideSlice.reducer;
