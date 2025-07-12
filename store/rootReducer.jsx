import { combineReducers } from "@reduxjs/toolkit";
import cartReducer from "../slices/cartSlice";
// import userReducer from "./slices/userSlice"; // for future

const rootReducer = combineReducers({
  cart: cartReducer,
  // user: userReducer,
});

export default rootReducer;
