import { call, put, takeLatest, CallEffect, PutEffect } from "@redux-saga/core/effects";
import axios, { AxiosResponse } from "axios";
import { fetchUserData, fetchUserDataSuccess, fetchUserDataError, fetchUserLogout } from "@/app/redux/features/userSlice";
import {PayloadAction} from "@reduxjs/toolkit";

const baseURL = process.env.NEXT_PUBLIC_SERVER_BASE_URL
const oauthURL = process.env.NEXT_PUBLIC_OAUTH_SERVER_URL
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
interface FetchUserDataPayload {
  code: string;
  state: string;
  kind: string
}
function* fetchUserDataSaga(action: PayloadAction<FetchUserDataPayload>): Generator<CallEffect | PutEffect, void, AxiosResponse<FetchUserDataResponse>> {
  try {
    const code = action.payload.code
    const state = action.payload.state
    const kind = action.payload.kind
    // const accessKey = {
    //   code : code,
    //   state : state,
    //   kind : kind,
    // }
    // yield put(fetchUserData(accessKey))
    const response: AxiosResponse<FetchUserDataResponse> = yield call(axios.get,`${baseURL}${oauthURL}${kind}?code=${code}?state=${state}`)
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