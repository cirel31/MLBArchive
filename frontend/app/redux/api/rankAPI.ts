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
  return await apiGet.get(`${todayMatchURL}`)
}

export const fetchHittingRankerDataAPI = async (): Promise<PromiseResult> => {
  return await apiGet.get(`${hittingRankURL}`)
}

export const fetchPitchingRankerDataAPI = async (): Promise<PromiseResult> => {
  return await apiGet.get(`${pitchingRankURL}`)
}

export const fetchTeamRankDataAPI = async () => {
  return await axios.get(`${teamRankURL}`)
}