import axios, { AxiosResponse } from "axios";

const baseURL = process.env.NEXT_PUBLIC_SERVER_BASE_URL;
const oauthURL = process.env.NEXT_PUBLIC_OAUTH_SERVER_URL;

export const fetchUserDataAPI = (code: string, state: string, kind: string): Promise<AxiosResponse> => {
  console.log(`${baseURL}${oauthURL}${kind}?code=${code}&state=${state}`)
  return axios.get(`${baseURL}${oauthURL}${kind}?code=${code}&state=${state}`);
}

export const getNewTokenAPI = () => {
  console.log('test')
}

