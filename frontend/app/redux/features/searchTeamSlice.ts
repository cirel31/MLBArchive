import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface TeamData {
  id: number,
  // 추후 보여줄 데이터 ㅇㅇ
}

interface TeamState {
  teamData: TeamData | null,
  loading: boolean,
  error: Error | null
}

const initialState: TeamState = {
  teamData: null,
  loading: false,
  error: null
}

export const searchTeamSlice = createSlice({
    name: 'search',
    initialState,
    reducers: {
      fetchTeamDataRequest: (state,action: PayloadAction<any>) => {
        state.loading = true;
        state.error = null;
        console.log(action)
      },
      fetchTeamDataSuccess: (state, action: PayloadAction<any>) => {
        state.loading = false;
        state.teamData = action.payload;
        console.log("SAGA 테스트: 데이터 받아오기")
      },
      fetchTeamDataError: (state, action: PayloadAction<Error>) => {
        state.loading = false;
        state.error = action.payload;
        console.log("실패")
        console.log(state.error)
      }
    }
})

export const {
  fetchTeamDataRequest,
  fetchTeamDataSuccess,
  fetchTeamDataError ,
} = searchTeamSlice.actions

export default searchTeamSlice.reducer

