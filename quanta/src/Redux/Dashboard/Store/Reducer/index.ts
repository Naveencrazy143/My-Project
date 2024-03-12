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

  SET_CURRENT_COURSE_SECTION,

  POST_GENERIC_BATCH_CRUD_DETAILS,
  POST_GENERIC_BATCH_CRUD_DETAILS_SUCCESS,
  POST_GENERIC_BATCH_CRUD_DETAILS_FAILURE,
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

  FETCH_FACULTIES_DETAILS_FAILURE,
  FETCH_FACULTIES_DETAILS_SUCCESS,
  FETCH_FACULTIES_DETAILS,

  FETCH_COURSE_IDE,
  FETCH_COURSE_IDE_SUCCESS,
  FETCH_COURSE_IDE_FAILURE,

  COURSE_RENDERER,

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
  FETCH_PAGE_SECTIONS_FAILURE,
  FETCH_PAGE_SECTIONS_SUCCESS,

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

  REMARK_USERID,

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
  POST_BULK_UPLOAD_SECTION_FAILURE,
  POST_BULK_UPLOAD_SECTION_SUCCESS,

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

  TOGGLE_SIDE_NAV_OPEN,

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
  POST_ADD_BATCH_COMPLETION_EVENT_FAILURE,
  POST_ADD_BATCH_COMPLETION_EVENT_SUCCESS,

  FETCH_GET_BATCH_COMPLETION_EVENT_FAILURE,
  FETCH_GET_BATCH_COMPLETION_EVENT,
  FETCH_GET_BATCH_COMPLETION_EVENT_SUCCESS,

  SELECTED_COMMUNITY_ITEM,

  POST_PAGE_SECTION,
  POST_PAGE_SECTION_SUCCESS,
  POST_PAGE_SECTION_FAILURE,

  POST_UPDATE_USER_ONLINE_ACTIVITY_LOG,
  POST_UPDATE_USER_ONLINE_ACTIVITY_LOG_SUCCESS,
  POST_UPDATE_USER_ONLINE_ACTIVITY_LOG_FAILURE,

  //.......................................................................................................................................

  /**
   * Student
   */

  FETCH_STUDENT_COURSES,
  FETCH_STUDENT_COURSES_SUCCESS,
  FETCH_STUDENT_COURSES_FAILURE,

  FETCH_STUDENT_COURSE_SECTION,
  FETCH_STUDENT_COURSE_SECTION_SUCCESS,
  FETCH_STUDENT_COURSE_SECTION_FAILURE,

  FETCH_STUDENT_COURSE_TOPICS,
  FETCH_STUDENT_COURSE_TOPICS_SUCCESS,
  FETCH_STUDENT_COURSE_TOPICS_FAILURE,

  FETCH_STUDENT_COURSE_TASKS,
  FETCH_STUDENT_COURSE_TASKS_SUCCESS,
  FETCH_STUDENT_COURSE_TASKS_FAILURE,

  FETCH_STUDENT_COURSE_TASKS_DETAILS,
  FETCH_STUDENT_COURSE_TASKS_DETAILS_SUCCESS,
  FETCH_STUDENT_COURSE_TASKS_DETAILS_FAILURE,

  SETTING_DEFAULT_COURSE,

  FETCH_ALL_BRANCHES_LIST,
  FETCH_ALL_BRANCHES_LIST_SUCCESS,
  FETCH_ALL_BRANCHES_LIST_FAILURE,

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

  STUDENT_CURRENT_COURSE_SECTION,

  IS_EXPAND_CODE_EDITOR,
  EDIT_PAGE_SECTION_TYPE,

  IS_ACTIVE_SECTION,


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

  FETCH_STUDENT_TASKS_TIMELINE,
  FETCH_STUDENT_TASKS_TIMELINE_SUCCESS,
  FETCH_STUDENT_TASKS_TIMELINE_FAILURE,

  CURRENT_NAV,


  STUDENT_CODE_SUBMISSION,
  STUDENT_CODE_SUBMISSION_SUCCESS,
  STUDENT_CODE_SUBMISSION_FAILURE,
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

  STUDENT_COURSE_SECTION_DATA_LIST,

  GET_MESSAGE_EVENTS,

  POST_BATCH_VIDEO_CALL_USERS,
  POST_BATCH_VIDEO_CALL_USERS_SUCCESS,
  POST_BATCH_VIDEO_CALL_USERS_FAILURE,

  FETCH_BATCH_VIDEO_CALL_USERS,
  FETCH_BATCH_VIDEO_CALL_USERS_SUCCESS,
  FETCH_BATCH_VIDEO_CALL_USERS_FAILURE,

  FETCH_TOKEN_BY_USER,
  FETCH_TOKEN_BY_USER_SUCCESS,
  FETCH_TOKEN_BY_USER_FAILURE,
  EDIT_SCHEDULE_MEETING_DETAILS,

  /**
   * GROUP CHATS
   */
  POST_BATCH_CHAT,
  POST_BATCH_CHAT_FAILURE,
  POST_BATCH_CHAT_SUCCESS,

  FETCH_BATCH_CHAT,
  FETCH_BATCH_CHAT_SUCCESS,
  FETCH_BATCH_CHAT_FAILURE,

  FETCH_BATCH_USER_ONLINE_ACTIVITY_LOG,
  FETCH_BATCH_USER_ONLINE_ACTIVITY_LOG_SUCCESS,
  FETCH_BATCH_USER_ONLINE_ACTIVITY_LOG_FAILURE,


} from '../ActionTypes';

