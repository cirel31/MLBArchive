import { all } from 'redux-saga/effects';
import {watchFetchTeamData} from './teamSagas';
import {watchFetchUserData} from './userSagas';
import {watchFetchPlayerDetailData} from "@/app/redux/services/playerDetailSagas";
import {watchFetchPlayerListData} from "@/app/redux/services/searchPlayerSagas";
import {watchMatchData} from "@/app/redux/services/matchSagas";

export default function* rootSaga() {
  yield all([
    watchFetchTeamData(),
    watchFetchUserData(),
    watchFetchPlayerDetailData(),
    watchFetchPlayerListData(),
    watchMatchData(),
  ]);
}
