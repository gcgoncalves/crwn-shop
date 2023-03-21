import { 
  compose, 
  createStore, 
  applyMiddleware, 
  Middleware 
} from "redux"
import { persistStore, persistReducer } from 'redux-persist'
import storage from "redux-persist/lib/storage";
import logger from 'redux-logger'
import { rootReducer } from "./root-reducer";

const persistConfig = {
  key: 'root',
  storage: storage,
  blacklist: ['user']
}

const persistedReducer = persistReducer(persistConfig, rootReducer)

const middlewares = [] as Middleware[]
if (process.env.NODE_ENV !== 'production'){
  middlewares.push(logger)
}

const composeEnhancers = compose(applyMiddleware(...middlewares))

export const store = createStore(persistedReducer, undefined, composeEnhancers)

export const persistor = persistStore(store) 