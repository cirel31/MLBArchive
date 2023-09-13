import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState = {
  searchResult: [],
}
export const searchPlayerResultSlice: any = createSlice({
  name: 'searchPlayer',
  initialState,
  reducers: {
    fetchPlayerListData: (state, action: PayloadAction<any>) => {
      console.log("아직 갱신되지 않은 state")
      console.log(action.payload)
    },
    fetchPlayerListDataSuccess: (state, action: PayloadAction<any>) => {
      state.searchResult = action.payload
    },
    fetchPlayerListDataError: (state, action: PayloadAction<Error>) => {
      console.log(action.payload)
    },
  }
})

export const {
  fetchPlayerListData,
  fetchPlayerListDataSuccess,
  fetchPlayerListDataError
} = searchPlayerResultSlice.actions
export default searchPlayerResultSlice.reducer