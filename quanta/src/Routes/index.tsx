import { useNavigate } from "react-router-dom";
import {
  Splash,
  Login,
  Otp,
  Landing,
  Question,
  Procedure,
  CodeEditor,
  CourseSection,
  TopicSection,
  FlowDiagram,
  AdminCourseSection,
  QuestionCreation,
  RegisteredStudents,
  RegisterUser,
  AdminTopicSection,
  Settings,
  RegisteredFaculties,
  RegisterFaculty,
  AddCourse,
  AnonymousComplaint,
  PendingApprovals,
  ViewStudentTaskDetails,
  StudentDashboard,
  ManageCourses,
  AdminPage,
  AddBlog,
  StudentPage,
  AddRemark,
  AdminRemark,
  SuperAdminRemark,
  UserRemarkDetails,
  StudentQuestionCreation,
  GuestTaskSection,
  GuestUserRegistration,
  GuestQuestionCreation,
  GuestLanding,
  GuestFlowDiagram,
  GuestView,
  DownloadAsImage,
  StudentFlowDiagram,
  StudentView,
  Notifications,
  VideoConference,
  ScreenRecorder,
  BatchCreation,
  BatchGroupListing,
  AssignBatchToStudent,
  ViewStudentDetails,
  ViewFacultyDetails,
  ScheduleMeeting,
  BatchDetails,
  ScheduledMeetingList,
  StudentBatchList,
  VideoScreening,
  AddVideoTask,
  AddMockInterview,
  AddPageTask,
  AdminPageTask,
  AddLinkedInCommunity,
  AddSoftwareScreening,
  LinkedInCommunityGroupListing,
  LinkedInCommunity,
  StudentPageTask,
  StudentProfile,
  AddCommunity,
  CommunityGroupListing,
  Community,
  GroupChat
} from "@Modules"
import { translate } from "@I18n";




export const AUTH_PATH = {
  SPLASH: "/",
  LOGIN: "/login",
  OTP: "/otp",
  REGISTER: '/register',
  REGISTER_STUDENTS: "/register-student",
  REGISTER_FACULTY: "/register-faculty",
  GUEST_USER_REGISTRATION: '/user-registration',
  NOTIFICATIONS: '/notifications'
};

export const GUEST_PATH = {
  GUEST_TASK_SECTION: '/guest-task-section',
  GUEST_QUESTION_CREATION: '/guest-question-creation',
  GUEST_LANDING: '/guest-landing',
  GUEST_FLOW_DIAGRAM: '/guest-flow-diagram',
  GUEST_VIEW: '/programming/task',
  GUEST_DOWNLOAD_AS_IMAGE: '/guest-download-image'

}

