import { call, put, takeLatest, CallEffect, PutEffect} from "@redux-saga/core/effects";
import {PayloadAction} from "@reduxjs/toolkit";
import {
  fetchPlayerDetailData,
  fetchPlayerDataSuccess,
  fetchPlayerDataError,
  fetchPlayerHittingDataSuccess,
  fetchPlayerPitchingDataSuccess,
  fetchPlayerFieldingDataSuccess,
  fetchPlayerSeasonDetailData
} from "@/app/redux/features/playerDetailSlice"
import {
  fetchPlayerDetailDataAPI, fetchPlayerFieldingDataAPI,
  fetchPlayerHittingDataAPI,
  fetchPlayerPitchingDataAPI
} from "@/app/redux/api/playerAPI";

function* fetchPlayerDetailSaga(action: PayloadAction<any>): Generator<PutEffect | CallEffect, void, any> {
  try {
    const playerId = action.payload.playerId
    const response_info = yield call(fetchPlayerDetailDataAPI, playerId);
    yield put(fetchPlayerDataSuccess(response_info));
    console.log("fetchPlayerDetailSaga 작동 확인")
  } catch (error) {
    yield put(fetchPlayerDataError(error as Error));
  }
}

function* fetchPlayerSeasonDetailSaga(action: PayloadAction<any>): Generator<PutEffect | CallEffect, void, any> {
  try {
    const playerId = action.payload.playerId
    const season = action.payload.season
    const response_hitting = yield call(fetchPlayerHittingDataAPI, playerId, season);
    const response_pitching = yield call(fetchPlayerPitchingDataAPI, playerId, season);
    const response_fielding = yield call(fetchPlayerFieldingDataAPI, playerId, season);
    yield put(fetchPlayerHittingDataSuccess(response_hitting));
    yield put(fetchPlayerPitchingDataSuccess(response_pitching));
    yield put(fetchPlayerFieldingDataSuccess(response_fielding));
    console.log("시즌 별 정보 작동 확인")
  } catch (error) {
    yield put(fetchPlayerDataError(error as Error));
  }
}

export function* watchFetchPlayerDetailData() {
  yield takeLatest(fetchPlayerDetailData.type, fetchPlayerDetailSaga);
  yield takeLatest(fetchPlayerSeasonDetailData.type, fetchPlayerSeasonDetailSaga);
}
