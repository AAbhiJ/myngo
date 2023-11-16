import axios from "axios";
import Cookies from 'js-cookie';

const axiosInstance = axios.create({
  baseURL: "http://localhost:3000/api",
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