export const ROUTES = {
  AUTH: {
    LOGIN: "/login",
    SPLASH: "/",
    OTP: "/otp",

  },
  HOME: {
    DASHBOARD: "/dashboard",
    CODE_EDITOR: "/codeEditor",
    QUESTION: "/question",
    PROCEDURE: "/procedure",
    LANDING: "/landing",
    FLOWDIAGRAM: "/flowDiagram",
    COURSE_SECTION: "/course-section",
    TOPIC_SECTION: "/topicSection",
    ADMIN_TOPIC_SECTION: "/adminTopicSection",
    USER_PROFILE: "/userProfile",
    ADMIN_COURSE_SECTION: "/adminCourseSection",
    QUESTION_CREATION: "/question-creation",
    REGISTERED_STUDENTS: "/registered-students",
    STUDENT_DASHBOARD: "/student-dashboard",
    STUDENT_PAGE: "/student-page",
    STUDENT_QUESTION_CREATION: '/student-question-creation',
    STUDENT_ANONYMOUS_COMPLAINT: '/anonymous-complaint',
    STUDENT_FLOW_DIAGRAM: '/student-flow-diagram',
    STUDENT_VIEW: '/programming/task',
    HTML_CODE_EDITOR: '/html-code-editor',
    VIDEO_SCREENING: '/video-screening',
    LINKEDIN_COMMUNITY: '/linkedIn-community',
    STUDENT_PAGE_TASK: '/student-page-task',
    STUDENT_PROFILE: '/student-profile',
    STUDENT_COMMUNITY: '/student-community'

  },

  ADMIN: {
    SETTINGS: "/settings",
    ASSIGN_COURSE_STUDENTS: "/assignCourse-students",
    REGISTERED_FACULTIES: "/registered-faculties",
    ADD_COURSE: "/add-course",
    ANONYMOUS_COMPLAINT: "/anonymous-complaint",
    PENDING_APPROVALS: "/pending-approvals",
    VIEW_STUDENT_TASK_DETAILS: "/view-student-task-details",
    ADMIN_COMMENT_SECTION: '/admin-comment-section',
    MANAGE_COURSES: '/manage-courses',
    ADMIN_PAGE: '/admin-page',
    ADD_BLOG: '/add-blog',
    ADD_REMARK: '/add-remark',
    ADMIN_REMARK: '/admin-remark',
    SUPER_ADMIN_REMARK: '/super-admin-remark',
    USER_REMARK_DETAILS: '/user-remark-details',
    ADMIN_NOTIFICATION: '/admin-notification',
    VIDEO_CALL: '/video-conference',
    SCREEN_RECORDER: '/screen-recorder',
    BATCH_CREATION: '/batch-creation',
    BATCH_GROUP_LISTING: '/batch-group-listing',
    ASSIGN_BATCH_TO_STUDENT: '/assign-batch-student',
    VIEW_STUDENT_DETAILS: '/view-student-details',
    VIEW_FACULTY_DETAILS: '/view-faculty-details',
    SCHEDULE_MEETING: '/schedule-meeting',
    BATCH_DETAILS: '/batch-details',
    SCHEDULED_MEETING_LIST: '/scheduled-meeting-list',
    STUDENT_BATCH_LIST: '/student-batch-list',
    ADD_VIDEO_TASK: 'add-video-task',
    ADD_MOCK_INTERVIEW: 'add-mock-interview',
    ADD_PAGE_TASK: 'add-page-task',
    ADMIN_PAGE_TASK: 'admin-page-task',
    ADD_LINKEDIN_COMMUNITY: 'add-linkedin-community',
    ADD_SOFTWARE_SCREENING: 'add-software-screening',
    LINKEDIN_COMMUNITY_GROUP_LISTING: 'linkedIn-community-listing',
    ADD_COMMUNITY: 'add-community',
    COMMUNITY_GROUP_LISTING: 'community-group-listing',
    GROUP_CHAT: '/group-chat'
  },
};


export const AUTH_ROUTES = [
  {
    key: 1,
    path: AUTH_PATH.SPLASH,
    component: <Splash />
  },
  {
    key: 2,
    path: AUTH_PATH.LOGIN,
    component: <Login />
  },
  {
    key: 3,
    path: AUTH_PATH.OTP,
    component: <Otp />
  },
  {
    key: 4,
    path: AUTH_PATH.GUEST_USER_REGISTRATION,
    component: <GuestUserRegistration />
  },
  {
    key: 5,
    path: AUTH_PATH.NOTIFICATIONS,
    component: <Notifications />
  },
];

export const GUEST_ROUTES = [
  {
    key: 1,
    path: GUEST_PATH.GUEST_TASK_SECTION,
    component: <GuestTaskSection />
  },
  {
    key: 2,
    path: GUEST_PATH.GUEST_QUESTION_CREATION,
    component: <GuestQuestionCreation />
  },
  {
    key: 3,
    path: GUEST_PATH.GUEST_LANDING,
    component: <GuestLanding />
  },
  {
    key: 4,
    path: GUEST_PATH.GUEST_FLOW_DIAGRAM,
    component: <GuestFlowDiagram />
  },
  {
    key: 5,
    path: GUEST_PATH.GUEST_VIEW,
    component: <GuestView />
  },
  {
    key: 6,
    path: GUEST_PATH.GUEST_DOWNLOAD_AS_IMAGE,
    component: <DownloadAsImage />
  },

]

