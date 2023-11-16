import axios from "axios";
import Cookies from 'js-cookie';

const baseURL = process.env.BASE_URL

const axiosInstance = axios.create({
  baseURL: `${baseURL}/api`,
});

// axiosInstance.interceptors.request.use(
//   (config) => {
//     if (typeof window !== "undefined") {
//       const token = Cookies.get("token");

//       if (token) {
//         config.headers = {
//           ...config.headers,
//           Authorization: `${token}`,
//         };
//       }
//     }
//     return config;
//   },
//   (error) => {
//     return Promise.reject(error);
//   }
// );

axiosInstance.interceptors.response.use(
  (response) => {
    // console.log(response);
    return response;
  },
  (error) => {
    if (typeof window !== "undefined") {
      if (error?.response?.status === 401) {
        Cookies.remove("token")
        window.location.href = "/login";
      }
    }
    return Promise.reject(error);
  }
);
export default axiosInstance;
