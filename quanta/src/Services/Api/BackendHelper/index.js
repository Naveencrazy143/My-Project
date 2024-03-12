import { GET_FACULTIES_DETAILS } from '@Redux/';
import { post } from '../ApiHelper';
import {
  VALIDATE_USER,
  VALIDATE_REGISTER_USER,
  OTP_REGISTER,
  OTP_LOGIN,
  VALIDATE_USER_BUSINESS,
  GET_BUSINESS_PLACES,
  REGISTER_ADMIN,
  BRAND_SECTORS,
  BUSINESS_PLACES_DETAILS,
  REGISTER_COMPANY,
  SECTOR_SERVICE_TYPES,
  GET_ASSOCIATED_COMPANIES,
  URL_GET_DASHBOARD,
  GET_TICKETS,
  RAISE_NEW_TICKET,
  GET_TICKET_EVENTS,
  GET_TICKET_TAGS,
  ADD_TICKET_EVENT,

  VALIDATE_GUEST_USER,

  WEB_APP_CONFIG,

  GET_NOTIFICATIONS,

  POST_BATCH_VIDEO_CALL_USERS,
  /**
   * TFS
   */
  GET_TASK_DETAILS,
  GET_COURSES,
  GET_COURSE_SECTIONS,
  GET_COURSE_TOPICS,
  GET_COURSE_TOPIC_TASKS,
  POST_GENERIC_CRUD,
  POST_ADD_DESIGNATION,
  POST_ADD_DEPARTMENT,
  FETCH_DESIGNATION,
  FETCH_DEPARTMENT,
  POST_GENERIC_BATCH_CRUD,
  POST_ADD_STUDENT,
  FETCH_STUDENTS_LIST,
  POST_ADD_FACULTY,
  FETCH_FACULTY_LIST,
  FETCH_APPROVER,
  FETCH_REFERER_LIST,
  FETCH_STUDENT_DETAILS,
  FETCH_DASHBOARD_DETAILS,
  POST_RAISE_ANONYMOUS_COMPLAINT,
  FETCH_FACULTIES_DETAILS,
  FETCH_COURSE_IDE,
  FETCH_STUDENT_COURSE_TASKS_FACULTY,
  FETCH_STUDENT_COURSE_TASK_DETAILS_FACULTY,
  POST_SUBMIT_STUDENT_COURSE_PENDING_APPROVAL_TASK,
  POST_TASK_EVENT,
  FETCH_TASK_EVENTS,
  FETCH_USER_ONLINE_ACTIVE,
  FETCH_TOPIC_TASK_TYPES,
  FETCH_PAGE_SECTIONS,
  FETCH_SECTION_TYPE_TITLE,
  FETCH_SECTION_TYPE_IMAGE,
  FETCH_SECTION_TYPE_VIDEO,
  FETCH_SECTION_TYPE_LIST,
  FETCH_SECTION_TYPE_MD,
  FETCH_SECTION_TYPE_PARAGRAPH,
  FETCH_USER_REMARK,
  FETCH_USERS_REMARK,
  POST_BRANCH,

  FETCH_COURSE_TEMPLATES,
  POST_BULK_UPLOAD_COURSES,
  POST_BULK_UPLOAD_SECTIONS,
  POST_BULK_UPLOAD_TOPICS,
  POST_BULK_UPLOAD_TASKS,
  POST_BULK_UPLOAD_STUDENTS,
  POST_BULK_UPLOAD_FACULTIES,
  FETCH_EMPLOYEES_TEMPLATES,

  POST_USER_REMARKS,
  POST_SUBMIT_USER_REMARKS_APPROVAL,
  POST_SUBMIT_TASK_APPROVAL_BY_FACULTY,
  POST_ADD_COURSE,
  POST_ADD_COURSE_SECTION,
  POST_ADD_COURSE_TOPIC,
  POST_ADD_COURSE_TASK,
  POST_ADD_BATCH,
  POST_ADD_WEEKLY_CALENDAR,
  FETCH_COURSE_BATCHES,
  FETCH_COURSE_BATCH_DETAILS,
  POST_ASSIGN_BATCH_TO_STUDENT,
  FETCH_BATCH_STUDENTS,
  FETCH_COURSE_BATCH_ADDED_STUDENTS,
  FETCH_GET_PAGES,
  FETCH_GET_BATCH_COMPLETION_EVENT,
  POST_ADD_BATCH_COMPLETION_EVENT,
  POST_UPDATE_USER_ONLINE_ACTIVITY_LOG,


  /**
   * Student
   */
  FETCH_STUDENT_COURSES,
  FETCH_STUDENT_COURSE_SECTIONS,
  FETCH_STUDENT_COURSE_TOPICS,
  FETCH_STUDENT_COURSE_TASKS,
  FETCH_STUDENT_COURSE_TASKS_DETAILS,
  FETCH_ALL_BRANCHES_LIST,
  POST_STUDENT_COURSE_TASK_DETAILS,

  FETCH_STUDENT_PAGE_SECTIONS,
  FETCH_STUDENT_SECTION_TYPE_TITLE,
  FETCH_STUDENT_SECTION_TYPE_IMAGE,
  FETCH_STUDENT_SECTION_TYPE_VIDEO,
  FETCH_STUDENT_SECTION_TYPE_PARAGRAPH,
  FETCH_STUDENT_SECTION_TYPE_MD,
  FETCH_STUDENT_SECTION_TYPE_LIST,

  FETCH_STUDENT_TASKS_TIMELINE,

  STUDENT_CODE_SUBMISSION_URL,

  POST_TASK_BY_STUDENT,

  FETCH_STUDENT_TASKS_DETAILS_OPEN,


  /**
   * Student v2
   */

  FETCH_USER_DIGITAL_PROFILES_URL,
  POST_USER_DIGITAL_PROFILES_URL,

  GET_BATCH_VIDEO_CALL_USER,

  FETCH_TOKEN_BY_USER,
  
  /**
   * Guest
   */
  POST_ADD_TASK_BY_GUEST,
  FETCH_GUEST_TASKS,
  FETCH_GUEST_TASK_DETAILS,
  FETCH_GUEST_TASK_DETAILS_OPEN,
  FETCH_USER_DETAILS_URL,

  /**
   * group chats
   */

  POST_BATCH_CHAT,
  FETCH_BATCH_CHAT,
  FETCH_USER_ONLINE_ACTIVITY_LOG,
  POST_PAGE_SECTION


} from '../UrlHelper';
import { POST_USER_DIGITAL_PROFILE } from '@Redux/';

