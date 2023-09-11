import { all } from 'redux-saga/effects';
import {watchFetchTeamData} from './searchTeamSagas';
import {watchFetchUserData} from './userSagas';

export default function* rootSaga() {
  yield all([
    watchFetchTeamData(),
    watchFetchUserData(),
    
  ]);
}
