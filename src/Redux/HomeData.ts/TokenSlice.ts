import { createSlice } from "@reduxjs/toolkit";

function getTokenFromStroage() {
  return localStorage.getItem("token") || null;
}

const initialState = {
  token: getTokenFromStroage(),
};

const tokenSlice = createSlice({
  name: "Token",
  initialState,
  reducers: {
    // add Token
    addToken: (state, action) => {
      state.token = action.payload;
      localStorage.setItem("token", action.payload);
    },
    // update Token
    updateToken: (state, action) => {
      state.token = action.payload;
      localStorage.setItem("token", action.payload);
    },
    // Delete Token
    removeToken: (state) => {
      state.token = null;
      localStorage.removeItem("token");
    },
    // Check Token
    syncToken: (state) => {
      const token = localStorage.getItem("token");
      state.token = token || null;
    },
  },
});

export const { addToken, updateToken, removeToken, syncToken } =
  tokenSlice.actions;
export default tokenSlice.reducer;