export const STUDENT_ROUTES = [
  {
    key: 1,
    path: ROUTES.HOME.QUESTION,
    component: <Question />

  },
  {
    key: 2,
    path: ROUTES.HOME.PROCEDURE,
    component: <Procedure />
  },
  {
    key: 3,
    path: ROUTES.HOME.FLOWDIAGRAM,
    component: <FlowDiagram />
  },
  {
    key: 4,
    path: ROUTES.HOME.CODE_EDITOR,
    component: <CodeEditor />
  },
  {
    key: 5,
    path: ROUTES.HOME.LANDING,
    component: <Landing />
  },
  {
    key: 6,
    path: ROUTES.HOME.COURSE_SECTION,
    component: <CourseSection />
  },
  {
    key: 7,
    path: ROUTES.HOME.TOPIC_SECTION,
    component: <TopicSection />
  },
  {
    key: 8,
    path: ROUTES.HOME.STUDENT_DASHBOARD,
    component: <StudentDashboard />
  },
  {
    key: 9,
    path: ROUTES.HOME.STUDENT_PAGE,
    component: <StudentPage />
  },
  {
    key: 10,
    path: ROUTES.HOME.STUDENT_QUESTION_CREATION,
    component: <StudentQuestionCreation />
  },
  {
    key: 11,
    path: ROUTES.HOME.STUDENT_ANONYMOUS_COMPLAINT,
    component: <AnonymousComplaint zoom="zoom" />
  },
  {
    key: 12,
    path: ROUTES.HOME.STUDENT_FLOW_DIAGRAM,
    component: <StudentFlowDiagram />
  },
  {
    key: 13,
    path: ROUTES.HOME.STUDENT_VIEW,
    component: <StudentView />
  },
  {
    key: 14,
    path: ROUTES.ADMIN.VIDEO_CALL,
    component: <VideoConference />
  },
  {
    key: 15,
    path: ROUTES.HOME.VIDEO_SCREENING,
    component: <VideoScreening />
  },
  {
    key: 16,
    path: ROUTES.HOME.LINKEDIN_COMMUNITY,
    component: <LinkedInCommunity />
  },
  {
    key: 17,
    path: ROUTES.HOME.STUDENT_PROFILE,
    component: <StudentProfile />
  },
  {
    key: 18,
    path: ROUTES.HOME.STUDENT_PAGE_TASK,
    component: <StudentPageTask />
  },

  {
    key: 19,
    path: ROUTES.HOME.STUDENT_COMMUNITY,
    component: <Community />
  },
  // {
  //   key: 15,
  //   path: ROUTES.HOME.HTML_CODE_EDITOR,
  //   component: <HtmlCodeEditor />
  // },

]