const initialState: any = {
  loading: false,
  error: '',
  numOfPages: 0,
  currentPage: 1,

  numOfPages2: 0,
  currentPage2: 1,

  response: undefined,
  isSuperAdmin: undefined,
  taskDetails: undefined,
  registeredCourses: undefined,
  courseSections: undefined,
  courseTopics: undefined,
  courseTopicTasks: [],
  courseTopicName: '',
  designationData: undefined,
  departmentData: undefined,
  currentCourseSectionObject: undefined,
  currentCourseSection: undefined,
  dndData: undefined,
  isOpenDndModal: false,
  studentsListData: undefined,
  facultiesListData: undefined,
  approverListData: undefined,
  refererListData: undefined,
  currentCourse: [],
  studentDetails: undefined,
  facultyDetails: undefined,
  currentTaskItem: undefined,
  dashboardDetails: undefined,
  selectedFacultyId: undefined,
  editUserDetails: undefined,
  courseIdeList: [],
  courseRenderer: undefined,
  studentCourseTasksFaculty: undefined,
  studentCourseTaskDetailsFaculty: undefined,
  viewStudentTaskId: undefined,
  studentTaskApproval: undefined,
  addEvent: [],
  // getEvents: [],
  userOnlineActiveLog: [],
  topicTaskTypes: undefined,
  pageSections: [],
  sectionTitle: [],
  sectionImage: [],
  sectionVideo: [],
  sectionList: [],
  sectionMd: [],
  sectionParagraph: [],
  editSectionType: undefined,
  remarkUser: {},
  userRemarksData: [],
  isShowStudentsListCard: false,
  isShowFacultiesListCard: false,
  isBack: false,
  usersRemarksData: [],
  currentNav: undefined,
  branch: [],
  editBranch: {},
  stuentTaskDetails: {},
  courseTopicsParentData: undefined,
  courseTopicsParentChildData: undefined,
  selectedFaculty: {},
  editQuestion: {},
  courseBatchesList: [],
  selectedBatchDetails: undefined,
  courseBatchDetails: undefined,
  batchStudentListData: [],
  courseBatchAddedStudentsList: [],
  isOpenTaskTypeModal: false,
  linkedInCommunityItem: undefined,
  pageTaskTitle: undefined,
  taskPageAndMetaId: undefined,
  pageList: [],
  pageTaskMetaId: undefined,
  taskPageId: undefined,
  minumumSpentMinutes: undefined,
  batchCompletionEvents: undefined,
  communityItem: undefined,



  /**
   * Student
   */
  studentCourses: undefined,
  studentCourseSection: undefined,
  studentCourseTopics: undefined,
  studentCourseTasks: undefined,
  studentCourseTasksDetails: undefined,
  defaultCourse: [],
  branchesDropdownData: [],
  getStudentTaskDetails: undefined,
  addStudentCourseTaskDetails: undefined,
  addStudentTaskResponseId: undefined,
  studentWrittenQuestion: '',
  studentProcedureData: [],
  studentFlowDiagramData: [],
  studentProgramData: undefined,
  studentCurrentCourseSection: [],
  isExpandCodeEditor: false,
  studentPageSections: [],
  studentSectionTitle: [],
  studentSectionImage: [],
  studentSectionVideo: [],
  studentSectionList: [],
  studentSectionMd: [],
  studentSectionParagraph: [],
  isActiveSection: false,
  studentTasksTimeLine: [],
  studentCodeOutput: undefined,
  studentQuestion: undefined,
  taskType: '1',
  taskByStudent: undefined,
  setSampleIO: undefined,
  setRulesData: undefined,
  setProcedureData: undefined,
  viewTaskDetails: undefined,
  studentFlowDiagramImage: "",
  courseIde: '',
  sideNavOpen: true,
  studentSectionDataListModified: [],
  messageEvents: [],
  scheduleMeetingUserData: undefined,
  usersVideoCallDetails: undefined,
  userToken: undefined,
  scheduleMeetingDetails: undefined,
  addBatchGroupChat: undefined,
  batchGroupChatDetails: undefined,
  batchUserActivityLogDetails:undefined
};

