import {

  RESET_DASHBOARD,

  IS_SUPER_ADMIN,

  FETCH_TASK_DETAILS,
  FETCH_TASK_DETAILS_SUCCESS,
  FETCH_TASK_DETAILS_FAILURE,

  FETCH_COURSES,
  FETCH_COURSES_SUCCESS,
  FETCH_COURSES_FAILURE,

  FETCH_COURSE_SECTIONS,
  FETCH_COURSE_SECTIONS_SUCCESS,
  FETCH_COURSE_SECTIONS_FAILURE,

  FETCH_COURSE_TOPICS,
  FETCH_COURSE_TOPICS_SUCCESS,
  FETCH_COURSE_TOPICS_FAILURE,

  FETCH_COURSE_TOPIC_TASKS,
  FETCH_COURSE_TOPIC_TASKS_SUCCESS,
  FETCH_COURSE_TOPIC_TASKS_FAILURE,

  SET_COURSE_TOPIC_NAME,

  POST_GENERIC_CRUD_DETAILS,
  POST_GENERIC_CRUD_DETAILS_SUCCESS,
  POST_GENERIC_CRUD_DETAILS_FAILURE,

  ADD_DEPARTMENT,
  ADD_DEPARTMENT_SUCCESS,
  ADD_DEPARTMENT_FAILURE,

  ADD_DESIGNATION,
  ADD_DESIGNATION_SUCCESS,
  ADD_DESIGNATION_FAILURE,

  FETCH_DEPARTMENT,
  FETCH_DEPARTMENT_SUCCESS,
  FETCH_DEPARTMENT_FAILURE,

  FETCH_DESIGNATION,
  FETCH_DESIGNATION_SUCCESS,
  FETCH_DESIGNATION_FAILURE,

  POST_GENERIC_BATCH_CRUD_DETAILS,
  POST_GENERIC_BATCH_CRUD_DETAILS_SUCCESS,
  POST_GENERIC_BATCH_CRUD_DETAILS_FAILURE,

  SET_CURRENT_COURSE_SECTION,
  IS_DND_MODAL_OPEN,

  ADD_STUDENT,
  ADD_STUDENT_SUCCESS,
  ADD_STUDENT_FAILURE,

  FETCH_STUDENTS_LIST,
  FETCH_STUDENTS_LIST_SUCCESS,
  FETCH_STUDENTS_LIST_FAILURE,

  ADD_FACULTY,
  ADD_FACULTY_SUCCESS,
  ADD_FACULTY_FAILURE,

  FETCH_FACULTIES_LIST,
  FETCH_FACULTIES_LIST_SUCCESS,
  FETCH_FACULTIES_LIST_FAILURE,

  FETCH_APPROVER_LIST,
  FETCH_APPROVER_LIST_SUCCESS,
  FETCH_APPROVER_LIST_FAILURE,

  FETCH_REFERER_LIST,
  FETCH_REFERER_LIST_SUCCESS,
  FETCH_REFERER_LIST_FAILURE,

  SETTING_CURRENT_COURSE,

  FETCH_STUDENTS_DETAILS,
  FETCH_STUDENTS_DETAILS_SUCCESS,
  FETCH_STUDENTS_DETAILS_FAILURE,

  SETTING_CURRENT_TASK_ITEM,

  FETCH_DASHBOARD_DETAILS,
  FETCH_DASHBOARD_DETAILS_SUCCESS,
  FETCH_DASHBOARD_DETAILS_FAILURE,

  SETTING_SELECTED_FACULTY_ID,

  EDIT_USER_REGISTRATION,

  POST_RAISE_ANONYMOUS_COMPLAINT,
  POST_RAISE_ANONYMOUS_COMPLAINT_SUCCESS,
  POST_RAISE_ANONYMOUS_COMPLAINT_FAILURE,


  FETCH_FACULTIES_DETAILS,
  FETCH_FACULTIES_DETAILS_FAILURE,
  FETCH_FACULTIES_DETAILS_SUCCESS,

  FETCH_COURSE_IDE,
  FETCH_COURSE_IDE_SUCCESS,
  FETCH_COURSE_IDE_FAILURE,

  FETCH_STUDENT_COURSE_TASKS_FACULTY,
  FETCH_STUDENT_COURSE_TASKS_FACULTY_SUCCESS,
  FETCH_STUDENT_COURSE_TASKS_FACULTY_FAILURE,

  FETCH_STUDENT_COURSE_TASK_DETAILS_FACULTY,
  FETCH_STUDENT_COURSE_TASK_DETAILS_FACULTY_SUCCESS,
  FETCH_STUDENT_COURSE_TASK_DETAILS_FACULTY_FAILURE,

  VIEW_STUDENT_TASK_DETAILS_ID,

  POST_SUBMIT_STUDENT_COURSE_PENDING_APPROVAL_TASK,
  POST_SUBMIT_STUDENT_COURSE_PENDING_APPROVAL_TASK_SUCCESS,
  POST_SUBMIT_STUDENT_COURSE_PENDING_APPROVAL_TASK_FAILURE,

  POST_TASK_EVENT,
  POST_TASK_EVENT_SUCCESS,
  POST_TASK_EVENT_FAILURE,

  FETCH_TASK_EVENTS,
  FETCH_TASK_EVENTS_SUCCESS,
  FETCH_TASK_EVENTS_FAILURE,

  FETCH_USER_ONLINE_ACTIVE_LOG,
  FETCH_USER_ONLINE_ACTIVE_LOG_SUCCESS,
  FETCH_USER_ONLINE_ACTIVE_LOG_FAILURE,

  FETCH_TOPIC_TASK_TYPES,
  FETCH_TOPIC_TASK_TYPES_SUCCESS,
  FETCH_TOPIC_TASK_TYPES_FAILURE,

  FETCH_PAGE_SECTIONS,
  FETCH_PAGE_SECTIONS_SUCCESS,
  FETCH_PAGE_SECTIONS_FAILURE,

  FETCH_SECTION_TYPE_IMAGE,
  FETCH_SECTION_TYPE_IMAGE_FAILURE,
  FETCH_SECTION_TYPE_IMAGE_SUCCESS,

  FETCH_SECTION_TYPE_LIST,
  FETCH_SECTION_TYPE_LIST_FAILURE,
  FETCH_SECTION_TYPE_LIST_SUCCESS,

  FETCH_SECTION_TYPE_MD,
  FETCH_SECTION_TYPE_MD_FAILURE,
  FETCH_SECTION_TYPE_MD_SUCCESS,

  FETCH_SECTION_TYPE_PARAGRAPH,
  FETCH_SECTION_TYPE_PARAGRAPH_FAILURE,
  FETCH_SECTION_TYPE_PARAGRAPH_SUCCESS,

  FETCH_SECTION_TYPE_TITLE,
  FETCH_SECTION_TYPE_TITLE_FAILURE,
  FETCH_SECTION_TYPE_TITLE_SUCCESS,

  FETCH_SECTION_TYPE_VIDEO,
  FETCH_SECTION_TYPE_VIDEO_FAILURE,
  FETCH_SECTION_TYPE_VIDEO_SUCCESS,

  FETCH_USER_REMARK,
  FETCH_USER_REMARK_SUCCESS,
  FETCH_USER_REMARK_FAILURE,

  FETCH_USERS_REMARK,
  FETCH_USERS_REMARK_SUCCESS,
  FETCH_USERS_REMARK_FAILURE,

  IS_SHOW_STUDENTS_LIST,

  IS_SHOW_FACULTIES_LIST,

  IS_BACK,

  POST_BRANCH,
  POST_BRANCH_SUCCESS,
  POST_BRANCH_FAILURE,

  FETCH_COURSE_TEMPLATES,
  FETCH_COURSE_TEMPLATES_SUCCESS,
  FETCH_COURSE_TEMPLATES_FAILURE,

  POST_BULK_UPLOAD_COURSES,
  POST_BULK_UPLOAD_COURSES_FAILURE,
  POST_BULK_UPLOAD_COURSES_SUCCESS,

  POST_BULK_UPLOAD_SECTION,
  POST_BULK_UPLOAD_SECTION_SUCCESS,
  POST_BULK_UPLOAD_SECTION_FAILURE,

  POST_BULK_UPLOAD_TOPICS,
  POST_BULK_UPLOAD_TOPICS_FAILURE,
  POST_BULK_UPLOAD_TOPICS_SUCCESS,

  POST_BULK_UPLOAD_TASKS,
  POST_BULK_UPLOAD_TASKS_FAILURE,
  POST_BULK_UPLOAD_TASKS_SUCCESS,

  POST_BULK_UPLOAD_STUDENTS,
  POST_BULK_UPLOAD_STUDENTS_SUCCESS,
  POST_BULK_UPLOAD_STUDENTS_FAILURE,

  POST_BULK_UPLOAD_FACULTIES,
  POST_BULK_UPLOAD_FACULTIES_SUCCESS,
  POST_BULK_UPLOAD_FACULTIES_FAILURE,

  FETCH_EMPLOYEES_TEMPLATES,
  FETCH_EMPLOYEES_TEMPLATES_SUCCESS,
  FETCH_EMPLOYEES_TEMPLATES_FAILURE,

  SELECTED_FACULTY_DETAILS,

  POST_USER_REMARKS,
  POST_USER_REMARKS_SUCCESS,
  POST_USER_REMARKS_FAILURE,

  POST_SUBMIT_USER_REMARKS_APPROVAL,
  POST_SUBMIT_USER_REMARKS_APPROVAL_SUCCESS,
  POST_SUBMIT_USER_REMARKS_APPROVAL_FAILURE,

  POST_SUBMIT_TASK_APPROVAL_BY_FACULTY,
  POST_SUBMIT_TASK_APPROVAL_BY_FACULTY_SUCCESS,
  POST_SUBMIT_TASK_APPROVAL_BY_FACULTY_FAILURE,

  POST_ADD_COURSE,
  POST_ADD_COURSE_SUCCESS,
  POST_ADD_COURSE_FAILURE,

  POST_ADD_COURSE_SECTION,
  POST_ADD_COURSE_SECTION_SUCCESS,
  POST_ADD_COURSE_SECTION_FAILURE,

  POST_ADD_COURSE_TOPIC,
  POST_ADD_COURSE_TOPIC_SUCCESS,
  POST_ADD_COURSE_TOPIC_FAILURE,

  POST_ADD_COURSE_TASK,
  POST_ADD_COURSE_TASK_SUCCESS,
  POST_ADD_COURSE_TASK_FAILURE,

  DO_EDIT_QUESTION,

  POST_ADD_BATCH,
  POST_ADD_BATCH_SUCCESS,
  POST_ADD_BATCH_FAILURE,

  POST_ADD_WEEKLY_CALENDAR,
  POST_ADD_WEEKLY_CALENDAR_SUCCESS,
  POST_ADD_WEEKLY_CALENDAR_FAILURE,

  FETCH_COURSE_BATCHES,
  FETCH_COURSE_BATCHES_SUCCESS,
  FETCH_COURSE_BATCHES_FAILURE,

  SETTING_SELECTED_BATCH_DETAILS,

  FETCH_COURSE_BATCH_DETAILS,
  FETCH_COURSE_BATCH_DETAILS_SUCCESS,
  FETCH_COURSE_BATCH_DETAILS_FAILURE,

  ASSIGN_COURSE_BATCH_TO_STUDENT,
  ASSIGN_COURSE_BATCH_TO_STUDENT_SUCCESS,
  ASSIGN_COURSE_BATCH_TO_STUDENT_FAILURE,


  FETCH_BATCH_STUDENT,
  FETCH_BATCH_STUDENT_SUCCESS,
  FETCH_BATCH_STUDENT_FAILURE,

  FETCH_COURSE_BATCH_ADDED_STUDENTS,
  FETCH_COURSE_BATCH_ADDED_STUDENTS_SUCCESS,
  FETCH_COURSE_BATCH_ADDED_STUDENTS_FAILURE,

  IS_OPEN_TASK_TYPE_MODAL,

  SELECTED_LINKEDIN_COMMUNITY_ITEM,

  PAGE_TASK_TITLE,
  SETTING_MINIMUM_SPEND_MINUTES,

  SETTING_TASK_PAGE_AND_META_ID,
  SETTING_TASK_META_ID,
  SETTING_TASK_PAGE_ID,

  FETCH_GET_PAGES,
  FETCH_GET_PAGES_SUCCESS,
  FETCH_GET_PAGES_FAILURE,

  POST_ADD_BATCH_COMPLETION_EVENT,
  POST_ADD_BATCH_COMPLETION_EVENT_SUCCESS,
  POST_ADD_BATCH_COMPLETION_EVENT_FAILURE,

  FETCH_GET_BATCH_COMPLETION_EVENT,
  FETCH_GET_BATCH_COMPLETION_EVENT_FAILURE,
  FETCH_GET_BATCH_COMPLETION_EVENT_SUCCESS,

  SELECTED_COMMUNITY_ITEM,

  POST_PAGE_SECTION,
  POST_PAGE_SECTION_SUCCESS,
  POST_PAGE_SECTION_FAILURE,

  POST_UPDATE_USER_ONLINE_ACTIVITY_LOG,
  POST_UPDATE_USER_ONLINE_ACTIVITY_LOG_SUCCESS,
  POST_UPDATE_USER_ONLINE_ACTIVITY_LOG_FAILURE,


  /**
   * Student..........................................................................................................................
   */

  FETCH_STUDENT_COURSE_TASKS,
  FETCH_STUDENT_COURSE_TASKS_SUCCESS,
  FETCH_STUDENT_COURSE_TASKS_FAILURE,

  FETCH_STUDENT_COURSE_TASKS_DETAILS,
  FETCH_STUDENT_COURSE_TASKS_DETAILS_SUCCESS,
  FETCH_STUDENT_COURSE_TASKS_DETAILS_FAILURE,

  FETCH_STUDENT_COURSES,
  FETCH_STUDENT_COURSES_SUCCESS,
  FETCH_STUDENT_COURSES_FAILURE,

  FETCH_STUDENT_COURSE_SECTION,
  FETCH_STUDENT_COURSE_SECTION_SUCCESS,
  FETCH_STUDENT_COURSE_SECTION_FAILURE,

  FETCH_STUDENT_COURSE_TOPICS,
  FETCH_STUDENT_COURSE_TOPICS_SUCCESS,
  FETCH_STUDENT_COURSE_TOPICS_FAILURE,

  SETTING_DEFAULT_COURSE,

  GET_TASK_DETAILS,

  POST_STUDENT_COURSE_TASK_DETAILS,
  POST_STUDENT_COURSE_TASK_DETAILS_SUCCESS,
  POST_STUDENT_COURSE_TASK_DETAILS_FAILURE,

  ADD_STUDENT_COURSE_TASK_RESPONSE_ID,

  STUDENT_WRITTEN_QUESTION,

  STUDENT_PROCEDURE_DATA,

  STUDENT_FLOW_DIAGRAM,

  STUDENT_FLOW_DIAGRAM_IMAGE,

  STUDENT_PROGRAM_DATA,

  FETCH_ALL_BRANCHES_LIST,
  FETCH_ALL_BRANCHES_LIST_SUCCESS,
  FETCH_ALL_BRANCHES_LIST_FAILURE,

  COURSE_RENDERER,

  STUDENT_CURRENT_COURSE_SECTION,

  IS_EXPAND_CODE_EDITOR,
  EDIT_PAGE_SECTION_TYPE,

  IS_ACTIVE_SECTION,

  STUDENT_CODE_SUBMISSION,
  STUDENT_CODE_SUBMISSION_SUCCESS,
  STUDENT_CODE_SUBMISSION_FAILURE,

  POST_BATCH_VIDEO_CALL_USERS,
  POST_BATCH_VIDEO_CALL_USERS_SUCCESS,
  POST_BATCH_VIDEO_CALL_USERS_FAILURE,

  FETCH_BATCH_VIDEO_CALL_USERS,
  FETCH_BATCH_VIDEO_CALL_USERS_SUCCESS,
  FETCH_BATCH_VIDEO_CALL_USERS_FAILURE,

  /**
   * student page section
   */

  FETCH_STUDENT_PAGE_SECTIONS,
  FETCH_STUDENT_PAGE_SECTIONS_FAILURE,
  FETCH_STUDENT_PAGE_SECTIONS_SUCCESS,

  FETCH_STUDENT_SECTION_TYPE_IMAGE,
  FETCH_STUDENT_SECTION_TYPE_IMAGE_FAILURE,
  FETCH_STUDENT_SECTION_TYPE_IMAGE_SUCCESS,

  FETCH_STUDENT_SECTION_TYPE_LIST,
  FETCH_STUDENT_SECTION_TYPE_LIST_FAILURE,
  FETCH_STUDENT_SECTION_TYPE_LIST_SUCCESS,

  FETCH_STUDENT_SECTION_TYPE_MD,
  FETCH_STUDENT_SECTION_TYPE_MD_FAILURE,
  FETCH_STUDENT_SECTION_TYPE_MD_SUCCESS,

  FETCH_STUDENT_SECTION_TYPE_PARAGRAPH,
  FETCH_STUDENT_SECTION_TYPE_PARAGRAPH_FAILURE,
  FETCH_STUDENT_SECTION_TYPE_PARAGRAPH_SUCCESS,

  FETCH_STUDENT_SECTION_TYPE_TITLE,
  FETCH_STUDENT_SECTION_TYPE_TITLE_FAILURE,
  FETCH_STUDENT_SECTION_TYPE_TITLE_SUCCESS,

  FETCH_STUDENT_SECTION_TYPE_VIDEO,
  FETCH_STUDENT_SECTION_TYPE_VIDEO_FAILURE,
  FETCH_STUDENT_SECTION_TYPE_VIDEO_SUCCESS,

  REMARK_USERID,

  FETCH_STUDENT_TASKS_TIMELINE,
  FETCH_STUDENT_TASKS_TIMELINE_SUCCESS,
  FETCH_STUDENT_TASKS_TIMELINE_FAILURE,
  CURRENT_NAV,
  COURSE_TOPIC_PARENT_DATA,
  COURSE_TOPIC_PARENT_CHILD_DATA,

  POST_TASK_BY_STUDENT,
  POST_TASK_BY_STUDENT_SUCCESS,
  POST_TASK_BY_STUDENT_FAILURE,

  TASK_TYPE,


  SET_GUEST_SAMPLE_INPUT_OUTPUT_DATA,
  SET_GUEST_RULES_DATA,
  SET_GUEST_PROCEDURE_DATA,

  FETCH_STUDENT_TASKS_DETAILS_OPEN,
  FETCH_STUDENT_TASKS_DETAILS_OPEN_SUCCESS,
  FETCH_STUDENT_TASKS_DETAILS_OPEN_FAILURE,

  COURSE_IDE_TYPE,

  TOGGLE_SIDE_NAV_OPEN,

  STUDENT_COURSE_SECTION_DATA_LIST,

  GET_MESSAGE_EVENTS,

  FETCH_TOKEN_BY_USER,
  FETCH_TOKEN_BY_USER_SUCCESS,
  FETCH_TOKEN_BY_USER_FAILURE,

  EDIT_SCHEDULE_MEETING_DETAILS,

  /**
   * Group chat
   */

  POST_BATCH_CHAT,
  POST_BATCH_CHAT_SUCCESS,
  POST_BATCH_CHAT_FAILURE,

  FETCH_BATCH_CHAT,
  FETCH_BATCH_CHAT_SUCCESS,
  FETCH_BATCH_CHAT_FAILURE,

  FETCH_BATCH_USER_ONLINE_ACTIVITY_LOG,
  FETCH_BATCH_USER_ONLINE_ACTIVITY_LOG_SUCCESS,
  FETCH_BATCH_USER_ONLINE_ACTIVITY_LOG_FAILURE,
} from '../ActionTypes';


