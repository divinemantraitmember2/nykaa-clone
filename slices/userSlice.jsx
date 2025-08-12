import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isLoggedIn: false,
  user: null,
  showLoginModal: false,
  showUserCartDrawar: false,
  showRegisterModal: false,
  shouldRefetchUserAddress: false,
  GetUserCart: false,
  ApplyCouponGetCart: false,
  StopRuningUseEffect: false,
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
     openUserCartDrawar(state) {
      state.showUserCartDrawar = !state.showUserCartDrawar;
    },

   
    closeModals(state) {
      state.showLoginModal = false;
      state.showRegisterModal = false;
    },

    toggleRefetchUserAddress(state) {
      state.shouldRefetchUserAddress = !state.shouldRefetchUserAddress;
    },

     toggleRefetchApplyCouponGetCart(state) {
      state.ApplyCouponGetCart = !state.ApplyCouponGetCart;
    },

     toggleUserGetCart(state) {
      state.GetUserCart = !state.GetUserCart;
    }, 
  },
});

export const {
  login,
  logout,
  openLoginModal,
  openRegisterModal,
  closeModals,
  toggleRefetchUserAddress, 
  toggleRefetchApplyCouponGetCart,
  openUserCartDrawar,
  toggleUserGetCart,
} = userSlice.actions;

export default userSlice.reducer;
