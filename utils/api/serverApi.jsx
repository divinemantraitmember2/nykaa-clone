
import axios from "axios";


export async function GetProductdetails(payload){
   try{
  const response=await axios.get(`https://api.pondric.com/api/v1/products?${payload}`);
  return response
   }catch(error){
    // console.error("Error fetching category list:", error.message);
    return [];
   }
};

export async function GetProductofcategorylist (payload) {
  try{ 
    const response= await axios.get(`https://api.pondric.com/api/v1/products?${payload}`);
    return response.data
  }catch(error){
  //  console.error("Error fetching category list:", error.message);
    return [];
  }
};


export async function GetMenu() {
  try{
    const Response= await axios.get(`https://api.pondric.com/api/v1/menu`)
     return Response.data

  }catch(error){
    // console.error("Error fetching category list:", error.message);
    return [];
  }
  
}


export async function GetProductFilters (payload) {
  try{ 
    const response= await axios.get(`https://api.pondric.com/api/v1/products?${payload}`);
    return response
  }catch(error){
  //  console.error("Error fetching category list:", error.message);
    return [];
  }
};