/**
 * reset reducer
 */

export const resetDashboardReducer = () => {
  return {
    type: RESET_DASHBOARD,
  }
}


/**
 * Setting is super admin
 */

export const settingIsSuperAdmin = (value: any) => {
  return {
    type: IS_SUPER_ADMIN,
    payload: value,
  };
};

/**
* Fetch task details
*/

export const fetchTaskDetails = (params: any) => {
  return {
    type: FETCH_TASK_DETAILS,
    payload: params,
  };
};

export const fetchTaskDetailsSuccess = (response: any) => {
  console.log('0000001111111111', response)
  return {
    type: FETCH_TASK_DETAILS_SUCCESS,
    payload: response,
  };
};

export const fetchTaskDetailsFailure = (response: any) => {
  return {
    type: FETCH_TASK_DETAILS_FAILURE,
    payload: response,
  };
};

/**
 * Get courses
 */

export const fetchCourses = (params: any) => {
  return {
    type: FETCH_COURSES,
    payload: params,
  };
};

export const fetchCoursesSuccess = (response: any) => {
  return {
    type: FETCH_COURSES_SUCCESS,
    payload: response,
  };
};

export const fetchCoursesFailure = (response: any) => {
  return {
    type: FETCH_COURSES_FAILURE,
    payload: response,
  };
};

