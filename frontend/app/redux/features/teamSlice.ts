import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState = {
  teamData: null,
  teamStat: null,
  teamRoster: null,
}
export const teamSlice = createSlice({
  name: 'team',
  initialState,
  reducers: {
    teamDetailData: (state, action) => {
    },
    teamDetailDataSuccess: (state, action) => {
      state.teamData = action.payload
    },
    teamStatData: (state, action) => {
    },
    teamStatDataSuccess: (state, action) => {
      state.teamStat = action.payload
    },
    teamRosterData: (state, action) => {
    },
    teamRosterDataSuccess: (state, action) => {
      state.teamRoster = action.payload
    },
  }
})

export const  {
  teamDetailData,
  teamDetailDataSuccess,
  teamStatData,
  teamStatDataSuccess,
  teamRosterData,
  teamRosterDataSuccess,
} = teamSlice.actions

export default teamSlice.reducer