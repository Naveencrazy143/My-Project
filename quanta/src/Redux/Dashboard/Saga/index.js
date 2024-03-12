import { takeLatest, put, call, takeEvery } from 'redux-saga/effects';
import {
    fetchTaskDetailsApi,
    fetchCoursesApi,
    fetchCourseSectionsApi,
    fetchCourseTopicsApi,
    fetchCourseTopicTasksApi,
    postGenericCrudApi,
    postAddDepartmentApi,
    postAddDesignationApi,
    fetchDepartmentDataApi,
    fetchDesignationDataApi,
    postGenericBatchCrudApi,
    postAddStudentApi,
    fetchStudentsListApi,
    postAddFacultyApi,
    fetchFacultiesListApi,
    fetchApproverApi,
    fetchRefererListApi,
    fetchStudentDetailsApi,
    fetchDashboardDetailsApi,
    postRaiseAnonymousComplaintApi,
    fetchFacultyDetailsApi,
    fetchCourseIdeApi,
    fetchStudentCourseTasksFacultyApi,
    fetchStudentCourseTaskDetailsFacultyApi,
    postSubmitStudentCoursePendingApprovalTaskApi,
    postTaskEventApi,
    fetchTaskEventsApi,
    fetchUserOnlineActiveLogApi,
    fetchTopicTaskTypesApi,


    fetchPageSectionsApi,
    fetchSectionTypeImageApi,
    fetchSectionTypeListApi,
    fetchSectionTypeMdApi,
    fetchSectionTypeParagraphApi,
    fetchSectionTypeTitleApi,
    fetchSectionTypeVideoApi,

    fetchUserRemarkApi,
    fetchUsersRemarkApi,

    postBranchApi,
    postBulkUploadCoursesApi,
    postBulkUploadSectionsApi,
    postBulkUploadTopicsApi,
    postBulkUploadTasksApi,
    fetchCourseTemplatesApi,
    postBulkUploadStudentsApi,
    postBulkUploadFacultiesApi,
    fetchEmployeesTemplatesApi,
    postuserRemarksApi,
    postSubmitUserRemarksApprovalApi,
    postSubmitTaskApprovalByFacultyApi,
    postAddCourseApi,
    postAddCourseSectionApi,
    postAddCourseTopicApi,
    postAddCourseTaskApi,
    postAddBatchApi,
    postAddWeeklyCalendarApi,
    fetchGetPagesApi,
    postAddBatchCompletionEventApi,
    fetchGetBatchCompletionEventApi,
    postPageSectionApi,
    postUpdateUserOnlineActivityLogApi,

    /**
     * student............................................................................................................................
     */
    fetchStudentCoursesApi,
    fetchStudentCourseSectionsApi,
    fetchStudentCourseTopicsApi,
    fetchStudentCourseTasksApi,
    fetchStudentCourseTasksDetailsApi,
    fetchAllBranchesListApi,
    postStudentCourseTasksApi,
    postStudentCourseTasksDetailsApi,

    fetchStudentPageSectionsApi,
    fetchStudentSectionTypeTitleApi,
    fetchStudentSectionTypeImageApi,
    fetchStudentSectionTypeListApi,
    fetchStudentSectionTypeMdApi,
    fetchStudentSectionTypeParagraphApi,
    fetchStudentSectionTypeVideoApi,

    fetchStudentTasksTimelineApi,

    postStudentCodeSubmissionApi,

    postTaskByStudentApi,
    fetchStudentTasksDetailsOpenApi,

    fetchCourseBatchesApi,

    fetchCourseBatchDetailsApi,

    assignCourseBatchToStudentApi,

    fetchBatchStudentsApi,

    fetchCourseBatchAddedStudentsApi,

    postBatchVideoCallUSersApi,

    getBatchVideoCallUserApi,

    fetchTokenByUserApi,

    /**
     * GROUP CHAT
     */
    postBatchChatApi,
    fetchBatchChatApi,
    fetchUserOnlineActivityLogApi

} from '@Services';

import { ERRORS, sagaErrorHandler } from '@Utils';
import {
    FETCH_TASK_DETAILS,
    fetchTaskDetailsSuccess,
    fetchTaskDetailsFailure,
    hideLoader,
    showLoader,

    FETCH_COURSES,
    fetchCoursesSuccess,
    fetchCoursesFailure,
 
    FETCH_COURSE_SECTIONS,
    fetchCourseSectionsSuccess,
    fetchCourseSectionsFailure,    

    FETCH_COURSE_TOPICS,
    fetchCourseTopicsSuccess,
    fetchCourseTopicsFailure,

    FETCH_COURSE_TOPIC_TASKS,
    fetchCourseTopicTasksSuccess,
    fetchCourseTopicTasksFailure,

    POST_GENERIC_CRUD_DETAILS,
    postGenericCrudDetailsSuccess,
    postGenericCrudDetailsFailure,

    ADD_DEPARTMENT,
    addDepartmentSuccess,
    addDepartmentFailure,

    ADD_DESIGNATION,
    addDesignationSuccess,
    addDesignationFailure,

    FETCH_DEPARTMENT,
    getDepartmentDataSuccess,
    getDepartmentDataFailure,

    FETCH_DESIGNATION,
    getDesignationDataSuccess,
    getDesignationDataFailure,
    POST_GENERIC_BATCH_CRUD_DETAILS,
    postGenericBatchCrudDetailsSuccess,
    postGenericBatchCrudDetailsFailure,

    ADD_STUDENT,
    postAddStudentSuccess,
    postAddStudentFailure,

    FETCH_STUDENTS_LIST,
    fetchStudentsListSuccess,
    fetchStudentsListFailure,

    ADD_FACULTY,
    postAddFacultySuccess,
    postAddFacultyFailure,

    FETCH_FACULTIES_LIST,
    fetchFacultiesListSuccess,
    fetchFacultiesListFailure,

    FETCH_APPROVER_LIST,
    fetchApproverListSuccess,
    fetchApproverListFailure,

    FETCH_REFERER_LIST,
    fetchRefererListSuccess,
    fetchRefererListFailure,

    FETCH_STUDENTS_DETAILS,
    fetchStudentDetailsSuccess,
    fetchStudentDetailsFailure,

    FETCH_DASHBOARD_DETAILS,
    fetchDashboardDetailsSuccess,
    fetchDashboardDetailsFailure,

    POST_RAISE_ANONYMOUS_COMPLAINT,
    postRaiseAnonymousComplaintSuccess,
    postRaiseAnonymousComplaintFailure,

    FETCH_FACULTIES_DETAILS,
    fetchFacultyDetailsSuccess,
    fetchFacultyDetailsFailure,

    FETCH_COURSE_IDE,
    getCourseIdeSuccess,
    getCourseIdeFailure,

    FETCH_STUDENT_COURSE_TASKS_FACULTY,
    fetchStudentCourseTasksFacultySuccess,
    fetchStudentCourseTasksFacultyFailure,

    FETCH_STUDENT_COURSE_TASK_DETAILS_FACULTY,
    fetchStudentCourseTaskDetailsFacultySuccess,
    fetchStudentCourseTaskDetailsFacultyFailure,

    POST_SUBMIT_STUDENT_COURSE_PENDING_APPROVAL_TASK,
    postSubmitStudentCoursePendingApprovalSuccess,
    postSubmitStudentCoursePendingApprovalFailure,

    POST_TASK_EVENT,
    postTaskEventSuccess,
    postTaskEventFailure,

    FETCH_TASK_EVENTS,
    fetchTaskEventsSuccess,
    fetchTaskEventsFailure,


    FETCH_PAGE_SECTIONS,
    fetchPageSectionsSuccess,
    fetchPageSectionsFailure,

    FETCH_SECTION_TYPE_TITLE,
    fetchSectionTypeTitleSuccess,
    fetchSectionTypeTitleFailure,

    FETCH_SECTION_TYPE_IMAGE,
    fetchSectionTypeImageSuccess,
    fetchSectionTypeImageFailure,

    FETCH_SECTION_TYPE_VIDEO,
    fetchSectionTypeVideoSuccess,
    fetchSectionTypeVideoFailure,

    FETCH_SECTION_TYPE_PARAGRAPH,
    fetchSectionTypeParagraphSuccess,
    fetchSectionTypeParagraphFailure,

    FETCH_SECTION_TYPE_MD,
    fetchSectionTypeMdSuccess,
    fetchSectionTypeMdFailure,

    FETCH_SECTION_TYPE_LIST,
    fetchSectionTypeListSuccess,
    fetchSectionTypeListFailure,




    FETCH_USER_ONLINE_ACTIVE_LOG,
    fetchUserOnlineActiveLogSuccess,
    fetchUserOnlineActiveLogFailure,

    FETCH_TOPIC_TASK_TYPES,
    fetchTopicTaskTypesSuccess,
    fetchTopicTaskTypesFailure,

    FETCH_USER_REMARK,
    fetchUserRemarkSuccess,
    fetchUserRemarkFailure,

    FETCH_USERS_REMARK,
    fetchUsersRemarkSuccess,
    fetchUsersRemarkFailure,

    POST_BRANCH,
    postBranchSuccess,
    postBranchFailure,

    FETCH_COURSE_TEMPLATES,
    fetchCourseTemplatesSuccess,
    fetchCourseTemplatesFailure,

    POST_BULK_UPLOAD_COURSES,
    postBulkUploadCoursesSuccess,
    postBulkUploadCoursesFailure,

    POST_BULK_UPLOAD_SECTION,
    postBulkUploadSectionSuccess,
    postBulkUploadSectionFailure,


    POST_BULK_UPLOAD_TOPICS,
    postBulkUploadTopicsSuccess,
    postBulkUploadTopicsFailure,


    POST_BULK_UPLOAD_TASKS,
    postBulkUploadTasksSuccess,
    postBulkUploadTasksFailure,

    POST_BULK_UPLOAD_STUDENTS,
    postBulkUploadStudentsSuccess,
    postBulkUploadStudentsFailure,

    POST_BULK_UPLOAD_FACULTIES,
    postBulkUploadFacultiesSuccess,
    postBulkUploadFacultiesFailure,

    FETCH_EMPLOYEES_TEMPLATES,
    fetchEmployeesTemplatesSuccess,
    fetchEmployeesTemplatesFailure,

    POST_USER_REMARKS,
    postUserRemarksSuccess,
    postUserRemarksFailure,

    POST_SUBMIT_USER_REMARKS_APPROVAL,
    postSubmitUserRemarksApprovalSuccess,
    postSubmitUserRemarksApprovalFailure,

    POST_SUBMIT_TASK_APPROVAL_BY_FACULTY,
    postSubmitTaskApprovalByFacultySuccess,
    postSubmitTaskApprovalByFacultyFailure,

    POST_ADD_COURSE,
    postAddCourseSuccess,
    postAddCourseFailure,

    POST_ADD_COURSE_SECTION,
    postAddCourseSectionSuccess,
    postAddCourseSectionFailure,

    POST_ADD_COURSE_TOPIC,
    postAddCourseTopicSuccess,
    postAddCourseTopicFailure,

    POST_ADD_COURSE_TASK,
    postAddCourseTaskSuccess,
    postAddCourseTaskFailure,

    POST_ADD_BATCH,
    postAddBatchSuccess,
    postAddBatchFailure,

    POST_ADD_WEEKLY_CALENDAR,
    postAddWeeklyCalendarSuccess,
    postAddWeeklyCalendarFailure,

    FETCH_COURSE_BATCHES,
    getCourseBatchesSuccess,
    getCourseBatchesFailure,

    FETCH_COURSE_BATCH_DETAILS,
    getCourseBatchDetailsSuccess,
    getCourseBatchDetailsFailure,

    ASSIGN_COURSE_BATCH_TO_STUDENT,
    assignCourseBatchToStudentSuccess,
    assignCourseBatchToStudentFailure,

    FETCH_BATCH_STUDENT,
    fetchBatchStudentsSuccess,
    fetchBatchStudentsFailure,

    FETCH_COURSE_BATCH_ADDED_STUDENTS,
    fetchCourseBatchAddedStudentsSuccess,
    fetchCourseBatchAddedStudentsFailure,

    FETCH_GET_PAGES,
    fetchGetPagesSuccess,
    fetchGetPagesFailure,

    POST_ADD_BATCH_COMPLETION_EVENT,
    postAddBatchCompletionEventSuccess,
    postAddBatchCompletionEventFailure,

    FETCH_GET_BATCH_COMPLETION_EVENT,
    fetchGetBatchCompletionEventSuccess,
    fetchGetBatchCompletionEventFailure,

    POST_PAGE_SECTION,
    postPageSectionSuccess,
    postPageSectionFailure,

    POST_UPDATE_USER_ONLINE_ACTIVITY_LOG,
    postUpdateUserOnlineActivityLogSuccess,
    postUpdateUserOnlineActivityLogFailure,

    /**
     * Student.......................................................................................................................
     */


    FETCH_STUDENT_COURSES,
    fetchStudentCoursesSuccess,
    fetchStudentCoursesFailure,

    FETCH_STUDENT_COURSE_SECTION,
    fetchStudentCourseSectionSuccess,
    fetchStudentCourseSectionFailure,

    FETCH_STUDENT_COURSE_TOPICS,
    fetchStudentCourseTopicsSuccess,
    fetchStudentCourseTopicsFailure,

    FETCH_STUDENT_COURSE_TASKS,
    fetchStudentCourseTasksSuccess,
    fetchStudentCourseTasksFailure,

    FETCH_STUDENT_COURSE_TASKS_DETAILS,
    fetchStudentCourseTaskDetailsSuccess,
    fetchStudentCourseTasksDetailsFailure,

    FETCH_ALL_BRANCHES_LIST,
    getAllBranchesListSuccess,
    getAllBranchesListFailure,

    POST_STUDENT_COURSE_TASK_DETAILS,
    postStudentCourseTasksDetailsSuccess,
    postStudentCourseTasksDetailsFailure,

    FETCH_STUDENT_PAGE_SECTIONS,
    fetchStudentPageSectionsSuccess,
    fetchStudentPageSectionsFailure,

    FETCH_STUDENT_SECTION_TYPE_TITLE,
    fetchStudentSectionTypeTitleSuccess,
    fetchStudentSectionTypeTitleFailure,

    FETCH_STUDENT_SECTION_TYPE_IMAGE,
    fetchStudentSectionTypeImageSuccess,
    fetchStudentSectionTypeImageFailure,

    FETCH_STUDENT_SECTION_TYPE_VIDEO,
    fetchStudentSectionTypeVideoSuccess,
    fetchStudentSectionTypeVideoFailure,

    FETCH_STUDENT_SECTION_TYPE_PARAGRAPH,
    fetchStudentSectionTypeParagraphSuccess,
    fetchStudentSectionTypeParagraphFailure,

    FETCH_STUDENT_SECTION_TYPE_MD,
    fetchStudentSectionTypeMdSuccess,
    fetchStudentSectionTypeMdFailure,

    FETCH_STUDENT_SECTION_TYPE_LIST,
    fetchStudentSectionTypeListSuccess,
    fetchStudentSectionTypeListFailure,

    FETCH_STUDENT_TASKS_TIMELINE,
    fetchStudentTasksTimelineSuccess,
    fetchStudentTasksTimelineFailure,

    STUDENT_CODE_SUBMISSION,
    postStudentCodeSubmissionSuccess,
    postStudentCodeSubmissionFailure,

    POST_TASK_BY_STUDENT,
    postTaskByStudentSuccess,
    postTaskByStudentFailure,

    FETCH_STUDENT_TASKS_DETAILS_OPEN,
    fetchStudentTasksDetailsOpenSuccess,
    fetchStudentTasksDetailsOpenFailure,

    POST_BATCH_VIDEO_CALL_USERS,
    postBatchVideoCallUsersSuccess,
    postBatchVideoCallUsersFailure,

    FETCH_BATCH_VIDEO_CALL_USERS,
    fetchBatchVideoCallUsersSuccess,
    fetchBatchVideoCallUsersFailure,

    FETCH_TOKEN_BY_USER,
    fetchTokenByUserSuccess,
    fetchTokenByUserFailure,

    /**
     * GROUP CHATS
     */

    POST_BATCH_CHAT,
    postBatchChatSuccess,
    postBatchChatFailure,

    FETCH_BATCH_CHAT,
    fetchBatchChatSuccess,
    fetchBatchChatFailure,

    FETCH_BATCH_USER_ONLINE_ACTIVITY_LOG,
    fetchBatchUserOnlineActivityLogSuccess,
    fetchBatchUserOnlineActivityLogFailure,
} from '@Redux';

