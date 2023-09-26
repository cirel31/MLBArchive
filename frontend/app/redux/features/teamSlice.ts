import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState = {
  teamData: null
}
export const teamSlice = createSlice({
  name: 'team',
  initialState,
  reducers: {
    teamDetailData: (state, action) => {
      console.log('데이터 넘겨줌', action.payload)
    },
    teamDetailDataSuccess: (state, action) => {
      console.log('서버로부터 성공적으로 response 받음', action.payload)
      state.teamData = action.payload
    },
  }
})

export const  {
  teamDetailData,
  teamDetailDataSuccess,
} = teamSlice.actions

export default teamSlice.reducer