/**
 * sample api
 */


const COMPANY = 'company/';
const TICKET = '/ticket/';
const AUTH = '/authentication/';
const COURSE = 'course/';
const EMPLOYEE = 'employee/'
const STUDENT = 'student/'
const POST = 'post/'
const AUTHENTICATION = 'authentication/v1/'
const MESSAGES = 'messages/'


export const GET_ASSOCIATED_COMPANIES = COMPANY + 'getAssociatedCompanies';
export const URL_GET_DASHBOARD = AUTH + 'dashboard';

export const RAISE_NEW_TICKET = TICKET + 'raiseNewTicket';
export const GET_TICKETS = TICKET + 'getTickets';
export const GET_TICKET_TAGS = TICKET + 'getTicketTags';
export const ADD_TICKET_EVENT = TICKET + 'addTicketEvent';
export const GET_TICKET_EVENTS = TICKET + 'getTicketEvents';

export const VALIDATE_USER = AUTH + 'validateUser';
export const VALIDATE_REGISTER_USER = AUTH + 'validateRegistrationUser';
export const OTP_REGISTER = AUTH + 'otpRegister';
export const OTP_LOGIN = AUTH + 'otpLogin';
export const GET_BUSINESS_PLACES = AUTH + 'getBusinessPlaces';
export const VALIDATE_USER_BUSINESS = AUTH + 'validateUserBusiness';
export const BUSINESS_PLACES_DETAILS = AUTH + 'getBusinessPlaceDetails';
export const REGISTER_COMPANY = AUTH + 'registerCompany';
export const REGISTER_ADMIN = AUTH + 'registerAdmin';



export const VALIDATE_GUEST_USER = AUTH + 'validateGuestUser';

export const WEB_APP_CONFIG = AUTHENTICATION + 'webAppConfig';

export const GET_NOTIFICATIONS = MESSAGES + 'getNotifications';



/**
 *  Company
 */

export const BRAND_SECTORS = COMPANY + 'getBrandSectors';

/**
 * TFS
 */
