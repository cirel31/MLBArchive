import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState = {
  firstLetterList: [],
  wordParseResult: [],
}
export const searchPlayerResultSlice: any = createSlice({
  name: 'searchPlayer',
  initialState,
  reducers: {
    fetchPlayerWordData: (state, action: PayloadAction<any>) => {
      console.log("암느웅머ㅜㅋㅌ추ㅏㅁㄴ유", action.payload )
    },
    fetchPlayerWordDataSuccess: (state, action: PayloadAction<any>) => {
      state.wordParseResult = action.payload
    },
    fetchPlayerLetterData: (state, action: PayloadAction<any>) => {

    },
    fetchPlayerLetterDataSuccess: (state, action: PayloadAction<any>) => {
      state.firstLetterList = action.payload
    },
    fetchPlayerDataError: (state, action: PayloadAction<Error>) => {
      console.log(action.payload)
    },
  }
})

export const {
  fetchPlayerWordData,
  fetchPlayerWordDataSuccess,
  fetchPlayerLetterData,
  fetchPlayerLetterDataSuccess,
  fetchPlayerDataError
} = searchPlayerResultSlice.actions
export default searchPlayerResultSlice.reducer