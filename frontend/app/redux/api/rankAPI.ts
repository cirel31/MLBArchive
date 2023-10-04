import axios, { AxiosResponse } from "axios";
import {apiGet} from "@/app/redux/api/apiConfig";

const todayMatchURL = '/api/match/today'
const hittingRankURL = '/api/hitting/top5'
const pitchingRankURL = '/api/pitching/top5'
const teamRankURL = 'https://statsapi.mlb.com/api/v1/standings?leagueId=103,104'

interface PromiseResult {
  message: string,
  status: number,
  resultData: any,
}

export const fetchTodayMatchDataAPI = async (): Promise<AxiosResponse> => {
  console.log('API 경로 확인 : ', `${todayMatchURL}`)
  return await apiGet.get(`${todayMatchURL}`)
}

export const fetchHittingRankerDataAPI = async (): Promise<PromiseResult> => {
  console.log('API 경로 확인 : ', `${hittingRankURL}`)
  return await apiGet.get(`${hittingRankURL}`)
}

export const fetchPitchingRankerDataAPI = async (): Promise<PromiseResult> => {
  console.log('API 경로 확인 : ', `${pitchingRankURL}`)
  return await apiGet.get(`${pitchingRankURL}`)
}

export const fetchTeamRankDataAPI = async () => {
  console.log('팀랭크 API 경로 확인 : ', `${teamRankURL}`)
  return await axios.get(`${teamRankURL}`)
}