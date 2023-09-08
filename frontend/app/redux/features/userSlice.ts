import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface UserData {
  id: number;
  nickname: string;
  email: string;
  profileImage: string;
  // 만약 서버에서 profileImage를 Bolb 객체로 준다면
  // profileImage: Blob;
}
interface UserState {
  isLoading: boolean;
  isLoggedIn: boolean;
  userData: UserData | null;
  accessToken: string | null;
  refreshToken: string | null;
  error: Error | null;
}

const initialState: UserState = {
  isLoading: true,
  isLoggedIn: false,
  userData: null,
  accessToken: null,
  refreshToken: null,
  error: null,
}

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    fetchUserData: (state, action: PayloadAction<string>) => {
      state.isLoading = true
    },
    fetchUserDataSuccess: (state, action: PayloadAction<{userData: UserData; accessToken: string; refreshToken: string}>) => {
      state.isLoading = false
      state.isLoggedIn = true
      state.userData = action.payload.userData
      state.accessToken = action.payload.accessToken
      state.refreshToken = action.payload.refreshToken
    },
    fetchUserDataError: (state, action: PayloadAction<Error>) => {
      state.isLoading = false
      state.error = action.payload
    },
    fetchUserLogout: (state) => {
      state.isLoggedIn = false
      state.userData = null
      state.accessToken = null
      state.refreshToken = null
    }
  }
})

export const { fetchUserData, fetchUserDataSuccess, fetchUserDataError, fetchUserLogout } = userSlice.actions
export default userSlice.reducer