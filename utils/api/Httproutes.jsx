import axios from "axios";
import { getSession } from "next-auth/react";

// ✅ Create Axios instance
const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
});

// ✅ Axios request interceptor for setting auth headers
api.interceptors.request.use(
  async (config) => {
    const session = await getSession();
    if (session?.user?.account?.userdetail?.Token) {
      config.headers.Authorization = session.user.account.userdetail.Token;
    } else {
      config.headers.Authorization = process.env.NEXT_PUBLIC_GLOBAL_AUTH_TOKEN;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// ✅ Send OTP to user's mobile number
export const getLoginOtp = (mobile, countrycode) => {
  const loginOtpPayload = {
    source: "T2T",
    mobile: Number(mobile),
    countrycode,
  };
  return api.post("/api/v1/user/send-opt", loginOtpPayload);
};

// ✅ Login user (OTP or password-based)
export const loginuser = (payload) => {
  const requestUrl =
    payload.otp && payload.mobile
      ? "/api/v1/user/login-with-otp"
      : "/api/v1/user/login";
  return api.post(requestUrl, payload);
};

// ✅ Get product list (DummyJSON-compatible)
export const Get_Product_list = () => {
  return api.get("/products");
};

export const Get_Product_details = (payload) => {
  return api.get(`/products/${payload}`);
};

export const Get_Product_of_category_list = (payload) => {
  return api.get(`/products/category/${payload}`);
};

// ✅ Get product categories (DummyJSON-compatible)
export const Get_Category_list = () => {
  return api.get("/products/categories");
};

export default api;
