import { all, fork } from 'redux-saga/effects';

import AppSaga from '../App/Saga';
import AuthSaga from '../Auth/Saga';
import DashboardSaga from '../Dashboard/Saga';
import GuestSaga from '../Guests/Saga';
import StudentSaga from '../Student/Saga';


export default function* rootSaga() {
  yield all([fork(AppSaga)]);
  yield all([fork(AuthSaga)]);
  yield all([fork(DashboardSaga)]);
  yield all([fork(GuestSaga)]);
  yield all([fork(StudentSaga)]);

}
