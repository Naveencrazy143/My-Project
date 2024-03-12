import { createStore, applyMiddleware, compose, combineReducers } from 'redux';
import createSagaMiddleware from 'redux-saga';
import { AppReducer, AuthReducer } from '@Redux';
import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import DashboardReducer from '../Dashboard/Store/Reducer';
import { GuestReducer } from '../Guests';
import StudentReducer from '../Student/Store/Reducer';

import rootSaga from '../Sagas';

const persistConfig = {
  key: 'qunata-edat',
  storage,
}

const rootReducer = combineReducers({
  AppReducer,
  AuthReducer,
  DashboardReducer,
  GuestReducer,
  StudentReducer
});

const persistedReducer = persistReducer(persistConfig, rootReducer)

const sagaMiddleware = createSagaMiddleware();

const store = createStore(
  persistedReducer,
  {},
  compose(applyMiddleware(sagaMiddleware)),
);

let persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export { store, sagaMiddleware, rootSaga, persistor };