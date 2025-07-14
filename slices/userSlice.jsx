import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isLoggedIn: false,
  user: null,
  showLoginModal: false,
  showRegisterModal: false,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    login(state, action) {
      state.isLoggedIn = true;
      state.user = action.payload;
    },

    logout(state) {
      state.isLoggedIn = false;
      state.user = null;
    },

    openLoginModal(state) {
      state.showLoginModal = true;
      state.showRegisterModal = false;
    },

    openRegisterModal(state) {
      state.showRegisterModal = true;
      state.showLoginModal = false;
    },

    closeModals(state) {
      state.showLoginModal = false;
      state.showRegisterModal = false;
    },
  },
});

export const {
  login,
  logout,
  openLoginModal,
  openRegisterModal,
  closeModals,
} = userSlice.actions;

export default userSlice.reducer;
