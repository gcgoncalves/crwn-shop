import { 
  compose, 
  createStore, 
  applyMiddleware, 
  Middleware, 
  Dispatch
} from "redux"
import { persistStore, persistReducer } from 'redux-persist'
import storage from "redux-persist/lib/storage"
import logger from 'redux-logger'
import { rootReducer } from "./root-reducer"
// import thunk from "redux-thunk"
import createSagaMiddleware from "@redux-saga/core"

import { rootSaga } from "./saga";

const persistConfig = {
  key: 'root',
  storage: storage,
  blacklist: ['user']
}

const persistedReducer = persistReducer(persistConfig, rootReducer)
const sagaMiddleware = createSagaMiddleware()

const middlewares = [
  process.env.NODE_ENV !== 'production' && logger,
  // thunk,
  sagaMiddleware,
].filter(Boolean) as Middleware[]

const composeEnhancers = compose(applyMiddleware(...middlewares))

export const store = createStore(persistedReducer, undefined, composeEnhancers)

export const persistor = persistStore(store) 
sagaMiddleware.run(rootSaga)

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch