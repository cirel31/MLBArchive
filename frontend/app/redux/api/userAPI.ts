import axios, { AxiosResponse } from "axios";
import {apiGet, apiJsonType} from "./apiConfig"

const baseURL = process.env.NEXT_PUBLIC_SERVER_BASE_URL;
const oauthURL = process.env.NEXT_PUBLIC_OAUTH_SERVER_URL;
const updateURL = '/api/users/update'
const playerFollowURL = '/api/users/playerlike'
const teamFollowURL = '/api/users/teamlike'
const reLoadDataURL = '/api/users/user'

export const fetchUserDataAPI = async (code: string, state: string, kind: string): Promise<AxiosResponse> => {
  console.log(`${baseURL}${oauthURL}${kind}?code=${code}&state=${state}`)
  return axios.get(`${baseURL}${oauthURL}${kind}?code=${code}&state=${state}`);
}

export const getNewTokenAPI = () => {
  console.log('test')
}
export const getReLoadDataAPI = async () => {
  console.log("여기까진 되지???")
  const response = await apiGet.get(`${reLoadDataURL}`)
  console.log(response)
  return response
}


export const userInfoUpdateAPI = async (accessToken:string, data:any) => {
  return apiJsonType.post(`${updateURL}`,
    data,
    {
      headers: {
        Authorization: accessToken,
      }
    })
}

export const userTeamFollowAPI = async (accessToken:string, data:any) => {
  return apiJsonType.post(`${teamFollowURL}`,
    data,
    {
      headers: {
        Authorization: accessToken,
      }
    })
}
export const userPlayerFollowAPI = async (accessToken:string, data:any) => {
  return apiJsonType.post(`${playerFollowURL}`,
    data,
    {
      headers: {
        Authorization: accessToken,
      }
    })
}

