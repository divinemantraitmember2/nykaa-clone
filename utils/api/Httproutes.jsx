import axios from "axios";
import { getSession } from "next-auth/react";


const api = axios.create({
   baseURL:"https://api.pondric.com",
});



api.interceptors.request.use(
  async (config) => {
    const session = await getSession();
    if (session?.accessToken) {
      config.headers.Authorization = `Bearer ${session.accessToken}`;
    } else {
      config.headers.Authorization = ``;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export const loginuser = (payload) => {
    let requestUrl = `/api/v1/user/login`
    let loginWith={
      "phone":payload.phone
    }
    return api.post(requestUrl,loginWith);
}

export const Registeruser = (payload) => {
    let requestUrl = `/api/v1/user/profile`
    return api.post(requestUrl,payload);
}

export const UserAddreAddAndUpdate= async(actions,payload)=>{
   const requestUrl=`/api/v1/user/profile/address/add`;
   return api.post(requestUrl, payload)
}

export const UserAddressDelete = async (addressId) => {
  const requestUrl = `/api/v1/user/profile/address/${addressId}/remove`;
  return api.delete(requestUrl);
};

export const GetUser= async()=>{
   const requestUrl=`/api/v1/user/profile/get`;
   return api.get(requestUrl)

}
export const AddToCart = async (actionPayload, payload) => {
  const requestUrl = `/api/v1/user/add2bag`;
  return api.post(requestUrl, payload, {
    headers: {
      action: `${actionPayload}`,
    },

  });
};

export const AddUserWhish = async (payload) => {
  const requestUrl = `/api/v1/wishlist/add`;
  return api.post(requestUrl, payload);
};

export const GetUserWhish = async () => {
  const requestUrl = `/api/v1/wishlist/get`;
  return api.get(requestUrl);
};

export const RemoveUserWhish = async (payload) => {
   const requestUrl = `/api/v1/wishlist/remove`;
  return await api.delete(requestUrl, {
    data: payload,
  });
};


export const AddCoupon = async (payload) => {
  const requestUrl = `/api/v1/apply-coupon`;
  return await api.post(requestUrl, payload);
};

export const CouponRemove = async (payload) => {
  const requestUrl = `/api/v1/remove-coupon`;
  return await api.delete(requestUrl, {
    data: payload,
  });
};

export async function GetUserCart(){
  try{ 
    const response= await api.get(`/api/v1/user/cart/get`);
    return response.data
  }catch(error){
    return [];
  }
}; 

export const CreateUserOrder = async (payload) => {
  const requestUrl = `/api/v1/order/create`;
  return await api.post(requestUrl, payload);
};
 
 export const  payment_verification= async (payload) => {
  const requestUrl = `/api/v1/payment/verify`;
  return await api.post(requestUrl, payload);
};
export const  payment_fails= async (payload) => {
  const requestUrl = `/api/v1/order/failed`;
  return await api.post(requestUrl, payload);
};
export const UserAddressInCart= async(payload)=>{
  const requestUrl = `/api/v1/user/cart/property/set`;
  return api.post(requestUrl, payload, {
  });
}

export const GetUserOrder = async (payload) => {
  const requestUrl = `/api/v1/orders`;
  return await api.get(requestUrl, payload);
} 
export async function GetUserOrderSuccess(orderId) {
  try { 
    const response = await api.get(`/api/v1/orders?orderID=${orderId}`);
    return response;
  } catch (error) {
    console.error(" API error:", error.message);
    return null; 
  }
}

export async function GetUserOrderInvoice(orderId) {
  try { 
    const response = await api.get(`/api/v1/downloan/invoice/order/${orderId}`);
   if (response?.data?.code === 200) {
      return response.data.data; 
    }
    return null;
  } catch (error) {
    console.error(" API error:", error.message);
    return null; 
  }
}

export const GetSizeChart = async (category_slug) => {
  const requestUrl = `/api/v1/sizechart/${category_slug}?unit=in`;
  return api.get(requestUrl);
};

export const GetCoupons = async () => {
  const requestUrl = `/api/v1/coupons`;
  return api.get(requestUrl);
};
export const GetCouponsDeatils = async (id) => {
  const requestUrl = `/api/v1/coupons?id=${id}`;
  return api.get(requestUrl);
};

// export async function GetAboutUsPage() {
//   try { 
//     const response = await api.get(`/api/v1/page/get/about-us`);
//     return response;
//   } catch (error) {
//     console.error("GetAboutUsPage API error:", error.message);
//     return null; // keep it predictable
//   }
// }



// export async function GetProductofcategorylist (payload) {
//   try{ 
//     const response= await api.get(`/api/v1/products?${payload}`);
//     return response
//   }catch(error){
//   //  console.log("Error fetching category list:", error.message);
//     return [];
//   }
// }; 

// export async function GetProductFilters (payload) {
//   try{ 
//     const response= await api.get(`/api/v1/product/filters?${payload}`);
//     return response
//   }catch(error){
//   //  console.error("Error fetching category list:", error.message);
//     return [];
//   }
// };



export default api;
