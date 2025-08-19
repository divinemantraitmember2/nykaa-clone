
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

export async function GetProductofcategorylist(payload) {
 
  try {
   const finalQuery = payload.includes("&category_slug=")
      ? payload.replace("&category_slug=", ",")
      : payload;
   console.log("payload...", finalQuery);
    const response = await axios.get(`https://api.pondric.com/api/v1/products?${finalQuery}`);
    return response; 
  } catch (error) {
    console.error("Error fetching category list:", error.message);
    return [];
  }
}


export async function GetMenu() {
  try{
    const Response= await axios.get(`https://api.pondric.com/api/v1/menu`)
     return Response.data

  }catch(error){
    // console.error("Error fetching category list:", error.message);
    return [];
  }
  
}


export async function GetProductFilters(payload) {
  try{ 
    const response= await axios.get(`https://api.pondric.com/api/v1/product/filters?${payload}`);
    return response
  }catch(error){
  //  console.error("Error fetching category list:", error.message);
    return [];
  }
};

export async function GetPagesDetails(payload) {
  try {
    const response = await axios.get(`https://api.pondric.com/api/v1/page/get/${payload}`,
      {
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: `Bearer ll`
        },
      }
    );

    return response;
  } catch (error) {
    console.error("GetAboutUsPage error:", error);
    return [];
  }
}