export const GET_TASK_DETAILS = COURSE + 'getTaskMetaDetails';
export const GET_COURSES = COURSE + 'getCourses';
export const GET_COURSE_SECTIONS = COURSE + 'getCourseSections'; 
export const GET_COURSE_TOPICS = COURSE + 'getCourseTopics';
export const GET_COURSE_TOPIC_TASKS = COURSE + 'getTaskItems';
export const POST_ADD_DESIGNATION = EMPLOYEE + 'addDesignation';
export const POST_ADD_DEPARTMENT = COMPANY + 'addDepartment';
export const FETCH_DESIGNATION = EMPLOYEE + 'getDesignations';
export const FETCH_DEPARTMENT = COMPANY + 'getDepartments';
export const POST_GENERIC_CRUD = COURSE + 'genericCRUD';
export const POST_GENERIC_BATCH_CRUD = COURSE + 'genericBatchCRUD';
export const POST_ADD_STUDENT = EMPLOYEE + 'addStudent'
export const FETCH_STUDENTS_LIST = STUDENT + 'getStudents'
export const POST_ADD_FACULTY = EMPLOYEE + 'addFaculty'
export const FETCH_FACULTY_LIST = STUDENT + 'getFaculties'
export const FETCH_APPROVER = STUDENT + 'getApprover'
export const FETCH_REFERER_LIST = STUDENT + 'getRefferer'
export const FETCH_STUDENT_DETAILS = STUDENT + 'getStudentDetails'
export const FETCH_DASHBOARD_DETAILS = AUTH + 'dashboard'
export const POST_RAISE_ANONYMOUS_COMPLAINT = EMPLOYEE + 'raiseAnonymousComplaint'
export const FETCH_FACULTIES_DETAILS = STUDENT + 'getFacultyDetails'
export const FETCH_COURSE_IDE = COURSE + 'getCourseIde'
export const FETCH_STUDENT_COURSE_TASKS_FACULTY = STUDENT + 'getStudentTaskItemsFaculty'
export const FETCH_STUDENT_COURSE_TASK_DETAILS_FACULTY = STUDENT + 'getStudentCourseTaskMetaDetailsFaculty'
export const POST_SUBMIT_STUDENT_COURSE_PENDING_APPROVAL_TASK = STUDENT + 'submitStudentCoursePendingApprovalTask'
export const POST_TASK_EVENT = STUDENT + 'addCourseEvent'
export const FETCH_TASK_EVENTS = STUDENT + 'getCourseEvents'
export const FETCH_USER_ONLINE_ACTIVE = EMPLOYEE + 'getUserOnlineActivityLog'
export const FETCH_TOPIC_TASK_TYPES = COURSE + 'getTopicTaskTypes'
export const FETCH_PAGE_SECTIONS = POST + 'getPageSections'
export const FETCH_SECTION_TYPE_TITLE = POST + 'getSectionTypeTitle'
export const FETCH_SECTION_TYPE_IMAGE = POST + 'getSectionTypeImage'
export const FETCH_SECTION_TYPE_VIDEO = POST + 'getSectionTypeVideo'
export const FETCH_SECTION_TYPE_PARAGRAPH = POST + 'getSectionTypeParagraph'
export const FETCH_SECTION_TYPE_MD = POST + 'getSectionTypeMd'
export const FETCH_SECTION_TYPE_LIST = POST + 'getSectionTypeList'
export const FETCH_USER_REMARK = EMPLOYEE + 'getUserRemarks'
export const FETCH_USERS_REMARK = EMPLOYEE + 'getUsersRemarks'
export const POST_BRANCH = COMPANY + 'addBranch'
export const POST_BULK_UPLOAD_COURSE_SECTIONS = COURSE + 'bulkUploadCourseSections'
export const POST_BULK_UPLOAD_COURSE_TOPICS = COURSE + 'bulkUploadCourseTopics'
export const POST_BULK_UPLOAD_COURSE_TASKS = COURSE + 'bulkUploadCourseTasks'
export const FETCH_COURSE_TEMPLATES = COURSE + 'getCourseTemplates'
export const POST_ADD_BATCH = STUDENT + 'addBatch'
export const POST_ADD_WEEKLY_CALENDAR = STUDENT + 'createWeeklyCalendar'
export const FETCH_COURSE_BATCHES = STUDENT + 'getCourseBatches'
export const FETCH_COURSE_BATCH_DETAILS = STUDENT + 'getCourseBatchDetails'
export const POST_ASSIGN_BATCH_TO_STUDENT = STUDENT + 'assignCourseBatchToStudent'
export const FETCH_BATCH_STUDENTS = STUDENT + 'getBatchStudents'
export const FETCH_COURSE_BATCH_ADDED_STUDENTS = STUDENT + 'getCourseBatchAddedStudents'
export const FETCH_GET_PAGES = POST + 'getPages'

// post/getpages

/**
 * generic crud to indivial api
 */
export const POST_USER_REMARKS = EMPLOYEE + 'addUserRemarks'
export const POST_SUBMIT_USER_REMARKS_APPROVAL = EMPLOYEE + 'submitUserRemarksApproval'
export const POST_SUBMIT_TASK_APPROVAL_BY_FACULTY = STUDENT + 'submitTaskApprovalByFaculty'
export const POST_ADD_COURSE = COURSE + 'addCourse'
export const POST_ADD_COURSE_SECTION = COURSE + 'addCourseSection'
export const POST_ADD_COURSE_TOPIC = COURSE + 'addCourseTopic'
export const POST_ADD_COURSE_TASK = COURSE + 'addCourseTaskMeta'



//bulk upload

export const POST_BULK_UPLOAD_COURSES = COURSE + 'bulkUploadCourses'
export const POST_BULK_UPLOAD_SECTIONS = COURSE + 'bulkUploadCourseSections'
export const POST_BULK_UPLOAD_TOPICS = COURSE + 'bulkUploadCourseTopics'
export const POST_BULK_UPLOAD_TASKS = COURSE + 'bulkUploadCourseTasks'
export const GET_BULK_UPLOAD_TEMPLATES = COURSE + 'getCourseTemplates'

export const POST_BULK_UPLOAD_STUDENTS = EMPLOYEE + 'bulkUploadStudents'
export const POST_BULK_UPLOAD_FACULTIES = EMPLOYEE + 'bulkUploadFaculties'
export const FETCH_EMPLOYEES_TEMPLATES = EMPLOYEE + 'getEmployeesTemplates'

// batch timeline admin

export const POST_ADD_BATCH_COMPLETION_EVENT = STUDENT + 'addBatchCompletionEvent'
export const FETCH_GET_BATCH_COMPLETION_EVENT = STUDENT + 'getBatchCompletionEvent'

// add page section

