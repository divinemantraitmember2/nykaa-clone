import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  items: [],
  total: 0,
  countItems:0,
  whishItems:0,
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart(state, action) {
      const item = action.payload;
      const existingItem = state.items.find((i) => i.id === item.id);

      if (existingItem) {
        existingItem.quantity += 1;
      } else {
        state.items.push({ ...item, quantity: 1 });
      }
    },

    removeFromCart(state, action) {
      state.items = state.items.filter((item) => item.id !== action.payload);
    },

    clearCart(state) {
      state.items = [];
    },

    increaseQuantity(state, action) {
      const item = state.items.find((i) => i.id === action.payload);
      if (item) {
        item.quantity += 1;
      }
    },

    decreaseQuantity(state, action) {
  const item = state.items.find((i) => i.id === action.payload);
  if (item && item.quantity > 1) {
    item.quantity -= 1;
  }
  // Do nothing if quantity is already 1
},

    updateCartCount(state, action) {
      state.countItems = action.payload; // yaha sirf length rakhenge
    },
 updateWhishCount(state, action) {
      state.whishItems = action.payload; // yaha sirf length rakhenge
    },
    

  },
});

export const {
  addToCart,
  removeFromCart,
  clearCart,
  increaseQuantity,
  decreaseQuantity,
  updateCartCount,
  updateWhishCount,
} = cartSlice.actions;

export default cartSlice.reducer;