/**
 * Get course sections
 */

export const fetchCourseSections = (params: any) => {
  return {
    type: FETCH_COURSE_SECTIONS,
    payload: params,
  };
};

export const fetchCourseSectionsSuccess = (response: any) => {
  return {
    type: FETCH_COURSE_SECTIONS_SUCCESS,
    payload: response,
  };
};

export const fetchCourseSectionsFailure = (response: any) => {
  return {
    type: FETCH_COURSE_SECTIONS_FAILURE,
    payload: response,
  };
};

/**
* Get course Topics
*/

export const fetchCourseTopics = (params: any) => {
  console.log('fetchCourseTopics action');

  return {
    type: FETCH_COURSE_TOPICS,
    payload: params,
  };
};

export const fetchCourseTopicsSuccess = (response: any) => {
  return {
    type: FETCH_COURSE_TOPICS_SUCCESS,
    payload: response,
  };
};

export const fetchCourseTopicsFailure = (response: any) => {
  return {
    type: FETCH_COURSE_TOPICS_FAILURE,
    payload: response,
  };
};

/**
* Get course Topic tasks
*/

export const fetchCourseTopicTasks = (params: any) => {
  return {
    type: FETCH_COURSE_TOPIC_TASKS,
    payload: params,
  };
};

export const fetchCourseTopicTasksSuccess = (response: any) => {
  return {
    type: FETCH_COURSE_TOPIC_TASKS_SUCCESS,
    payload: response,
  };
};

export const fetchCourseTopicTasksFailure = (response: any) => {
  return {
    type: FETCH_COURSE_TOPIC_TASKS_FAILURE,
    payload: response,
  };
};

/**
 * Setting course topic name
 */

export const settingCourseTopicName = (value: any) => {
  return {
    type: SET_COURSE_TOPIC_NAME,
    payload: value,
  };
};

/**
 * Generic CRUD action 
 */
export const postGenericCrudDetails = (params: any) => {
  console.log('cation', params);

  return {
    type: POST_GENERIC_CRUD_DETAILS,
    payload: params,
  };
};

export const postGenericCrudDetailsSuccess = (response: any) => {
  console.log('cation--->', response);
  return {
    type: POST_GENERIC_CRUD_DETAILS_SUCCESS,
    payload: response,
  };
};

export const postGenericCrudDetailsFailure = (response: any) => {
  return {
    type: POST_GENERIC_CRUD_DETAILS_FAILURE,
    payload: response,
  };
};


/**
 * Add department
 */

export const addDepartment = (params) => {
  return {
    type: ADD_DEPARTMENT,
    payload: params,
  };
};

export const addDepartmentSuccess = (response) => {
  return {
    type: ADD_DEPARTMENT_SUCCESS,
    payload: response,
  };
};

export const addDepartmentFailure = (error) => {
  return {
    type: ADD_DEPARTMENT_FAILURE,
    payload: error,
  };
};

/**
 * Add designation
 */

export const addDesignation = (params) => {
  return {
    type: ADD_DESIGNATION,
    payload: params,
  };
};

export const addDesignationSuccess = (response) => {
  return {
    type: ADD_DESIGNATION_SUCCESS,
    payload: response,
  };
};

export const addDesignationFailure = (error) => {
  return {
    type: ADD_DESIGNATION_FAILURE,
    payload: error,
  };
};

//get designation

export const getDesignationData = (params) => {
  return {
    type: FETCH_DESIGNATION,
    payload: params,
  };
};

export const getDesignationDataSuccess = (response) => {
  return {
    type: FETCH_DESIGNATION_SUCCESS,
    payload: response,
  };
};

export const getDesignationDataFailure = (error) => {
  return {
    type: FETCH_DESIGNATION_FAILURE,
    payload: error,
  };
};

//get departments

export const getDepartmentData = (params) => {
  return {
    type: FETCH_DEPARTMENT,
    payload: params,
  };
};

export const getDepartmentDataSuccess = (response) => {
  return {
    type: FETCH_DEPARTMENT_SUCCESS,
    payload: response,
  };
};

export const getDepartmentDataFailure = (error) => {
  return {
    type: FETCH_DEPARTMENT_FAILURE,
    payload: error,
  };
};

/**
 * Setting course topic name
 */

export const settingCurrentCourseSection = (value: any) => {
  return {
    type: SET_CURRENT_COURSE_SECTION,
    payload: value,
  };
};

/**
 * Generic Batch CRUD action
 */

export const postGenericBatchCrudDetails = (params: any) => {
  return {
    type: POST_GENERIC_BATCH_CRUD_DETAILS,
    payload: params,
  };
};

export const postGenericBatchCrudDetailsSuccess = (response: any) => {
  return {
    type: POST_GENERIC_BATCH_CRUD_DETAILS_SUCCESS,
    payload: response,
  };
};

export const postGenericBatchCrudDetailsFailure = (response: any) => {
  return {
    type: POST_GENERIC_BATCH_CRUD_DETAILS_FAILURE,
    payload: response,
  };
};



/**
* post bulk upload courses
*/

export const postBulkUploadCourses = (params: any) => {
  console.log('fetchCourseTopics action');

  return {
    type: POST_BULK_UPLOAD_COURSES,
    payload: params,
  };
};

export const postBulkUploadCoursesSuccess = (response: any) => {
  return {
    type: POST_BULK_UPLOAD_COURSES_SUCCESS,
    payload: response,
  };
};

export const postBulkUploadCoursesFailure = (response: any) => {
  return {
    type: POST_BULK_UPLOAD_COURSES_FAILURE,
    payload: response,
  };
};



/**
* post bulk upload section
*/

export const postBulkUploadSection = (params: any) => {
  console.log('bulkbppliad action');

  return {
    type: POST_BULK_UPLOAD_SECTION,
    payload: params,
  };
};

export const postBulkUploadSectionSuccess = (response: any) => {

  return {
    type: POST_BULK_UPLOAD_SECTION_SUCCESS,
    payload: response,
  };
};

export const postBulkUploadSectionFailure = (response: any) => {
  return {
    type: POST_BULK_UPLOAD_SECTION_FAILURE,
    payload: response,
  };
};




// /**
// * post bulk upload topics
// */

export const postBulkUploadTopics = (params: any) => {
  return {
    type: POST_BULK_UPLOAD_TOPICS,
    payload: params,
  };
};

export const postBulkUploadTopicsSuccess = (response: any) => {
  return {
    type: POST_BULK_UPLOAD_TOPICS_SUCCESS,
    payload: response,
  };
};

export const postBulkUploadTopicsFailure = (response: any) => {
  return {
    type: POST_BULK_UPLOAD_TOPICS_FAILURE,
    payload: response,
  };
};


// /**
// * post bulk upload tasks
// */

export const postBulkUploadTasks = (params: any) => {
  return {
    type: POST_BULK_UPLOAD_TASKS,
    payload: params,
  };
};

export const postBulkUploadTasksSuccess = (response: any) => {
  return {
    type: POST_BULK_UPLOAD_TASKS_SUCCESS,
    payload: response,
  };
};

export const postBulkUploadTasksFailure = (response: any) => {
  return {
    type: POST_BULK_UPLOAD_TASKS_FAILURE,
    payload: response,
  };
};






/**
 * To handle dnd modal open or close
 */

export const handleDndModal = (value: Boolean) => {
  return {
    type: IS_DND_MODAL_OPEN,
    payload: value,
  };
};


/**
 * add student
 */

export const postAddStudent = (params: any) => {
  console.log('action');

  return {
    type: ADD_STUDENT,
    payload: params,
  };
};

export const postAddStudentSuccess = (response: any) => {
  return {
    type: ADD_STUDENT_SUCCESS,
    payload: response,
  };
};

export const postAddStudentFailure = (response: any) => {
  return {
    type: ADD_STUDENT_FAILURE,
    payload: response,
  };
};


