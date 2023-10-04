import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState = {
  firstLetterList: null,
  wordParseResult: null,
  totalPage: 1,
}
export const searchPlayerResultSlice: any = createSlice({
  name: 'searchPlayer',
  initialState,
  reducers: {
    fetchPlayerWordData: (state, action: PayloadAction<any>) => {
      console.log(action.payload)
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
    pageCheck: (state, action) => {
      state.totalPage = action.payload
    },
    reSetData: (state, action) => {
      state.wordParseResult = null
    },
  }
})

export const {
  fetchPlayerWordData,
  fetchPlayerWordDataSuccess,
  fetchPlayerLetterData,
  fetchPlayerLetterDataSuccess,
  fetchPlayerDataError,
  pageCheck,
  reSetData
} = searchPlayerResultSlice.actions
export default searchPlayerResultSlice.reducer