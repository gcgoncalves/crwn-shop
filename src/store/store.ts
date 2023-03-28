import { 
  compose, 
  createStore, 
  applyMiddleware, 
  Middleware
} from "redux"
import { persistStore, persistReducer } from 'redux-persist'
import storage from "redux-persist/lib/storage"
import logger from 'redux-logger'
import { rootReducer } from "./root-reducer"
import thunk from "redux-thunk"

const persistConfig = {
  key: 'root',
  storage: storage,
  blacklist: ['user']
}

const persistedReducer = persistReducer(persistConfig, rootReducer)

const middlewares = [
  process.env.NODE_ENV !== 'production' && logger,
  thunk,
].filter(Boolean) as Middleware[]

const composeEnhancers = compose(applyMiddleware(...middlewares))

export const store = createStore(persistedReducer, undefined, composeEnhancers)

export const persistor = persistStore(store) 

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch