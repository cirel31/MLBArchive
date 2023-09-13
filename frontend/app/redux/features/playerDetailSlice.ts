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
  playerData: PlayerData | null,
  error: Error | null,
}
const initialState: PlayerState = {
  playerData: null,
  error: null,
}
export const playerDetailSlice = createSlice({
  name: 'playerDetail',
  initialState,
  reducers: {
    fetchPlayerDetailData: (state, action: PayloadAction<number>) => {
    },
    fetchPlayerDataSuccess: (state, action: PayloadAction<PlayerData>) => {
      state.playerData = action.payload
    },
    fetchPlayerDataError: (state, action: PayloadAction<Error>) => {
      state.error = action.payload
    },
  }
})

export const {
  fetchPlayerDetailData,
  fetchPlayerDataSuccess,
  fetchPlayerDataError
} = playerDetailSlice.actions
export default playerDetailSlice.reducer