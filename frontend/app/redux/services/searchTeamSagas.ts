import { call, put, takeLatest, CallEffect, PutEffect} from "@redux-saga/core/effects";
import axios from 'axios';
import {PayloadAction} from "@reduxjs/toolkit";
import {fetchTeamDataSuccess, fetchTeamDataError, fetchTeamDataRequest} from "@/app/redux/features/searchTeamSlice"


function* fetchTeamDataSaga(action: PayloadAction<string>): Generator<PutEffect | CallEffect, void, any> {
  try {
    const response = yield call(axios.get, `/api/team/data/${action.payload}`, );
    yield put(fetchTeamDataSuccess(response.data));
    console.log("SAGA 테스트1")
  } catch (error) {
    yield put(fetchTeamDataError(error as Error));
  }
}

export function* watchFetchTeamData() {
  yield takeLatest(fetchTeamDataRequest.type, fetchTeamDataSaga);
}
