import { createSlice, PayloadAction } from "@reduxjs/toolkit";

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
    },
    fetchReUserData: (state) => {
    },
    fetchUserDataSuccess: (state, action: PayloadAction<any>) => {
      console.log(action.payload)
      const email = action.payload.email
      const nickname = action.payload.nickname
      const image = action.payload.profileImage
      const userId = email.split('@')[0]
      state.isLoading = false
      state.isLoggedIn = true
      state.userData = {
        userId: userId,
        email: email,
        nickname: nickname,
        image: image ?? 'defaultImg'
      }
      state.accessToken = action.payload.accessToken
      state.refreshToken = action.payload.refreshToken
      console.log(state.isLoggedIn)
    },
    fetchReUserDataSuccess: (state, action) => {
      const email = action.payload.resultData.email
      const nickname = action.payload.resultData.nickname
      const image = action.payload.resultData.profileImage
      const userId = email.split('@')[0]
      state.isLoading = false
      state.isLoggedIn = true
      state.userData = {
        userId: userId,
        email: email,
        nickname: nickname,
        image: image ?? 'defaultImg'
      }
      state.accessToken = action.payload.resultData.accessToken
      state.refreshToken = action.payload.resultData.refreshToken
    },
    fetchDataError: (state, action: PayloadAction<Error>) => {
    },
    fetchFollowData: () => {
    },
    fetchFollowDataSuccess: (state, action: PayloadAction<any>) => {
      state.followList = action.payload
    },
    addFollowPlayer: (state, action: PayloadAction<any>) => {

    },
    addFollowTeam: (state, action: PayloadAction<any>) => {

    },
    fetchUserLogout: (state) => {

    },
    successUserLogout: (state) => {
      state.isLoggedIn = false
      state.userData = null
      state.accessToken = null
      state.refreshToken = null
    },
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
  fetchReUserData,
  fetchReUserDataSuccess,
  successUserLogout,
} = userSlice.actions
export default userSlice.reducer