import axios from "axios";
import { baseurl } from "../BaseUrl";
import { showError } from "../components/Toaster";

const api = axios.create({
  baseURL: baseurl,
});

api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error),
);

api.interceptors.response.use(
  (response) => {
    // This runs for SUCCESSFUL POST, GET, etc.
    console.log(`Success [${response.config.method.toUpperCase()}]:`, response.config.url);
    return response;
  },
  (error) => {
    // This runs for FAILED POST, GET, etc.
    console.log(`Error [${error.config?.method?.toUpperCase()}]:`, error.response?.data);
    
    if (error?.response?.data?.is_suspend) {
      //  localStorage.clear();
      
       window.location.href = "/register";
    }
    return Promise.reject(error);
  }
);

// api.interceptors.response.use(
//   (response) => response,
//   (error) => {
//     const { redirected403, setRedirected403 } = useDataStore.getState();

//     if (error.response?.status === 403 && !redirected403) {
//       setRedirected403(true); // ✅ only once
//       window.location.href = "/access-denied";
//     }

//     return Promise.reject(error);
//   }
// );

// GET
export const fetchData = async (endPoint) => {
  const response = await api.get(endPoint);
  return response.data;
};

// POST PUT DELETE
export const actionData = async (endPoint, method, body) => {
  let headers = {};
  console.log(endPoint, method, body);

  const isFormData = body instanceof FormData;
  if (!isFormData && body) {
    headers["Content-Type"] = "application/json";
  }
  const hasBody = method !== "get" && method !== "delete" && body;
  const response = await api.request({
    url: endPoint,
    method,
    ...(hasBody && { data: body }),
    headers,
  });
  return response.data;
};
