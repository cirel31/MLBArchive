import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState = {
  matchData: null,
  matchDetailData: null,
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
      console.log(action.payload)
    },
    successDetailMatchData: (state, action) => {
      console.log(action.payload)
      state.matchDetailData = action.payload
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
  errorMatchData,
  errorDetailMatchData,
  pageCheck,
} = matchSlice.actions
export default matchSlice.reducer