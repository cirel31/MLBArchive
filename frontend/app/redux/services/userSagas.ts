import { call, put, takeLatest, CallEffect, PutEffect } from "@redux-saga/core/effects";
import axios, { AxiosResponse } from "axios";
import { fetchUserData, fetchUserDataSuccess, fetchUserDataError, fetchUserLogout } from "@/app/redux/features/userSlice";
import {PayloadAction} from "@reduxjs/toolkit";

const baseURL = process.env.NEXT_PUBLIC_SERVER_BASE_URL
const loginURL = process.env.NEXT_PUBLIC_SERVER_LOGIN_URL
const logoutURL = process.env.NEXT_PUBLIC_SERVER_LOGOUT_URL

// ./features/userSlice.ts
interface UserData {
  id: number;
  nickname: string;
  email: string;
  profileImage: string;
}

interface FetchUserDataResponse {
  userData: UserData
  accessToken: string
  refreshToken: string
}

function* fetchUserDataSaga(action: PayloadAction<string>): Generator<CallEffect | PutEffect, void, AxiosResponse<FetchUserDataResponse>> {
  try {
    const code = action.payload
    yield put(fetchUserData(code))
    const response: AxiosResponse<FetchUserDataResponse> = yield call(axios.get,`${baseURL}${loginURL}?code=${code}`)
    if (response.data) {
      yield put(fetchUserDataSuccess(response.data))
    }
  }
  catch (error) {
    yield put(fetchUserDataError(error as Error))
  }
}

function* fetchUserLogoutSaga(): Generator<CallEffect | PutEffect, void, AxiosResponse<FetchUserDataResponse>> {
  yield put(fetchUserLogout())
  const response: AxiosResponse<FetchUserDataResponse> = yield call(axios.get,`${baseURL}${logoutURL}`)
}

export function* watchFetchUserData() {
  yield takeLatest(fetchUserData.type, fetchUserDataSaga)
  yield takeLatest(fetchUserLogout.type, fetchUserLogoutSaga)
}