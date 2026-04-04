import { configureStore } from "@reduxjs/toolkit";
import tokenReducer from "./HomeData.ts/TokenSlice";
import profileDetails from "./HomeData.ts/ProfileDetails";

const reduxStore = configureStore({
  reducer: {
    auth: tokenReducer,
    profileDetails: profileDetails,
  },
});

export default reduxStore;
