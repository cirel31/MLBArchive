import axios from "axios";

const baseURL = process.env.NEXT_PUBLIC_SERVER_BASE_URL;
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