function* fetchTaskDetailsSaga(action) {
    try {
        yield put(showLoader());
        const response = yield call(fetchTaskDetailsApi, action.payload.params);
        console.log("response------->", response);
        if (response.success) {
            yield put(hideLoader());
            yield put(fetchTaskDetailsSuccess({ ...response.details }));
            yield call(action.payload.onSuccess(response));
        } else {
            yield put(hideLoader());
            const error = sagaErrorHandler(response)
            yield put(fetchTaskDetailsFailure(error));
            yield call(action.payload.onError(error));
        }
    } catch (error) {
        yield put(hideLoader());
        yield put(fetchTaskDetailsFailure(error));
        yield call(action.payload.onError(error));
    }
}

/**
 * get courses
 */

function* fetchCourses(action) {

    try {
        yield put(showLoader());
        const response = yield call(fetchCoursesApi, action.payload.params);
        // console.log("response------->", response);
        if (response.success) {
            yield put(hideLoader());
            yield put(fetchCoursesSuccess(response.details));
            yield call(action.payload.onSuccess(response.details));
        } else {
            yield put(hideLoader());
            const error = sagaErrorHandler(response)
            yield put(fetchCoursesFailure(error));
            yield call(action.payload.onError(error));
        }
    } catch (error) {
        yield put(hideLoader());
        yield put(fetchCoursesFailure(ERRORS.INVALID_REQUEST));
        yield call(action.payload.onError(error));
    }
}

/**
 * get courses
 */

function* fetchCourseSectionsSaga(action) {

    try {
        yield put(showLoader());
        const response = yield call(fetchCourseSectionsApi, action.payload.params);
        // console.log("response------->", response);
        if (response.success) {
            yield put(hideLoader());
            yield put(fetchCourseSectionsSuccess(response.details));
            yield call(action.payload.onSuccess(response.details));
        } else {
            yield put(hideLoader());
            const error = sagaErrorHandler(response)
            yield put(fetchCourseSectionsFailure(error));
            yield call(action.payload.onError(error));
        }
    } catch (error) {
        yield put(hideLoader());
        yield put(fetchCourseSectionsFailure(ERRORS.INVALID_REQUEST));
        yield call(action.payload.onError(error));
    }
}

/**
 * get course topics
 */

function* fetchCourseTopics(action) {
    try {
        // yield put(showLoader());
        const response = yield call(fetchCourseTopicsApi, action.payload.params);
        console.log("response------sagagagagaga->", response);
        if (response.success) {
            // yield put(hideLoader());
            yield put(fetchCourseTopicsSuccess(response.details));
            yield call(action.payload.onSuccess(response.details));
        } else {
            // yield put(hideLoader());
            const error = sagaErrorHandler(response)
            yield put(fetchCourseTopicsFailure(error));
            yield call(action.payload.onError(error));
        }
    } catch (error) {
        // yield put(hideLoader());
        yield put(fetchCourseTopicsFailure(ERRORS.INVALID_REQUEST));
        yield call(action.payload.onError(error));
    }
}

/**
 * get course topic tasks
 */

function* fetchCourseTopicTasks(action) {
    try {
        yield put(showLoader());
        const response = yield call(fetchCourseTopicTasksApi, action.payload.params);
        console.log("response------->", response);
        if (response.success) {
            yield put(hideLoader());
            yield put(fetchCourseTopicTasksSuccess(response.details));
            yield call(action.payload.onSuccess(response));
        } else {
            yield put(hideLoader());
            const error = sagaErrorHandler(response)
            yield put(fetchCourseTopicTasksFailure(error));
            yield call(action.payload.onError(error));
        }
    } catch (error) {
        yield put(hideLoader());
        yield put(fetchCourseTopicTasksFailure(error));
        yield call(action.payload.onError(error));
    }
}

/**
 * post generic CRUD details
 */

function* postGenericCrudDetailSaga(action) {
    try {
        yield put(showLoader());
        const response = yield call(postGenericCrudApi, action.payload.params);
        console.log("response------->", response);
        if (response.success) {
            yield put(hideLoader());
            yield put(postGenericCrudDetailsSuccess({ ...response.details }));
            yield call(action.payload.onSuccess(response));
        } else {
            yield put(hideLoader());
            const error = sagaErrorHandler(response)
            yield put(postGenericCrudDetailsFailure(error));
            yield call(action.payload.onError(error));
        }
    } catch (error) {
        yield put(hideLoader());
        yield put(postGenericCrudDetailsFailure(error));
        yield call(action.payload.onError(error));
    }
}

/**
 * add Department
 */

function* addDepartment(action) {
    try {
        yield put(showLoader());

        const response = yield call(postAddDepartmentApi, action.payload.params);

        if (response.success) {
            yield put(hideLoader());
            yield put(addDepartmentSuccess(response.details));
            yield call(action.payload.onSuccess(response));
        } else {
            yield put(hideLoader());
            const error = sagaErrorHandler(response)
            console.log("errrsaga==>", error)
            yield put(addDepartmentFailure(error));
            yield call(action.payload.onError(error));
        }
    } catch (error) {
        yield put(hideLoader());
        yield put(addDepartmentFailure(error));
        yield call(action.payload.onError(error));
    }
}

/**
* add Designation
*/

function* addDesignation(action) {
    try {
        yield put(showLoader());

        const response = yield call(postAddDesignationApi, action.payload.params);

        if (response.success) {
            yield put(hideLoader());
            yield put(addDesignationSuccess(response.details));
            yield call(action.payload.onSuccess(response));
        } else {
            yield put(hideLoader());
            const error = sagaErrorHandler(response)
            yield put(addDesignationFailure(error));
            yield call(action.payload.onError(error));
        }
    } catch (error) {
        yield put(hideLoader());
        yield put(addDesignationFailure(error));
        yield call(action.payload.onError(error));
    }
}

/**
 * get designation
 */

function* getDesignation(action) {
    try {
        yield put(showLoader());

        const response = yield call(fetchDesignationDataApi, action.payload.params);

        if (response.success) {
            yield put(hideLoader());
            yield put(getDesignationDataSuccess(response.details));
            yield call(action.payload.onSuccess(response));
        } else {
            yield put(hideLoader());
            const error = sagaErrorHandler(response)
            yield put(getDesignationDataFailure(error));
            yield call(action.payload.onError(error));
        }
    } catch (error) {
        yield put(hideLoader());
        yield put(getDesignationDataFailure(error));
        yield call(action.payload.onError(error));
    }
}

