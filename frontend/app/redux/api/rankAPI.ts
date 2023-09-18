import axios, { AxiosResponse } from "axios";

const baseURL = process.env.NEXT_PUBLIC_SERVER_BASE_URL;
const todayMatchURL = '/api/match/today'
const hittingRankURL = '/api/hitting/top5'
const pitchingRankURL = '/api/pitching/top5'
const teamRankURL = '정해지지않은팀순위API경로'


export const fetchTodayMatchDataAPI = (): Promise<AxiosResponse> => {
  console.log('API 경로 확인 : ', `${baseURL}${todayMatchURL}`)
  return axios.get(`${baseURL}${todayMatchURL}`)
}

export const fetchHittingRankerDataAPI = (): Promise<AxiosResponse> => {
  console.log('API 경로 확인 : ', `${baseURL}${hittingRankURL}`)
  return axios.get(`${baseURL}${hittingRankURL}`)
}

export const fetchPitchingRankerDataAPI = (): Promise<AxiosResponse> => {
  console.log('API 경로 확인 : ', `${baseURL}${pitchingRankURL}`)
  return axios.get(`${baseURL}${pitchingRankURL}`)
}

export const fetchTeamRankDataAPI = (): Promise<AxiosResponse> => {
  console.log('API 경로 확인 : ', `${baseURL}${teamRankURL}`)
  return axios.get(`${baseURL}${teamRankURL}`)
}