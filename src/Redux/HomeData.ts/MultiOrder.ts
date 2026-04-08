import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  MultiOrderDetails: [],
};

const MultiOrderSlice = createSlice({
  name: "ProfileDeatils",
  initialState,
  reducers: {
    addMultiOrderDetails: (state, action) => {
      state.MultiOrderDetails = action.payload;
    },
    deleteMultiOrderDetails: (state) => {
      state.MultiOrderDetails = [];
    },
  },
});

export const { addMultiOrderDetails, deleteMultiOrderDetails } =
  MultiOrderSlice.actions;
export default MultiOrderSlice.reducer;
