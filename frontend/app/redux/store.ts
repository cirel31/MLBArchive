import { configureStore } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from 'redux-persist';
import storageSession from 'redux-persist/lib/storage/session';
import { createFilter } from 'redux-persist-transform-filter';
import counterReducer from "./features/counterSlice"
import userReducer from "./features/userSlice"
import { watchFetchUserData } from "@/app/redux/services/userSagas";
import createSagaMiddleware from "@redux-saga/core";

const saveSubsetFilter = createFilter(
  'user',
  ['isLoading', 'userData', 'refreshToken', 'error']
);

const persistConfig = {
  key: 'user',
  storage: storageSession,
  transforms: [saveSubsetFilter]
};

const persistedUserReducer = persistReducer(persistConfig, userReducer);
const sagaMiddleware = createSagaMiddleware()
export const store = configureStore({
  reducer: {
    counterReducer,
    user: persistedUserReducer
  },
  devTools: process.env.NODE_ENV !== "production",
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(sagaMiddleware)
})

sagaMiddleware.run(watchFetchUserData)
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
export const persistor = persistStore(store)
