
import { combineReducers, configureStore } from '@reduxjs/toolkit'

import logger from 'redux-logger'

import TodoReducer from "./todos";
import UIReducer from "./ui";
import UserReducer from './user'


import {
  persistStore,
  persistReducer,
} from 'redux-persist'
import storage from 'redux-persist/lib/storage'

const persistConfig = {
  key: 'WowAI',
  storage,
}

const rootReducer = combineReducers({
    TodoReducer,
    UIReducer,
    UserReducer
})

const persistedReducer = persistReducer(persistConfig, rootReducer)

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware({ serializableCheck: false }).concat(logger),
  devTools: true,
})

export const persistor = persistStore(store)


export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
