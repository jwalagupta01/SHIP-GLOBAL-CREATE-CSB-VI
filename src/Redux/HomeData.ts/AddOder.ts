import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  SingleOrder: {},
};

const AddOrderSlice = createSlice({
  name: "ProfileDeatils",
  initialState,
  reducers: {
    addOrderDetails: (state, action) => {
      state.SingleOrder = action.payload;
    },
    deleteOrderDetails: (state) => {
      state.SingleOrder = {};
    },
  },
});

export const { addOrderDetails, deleteOrderDetails } = AddOrderSlice.actions;
export default AddOrderSlice.reducer;
