import { configureStore } from "@reduxjs/toolkit";
// import { persistStore, persistReducer } from 'redux-persist';
// import storageSession from 'redux-persist/lib/storage/session';
// import { createFilter } from 'redux-persist-transform-filter';
import createSagaMiddleware from "@redux-saga/core";
import rootSaga from "@/app/redux/services/rootSaga";
import userReducer from "./features/userSlice"
import searchTeamReducer from "./features/searchTeamSlice"
import playerDetailReducer from "./features/playerDetailSlice"
import searchPlayerReducer from "./features/searchPlayerSlice"
import matchReducer from "./features/matchSlice"
// redux-persist 삭제로 인한 해당 코드 주석처리
// const saveSubsetFilter = createFilter(
//   'user',
//   ['isLoading', 'userData', 'refreshToken', 'error']
// );
//
// const persistConfig = {
//   key: 'user',
//   storage: storageSession,
//   transforms: [saveSubsetFilter]
// };

// const persistedUserReducer = persistReducer(persistConfig, userReducer);


const sagaMiddleware = createSagaMiddleware()
const sessionSaverMiddleware = (store: any) => (next: any) => (action: any) => {
  let result = next(action);
  if (typeof window !== 'undefined') {
    const userState = store.getState().user.refreshToken;
    if (userState) {
      sessionStorage.setItem('refreshToken', JSON.stringify(userState));
    }
  }
  return result;
};

export const store = configureStore({
  reducer: {
    user: userReducer,
    searchTeam: searchTeamReducer,
    playerDetail: playerDetailReducer,
    searchPlayer: searchPlayerReducer,
    match: matchReducer,
  },
  devTools: process.env.NODE_ENV !== "production",
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .concat(sagaMiddleware)
      .concat(sessionSaverMiddleware)
})

sagaMiddleware.run(rootSaga)

export type RootState = ReturnType<typeof store.getState>

export type AppDispatch = typeof store.dispatch
// export const persistor = persistStore(store)
