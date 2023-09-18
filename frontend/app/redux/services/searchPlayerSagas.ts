import { call, put, takeLatest, CallEffect, PutEffect} from "@redux-saga/core/effects";
import axios from 'axios';
import {PayloadAction} from "@reduxjs/toolkit";
import {
  fetchPlayerWordData, fetchPlayerWordDataSuccess,
  fetchPlayerLetterData, fetchPlayerLetterDataSuccess,
  fetchPlayerDataError
} from "@/app/redux/features/searchPlayerSlice"
import {fetchPlayerLetterDataAPI, fetchPlayerWordDataAPI} from "@/app/redux/api/playerAPI";


function* fetchPlayerWordDataSaga(action: PayloadAction<any>): Generator<PutEffect | CallEffect, void, any> {
  try {
    const {searchData, nowPage, articlePerPage } = action.payload
    console.log(searchData, nowPage, articlePerPage)
    // const response = yield call(fetchPlayerWordDataAPI, searchData, nowPage, articlePerPage);
    console.log("Player List SAGA 테스트1")
    // yield put(fetchPlayerWordDataSuccess(response));
  } catch (error) {
    yield put(fetchPlayerDataError(error as Error));
  }
}

function* fetchPlayerLetterDataSaga(action: PayloadAction<any>): Generator<PutEffect | CallEffect, void, any> {
  try {
    const {searchData, nowPage, articlePerPage } = action.payload
    console.log("Player 초성 검색 로직 확인 중 : ", action.payload)
    // const response = yield call(fetchPlayerLetterDataAPI, searchData, nowPage, articlePerPage)
    // yield put(fetchPlayerLetterDataSuccess(response));
  } catch (error) {
    yield put(fetchPlayerDataError(error as Error));
  }
}
export function* watchFetchPlayerListData() {
  yield takeLatest(fetchPlayerWordData.type, fetchPlayerWordDataSaga);
  yield takeLatest(fetchPlayerLetterData.type, fetchPlayerLetterDataSaga);
}
