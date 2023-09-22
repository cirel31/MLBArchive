import { call, put, takeLatest, CallEffect, PutEffect} from "@redux-saga/core/effects";
import axios from 'axios';
import {PayloadAction} from "@reduxjs/toolkit";
import {teamDetailData, teamDetailDataSuccess} from "@/app/redux/features/teamSlice"
import {fetchTeamDetailDataAPI} from "@/app/redux/api/teamAPI";


function* fetchTeamDataSaga(action: PayloadAction<string>): Generator<PutEffect | CallEffect, void, any> {
  try {
    const id = action.payload
    const response = yield call(fetchTeamDetailDataAPI, id);
    console.log(response)
    // yield put(teamDetailDataSuccess(response.data));
  } catch (error) {
  }
}

export function* watchFetchTeamData() {
  yield takeLatest(teamDetailData.type, fetchTeamDataSaga);
}
