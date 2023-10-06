import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState: any = {
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
      },
      fetchTeamDataSuccess: (state, action: PayloadAction<any>) => {
        state.loading = false;
        state.teamData = action.payload;
      },
      fetchTeamDataError: (state, action: PayloadAction<Error>) => {
        state.loading = false;
        state.error = action.payload;
      }
    }
})

export const {
  fetchTeamDataRequest,
  fetchTeamDataSuccess,
  fetchTeamDataError ,
} = searchTeamSlice.actions

export default searchTeamSlice.reducer

