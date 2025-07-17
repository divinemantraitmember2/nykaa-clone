
import axios from "axios";

export async function getCategoryList() {
  try {
    const res = await axios.get(`https://dummyjson.com/products/categories`);
    return res.data;
  } catch (error) {
    console.error("Error fetching category list:", error.message);
    return [];
  }
}

export async function GetProductdetails(payload){
   try{
  const response=await axios.get(`https://dummyjson.com/products/${payload}`);
  return response.data
   }catch(error){
    console.error("Error fetching category list:", error.message);
    return [];
   }
};

export async function GetProductofcategorylist (payload) {
  try{
    const response= await axios.get(`https://dummyjson.com/products/category/${payload}`);
    return response.data
  }catch(error){
   console.error("Error fetching category list:", error.message);
    return [];
  }
};
