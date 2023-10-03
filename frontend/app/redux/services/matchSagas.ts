import { call, put, takeLatest, CallEffect, PutEffect} from "@redux-saga/core/effects";
import axios, {AxiosResponse} from 'axios';
import {PayloadAction} from "@reduxjs/toolkit";
import {
  requestMatchData, successMatchData, requestDetailMatchData, successDetailMatchData, successMatchLineScore,
  errorMatchData, errorDetailMatchData, pageCheck
} from "@/app/redux/features/matchSlice"
import {matchDataAPI, matchDetailDataAPI, matchLineScoreAPI} from "@/app/redux/api/matchAPI";

interface MatchDataPayload {
  status: number
  message: string
  resultData: any
}
function* requestMatchDataSaga(action: PayloadAction<any>) {
  try {
    const {teamName, start, end, nowPage, articlePerPage} = action.payload
    const response: MatchDataPayload = yield call(matchDataAPI, teamName, start, end, nowPage, articlePerPage)
    if (response?.resultData) {
      yield put(successMatchData(response.resultData.content))
      yield put(pageCheck(response.resultData.totalPages));
    }
    else {
      yield put(pageCheck(1))
    }
  }
  catch (error) {

  }
}

function* requestMatchDetailDataSaga(action: PayloadAction<any>) {
  try {
    const teamId = action.payload
    const response: MatchDataPayload = yield call(matchDetailDataAPI, teamId)
    if (response?.resultData) {
      yield put(successDetailMatchData(response.resultData))
    }
    const response2: MatchDataPayload = yield call(matchLineScoreAPI, teamId)
    if (response2?.resultData) {
      yield put(successMatchLineScore(response2.resultData))
    }

  }
  catch (error) {

  }
}

export function* watchMatchData() {
  yield takeLatest(requestMatchData.type, requestMatchDataSaga)
  yield takeLatest(requestDetailMatchData.type, requestMatchDetailDataSaga)
}