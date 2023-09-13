import { call, put, takeLatest, CallEffect, PutEffect} from "@redux-saga/core/effects";
import axios from 'axios';
import {PayloadAction} from "@reduxjs/toolkit";
import {fetchPlayerListData, fetchPlayerListDataError, fetchPlayerListDataSuccess} from "@/app/redux/features/searchPlayerSlice"


function* fetchPlayerDataSaga(action: PayloadAction<string>): Generator<PutEffect | CallEffect, void, any> {
  try {
    // 테스트 데이터 삽입
    const response = [
      {id: 1, name: '박찬호'},
      {id: 2, name: '류현진'},
      {id: 3, name: '이승엽'},
    ]
    // const response = yield call(axios.get, `/api/player/data/${action.payload}`, );
    console.log("Player List SAGA 테스트1")
    yield put(fetchPlayerListDataSuccess(response));
  } catch (error) {
    yield put(fetchPlayerListDataError(error as Error));
  }
}

export function* watchFetchPlayerListData() {
  yield takeLatest(fetchPlayerListData.type, fetchPlayerDataSaga);
}
