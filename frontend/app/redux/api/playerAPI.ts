import axios, { AxiosResponse } from "axios";

const baseURL = process.env.NEXT_PUBLIC_SERVER_BASE_URL;
const wordURL = process.env.NEXT_PUBLIC_PLAYERS_WORD_URL;
const letterURL = process.env.NEXT_PUBLIC_PLAYERS_LETTER_URL;

export const fetchPlayerWordDataAPI = (word: string, page: string, size: string): Promise<AxiosResponse> => {
  console.log('API 경로 확인 : ', `${baseURL}${wordURL}?page${page}&size=${size}`)
  return axios.get(`${baseURL}${wordURL}?word=${word}&page=${page}&size=${size}`)
}

export const fetchPlayerLetterDataAPI = (letter: string, page: string, size: string) => {
  console.log('API 경로 확인 : ', `${baseURL}${letterURL}?letter=${letter}&page=${page}&size=${size}`)
  return axios.get(`${baseURL}${letterURL}?letter=${letter}&page=${page}&size=${size}`)
}