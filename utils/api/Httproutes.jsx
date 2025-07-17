import axios from "axios";
import { getSession } from "next-auth/react";


const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL,
  
});


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

export const loginuser = (payload) => {
  console.log("payload,,,,,,",payload)
    let requestUrl = `https://dummyjson.com/auth/login`
      return api.post(requestUrl,payload);
    
  }

export const GetProductlist = () => {
  return api.get("/products");
};

export const GetProductdetails = (payload) => {
  return api.get(`/products/${payload}`);
};

export const GetProductofcategorylist = (payload) => {
  return api.get(`/products/category/${payload}`);
};

export const GetCategorylist = () => {
  return api.get("/products/categories");
};


export default api;
