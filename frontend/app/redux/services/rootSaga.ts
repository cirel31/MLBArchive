import { all } from 'redux-saga/effects';
import {watchFetchTeamData} from './searchTeamSagas';
import {watchFetchUserData} from './userSagas';
import {watchFetchPlayerDetailData} from "@/app/redux/services/playerDetailSagas";
import {watchFetchPlayerListData} from "@/app/redux/services/searchPlayerSagas";

export default function* rootSaga() {
  yield all([
    watchFetchTeamData(),
    watchFetchUserData(),
    watchFetchPlayerDetailData(),
    watchFetchPlayerListData(),
  ]);
}
