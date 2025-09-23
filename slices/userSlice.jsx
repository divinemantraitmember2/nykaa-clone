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
  GetFitterComponent: false,
  DefaultLocation:null
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
     toggleGetFitterComponent(state) {
      state.GetFitterComponent = !state.GetFitterComponent;
    },
    
     DefaultLocation(state, action) {
      state.DefaultLocation = action.payload;
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
  toggleGetFitterComponent,
  DefaultLocation
} = userSlice.actions;

export default userSlice.reducer;
