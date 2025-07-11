// lib/apiRoutes.jsx

const BASE_PATH = "api/v1";

export const API_ROUTES = {
  GIFT_CART: {
    ADD: `${BASE_PATH}/gift-cart/add`,
    REMOVE: `${BASE_PATH}/gift-cart/remove`,
    LIST: `${BASE_PATH}/gift-cart/list`,
  },

  WISHLIST: {
    ADD: `${BASE_PATH}/wishlist/add`,
    REMOVE: `${BASE_PATH}/wishlist/remove`,
    LIST: `${BASE_PATH}/wishlist/list`,
  },

  USER: {
    LOGIN: `${BASE_PATH}/auth/login`,
    REGISTER: `${BASE_PATH}/auth/register`,
    PROFILE: `${BASE_PATH}/user/profile`,
  },

  PRODUCT: {
    LIST: `${BASE_PATH}/products`,
    DETAIL: (slug) => `${BASE_PATH}/products/${slug}`,
  },

  ORDER: {
    PLACE: `${BASE_PATH}/orders/place`,
    HISTORY: `${BASE_PATH}/orders/history`,
  },
};
