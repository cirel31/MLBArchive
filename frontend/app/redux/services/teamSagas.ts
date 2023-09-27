import { call, put, takeLatest, CallEffect, PutEffect} from "@redux-saga/core/effects";
import {PayloadAction} from "@reduxjs/toolkit";
import {
  teamDetailData, teamDetailDataSuccess,
  teamStatData, teamStatDataSuccess,
  teamRosterData, teamRosterDataSuccess
} from "@/app/redux/features/teamSlice"
import {fetchTeamDetailDataAPI, fetchTeamRosterDataAPI, fetchTeamStatDataAPI} from "@/app/redux/api/teamAPI";


function* fetchTeamDataSaga(action: PayloadAction<string>): Generator<PutEffect | CallEffect, void, any> {
  try {
    const id = action.payload
    const response = yield call(fetchTeamDetailDataAPI, id);
    yield put(teamDetailDataSuccess(response.resultData));
  } catch (error) {
  }
}

function* fetchTeamStatDataSaga(action: PayloadAction<any>): Generator<PutEffect | CallEffect, void, any> {
  try {
    const id = action.payload.id
    const season = action.payload.season
    const response = yield call(fetchTeamStatDataAPI, id, season);
    console.log(response)
    yield put(teamStatDataSuccess(response.resultData));
  } catch (error) {
  }
}

function* fetchTeamRosterDataSaga(action: PayloadAction<any>): Generator<PutEffect | CallEffect, void, any> {
  try {
    const id = action.payload.id
    const season = action.payload.season
    const response = yield call(fetchTeamRosterDataAPI, id, season);
    console.log(response)
    yield put(teamRosterDataSuccess(response.resultData));
  } catch (error) {
  }
}
export function* watchFetchTeamData() {
  yield takeLatest(teamDetailData.type, fetchTeamDataSaga);
  yield takeLatest(teamStatData.type, fetchTeamStatDataSaga);
  yield takeLatest(teamRosterData.type, fetchTeamRosterDataSaga);
}