/**
 * get students list
 */

export const fetchStudentsList = (params: any) => {
  console.log('sasas');

  return {
    type: FETCH_STUDENTS_LIST,
    payload: params,
  };
};

export const fetchStudentsListSuccess = (response: any) => {
  return {
    type: FETCH_STUDENTS_LIST_SUCCESS,
    payload: response,
  };
};

export const fetchStudentsListFailure = (response: any) => {
  return {
    type: FETCH_STUDENTS_LIST_FAILURE,
    payload: response,
  };
};



/**
 * add Faculty
 */

export const postAddFaculty = (params: any) => {
  console.log("actionparamsss--->", params);

  return {
    type: ADD_FACULTY,
    payload: params,
  };
};

export const postAddFacultySuccess = (response: any) => {
  return {
    type: ADD_FACULTY_SUCCESS,
    payload: response,
  };
};

export const postAddFacultyFailure = (response: any) => {
  return {
    type: ADD_FACULTY_FAILURE,
    payload: response,
  };
};


/**
 * get Faculty list
 */

export const fetchFacultiesList = (params: any) => {
  return {
    type: FETCH_FACULTIES_LIST,
    payload: params,
  };
};

export const fetchFacultiesListSuccess = (response: any) => {
  return {
    type: FETCH_FACULTIES_LIST_SUCCESS,
    payload: response,
  };
};

export const fetchFacultiesListFailure = (response: any) => {
  return {
    type: FETCH_FACULTIES_LIST_FAILURE,
    payload: response,
  };
};

/**
 * get Approver list
 */

export const fetchApproverList = (params: any) => {
  return {
    type: FETCH_APPROVER_LIST,
    payload: params,
  }
}

export const fetchApproverListSuccess = (response: any) => {
  return {
    type: FETCH_APPROVER_LIST_SUCCESS,
    payload: response,
  }
}

export const fetchApproverListFailure = (response: any) => {
  return {
    type: FETCH_APPROVER_LIST_FAILURE,
    payload: response,
  }
}

/* get referer list
*/

export const fetchRefererList = (params: any) => {
  return {
    type: FETCH_REFERER_LIST,
    payload: params,
  };
};

export const fetchRefererListSuccess = (response: any) => {
  return {
    type: FETCH_REFERER_LIST_SUCCESS,
    payload: response,
  };
};

export const fetchRefererListFailure = (response: any) => {
  return {
    type: FETCH_REFERER_LIST_FAILURE,
    payload: response,
  };
};

/**
 * Setting current course
 */

export const settingCurrentCourse = (value: any) => {
  return {
    type: SETTING_CURRENT_COURSE,
    payload: value,
  };
};

/**
 * get student details
 */

export const fetchStudentDetails = (params: any) => {
  return {
    type: FETCH_STUDENTS_DETAILS,
    payload: params,
  };
};

export const fetchStudentDetailsSuccess = (response: any) => {
  return {
    type: FETCH_STUDENTS_DETAILS_SUCCESS,
    payload: response,
  };
};

export const fetchStudentDetailsFailure = (response: any) => {
  return {
    type: FETCH_STUDENTS_DETAILS_FAILURE,
    payload: response,
  };
};

/**
* Setting current Task
*/

export const settingCurrentTaskItem = (value: any) => {
  return {
    type: SETTING_CURRENT_TASK_ITEM,
    payload: value,
  };
};

export const getCurrentNav = (value: any) => {
  return {
    type: CURRENT_NAV,
    payload: value,
  };
};



/**
 * get Dashboard details
 */

export const fetchDashboardDetails = (params: any) => {
  return {
    type: FETCH_DASHBOARD_DETAILS,
    payload: params,
  };
};

export const fetchDashboardDetailsSuccess = (response: any) => {
  return {
    type: FETCH_DASHBOARD_DETAILS_SUCCESS,
    payload: response,
  };
};

export const fetchDashboardDetailsFailure = (response: any) => {
  return {
    type: FETCH_DASHBOARD_DETAILS_FAILURE,
    payload: response,
  };
};

/**
* Setting selected faculty id
*/

export const settingSelectedFacultyId = (value: any) => {

  return {
    type: SETTING_SELECTED_FACULTY_ID,
    payload: value,
  };
};

/**
 * selected student details 
 */

export const editUserRegister = (value: any) => {
  return {
    type: EDIT_USER_REGISTRATION,
    payload: value,
  };
};

/**
 * post raise anonymous complaint
 */

export const postRaiseAnonymousComplaint = (params: any) => {
  return {
    type: POST_RAISE_ANONYMOUS_COMPLAINT,
    payload: params,
  };
};

export const postRaiseAnonymousComplaintSuccess = (response: any) => {
  return {
    type: POST_RAISE_ANONYMOUS_COMPLAINT_SUCCESS,
    payload: response,
  };
};

export const postRaiseAnonymousComplaintFailure = (response: any) => {
  return {
    type: POST_RAISE_ANONYMOUS_COMPLAINT_FAILURE,
    payload: response,
  };
}

/**
 * Get Faculty Details
 */

export const fetchFacultyDetails = (params: any) => {
  console.log("response--------->jjjj", params)
  return {
    type: FETCH_FACULTIES_DETAILS,
    payload: params,
  };
};

export const fetchFacultyDetailsSuccess = (response: any) => {
  console.log("response--------->jjjj", response)
  return {
    type: FETCH_FACULTIES_DETAILS_SUCCESS,
    payload: response,
  };
};

export const fetchFacultyDetailsFailure = (response: any) => {
  return {
    type: FETCH_FACULTIES_DETAILS_FAILURE,
    payload: response,
  };
};


// get course ide

export const getCourseIde = (params) => {
  return {
    type: FETCH_COURSE_IDE,
    payload: params,
  };
};

export const getCourseIdeSuccess = (response) => {
  return {
    type: FETCH_COURSE_IDE_SUCCESS,
    payload: response,
  };
};

export const getCourseIdeFailure = (error) => {
  return {
    type: FETCH_COURSE_IDE_FAILURE,
    payload: error,
  };
};

/**
 * IS course renderer
 */

export const isCourseRenderer = (value: any) => {
  return {
    type: COURSE_RENDERER,
    payload: value,
  };
};


// get Student Course Tasks Faculty

export const fetchStudentCourseTasksFaculty = (params) => {
  return {
    type: FETCH_STUDENT_COURSE_TASKS_FACULTY,
    payload: params,
  };
};

export const fetchStudentCourseTasksFacultySuccess = (response) => {
  return {
    type: FETCH_STUDENT_COURSE_TASKS_FACULTY_SUCCESS,
    payload: response,
  };
};

export const fetchStudentCourseTasksFacultyFailure = (error) => {
  return {
    type: FETCH_STUDENT_COURSE_TASKS_FACULTY_FAILURE,
    payload: error,
  };
};

// get Student Course Task details Faculty

export const fetchStudentCourseTaskDetailsFaculty = (params) => {
  console.log("action", params)
  return {
    type: FETCH_STUDENT_COURSE_TASK_DETAILS_FACULTY,
    payload: params,
  };
};

export const fetchStudentCourseTaskDetailsFacultySuccess = (response) => {
  return {
    type: FETCH_STUDENT_COURSE_TASK_DETAILS_FACULTY_SUCCESS,
    payload: response,
  };
};

export const fetchStudentCourseTaskDetailsFacultyFailure = (error) => {
  return {
    type: FETCH_STUDENT_COURSE_TASK_DETAILS_FACULTY_FAILURE,
    payload: error,
  };
};

/**
 * 
 * View student task details id
 */

export const viewStudentTaskDetailsId = (params) => {
  return {
    type: VIEW_STUDENT_TASK_DETAILS_ID,
    payload: params,
  };
};

// submit Student Course Pending Approval Task

export const postSubmitStudentCoursePendingApproval = (params) => {
  console.log("action", params)
  return {
    type: POST_SUBMIT_STUDENT_COURSE_PENDING_APPROVAL_TASK,
    payload: params,
  };
};

export const postSubmitStudentCoursePendingApprovalSuccess = (response) => {
  return {
    type: POST_SUBMIT_STUDENT_COURSE_PENDING_APPROVAL_TASK_SUCCESS,
    payload: response,
  };
};

export const postSubmitStudentCoursePendingApprovalFailure = (error) => {
  return {
    type: POST_SUBMIT_STUDENT_COURSE_PENDING_APPROVAL_TASK_FAILURE,
    payload: error,
  };
};

// add task event

export const postTaskEvent = (params) => {
  console.log("action", params)
  return {
    type: POST_TASK_EVENT,
    payload: params,
  };
};

export const postTaskEventSuccess = (response) => {
  return {
    type: POST_TASK_EVENT_SUCCESS,
    payload: response,
  };
};

export const postTaskEventFailure = (error) => {
  return {
    type: POST_TASK_EVENT_FAILURE,
    payload: error,
  };
};

// get task events

export const fetchTaskEvents = (params) => {
  console.log("action", params)
  return {
    type: FETCH_TASK_EVENTS,
    payload: params,
  };
};

export const fetchTaskEventsSuccess = (response) => {
  return {
    type: FETCH_TASK_EVENTS_SUCCESS,
    payload: response,
  };
};

export const fetchTaskEventsFailure = (error) => {
  return {
    type: FETCH_TASK_EVENTS_FAILURE,
    payload: error,
  };
};

// get task events

export const fetchUserOnlineActiveLog = (params) => {
  return {
    type: FETCH_USER_ONLINE_ACTIVE_LOG,
    payload: params,
  };
};

export const fetchUserOnlineActiveLogSuccess = (response) => {
  return {
    type: FETCH_USER_ONLINE_ACTIVE_LOG_SUCCESS,
    payload: response,
  };
};

export const fetchUserOnlineActiveLogFailure = (error) => {
  return {
    type: FETCH_USER_ONLINE_ACTIVE_LOG_FAILURE,
    payload: error,
  };
};

// get topic task types

export const fetchTopicTaskTypes = (params) => {
  return {
    type: FETCH_TOPIC_TASK_TYPES,
    payload: params,
  };
};

export const fetchTopicTaskTypesSuccess = (response) => {
  return {
    type: FETCH_TOPIC_TASK_TYPES_SUCCESS,
    payload: response,
  };
};

export const fetchTopicTaskTypesFailure = (error) => {
  return {
    type: FETCH_TOPIC_TASK_TYPES_FAILURE,
    payload: error,
  };
};

// get Page Sections

export const fetchPageSections = (params) => {
  // console.log("action", params)
  return {
    type: FETCH_PAGE_SECTIONS,
    payload: params,
  };
};

export const fetchPageSectionsSuccess = (response) => {
  return {
    type: FETCH_PAGE_SECTIONS_SUCCESS,
    payload: response,
  };
};

export const fetchPageSectionsFailure = (error) => {
  return {
    type: FETCH_PAGE_SECTIONS_FAILURE,
    payload: error,
  };
};

// get Section Type Title

export const fetchSectionTypeTitle = (params) => {
  // console.log("action", params)
  return {
    type: FETCH_SECTION_TYPE_TITLE,
    payload: params,
  };
};

export const fetchSectionTypeTitleSuccess = (response) => {
  return {
    type: FETCH_SECTION_TYPE_TITLE_SUCCESS,
    payload: response,
  };
};

export const fetchSectionTypeTitleFailure = (error) => {
  return {
    type: FETCH_SECTION_TYPE_TITLE_FAILURE,
    payload: error,
  };
};

// get Section Type Image

export const fetchSectionTypeImage = (params) => {
  console.log("action", params)
  return {
    type: FETCH_SECTION_TYPE_IMAGE,
    payload: params,
  };
};

export const fetchSectionTypeImageSuccess = (response) => {
  return {
    type: FETCH_SECTION_TYPE_IMAGE_SUCCESS,
    payload: response,
  };
};

export const fetchSectionTypeImageFailure = (error) => {
  return {
    type: FETCH_SECTION_TYPE_IMAGE_FAILURE,
    payload: error,
  };
};

// get Section Type Video

export const fetchSectionTypeVideo = (params) => {
  console.log("action", params)
  return {
    type: FETCH_SECTION_TYPE_VIDEO,
    payload: params,
  };
};

export const fetchSectionTypeVideoSuccess = (response) => {
  return {
    type: FETCH_SECTION_TYPE_VIDEO_SUCCESS,
    payload: response,
  };
};

export const fetchSectionTypeVideoFailure = (error) => {
  return {
    type: FETCH_SECTION_TYPE_VIDEO_FAILURE,
    payload: error,
  };
};

// get Section Type Paragraph

export const fetchSectionTypeParagraph = (params) => {
  console.log("action", params)
  return {
    type: FETCH_SECTION_TYPE_PARAGRAPH,
    payload: params,
  };
};

export const fetchSectionTypeParagraphSuccess = (response) => {
  return {
    type: FETCH_SECTION_TYPE_PARAGRAPH_SUCCESS,
    payload: response,
  };
};

export const fetchSectionTypeParagraphFailure = (error) => {
  return {
    type: FETCH_SECTION_TYPE_PARAGRAPH_FAILURE,
    payload: error,
  };
};

// get Section Type Md

export const fetchSectionTypeMd = (params) => {
  console.log("action", params)
  return {
    type: FETCH_SECTION_TYPE_MD,
    payload: params,
  };
};

export const fetchSectionTypeMdSuccess = (response) => {
  return {
    type: FETCH_SECTION_TYPE_MD_SUCCESS,
    payload: response,
  };
};

export const fetchSectionTypeMdFailure = (error) => {
  return {
    type: FETCH_SECTION_TYPE_MD_FAILURE,
    payload: error,
  };
};

// get Section Type List

export const fetchSectionTypeList = (params) => {
  console.log("actionlisttt", params)
  return {
    type: FETCH_SECTION_TYPE_LIST,
    payload: params,
  };
};

export const fetchSectionTypeListSuccess = (response) => {
  return {
    type: FETCH_SECTION_TYPE_LIST_SUCCESS,
    payload: response,
  };
};

export const fetchSectionTypeListFailure = (error) => {
  return {
    type: FETCH_SECTION_TYPE_LIST_FAILURE,
    payload: error,
  };
};

export const getPageSectionTypeId = (value: any) => {
  return {
    type: EDIT_PAGE_SECTION_TYPE,
    payload: value,
  };
};

//GET USER REMARK

export const fetchUserRemark = (params) => {
  return {
    type: FETCH_USER_REMARK,
    payload: params,
  };
};

export const fetchUserRemarkSuccess = (response) => {
  return {
    type: FETCH_USER_REMARK_SUCCESS,
    payload: response,
  };
};

export const fetchUserRemarkFailure = (error) => {
  return {
    type: FETCH_USER_REMARK_FAILURE,
    payload: error,
  };
};

//GET USERS REMARK

export const fetchUsersRemark = (params) => {
  return {
    type: FETCH_USERS_REMARK,
    payload: params,
  };
};

export const fetchUsersRemarkSuccess = (response) => {
  return {
    type: FETCH_USERS_REMARK_SUCCESS,
    payload: response,
  };
};

export const fetchUsersRemarkFailure = (error) => {
  return {
    type: FETCH_USERS_REMARK_FAILURE,
    payload: error,
  };
};


// user remark id
export const remarkUserId = (params) => {
  return {
    type: REMARK_USERID,
    payload: params,
  };
};

//get COURSE_TOPIC_DATA
export const getCourseTopicParentData = (params) => {
  return {
    type: COURSE_TOPIC_PARENT_DATA,
    payload: params,
  };
};

export const getCourseTopicParentChildData = (params) => {
  return {
    type: COURSE_TOPIC_PARENT_CHILD_DATA,
    payload: params,
  };
};


/**
 * is show students list
 */

export const isShowStudentsList = (params) => {
  return {
    type: IS_SHOW_STUDENTS_LIST,
    payload: params,
  };
};

/**
 * is show facultiest list
 */

export const isShowFacultiesList = (params) => {
  return {
    type: IS_SHOW_FACULTIES_LIST,
    payload: params,
  };
};

/**
 * is BACK SET_SAMPLE_INPUT_OUTPUT_DATA
 */

export const isBackNavigation = (params) => {
  console.log("actionnnn", params);

  return {
    type: IS_BACK,
    payload: params,
  };
};


/**
 *  SET_SAMPLE_INPUT_OUTPUT_DATA 
 */

export const setSampleInputOutputData = (params) => {
  console.log("actionnnn", params);

  return {
    type: SET_GUEST_SAMPLE_INPUT_OUTPUT_DATA,
    payload: params,
  };
};

/**
 *  SET_GUEST_RULES_DATA  
 */


export const settingRulesData = (params) => {
  console.log("actionnnn", params);

  return {
    type: SET_GUEST_RULES_DATA,
    payload: params,
  };
};


/**
 *  SET_GUEST_RULES_DATA 
 */


export const settingProcedureData = (params) => {
  console.log("actionnnn", params);

  return {
    type: SET_GUEST_PROCEDURE_DATA,
    payload: params,
  };
};


// add branch

export const postBranch = (params) => {
  return {
    type: POST_BRANCH,
    payload: params,
  };
};

export const postBranchSuccess = (response) => {
  return {
    type: POST_BRANCH_SUCCESS,
    payload: response,
  };
};

export const postBranchFailure = (error) => {
  return {
    type: POST_BRANCH_FAILURE,
    payload: error,
  };
};


// get course templates

export const fetchCourseTemplates = (params) => {
  return {
    type: FETCH_COURSE_TEMPLATES,
    payload: params,
  };
};

export const fetchCourseTemplatesSuccess = (response) => {
  return {
    type: FETCH_COURSE_TEMPLATES_SUCCESS,
    payload: response,
  };
};

export const fetchCourseTemplatesFailure = (error) => {
  return {
    type: FETCH_COURSE_TEMPLATES_FAILURE,
    payload: error,
  };
};


// bulk upload students

export const postBulkUploadStudents = (params) => {
  return {
    type: POST_BULK_UPLOAD_STUDENTS,
    payload: params,
  };
};

export const postBulkUploadStudentsSuccess = (response) => {
  return {
    type: POST_BULK_UPLOAD_STUDENTS_SUCCESS,
    payload: response,
  };
};

export const postBulkUploadStudentsFailure = (error) => {
  return {
    type: POST_BULK_UPLOAD_STUDENTS_FAILURE,
    payload: error,
  };
};

// bulk upload faculties

export const postBulkUploadFaculties = (params) => {
  return {
    type: POST_BULK_UPLOAD_FACULTIES,
    payload: params,
  };
};

export const postBulkUploadFacultiesSuccess = (response) => {
  return {
    type: POST_BULK_UPLOAD_FACULTIES_SUCCESS,
    payload: response,
  };
};

export const postBulkUploadFacultiesFailure = (error) => {
  return {
    type: POST_BULK_UPLOAD_FACULTIES_FAILURE,
    payload: error,
  };
};


// get employees templates

export const fetchEmployeesTemplates = (params) => {
  return {
    type: FETCH_EMPLOYEES_TEMPLATES,
    payload: params,
  };
};

export const fetchEmployeesTemplatesSuccess = (response) => {
  return {
    type: FETCH_EMPLOYEES_TEMPLATES_SUCCESS,
    payload: response,
  };
};

export const fetchEmployeesTemplatesFailure = (error) => {
  return {
    type: FETCH_EMPLOYEES_TEMPLATES_FAILURE,
    payload: error,
  };
};

/**
 * get faculty details 
 */
export const selectedFacultyDetails = (params) => {
  console.log("callledd", params)
  return {
    type: SELECTED_FACULTY_DETAILS,
    payload: params,
  };
}

// add user remarks

export const postUserRemarks = (params) => {
  return {
    type: POST_USER_REMARKS,
    payload: params,
  };
};

export const postUserRemarksSuccess = (response) => {
  return {
    type: POST_USER_REMARKS_SUCCESS,
    payload: response,
  };
};

export const postUserRemarksFailure = (error) => {
  return {
    type: POST_USER_REMARKS_FAILURE,
    payload: error,
  };
};

// submit User Remarks Approval

export const postSubmitUserRemarksApproval = (params) => {
  return {
    type: POST_SUBMIT_USER_REMARKS_APPROVAL,
    payload: params,
  };
};

export const postSubmitUserRemarksApprovalSuccess = (response) => {
  return {
    type: POST_SUBMIT_USER_REMARKS_APPROVAL_SUCCESS,
    payload: response,
  };
};

export const postSubmitUserRemarksApprovalFailure = (error) => {
  return {
    type: POST_SUBMIT_USER_REMARKS_APPROVAL_FAILURE,
    payload: error,
  };
};

// submit task approval by faculty

export const postSubmitTaskApprovalByFaculty = (params) => {
  return {
    type: POST_SUBMIT_TASK_APPROVAL_BY_FACULTY,
    payload: params,
  };
};

export const postSubmitTaskApprovalByFacultySuccess = (response) => {
  return {
    type: POST_SUBMIT_TASK_APPROVAL_BY_FACULTY_SUCCESS,
    payload: response,
  };
};

export const postSubmitTaskApprovalByFacultyFailure = (error) => {
  return {
    type: POST_SUBMIT_TASK_APPROVAL_BY_FACULTY_FAILURE,
    payload: error,
  };
};

// add course

export const postAddCourse = (params) => {
  return {
    type: POST_ADD_COURSE,
    payload: params,
  };
};

export const postAddCourseSuccess = (response) => {
  return {
    type: POST_ADD_COURSE_SUCCESS,
    payload: response,
  };
};

export const postAddCourseFailure = (error) => {
  return {
    type: POST_ADD_COURSE_FAILURE,
    payload: error,
  };
};

// add course section

export const postAddCourseSection = (params) => {
  return {
    type: POST_ADD_COURSE_SECTION,
    payload: params,
  };
};

export const postAddCourseSectionSuccess = (response) => {
  return {
    type: POST_ADD_COURSE_SECTION_SUCCESS,
    payload: response,
  };
};

export const postAddCourseSectionFailure = (error) => {
  return {
    type: POST_ADD_COURSE_SECTION_FAILURE,
    payload: error,
  };
};

// add course topic

export const postAddCourseTopic = (params) => {
  return {
    type: POST_ADD_COURSE_TOPIC,
    payload: params,
  };
};

export const postAddCourseTopicSuccess = (response) => {
  return {
    type: POST_ADD_COURSE_TOPIC_SUCCESS,
    payload: response,
  };
};

export const postAddCourseTopicFailure = (error) => {
  return {
    type: POST_ADD_COURSE_TOPIC_FAILURE,
    payload: error,
  };
};

// add course task

export const postAddCourseTask = (params) => {
  return {
    type: POST_ADD_COURSE_TASK,
    payload: params,
  };
};

export const postAddCourseTaskSuccess = (response) => {
  return {
    type: POST_ADD_COURSE_TASK_SUCCESS,
    payload: response,
  };
};

export const postAddCourseTaskFailure = (error) => {
  return {
    type: POST_ADD_COURSE_TASK_FAILURE,
    payload: error,
  };
};

export const doEditQuestion = (response) => {
  return {
    type: DO_EDIT_QUESTION,
    payload: response,
  };
};

//add batch

export const postAddBatch = (params) => {
  return {
    type: POST_ADD_BATCH,
    payload: params,
  };
};

export const postAddBatchSuccess = (response) => {
  return {
    type: POST_ADD_BATCH_SUCCESS,
    payload: response,
  };
};

export const postAddBatchFailure = (error) => {
  return {
    type: POST_ADD_BATCH_FAILURE,
    payload: error,
  };
};

//add weekly calendar

export const postAddWeeklyCalendar = (params) => {
  return {
    type: POST_ADD_WEEKLY_CALENDAR,
    payload: params,
  };
};

export const postAddWeeklyCalendarSuccess = (response) => {
  return {
    type: POST_ADD_WEEKLY_CALENDAR_SUCCESS,
    payload: response,
  };
};

export const postAddWeeklyCalendarFailure = (error) => {
  return {
    type: POST_ADD_WEEKLY_CALENDAR_FAILURE,
    payload: error,
  };
};

//Get course batches

export const getCourseBatches = (params) => {
  return {
    type: FETCH_COURSE_BATCHES,
    payload: params,
  };
};

export const getCourseBatchesSuccess = (response) => {
  return {
    type: FETCH_COURSE_BATCHES_SUCCESS,
    payload: response,
  };
};

export const getCourseBatchesFailure = (error) => {
  return {
    type: FETCH_COURSE_BATCHES_FAILURE,
    payload: error,
  };
};

//setting selected batch details

export const settingSelectedBatchDetails = (value) => {
  return {
    type: SETTING_SELECTED_BATCH_DETAILS,
    payload: value,
  };
};

//Get course batch details

export const getCourseBatchDetails = (params) => {
  return {
    type: FETCH_COURSE_BATCH_DETAILS,
    payload: params,
  };
};

export const getCourseBatchDetailsSuccess = (response) => {
  return {
    type: FETCH_COURSE_BATCH_DETAILS_SUCCESS,
    payload: response,
  };
};

export const getCourseBatchDetailsFailure = (error) => {
  return {
    type: FETCH_COURSE_BATCH_DETAILS_FAILURE,
    payload: error,
  };
};


//Assign course batch to student

export const assignCourseBatchToStudent = (params) => {
  return {
    type: ASSIGN_COURSE_BATCH_TO_STUDENT,
    payload: params,
  };
};

export const assignCourseBatchToStudentSuccess = (response) => {
  return {
    type: ASSIGN_COURSE_BATCH_TO_STUDENT_SUCCESS,
    payload: response,
  };
};

export const assignCourseBatchToStudentFailure = (error) => {
  return {
    type: ASSIGN_COURSE_BATCH_TO_STUDENT_FAILURE,
    payload: error,
  };
};

//Get batch students

export const fetchBatchStudents = (params) => {
  return {
    type: FETCH_BATCH_STUDENT,
    payload: params,
  };
};

export const fetchBatchStudentsSuccess = (response) => {
  return {
    type: FETCH_BATCH_STUDENT_SUCCESS,
    payload: response,
  };
};

export const fetchBatchStudentsFailure = (error) => {
  return {
    type: FETCH_BATCH_STUDENT_FAILURE,
    payload: error,
  };
};


//Get course batch added students SCHEDULE_MEETING_SELECTION_USER_DATA

export const fetchCourseBatchAddedStudents = (params) => {
  return {
    type: FETCH_COURSE_BATCH_ADDED_STUDENTS,
    payload: params,
  };
};

export const fetchCourseBatchAddedStudentsSuccess = (response) => {
  return {
    type: FETCH_COURSE_BATCH_ADDED_STUDENTS_SUCCESS,
    payload: response,
  };
};

export const fetchCourseBatchAddedStudentsFailure = (error) => {
  return {
    type: FETCH_COURSE_BATCH_ADDED_STUDENTS_FAILURE,
    payload: error,
  };
};


/**
 * post batch student video conference meeting
 */
export const postBatchVideoCallUsers = (params) => {
  return {
    type: POST_BATCH_VIDEO_CALL_USERS,
    payload: params,
  };
}

export const postBatchVideoCallUsersSuccess = (params) => {
  return {
    type: POST_BATCH_VIDEO_CALL_USERS_SUCCESS,
    payload: params,
  };
}

export const postBatchVideoCallUsersFailure = (params) => {
  return {
    type: POST_BATCH_VIDEO_CALL_USERS_FAILURE,
    payload: params,
  };
}


/**
 * GET batch  video USER
 */
export const fetchBatchVideoCallUsers = (params) => {
  console.log("params==========>", params)
  return {
    type: FETCH_BATCH_VIDEO_CALL_USERS,
    payload: params,
  };
}

export const fetchBatchVideoCallUsersSuccess = (params) => {
  return {
    type: FETCH_BATCH_VIDEO_CALL_USERS_SUCCESS,
    payload: params,
  };
}

export const fetchBatchVideoCallUsersFailure = (params) => {
  return {
    type: FETCH_BATCH_VIDEO_CALL_USERS_FAILURE,
    payload: params,
  };
}

/**
 * GET token for video call
 */
export const fetchTokenByUser = (params) => {
  console.log("params==========>", params)
  return {
    type: FETCH_TOKEN_BY_USER,
    payload: params,
  };
}

export const fetchTokenByUserSuccess = (params) => {
  console.log("success=======>", params)
  return {
    type: FETCH_TOKEN_BY_USER_SUCCESS,
    payload: params,
  };
}

export const fetchTokenByUserFailure = (params) => {
  return {
    type: FETCH_TOKEN_BY_USER_FAILURE,
    payload: params,
  };
}



export const editScheduleMeetingDetails = (params) => {
  return {
    type: EDIT_SCHEDULE_MEETING_DETAILS,
    payload: params,
  };
}
//setting task meta type modal

