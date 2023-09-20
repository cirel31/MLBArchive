import { AxiosResponse } from "axios";
import {apiGet} from "@/app/redux/api/apiConfig";

const detailURL = '/api/team/detail'
const listURL = '/api/team/list'
const rosterURL = '/api/team/roster/list'
const statURL = '/api/teamstat/detail'

export const fetchTeamListDataAPI = async (): Promise<AxiosResponse> => {
  console.log('API 경로 확인 : ', `${listURL}`)
  return await apiGet.get(`${listURL}`)
}
export const fetchTeamDetailDataAPI = async (id: string): Promise<AxiosResponse> => {
  console.log('API 경로 확인 : ', `${detailURL}/${id}`)
  return await apiGet.get(`${detailURL}/${id}`)
}
export const fetchTeamRosterDataAPI = async (id: string, season: string): Promise<AxiosResponse> => {
  console.log('API 경로 확인 : ', `${rosterURL}?id=${id}&season=${season}`)
  return await apiGet.get(`${rosterURL}?id=${id}&season=${season}`)
}
export const fetchTeamStatDataAPI = async (id: string, season: string) => {
  console.log('API 경로 확인 : ', `${statURL}?id=${id}&season=${season}`)
  return await apiGet.get(`${statURL}?id=${id}&season=${season}`)
}
