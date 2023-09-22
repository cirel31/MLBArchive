import { call, put, takeLatest, CallEffect, PutEffect } from "@redux-saga/core/effects";
import axios, { AxiosResponse } from "axios";
import {
  fetchUserData, fetchUserDataSuccess, fetchDataError, fetchUserLogout,
  fetchFollowData, fetchFollowDataSuccess, fetchReUserDataSuccess,
  addFollowTeam, addFollowPlayer, fetchReUserData,
} from "@/app/redux/features/userSlice";
import {PayloadAction} from "@reduxjs/toolkit";
import {
  addPlayerFollowAPI, addTeamFollowAPI,
  fetchUserDataAPI,
  getReLoadDataAPI, LogoutAPI,
  userPlayerFollowAPI,
  userTeamFollowAPI
} from "@/app/redux/api/userAPI";

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
    if (response) {
      yield put(fetchReUserDataSuccess(response))
    }
  }
  catch (error) {
  }
}
function* fetchFollowDataSaga() {
  try {
    console.log('아니 왜 또 시발')
    const response1: FollowDataPayload = yield call(userTeamFollowAPI)
    const response2: FollowDataPayload = yield call(userPlayerFollowAPI)
    console.log(response1, response2)
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
      playerId: action.payload
    }
    const response: AxiosResponse<any> = yield call(addPlayerFollowAPI, data)
    console.log(response)
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
  const response: AxiosResponse<any> = yield call(LogoutAPI)
  if (response) {
    console.log("로그아웃 확인", response)
    sessionStorage.clear()
  }
}

export function* watchFetchUserData() {
  yield takeLatest(fetchUserData.type, fetchUserDataSaga)
  yield takeLatest(fetchUserLogout.type, fetchUserLogoutSaga)
  yield takeLatest(addFollowTeam.type, addFollowTeamSaga)
  yield takeLatest(addFollowPlayer.type, addFollowPlayerSaga)
  yield takeLatest(fetchReUserData.type, fetchReUserDataSaga)
  yield takeLatest(fetchFollowData.type, fetchFollowDataSaga)
}