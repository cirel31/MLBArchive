import { call, put, takeLatest, CallEffect, PutEffect} from "@redux-saga/core/effects";
import axios from 'axios';
import {PayloadAction} from "@reduxjs/toolkit";
import {
  fetchPlayerWordData, fetchPlayerWordDataSuccess,
  fetchPlayerLetterData, fetchPlayerLetterDataSuccess,
  fetchPlayerDataError
} from "@/app/redux/features/searchPlayerSlice"
import {fetchPlayerLetterDataAPI, fetchPlayerWordDataAPI} from "@/app/redux/api/playerAPI";

interface PlayerDataPayload {
  status: number
  message: string
  resultData: any
}

function* fetchPlayerWordDataSaga(action: PayloadAction<any>): Generator<PutEffect | CallEffect, void, any> {
  try {
    const {searchData, nowPage, articlePerPage } = action.payload
    const response:PlayerDataPayload = yield call(fetchPlayerWordDataAPI, searchData, nowPage, articlePerPage);
    yield put(fetchPlayerWordDataSuccess(response.resultData));
  } catch (error) {
    yield put(fetchPlayerDataError(error as Error));
  }
}

function* fetchPlayerLetterDataSaga(action: PayloadAction<any>): Generator<PutEffect | CallEffect, void, any> {
  try {
    const {searchData, nowPage, articlePerPage } = action.payload
    const response:PlayerDataPayload = yield call(fetchPlayerLetterDataAPI, searchData, nowPage, articlePerPage)
    yield put(fetchPlayerLetterDataSuccess(response.resultData));
  } catch (error) {
    yield put(fetchPlayerDataError(error as Error));
  }
}
export function* watchFetchPlayerListData() {
  yield takeLatest(fetchPlayerWordData.type, fetchPlayerWordDataSaga);
  yield takeLatest(fetchPlayerLetterData.type, fetchPlayerLetterDataSaga);
}