export const POST_PAGE_SECTION =  POST + 'addPageSection'

// userOnline activity status

export const POST_UPDATE_USER_ONLINE_ACTIVITY_LOG =  EMPLOYEE + 'updateUserOnlineActivityLog'




/**
 * Student........................................................................................................................
 */
export const FETCH_STUDENT_COURSES = STUDENT + 'getStudentCourses'
export const FETCH_STUDENT_COURSE_SECTIONS = STUDENT + 'getStudentCourseSections'
export const FETCH_STUDENT_COURSE_TOPICS = STUDENT + 'getStudentCourseTopics'
export const FETCH_STUDENT_COURSE_TASKS = STUDENT + 'getStudentCourseTaskItems'
export const FETCH_STUDENT_COURSE_TASKS_DETAILS = STUDENT + 'getStudentTaskMetaDetails'
export const FETCH_ALL_BRANCHES_LIST = COMPANY + 'getAllBranches';
export const POST_STUDENT_COURSE_TASK_DETAILS = STUDENT + 'addStudentCourseTaskMeta'

export const FETCH_STUDENT_PAGE_SECTIONS = POST + 'getPageSectionsStudent'
export const FETCH_STUDENT_SECTION_TYPE_TITLE = POST + 'getSectionTypeTitleStudent'
export const FETCH_STUDENT_SECTION_TYPE_IMAGE = POST + 'getSectionTypeImageStudent'
export const FETCH_STUDENT_SECTION_TYPE_VIDEO = POST + 'getSectionTypeVideoStudent'
export const FETCH_STUDENT_SECTION_TYPE_PARAGRAPH = POST + 'getSectionTypeParagraphStudent'
export const FETCH_STUDENT_SECTION_TYPE_MD = POST + 'getSectionTypeMdStudent'
export const FETCH_STUDENT_SECTION_TYPE_LIST = POST + 'getSectionTypeListStudent'

export const FETCH_STUDENT_TASKS_TIMELINE = STUDENT + 'getStudentTasksTimeline'
// https://api5.quantaedat.com/student/codeSubmission
// export const STUDENT_CODE_SUBMISSION_URL = 'submissions?base64_encoded=true&wait=true'

// export const STUDENT_CODE_SUBMISSION_URL = STUDENT + 'codeSubmission'


export const STUDENT_CODE_SUBMISSION_URL = 'submissions?base64_encoded=true&wait=true'
// export const STUDENT_CODE_SUBMISSION_URL = STUDENT + 'codeSubmission'

//  https://api5.quantaedat.com/student/codeSubmission

export const POST_TASK_BY_STUDENT = STUDENT + 'addTaskByStudent'

export const FETCH_STUDENT_TASKS_DETAILS_OPEN = STUDENT + 'getStudentTasksDetailsOpen'

export const POST_BATCH_VIDEO_CALL_USERS = STUDENT + 'addBatchVideoCallUsers'

export const GET_BATCH_VIDEO_CALL_USER = STUDENT + 'getBatchVideoCallUsers'

export const FETCH_TOKEN_BY_USER = STUDENT + 'getTokenByUser'





/**
 * Student version 2
 */

export const FETCH_USER_DIGITAL_PROFILES_URL = EMPLOYEE + 'getUserDigitalProfiles'
export const POST_USER_DIGITAL_PROFILES_URL = EMPLOYEE + 'addUserDigitalProfiles'
export const FETCH_USER_DETAILS_URL = EMPLOYEE + 'getUserDetailsDigitalprofile'


/**
 * Guest
 */

export const POST_ADD_TASK_BY_GUEST = STUDENT + 'addTaskByGuest'
export const FETCH_GUEST_TASKS = STUDENT + 'getGuestTasks'
export const FETCH_GUEST_TASK_DETAILS = STUDENT + 'getGuestTasksDetails'
export const FETCH_GUEST_TASK_DETAILS_OPEN = STUDENT + 'getGuestTasksDetailsOpen'


/**
 * group chat 
 */

export const POST_BATCH_CHAT = STUDENT + 'addBatchChat'
export const FETCH_BATCH_CHAT = STUDENT + 'getBatchChats'
export const FETCH_USER_ONLINE_ACTIVITY_LOG = EMPLOYEE + 'getUserOnlineActivityLog'





/**
 *  Service
 */
const SERVICE = '/service/';



export const SECTOR_SERVICE_TYPES = SERVICE + 'getSectorServiceTypes';