export const settingIsOpenTaskTypeModal = (value) => {
  return {
    type: IS_OPEN_TASK_TYPE_MODAL,
    payload: value,
  };
};

//setting selected linkedin community item

export const SelectedLinkedInCommunityItem = (value) => {
  return {
    type: SELECTED_LINKEDIN_COMMUNITY_ITEM,
    payload: value,
  };
};

//setting page task title 

export const settingPageTaskTitle = (value) => {
  return {
    type: PAGE_TASK_TITLE,
    payload: value,
  };
};

//setting Minimum Spent Minutes

export const settingMinimumSpentMinutes = (value) => {
  return {
    type: SETTING_MINIMUM_SPEND_MINUTES,
    payload: value,
  };
};

//setting task page and meta id

export const settingTaskPageAndMetaId = (value) => {
  return {
    type: SETTING_TASK_PAGE_AND_META_ID,
    payload: value,
  };
};

//setting task meta id

export const settingTaskMetaId = (value) => {
  return {
    type: SETTING_TASK_META_ID,
    payload: value,
  };
};

//setting task page id

export const settingTaskPageId = (value) => {
  return {
    type: SETTING_TASK_PAGE_ID,
    payload: value,
  };
};

//Get pages

export const fetchGetPages = (params) => {
  return {
    type: FETCH_GET_PAGES,
    payload: params,
  };
};

export const fetchGetPagesSuccess = (response) => {
  return {
    type: FETCH_GET_PAGES_SUCCESS,
    payload: response,
  };
};

export const fetchGetPagesFailure = (error) => {
  return {
    type: FETCH_GET_PAGES_FAILURE,
    payload: error,
  };
};

//add Batch Completion Event

export const postAddBatchCompletionEvent = (params) => {
  console.log("paramsbatch====>", params)
  return {
    type: POST_ADD_BATCH_COMPLETION_EVENT,
    payload: params,
  };
};

export const postAddBatchCompletionEventSuccess = (response) => {
  return {
    type: POST_ADD_BATCH_COMPLETION_EVENT_SUCCESS,
    payload: response,
  };
};

export const postAddBatchCompletionEventFailure = (error) => {
  return {
    type: POST_ADD_BATCH_COMPLETION_EVENT_FAILURE,
    payload: error,
  };
};

//get Batch Completion Event

export const fetchGetBatchCompletionEvent = (params) => {
  return {
    type: FETCH_GET_BATCH_COMPLETION_EVENT,
    payload: params,
  };
};

export const fetchGetBatchCompletionEventSuccess = (response) => {
  return {
    type: FETCH_GET_BATCH_COMPLETION_EVENT_SUCCESS,
    payload: response,
  };
};

export const fetchGetBatchCompletionEventFailure = (error) => {
  return {
    type: FETCH_GET_BATCH_COMPLETION_EVENT_FAILURE,
    payload: error,
  };
};


//setting selected community item

export const SelectedCommunityItem = (value) => {
  return {
    type: SELECTED_COMMUNITY_ITEM,
    payload: value,
  };
};

//// add page section

export const postPageSection = (params) => {
  return {
    type: POST_PAGE_SECTION,
    payload: params,
  };
};

export const postPageSectionSuccess = (response) => {
  return {
    type: POST_PAGE_SECTION_SUCCESS,
    payload: response,
  };
};

export const postPageSectionFailure = (error) => {
  return {
    type: POST_PAGE_SECTION_FAILURE,
    payload: error,
  };
};

// userOnline activity status

export const postUpdateUserOnlineActivityLog = (params) => {
  return {
    type: POST_UPDATE_USER_ONLINE_ACTIVITY_LOG,
    payload: params,
  };
};

export const postUpdateUserOnlineActivityLogSuccess = (response) => {
  return {
    type: POST_UPDATE_USER_ONLINE_ACTIVITY_LOG_SUCCESS,
    payload: response,
  };
};

export const postUpdateUserOnlineActivityLogFailure = (error) => {
  return {
    type: POST_UPDATE_USER_ONLINE_ACTIVITY_LOG_FAILURE,
    payload: error,
  };
};



//..................................................................................................................................

/**
 * Student
 */


/**
* get student courses
*/

export const fetchStudentCourses = (params: any) => {
  return {
    type: FETCH_STUDENT_COURSES,
    payload: params,
  };
};

export const fetchStudentCoursesSuccess = (response: any) => {
  return {
    type: FETCH_STUDENT_COURSES_SUCCESS,
    payload: response,
  };
};

export const fetchStudentCoursesFailure = (response: any) => {
  return {
    type: FETCH_STUDENT_COURSES_FAILURE,
    payload: response,
  };
};

/**
 * get student course Section
 */

export const fetchStudentCourseSection = (params: any) => {
  return {
    type: FETCH_STUDENT_COURSE_SECTION,
    payload: params,
  };
};

export const fetchStudentCourseSectionSuccess = (response: any) => {
  return {
    type: FETCH_STUDENT_COURSE_SECTION_SUCCESS,
    payload: response,
  };
};

export const fetchStudentCourseSectionFailure = (response: any) => {
  return {
    type: FETCH_STUDENT_COURSE_SECTION_FAILURE,
    payload: response,
  };
};


/**
 * get student course TOPICS
 */

export const fetchStudentCourseTopics = (params: any) => {
  return {
    type: FETCH_STUDENT_COURSE_TOPICS,
    payload: params,
  };
};

export const fetchStudentCourseTopicsSuccess = (response: any) => {
  return {
    type: FETCH_STUDENT_COURSE_TOPICS_SUCCESS,
    payload: response,
  };
};

export const fetchStudentCourseTopicsFailure = (response: any) => {
  return {
    type: FETCH_STUDENT_COURSE_TOPICS_FAILURE,
    payload: response,
  };
};

/**
* fetch student course tasks
*/

export const fetchStudentCourseTasks = (params: any) => {
  return {
    type: FETCH_STUDENT_COURSE_TASKS,
    payload: params,
  };
};

export const fetchStudentCourseTasksSuccess = (response: any) => {
  return {
    type: FETCH_STUDENT_COURSE_TASKS_SUCCESS,
    payload: response,
  };
};

export const fetchStudentCourseTasksFailure = (response: any) => {
  return {
    type: FETCH_STUDENT_COURSE_TASKS_FAILURE,
    payload: response,
  };
};

/**
* fetch student course tasks details
*/

export const fetchStudentCourseTasksDetails = (params: any) => {
  return {
    type: FETCH_STUDENT_COURSE_TASKS_DETAILS,
    payload: params,
  };
};

export const fetchStudentCourseTaskDetailsSuccess = (response: any) => {
  return {
    type: FETCH_STUDENT_COURSE_TASKS_DETAILS_SUCCESS,
    payload: response,
  };
};

export const fetchStudentCourseTasksDetailsFailure = (response: any) => {
  return {
    type: FETCH_STUDENT_COURSE_TASKS_DETAILS_FAILURE,
    payload: response,
  };
};

/**
* setting default course 
*/

export const settingDefaultCourse = (value: any) => {
  return {
    type: SETTING_DEFAULT_COURSE,
    payload: value,
  };
};

// get all branches list

export const getAllBranchesList = (params) => {
  return {
    type: FETCH_ALL_BRANCHES_LIST,
    payload: params
  }
}

export const getAllBranchesListSuccess = (response) => {
  return {
    type: FETCH_ALL_BRANCHES_LIST_SUCCESS,
    payload: response
  }
}

export const getAllBranchesListFailure = (error) => {
  return {
    type: FETCH_ALL_BRANCHES_LIST_FAILURE,
    payload: error,
  };
};


/**
 * getting selected task item
 */
export const getTaskDetails = (value: any) => {
  return {
    type: GET_TASK_DETAILS,
    payload: value,
  };
};

/**
 * add student course task details
 */
export const postStudentCourseTasksDetails = (params: any) => {
  return {
    type: POST_STUDENT_COURSE_TASK_DETAILS,
    payload: params,
  };
};

export const postStudentCourseTasksDetailsSuccess = (response: any) => {
  return {
    type: POST_STUDENT_COURSE_TASK_DETAILS_SUCCESS,
    payload: response,
  };
};

export const postStudentCourseTasksDetailsFailure = (response: any) => {
  return {
    type: POST_STUDENT_COURSE_TASK_DETAILS_FAILURE,
    payload: response,
  };
};


export const addStudentCourseTaskResponseId = (response: any) => {
  console.log("responseiffdddd-->", response);

  return {
    type: ADD_STUDENT_COURSE_TASK_RESPONSE_ID,
    payload: response,
  };
};

/**
 * Setting student written question
 */

export const settingStudentWrittenQuestion = (value: any) => {
  return {
    type: STUDENT_WRITTEN_QUESTION,
    payload: value,
  };
};

/**
 * Setting student procedure
 */

export const settingStudentProcedureData = (value: any) => {
  return {
    type: STUDENT_PROCEDURE_DATA,
    payload: value,
  };
};

/**
 * Setting student flow diagram
 */

export const settingStudentFlowDiagramData = (value: any) => {
  return {
    type: STUDENT_FLOW_DIAGRAM,
    payload: value,
  };
};

/**
 * Setting student flow diagram image
 */

export const settingStudentFlowDiagramImage = (value: any) => {
  return {
    type: STUDENT_FLOW_DIAGRAM_IMAGE,
    payload: value,
  };
};


/**
 * setting student program data
 */
export const settingStudentProgramData = (value: any) => {
  return {
    type: STUDENT_PROGRAM_DATA,
    payload: value,
  };
};

/**
 * setting student current course section
 */
export const settingStudentCurrentCourseSection = (value: any) => {
  return {
    type: STUDENT_CURRENT_COURSE_SECTION,
    payload: value,
  };
};

/**
 * setting student program output data
 */
export const isExpandCodeEditorAction = (value: any) => {
  return {
    type: IS_EXPAND_CODE_EDITOR,
    payload: value,
  };
};

/**
 * is section selected
 */
export const isActiveSectionList = (value: any) => {
  return {
    type: IS_ACTIVE_SECTION,
    payload: value,
  };
};



// get student Page Sections

export const fetchStudentPageSections = (params) => {
  console.log("fetchStudentPageSections====>", params)
  return {
    type: FETCH_STUDENT_PAGE_SECTIONS,
    payload: params,
  };
};

export const fetchStudentPageSectionsSuccess = (response) => {
  return {
    type: FETCH_STUDENT_PAGE_SECTIONS_SUCCESS,
    payload: response,
  };
};

export const fetchStudentPageSectionsFailure = (error) => {
  return {
    type: FETCH_STUDENT_PAGE_SECTIONS_FAILURE,
    payload: error,
  };
};

// get student Section Type Title

export const fetchStudentSectionTypeTitle = (params) => {
  console.log("fetchStudentSectionTypeTitle====>", params)

  return {
    type: FETCH_STUDENT_SECTION_TYPE_TITLE,
    payload: params,
  };
};

export const fetchStudentSectionTypeTitleSuccess = (response) => {
  return {
    type: FETCH_STUDENT_SECTION_TYPE_TITLE_SUCCESS,
    payload: response,
  };
};

export const fetchStudentSectionTypeTitleFailure = (error) => {
  return {
    type: FETCH_STUDENT_SECTION_TYPE_TITLE_FAILURE,
    payload: error,
  };
};

// get student Section Type Image

export const fetchStudentSectionTypeImage = (params) => {
  console.log("action", params)
  return {
    type: FETCH_STUDENT_SECTION_TYPE_IMAGE,
    payload: params,
  };
};

export const fetchStudentSectionTypeImageSuccess = (response) => {
  return {
    type: FETCH_STUDENT_SECTION_TYPE_IMAGE_SUCCESS,
    payload: response,
  };
};

export const fetchStudentSectionTypeImageFailure = (error) => {
  return {
    type: FETCH_STUDENT_SECTION_TYPE_IMAGE_FAILURE,
    payload: error,
  };
};

// get student Section Type Video

export const fetchStudentSectionTypeVideo = (params) => {
  console.log("action", params)
  return {
    type: FETCH_STUDENT_SECTION_TYPE_VIDEO,
    payload: params,
  };
};

export const fetchStudentSectionTypeVideoSuccess = (response) => {
  return {
    type: FETCH_STUDENT_SECTION_TYPE_VIDEO_SUCCESS,
    payload: response,
  };
};

export const fetchStudentSectionTypeVideoFailure = (error) => {
  return {
    type: FETCH_STUDENT_SECTION_TYPE_VIDEO_FAILURE,
    payload: error,
  };
};

// get student Section Type Paragraph

export const fetchStudentSectionTypeParagraph = (params) => {
  console.log("action", params)
  return {
    type: FETCH_STUDENT_SECTION_TYPE_PARAGRAPH,
    payload: params,
  };
};

export const fetchStudentSectionTypeParagraphSuccess = (response) => {
  return {
    type: FETCH_STUDENT_SECTION_TYPE_PARAGRAPH_SUCCESS,
    payload: response,
  };
};

export const fetchStudentSectionTypeParagraphFailure = (error) => {
  return {
    type: FETCH_STUDENT_SECTION_TYPE_PARAGRAPH_FAILURE,
    payload: error,
  };
};

// get student Section Type Md

export const fetchStudentSectionTypeMd = (params) => {
  console.log("action", params)
  return {
    type: FETCH_STUDENT_SECTION_TYPE_MD,
    payload: params,
  };
};

export const fetchStudentSectionTypeMdSuccess = (response) => {
  return {
    type: FETCH_STUDENT_SECTION_TYPE_MD_SUCCESS,
    payload: response,
  };
};

export const fetchStudentSectionTypeMdFailure = (error) => {
  return {
    type: FETCH_STUDENT_SECTION_TYPE_MD_FAILURE,
    payload: error,
  };
};

// get student Section Type List

export const fetchStudentSectionTypeList = (params) => {
  console.log("actionlisttt", params)
  return {
    type: FETCH_STUDENT_SECTION_TYPE_LIST,
    payload: params,
  };
};

export const fetchStudentSectionTypeListSuccess = (response) => {
  return {
    type: FETCH_STUDENT_SECTION_TYPE_LIST_SUCCESS,
    payload: response,
  };
};

export const fetchStudentSectionTypeListFailure = (error) => {
  return {
    type: FETCH_STUDENT_SECTION_TYPE_LIST_FAILURE,
    payload: error,
  };
};

// get Student Tasks Timeline

export const fetchStudentTasksTimeline = (params) => {
  console.log("actionlisttt", params)
  return {
    type: FETCH_STUDENT_TASKS_TIMELINE,
    payload: params,
  };
};

export const fetchStudentTasksTimelineSuccess = (response) => {
  return {
    type: FETCH_STUDENT_TASKS_TIMELINE_SUCCESS,
    payload: response,
  };
};

export const fetchStudentTasksTimelineFailure = (error) => {
  return {
    type: FETCH_STUDENT_TASKS_TIMELINE_FAILURE,
    payload: error,
  };
};

/**
 * student code submission
 */

export const postStudentCodeSubmission = (params: any) => {
  return {
    type: STUDENT_CODE_SUBMISSION,
    payload: params,
  };
};

export const postStudentCodeSubmissionSuccess = (response: any) => {
  return {
    type: STUDENT_CODE_SUBMISSION_SUCCESS,
    payload: response,
  };
};

export const postStudentCodeSubmissionFailure = (response: any) => {
  return {
    type: STUDENT_CODE_SUBMISSION_FAILURE,
    payload: response,
  };
};

/**
 * add task by student
 */

export const postTaskByStudent = (params: any) => {
  return {
    type: POST_TASK_BY_STUDENT,
    payload: params,
  };
};

export const postTaskByStudentSuccess = (response: any) => {
  console.log("resssppp==>", response)
  return {
    type: POST_TASK_BY_STUDENT_SUCCESS,
    payload: response,
  };
};

export const postTaskByStudentFailure = (response: any) => {
  return {
    type: POST_TASK_BY_STUDENT_FAILURE,
    payload: response,
  };
};


export const taskTypeHandler = (response: any) => {
  return {
    type: TASK_TYPE,
    payload: response,
  };
};

/**
 * get student tasks details open
 */

export const fetchStudentTasksDetailsOpen = (params: any) => {
  console.log("parmmsss==>", params)
  return {
    type: FETCH_STUDENT_TASKS_DETAILS_OPEN,
    payload: params,
  };
};

export const fetchStudentTasksDetailsOpenSuccess = (response: any) => {
  console.log("resssppp==>", response)
  return {
    type: FETCH_STUDENT_TASKS_DETAILS_OPEN_SUCCESS,
    payload: response,
  };
};

export const fetchStudentTasksDetailsOpenFailure = (response: any) => {
  return {
    type: FETCH_STUDENT_TASKS_DETAILS_OPEN_FAILURE,
    payload: response,
  };
};

// course ide type

export const courseIdeType = (response: any) => {
  return {
    type: COURSE_IDE_TYPE,
    payload: response,
  };
};


export const toggleSideBarOpen = (response: any) => {
  return {
    type: TOGGLE_SIDE_NAV_OPEN,
    payload: response,
  };
};

// Setting student section data with an extra key

export const settingStudentSectionDataWithExtraKey = (response: any) => {
  return {
    type: STUDENT_COURSE_SECTION_DATA_LIST,
    payload: response,
  };
};


// get message events

export const getMessageEvents = (response: any) => {
  return {
    type: GET_MESSAGE_EVENTS,
    payload: response,
  };
};



/**
 * group chat
 */

export const postBatchChat = (params: any) => {
  console.log("parmmsss==>", params)
  return {
    type: POST_BATCH_CHAT,
    payload: params,
  };
};

export const postBatchChatSuccess = (response: any) => {
  console.log("resssppp==>", response)
  return {
    type: POST_BATCH_CHAT_SUCCESS,
    payload: response,
  };
};

export const postBatchChatFailure = (response: any) => {
  return {
    type: POST_BATCH_CHAT_FAILURE,
    payload: response,
  };
};

//GET batch chats

export const fetchBatchChat = (params: any) => {
  console.log("parmmsss==>", params)
  return {
    type: FETCH_BATCH_CHAT,
    payload: params,
  };
};

export const fetchBatchChatSuccess = (response: any) => {
  console.log("resssppp==>", response)
  return {
    type: FETCH_BATCH_CHAT_SUCCESS,
    payload: response,
  };
};

export const fetchBatchChatFailure = (response: any) => {
  return {
    type: FETCH_BATCH_CHAT_FAILURE,
    payload: response,
  };
};

//get batch user online activity log

export const fetchBatchUserOnlineActivityLog = (params: any) => {
  console.log("parmmsss==>", params)
  return {
    type: FETCH_BATCH_USER_ONLINE_ACTIVITY_LOG,
    payload: params,
  };
};

export const fetchBatchUserOnlineActivityLogSuccess = (response: any) => {
  console.log("resssppp==>", response)
  return {
    type: FETCH_BATCH_USER_ONLINE_ACTIVITY_LOG_SUCCESS,
    payload: response,
  };
};

export const fetchBatchUserOnlineActivityLogFailure = (response: any) => {
  return {
    type: FETCH_BATCH_USER_ONLINE_ACTIVITY_LOG_FAILURE,
    payload: response,
  };
};