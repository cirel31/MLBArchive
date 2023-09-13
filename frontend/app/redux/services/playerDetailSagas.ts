import { call, put, takeLatest, CallEffect, PutEffect} from "@redux-saga/core/effects";
import axios from 'axios';
import {PayloadAction} from "@reduxjs/toolkit";
import {fetchPlayerDetailData, fetchPlayerDataSuccess, fetchPlayerDataError} from "@/app/redux/features/playerDetailSlice"


function* fetchPlayerDetailSaga(action: PayloadAction<string>): Generator<PutEffect | CallEffect, void, any> {
  try {
    // const response = yield call(axios.get, `/api/team/data/${action.payload}`, );
    // yield put(fetchPlayerDataSuccess(response.data));
    console.log("PD SAGA 테스트1")
  } catch (error) {
    yield put(fetchPlayerDataError(error as Error));
  }
}

export function* watchFetchPlayerDetailData() {
  yield takeLatest(fetchPlayerDetailData.type, fetchPlayerDetailSaga);
}
