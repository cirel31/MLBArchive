import { call, put, takeLatest, CallEffect, PutEffect} from "@redux-saga/core/effects";
import axios from 'axios';
import {PayloadAction} from "@reduxjs/toolkit";
import {fetchPlayerDetailData, fetchPlayerDataSuccess, fetchPlayerDataError} from "@/app/redux/features/playerDetailSlice"

const baseURL = process.env.NEXT_PUBLIC_SERVER_BASE_URL
const DATA_URL_INFO = '/api/player/detail'
const DATA_URL_HITTING = '/api/hitting/detail'
const DATA_URL_PITCHING  = '/api/pitching/detail'
const DATA_URL_FIELDING = '/api/fielding/detail'

function* fetchPlayerDetailSaga(action: PayloadAction<any>): Generator<PutEffect | CallEffect, void, any> {
  try {
    const playerId = action.payload.playerId
    const season = action.payload.season
    console.log(`${baseURL}${DATA_URL_INFO}/${playerId}`)
    console.log(`${baseURL}${DATA_URL_HITTING}?playerId=${playerId}&season=${season}`)
    console.log(`${baseURL}${DATA_URL_PITCHING}?playerId=${playerId}&season=${season}`,)
    console.log(`${baseURL}${DATA_URL_FIELDING}?playerId=${playerId}&season=${season}`,)
    const response_info = yield call(axios.get, `${baseURL}${DATA_URL_INFO}/${playerId}`, );
    const response_hitting = yield call(axios.get, `${baseURL}${DATA_URL_HITTING}?playerId=${playerId}&season=${season}`, );
    const response_pitching = yield call(axios.get, `${baseURL}${DATA_URL_PITCHING}?playerId=${playerId}&season=${season}`, );
    const response_fielding = yield call(axios.get, `${baseURL}${DATA_URL_FIELDING}?playerId=${playerId}&season=${season}`, );

    const response = {
      info: response_info,
      hitting: response_hitting,
      pitching: response_pitching,
      fielding: response_fielding,
    }

    yield put(fetchPlayerDataSuccess(response));
    console.log("PD SAGA 테스트1")
  } catch (error) {
    yield put(fetchPlayerDataError(error as Error));
  }
}

export function* watchFetchPlayerDetailData() {
  yield takeLatest(fetchPlayerDetailData.type, fetchPlayerDetailSaga);
}
