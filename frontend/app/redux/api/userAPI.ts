import axios, { AxiosResponse } from "axios";
import {apiGet, apiJsonType, apiPostJson} from "./apiConfig"

const baseURL = process.env.NEXT_PUBLIC_SERVER_BASE_URL;
const oauthURL = process.env.NEXT_PUBLIC_OAUTH_SERVER_URL;
const updateURL = '/api/users/update'
const playerFollowURL = '/api/users/playerLike'
const teamFollowURL = '/api/users/teamLike'
const reLoadDataURL = '/api/users/user'
const addPlayerURL = '/api/playerlike/like'
const addTeamURL = '/api/teamlike/like'
const logoutURL = '/api/auth/logout'

export const fetchUserDataAPI = async (code: string, state: string, kind: string): Promise<AxiosResponse> => {
  console.log(`${baseURL}${oauthURL}${kind}?code=${code}&state=${state}`)
  return await axios.get(`${baseURL}${oauthURL}${kind}?code=${code}&state=${state}`);
}
export const getReLoadDataAPI = async () => {
  return await apiGet.get(`${reLoadDataURL}`)
}

export const userInfoUpdateAPI = async (data:any) => {
  return await apiJsonType.post(`${updateURL}`, data)
}
export const userTeamFollowAPI = async () => {
  return await apiGet.get(`${teamFollowURL}`)
}
export const userPlayerFollowAPI = async () => {
  return await apiGet.get(`${playerFollowURL}`)
}
export const addTeamFollowAPI = async (data:any) => {
  return await apiPostJson.post(`${addTeamURL}`, data)
}
export const addPlayerFollowAPI = async (data:any) => {
  return await apiPostJson.post(`${addPlayerURL}`, data)
}
export const LogoutAPI = async () => {
  return await apiPostJson.get(`${logoutURL}`)
}
