import { configureStore } from "@reduxjs/toolkit";
import SessionReducer from "./SessionSlice.jsx";

const store = configureStore({
  reducer: {
    session: SessionReducer,
  },
});

export default store;