export const DASHBOARD_ROUTES = [

  {
    key: 1,
    path: ROUTES.HOME.ADMIN_TOPIC_SECTION,
    component: <AdminTopicSection />
  },
  {
    key: 2,
    path: ROUTES.HOME.ADMIN_COURSE_SECTION,
    component: <AdminCourseSection />
  },
  {
    key: 3,
    path: ROUTES.HOME.QUESTION_CREATION,
    component: <QuestionCreation />
  },
  {
    key: 4,
    path: ROUTES.HOME.REGISTERED_STUDENTS,
    component: <RegisteredStudents />
  },
  {
    key: 5,
    path: ROUTES.ADMIN.SETTINGS,
    component: <Settings />
  },

  {
    key: 7,
    path: AUTH_PATH.REGISTER_STUDENTS,
    component: <RegisterUser />
  },
  {
    key: 8,
    path: ROUTES.ADMIN.REGISTERED_FACULTIES,
    component: <RegisteredFaculties />
  },
  {
    key: 9,
    path: AUTH_PATH.REGISTER_FACULTY,
    component: <RegisterFaculty />
  },
  {
    key: 10,
    path: ROUTES.ADMIN.ADD_COURSE,
    component: <AddCourse />
  },
  {
    key: 11,
    path: ROUTES.ADMIN.ANONYMOUS_COMPLAINT,
    component: <AnonymousComplaint />
  },
  {
    key: 12,
    path: ROUTES.ADMIN.PENDING_APPROVALS,
    component: <PendingApprovals />
  },
  {
    key: 13,
    path: ROUTES.ADMIN.VIEW_STUDENT_TASK_DETAILS,
    component: <ViewStudentTaskDetails />
  },
  {
    key: 15,
    path: ROUTES.ADMIN.MANAGE_COURSES,
    component: <ManageCourses />
  },
  {
    key: 16,
    path: ROUTES.ADMIN.ADMIN_PAGE,
    component: <AdminPage />
  },
  {
    key: 17,
    path: ROUTES.ADMIN.ADD_BLOG,
    component: <AddBlog />
  },
  {
    key: 18,
    path: ROUTES.ADMIN.ADD_REMARK,
    component: <AddRemark />
  },
  {
    key: 19,
    path: ROUTES.ADMIN.ADMIN_REMARK,
    component: <AdminRemark />
  },
  {
    key: 20,
    path: ROUTES.ADMIN.SUPER_ADMIN_REMARK,
    component: <SuperAdminRemark />
  },
  {
    key: 21,
    path: ROUTES.ADMIN.USER_REMARK_DETAILS,
    component: <UserRemarkDetails />
  },
  {
    key: 22,
    path: ROUTES.ADMIN.VIDEO_CALL,
    component: <VideoConference />
  },
  {
    key: 23,
    path: ROUTES.ADMIN.SCREEN_RECORDER,
    component: <ScreenRecorder />
  },
  {
    key: 24,
    path: AUTH_PATH.NOTIFICATIONS,
    component: <Notifications />
  },
  {
    key: 24,
    path: ROUTES.ADMIN.BATCH_CREATION,
    component: <BatchCreation />
  },
  {
    key: 25,
    path: ROUTES.ADMIN.BATCH_GROUP_LISTING,
    component: <BatchGroupListing />
  },
  {
    key: 26,
    path: ROUTES.ADMIN.ASSIGN_BATCH_TO_STUDENT,
    component: <AssignBatchToStudent />
  },
  {
    key: 27,
    path: ROUTES.ADMIN.VIEW_STUDENT_DETAILS,
    component: <ViewStudentDetails />
  },
  {
    key: 28,
    path: ROUTES.ADMIN.VIEW_FACULTY_DETAILS,
    component: <ViewFacultyDetails />
  },
  {
    key: 29,
    path: ROUTES.ADMIN.SCHEDULE_MEETING,
    component: <ScheduleMeeting />
  },
  {
    key: 30,
    path: ROUTES.ADMIN.BATCH_DETAILS,
    component: <BatchDetails />
  },
  {
    key: 31,
    path: ROUTES.ADMIN.SCHEDULED_MEETING_LIST,
    component: <ScheduledMeetingList />
  },
  {
    key: 32,
    path: ROUTES.ADMIN.STUDENT_BATCH_LIST,
    component: <StudentBatchList />
  },
  {
    key: 33,
    path: ROUTES.ADMIN.ADD_VIDEO_TASK,
    component: <AddVideoTask />
  },
  {
    key: 34,
    path: ROUTES.ADMIN.ADD_MOCK_INTERVIEW,
    component: <AddMockInterview />
  },
  {
    key: 35,
    path: ROUTES.ADMIN.ADD_PAGE_TASK,
    component: <AddPageTask />
  },
  {
    key: 36,
    path: ROUTES.ADMIN.ADMIN_PAGE_TASK,
    component: <AdminPageTask />
  },
  {
    key: 37,
    path: ROUTES.ADMIN.ADD_LINKEDIN_COMMUNITY,
    component: <AddLinkedInCommunity />
  },
  {
    key: 38,
    path: ROUTES.ADMIN.ADD_SOFTWARE_SCREENING,
    component: <AddSoftwareScreening />
  },
  {
    key: 39,
    path: ROUTES.ADMIN.LINKEDIN_COMMUNITY_GROUP_LISTING,
    component: <LinkedInCommunityGroupListing />
  },
  {
    key: 40,
    path: ROUTES.ADMIN.GROUP_CHAT,
    component: <GroupChat />
  },
  {
    key: 41,
    path: ROUTES.HOME.STUDENT_PROFILE,
    component: <StudentProfile />
  },
  {
    key: 42,
    path: ROUTES.ADMIN.ADD_COMMUNITY,
    component: <AddCommunity />
  },
  {
    key: 43,
    path: ROUTES.ADMIN.COMMUNITY_GROUP_LISTING,
    component: <CommunityGroupListing />
  },
];


