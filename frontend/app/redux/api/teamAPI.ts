import { AxiosResponse } from "axios";
import {apiGet} from "@/app/redux/api/apiConfig";

const detailURL = '/api/team/detail'
const listURL = '/api/team/list'
const rosterURL = '/api/roster/list'
const statURL = '/api/teamstat/detail'

export const fetchTeamListDataAPI = async (): Promise<AxiosResponse> => {
  return await apiGet.get(`${listURL}`)
}
export const fetchTeamDetailDataAPI = async (id: string): Promise<AxiosResponse> => {
  return await apiGet.get(`${detailURL}/${id}`)
}
export const fetchTeamRosterDataAPI = async (id: string, season: string): Promise<AxiosResponse> => {
  return await apiGet.get(`${rosterURL}?teamId=${id}&season=${season}`)
}
export const fetchTeamStatDataAPI = async (id: string, season: string) => {
  return await apiGet.get(`${statURL}?teamId=${id}&season=${season}`)
}