/**
 * get Departments
 */

function* getDepartments(action) {
    try {
        yield put(showLoader());

        const response = yield call(fetchDepartmentDataApi, action.payload.params);

        if (response.success) {
            yield put(hideLoader());
            yield put(getDepartmentDataSuccess(response.details));
            yield call(action.payload.onSuccess(response));
        } else {
            yield put(hideLoader());
            const error = sagaErrorHandler(response)
            yield put(getDepartmentDataFailure(error));
            yield call(action.payload.onError(error));
        }
    } catch (error) {
        yield put(hideLoader());
        yield put(getDepartmentDataFailure(error));
        yield call(action.payload.onError(error));
    }
}

/**
* Generic Batch CRUD
*/

function* postGenericBatchCrudDetailSaga(action) {
    try {
        yield put(showLoader());

        const response = yield call(postGenericBatchCrudApi, action.payload.params);

        if (response.success) {
            yield put(hideLoader());
            yield put(postGenericBatchCrudDetailsSuccess(response.details));
            yield call(action.payload.onSuccess(response));
        } else {
            yield put(hideLoader());
            yield put(postGenericBatchCrudDetailsFailure(response.error_message));
            yield call(action.payload.onError(response));
        }
    } catch (error) {
        console.log("errorrrrrrsagaaa--->", error)
        yield put(hideLoader());
        yield put(postGenericBatchCrudDetailsFailure("Invalid Request"));
        yield call(action.payload.onError(error));
        console.log(error + "+=========fetchCourseTopics");

    }
}

/**
 * add student
 */

function* addStudent(action) {
    try {
        yield put(showLoader());
        console.log("studaction----", JSON.stringify(action));
        const response = yield call(postAddStudentApi, action.payload.params);

        console.log(JSON.stringify(response) + '====response');
        if (response.success) {
            yield put(hideLoader());
            yield put(postAddStudentSuccess(response.details));
            yield call(action.payload.onSuccess(response));
        } else {
            yield put(hideLoader());
            const error = sagaErrorHandler(response)
            yield put(postAddStudentFailure(error));
            yield call(action.payload.onError(error));
        }
    } catch (error) {
        yield put(hideLoader());
        yield put(postAddStudentFailure(error));
        yield call(action.payload.onError(error));
    }
}

/**
 * get students list 
 */

function* getStudentsList(action) {
    try {
        yield put(showLoader());
        const response = yield call(fetchStudentsListApi, action.payload.params);

        if (response.success) {
            yield put(hideLoader());
            yield put(fetchStudentsListSuccess(response.details));
            yield call(action.payload.onSuccess(response));
        } else {
            yield put(hideLoader());
            const error = sagaErrorHandler(response)
            yield put(fetchStudentsListFailure(error));
            yield call(action.payload.onError(error));
        }
    } catch (error) {
        yield put(hideLoader());
        yield put(fetchStudentsListFailure(error));
        yield call(action.payload.onError(error));
    }
}

/**
 * add faculty
 */

function* addFaculty(action) {
    try {
        yield put(showLoader());
        console.log("actionnnn", action);
        const response = yield call(postAddFacultyApi, action.payload.params);
        console.log("responseeeeeeee--------->", response);
        if (response.success) {
            console.log("successsss");
            yield put(hideLoader());
            yield put(postAddFacultySuccess(response.details));
            yield call(action.payload.onSuccess(response));
        } else {
            yield put(hideLoader());
            yield put(postAddFacultyFailure(response.error_message));
            yield call(action.payload.onError(response));
        }
    } catch (error) {
        yield put(hideLoader());
        yield put(postAddFacultyFailure(error));
        yield call(action.payload.onError(error));
        console.log(error + "+=========fetchCourseTopics");

    }
}

/**
 * get faculties list 
 */

function* getFacultiesList(action) {
    try {
        yield put(showLoader());

        const response = yield call(fetchFacultiesListApi, action.payload.params);

        if (response.success) {
            yield put(hideLoader());
            yield put(fetchFacultiesListSuccess(response.details));
            yield call(action.payload.onSuccess(response));
        } else {
            yield put(hideLoader());
            yield put(fetchFacultiesListFailure(response.error_message));
            yield call(action.payload.onError(response));
        }
    } catch (error) {
        yield put(hideLoader());
        yield put(fetchFacultiesListFailure(error));
        yield call(action.payload.onError(error));
    }
}


/**
 * get Approver list saga
 */

function* getApproverListSaga(action) {
    try {
        yield put(showLoader());

        const response = yield call(fetchApproverApi, action.payload.params);

        if (response.success) {
            yield put(hideLoader());
            yield put(fetchApproverListSuccess(response.details));
            yield call(action.payload.onSuccess(response));
        } else {
            yield put(hideLoader());
            yield put(fetchApproverListFailure(response.error_message));
            yield call(action.payload.onError(response));
        }
    } catch (error) {
        yield put(hideLoader());
        yield put(fetchApproverListFailure(error));
        yield call(action.payload.onError(error));
        console.log(error + "+=========fetchCourseTopics");

    }
}

/**
 * get referer list
 */

function* getRefererList(action) {
    try {
        yield put(showLoader());

        const response = yield call(fetchRefererListApi, action.payload.params);
        console.log("response============", response);

        if (response.success) {
            yield put(hideLoader());
            yield put(fetchRefererListSuccess(response.details));
            yield call(action.payload.onSuccess(response));
        } else {
            yield put(hideLoader());
            yield put(fetchRefererListFailure(response.error_message));
            yield call(action.payload.onError(response));
        }
    } catch (error) {
        yield put(hideLoader());
        yield put(fetchRefererListFailure(error));
        yield call(action.payload.onError(error));
        console.log(error + "+=========fetchCourseTopics");

    }
}

/**
 * get student details
 */

function* getStudentDetails(action) {
    try {
        yield put(showLoader());

        const response = yield call(fetchStudentDetailsApi, action.payload.params);
        console.log("response============", response);

        if (response.success) {
            yield put(hideLoader());
            yield put(fetchStudentDetailsSuccess(response.details));
            yield call(action.payload.onSuccess(response));
        } else {
            yield put(hideLoader());
            yield put(fetchStudentDetailsFailure(response.error_message));
            yield call(action.payload.onError(response));
        }
    } catch (error) {
        yield put(hideLoader());
        yield put(fetchStudentDetailsFailure(error));
        yield call(action.payload.onError(error));
        console.log(error + "+=========fetchCourseTopics");

    }
}


/**
 * get dashboard details
 */

function* getDashboardDetails(action) {
    try {
        yield put(showLoader());

        const response = yield call(fetchDashboardDetailsApi, action.payload.params);
        if (response.success) {
            yield put(hideLoader());
            yield put(fetchDashboardDetailsSuccess(response.details));
            yield call(action.payload.onSuccess(response));
        } else {
            yield put(hideLoader());
            const error = sagaErrorHandler(response)
            yield put(fetchDashboardDetailsFailure(error));
            yield call(action.payload.onError(error));
        }
    } catch (error) {
        yield put(hideLoader());
        yield put(fetchDashboardDetailsFailure(error));
        yield call(action.payload.onError(error));
    }
}

/**
 * post raise anonymous complaint saga
 */

function* postRaiseAnonymousComplaintSaga(action) {
    try {
        yield put(showLoader());
        const response = yield call(postRaiseAnonymousComplaintApi, action.payload.params);
        console.log("response============--->", response);

        if (response.success) {
            yield put(hideLoader());
            yield put(postRaiseAnonymousComplaintSuccess(response.details));
            yield call(action.payload.onSuccess(response));
        } else {
            yield put(hideLoader());
            const error = sagaErrorHandler(response)
            yield put(postRaiseAnonymousComplaintFailure(error));
            yield call(action.payload.onError(error));
        }
    } catch (error) {
        yield put(hideLoader());
        yield put(postRaiseAnonymousComplaintFailure(error));
        yield call(action.payload.onError(error));
    }
}


/**
 * get faculty Details 
 */

function* getFacultyDetails(action) {
    try {
        yield put(showLoader());

        const response = yield call(fetchFacultyDetailsApi, action.payload.params);
        console.log("response===========details=--->", response);

        if (response.success) {
            yield put(hideLoader());
            yield put(fetchFacultyDetailsSuccess(response.details));
            yield call(action.payload.onSuccess(response));
        } else {
            yield put(hideLoader());
            yield put(fetchFacultyDetailsFailure(response.error_message));
            yield call(action.payload.onError(response));
        }
    } catch (error) {
        yield put(hideLoader());
        yield put(fetchFacultyDetailsFailure(error));
        yield call(action.payload.onError(error));
        console.log(error + "+=========fetchCourseTopics");

    }
}

/**
 * get course ide
 */

function* getCourseIdeSaga(action) {
    try {
        yield put(showLoader());

        const response = yield call(fetchCourseIdeApi, action.payload.params);
        console.log("response===========details=--->", response);

        if (response.success) {
            yield put(hideLoader());
            yield put(getCourseIdeSuccess(response.details.data));
            yield call(action.payload.onSuccess(response));
        } else {
            yield put(hideLoader());
            yield put(getCourseIdeFailure(response.error_message));
            yield call(action.payload.onError(response));
        }
    } catch (error) {
        yield put(hideLoader());
        yield put(getCourseIdeFailure(error));
        yield call(action.payload.onError(error));

        console.log(error + "+=========fetchCourseTopics");

    }
}

/**
 * get Student Course Tasks Faculty
 */

function* fetchStudentCourseTasksFacultySaga(action) {
    try {
        yield put(showLoader());
        const response = yield call(fetchStudentCourseTasksFacultyApi, action.payload.params);
        console.log("response===========details=--->", response);
        if (response.success) {
            yield put(hideLoader());
            yield put(fetchStudentCourseTasksFacultySuccess(response.details));
            yield call(action.payload.onSuccess(response));
        } else {
            yield put(hideLoader());
            const error = sagaErrorHandler(response)
            yield put(fetchStudentCourseTasksFacultyFailure(error));
            yield call(action.payload.onError(error));
        }
    } catch (error) {
        yield put(hideLoader());
        yield put(fetchStudentCourseTasksFacultyFailure(error));
        yield call(action.payload.onError(error));
    }
}

/**
 * get Student Course Task details Faculty
 */

function* fetchStudentCourseTaskDetailsFacultySaga(action) {
    try {
        yield put(showLoader());
        const response = yield call(fetchStudentCourseTaskDetailsFacultyApi, action.payload.params);
        console.log("response===========details=--->", response);

        if (response.success) {
            yield put(hideLoader());
            yield put(fetchStudentCourseTaskDetailsFacultySuccess(response.details));
            yield call(action.payload.onSuccess(response));
        } else {
            yield put(hideLoader());
            const error = sagaErrorHandler(response)
            yield put(fetchStudentCourseTaskDetailsFacultyFailure(error));
            yield call(action.payload.onError(error));
        }
    } catch (error) {
        yield put(hideLoader());
        yield put(fetchStudentCourseTaskDetailsFacultyFailure(error));
        yield call(action.payload.onError(error));
    }
}

/**
 * submit Student Course Pending Approval
 */

function* postSubmitStudentCoursePendingApprovalSaga(action) {
    try {
        yield put(showLoader());

        const response = yield call(postSubmitStudentCoursePendingApprovalTaskApi, action.payload.params);
        console.log("response===========details=--->", response);

        if (response.success) {
            yield put(hideLoader());
            yield put(postSubmitStudentCoursePendingApprovalSuccess(response.details));
            yield call(action.payload.onSuccess(response));
        } else {
            yield put(hideLoader());
            yield put(postSubmitStudentCoursePendingApprovalFailure(response.error_message));
            yield call(action.payload.onError(response));
        }
    } catch (error) {
        yield put(hideLoader());
        yield put(postSubmitStudentCoursePendingApprovalFailure(error));
        yield call(action.payload.onError(error));
        console.log(error + "+=========fetchCourseTopics");

    }
}

/**
 * add task event
 */

function* postTaskEventSaga(action) {
    try {
        yield put(showLoader());
        const response = yield call(postTaskEventApi, action.payload.params);
        console.log("response===========details=--->", response);

        if (response.success) {
            yield put(hideLoader());
            yield put(postTaskEventSuccess(response.details));
            yield call(action.payload.onSuccess(response));
        } else {
            yield put(hideLoader());
            const error = sagaErrorHandler(response)
            yield put(postTaskEventFailure(error));
            yield call(action.payload.onError(error));
        }
    } catch (error) {
        yield put(hideLoader());
        yield put(postTaskEventFailure(error));
        yield call(action.payload.onError(error));
    }
}

/**
 * get task events
 */

function* fetchTaskEventsSaga(action) {
    try {
        yield put(showLoader());
        const response = yield call(fetchTaskEventsApi, action.payload.params);
        console.log("response===========details=--->", response);

        if (response.success) {
            yield put(hideLoader());
            yield put(fetchTaskEventsSuccess(response.details));
            yield call(action.payload.onSuccess(response));
        } else {
            yield put(hideLoader());
            const error = sagaErrorHandler(response)
            yield put(fetchTaskEventsFailure(error));
            yield call(action.payload.onError(error));
        }
    } catch (error) {
        yield put(hideLoader());
        yield put(fetchTaskEventsFailure(error));
        yield call(action.payload.onError(error));
    }
}

/**
 * get user online active log
 */

function* fetchUserOnlineActiveLogSaga(action) {
    try {
        yield put(showLoader());
        const response = yield call(fetchUserOnlineActiveLogApi, action.payload.params);

        if (response.success) {
            yield put(hideLoader());
            yield put(fetchUserOnlineActiveLogSuccess(response.details));
            yield call(action.payload.onSuccess(response));
        } else {
            yield put(hideLoader());
            const error = sagaErrorHandler(response)
            yield put(fetchUserOnlineActiveLogFailure(error));
            yield call(action.payload.onError(error));
        }
    } catch (error) {
        yield put(hideLoader());
        yield put(fetchUserOnlineActiveLogFailure(error.error_message));
        yield call(action.payload.onError(error));
    }
}

/**
 * get topic task types
 */

function* fetchTopicTaskTypesSaga(action) {
    try {
        yield put(showLoader());

        const response = yield call(fetchTopicTaskTypesApi, action.payload.params);

        if (response.success) {
            yield put(hideLoader());
            yield put(fetchTopicTaskTypesSuccess(response.details));
            yield call(action.payload.onSuccess(response));
        } else {
            yield put(hideLoader());
            const error = sagaErrorHandler(response)
            yield put(fetchTopicTaskTypesFailure(error));
            yield call(action.payload.onError(error));
        }
    } catch (error) {
        yield put(hideLoader());
        yield put(fetchTopicTaskTypesFailure(error));
        yield call(action.payload.onError(error));
    }
}

//get user remark


function* getUserRemarkSaga(action) {
    try {
        yield put(showLoader());

        const response = yield call(fetchUserRemarkApi, action.payload.params);
        console.log("response============--->=================", response);

        if (response.success) {
            yield put(hideLoader());
            yield put(fetchUserRemarkSuccess(response.details));
            yield call(action.payload.onSuccess(response.details));
        } else {
            yield put(hideLoader());
            const error = sagaErrorHandler(response)
            yield put(fetchUserRemarkFailure(error));
            yield call(action.payload.onError(error));
        }
    } catch (error) {
        yield put(hideLoader());
        yield put(fetchUserRemarkFailure(error));
        yield call(action.payload.onError(error));
    }
}

//get users remark


function* getUsersRemarkSaga(action) {
    try {
        yield put(showLoader());

        const response = yield call(fetchUsersRemarkApi, action.payload.params);
        console.log("response============--->=================", response);

        if (response.success) {
            yield put(hideLoader());
            yield put(fetchUsersRemarkSuccess(response.details));
            yield call(action.payload.onSuccess(response.details));
        } else {
            yield put(hideLoader());
            const error = sagaErrorHandler(response)
            yield put(fetchUsersRemarkFailure(error));
            yield call(action.payload.onError(error));
        }
    } catch (error) {
        yield put(hideLoader());
        yield put(fetchUsersRemarkFailure(error));
        yield call(action.payload.onError(error));
    }
}

//add branch


function* postBranchSaga(action) {
    try {
        yield put(showLoader());

        const response = yield call(postBranchApi, action.payload.params);
        console.log("responseBranch============--->=================", response);

        if (response.success) {
            yield put(hideLoader());
            yield put(postBranchSuccess(response.details));
            yield call(action.payload.onSuccess(response));
        } else {
            yield put(hideLoader());
            const error = sagaErrorHandler(response)
            yield put(postBranchFailure(error));
            yield call(action.payload.onError(error));
        }
    } catch (error) {
        yield put(hideLoader());
        yield put(postBranchFailure(error));
        yield call(action.payload.onError(error));
    }
}



//get course templates


function* fetchCourseTemplatesSaga(action) {
    try {
        yield put(showLoader());
        const response = yield call(fetchCourseTemplatesApi, action.payload.params);
        console.log("responseBranch============--->=================", response);

        if (response.success) {
            yield put(hideLoader());
            yield put(fetchCourseTemplatesSuccess(response.details));
            yield call(action.payload.onSuccess(response.details));
        } else {
            yield put(hideLoader());
            const error = sagaErrorHandler(response)
            yield put(fetchCourseTemplatesFailure(error));
            yield call(action.payload.onError(error));
        }
    } catch (error) {
        yield put(hideLoader());
        yield put(fetchCourseTemplatesFailure(error));
        yield call(action.payload.onError(error));
    }
}

//bulk upload students


function* postBulkUploadStudentsSaga(action) {
    try {
        yield put(showLoader());
        const response = yield call(postBulkUploadStudentsApi, action.payload.params);
        console.log("responsebulkupstuuu============--->=================", response);

        if (response.success) {
            yield put(hideLoader());
            yield put(postBulkUploadStudentsSuccess(response.details));
            yield call(action.payload.onSuccess(response));
        } else {
            yield put(hideLoader());
            const error = sagaErrorHandler(response)
            yield put(postBulkUploadStudentsFailure(error));
            yield call(action.payload.onError(error));
        }
    } catch (error) {
        yield put(hideLoader());
        yield put(postBulkUploadStudentsFailure(error));
        yield call(action.payload.onError(error));
    }
}

//bulk upload faculties


function* postBulkUploadFacultiesSaga(action) {
    try {
        yield put(showLoader());
        const response = yield call(postBulkUploadFacultiesApi, action.payload.params);
        console.log("responsebulkupfac============--->=================", response);

        if (response.success) {
            yield put(hideLoader());
            yield put(postBulkUploadFacultiesSuccess(response.details));
            yield call(action.payload.onSuccess(response));
        } else {
            yield put(hideLoader());
            const error = sagaErrorHandler(response)
            yield put(postBulkUploadFacultiesFailure(error));
            yield call(action.payload.onError(error));
        }
    } catch (error) {
        yield put(hideLoader());
        yield put(postBulkUploadFacultiesFailure(error));
        yield call(action.payload.onError(error));
    }
}

//bulk upload faculties


function* fetchEmployeesTemplatesSaga(action) {
    try {
        yield put(showLoader());
        const response = yield call(fetchEmployeesTemplatesApi, action.payload.params);
        console.log("responseempltempl============--->=================", response);

        if (response.success) {
            yield put(hideLoader());
            yield put(fetchEmployeesTemplatesSuccess(response.details));
            yield call(action.payload.onSuccess(response));
        } else {
            yield put(hideLoader());
            const error = sagaErrorHandler(response)
            yield put(fetchEmployeesTemplatesFailure(error));
            yield call(action.payload.onError(error));
        }
    } catch (error) {
        yield put(hideLoader());
        yield put(fetchEmployeesTemplatesFailure(error));
        yield call(action.payload.onError(error));
    }
}

//add user remarks


function* postUserRemarksSaga(action) {
    try {
        yield put(showLoader());
        const response = yield call(postuserRemarksApi, action.payload.params);

        if (response.success) {
            yield put(hideLoader());
            yield put(postUserRemarksSuccess(response.details));
            yield call(action.payload.onSuccess(response));
        } else {
            yield put(hideLoader());
            const error = sagaErrorHandler(response)
            yield put(postUserRemarksFailure(error));
            yield call(action.payload.onError(error));
        }
    } catch (error) {
        yield put(hideLoader());
        yield put(postUserRemarksFailure(error));
        yield call(action.payload.onError(error));
    }
}

//submit User Remarks Approval


function* postSubmitUserRemarksApprovalSaga(action) {
    try {
        yield put(showLoader());
        const response = yield call(postSubmitUserRemarksApprovalApi, action.payload.params);

        if (response.success) {
            yield put(hideLoader());
            yield put(postSubmitUserRemarksApprovalSuccess(response.details));
            yield call(action.payload.onSuccess(response));
        } else {
            yield put(hideLoader());
            const error = sagaErrorHandler(response)
            yield put(postSubmitUserRemarksApprovalFailure(error));
            yield call(action.payload.onError(error));
        }
    } catch (error) {
        yield put(hideLoader());
        yield put(postSubmitUserRemarksApprovalFailure(error));
        yield call(action.payload.onError(error));
    }
}


//submit task approval by faculty


function* postSubmitTaskApprovalByFacultySaga(action) {
    try {
        yield put(showLoader());
        const response = yield call(postSubmitTaskApprovalByFacultyApi, action.payload.params);

        if (response.success) {
            yield put(hideLoader());
            yield put(postSubmitTaskApprovalByFacultySuccess(response.details));
            yield call(action.payload.onSuccess(response));
        } else {
            yield put(hideLoader());
            const error = sagaErrorHandler(response)
            yield put(postSubmitTaskApprovalByFacultyFailure(error));
            yield call(action.payload.onError(error));
        }
    } catch (error) {
        yield put(hideLoader());
        yield put(postSubmitTaskApprovalByFacultyFailure(error));
        yield call(action.payload.onError(error));
    }
}

//add course saga


function* postAddCourseSaga(action) {
    try {
        yield put(showLoader());
        const response = yield call(postAddCourseApi, action.payload.params);

        if (response.success) {
            yield put(hideLoader());
            yield put(postAddCourseSuccess(response.details));
            yield call(action.payload.onSuccess(response));
        } else {
            yield put(hideLoader());
            const error = sagaErrorHandler(response)
            yield put(postAddCourseFailure(error));
            yield call(action.payload.onError(error));
        }
    } catch (error) {
        yield put(hideLoader());
        yield put(postAddCourseFailure(error));
        yield call(action.payload.onError(error));
    }
}

//add course section saga


function* postAddCourseSectionSaga(action) {
    try {
        yield put(showLoader());
        const response = yield call(postAddCourseSectionApi, action.payload.params);

        if (response.success) {
            yield put(hideLoader());
            yield put(postAddCourseSectionSuccess(response.details));
            yield call(action.payload.onSuccess(response));
        } else {
            yield put(hideLoader());
            const error = sagaErrorHandler(response)
            yield put(postAddCourseSectionFailure(error));
            yield call(action.payload.onError(error));
        }
    } catch (error) {
        yield put(hideLoader());
        yield put(postAddCourseSectionFailure(error));
        yield call(action.payload.onError(error));
    }
}

//add course topic saga


function* postAddCourseTopicSaga(action) {
    try {
        yield put(showLoader());
        const response = yield call(postAddCourseTopicApi, action.payload.params);

        if (response.success) {
            yield put(hideLoader());
            yield put(postAddCourseTopicSuccess(response.details));
            yield call(action.payload.onSuccess(response));
        } else {
            yield put(hideLoader());
            const error = sagaErrorHandler(response)
            yield put(postAddCourseTopicFailure(error));
            yield call(action.payload.onError(error));
        }
    } catch (error) {
        yield put(hideLoader());
        yield put(postAddCourseTopicFailure(error));
        yield call(action.payload.onError(error));
    }
}

//add course task saga


function* postAddCourseTaskSaga(action) {
    try {
        yield put(showLoader());
        const response = yield call(postAddCourseTaskApi, action.payload.params);

        if (response.success) {
            yield put(hideLoader());
            yield put(postAddCourseTaskSuccess(response.details));
            yield call(action.payload.onSuccess(response));
        } else {
            yield put(hideLoader());
            const error = sagaErrorHandler(response)
            yield put(postAddCourseTaskFailure(error));
            yield call(action.payload.onError(error));
        }
    } catch (error) {
        yield put(hideLoader());
        yield put(postAddCourseTaskFailure(error));
        yield call(action.payload.onError(error));
    }
}


//Add batch

function* postAddBatchSaga(action) {
    try {
        yield put(showLoader());
        const response = yield call(postAddBatchApi, action.payload.params);

        if (response.success) {
            yield put(hideLoader());
            yield put(postAddBatchSuccess(response.details));
            yield call(action.payload.onSuccess(response));
        } else {
            yield put(hideLoader());
            const error = sagaErrorHandler(response)
            yield put(postAddBatchFailure(error));
            yield call(action.payload.onError(error));
        }
    } catch (error) {
        yield put(hideLoader());
        yield put(postAddBatchFailure(error));
        yield call(action.payload.onError(error));
    }
}

//Add weekly calendar

function* postAddWeeklyCalendarSaga(action) {
    try {
        yield put(showLoader());
        const response = yield call(postAddWeeklyCalendarApi, action.payload.params);

        if (response.success) {
            yield put(hideLoader());
            yield put(postAddWeeklyCalendarSuccess(response.details));
            yield call(action.payload.onSuccess(response));
        } else {
            yield put(hideLoader());
            const error = sagaErrorHandler(response)
            yield put(postAddWeeklyCalendarFailure(error));
            yield call(action.payload.onError(error));
        }
    } catch (error) {
        yield put(hideLoader());
        yield put(postAddWeeklyCalendarFailure(error));
        yield call(action.payload.onError(error));
    }
}

//get course batches

function* getCourseBatchesSaga(action) {
    try {
        yield put(showLoader());
        const response = yield call(fetchCourseBatchesApi, action.payload.params);

        if (response.success) {
            yield put(hideLoader());
            yield put(getCourseBatchesSuccess(response.details));
            yield call(action.payload.onSuccess(response));
        } else {
            yield put(hideLoader());
            const error = sagaErrorHandler(response)
            yield put(getCourseBatchesFailure(error));
            yield call(action.payload.onError(error));
        }
    } catch (error) {
        yield put(hideLoader());
        yield put(getCourseBatchesFailure(error));
        yield call(action.payload.onError(error));
    }
}


//get course batch details

function* getCourseBatchDetailsSaga(action) {
    try {
        yield put(showLoader());
        const response = yield call(fetchCourseBatchDetailsApi, action.payload.params);

        if (response.success) {
            yield put(hideLoader());
            yield put(getCourseBatchDetailsSuccess(response.details));
            yield call(action.payload.onSuccess(response));
        } else {
            yield put(hideLoader());
            const error = sagaErrorHandler(response)
            yield put(getCourseBatchDetailsFailure(error));
            yield call(action.payload.onError(error));
        }
    } catch (error) {
        yield put(hideLoader());
        yield put(getCourseBatchDetailsFailure(error));
        yield call(action.payload.onError(error));
    }
}

//Assign course batch to student

function* assignCourseBatchToStudentSaga(action) {
    try {
        yield put(showLoader());
        const response = yield call(assignCourseBatchToStudentApi, action.payload.params);

        if (response.success) {
            yield put(hideLoader());
            yield put(assignCourseBatchToStudentSuccess(response.details));
            yield call(action.payload.onSuccess(response));
        } else {
            yield put(hideLoader());
            const error = sagaErrorHandler(response)
            yield put(assignCourseBatchToStudentFailure(error));
            yield call(action.payload.onError(error));
        }
    } catch (error) {
        yield put(hideLoader());
        yield put(assignCourseBatchToStudentFailure(error));
        yield call(action.payload.onError(error));
    }
}

//get batch students

function* fetchBatchStudentsSaga(action) {
    try {
        yield put(showLoader());
        const response = yield call(fetchBatchStudentsApi, action.payload.params);

        if (response.success) {
            yield put(hideLoader());
            yield put(fetchBatchStudentsSuccess(response.details));
            yield call(action.payload.onSuccess(response));
        } else {
            yield put(hideLoader());
            const error = sagaErrorHandler(response)
            yield put(fetchBatchStudentsFailure(error));
            yield call(action.payload.onError(error));
        }
    } catch (error) {
        yield put(hideLoader());
        yield put(fetchBatchStudentsFailure(error));
        yield call(action.payload.onError(error));
    }
}

//get course batch added students

function* fetchCourseBatchAddedStudentsSaga(action) {
    try {
        yield put(showLoader());
        const response = yield call(fetchCourseBatchAddedStudentsApi, action.payload.params);

        if (response.success) {
            yield put(hideLoader());
            yield put(fetchCourseBatchAddedStudentsSuccess(response.details));
            yield call(action.payload.onSuccess(response));
        } else {
            yield put(hideLoader());
            const error = sagaErrorHandler(response)
            yield put(fetchCourseBatchAddedStudentsFailure(error));
            yield call(action.payload.onError(error));
        }
    } catch (error) {
        yield put(hideLoader());
        yield put(fetchCourseBatchAddedStudentsFailure(error));
        yield call(action.payload.onError(error));
    }
}

//get pages saga

function* fetchGetPagesSaga(action) {
    try {
        yield put(showLoader());
        const response = yield call(fetchGetPagesApi, action.payload.params);

        if (response.success) {
            yield put(hideLoader());
            yield put(fetchGetPagesSuccess(response.details));
            yield call(action.payload.onSuccess(response));
        } else {
            yield put(hideLoader());
            const error = sagaErrorHandler(response)
            yield put(fetchGetPagesFailure(error));
            yield call(action.payload.onError(error));
        }
    } catch (error) {
        yield put(hideLoader());
        yield put(fetchGetPagesFailure(error));
        yield call(action.payload.onError(error));
    }
}

// postAddBatchCompletionEventSaga

//Add Batch Completion Event Saga

function* postAddBatchCompletionEventSaga(action) {
    try {
        yield put(showLoader());
        const response = yield call(postAddBatchCompletionEventApi, action.payload.params);

        if (response.success) {
            yield put(hideLoader());
            yield put(postAddBatchCompletionEventSuccess(response.details));
            yield call(action.payload.onSuccess(response));
        } else {
            yield put(hideLoader());
            const error = sagaErrorHandler(response)
            yield put(postAddBatchCompletionEventFailure(error));
            yield call(action.payload.onError(error));
        }
    } catch (error) {
        yield put(hideLoader());
        yield put(postAddBatchCompletionEventFailure(error));
        yield call(action.payload.onError(error));
    }
}

//get Batch Completion Event saga

function* fetchGetBatchCompletionEventSaga(action) {
    try {
        yield put(showLoader());
        const response = yield call(fetchGetBatchCompletionEventApi, action.payload.params);

        if (response.success) {
            yield put(hideLoader());
            yield put(fetchGetBatchCompletionEventSuccess(response.details));
            yield call(action.payload.onSuccess(response));
        } else {
            yield put(hideLoader());
            const error = sagaErrorHandler(response)
            yield put(fetchGetBatchCompletionEventFailure(error));
            yield call(action.payload.onError(error));
        }
    } catch (error) {
        yield put(hideLoader());
        yield put(fetchGetBatchCompletionEventFailure(error));
        yield call(action.payload.onError(error));
    }
}

// post Page section Saga

function* postPageSectionSaga(action) {
    try {
        yield put(showLoader());
        const response = yield call(postPageSectionApi, action.payload.params);

        if (response.success) {
            yield put(hideLoader());
            yield put(postPageSectionSuccess(response.details));
            yield call(action.payload.onSuccess(response));
        } else {
            yield put(hideLoader());
            const error = sagaErrorHandler(response)
            yield put(postPageSectionFailure(error));
            yield call(action.payload.onError(error));
        }
    } catch (error) {
        yield put(hideLoader());
        yield put(postPageSectionFailure(error));
        yield call(action.payload.onError(error));
    }
}


// post Update User Online Activity Log Saga

function* postUpdateUserOnlineActivityLogSaga(action) {
    try {
        yield put(showLoader());
        const response = yield call(postUpdateUserOnlineActivityLogApi, action.payload.params);

        if (response.success) {
            yield put(hideLoader());
            yield put(postUpdateUserOnlineActivityLogSuccess(response.details));
            yield call(action.payload.onSuccess(response));
        } else {
            yield put(hideLoader());
            const error = sagaErrorHandler(response)
            yield put(postUpdateUserOnlineActivityLogFailure(error));
            yield call(action.payload.onError(error));
        }
    } catch (error) {
        yield put(hideLoader());
        yield put(postUpdateUserOnlineActivityLogFailure(error));
        yield call(action.payload.onError(error));
    }
}



/**
 * Student...........................................................................................................................
 */


/**
 * get student courses
 */

function* getStudentCoursesSaga(action) {
    try {
        yield put(showLoader());

        const response = yield call(fetchStudentCoursesApi, action.payload.params);
        if (response.success) {
            yield put(hideLoader());
            yield put(fetchStudentCoursesSuccess(response.details));
            yield call(action.payload.onSuccess(response));
        } else {
            yield put(hideLoader());
            const error = sagaErrorHandler(response)
            yield put(fetchStudentCoursesFailure(error));
            yield call(action.payload.onError(error));
        }
    } catch (error) {
        yield put(hideLoader());
        yield put(fetchStudentCoursesFailure(error));
        yield call(action.payload.onError(error));
    }
}

/**
 * get student course section
 */

function* getStudentCourseSectionSaga(action) {
    try {
        yield put(showLoader());

        const response = yield call(fetchStudentCourseSectionsApi, action.payload.params);
        if (response.success) {
            yield put(hideLoader());
            yield put(fetchStudentCourseSectionSuccess(response.details));
            yield call(action.payload.onSuccess(response));
        } else {
            yield put(hideLoader());
            const error = sagaErrorHandler(response)
            yield put(fetchStudentCourseSectionFailure(error));
            yield call(action.payload.onError(error));
        }
    } catch (error) {
        yield put(hideLoader());
        yield put(fetchStudentCourseSectionFailure(error));
        yield call(action.payload.onError(error));
    }
}

/**
 * get student course topics
 */

function* getStudentCourseTopicsSaga(action) {
    try {
        yield put(showLoader());

        const response = yield call(fetchStudentCourseTopicsApi, action.payload.params);
        if (response.success) {
            yield put(hideLoader());
            yield put(fetchStudentCourseTopicsSuccess(response.details));
            yield call(action.payload.onSuccess(response));
        } else {
            yield put(hideLoader());
            const error = sagaErrorHandler(response)
            yield put(fetchStudentCourseTopicsFailure(error));
            yield call(action.payload.onError(error));
        }
    } catch (error) {
        yield put(hideLoader());
        yield put(fetchStudentCourseTopicsFailure(error));
        yield call(action.payload.onError(error));
    }
}

/**
 * fetch student course tasks saga
 */
function* fetchStudentCourseTasksSaga(action) {
    console.log("sagaaaaaa", action);
    try {
        yield put(showLoader());

        const response = yield call(fetchStudentCourseTasksApi, action.payload.params);
        console.log("response============--->", response);

        if (response.success) {
            yield put(hideLoader());
            yield put(fetchStudentCourseTasksSuccess(response.details));
            yield call(action.payload.onSuccess(response));
        } else {
            yield put(hideLoader());
            yield put(fetchStudentCourseTasksFailure(response.error_message));
            yield call(action.payload.onError(response));
        }
    } catch (error) {
        yield put(hideLoader());
        yield put(fetchStudentCourseTasksFailure(error));
        yield call(action.payload.onError(error));
        console.log(error + "+=========fetchCourseTopics");

    }
}

// /**
//  * fetch student course tasks details saga
//  */
function* fetchStudentCourseTasksDetailsSaga(action) {
    try {
        yield put(showLoader());

        const response = yield call(fetchStudentCourseTasksDetailsApi, action.payload.params);
        console.log("response============--->", response);

        if (response.success) {
            yield put(hideLoader());
            yield put(fetchStudentCourseTaskDetailsSuccess(response.details));
            yield call(action.payload.onSuccess(response));
        } else {
            yield put(hideLoader());
            const error = sagaErrorHandler(response)
            yield put(fetchStudentCourseTasksDetailsFailure(error));
            yield call(action.payload.onError(error));
        }
    } catch (error) {
        yield put(hideLoader());
        yield put(fetchStudentCourseTasksDetailsFailure(error));
        yield call(action.payload.onError(error));
    }
}

/**
 * get branches
 */

function* getAllBranches(action) {
    try {
        yield put(showLoader());

        const response = yield call(fetchAllBranchesListApi, action.payload.params);
        if (response.success) {
            yield put(hideLoader());
            yield put(getAllBranchesListSuccess(response.details));
            yield call(action.payload.onSuccess(response));
        } else {
            yield put(hideLoader());
            const error = sagaErrorHandler(response)
            yield put(getAllBranchesListFailure(error));
            yield call(action.payload.onError(error));
        }
    } catch (error) {
        yield put(hideLoader());
        yield put(getAllBranchesListFailure(error));
        yield call(action.payload.onError(error));

    }
}

function* postStudentCourseTasksDetailsSaga(action) {
    try {
        yield put(showLoader());

        const response = yield call(postStudentCourseTasksDetailsApi, action.payload.params);
        if (response.success) {
            yield put(hideLoader());
            yield put(postStudentCourseTasksDetailsSuccess(response));
            yield call(action.payload.onSuccess(response));
        } else {
            yield put(hideLoader());
            const error = sagaErrorHandler(response)
            yield put(postStudentCourseTasksDetailsFailure(error));
            yield call(action.payload.onError(error));
        }
    } catch (error) {
        yield put(hideLoader());
        yield put(postStudentCourseTasksDetailsFailure(error));
        yield call(action.payload.onError(error));
    }
}


// get page section


function* getPageSectionSaga(action) {
    try {
        yield put(showLoader());
        const response = yield call(fetchPageSectionsApi, action.payload.params);

        if (response.success) {
            yield put(hideLoader());
            yield put(fetchPageSectionsSuccess(response.details));
            yield call(action.payload.onSuccess(response.details));
        } else {
            yield put(hideLoader());
            const error = sagaErrorHandler(response)
            yield put(fetchPageSectionsFailure(error));
            yield call(action.payload.onError(error));
        }
    } catch (error) {
        yield put(hideLoader());
        yield put(fetchPageSectionsFailure(error));
        yield call(action.payload.onError(error));
    }
}


// get Section Type Title


function* getSectionTypeTitleSaga(action) {


    console.log(JSON.stringify(action.payload.params));
    try {
        yield put(showLoader());

        const response = yield call(fetchSectionTypeTitleApi, action.payload.params);
        // console.log("response============--->", response);

        if (response.success) {
            yield put(hideLoader());
            yield put(fetchSectionTypeTitleSuccess(response.details));
            yield call(action.payload.onSuccess(response.details));
        } else {
            yield put(hideLoader());
            yield put(fetchSectionTypeTitleFailure(response.error_message));
            yield call(action.payload.onError(response));
        }
    } catch (error) {
        yield put(hideLoader());
        yield put(fetchSectionTypeTitleFailure(error));
        yield call(action.payload.onError(error));
    }
}


// get Section Type Image


function* getSectionTypeImageSaga(action) {
    try {
        yield put(showLoader());

        const response = yield call(fetchSectionTypeImageApi, action.payload.params);
        console.log("response============--->", response);

        if (response.success) {
            yield put(hideLoader());
            yield put(fetchSectionTypeImageSuccess(response.details));
            yield call(action.payload.onSuccess(response.details));
        } else {
            yield put(hideLoader());
            yield put(fetchSectionTypeImageFailure(response.error_message));
            yield call(action.payload.onError(response));
        }
    } catch (error) {
        yield put(hideLoader());
        yield put(fetchSectionTypeImageFailure(error));
        yield call(action.payload.onError(error));
    }
}


// get Section Type Video


function* getSectionTypeVideoSaga(action) {
    try {
        yield put(showLoader());

        const response = yield call(fetchSectionTypeVideoApi, action.payload.params);
        console.log("response============--->", response);

        if (response.success) {
            yield put(hideLoader());
            yield put(fetchSectionTypeVideoSuccess(response.details));
            yield call(action.payload.onSuccess(response.details));
        } else {
            yield put(hideLoader());
            yield put(fetchSectionTypeVideoFailure(response.error_message));
            yield call(action.payload.onError(response));
        }
    } catch (error) {
        yield put(hideLoader());
        yield put(fetchSectionTypeVideoFailure(error));
        yield call(action.payload.onError(error));
    }
}


// get Section Type Paragraph


function* getSectionTypeParagraphSaga(action) {
    try {
        yield put(showLoader());

        const response = yield call(fetchSectionTypeParagraphApi, action.payload.params);
        console.log("response============--->", response);

        if (response.success) {
            yield put(hideLoader());
            yield put(fetchSectionTypeParagraphSuccess(response.details));
            yield call(action.payload.onSuccess(response.details));
        } else {
            yield put(hideLoader());
            yield put(fetchSectionTypeParagraphFailure(response.error_message));
            yield call(action.payload.onError(response));
        }
    } catch (error) {
        yield put(hideLoader());
        yield put(fetchSectionTypeParagraphFailure(error));
        yield call(action.payload.onError(error));
    }
}


// get Section Type List


function* getSectionTypeListSaga(action) {
    try {
        yield put(showLoader());

        const response = yield call(fetchSectionTypeListApi, action.payload.params);
        if (response.success) {
            console.log("dffdfddffdf");
            yield put(hideLoader());
            yield put(fetchSectionTypeListSuccess(response.details));
            yield call(action.payload.onSuccess(response.details));
        } else {
            yield put(hideLoader());
            yield put(fetchSectionTypeListFailure(response.error_message));
            yield call(action.payload.onError(response));
        }
    } catch (error) {
        yield put(hideLoader());
        yield put(fetchSectionTypeListFailure(error));
        yield call(action.payload.onError(error));
    }
}


//get Section Type Md


function* getSectionTypeMdSaga(action) {
    try {
        yield put(showLoader());

        const response = yield call(fetchSectionTypeMdApi, action.payload.params);
        console.log("response============--->", response);

        if (response.success) {
            yield put(hideLoader());
            yield put(fetchSectionTypeMdSuccess(response.details));
            yield call(action.payload.onSuccess(response.details));
        } else {
            yield put(hideLoader());
            yield put(fetchSectionTypeMdFailure(response.error_message));
            yield call(action.payload.onError(response));
        }
    } catch (error) {
        yield put(hideLoader());
        yield put(fetchSectionTypeMdFailure(error));
        yield call(action.payload.onError(error));
    }
}

//post bulk upload courses

function* postBulkUploadCoursesSaga(action) {
    try {
        yield put(showLoader());

        const response = yield call(postBulkUploadCoursesApi, action.payload.params);
        console.log("response============--->", response);

        if (response.success) {
            yield put(hideLoader());
            yield put(postBulkUploadCoursesSuccess(response.details));
            yield call(action.payload.onSuccess(response.details));
        } else {
            yield put(hideLoader());
            yield put(postBulkUploadCoursesFailure(response.error_message));
            yield call(action.payload.onError(response));
        }
    } catch (error) {
        yield put(hideLoader());
        yield put(postBulkUploadCoursesFailure(error));
        yield call(action.payload.onError(error));
    }
}


//post bulk upload section

function* postBulkUploadSectionSaga(action) {
    try {
        yield put(showLoader());

        const response = yield call(postBulkUploadSectionsApi, action.payload.params);
        if (response.success) {
            yield put(hideLoader());
            yield put(postBulkUploadSectionSuccess(response));
            yield call(action.payload.onSuccess(response));
        } else {
            yield put(hideLoader());
            const error = sagaErrorHandler(response)
            yield put(postBulkUploadSectionFailure(error));
            yield call(action.payload.onError(error));
        }
    } catch (error) {
        yield put(hideLoader());
        yield put(postBulkUploadSectionFailure(error));
        yield call(action.payload.onError(error));
    }
}

//post bulk upload topics

function* postBulkUploadTopicsSaga(action) {
    try {
        yield put(showLoader());
        const response = yield call(postBulkUploadTopicsApi, action.payload.params);

        if (response.success) {
            console.log("response============--->", response.success);
            yield put(hideLoader());
            yield put(postBulkUploadTopicsSuccess(response));
            yield call(action.payload.onSuccess(response));
        } else {
            yield put(hideLoader());
            const error = sagaErrorHandler(response)
            yield put(postBulkUploadTopicsFailure(error));
            yield call(action.payload.onError(error));
        }
    } catch (error) {
        yield put(hideLoader());
        yield put(postBulkUploadTopicsFailure(error));
        yield call(action.payload.onError(error));
    }
}

//post bulk upload tasks


function* postBulkUploadTasksSaga(action) {
    try {
        yield put(showLoader());

        const response = yield call(postBulkUploadTasksApi, action.payload.params);
        console.log("response============--->", response);

        if (response.success) {
            yield put(hideLoader());
            yield put(postBulkUploadTasksSuccess(response));
            yield call(action.payload.onSuccess(response));
        } else {
            yield put(hideLoader());
            const error = sagaErrorHandler(response)
            yield put(postBulkUploadTasksFailure(error));
            yield call(action.payload.onError(error));
        }
    } catch (error) {
        yield put(hideLoader());
        yield put(postBulkUploadTasksFailure(error));
        yield call(action.payload.onError(error));
    }
}

// get student page section


function* getStudentPageSectionSaga(action) {
    try {
        yield put(showLoader());

        const response = yield call(fetchStudentPageSectionsApi, action.payload.params);
        if (response.success) {
            yield put(hideLoader());
            yield put(fetchStudentPageSectionsSuccess(response.details));
            yield call(action.payload.onSuccess(response));
        } else {
            yield put(hideLoader());
            const error = sagaErrorHandler(response)
            yield put(fetchStudentPageSectionsFailure(error));
            yield call(action.payload.onError(error));
        }
    } catch (error) {
        yield put(hideLoader());
        yield put(fetchStudentPageSectionsFailure(error));
        yield call(action.payload.onError(error));
    }
}

// get student Section Type Title


function* getStudentSectionTypeTitleSaga(action) {


    console.log(JSON.stringify(action.payload.params));
    try {
        yield put(showLoader());

        const response = yield call(fetchStudentSectionTypeTitleApi, action.payload.params);
        console.log("getStudentSectionTypeTitleSaga============--->", response);

        if (response.success) {
            yield put(hideLoader());
            yield put(fetchStudentSectionTypeTitleSuccess(response.details));
            yield call(action.payload.onSuccess(response.details));
        } else {
            yield put(hideLoader());
            yield put(fetchStudentSectionTypeTitleFailure(response.error_message));
            yield call(action.payload.onError(response));
        }
    } catch (error) {
        yield put(hideLoader());
        yield put(fetchStudentSectionTypeTitleFailure(error));
        yield call(action.payload.onError(error));
    }
}


//get student Section Type Image


function* getStudentSectionTypeImageSaga(action) {
    try {
        yield put(showLoader());

        const response = yield call(fetchStudentSectionTypeImageApi, action.payload.params);
        console.log("response============--->", response);

        if (response.success) {
            yield put(hideLoader());
            yield put(fetchStudentSectionTypeImageSuccess(response.details));
            yield call(action.payload.onSuccess(response.details));
        } else {
            yield put(hideLoader());
            yield put(fetchStudentSectionTypeImageFailure(response.error_message));
            yield call(action.payload.onError(response));
        }
    } catch (error) {
        yield put(hideLoader());
        yield put(fetchStudentSectionTypeImageFailure(error));
        yield call(action.payload.onError(error));
    }
}


// // get student Section Type Video


function* getStudentSectionTypeVideoSaga(action) {
    try {
        yield put(showLoader());

        const response = yield call(fetchStudentSectionTypeVideoApi, action.payload.params);
        console.log("response============--->", response);

        if (response.success) {
            yield put(hideLoader());
            yield put(fetchStudentSectionTypeVideoSuccess(response.details));
            yield call(action.payload.onSuccess(response.details));
        } else {
            yield put(hideLoader());
            yield put(fetchStudentSectionTypeVideoFailure(response.error_message));
            yield call(action.payload.onError(response));
        }
    } catch (error) {
        yield put(hideLoader());
        yield put(fetchStudentSectionTypeVideoFailure(error));
        yield call(action.payload.onError(error));
    }
}


// get student Section Type Paragraph


function* getStudentSectionTypeParagraphSaga(action) {
    try {
        yield put(showLoader());

        const response = yield call(fetchStudentSectionTypeParagraphApi, action.payload.params);
        console.log("response============--->", response);

        if (response.success) {
            yield put(hideLoader());
            yield put(fetchStudentSectionTypeParagraphSuccess(response.details));
            yield call(action.payload.onSuccess(response.details));
        } else {
            yield put(hideLoader());
            yield put(fetchStudentSectionTypeParagraphFailure(response.error_message));
            yield call(action.payload.onError(response));
        }
    } catch (error) {
        yield put(hideLoader());
        yield put(fetchStudentSectionTypeParagraphFailure(error));
        yield call(action.payload.onError(error));
    }
}


// // get student Section Type List


function* getStudentSectionTypeListSaga(action) {
    try {
        yield put(showLoader());

        const response = yield call(fetchStudentSectionTypeListApi, action.payload.params);
        if (response.success) {
            yield put(hideLoader());
            yield put(fetchStudentSectionTypeListSuccess(response.details));
            yield call(action.payload.onSuccess(response.details));
        } else {
            yield put(hideLoader());
            yield put(fetchStudentSectionTypeListFailure(response.error_message));
            yield call(action.payload.onError(response));
        }
    } catch (error) {
        yield put(hideLoader());
        yield put(fetchStudentSectionTypeListFailure(error));
        yield call(action.payload.onError(error));
    }
}


// //get student Section Type Md


function* getStudentSectionTypeMdSaga(action) {
    try {
        yield put(showLoader());

        const response = yield call(fetchStudentSectionTypeMdApi, action.payload.params);
        console.log("response============--->", response);

        if (response.success) {
            yield put(hideLoader());
            yield put(fetchStudentSectionTypeMdSuccess(response.details));
            yield call(action.payload.onSuccess(response.details));
        } else {
            yield put(hideLoader());
            yield put(fetchStudentSectionTypeMdFailure(response.error_message));
            yield call(action.payload.onError(response));
        }
    } catch (error) {
        yield put(hideLoader());
        yield put(fetchStudentSectionTypeMdFailure(error));
        yield call(action.payload.onError(error));
    }
}

// get student tasks timeline saga


function* fetchStudentTasksTimeLineSaga(action) {
    try {
        yield put(showLoader());

        const response = yield call(fetchStudentTasksTimelineApi, action.payload.params);
        console.log("ressssss==", response)
        if (response.success) {
            yield put(hideLoader());
            yield put(fetchStudentTasksTimelineSuccess(response.details));
            yield call(action.payload.onSuccess(response));
        } else {
            yield put(hideLoader());
            const error = sagaErrorHandler(response)
            yield put(fetchStudentTasksTimelineFailure(error));
            yield call(action.payload.onError(error));
        }
    } catch (error) {
        yield put(hideLoader());
        yield put(fetchStudentTasksTimelineFailure(error));
        yield call(action.payload.onError(error));
    }
}

// student code submission


function* postStudentCodeSubmissionSaga(action) {
    try {
        yield put(showLoader());

        const response = yield call(postStudentCodeSubmissionApi, action.payload.params);
        console.log("response============--->", response);

        if (response) {
            yield put(hideLoader());
            yield put(postStudentCodeSubmissionSuccess(response));
            yield call(action.payload.onSuccess(response));
        } else {
            yield put(hideLoader());
            const error = sagaErrorHandler(response)
            yield put(postStudentCodeSubmissionFailure(error));
            yield call(action.payload.onError(error));
        }
    } catch (error) {
        yield put(hideLoader());
        yield put(postStudentCodeSubmissionFailure(error));
        yield call(action.payload.onError(error));
    }
}

// add task by student saga


function* postTaskByStudentSaga(action) {
    try {
        yield put(showLoader());
        const response = yield call(postTaskByStudentApi, action.payload.params);
        if (response.success) {
            yield put(hideLoader());
            yield put(postTaskByStudentSuccess(response));
            yield call(action.payload.onSuccess(response));
        } else {
            yield put(hideLoader());
            const error = sagaErrorHandler(response)
            yield put(postTaskByStudentFailure(error));
            yield call(action.payload.onError(error));
        }
    } catch (error) {
        yield put(hideLoader());
        yield put(postTaskByStudentFailure(error));
        yield call(action.payload.onError(error));
    }
}

//get Student Tasks Details Open Saga

function* fetchStudentTasksDetailsOpenSaga(action) {
    console.log("actionnnn")
    try {
        yield put(showLoader());

        const response = yield call(fetchStudentTasksDetailsOpenApi, action.payload.params);
        console.log("responsetaskbystudent============--->", response);

        if (response.success) {
            yield put(hideLoader());
            yield put(fetchStudentTasksDetailsOpenSuccess(response));
            yield call(action.payload.onSuccess(response));
        } else {
            yield put(hideLoader());
            const error = sagaErrorHandler(response)
            yield put(fetchStudentTasksDetailsOpenFailure(error));
            yield call(action.payload.onError(error));
        }
    } catch (error) {
        yield put(hideLoader());
        yield put(fetchStudentTasksDetailsOpenFailure(error));
        yield call(action.payload.onError(error));
    }
}

//post batch student video conference 

function* postBatchVideoCallUserSaga(action) {
    console.log("actionnnn")
    try {
        yield put(showLoader());

        const response = yield call(postBatchVideoCallUSersApi, action.payload.params);
        console.log("responsetaskbystudent============--->", response);

        if (response.success) {
            yield put(hideLoader());
            yield put(postBatchVideoCallUsersSuccess(response));
            yield call(action.payload.onSuccess(response));
        } else {
            yield put(hideLoader());
            const error = sagaErrorHandler(response)
            yield put(postBatchVideoCallUsersFailure(error));
            yield call(action.payload.onError(error));
        }
    } catch (error) {
        yield put(hideLoader());
        yield put(postBatchVideoCallUsersFailure(error));
        yield call(action.payload.onError(error));
    }
}


//get batch video call user  

function* fetchBatchVideoCallUserSaga(action) {
    console.log("actionnnn")
    try {
        yield put(showLoader());

        const response = yield call(getBatchVideoCallUserApi, action.payload.params);
        console.log("responsetaskbystudent============--->", response);

        if (response.success) {
            yield put(hideLoader());
            yield put(fetchBatchVideoCallUsersSuccess(response));
            yield call(action.payload.onSuccess(response));
        } else {
            yield put(hideLoader());
            const error = sagaErrorHandler(response)
            yield put(fetchBatchVideoCallUsersFailure(error));
            yield call(action.payload.onError(error));
        }
    } catch (error) {
        yield put(hideLoader());
        yield put(fetchBatchVideoCallUsersFailure(error));
        yield call(action.payload.onError(error));
    }
}

//get token for video call  

function* fetchTokenByUserSaga(action) {
    console.log("actionnnn")
    try {
        yield put(showLoader());

        const response = yield call(fetchTokenByUserApi, action.payload.params);
        console.log("responsetaskbystudent============--->", response);

        if (response) {
            console.log("fetchTokenByUserSuccess==>success")
            yield put(hideLoader());
            yield put(fetchTokenByUserSuccess(response));
            yield call(action.payload.onSuccess(response));
        } else {
            yield put(hideLoader());
            const error = sagaErrorHandler(response)
            yield put(fetchTokenByUserFailure(error));
            yield call(action.payload.onError(error));
        }
    } catch (error) {
        yield put(hideLoader());
        yield put(fetchTokenByUserFailure(error));
        yield call(action.payload.onError(error));
    }
}


// add batch chat

function* postBatchChatSaga(action) {
    console.log("actionnnn")
    try {
        yield put(showLoader());

        const response = yield call(postBatchChatApi, action.payload.params);
        console.log("responsetaskbystudent============--->", response);

        if (response) {
            console.log("fetchTokenByUserSuccess==>success")
            yield put(hideLoader());
            yield put(postBatchChatSuccess(response));
            yield call(action.payload.onSuccess(response));
        } else {
            yield put(hideLoader());
            const error = sagaErrorHandler(response)
            yield put(postBatchChatFailure(error));
            yield call(action.payload.onError(error));
        }
    } catch (error) {
        yield put(hideLoader());
        yield put(postBatchChatFailure(error));
        yield call(action.payload.onError(error));
    }
}


//get batch chat 