export const getAssociatedCompaniesApi = payload =>
  post(GET_ASSOCIATED_COMPANIES, payload, {});

export const getDashboardApi = payload => post(URL_GET_DASHBOARD, payload, {});
export const raiseNewTicketApi = payload => post(RAISE_NEW_TICKET, payload, {});

export const getTicketsApi = payload => post(GET_TICKETS, payload, {});
export const getTicketEventsApi = payload =>
  post(GET_TICKET_EVENTS, payload, {});
export const getTicketTagsApi = payload => post(GET_TICKET_TAGS, payload, {});
export const addTicketEventApi = payload => post(ADD_TICKET_EVENT, payload, {});

export const validateUserApi = payload => post(VALIDATE_USER, payload, {});
export const validateRegisterUserApi = payload =>
  post(VALIDATE_REGISTER_USER, payload, {});
export const otpRegisterApi = payload => post(OTP_REGISTER, payload, {});
export const otpLoginApi = payload => post(OTP_LOGIN, payload, {});
export const getBusinessPlacesApi = payload =>
  post(GET_BUSINESS_PLACES, payload, {});
export const validateUserBusinessApi = payload =>
  post(VALIDATE_USER_BUSINESS, payload, {});
export const registerAdminApi = payload => post(REGISTER_ADMIN, payload, {});
export const getBrandSectorsApi = payload => post(BRAND_SECTORS, payload, {});
export const getBusinessPlaceDetailsApi = payload =>
  post(BUSINESS_PLACES_DETAILS, payload, {});
export const registerCompanyApi = payload =>
  post(REGISTER_COMPANY, payload, {});

export const SectorServiceTypesApi = payload =>
  post(SECTOR_SERVICE_TYPES, payload, {});

