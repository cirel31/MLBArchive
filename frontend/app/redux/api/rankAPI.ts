import { AxiosResponse } from "axios";
import {apiGet} from "@/app/redux/api/apiConfig";

const todayMatchURL = '/api/match/today'
const hittingRankURL = '/api/hitting/top5'
const pitchingRankURL = '/api/pitching/top5'
const teamRankURL = '정해지지않은팀순위API경로'


export const fetchTodayMatchDataAPI = async (): Promise<AxiosResponse> => {
  console.log('API 경로 확인 : ', `${todayMatchURL}`)
  return await apiGet.get(`${todayMatchURL}`)
}

export const fetchHittingRankerDataAPI = async (): Promise<AxiosResponse> => {
  console.log('API 경로 확인 : ', `${hittingRankURL}`)
  return await apiGet.get(`${hittingRankURL}`)
}

export const fetchPitchingRankerDataAPI = async (): Promise<AxiosResponse> => {
  console.log('API 경로 확인 : ', `${pitchingRankURL}`)
  return await apiGet.get(`${pitchingRankURL}`)
}

export const fetchTeamRankDataAPI = async (): Promise<AxiosResponse> => {
  console.log('API 경로 확인 : ', `${teamRankURL}`)
  return await apiGet.get(`${teamRankURL}`)
}