function* fetchBatchChatSaga(action) {
    console.log("actionnnn")
    try {
        yield put(showLoader());

        const response = yield call(fetchBatchChatApi, action.payload.params);
        console.log("responsetaskbystudent============--->", response);

        if (response) {
            console.log("fetchTokenByUserSuccess==>success")
            yield put(hideLoader());
            yield put(fetchBatchChatSuccess(response.details));
            yield call(action.payload.onSuccess(response));
        } else {
            yield put(hideLoader());
            const error = sagaErrorHandler(response)
            yield put(fetchBatchChatFailure(error));
            yield call(action.payload.onError(error));
        }
    } catch (error) {
        yield put(hideLoader());
        yield put(fetchBatchChatFailure(error));
        yield call(action.payload.onError(error));
    }
}


//get 

function* fetchUserOnlineActivityLogSaga(action) {
    console.log("actionnnn")
    try {
        yield put(showLoader());

        const response = yield call(fetchUserOnlineActivityLogApi, action.payload.params);
        console.log("responsetaskbystudent============--->", response);

        if (response) {
            console.log("fetchTokenByUserSuccess==>success")
            yield put(hideLoader());
            yield put(fetchBatchUserOnlineActivityLogSuccess(response.details));
            yield call(action.payload.onSuccess(response));
        } else {
            yield put(hideLoader());
            const error = sagaErrorHandler(response)
            yield put(fetchBatchUserOnlineActivityLogFailure(error));
            yield call(action.payload.onError(error));
        }
    } catch (error) {
        yield put(hideLoader());
        yield put(fetchBatchUserOnlineActivityLogFailure(error));
        yield call(action.payload.onError(error));
    }
}





///watcher///..........................................................................................................................  fetchUserOnlineActivityLogApi

function* DashboardSaga() {
    yield takeLatest(FETCH_TASK_DETAILS, fetchTaskDetailsSaga);
    yield takeLatest(FETCH_COURSES, fetchCourses);
    yield takeLatest(FETCH_COURSE_SECTIONS, fetchCourseSectionsSaga);
    yield takeLatest(FETCH_COURSE_TOPICS, fetchCourseTopics);
    yield takeLatest(FETCH_COURSE_TOPIC_TASKS, fetchCourseTopicTasks);
    yield takeLatest(POST_GENERIC_CRUD_DETAILS, postGenericCrudDetailSaga);
    yield takeLatest(ADD_DEPARTMENT, addDepartment);
    yield takeLatest(ADD_DESIGNATION, addDesignation);
    yield takeLatest(FETCH_DESIGNATION, getDesignation);
    yield takeLatest(FETCH_DEPARTMENT, getDepartments);
    yield takeLatest(POST_GENERIC_BATCH_CRUD_DETAILS, postGenericBatchCrudDetailSaga);
    yield takeLatest(ADD_STUDENT, addStudent);
    yield takeLatest(FETCH_STUDENTS_LIST, getStudentsList);
    yield takeLatest(ADD_FACULTY, addFaculty);
    yield takeLatest(FETCH_FACULTIES_LIST, getFacultiesList);
    yield takeLatest(FETCH_APPROVER_LIST, getApproverListSaga);
    yield takeLatest(FETCH_REFERER_LIST, getRefererList);
    yield takeLatest(FETCH_STUDENTS_DETAILS, getStudentDetails);
    yield takeLatest(FETCH_DASHBOARD_DETAILS, getDashboardDetails);
    yield takeLatest(POST_RAISE_ANONYMOUS_COMPLAINT, postRaiseAnonymousComplaintSaga);
    yield takeLatest(FETCH_FACULTIES_DETAILS, getFacultyDetails);
    yield takeLatest(FETCH_COURSE_IDE, getCourseIdeSaga);
    yield takeLatest(FETCH_STUDENT_COURSE_TASKS_FACULTY, fetchStudentCourseTasksFacultySaga);
    yield takeLatest(FETCH_STUDENT_COURSE_TASK_DETAILS_FACULTY, fetchStudentCourseTaskDetailsFacultySaga);
    yield takeLatest(POST_SUBMIT_STUDENT_COURSE_PENDING_APPROVAL_TASK, postSubmitStudentCoursePendingApprovalSaga);
    yield takeLatest(POST_TASK_EVENT, postTaskEventSaga);
    yield takeLatest(FETCH_TASK_EVENTS, fetchTaskEventsSaga);
    yield takeLatest(FETCH_USER_ONLINE_ACTIVE_LOG, fetchUserOnlineActiveLogSaga);
    yield takeLatest(FETCH_TOPIC_TASK_TYPES, fetchTopicTaskTypesSaga);
    yield takeLatest(FETCH_USER_REMARK, getUserRemarkSaga);
    yield takeLatest(FETCH_USERS_REMARK, getUsersRemarkSaga);
    yield takeLatest(POST_BRANCH, postBranchSaga);
    yield takeLatest(POST_ADD_BATCH, postAddBatchSaga);
    yield takeLatest(POST_ADD_WEEKLY_CALENDAR, postAddWeeklyCalendarSaga);
    yield takeLatest(FETCH_COURSE_BATCHES, getCourseBatchesSaga);
    yield takeLatest(FETCH_COURSE_BATCH_DETAILS, getCourseBatchDetailsSaga);
    yield takeLatest(ASSIGN_COURSE_BATCH_TO_STUDENT, assignCourseBatchToStudentSaga);
    yield takeLatest(FETCH_BATCH_STUDENT, fetchBatchStudentsSaga);
    yield takeLatest(FETCH_COURSE_BATCH_ADDED_STUDENTS, fetchCourseBatchAddedStudentsSaga);
    yield takeLatest(FETCH_GET_PAGES, fetchGetPagesSaga);


    /**
     * group chat
     */
    yield takeLatest(POST_BATCH_CHAT, postBatchChatSaga);
    yield takeLatest(FETCH_BATCH_CHAT, fetchBatchChatSaga);
    yield takeLatest(FETCH_BATCH_USER_ONLINE_ACTIVITY_LOG, fetchUserOnlineActivityLogSaga);



    /**
     * page section admin
     */

    yield takeLatest(FETCH_PAGE_SECTIONS, getPageSectionSaga);
    yield takeEvery(FETCH_SECTION_TYPE_TITLE, getSectionTypeTitleSaga);
    yield takeEvery(FETCH_SECTION_TYPE_IMAGE, getSectionTypeImageSaga);
    yield takeEvery(FETCH_SECTION_TYPE_VIDEO, getSectionTypeVideoSaga);
    yield takeEvery(FETCH_SECTION_TYPE_PARAGRAPH, getSectionTypeParagraphSaga);
    yield takeEvery(FETCH_SECTION_TYPE_LIST, getSectionTypeListSaga);
    yield takeEvery(FETCH_SECTION_TYPE_MD, getSectionTypeMdSaga);

    /**
    * bulk uploads
    */

    yield takeLatest(POST_BULK_UPLOAD_COURSES, postBulkUploadCoursesSaga);
    yield takeLatest(POST_BULK_UPLOAD_SECTION, postBulkUploadSectionSaga);
    yield takeLatest(POST_BULK_UPLOAD_TOPICS, postBulkUploadTopicsSaga);
    yield takeLatest(POST_BULK_UPLOAD_TASKS, postBulkUploadTasksSaga);
    yield takeLatest(FETCH_COURSE_TEMPLATES, fetchCourseTemplatesSaga);

    yield takeLatest(POST_BULK_UPLOAD_STUDENTS, postBulkUploadStudentsSaga);
    yield takeLatest(POST_BULK_UPLOAD_FACULTIES, postBulkUploadFacultiesSaga);
    yield takeLatest(FETCH_EMPLOYEES_TEMPLATES, fetchEmployeesTemplatesSaga);

    yield takeLatest(POST_USER_REMARKS, postUserRemarksSaga);
    yield takeLatest(POST_SUBMIT_USER_REMARKS_APPROVAL, postSubmitUserRemarksApprovalSaga);
    yield takeLatest(POST_SUBMIT_TASK_APPROVAL_BY_FACULTY, postSubmitTaskApprovalByFacultySaga);
    yield takeLatest(POST_ADD_COURSE, postAddCourseSaga);
    yield takeLatest(POST_ADD_COURSE_SECTION, postAddCourseSectionSaga);
    yield takeLatest(POST_ADD_COURSE_TOPIC, postAddCourseTopicSaga);
    yield takeLatest(POST_ADD_COURSE_TASK, postAddCourseTaskSaga);

    yield takeLatest(POST_ADD_BATCH_COMPLETION_EVENT, postAddBatchCompletionEventSaga);
    yield takeLatest(FETCH_GET_BATCH_COMPLETION_EVENT, fetchGetBatchCompletionEventSaga);

    yield takeLatest(POST_PAGE_SECTION, postPageSectionSaga);
    yield takeLatest(POST_UPDATE_USER_ONLINE_ACTIVITY_LOG, postUpdateUserOnlineActivityLogSaga);















    /**
     * Student saga 
     */
    yield takeLatest(FETCH_STUDENT_COURSES, getStudentCoursesSaga);
    yield takeEvery(FETCH_STUDENT_COURSE_SECTION, getStudentCourseSectionSaga);
    yield takeLatest(FETCH_STUDENT_COURSE_TOPICS, getStudentCourseTopicsSaga);
    yield takeLatest(FETCH_STUDENT_COURSE_TASKS, fetchStudentCourseTasksSaga);
    yield takeLatest(FETCH_STUDENT_COURSE_TASKS_DETAILS, fetchStudentCourseTasksDetailsSaga);
    yield takeLatest(FETCH_ALL_BRANCHES_LIST, getAllBranches);
    yield takeLatest(POST_STUDENT_COURSE_TASK_DETAILS, postStudentCourseTasksDetailsSaga);
    yield takeLatest(STUDENT_CODE_SUBMISSION, postStudentCodeSubmissionSaga);
    yield takeLatest(POST_BATCH_VIDEO_CALL_USERS, postBatchVideoCallUserSaga);
    yield takeLatest(FETCH_BATCH_VIDEO_CALL_USERS, fetchBatchVideoCallUserSaga);
    yield takeLatest(FETCH_TOKEN_BY_USER, fetchTokenByUserSaga);


    /**
   * page section student
   */

    yield takeLatest(FETCH_STUDENT_PAGE_SECTIONS, getStudentPageSectionSaga);
    yield takeEvery(FETCH_STUDENT_SECTION_TYPE_TITLE, getStudentSectionTypeTitleSaga);
    yield takeEvery(FETCH_STUDENT_SECTION_TYPE_IMAGE, getStudentSectionTypeImageSaga);
    yield takeEvery(FETCH_STUDENT_SECTION_TYPE_VIDEO, getStudentSectionTypeVideoSaga);
    yield takeEvery(FETCH_STUDENT_SECTION_TYPE_PARAGRAPH, getStudentSectionTypeParagraphSaga);
    yield takeEvery(FETCH_STUDENT_SECTION_TYPE_LIST, getStudentSectionTypeListSaga);
    yield takeEvery(FETCH_STUDENT_SECTION_TYPE_MD, getStudentSectionTypeMdSaga);

    yield takeLatest(FETCH_STUDENT_TASKS_TIMELINE, fetchStudentTasksTimeLineSaga);

    yield takeLatest(POST_TASK_BY_STUDENT, postTaskByStudentSaga);
    yield takeLatest(FETCH_STUDENT_TASKS_DETAILS_OPEN, fetchStudentTasksDetailsOpenSaga)






}

export default DashboardSaga;