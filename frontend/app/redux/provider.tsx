'use client'
import {store} from "@/app/redux/store";
import { Provider } from "react-redux";
import React from "react";
import {PersistGate} from "redux-persist/integration/react";

export function Providers({children} : {children: React.ReactNode}) {
  return (
    <Provider store={store}>
      {/*<PersistGate loading={null} persistor={persistor}>*/}
        {children}
      {/*</PersistGate>*/}
    </Provider>
  )
}