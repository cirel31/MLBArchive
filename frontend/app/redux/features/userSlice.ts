import { createSlice, PayloadAction } from "@reduxjs/toolkit";

// interface UserData {
//   id: number;
//   nickname: string;
//   email: string;
//   profileImage: string;
//   // 만약 서버에서 profileImage를 Bolb 객체로 준다면
//   // profileImage: Blob;
// }
interface UserState {
  isLoading: boolean;
  isLoggedIn: boolean;
  userData: any;
  accessToken: string | null;
  refreshToken: string | null;
  error: Error | null;
  followList: any;
}

const initialState: UserState = {
  isLoading: true,
  isLoggedIn: false,
  userData: null,
  accessToken: null,
  refreshToken: null,
  error: null,
  followList: null,
}
interface FetchUserDataPayload {
  code: string;
  state: string;
  kind: string;
}
export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    fetchUserData: (state, action: PayloadAction<FetchUserDataPayload>) => {
      state.isLoading = true
      console.log("슬라이스 접근 확인")
    },
    fetchReUserData: (state) => {
      const refreshToken = sessionStorage.getItem("refreshToken") ?? null
      if (refreshToken && !state.accessToken) {
        console.log("토큰토큰")
        console.log(refreshToken)
      }
    },
    fetchUserDataSuccess: (state, action: PayloadAction<any>) => {
      console.log(action.payload)
      state.isLoading = false
      state.isLoggedIn = true
      state.userData = action.payload.userData
      state.accessToken = action.payload.accessToken
      state.refreshToken = action.payload.refreshToken
      console.log(initialState)
      console.log(state)
      console.log({...state});
    },
    fetchDataError: (state, action: PayloadAction<Error>) => {
      // state.isLoading = false
      console.log(action.payload.message)
    },
    fetchFollowData: (state, action: PayloadAction<any>) => {

    },
    fetchFollowDataSuccess: (state, action) => {
      state.followList = action.payload
    },
    addFollowPlayer: (state, action: PayloadAction<any>) => {

    },
    removeFollowPlayer: (state, action: PayloadAction<any>) => {

    },
    addFollowTeam: (state, action: PayloadAction<any>) => {

    },
    removeFollowTeam: (state, action: PayloadAction<any>) => {

    },
    fetchUserLogout: (state) => {
      state.isLoggedIn = false
      state.userData = null
      state.accessToken = null
      state.refreshToken = null
    }
  }
})

export const {
  fetchUserData,
  fetchUserDataSuccess,
  fetchDataError,
  fetchUserLogout ,
  fetchFollowData,
  fetchFollowDataSuccess,
  addFollowPlayer,
  addFollowTeam,
  removeFollowPlayer,
  removeFollowTeam,
  fetchReUserData,
} = userSlice.actions
export default userSlice.reducer