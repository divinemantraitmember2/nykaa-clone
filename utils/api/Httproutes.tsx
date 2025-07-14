import axios from "axios";
import { getSession } from "next-auth/react";

const api = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_URL, 
  });
  
  api.interceptors.request.use(
    async (config) => {
            const session:any = await getSession(); 
            if(session){
                config.headers.Authorization = session.user?.account?.userdetail?.Token;
            }else{
                config.headers.Authorization = `${process.env.NEXT_PUBILC_GLOBAL_AUTH_TOKEN}`;
            }
            return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );
  

  
 
  
  export const submitRequestForPrice = (name:string,email:string,phone:string,packageName:string,packageId:string,pslug:string) => {
    const enquiryPayload = {
      "source": "T2T",
      "NoOfPerson":"",
      "name":name,
      "email":email,
      "phone": Number(phone),
      "comment":packageName,
      "packageid":packageId,
      "pagessourcelink":pslug,
      "packagename":packageName
    }
    return api.post(`/api/v1/enquiry/create`,enquiryPayload)
  }
  export const submitJoinZoom = (name:string,email:string,phone:string,meetingID:string,zoomMeetingID:string) => {
    const str1: string = zoomMeetingID.toString();
    const zoomPayload = {
      "source": "T2T",
      "first_name":name,
      "last_name":"",
      "email":email,
      "mobile": Number(phone),
      "meetingID":meetingID,
      "zoomMeetingID":str1,
      "countryCode":"+91",
      "otpVerified":""
      
      
    }
    return api.post(`/api/v1/zoommeeting/add-subscriber`,zoomPayload)
  }
  
  export const submitJoinZoomOTP = (phone:string,otpString:string,getEnquiryId:any) => {
    getEnquiryId.id =""
    getEnquiryId.otpVerified =otpString
    return api.post(`/api/v1/zoommeeting/add-subscriber`,getEnquiryId)
  }
  export const submitQuickEnquiry = (name:string,email:string,mobileno:string,countrycode:string,person:string,packagename:string,comments:string) => {
    const enquiryPayload = {
      "source": "T2T",
      "name": name,
      "email": email,
      "phone": Number(mobileno),
      "countrycode":countrycode,
      "NoOfPerson": Number(person),
      "packagename": packagename,
      "packageid": "",
      "pagessourcelink": "https://www.triptotemples.com/",
      "comment": comments
  }
    return api.post(`/api/v1/enquiry/create`,enquiryPayload)
  }

  export const submitEnquiryOtp = (mobileno:string,otpString:string) => {
    const enquiryPayload = {
      "source": "T2T",
      "mobile": Number(mobileno),
      "otpverified": otpString
    }
    return api.post(`/api/v1/enquiry/call`,enquiryPayload)
  }
  export const submitEnquiryFormOtp = (mobileno:string,otpString:string,getEnquiryId:string) => {
    const enquiryPayload = {
      "source": "T2T",
      "id":getEnquiryId,
      "phone": Number(mobileno),
      "otpVerified": otpString
    }
    return api.post(`/api/v1/enquiry/verify`,enquiryPayload)
  }

  export const getLoginOtp = (email:string,countrycode:any) => {
    const loginOtpPayload = {
      "source": "T2T",
      "mobile": Number(email),
      "countrycode":countrycode
   }
    return api.post(`/api/v1/user/send-opt`,loginOtpPayload)
  }
  

  export const loginuser = (payload:any) => {
    let requestUrl = ``
    if(payload.otp && payload.mobile){
      requestUrl = '/api/v1/user/login-with-otp';
      return api.post(requestUrl,payload);
    }else{
      requestUrl = '/api/v1/user/login';
      // console.log("payload.....???????...",payload)
      return api.post(requestUrl,payload);
    }
  }
  

export default api;