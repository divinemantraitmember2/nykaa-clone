// store/cartSlice.js
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  items: [], // Each item: { id, title, price, quantity }
  totalQuantity: 0,
  totalPrice: 0,
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const newItem = action.payload;
      const existing = state.items.find((item) => item.id === newItem.id);

      if (existing) {
        existing.quantity += 1;
      } else {
        state.items.push({ ...newItem, quantity: 1 });
      }

      state.totalQuantity += 1;
      state.totalPrice += newItem.price;
    },

    removeFromCart: (state, action) => {
      const itemId = action.payload;
      const existing = state.items.find((item) => item.id === itemId);

      if (existing) {
        state.totalQuantity -= existing.quantity;
        state.totalPrice -= existing.price * existing.quantity;
        state.items = state.items.filter((item) => item.id !== itemId);
      }
    },

    decreaseQuantity: (state, action) => {
      const itemId = action.payload;
      const existing = state.items.find((item) => item.id === itemId);

      if (existing && existing.quantity > 1) {
        existing.quantity -= 1;
        state.totalQuantity -= 1;
        state.totalPrice -= existing.price;
      }
    },

    clearCart: (state) => {
      state.items = [];
      state.totalQuantity = 0;
      state.totalPrice = 0;
    },
  },
});

export const { addToCart, removeFromCart, decreaseQuantity, clearCart } = cartSlice.actions;
export default cartSlice.reducer;