const DashboardReducer = (state: any = initialState, action: any) => {
  switch (action.type) {

    /**
     * reset reducer
     */
    case RESET_DASHBOARD:
      state = initialState;
      break;

    /**
   * setting is super admin
   */
    case IS_SUPER_ADMIN:

      state = { ...state, isSuperAdmin: action.payload };
      break;



    case FETCH_TASK_DETAILS:
      state = { ...state, loading: true };
      break;
    case FETCH_TASK_DETAILS_SUCCESS:
      state = { ...state, taskDetails: action.payload };
      break;
    case FETCH_TASK_DETAILS_FAILURE:
      state = { ...state, loading: false };
      break;

    /**
     * get courses
     */

    case FETCH_COURSES:
      state = { ...state, loading: true };
      break;
    case FETCH_COURSES_SUCCESS:
      state = {
        ...state,
        registeredCourses: action.payload,
        courseTopics: []
      };
      break;
    case FETCH_COURSES_FAILURE:
      state = { ...state, loading: false };
      break;


    /**
     * get course sections
     */

    case FETCH_COURSE_SECTIONS:
      state = { ...state, loading: true };
      break;
    case FETCH_COURSE_SECTIONS_SUCCESS:
      state = {
        ...state,
        courseSections: action.payload,
      };
      break;
    case FETCH_COURSE_SECTIONS_FAILURE:
      state = { ...state, loading: false };
      break;

    /**
  * get course Topics
  */

    case FETCH_COURSE_TOPICS:
      state = { ...state, loading: true };
      break;
    case FETCH_COURSE_TOPICS_SUCCESS:
      console.log(" action.payload ", action.payload);

      state = {
        ...state,
        courseTopics: action.payload
      };
      break;
    case FETCH_COURSE_TOPICS_FAILURE:
      state = { ...state, loading: false };
      break;

    /**
* get course Topic tasks
*/

    case FETCH_COURSE_TOPIC_TASKS:
      state = { ...state, loading: true };
      break;
    case FETCH_COURSE_TOPIC_TASKS_SUCCESS:
      state = { ...state, courseTopicTasks: action.payload };
      break;
    case FETCH_COURSE_TOPIC_TASKS_FAILURE:
      state = { ...state, loading: false };
      break;

    /**
     * setting course topic name
     */
    case SET_COURSE_TOPIC_NAME:
      state = { ...state, courseTopicName: action.payload };
      break;

    /**
     * Generic CRUD details
     */
    case POST_GENERIC_CRUD_DETAILS:
      console.log('reducer===>')
      state = { ...state, loading: true };
      break;
    case POST_GENERIC_CRUD_DETAILS_SUCCESS:
      state = { ...state, loading: false };
      break;
    case POST_GENERIC_CRUD_DETAILS_FAILURE:
      state = { ...state, loading: false };
      break;


    /**
     * Add department
     */

    case ADD_DEPARTMENT:
      state = { ...state, loading: true };
      break;
    case ADD_DEPARTMENT_SUCCESS:
      state = {
        ...state,
        loading: false,
      };
      break;
    case ADD_DEPARTMENT_FAILURE:
      state = {
        ...state,
        error: action.payload,
        loading: false,
      };
      break;

    /**
     * Add designation
     */

    case ADD_DESIGNATION:
      state = { ...state, loading: true };
      break;
    case ADD_DESIGNATION_SUCCESS:
      state = {
        ...state,
        loading: false,
      };
      break;
    case ADD_DESIGNATION_FAILURE:
      state = {
        ...state,
        error: action.payload,
        loading: false,
      };
      break;

    //get departments

    case FETCH_DEPARTMENT:
      state = { ...state, loading: true };
      break;
    case FETCH_DEPARTMENT_SUCCESS:
      state = {
        ...state,
        loading: false,
        departmentData: action.payload,
      };
      break;
    case FETCH_DEPARTMENT_FAILURE:
      state = {
        ...state,
        error: action.payload,
        loading: false,
      };
      break;

    //get designations

    case FETCH_DESIGNATION:
      state = { ...state, loading: true };
      break;
    case FETCH_DESIGNATION_SUCCESS:
      state = {
        ...state,
        loading: false,
        designationData: action.payload,
      };
      break;
    case FETCH_DESIGNATION_FAILURE:
      state = {
        ...state,
        error: action.payload,
        loading: false,
      };
      break;

    /**
    * setting current course section
    */
    case SET_CURRENT_COURSE_SECTION:

      state = { ...state, currentCourseSectionObject: action.payload };
      break;

    /**
  * Generic Batch CRUD details
  */
    case POST_GENERIC_BATCH_CRUD_DETAILS:
      state = { ...state, loading: true };
      break;
    case POST_GENERIC_BATCH_CRUD_DETAILS_SUCCESS:
      state = { ...state, loading: false };
      break;
    case POST_GENERIC_BATCH_CRUD_DETAILS_FAILURE:
      state = { ...state, loading: false };
      break;

    /**
    * handle dnd modal open or close state
    */
    case IS_DND_MODAL_OPEN:
      console.log("reducer--->", action.payload);

      state = { ...state, isDndModalOpen: action.payload };
      break;

    /**
   * add student
   */
    case ADD_STUDENT:
      state = { ...state, loading: true };
      break;
    case ADD_STUDENT_SUCCESS:
      state = { ...state, loading: false };
      break;
    case ADD_STUDENT_FAILURE:
      state = { ...state, loading: false };
      break;

    /**
 * get students list
 */
    case FETCH_STUDENTS_LIST:

      state = { ...state, loading: true };
      break;
    case FETCH_STUDENTS_LIST_SUCCESS:

      state = { ...state, loading: false, studentsListData: action.payload };
      break;
    case FETCH_STUDENTS_LIST_FAILURE:
      state = { ...state, loading: false };
      break;


    /**
   * add faculty
   */
    case ADD_FACULTY:
      state = { ...state, loading: true };
      break;
    case ADD_FACULTY_SUCCESS:
      state = { ...state, loading: false };
      break;
    case ADD_FACULTY_FAILURE:
      state = { ...state, loading: false };
      break;

    /**
 * get faculties list
 */
    case FETCH_FACULTIES_LIST:
      state = { ...state, loading: true };
      break;
    case FETCH_FACULTIES_LIST_SUCCESS:
      state = { ...state, loading: false, facultiesListData: action.payload };
      break;
    case FETCH_FACULTIES_LIST_FAILURE:
      state = { ...state, loading: false };
      break;

    /**
     * get Approver list
     */
    case FETCH_APPROVER_LIST:
      state = { ...state, loading: true };
      break;
    case FETCH_APPROVER_LIST_SUCCESS:
      state = { ...state, loading: false, approverListData: action.payload };
      break;
    case FETCH_APPROVER_LIST_FAILURE:
      state = { ...state, loading: false };
      break;

    /**
    * get referer list
    */
    case FETCH_REFERER_LIST:
      state = { ...state, loading: true };
      break;
    case FETCH_REFERER_LIST_SUCCESS:
      state = { ...state, loading: false, refererListData: action.payload };
      break;
    case FETCH_REFERER_LIST_FAILURE:
      state = { ...state, loading: false };
      break;

    /**
   * setting current course
   */
    case SETTING_CURRENT_COURSE:
      state = { ...state, currentCourse: action.payload };
      break;

    /**
 * get referer list
 */
    case FETCH_STUDENTS_DETAILS:
      state = { ...state, loading: true };
      break;
    case FETCH_STUDENTS_DETAILS_SUCCESS:
      state = { ...state, loading: false, studentDetails: action.payload };
      break;
    case FETCH_STUDENTS_DETAILS_FAILURE:
      state = { ...state, loading: false };
      break;

    /**
* setting current task item
*/
    case SETTING_CURRENT_TASK_ITEM:
      console.log(" action.payload action.payload", action.payload);

      state = { ...state, currentTaskItem: action.payload };
      break;

    /**
    * get dashboard details
    */
    case FETCH_DASHBOARD_DETAILS:
      state = { ...state, loading: true };
      break;
    case FETCH_DASHBOARD_DETAILS_SUCCESS:
      state = { ...state, loading: false, dashboardDetails: action.payload };
      break;
    case FETCH_DASHBOARD_DETAILS_FAILURE:
      state = { ...state, loading: false };
      break;

    /**
  * setting selected faculty id
  */
    case SETTING_SELECTED_FACULTY_ID:

      state = { ...state, selectedFacultyId: action.payload };
      break;

    /**
    * edit user or add user
    */
    case EDIT_USER_REGISTRATION:
      state = { ...state, editUserDetails: action.payload };
      break;

    /**
  * sSET_GUEST_SAMPLE_INPUT_OUTPUT_DATA
  */
    case SET_GUEST_SAMPLE_INPUT_OUTPUT_DATA:
      state = { ...state, setSampleIO: action.payload };
      break;

    /**
*  SET_GUEST_RULES_DATA
*/
    case SET_GUEST_RULES_DATA:
      state = { ...state, setRulesData: action.payload };
      break;


    /**
*  SET_GUEST_PROCEDURE_DATA
*/
    case SET_GUEST_PROCEDURE_DATA:
      state = { ...state, setProcedureData: action.payload };
      break;



    /**
  * get currnet nav to active sidenavbar
  */
    case CURRENT_NAV:
      state = { ...state, currentNav: action.payload };
      break;




    /**
    * post raise anonymous complaint/ticket
    */

    case POST_RAISE_ANONYMOUS_COMPLAINT:
      state = { ...state, loading: true };
      break;
    case POST_RAISE_ANONYMOUS_COMPLAINT_SUCCESS:
      state = { ...state, loader: false };
      break;
    case POST_RAISE_ANONYMOUS_COMPLAINT_FAILURE:
      state = { ...state, loading: false };
      break;


    /**
     * Get Faculty Details
     */


    case FETCH_FACULTIES_DETAILS:
      state = { ...state, loading: true };
      break;
    case FETCH_FACULTIES_DETAILS_SUCCESS:
      console.log("action----------", action.payload);

      state = { ...state, loader: false, facultyDetails: action.payload };             ///////////
      break;
    case FETCH_FACULTIES_DETAILS_FAILURE:
      state = { ...state, loader: false };
      break;

    /**
     * get course ide
     */

    case FETCH_COURSE_IDE:
      state = { ...state, loading: true };
      break;
    case FETCH_COURSE_IDE_SUCCESS:
      state = { ...state, courseIdeList: action.payload };
      break;
    case FETCH_COURSE_IDE_FAILURE:
      state = { ...state, loading: false };
      break;

    /**
*is course renderer
*/
    case COURSE_RENDERER:

      state = { ...state, courseRenderer: action.payload };
      break;

    /**
    * get Student Course Tasks Faculty
    */

    case FETCH_STUDENT_COURSE_TASKS_FACULTY:
      state = { ...state, loading: true };
      break;
    case FETCH_STUDENT_COURSE_TASKS_FACULTY_SUCCESS:
      state = { ...state, studentCourseTasksFaculty: action.payload };
      break;
    case FETCH_STUDENT_COURSE_TASKS_FACULTY_FAILURE:
      state = { ...state, loading: false };
      break;

    /**
   * get Student Course Task details Faculty
   */

    case FETCH_STUDENT_COURSE_TASK_DETAILS_FACULTY:
      console.log("reducerrrr")
      state = { ...state, loading: true };
      break;
    case FETCH_STUDENT_COURSE_TASK_DETAILS_FACULTY_SUCCESS:
      state = { ...state, studentCourseTaskDetailsFaculty: action.payload };
      break;
    case FETCH_STUDENT_COURSE_TASK_DETAILS_FACULTY_FAILURE:
      state = { ...state, loading: false };
      break;

    /**
   * view student task details id
   */

    case VIEW_STUDENT_TASK_DETAILS_ID:
      state = { ...state, viewStudentTaskId: action.payload };
      break;

    /**
   * submit Student Course Pending Approval
   */

    case POST_SUBMIT_STUDENT_COURSE_PENDING_APPROVAL_TASK:
      console.log("reducerrrr")
      state = { ...state, loading: true };
      break;
    case POST_SUBMIT_STUDENT_COURSE_PENDING_APPROVAL_TASK_SUCCESS:
      state = { ...state, studentTaskApproval: action.payload };
      break;
    case POST_SUBMIT_STUDENT_COURSE_PENDING_APPROVAL_TASK_FAILURE:
      state = { ...state, loading: false };
      break;

    /**
     * add task event
     */

    case POST_TASK_EVENT:
      state = { ...state, loading: true };
      break;
    case POST_TASK_EVENT_SUCCESS:
      state = { ...state, addEvent: action.payload };
      break;
    case POST_TASK_EVENT_FAILURE:
      state = { ...state, loading: false };
      break;

    /**
     * get task events
     */

    case FETCH_TASK_EVENTS:
      state = { ...state, loading: true };
      break;
    case FETCH_TASK_EVENTS_SUCCESS:
      // state = { ...state, getEvents: action.payload };
      state = { ...state };

      break;
    case FETCH_TASK_EVENTS_FAILURE:
      state = { ...state, loading: false };
      break;

    /**
 * get user online active log
 */

    case FETCH_USER_ONLINE_ACTIVE_LOG:
      state = { ...state, loading: true };
      break;
    case FETCH_USER_ONLINE_ACTIVE_LOG_SUCCESS:
      state = { ...state, userOnlineActiveLog: action.payload };
      break;
    case FETCH_USER_ONLINE_ACTIVE_LOG_FAILURE:
      state = { ...state, loading: false };
      break;
    /**
* get Page section
*/

    case FETCH_PAGE_SECTIONS:
      state = { ...state, loading: true, pageSections: [] };
      break;
    case FETCH_PAGE_SECTIONS_SUCCESS:
      state = { ...state, pageSections: action.payload };
      break;
    case FETCH_PAGE_SECTIONS_FAILURE:
      state = { ...state, loading: false };
      break;


    /**
* get topic task types
*/

    case FETCH_TOPIC_TASK_TYPES:
      state = { ...state, loading: true };
      break;
    case FETCH_TOPIC_TASK_TYPES_SUCCESS:
      state = { ...state, topicTaskTypes: action.payload };
      break;
    case FETCH_TOPIC_TASK_TYPES_FAILURE:
      state = { ...state, loading: false };
      break;

    /**
* get Section Type Title
*/

    case FETCH_SECTION_TYPE_TITLE:
      state = { ...state, loading: true };
      break;
    case FETCH_SECTION_TYPE_TITLE_SUCCESS:
      state = { ...state, sectionTitle: action.payload };
      break;
    case FETCH_SECTION_TYPE_TITLE_FAILURE:
      state = { ...state, loading: false };
      break;

    /**
* get Section Type Image
*/

    case FETCH_SECTION_TYPE_IMAGE:
      state = { ...state, loading: true };
      break;
    case FETCH_SECTION_TYPE_IMAGE_SUCCESS:
      state = { ...state, sectionImage: action.payload };
      break;
    case FETCH_SECTION_TYPE_IMAGE_FAILURE:
      state = { ...state, loading: false };
      break;

    /**
* get Section Type Video
*/

    case FETCH_SECTION_TYPE_VIDEO:
      state = { ...state, loading: true };
      break;
    case FETCH_SECTION_TYPE_VIDEO_SUCCESS:
      state = { ...state, sectionVideo: action.payload };
      break;
    case FETCH_SECTION_TYPE_VIDEO_FAILURE:
      state = { ...state, loading: false };
      break;

    /**
* get Section Type Paragraph
*/

    case FETCH_SECTION_TYPE_PARAGRAPH:
      state = { ...state, loading: true };
      break;
    case FETCH_SECTION_TYPE_PARAGRAPH_SUCCESS:
      state = { ...state, sectionParagraph: action.payload };
      break;
    case FETCH_SECTION_TYPE_PARAGRAPH_FAILURE:
      state = { ...state, loading: false };
      break;

    /**
* get Section Type List
*/

    case FETCH_SECTION_TYPE_LIST:
      state = { ...state, loading: true };
      break;
    case FETCH_SECTION_TYPE_LIST_SUCCESS:
      state = { ...state, sectionList: action.payload };
      break;
    case FETCH_SECTION_TYPE_LIST_FAILURE:
      state = { ...state, loading: false };
      break;

    /**
* get Section Type Md
*/

    case FETCH_SECTION_TYPE_MD:
      state = { ...state, loading: true };
      break;
    case FETCH_SECTION_TYPE_MD_SUCCESS:
      state = { ...state, sectionMd: action.payload };
      break;
    case FETCH_SECTION_TYPE_MD_FAILURE:
      state = { ...state, loading: false };
      break;

    /**
    * edit section type to get id
    */
    case EDIT_PAGE_SECTION_TYPE:
      state = { ...state, editSectionType: action.payload };
      break;



    /**
    * get user remark
    */

    case FETCH_USER_REMARK:
      state = { ...state, loading: true };
      break;
    case FETCH_USER_REMARK_SUCCESS:
      state = { ...state, userRemarksData: action.payload };
      break;
    case FETCH_USER_REMARK_FAILURE:
      state = { ...state, loading: false };
      break;

    /**
    * get users remark 
    */

    case FETCH_USERS_REMARK:
      state = { ...state, loading: true };
      break;
    case FETCH_USERS_REMARK_SUCCESS:
      state = { ...state, usersRemarksData: action.payload };
      break;
    case FETCH_USERS_REMARK_FAILURE:
      state = { ...state, loading: false };
      break;

    /**
     * Remark user id
     */

    case REMARK_USERID:
      state = { ...state, remarkUser: action.payload };
      break;

    /**
   * get COURSE_TOPIC_DATA
   */

    case COURSE_TOPIC_PARENT_DATA:
      state = { ...state, courseTopicsParentData: action.payload };
      break;

    case COURSE_TOPIC_PARENT_CHILD_DATA:
      state = { ...state, courseTopicsParentChildData: action.payload };
      break;


    /**
     * is show students list
     */

    case IS_SHOW_STUDENTS_LIST:
      state = { ...state, isShowStudentsListCard: action.payload };
      break;

    /**
  * is show faculties list
  */

    case IS_SHOW_FACULTIES_LIST:
      state = { ...state, isShowFacultiesListCard: action.payload };
      break;

    /**
 * is back
 */

    case IS_BACK:
      console.log("reducer", action.payload);

      state = {
        ...state,
        isBack: action.payload
      };
      break;

    /**
    * add branch
    */

    case POST_BRANCH:
      state = { ...state, loading: true };
      break;
    case POST_BRANCH_SUCCESS:
      state = { ...state, branch: action.payload };
      break;
    case POST_BRANCH_FAILURE:
      state = { ...state, loading: false };
      break;



    /**
    * course templates
    */

    case FETCH_COURSE_TEMPLATES:
      state = { ...state, loading: true };
      break;
    case FETCH_COURSE_TEMPLATES_SUCCESS:
      state = { ...state, courseTemplates: action.payload };
      break;
    case FETCH_COURSE_TEMPLATES_FAILURE:
      state = { ...state, loading: false };
      break;

    /**
     * POST BULK UPLOAD COURSES
     */
    case POST_BULK_UPLOAD_COURSES:
      state = { ...state, loading: true };
      break;
    case POST_BULK_UPLOAD_COURSES_SUCCESS:
      state = { ...state, loading: false };
      break;
    case POST_BULK_UPLOAD_COURSES_FAILURE:
      state = { ...state, loading: false };
      break;


    /**
* POST BULK UPLOAD SECTION
*/
    case POST_BULK_UPLOAD_SECTION:
      state = { ...state, loading: true };
      break;
    case POST_BULK_UPLOAD_SECTION_SUCCESS:
      state = { ...state, loading: false };
      break;
    case POST_BULK_UPLOAD_SECTION_FAILURE:
      state = { ...state, loading: false };
      break;


    /**
    * POST BULK UPLOAD TOPICS
    */

    case POST_BULK_UPLOAD_TOPICS:
      state = { ...state, loading: true };
      break;
    case POST_BULK_UPLOAD_TOPICS_SUCCESS:
      state = { ...state, loading: false };
      break;
    case POST_BULK_UPLOAD_TOPICS_FAILURE:
      state = { ...state, loading: false };
      break;

    /**
    *POST BULK UPLOAD TASKS
    */

    case POST_BULK_UPLOAD_TASKS:
      state = { ...state, loading: true };
      break;
    case POST_BULK_UPLOAD_TASKS_SUCCESS:
      state = { ...state, loading: false };
      break;
    case POST_BULK_UPLOAD_TASKS_FAILURE:
      state = { ...state, loading: false };
      break;

    /**
    * bulk upload Students
    */

    case POST_BULK_UPLOAD_STUDENTS:
      state = { ...state, loading: true };
      break;
    case POST_BULK_UPLOAD_STUDENTS_SUCCESS:
      state = { ...state, loading: false };
      break;
    case POST_BULK_UPLOAD_STUDENTS_FAILURE:
      state = { ...state, loading: false };
      break;

    /**
    * bulk upload faculties
    */

    case POST_BULK_UPLOAD_FACULTIES:
      state = { ...state, loading: true };
      break;
    case POST_BULK_UPLOAD_FACULTIES_SUCCESS:
      state = { ...state, loading: false };
      break;
    case POST_BULK_UPLOAD_FACULTIES_FAILURE:
      state = { ...state, loading: false };
      break;

    /**
    * get employees templates
    */

    case FETCH_EMPLOYEES_TEMPLATES:
      state = { ...state, loading: true };
      break;
    case FETCH_EMPLOYEES_TEMPLATES_SUCCESS:
      state = { ...state, employeesTemplates: action.payload };
      break;
    case FETCH_EMPLOYEES_TEMPLATES_FAILURE:
      state = { ...state, loading: false };
      break;

    /**
     * get faculty details
     */

    case SELECTED_FACULTY_DETAILS:
      state = { ...state, selectedFaculty: action.payload };
      break;


    /**
    * add user remarks 
    */

    case POST_USER_REMARKS:
      state = { ...state, loading: true };
      break;
    case POST_USER_REMARKS_SUCCESS:
      state = { ...state, loading: false };
      break;
    case POST_USER_REMARKS_FAILURE:
      state = { ...state, loading: false };
      break;

    /**
    * submit User Remarks Approval
    */

    case POST_SUBMIT_USER_REMARKS_APPROVAL:
      state = { ...state, loading: true };
      break;
    case POST_SUBMIT_USER_REMARKS_APPROVAL_SUCCESS:
      state = { ...state, loading: false };
      break;
    case POST_SUBMIT_USER_REMARKS_APPROVAL_FAILURE:
      state = { ...state, loading: false };
      break;

    /**
    * submit task approval by faculty
    */

    case POST_SUBMIT_TASK_APPROVAL_BY_FACULTY:
      state = { ...state, loading: true };
      break;
    case POST_SUBMIT_TASK_APPROVAL_BY_FACULTY_SUCCESS:
      state = { ...state, loading: false };
      break;
    case POST_SUBMIT_TASK_APPROVAL_BY_FACULTY_FAILURE:
      state = { ...state, loading: false };
      break;

    /**
    * add course
    */

    case POST_ADD_COURSE:
      state = { ...state, loading: true };
      break;
    case POST_ADD_COURSE_SUCCESS:
      state = { ...state, loading: false };
      break;
    case POST_ADD_COURSE_FAILURE:
      state = { ...state, loading: false };
      break;

    /**
 * add batch
 */

    //do edit question

    case DO_EDIT_QUESTION:
      state = { ...state, editQuestion: action.payload };
      break;


    case POST_ADD_BATCH:
      state = { ...state, loading: true };
      break;
    case POST_ADD_BATCH_SUCCESS:
      state = { ...state, loading: false };
      break;
    case POST_ADD_BATCH_FAILURE:
      state = { ...state, loading: false };
      break;

    /**
 * add weekly calendar
 */

    case POST_ADD_WEEKLY_CALENDAR:
      state = { ...state, loading: true };
      break;
    case POST_ADD_WEEKLY_CALENDAR_SUCCESS:
      state = { ...state, loading: false };
      break;
    case POST_ADD_WEEKLY_CALENDAR_FAILURE:
      state = { ...state, loading: false };
      break;

    /**
*Get course batches
*/

    case FETCH_COURSE_BATCHES:
      state = { ...state, loading: true };
      break;
    case FETCH_COURSE_BATCHES_SUCCESS:
      state = { ...state, courseBatchesList: action.payload };
      break;
    case FETCH_COURSE_BATCHES_FAILURE:
      state = { ...state, loading: false };
      break;

    //setting selected batch details

    case SETTING_SELECTED_BATCH_DETAILS:
      console.log("action.payload ", action.payload);

      state = { ...state, selectedBatchDetails: action.payload };
      break;

    /**
*Get course batch Details
*/

    case FETCH_COURSE_BATCH_DETAILS:
      state = { ...state, loading: true };
      break;
    case FETCH_COURSE_BATCH_DETAILS_SUCCESS:
      state = { ...state, courseBatchDetails: action.payload };
      break;
    case FETCH_COURSE_BATCH_DETAILS_FAILURE:
      state = { ...state, loading: false };
      break;

    /**
*Assign course batch to student
*/

    case ASSIGN_COURSE_BATCH_TO_STUDENT:
      state = { ...state, loading: true };
      break;
    case ASSIGN_COURSE_BATCH_TO_STUDENT_SUCCESS:
      state = { ...state };
      break;
    case ASSIGN_COURSE_BATCH_TO_STUDENT_FAILURE:
      state = { ...state, loading: false };
      break;

    /**
*Get batch students
*/

    case FETCH_BATCH_STUDENT:
      state = {
        ...state,
        numOfPages: 0,
        currentPage: 1,
        batchStudentListData: []
      };
      break;
    case FETCH_BATCH_STUDENT_SUCCESS:
      const dataSet = action.payload
      state = {
        ...state,
        batchStudentListData: dataSet.data,
        numOfPages: dataSet.num_pages,
        currentPage:
          dataSet.next_page === -1
            ? dataSet.num_pages
            : dataSet.next_page - 1,
      };
      break;
    case FETCH_BATCH_STUDENT_FAILURE:
      state = { ...state, loading: false };
      break;


    /**
   *Get course batch added students
   */

    case FETCH_COURSE_BATCH_ADDED_STUDENTS:
      state = {
        ...state,
        numOfPages2: 0,
        currentPage2: 1,
        courseBatchAddedStudentsList: []
      };
      break;
    case FETCH_COURSE_BATCH_ADDED_STUDENTS_SUCCESS:

      state = {
        ...state,
        courseBatchAddedStudentsList: action.payload.data,
        numOfPages2: action.payload.num_pages,
        currentPage2:
          action.payload.next_page === -1
            ? action.payload.num_pages
            : action.payload.next_page - 1,
      };
      break;
    case FETCH_COURSE_BATCH_ADDED_STUDENTS_FAILURE:
      state = { ...state, loading: false };
      break;



    /**
*Assign course batch to student
*/

    case POST_BATCH_VIDEO_CALL_USERS:
      state = { ...state, loading: true };
      break;
    case POST_BATCH_VIDEO_CALL_USERS_SUCCESS:
      state = { ...state, courseBatchDetails: action.payload };
      break;
    case POST_BATCH_VIDEO_CALL_USERS_FAILURE:
      state = { ...state, loading: false };
      break;



    //setting is open task type modal

    case IS_OPEN_TASK_TYPE_MODAL:
      console.log("action.payload ", action.payload);

      state = { ...state, isOpenTaskTypeModal: action.payload };
      break;

    //Setting selected linkedin community item

    case SELECTED_LINKEDIN_COMMUNITY_ITEM:
      console.log("action.payload ", action.payload);

      state = { ...state, linkedInCommunityItem: action.payload };
      break;

    //Setting page task title

    case PAGE_TASK_TITLE:
      console.log("action.payload pagetasjtitle", action.payload);

      state = { ...state, pageTaskTitle: action.payload };
      break;

    //Setting minimum spent minutes

    case SETTING_MINIMUM_SPEND_MINUTES:
      state = { ...state, minumumSpentMinutes: action.payload };
      break;

    //Setting Task Page And Meta Id

    case SETTING_TASK_PAGE_AND_META_ID:
      console.log("action.payload pagetasjtitle", action.payload);

      state = { ...state, taskPageAndMetaId: action.payload };
      break;

    //get pages
    case FETCH_GET_PAGES:
      state = { ...state, loading: true };
      break;
    case FETCH_GET_PAGES_SUCCESS:
      state = { ...state, pageList: action.payload };
      break;
    case FETCH_GET_PAGES_FAILURE:
      state = { ...state, loading: false };
      break;

    //Setting Task meta Id

    case SETTING_TASK_META_ID:
      console.log("actionmetaaaa==>", action.payload)
      state = { ...state, pageTaskMetaId: action.payload };
      break;

    //Setting Task page Id

    case SETTING_TASK_PAGE_ID:
      state = { ...state, taskPageId: action.payload };
      break;

    //add Batch Completion Event
    case POST_ADD_BATCH_COMPLETION_EVENT:
      state = { ...state, loading: true };
      break;
    case POST_ADD_BATCH_COMPLETION_EVENT_SUCCESS:
      state = { ...state };
      break;
    case POST_ADD_BATCH_COMPLETION_EVENT_FAILURE:
      state = { ...state, loading: false };
      break;

    //get Batch Completion Event
    case FETCH_GET_BATCH_COMPLETION_EVENT:
      state = {
        ...state,
        numOfPages: 0,
        currentPage: 1,
        batchCompletionEvents: []
      };
      break;
    case FETCH_GET_BATCH_COMPLETION_EVENT_SUCCESS:
      const dataSet2 = action.payload
      state = {
        ...state,
        batchCompletionEvents: dataSet2.data,
        numOfPages: dataSet2.num_pages,
        currentPage:
          dataSet2.next_page === -1
            ? dataSet2.num_pages
            : dataSet2.next_page - 1,
      };
      break;
    case FETCH_GET_BATCH_COMPLETION_EVENT_FAILURE:
      state = { ...state, loading: false };
      break;


    //Setting selected  community item

    case SELECTED_COMMUNITY_ITEM:
      console.log("action.payload ", action.payload);

      state = { ...state, communityItem: action.payload };
      break;


    // add page section
    case POST_PAGE_SECTION:
      state = { ...state, loading: true };
      break;
    case POST_PAGE_SECTION_SUCCESS:
      state = { ...state };
      break;
    case POST_PAGE_SECTION_FAILURE:
      state = { ...state, loading: false };
      break;


    // userOnline activity status
    case POST_UPDATE_USER_ONLINE_ACTIVITY_LOG:
      state = { ...state, loading: true };
      break;
    case POST_UPDATE_USER_ONLINE_ACTIVITY_LOG_SUCCESS:
      state = { ...state };
      break;
    case POST_UPDATE_USER_ONLINE_ACTIVITY_LOG_FAILURE:
      state = { ...state, loading: false };
      break;


    //............................................................................................................................................
    /**
     * Student
     */

    /**
 * get student course
 */

    case FETCH_STUDENT_COURSES:
      state = { ...state, loading: true };
      break;
    case FETCH_STUDENT_COURSES_SUCCESS:
      state = { ...state, studentCourses: action.payload };
      break;
    case FETCH_STUDENT_COURSES_FAILURE:
      state = { ...state, loading: false };
      break;





    /**
    * get student course section
    */

    case FETCH_STUDENT_COURSE_SECTION:
      state = { ...state, loading: true };
      break;
    case FETCH_STUDENT_COURSE_SECTION_SUCCESS:
      state = { ...state, studentCourseSection: action.payload };
      break;
    case FETCH_STUDENT_COURSE_SECTION_FAILURE:
      state = { ...state, loading: false };
      break;


    /**
* get batch video call user
*/

    case FETCH_BATCH_VIDEO_CALL_USERS:
      state = { ...state, loading: true };
      break;
    case FETCH_BATCH_VIDEO_CALL_USERS_SUCCESS:
      state = { ...state, usersVideoCallDetails: action.payload };
      break;
    case FETCH_BATCH_VIDEO_CALL_USERS_FAILURE:
      state = { ...state, loading: false };
      break;


    /**
* get token for video call
*/

    case FETCH_TOKEN_BY_USER:
      state = { ...state, loading: true };
      break;
    case FETCH_TOKEN_BY_USER_SUCCESS:
      state = { ...state, userToken: action.payload };
      break;
    case FETCH_TOKEN_BY_USER_FAILURE:
      state = { ...state, loading: false };
      break;

    /**
     * edit schedule meeting details
     */

    case EDIT_SCHEDULE_MEETING_DETAILS:
      state = { ...state, scheduleMeetingDetails: action.payload };
      break;


    /**
 * get student course topics
 */

    case FETCH_STUDENT_COURSE_TOPICS:
      state = { ...state, loading: true };
      break;
    case FETCH_STUDENT_COURSE_TOPICS_SUCCESS:
      state = { ...state, studentCourseTopics: action.payload };
      break;
    case FETCH_STUDENT_COURSE_TOPICS_FAILURE:
      state = { ...state, loading: false };
      break;

    /**
    * fetch student course tasks
    */
    case FETCH_STUDENT_COURSE_TASKS:
      state = { ...state, loading: true };
      break;
    case FETCH_STUDENT_COURSE_TASKS_SUCCESS:
      state = { ...state, loading: false, studentCourseTasks: action.payload };
      break;
    case FETCH_STUDENT_COURSE_TASKS_FAILURE:
      state = { ...state, loading: false };
      break;


    /**
    * fetch student course tasks details
    */
    case FETCH_STUDENT_COURSE_TASKS_DETAILS:
      state = { ...state, loading: true };
      break;
    case FETCH_STUDENT_COURSE_TASKS_DETAILS_SUCCESS:
      state = { ...state, loading: false, studentCourseTasksDetails: action.payload };
      break;
    case FETCH_STUDENT_COURSE_TASKS_DETAILS_FAILURE:
      state = { ...state, loading: false };
      break;

    /**
   * setting default course
   */
    case SETTING_DEFAULT_COURSE:
      state = { ...state, defaultCourse: action.payload };
      break;

    //get all branch list

    case FETCH_ALL_BRANCHES_LIST:
      state = { ...state, loading: true };
      break;

    case FETCH_ALL_BRANCHES_LIST_SUCCESS:
      state = {
        ...state,
        loading: false,
        branchesDropdownData: action.payload,
      };
      break;

    case FETCH_ALL_BRANCHES_LIST_FAILURE:
      state = {
        ...state,
        error: action.payload,
        loading: false,
      };
      break;
    /**
     * 
     */

    case GET_TASK_DETAILS:
      state = { ...state, getStudentTaskDetails: action.payload };
      break;


    /**
    * Add student course tasks details
    */
    case POST_STUDENT_COURSE_TASK_DETAILS:
      state = { ...state, loading: true };
      break;
    case POST_STUDENT_COURSE_TASK_DETAILS_SUCCESS:
      state = { ...state, loading: false, addStudentCourseTaskDetails: action.payload };
      break;
    case POST_STUDENT_COURSE_TASK_DETAILS_FAILURE:
      state = { ...state, loading: false };
      break;

    /**
     * add student course task response id
     */
    case ADD_STUDENT_COURSE_TASK_RESPONSE_ID:
      state = { ...state, addStudentTaskResponseId: action.payload };
      break;

    /**
    * setting student written question
    */
    case STUDENT_WRITTEN_QUESTION:
      state = { ...state, studentWrittenQuestion: action.payload };
      break;

    /**
     * setting student procedure data
     */
    case STUDENT_PROCEDURE_DATA:
      state = { ...state, studentProcedureData: action.payload };
      break;

    /**
   * setting student flowdiagram data
   */
    case STUDENT_FLOW_DIAGRAM:
      state = { ...state, studentFlowDiagramData: action.payload };
      break;


    /**
   * setting student flowdiagram image
   */
    case STUDENT_FLOW_DIAGRAM_IMAGE:
      state = { ...state, studentFlowDiagramImage: action.payload };
      break;

    /**
* setting student flowdiagram data
*/
    case STUDENT_PROGRAM_DATA:
      state = { ...state, studentProgramData: action.payload };
      break;

    /**
     * setting student current course section
     */
    case STUDENT_CURRENT_COURSE_SECTION:
      state = { ...state, studentCurrentCourseSection: action.payload };
      break;

    /**
  * setting student program output data
  */
    case IS_EXPAND_CODE_EDITOR:
      state = { ...state, isExpandCodeEditor: action.payload };
      break;

    /**
* is active section 
*/
    case IS_ACTIVE_SECTION:
      state = { ...state, isActiveSection: action.payload };
      break;



    /**
   * get student Page section
   */

    case FETCH_STUDENT_PAGE_SECTIONS:
      state = { ...state, loading: true };
      break;
    case FETCH_STUDENT_PAGE_SECTIONS_SUCCESS:
      state = { ...state, studentPageSections: action.payload };
      break;
    case FETCH_STUDENT_PAGE_SECTIONS_FAILURE:
      state = { ...state, loading: false };
      break;

    /**
* get student Section Type Title
*/

    case FETCH_STUDENT_SECTION_TYPE_TITLE:
      state = { ...state, loading: true };
      break;
    case FETCH_STUDENT_SECTION_TYPE_TITLE_SUCCESS:
      state = { ...state, studentSectionTitle: action.payload };
      break;
    case FETCH_STUDENT_SECTION_TYPE_TITLE_FAILURE:
      state = { ...state, loading: false };
      break;

    /**
* get student Section Type Image
*/

    case FETCH_STUDENT_SECTION_TYPE_IMAGE:
      state = { ...state, loading: true };
      break;
    case FETCH_STUDENT_SECTION_TYPE_IMAGE_SUCCESS:
      state = { ...state, studentSectionImage: action.payload };
      break;
    case FETCH_STUDENT_SECTION_TYPE_IMAGE_FAILURE:
      state = { ...state, loading: false };
      break;

    /**
* get student Section Type Video
*/

    case FETCH_STUDENT_SECTION_TYPE_VIDEO:
      state = { ...state, loading: true };
      break;
    case FETCH_STUDENT_SECTION_TYPE_VIDEO_SUCCESS:
      state = { ...state, studentSectionVideo: action.payload };
      break;
    case FETCH_STUDENT_SECTION_TYPE_VIDEO_FAILURE:
      state = { ...state, loading: false };
      break;

    /**
* get student Section Type Paragraph
*/

    case FETCH_STUDENT_SECTION_TYPE_PARAGRAPH:
      state = { ...state, loading: true };
      break;
    case FETCH_STUDENT_SECTION_TYPE_PARAGRAPH_SUCCESS:
      state = { ...state, studentSectionParagraph: action.payload };
      break;
    case FETCH_STUDENT_SECTION_TYPE_PARAGRAPH_FAILURE:
      state = { ...state, loading: false };
      break;

    /**
* get student Section Type List
*/

    case FETCH_STUDENT_SECTION_TYPE_LIST:
      state = { ...state, loading: true };
      break;
    case FETCH_STUDENT_SECTION_TYPE_LIST_SUCCESS:
      state = { ...state, studentSectionList: action.payload };
      break;
    case FETCH_STUDENT_SECTION_TYPE_LIST_FAILURE:
      state = { ...state, loading: false };
      break;

    /**
    * get student Section Type Md
    */

    case FETCH_STUDENT_SECTION_TYPE_MD:
      state = { ...state, loading: true };
      break;
    case FETCH_STUDENT_SECTION_TYPE_MD_SUCCESS:
      state = { ...state, studentSectionMd: action.payload };
      break;
    case FETCH_STUDENT_SECTION_TYPE_MD_FAILURE:
      state = { ...state, loading: false };
      break;

    /**
    * get student Tasks Timeline
    */

    case FETCH_STUDENT_TASKS_TIMELINE:
      state = {
        ...state,
        numOfPages: 0,
        currentPage: 1,
        studentTasksTimeLine: []
      };
      break;
    case FETCH_STUDENT_TASKS_TIMELINE_SUCCESS:
      console.log("action.payload.data", action.payload.data)
      state = {
        ...state,
        studentTasksTimeLine: action.payload.data,
        numOfPages: action.payload.num_pages,
        currentPage:
          action.payload.next_page === -1
            ? action.payload.num_pages
            : action.payload.next_page - 1,
      };
      break;
    case FETCH_STUDENT_TASKS_TIMELINE_FAILURE:
      state = { ...state, loading: false };
      break;

    /**
 * Student CODE submission
 */

    case STUDENT_CODE_SUBMISSION:
      state = { ...state, loading: true };
      break;
    case STUDENT_CODE_SUBMISSION_SUCCESS:
      state = { ...state, studentCodeOutput: action.payload };
      break;
    case STUDENT_CODE_SUBMISSION_FAILURE:
      state = { ...state, loading: false };
      break;

    /**
     * add task by student
     */

    case POST_TASK_BY_STUDENT:
      state = { ...state, loading: true };
      break;
    case POST_TASK_BY_STUDENT_SUCCESS:
      state = { ...state, taskByStudent: action.payload };
      break;
    case POST_TASK_BY_STUDENT_FAILURE:
      state = { ...state, loading: false };
      break;

    //task type dropdown select

    case TASK_TYPE:
      state = { ...state, taskType: action.payload };
      break;

    /**
     * get student tasks details open TOGGLE_SIDE_NAV_OPEN
     */

    case FETCH_STUDENT_TASKS_DETAILS_OPEN:
      state = { ...state, loading: true };
      break;
    case FETCH_STUDENT_TASKS_DETAILS_OPEN_SUCCESS:
      state = { ...state, viewTaskDetails: action.payload };
      break;
    case FETCH_STUDENT_TASKS_DETAILS_OPEN_FAILURE:
      state = { ...state, loading: false };
      break;

    case COURSE_IDE_TYPE:
      state = { ...state, courseIde: action.payload };
      break;

    //toggle sidenav open
    case TOGGLE_SIDE_NAV_OPEN:
      state = { ...state, sideNavOpen: action.payload };
      break;


    //Setting student section data with an extra key
    case STUDENT_COURSE_SECTION_DATA_LIST:
      state = { ...state, studentSectionDataListModified: action.payload };
      break;


    //get message events
    case GET_MESSAGE_EVENTS:
      state = { ...state, MessageEvents: action.payload };
      break;

    /**
 * GROUP CHATS
 */

    case POST_BATCH_CHAT:
      state = { ...state, loading: true };
      break;
    case POST_BATCH_CHAT_SUCCESS:
      state = { ...state, addBatchGroupChat: action.payload };
      break;
    case POST_BATCH_CHAT_FAILURE:
      state = { ...state, loading: false };
      break;


    //GET BATCH CHATS


    case FETCH_BATCH_CHAT:
      state = { ...state, loading: true };
      break;
    case FETCH_BATCH_CHAT_SUCCESS:
      state = { ...state, batchGroupChatDetails: action.payload };
      break;
    case FETCH_BATCH_CHAT_FAILURE:
      state = { ...state, loading: false };
      break;


    //GET BATCH user online activity log


    case FETCH_BATCH_USER_ONLINE_ACTIVITY_LOG:
      state = { ...state, loading: true };
      break;
    case FETCH_BATCH_USER_ONLINE_ACTIVITY_LOG_SUCCESS:
      state = { ...state, batchUserActivityLogDetails: action.payload };
      break;
    case FETCH_BATCH_USER_ONLINE_ACTIVITY_LOG_FAILURE:
      state = { ...state, loading: false };
      break;

    default:
      state = state;
      break;
  }
  return state;
};
export default DashboardReducer;