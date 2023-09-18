import axios from "axios";

const baseURL = process.env.NEXT_PUBLIC_SERVER_BASE_URL;
const isClient = typeof window !== 'undefined'
export const apiJsonType = axios.create({
  baseURL: baseURL,
  headers: {
    "Content-Type": "application/json"
  }
})

export const apiFormType = axios.create({
  baseURL: baseURL,
  headers: {
    "Content-Type": "multipart/form-data"
  }
})

export const apiGet = axios.create({
  baseURL: baseURL,
})
export const apiPostJson = axios.create({
  baseURL: baseURL,
  headers: {
    "Content-Type": "application/json",
  }
})

apiGet.interceptors.request.use(
  config => {
    console.log(config)
    if (isClient) {
      const token = sessionStorage.getItem("refreshToken");
      if (token) {
        config.headers['refreshToken'] = token;
      }
    }
    return config;
  }
);

apiGet.interceptors.response.use(
  response => {
    return response.data;
  },
  error => {
    if (error.response && error.response.status === 401) {
      console.log("추가할 예외 처리 로직")
    }
    return Promise.reject(error);
  }
);

apiPostJson.interceptors.request.use(
  config => {
    if (isClient) {
      const token = sessionStorage.getItem("refreshToken");
      if (token) {
        config.headers['Authorization'] = `Bearer ${token}`;
      }
    }
    return config;
  }
);

apiPostJson.interceptors.response.use(
  response => {
    return response.data;
  },
  error => {
    if (error.response && error.response.status === 401) {
      console.log("추가할 예외 처리 로직")
    }
    return Promise.reject(error);
  }
);