export const ADMIN_ROUTES = [
  {
    path: "/manage-courses",
    name: translate('sideNav.courses'),
    icon: "ni ni-folder-17 ",
    component: <ManageCourses />,
    layout: "/dashboard",
  },
  {
    path: "/Pending-Approvals",
    name: translate("sideNav.pendingApprovals"),
    icon: "ni ni-collection",
    component: <PendingApprovals />,
    layout: "/dashboard",
  },
  // {
  //   id:1,
  //   collapse: true,
  //   name: "Courses",
  //   icon: "ni ni-ungroup text-orange",
  //   state: "dashboardsCollapses",
  //   views: [
  //     {
  //       id:1,
  //       path: "/add-course",
  //       name: "Add Course",
  //       miniName: "JS",
  //       component: <AddCourse />,
  //       layout: "/dashboard",
  //     },
  //     {
  //       id:2,
  //       path: "/assign-course-students",
  //       name: "Assign Course",
  //       miniName: "AC",
  //       component: <AssignCourseToStudents isCourseNotAssigned={true} />,
  //       layout: "/dashboard",

  //     },
  //   ],
  // },


  {
    path: "/registered-students",
    name: translate("sideNav.students"),
    icon: "bi bi-people-fill ",
    component: <RegisteredStudents />,
    layout: "/dashboard",
  },
  {
    path: "/registered-faculties",
    name: translate("sideNav.faculties"),
    icon: "ni ni-badge ",
    component: <RegisteredFaculties />,
    layout: "/dashboard",

  },
  {
    collapse: true,
    name: "Chats",
    icon: "bi bi-chat-dots-fill ",
    state: "dashboardsCollapses",
    views: [
      {
        id: 1,
        path: "/group-chat",
        name: "Group Chat DM",
        icon: "bi bi-chat-dots-fill ",
        component: <GroupChat />,
        layout: "/dashboard",

      },
      // {
      //   id: 2,
      //   path: "/assign-course-students",
      //   name: "Assign Course",
      //   miniName: "AC",
      //   component: <AssignCourseToStudents isCourseNotAssigned={true} />,
      //   layout: "/dashboard",

      // },
    ],
  },

  {
    path: "/anonymous-complaint",
    name: translate("sideNav.anonymousComplaints"),
    icon: "bi bi-ticket-detailed-fill",
    component: <AnonymousComplaint />,
    layout: "/dashboard",

  },
  {
    path: "/settings",
    name: translate("sideNav.settings"),
    icon: "ni ni-settings ",
    component: <Settings />,
    layout: "/dashboard",

  },


];

export const IS_SUPER_ADMIN_ROUTES = [
  {
    path: "/manage-courses",
    name: translate('sideNav.courses'),
    icon: "ni ni-folder-17",
    component: <ManageCourses />,
    layout: "/dashboard",
  },
  {
    path: "/Pending-Approvals",
    name: translate("sideNav.pendingApprovals"),
    icon: "ni ni-collection ",
    component: <PendingApprovals />,
    layout: "/dashboard",
  },
  {
    path: "/registered-students",
    name: translate("sideNav.students"),
    icon: "bi bi-people-fill ",
    component: <RegisteredStudents />,
    layout: "/dashboard",
  },
  {
    path: "/registered-faculties",
    name: translate("sideNav.faculties"),
    icon: "ni ni-badge ",
    component: <RegisteredFaculties />,
    layout: "/dashboard",

  },
  {
    collapse: true,
    name: "Chats",
    icon: "bi bi-chat-dots-fill ",
    state: "dashboardsCollapses",
    views: [
      {
        id: 1,
        path: "/group-chat",
        name: "Group Chat DM",
        icon: "bi bi-chat-dots-fill ",
        component: <GroupChat />,
        layout: "/dashboard",

      },
      // {
      //   id: 2,
      //   path: "/assign-course-students",
      //   name: "Assign Course",
      //   miniName: "AC",
      //   component: <AssignCourseToStudents isCourseNotAssigned={true} />,
      //   layout: "/dashboard",

      // },
    ],
  },

  // {
  //   path: "/batch-creation",
  //   name: translate("sideNav.batchCreation"),
  //   icon: "bi bi-ticket-detailed-fill ",
  //   component: <BatchCreation />,
  //   layout: "/dashboard",

  // },
  {
    path: "/anonymous-complaint",
    name: translate("sideNav.anonymousComplaints"),
    icon: "bi bi-ticket-detailed-fill ",
    component: <AnonymousComplaint />,
    layout: "/dashboard",

  },
  {
    path: "/super-admin-remark",
    name: translate("sideNav.remarks"),
    icon: "bi bi-bookmarks-fill ",
    component: <SuperAdminRemark />,
    layout: "/dashboard",

  },
  {
    path: "/settings",
    name: translate("sideNav.settings"),
    icon: "ni ni-settings ",
    component: <Settings />,
    layout: "/dashboard",

  },

];


export * from "./RequireAuth";
export * from "./RequireHome";
