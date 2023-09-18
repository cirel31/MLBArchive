import axios, { AxiosResponse } from "axios";
import {apiGet} from "@/app/redux/api/apiConfig";

const baseURL = process.env.NEXT_PUBLIC_SERVER_BASE_URL;
const wordURL = process.env.NEXT_PUBLIC_PLAYERS_WORD_URL;
const letterURL = process.env.NEXT_PUBLIC_PLAYERS_LETTER_URL;
const DATA_URL_INFO = '/api/player/detail'
const DATA_URL_HITTING = '/api/hitting/detail'
const DATA_URL_PITCHING  = '/api/pitching/detail'
const DATA_URL_FIELDING = '/api/fielding/detail'

export const fetchPlayerWordDataAPI = async (word: string, page: string, size: string): Promise<AxiosResponse> => {
  console.log('API 경로 확인 : ', `${baseURL}${wordURL}?page${page}&size=${size}`)
  return apiGet.get(`${wordURL}?word=${word}&page=${page}&size=${size}`)
}

export const fetchPlayerLetterDataAPI = (letter: string, page: string, size: string) => {
  console.log('API 경로 확인 : ', `${baseURL}${letterURL}?letter=${letter}&page=${page}&size=${size}`)
  return apiGet.get(`${letterURL}?letter=${letter}&page=${page}&size=${size}`)
}

export const fetchPlayerDetailDataAPI = (id: string): Promise<AxiosResponse> => {
  console.log('API 경로 확인 : ', `${baseURL}${DATA_URL_INFO}/${id}`)
  return apiGet.get(`${DATA_URL_INFO}/${id}`)
}
export const fetchPlayerHittingDataAPI = (id: string, season: string): Promise<AxiosResponse> => {
  console.log('API 경로 확인 : ', `${baseURL}${DATA_URL_HITTING}?playerId=${id}&season=${season}`)
  return apiGet.get(`${DATA_URL_HITTING}?playerId=${id}&season=${season}`)
}
export const fetchPlayerPitchingDataAPI = (id: string, season: string): Promise<AxiosResponse> => {
  console.log('API 경로 확인 : ', `${baseURL}${DATA_URL_PITCHING}?playerId=${id}&season=${season}`)
  return apiGet.get(`${DATA_URL_PITCHING}?playerId=${id}&season=${season}`)
}
export const fetchPlayerFieldingDataAPI = (id: string, season: string): Promise<AxiosResponse> => {
  console.log('API 경로 확인 : ', `${baseURL}${DATA_URL_FIELDING}?playerId=${id}&season=${season}`)
  return apiGet.get(`${DATA_URL_FIELDING}?playerId=${id}&season=${season}`)
}
