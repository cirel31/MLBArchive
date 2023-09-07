import { call, put, takeLatest, CallEffect, PutEffect } from "@redux-saga/core/effects";
import axios, { AxiosResponse } from "axios";
import { fetchUserData, fetchUserDataSuccess, fetchUserDataError } from "@/app/redux/features/userSlice";
import {PayloadAction} from "@reduxjs/toolkit";

const baseURL = ''
const subURL = ''

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
}

function* fetchUserDataSaga(action: PayloadAction<string>): Generator<CallEffect | PutEffect, void, AxiosResponse<FetchUserDataResponse>> {
  try {
    const code = action.payload
    yield put(fetchUserData(code))
    const response: AxiosResponse<FetchUserDataResponse> = yield call(axios.get,`${baseURL}${subURL}?code=${code}`)
    if (response.data) {
      yield put(fetchUserDataSuccess(response.data))
    }
  }
  catch (error) {
    yield put(fetchUserDataError(error as Error))
  }
}

export function* watchFetchUserData() {
  yield takeLatest(fetchUserData.type, fetchUserDataSaga)
}