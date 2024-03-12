import { takeLatest, put, call } from 'redux-saga/effects';

import {
    fetchUserDigitalProfilesApi,
    postUserDigitalProfilesApi,
    fetchUserDetailsApi
} from '@Services'

import { ERRORS, sagaErrorHandler } from '@Utils';

import {
    hideLoader,
    showLoader,

    FETCH_USER_DIGITAL_PROFILE,
    fetchUserDigitalProfileSuccess,
    fetchUserDigitalProfileFailure,

    POST_USER_DIGITAL_PROFILE,
    addUserDigitalProfileSuccess,
    addUserDigitalProfileFailure,

    FETCH_USER_DETAILS,
    getUserDetailsSuccess,
    getUserDetailsFailure
} from '@Redux';

///////////////////////  Version 2 ///////////////////////////////


function* fetchUserDigitalProfileDetailsSaga(action) {
    console.log("actionnnn")
    try {
        yield put(showLoader());

        const response = yield call(fetchUserDigitalProfilesApi, action.payload.params);
        console.log("responsetaskbystudent============--->", response);

        if (response.success) {
            yield put(hideLoader());
            yield put(fetchUserDigitalProfileSuccess(response));
            yield call(action.payload.onSuccess(response));
        } else {
            yield put(hideLoader());
            const error = sagaErrorHandler(response)
            yield put(fetchUserDigitalProfileFailure(error));
            yield call(action.payload.onError(error));
        }
    } catch (error) {
        yield put(hideLoader());
        yield put(fetchUserDigitalProfileFailure(error));
        yield call(action.payload.onError(error));
    }
}

/**
 * Add user digital profile details
 */

function* postAddUserDigitalProfilesSaga(action) {
    console.log("actionnnn")
    try {
        yield put(showLoader());

        const response = yield call(postUserDigitalProfilesApi, action.payload.params);
        console.log("responsetaskbystudent============--->", response);

        if (response.success) {
            yield put(hideLoader());
            yield put(addUserDigitalProfileSuccess(response));
            yield call(action.payload.onSuccess(response));
        } else {
            yield put(hideLoader());
            const error = sagaErrorHandler(response)
            yield put(addUserDigitalProfileFailure(error));
            yield call(action.payload.onError(error));
        }
    } catch (error) {
        yield put(hideLoader());
        yield put(addUserDigitalProfileFailure(error));
        yield call(action.payload.onError(error));
    }
}

/**
 * Get user details
 */

function* getUserDetailsSaga(action) {
    console.log("actionnnn")
    try {
        yield put(showLoader());

        const response = yield call(fetchUserDetailsApi, action.payload.params);
        console.log("responsetaskbystudent============--->", response);

        if (response.success) {
            yield put(hideLoader());
            yield put(getUserDetailsSuccess(response));
            yield call(action.payload.onSuccess(response));
        } else {
            yield put(hideLoader());
            const error = sagaErrorHandler(response)
            yield put(getUserDetailsFailure(error));
            yield call(action.payload.onError(error));
        }
    } catch (error) {
        yield put(hideLoader());
        yield put(getUserDetailsFailure(error));
        yield call(action.payload.onError(error));
    }
}

///watcher///..........................................................................................................................
function* StudentSaga() {
    yield takeLatest(FETCH_USER_DIGITAL_PROFILE, fetchUserDigitalProfileDetailsSaga);
    yield takeLatest(POST_USER_DIGITAL_PROFILE, postAddUserDigitalProfilesSaga);
    yield takeLatest(FETCH_USER_DETAILS, getUserDetailsSaga);



}

export default StudentSaga;
