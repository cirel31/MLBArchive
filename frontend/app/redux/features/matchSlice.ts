import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState = {
  matchData: null,
  matchDetailData: null,
  matchLineScore: null,
  totalPage: 1,
}
export const matchSlice = createSlice({
  name: 'match',
  initialState,
  reducers: {
    requestMatchData: (state, action) => {

    },
    successMatchData: (state, action) => {
      state.matchData = action.payload
    },
    errorMatchData: (state, action) => {

    },
    requestDetailMatchData: (state, action) => {
    },
    successDetailMatchData: (state, action) => {
      state.matchDetailData = action.payload
    },
    successMatchLineScore: (state, action) => {
      state.matchLineScore = action.payload
    },
    errorDetailMatchData: (state, action) => {

    },
    pageCheck: (state, action) => {
      state.totalPage = action.payload
    },
  }
})

export const {
  requestMatchData,
  successMatchData,
  requestDetailMatchData,
  successDetailMatchData,
  successMatchLineScore,
  errorMatchData,
  errorDetailMatchData,
  pageCheck,
} = matchSlice.actions
export default matchSlice.reducer