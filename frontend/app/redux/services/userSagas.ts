import { call, put, takeLatest, CallEffect, PutEffect } from "@redux-saga/core/effects";
import axios, { AxiosResponse } from "axios";
import {
  fetchUserData, fetchUserDataSuccess, fetchDataError, fetchUserLogout,
  fetchFollowData, fetchFollowDataSuccess,
  addFollowTeam, addFollowPlayer, fetchReUserData,
} from "@/app/redux/features/userSlice";
import {PayloadAction} from "@reduxjs/toolkit";
import {
  addPlayerFollowAPI, addTeamFollowAPI,
  fetchUserDataAPI,
  getReLoadDataAPI,
  userPlayerFollowAPI,
  userTeamFollowAPI
} from "@/app/redux/api/userAPI";

const baseURL = process.env.NEXT_PUBLIC_SERVER_BASE_URL
const oauthURL = process.env.NEXT_PUBLIC_OAUTH_SERVER_URL
const loginURL = process.env.NEXT_PUBLIC_SERVER_LOGIN_URL
const logoutURL = process.env.NEXT_PUBLIC_SERVER_LOGOUT_URL
const followTeamURL = ''
const followPlayerURL = ''

// ./features/userSlice.ts
interface UserData {
  id: number;
  nickname: string;
  email: string;
  profileImage: string;
  followList: any;
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
interface FollowDataPayload {
  status: number
  message: string
  resultData: any
}
function* fetchUserDataSaga(action: PayloadAction<FetchUserDataPayload>): Generator<CallEffect | PutEffect, void, AxiosResponse<FetchUserDataResponse>> {
  try {
    const code = action.payload.code
    const state = action.payload.state
    const kind = action.payload.kind
    const response: AxiosResponse<any> = yield call(fetchUserDataAPI, code, state, kind)
    if (response.data) {
      yield put(fetchUserDataSuccess(response.data))
      yield put(fetchFollowData())
    }
  }
  catch (error) {
    yield put(fetchDataError(error as Error))
  }
}
function* fetchReUserDataSaga() {
  try {
    const response: AxiosResponse<any> = yield call(getReLoadDataAPI)
    console.log(response)
    if (response) {
      yield put(fetchUserDataSuccess(response))
    }
  }
  catch (error) {
  }
}
function* fetchFollowDataSaga() {
  try {
    const response1: FollowDataPayload = yield call(userTeamFollowAPI)
    const response2: FollowDataPayload = yield call(userPlayerFollowAPI)
    const response = {
      TeamList: response1.resultData,
      PlayerList: response2.resultData,
    }
    if (response) {
      yield put(fetchFollowDataSuccess(response))
    }
  }
  catch (error) {
  }
}

function* addFollowPlayerSaga(action: PayloadAction<any>): Generator<CallEffect | PutEffect, void, AxiosResponse<FetchUserDataResponse>> {
  try {
    const data = {
      playerId: action.payload.playerId
    }
    const response: AxiosResponse<any> = yield call(addPlayerFollowAPI, data)
    if (response) {
      yield call(fetchFollowDataSaga);
    }
  }
  catch (error) {
  }
}
function* addFollowTeamSaga(action: PayloadAction<any>): Generator<CallEffect | PutEffect, void, AxiosResponse<FetchUserDataResponse>> {
  try {
    const data = {
      teamId: action.payload.teamId
    }
    const response: AxiosResponse<any> = yield call(addTeamFollowAPI, data)
    if (response) {
      yield call(fetchFollowDataSaga);
    }
  }
  catch (error) {
  }
}

function* fetchUserLogoutSaga(): Generator<CallEffect | PutEffect, void, AxiosResponse<FetchUserDataResponse>> {
  // const response: AxiosResponse<any> = yield call(apiGet.get,`${logoutURL}`)
  console.log("로그아웃 확인")
}

export function* watchFetchUserData() {
  yield takeLatest(fetchUserData.type, fetchUserDataSaga)
  yield takeLatest(fetchUserLogout.type, fetchUserLogoutSaga)
  yield takeLatest(addFollowTeam.type, addFollowTeamSaga)
  yield takeLatest(addFollowPlayer.type, addFollowPlayerSaga)
  yield takeLatest(fetchReUserData.type, fetchReUserDataSaga)
  yield takeLatest(fetchFollowData.type, fetchFollowDataSaga)
}