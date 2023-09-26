import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState = {
  matchData: null,
  matchDetailData: null,
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
  }
})

export const {
  requestMatchData,
  successMatchData,
  requestDetailMatchData,
  successDetailMatchData,
  errorMatchData,
  errorDetailMatchData,
} = matchSlice.actions
export default matchSlice.reducer