import { takeLatest, put, call, takeEvery } from 'redux-saga/effects';
import {
    postAddTaskByGuestApi,
    fetchGuestTasksApi,
    fetchGuestTasksDetailsApi,
    fetchGuestTaskDeTailsOpenApi
} from '@Services';

import { sagaErrorHandler } from '@Utils';

import {
    POST_TASK_BY_GUEST,
    postAddTaskByGuestSuccess,
    postAddTaskByGuestFailure,

    FETCH_GUEST_TASKS,
    fetchGuestTasksSuccess,
    fetchGuestTasksFailure,

    FETCH_GUEST_TASK_DETAILS,
    fetchGuestTaskDetailsSuccess,
    fetchGuestTaskDetailsFailure,

    FETCH_GUEST_TASK_DETAILS_OPEN,
    getGuestTaskDetailsOpenSuccess,
    getGuestTaskDetailsOpenFailure,

} from '@Redux';


/**
 * add task by guest
 */
function* postAddTaskByGuestSaga(action) {
    try {
        const response = yield call(postAddTaskByGuestApi, action.payload.params);
        if (response.success) {
            yield put(postAddTaskByGuestSuccess(response));
            yield call(action.payload.onSuccess(response));
        } else {
            const error = sagaErrorHandler(response)
            yield put(postAddTaskByGuestFailure(error));
            yield call(action.payload.onError(error));
        }
    } catch (error) {
        yield put(postAddTaskByGuestFailure(error));
        yield call(action.payload.onError(error));
    }
}

/**
 * get guest tasks
 */

function* fetchGuestTasksSaga(action) {
    try {

        const response = yield call(fetchGuestTasksApi, action.payload.params);

        if (response.success) {
            yield put(fetchGuestTasksSuccess(response));
            yield call(action.payload.onSuccess(response));
        } else {
            const error = sagaErrorHandler(response)
            yield put(fetchGuestTasksFailure(error));
            yield call(action.payload.onError(error));
        }
    } catch (error) {
        yield put(fetchGuestTasksFailure(error));
        yield call(action.payload.onError(error));
    }
}

/**
 * get guest task details
 */

function* fetchGuestTaskDetailsSaga(action) {
    try {

        const response = yield call(fetchGuestTasksDetailsApi, action.payload.params);

        if (response.success) {
            yield put(fetchGuestTaskDetailsSuccess(response));
            yield call(action.payload.onSuccess(response));
        } else {
            const error = sagaErrorHandler(response)
            yield put(fetchGuestTaskDetailsFailure(error));
            yield call(action.payload.onError(error));
        }
    } catch (error) {
        yield put(fetchGuestTaskDetailsFailure(error));
        yield call(action.payload.onError(error));
    }
}

/**
 * get guest view task details
 */

function* fetchGuestViewTaskDetailsSaga(action) {
    try {

        const response = yield call(fetchGuestTaskDeTailsOpenApi, action.payload.params);
        console.log("sagaaa", response);

        if (response.success) {
            yield put(getGuestTaskDetailsOpenSuccess(response));
            yield call(action.payload.onSuccess(response.details));
        } else {
            const error = sagaErrorHandler(response)
            yield put(getGuestTaskDetailsOpenFailure(error));
            yield call(action.payload.onError(error));
        }
    } catch (error) {
        yield put(getGuestTaskDetailsOpenFailure(error));
        yield call(action.payload.onError(error));
    }
}

//watcher
function* GuestSaga() {
    yield takeLatest(POST_TASK_BY_GUEST, postAddTaskByGuestSaga);
    yield takeLatest(FETCH_GUEST_TASKS, fetchGuestTasksSaga);
    yield takeLatest(FETCH_GUEST_TASK_DETAILS, fetchGuestTaskDetailsSaga);
    yield takeLatest(FETCH_GUEST_TASK_DETAILS_OPEN, fetchGuestViewTaskDetailsSaga);

}

export default GuestSaga;
