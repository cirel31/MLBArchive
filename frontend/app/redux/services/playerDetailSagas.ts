import { call, put, takeLatest, CallEffect, PutEffect} from "@redux-saga/core/effects";
import {PayloadAction} from "@reduxjs/toolkit";
import {
  fetchPlayerDetailData,
  fetchPlayerDataSuccess,
  fetchPlayerDataError,
  fetchPlayerScoreDataSuccess,
} from "@/app/redux/features/playerDetailSlice"
import {
  fetchPlayerDetailDataAPI, fetchPlayerFieldingDataAPI,
  fetchPlayerHittingDataAPI,
  fetchPlayerPitchingDataAPI
} from "@/app/redux/api/playerAPI";
import Swal from "sweetalert2";

function* fetchPlayerDetailSaga(action: PayloadAction<any>): Generator<PutEffect | CallEffect, void, any> {
  try {
    const playerId = action.payload.playerId
    const season = action.payload.season
    const response = yield call(fetchPlayerDetailDataAPI, playerId);
    yield put(fetchPlayerDataSuccess(response.resultData));
    console.log("fetchPlayerDetailSaga 작동 확인")
    const response_hitting = yield call(fetchPlayerHittingDataAPI, playerId, season);
    const response_pitching = yield call(fetchPlayerPitchingDataAPI, playerId, season);
    const response_fielding = yield call(fetchPlayerFieldingDataAPI, playerId, season);
    const responseScore = {
      playerHitting : response_hitting.resultData,
      playerPitching : response_pitching.resultData,
      playerFielding : response_fielding.resultData,
    }
    yield put(fetchPlayerScoreDataSuccess(responseScore))
  } catch (error) {
    yield put(fetchPlayerDataError(error as Error));
  }
}

export function* watchFetchPlayerDetailData() {
  yield takeLatest(fetchPlayerDetailData.type, fetchPlayerDetailSaga);
}