export const validateGuestUserApi = payload => post(VALIDATE_GUEST_USER, payload, {});

export const webAppConfigApi = payload => post(WEB_APP_CONFIG, payload, {});

export const getNotificationsApi = payload => post(GET_NOTIFICATIONS, payload, {});




/**
 * TFS 
 */
export const fetchTaskDetailsApi = payload => post(GET_TASK_DETAILS, payload, {})
export const fetchCoursesApi = payload => post(GET_COURSES, payload, {})
export const fetchCourseSectionsApi = payload => post(GET_COURSE_SECTIONS, payload, {})
export const fetchCourseTopicsApi = payload => post(GET_COURSE_TOPICS, payload, {})
export const fetchCourseTopicTasksApi = payload => post(GET_COURSE_TOPIC_TASKS, payload, {})
export const postAddDesignationApi = (payload) => post(POST_ADD_DESIGNATION, payload, {})
export const postAddDepartmentApi = (payload) => post(POST_ADD_DEPARTMENT, payload, {})
export const fetchDesignationDataApi = (payload) => post(FETCH_DESIGNATION, payload, {})
export const fetchDepartmentDataApi = (payload) => post(FETCH_DEPARTMENT, payload, {})
export const postGenericCrudApi = payload => post(POST_GENERIC_CRUD, payload, {})
export const postGenericBatchCrudApi = payload => post(POST_GENERIC_BATCH_CRUD, payload, {})
export const postAddStudentApi = payload => post(POST_ADD_STUDENT, payload, {})
export const fetchStudentsListApi = payload => post(FETCH_STUDENTS_LIST, payload, {})
export const postAddFacultyApi = payload => post(POST_ADD_FACULTY, payload, {})
export const fetchFacultiesListApi = payload => post(FETCH_FACULTY_LIST, payload, {})
export const fetchApproverApi = payload => post(FETCH_APPROVER, payload, {})
export const fetchRefererListApi = payload => post(FETCH_REFERER_LIST, payload, {})
export const fetchStudentDetailsApi = payload => post(FETCH_STUDENT_DETAILS, payload, {})
export const fetchDashboardDetailsApi = payload => post(FETCH_DASHBOARD_DETAILS, payload, {})
export const postRaiseAnonymousComplaintApi = payload => post(POST_RAISE_ANONYMOUS_COMPLAINT, payload, {})
export const fetchFacultyDetailsApi = payload => post(FETCH_FACULTIES_DETAILS, payload, {})
export const fetchCourseIdeApi = (payload) => post(FETCH_COURSE_IDE, payload, {})
export const fetchStudentCourseTasksFacultyApi = (payload) => post(FETCH_STUDENT_COURSE_TASKS_FACULTY, payload, {})
export const fetchStudentCourseTaskDetailsFacultyApi = (payload) => post(FETCH_STUDENT_COURSE_TASK_DETAILS_FACULTY, payload, {})
export const postSubmitStudentCoursePendingApprovalTaskApi = (payload) => post(POST_SUBMIT_STUDENT_COURSE_PENDING_APPROVAL_TASK, payload, {})
export const postTaskEventApi = (payload) => post(POST_TASK_EVENT, payload, {})
export const fetchTaskEventsApi = (payload) => post(FETCH_TASK_EVENTS, payload, {})
export const fetchUserOnlineActiveLogApi = (payload) => post(FETCH_USER_ONLINE_ACTIVE, payload, {})
export const fetchTopicTaskTypesApi = (payload) => post(FETCH_TOPIC_TASK_TYPES, payload, {})
export const fetchUserRemarkApi = (payload) => post(FETCH_USER_REMARK, payload, {})
export const fetchUsersRemarkApi = (payload) => post(FETCH_USERS_REMARK, payload, {})
export const postAddBatchApi = (payload) => post(POST_ADD_BATCH, payload, {})
export const postAddWeeklyCalendarApi = (payload) => post(POST_ADD_WEEKLY_CALENDAR, payload, {})
export const fetchCourseBatchesApi = (payload) => post(FETCH_COURSE_BATCHES, payload, {})
export const fetchCourseBatchDetailsApi = (payload) => post(FETCH_COURSE_BATCH_DETAILS, payload, {})
export const assignCourseBatchToStudentApi = (payload) => post(POST_ASSIGN_BATCH_TO_STUDENT, payload, {})
export const fetchBatchStudentsApi = (payload) => post(FETCH_BATCH_STUDENTS, payload, {})
export const fetchCourseBatchAddedStudentsApi = (payload) => post(FETCH_COURSE_BATCH_ADDED_STUDENTS, payload, {})



