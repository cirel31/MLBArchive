import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface PlayerData {
  id: number;
  name: string;
  isPlaying: boolean;
  height: number;
  weight:number;
  mainPosition: any;
  mainHand: any;
  debutDate: Date;
  retireDate: Date | null;
  email: string;
  image: string;
  // 만약 서버에서 profileImage를 Bolb 객체로 준다면
  // profileImage: Blob;
}
interface PlayerState {
  playerData: any,
  playerActive: any,
  playerScore: any,
  error: Error | null,
}
const initialState: PlayerState = {
  playerData: null,
  playerActive: null,
  playerScore: null,
  error: null,
}
export const playerDetailSlice = createSlice({
  name: 'playerDetail',
  initialState,
  reducers: {
    fetchPlayerDetailData: (state, action: PayloadAction<any>) => {
    },
    fetchPlayerDataSuccess: (state, action: PayloadAction<any>) => {
      const {activeYears, ...restData} = action.payload
      state.playerData = restData
      if (activeYears.length > 0) {
        state.playerActive = activeYears
      }
      else {
        state.playerActive = null
      }
    },
    fetchPlayerScoreDataSuccess: (state, action: PayloadAction<any>) => {
      state.playerScore = action.payload
    },
    fetchPlayerDataError: (state, action: PayloadAction<Error>) => {
    },
  }
})

export const {
  fetchPlayerDetailData,
  fetchPlayerDataSuccess,
  fetchPlayerDataError,
  fetchPlayerScoreDataSuccess,
} = playerDetailSlice.actions
export default playerDetailSlice.reducer