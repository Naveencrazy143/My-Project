import { takeLatest, put, call } from 'redux-saga/effects';

import {
    webAppConfigApi,
    getNotificationsApi,
} from '@Services'

import { sagaErrorHandler } from '@Utils';

import {
    hideLoader,
    showLoader,
    WEB_APP_CONFIG,
    webAppConfigSuccess,
    webAppConfigFailure,
    GET_NOTIFICATIONS,
    getNotificationsSuccess,
    getNotificationsFailure,
} from '@Redux';

//we app config saga

function* webAppConfigSaga(action) {
    try {
        yield put(showLoader());
        const response = yield call(webAppConfigApi, action.payload.params);
        console.log("webappconfigresponse------->", response);
        if (response.success) {
            yield put(hideLoader());
            yield put(webAppConfigSuccess({ ...response.details }));
            yield call(action.payload.onSuccess(response));
        } else {
            yield put(hideLoader());
            const error = sagaErrorHandler(response)
            yield put(webAppConfigFailure(error));
            yield call(action.payload.onError(error));
        }
    } catch (error) {
        yield put(hideLoader());
        yield put(webAppConfigFailure(error));
        yield call(action.payload.onError(error));
    }
}


//get notifications saga

function* getNotificationsSaga(action) {
    try {
        yield put(showLoader());
        const response = yield call(getNotificationsApi, action.payload.params);
        // console.log("notificationsresponse------->", response);
        if (response.success) {
            yield put(hideLoader());
            yield put(getNotificationsSuccess(response.status));
            yield call(action.payload.onSuccess(response));
        } else {
            yield put(hideLoader());
            const error = sagaErrorHandler(response)
            yield put(getNotificationsFailure(error));
            yield call(action.payload.onError(error));
        }
    } catch (error) {
        yield put(hideLoader());
        yield put(getNotificationsFailure(error));
        yield call(action.payload.onError(error));
    }
}



///watcher///..........................................................................................................................
function* AppSaga() {
    yield takeLatest(WEB_APP_CONFIG, webAppConfigSaga);
    yield takeLatest(GET_NOTIFICATIONS, getNotificationsSaga);

}

export default AppSaga;
