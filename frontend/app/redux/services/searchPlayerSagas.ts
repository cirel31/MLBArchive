import { call, put, takeLatest, CallEffect, PutEffect} from "@redux-saga/core/effects";
import axios from 'axios';
import {PayloadAction} from "@reduxjs/toolkit";
import {
  fetchPlayerWordData, fetchPlayerWordDataSuccess,
  fetchPlayerLetterData, fetchPlayerLetterDataSuccess,
  fetchPlayerDataError, pageCheck
} from "@/app/redux/features/searchPlayerSlice"
import {fetchPlayerLetterDataAPI, fetchPlayerWordDataAPI} from "@/app/redux/api/playerAPI";
import Swal from "sweetalert2";

interface PlayerDataPayload {
  status: number
  message: string
  resultData: any
}

function* fetchPlayerWordDataSaga(action: PayloadAction<any>): Generator<PutEffect | CallEffect, void, any> {
  try {
    const {searchData, nowPage, articlePerPage } = action.payload
    const response:PlayerDataPayload = yield call(fetchPlayerWordDataAPI, searchData, nowPage, articlePerPage);
    if (response.resultData) {
      yield put(fetchPlayerWordDataSuccess(response.resultData.content));
      yield put(pageCheck(response.resultData.totalPages));
    }
    else {
      Swal.fire(response.message)
      yield put(fetchPlayerWordDataSuccess(response.resultData));
      yield put(pageCheck(1))
    }

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
