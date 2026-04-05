import { configureStore } from "@reduxjs/toolkit";
import tokenReducer from "./HomeData.ts/TokenSlice";
import profileDetails from "./HomeData.ts/ProfileDetails";
import MultiOrderSlice from "./HomeData.ts/MultiOrder";
import addOrderDetails from "./HomeData.ts/AddOder";

const reduxStore = configureStore({
  reducer: {
    auth: tokenReducer,
    profileDetails: profileDetails,
    addoder: addOrderDetails,
    multiOrder: MultiOrderSlice,
  },
});

export default reduxStore;
