import { call, put, takeLatest, CallEffect, PutEffect} from "@redux-saga/core/effects";
import axios from 'axios';
import {PayloadAction} from "@reduxjs/toolkit";
import {
  fetchPlayerWordData, fetchPlayerWordDataSuccess,
  fetchPlayerLetterData, fetchPlayerLetterDataSuccess,
  fetchPlayerDataError
} from "@/app/redux/features/searchPlayerSlice"


function* fetchPlayerWordDataSaga(action: PayloadAction<string>): Generator<PutEffect | CallEffect, void, any> {
  try {
    // 테스트 데이터 삽입
    const response = [
      {id: 1, name: '박찬호'},
      {id: 2, name: '류현진'},
      {id: 3, name: '이승엽'},
    ]
    // const response = yield call(axios.get, `/api/player/data/${action.payload}`, );
    console.log("Player List SAGA 테스트1")
    yield put(fetchPlayerWordDataSuccess(response));
  } catch (error) {
    yield put(fetchPlayerDataError(error as Error));
  }
}

function* fetchPlayerLetterDataSaga(action: PayloadAction<string>): Generator<PutEffect | CallEffect, void, any> {
  try {
    // 테스트 데이터 삽입
    const response = [
      {id: 1, name: '이강희', team: 'SSAFY', number: '24'},
      {id: 2, name: '안동준', team: 'SSAFY', number: '33'},
      {id: 3, name: '이승엽', team: 'SSAFY', number: '22'},
    ]
    // const response = yield call(axios.get, `/api/player/data/${action.payload}`, );
    console.log("Player 초성 검색 로직 확인 중 : ", action.payload)
    yield put(fetchPlayerLetterDataSuccess(response));
  } catch (error) {
    yield put(fetchPlayerDataError(error as Error));
  }
}
export function* watchFetchPlayerListData() {
  yield takeLatest(fetchPlayerWordData.type, fetchPlayerWordDataSaga);
  yield takeLatest(fetchPlayerLetterData.type, fetchPlayerLetterDataSaga);
}
