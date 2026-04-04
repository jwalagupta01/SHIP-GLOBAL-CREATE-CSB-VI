import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  personalDetail: {},
  balance: 0,
};

const profileDetailsSlice = createSlice({
  name: "ProfileDeatils",
  initialState,
  reducers: {
    addProfileDetails: (state, action) => {
      state.personalDetail = action.payload;
    },
    deleteProfileDetails: (state) => {
      state.personalDetail = {};
    },
    addBalance: (state, action) => {
      state.balance = action.payload;
    },
  },
});

export const { addProfileDetails, deleteProfileDetails, addBalance } =
  profileDetailsSlice.actions;
export default profileDetailsSlice.reducer;