export const fetchPageSectionsApi = (payload) => post(FETCH_PAGE_SECTIONS, payload, {})
export const fetchSectionTypeTitleApi = (payload) => post(FETCH_SECTION_TYPE_TITLE, payload, {})
export const fetchSectionTypeImageApi = (payload) => post(FETCH_SECTION_TYPE_IMAGE, payload, {})
export const fetchSectionTypeVideoApi = (payload) => post(FETCH_SECTION_TYPE_VIDEO, payload, {})
export const fetchSectionTypeParagraphApi = (payload) => post(FETCH_SECTION_TYPE_PARAGRAPH, payload, {})
export const fetchSectionTypeListApi = (payload) => post(FETCH_SECTION_TYPE_LIST, payload, {})
export const fetchSectionTypeMdApi = (payload) => post(FETCH_SECTION_TYPE_MD, payload, {})

export const postBranchApi = (payload) => post(POST_BRANCH, payload, {})
export const fetchGetPagesApi = (payload) => post(FETCH_GET_PAGES, payload, {})


//generic crud to individual api
export const postuserRemarksApi = (payload) => post(POST_USER_REMARKS, payload, {})
export const postSubmitUserRemarksApprovalApi = (payload) => post(POST_SUBMIT_USER_REMARKS_APPROVAL, payload, {})
export const postSubmitTaskApprovalByFacultyApi = (payload) => post(POST_SUBMIT_TASK_APPROVAL_BY_FACULTY, payload, {})
export const postAddCourseApi = (payload) => post(POST_ADD_COURSE, payload, {})
export const postAddCourseSectionApi = (payload) => post(POST_ADD_COURSE_SECTION, payload, {})
export const postAddCourseTopicApi = (payload) => post(POST_ADD_COURSE_TOPIC, payload, {})
export const postAddCourseTaskApi = (payload) => post(POST_ADD_COURSE_TASK, payload, {})



//BULK UPLOAD
export const fetchCourseTemplatesApi = (payload) => post(FETCH_COURSE_TEMPLATES, payload, {})
export const postBulkUploadCoursesApi = (payload) => post(POST_BULK_UPLOAD_COURSES, payload, {})
export const postBulkUploadSectionsApi = (payload) => post(POST_BULK_UPLOAD_SECTIONS, payload, {})
export const postBulkUploadTopicsApi = (payload) => post(POST_BULK_UPLOAD_TOPICS, payload, {})
export const postBulkUploadTasksApi = (payload) => post(POST_BULK_UPLOAD_TASKS, payload, {})
export const postBulkUploadStudentsApi = (payload) => post(POST_BULK_UPLOAD_STUDENTS, payload, {})
export const postBulkUploadFacultiesApi = (payload) => post(POST_BULK_UPLOAD_FACULTIES, payload, {})
export const fetchEmployeesTemplatesApi = (payload) => post(FETCH_EMPLOYEES_TEMPLATES, payload, {})

//// batch timeline admin
export const postAddBatchCompletionEventApi = (payload) => post(POST_ADD_BATCH_COMPLETION_EVENT, payload, {})
export const fetchGetBatchCompletionEventApi = (payload) => post(FETCH_GET_BATCH_COMPLETION_EVENT, payload, {})

/**
 * group chat 
 */

export const postBatchChatApi = (payload) => post(POST_BATCH_CHAT, payload, {})
export const fetchBatchChatApi = (payload) => post(FETCH_BATCH_CHAT, payload, {})
export const fetchUserOnlineActivityLogApi = (payload) => post(FETCH_USER_ONLINE_ACTIVITY_LOG, payload, {})

