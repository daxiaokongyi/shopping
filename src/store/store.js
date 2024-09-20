import { compose, createStore, applyMiddleware } from "redux";
import { persistStore, persistReducer } from "redux-persist";
import { rootReducer } from "./rootReducer";
import storage from "redux-persist/lib/storage";
// import { loggerMiddleware } from "./midddleware/logger";
import logger from "redux-logger";
// import { thunk } from "redux-thunk";
import createSagaMiddleware from 'redux-saga';
import { rootSaga } from "./root-saga";

const persistConfig = {
  key: 'root',
  storage,
  // blacklist: ['user']
  whitelist: ['cart']
}

const sagaMidddleware = createSagaMiddleware();

const persisedReducer = persistReducer(persistConfig, rootReducer);

// const middleWares = [process.env.NODE_ENV === 'development' && logger, thunk].filter(Boolean);
const middleWares = [
  process.env.NODE_ENV === 'development' && logger, 
  sagaMidddleware
].filter(Boolean);

// const middleWares = [loggerMiddleware];

// const thunkMiddleware = (store) => (next) => (action) => {
//   if (typeof(action) === 'function') {
//     action(dispatch);
//   }
// }

const composedEnhancer = 
  (process.env.NODE_ENV !== 'production' && 
    window && 
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) ||
  compose;

// const composedEnhancers = compose(applyMiddleware(...middleWares));
const composedEnhancers = composedEnhancer(applyMiddleware(...middleWares));
export const store = createStore(
  persisedReducer, 
  undefined, 
  composedEnhancers
);

sagaMidddleware.run(rootSaga);

export const persistor = persistStore(store);
