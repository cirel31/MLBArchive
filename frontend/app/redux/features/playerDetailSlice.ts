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
  playerHitting: any,
  playerPitching: any,
  playerFielding: any,
  error: Error | null,
}
const initialState: PlayerState = {
  playerData: null,
  playerActive: null,
  playerHitting: null,
  playerPitching: null,
  playerFielding: null,
  error: null,
}
export const playerDetailSlice = createSlice({
  name: 'playerDetail',
  initialState,
  reducers: {
    fetchPlayerDetailData: (state, action: PayloadAction<any>) => {
      console.log(action.payload)
    },
    fetchPlayerDataSuccess: (state, action: PayloadAction<any>) => {
      const {activeYears, ...restData} = action.payload
      state.playerData = restData
      state.playerActive = activeYears
    },
    fetchPlayerSeasonDetailData: (state, action: PayloadAction<any>) => {
      console.log(action.payload)
    },
    fetchPlayerHittingDataSuccess: (state, action: PayloadAction<any>) => {
      state.playerHitting = action.payload
    },
    fetchPlayerPitchingDataSuccess: (state, action: PayloadAction<any>) => {
      state.playerPitching = action.payload
    },
    fetchPlayerFieldingDataSuccess: (state, action: PayloadAction<any>) => {
      state.playerFielding = action.payload
    },
    fetchPlayerDataError: (state, action: PayloadAction<Error>) => {
      state.error = action.payload
    },
  }
})

export const {
  fetchPlayerDetailData,
  fetchPlayerDataSuccess,
  fetchPlayerDataError,
  fetchPlayerSeasonDetailData,
  fetchPlayerHittingDataSuccess,
  fetchPlayerPitchingDataSuccess,
  fetchPlayerFieldingDataSuccess,
} = playerDetailSlice.actions
export default playerDetailSlice.reducer