import { configureStore } from "@reduxjs/toolkit";
import tokenReducer from "./HomeData.ts/TokenSlice";

const reduxStore = configureStore({
  reducer: {
    auth: tokenReducer,
  },
});

export default reduxStore;
