import axios from "axios";
import {
  getItem,
  KEY_ACCESS_TOKEN,
  removeItem,
  setItem,
} from "./localStorageManager";
import store from '../redux/store';
import { setLoading, showToast } from "../redux/slices/appConfigSlice";
import { TOAST_FAILURE } from "../App";
export const axiosClient = axios.create({
  baseURL: process.env.REACT_APP_SERVER_BASE_URL,  
  withCredentials: true,
});



axiosClient.interceptors.request.use((request) => {
  const accessToken = getItem(KEY_ACCESS_TOKEN);
  request.headers["Authorization"] = `Bearer ${accessToken}`;

store.dispatch(setLoading(true)); 

  // console.log( request.headers["Authorization"]);
  return request;
});

axiosClient.interceptors.response.use(async (response) => { 
  store.dispatch(setLoading(false)); 
  const data = response.data;
  if (data.status === "ok") {
    return data;
  }
  // Refresh token expired and send the user on the login page

  const origanalRequest = response.config;
  const statusCode = data.statusCode;
  const error= data.message;

  store.dispatch(showToast({
    type: TOAST_FAILURE,
    message:error
  }))
  
  //Refresh ki error aa sakti hai to hume axoisClient ko hata ke axios krna h..
  // ya phir api baar baar run hogi too ye  he karna hai ..
  let baseURL = 'http://localhost:4000';
  if (statusCode === 401) {
    const response = await axios
    .create({
        withCredentials: true,
    })
    .get(`${baseURL}/auth/refresh`);

if (response.data.status === "ok") {
    setItem(KEY_ACCESS_TOKEN, response.data.result.accessToken);
    origanalRequest.headers[
        "Authorization"
    ] = `Bearer ${response.data.result.accessToken}`;

    return axios(origanalRequest);
    }else{
      removeItem(KEY_ACCESS_TOKEN);
      window.location.replace("/login", "_self");
      return Promise.reject(error);
    }
  }
return Promise.reject(error);
},async(error) => {
  store.dispatch(setLoading(false)); 
  store.dispatch(showToast({
    type: TOAST_FAILURE,
    message:error.message
  }))
  return Promise.reject(error);
});
