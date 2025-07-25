import axios from "axios";
import { getSession } from "next-auth/react";


const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL,
});



api.interceptors.request.use(
  async (config) => {
    const session = await getSession();
    if (session?.accessToken) {
      config.headers.Authorization = `Bearer ${session.accessToken}`;
    } else {
      config.headers.Authorization = process.env.NEXT_PUBLIC_GLOBAL_AUTH_TOKEN;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export const loginuser = (payload) => {
    let requestUrl = `/api/v1/user/login/${payload.phone}`
    return api.get(requestUrl);
}

export const Registeruser = (payload) => {
    let requestUrl = `/api/v1/user/profile`
    return api.post(requestUrl,payload);
}

export const AddToCart = async (actionPayload, payload) => {
  const requestUrl = `/api/v1/user/add2bag`;
  return api.post(requestUrl, payload, {
    headers: {
      action: `${actionPayload}`,
    },
    withCredentials: true, 
    credentials:true
  });
};




export async function GetProductofcategorylist (payload) {
  try{ 
    const response= await api.get(`/api/v1/products?${payload}`);
    return response.data
  }catch(error){
  //  console.log("Error fetching category list:", error.message);
    return [];
  }
}; 

export async function GetProductFilters (payload) {
  try{ 
    const response= await api.get(`/api/v1/product/filters?${payload}`);
    return response.data
  }catch(error){
  //  console.error("Error fetching category list:", error.message);
    return [];
  }
};



export default api;
