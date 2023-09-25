import axios, { AxiosResponse } from "axios";
import {apiGet} from "@/app/redux/api/apiConfig";

const baseURL = process.env.NEXT_PUBLIC_SERVER_BASE_URL;
const searchURL = '/api/match/search?'
const detailURL = '/api/match/detail/'

export const matchDataAPI = async (teamName: string, start: string, end: string, page: string, size: string): Promise<AxiosResponse> => {
  console.log('API 경로 확인 : ', `${baseURL}${searchURL}page=${page}&size=${size}`)
  return await apiGet.get(`${searchURL}`,
    {
      params: {
        teamId: teamName,
        start: start,
        end: end,
        page: page,
        size: size
      }
    }
  )
}

export const matchDetailDataAPI = async (teamId:string) => {
  return await apiGet.get(`${detailURL}${teamId}`)
}