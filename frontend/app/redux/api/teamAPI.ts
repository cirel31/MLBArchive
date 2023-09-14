import axios, { AxiosResponse } from "axios";

const baseURL = process.env.NEXT_PUBLIC_SERVER_BASE_URL;
const detailURL = '/api/team/detail'
const listURL = '/api/team/list'
const rosterURL = '/api/team/roster/list'
const statURL = '/api/teamstat/detail'

export const fetchTeamListDataAPI = (): Promise<AxiosResponse> => {
  console.log('API 경로 확인 : ', `${baseURL}${listURL}`)
  return axios.get(`${baseURL}${listURL}`)
}

export const fetchTeamDetailDataAPI = (id: string): Promise<AxiosResponse> => {
  console.log('API 경로 확인 : ', `${baseURL}${detailURL}/${id}`)
  return axios.get(`${baseURL}${detailURL}/${id}`)
}

export const fetchTeamRosterDataAPI = (id: string, season: string): Promise<AxiosResponse> => {
  console.log('API 경로 확인 : ', `${baseURL}${rosterURL}?id=${id}&season=${season}`)
  return axios.get(`${baseURL}${rosterURL}?id=${id}&season=${season}`)
}

export const fetchTeamStatDataAPI = (id: string, season: string) => {
  console.log('API 경로 확인 : ', `${baseURL}${statURL}?id=${id}&season=${season}`)
  return axios.get(`${baseURL}${statURL}?id=${id}&season=${season}`)
}