export const postPageSectionApi = (payload) => post(POST_PAGE_SECTION, payload, {})
export const postUpdateUserOnlineActivityLogApi = (payload) => post(POST_UPDATE_USER_ONLINE_ACTIVITY_LOG, payload, {})






/**
 * Student 
 */
export const fetchStudentCoursesApi = payload => post(FETCH_STUDENT_COURSES, payload, {})
export const fetchStudentCourseSectionsApi = payload => post(FETCH_STUDENT_COURSE_SECTIONS, payload, {})
export const fetchStudentCourseTopicsApi = payload => post(FETCH_STUDENT_COURSE_TOPICS, payload, {})
export const fetchStudentCourseTasksApi = payload => post(FETCH_STUDENT_COURSE_TASKS, payload, {})
export const fetchStudentCourseTasksDetailsApi = payload => post(FETCH_STUDENT_COURSE_TASKS_DETAILS, payload, {})
export const fetchAllBranchesListApi = (payload) => post(FETCH_ALL_BRANCHES_LIST, payload, {})
export const postStudentCourseTasksDetailsApi = payload => post(POST_STUDENT_COURSE_TASK_DETAILS, payload, {})


export const fetchStudentPageSectionsApi = (payload) => post(FETCH_STUDENT_PAGE_SECTIONS, payload, {})
export const fetchStudentSectionTypeTitleApi = (payload) => post(FETCH_STUDENT_SECTION_TYPE_TITLE, payload, {})
export const fetchStudentSectionTypeImageApi = (payload) => post(FETCH_STUDENT_SECTION_TYPE_IMAGE, payload, {})
export const fetchStudentSectionTypeVideoApi = (payload) => post(FETCH_STUDENT_SECTION_TYPE_VIDEO, payload, {})
export const fetchStudentSectionTypeParagraphApi = (payload) => post(FETCH_STUDENT_SECTION_TYPE_PARAGRAPH, payload, {})
export const fetchStudentSectionTypeListApi = (payload) => post(FETCH_STUDENT_SECTION_TYPE_LIST, payload, {})
export const fetchStudentSectionTypeMdApi = (payload) => post(FETCH_STUDENT_SECTION_TYPE_MD, payload, {})

export const fetchStudentTasksTimelineApi = (payload) => post(FETCH_STUDENT_TASKS_TIMELINE, payload, {})

// export const postStudentCodeSubmissionApi = (payload) => post(STUDENT_CODE_SUBMISSION_URL, payload, {}, 'http://192.168.43.239:8001')
export const postStudentCodeSubmissionApi = (payload) => post(STUDENT_CODE_SUBMISSION_URL, payload, {}, 'https://codesubmit.quantaedat.com')

export const postTaskByStudentApi = (payload) => post(POST_TASK_BY_STUDENT, payload, {})

export const fetchStudentTasksDetailsOpenApi = (payload) => post(FETCH_STUDENT_TASKS_DETAILS_OPEN, payload, {})

export const postBatchVideoCallUSersApi = (payload) => post(POST_BATCH_VIDEO_CALL_USERS, payload, {})

export const getBatchVideoCallUserApi = (payload) => post(GET_BATCH_VIDEO_CALL_USER, payload, {})

export const fetchTokenByUserApi = (payload) => post(FETCH_TOKEN_BY_USER, payload, {})





/**
 * Student version 2
 */
export const fetchUserDigitalProfilesApi = (payload) => post(FETCH_USER_DIGITAL_PROFILES_URL, payload, {})
export const postUserDigitalProfilesApi = (payload) => post(POST_USER_DIGITAL_PROFILES_URL, payload, {})
export const fetchUserDetailsApi = (payload) => post(FETCH_USER_DETAILS_URL, payload, {})



/**
 * Guest
 */

export const postAddTaskByGuestApi = (payload) => post(POST_ADD_TASK_BY_GUEST, payload, {})
export const fetchGuestTasksApi = (payload) => post(FETCH_GUEST_TASKS, payload, {})
export const fetchGuestTasksDetailsApi = (payload) => post(FETCH_GUEST_TASK_DETAILS, payload, {})
export const fetchGuestTaskDeTailsOpenApi = (payload) => post(FETCH_GUEST_TASK_DETAILS_OPEN, payload, {})









