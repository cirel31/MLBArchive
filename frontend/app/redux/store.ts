import { configureStore } from "@reduxjs/toolkit";
// import { persistStore, persistReducer } from 'redux-persist';
// import storageSession from 'redux-persist/lib/storage/session';
// import { createFilter } from 'redux-persist-transform-filter';
import counterReducer from "./features/counterSlice"
import userReducer from "./features/userSlice"
import searchReducer from "./features/searchTeamSlice"
import createSagaMiddleware from "@redux-saga/core";
import rootSaga from "@/app/redux/services/rootSaga";


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
    const userState = store.getState().user;
    if (userState) {
      sessionStorage.setItem('user', JSON.stringify(userState));
    }
  }
  return result;
};

export const store = configureStore({
  reducer: {
    counterReducer,
    user: userReducer,
    search: searchReducer,
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
