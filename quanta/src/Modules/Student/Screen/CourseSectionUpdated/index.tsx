import { icons } from "@Assets";
import { Card, CommonTable, NoRecordsFound, Image, Modal, Button, Pagination, Badge, DatePicker, DateTimePicker } from '@Components'
import { DynamicHeight, useLoader, useModal, useNavigation } from '@Hooks';
import { translate } from '@I18n';
import {
  AdminNavbar, StudentProgressTrackCard, TimeLine, CardStatus, TaskStatusCard, ProfilePicture, ProfileCard, UserProfileDetails, ScheduledMeetingList, StudentSessions, GetStudentVideoScreeningTaskCard, GetStudentPageTaskCard,
  GetStudentLinkedInCommunityTaskCard, GetStudentCommunityTaskCard, GetStudentMockInterviewTaskCard, GetStudentSoftwareScreeningTaskCard, GetStudentScreeningScheduleVariantTaskCard, GetStudentSoftwareScreeningScheduleVariantTaskCard, GetStudentSoftwareDevelopmentTodayAccomplishmentTaskCard, GetStudentMockInterviewTodayAccomplishmentTaskCard
} from "@Modules";
import { fetchDashboardDetails, fetchStudentCourseSection, fetchStudentCourseTopics, fetchStudentTasksTimeline, isBackNavigation, postGenericCrudDetails, settingCourseTopicName, settingStudentCurrentCourseSection, settingStudentSectionDataWithExtraKey } from '@Redux';
import { ROUTES } from "@Routes";
import { convertTimeToDisplayTimeFormat } from "@Utils";
import classnames from "classnames";
import moment from "moment";
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { Nav, NavItem, NavLink, Progress } from "reactstrap";
import { GetStudentSoftwareDevelopmentTaskCard } from "@Modules";
import { Calendar } from "@Components";
import { palette } from "@Themes";
import { placeholder } from "i18n-js";

let date = moment().format("YYYY-MM-DD")

let CURRENT_TASK = [
  { id: 1, type: 'SWD', name: 'Datatypes and variables', topic: '', description: 'Values/Numbers', status: 'Yet To Start', totalTasks: '6', completedTasks: '4', timeDuration: '', is_manditory: false },
  { id: 2, type: 'VDO', name: 'Title', topic: 'Description', description: 'Values/Numbers', status: 'Yet To Start', totalTasks: '6', completedTasks: '4', timeDuration: '15 Mins', is_manditory: true },
  { id: 3, type: 'MI', name: 'Mock Interview', topic: 'Description', description: 'Values/Numbers', status: 'Yet To Start', totalTasks: '6', completedTasks: '5', timeDuration: '15 Mins', is_manditory: false },
]

let COMPLETED_TASKS = [
  { id: 1, type: 'PGE', name: 'Title', topic: 'Description', description: 'Values/Numbers', status: 'Yet To Start', totalTasks: '6', completedTasks: '5', timeDuration: '15 Mins', is_manditory: true, is_completed: true },
]

let SCHEDULED_TASKS = [
  { id: 1, type: 'SS', name: 'Title', topic: 'Description', description: 'Values/Numbers', status: 'Yet To Start', totalTasks: '6', completedTasks: '5', timeDuration: '15 Mins', is_manditory: true, is_todays_task: true },

]

let TODAYS_TASK = [
  { id: 1, type: 'SDTA', name: 'Datatypes and variables', topic: '', description: 'Values/Numbers', is_todays_task: true },
  { id: 3, type: 'MITA', name: 'Mock Interview', topic: 'Description', description: 'Values/Numbers', is_todays_task: true },
]

function CourseSection({ navigation }: any) {

  const { goTo } = useNavigation()
  const dispatch = useDispatch();
  const modal = useModal(false)
  const dynamicHeight: any = DynamicHeight()
  const [selectedNav, setSelectedNav] = useState<any>(1)


  const { currentCourse, studentCourseTopics, studentCourseSection, dashboardDetails, studentCurrentCourseSection, studentSectionDataListModified, isBack, studentTasksTimeLine, currentPage, numOfPages } = useSelector(
    (state: any) => state.DashboardReducer
  );

  // console.log("studentTasksTimeLine==>",studentTaskTimeLine)
  const [courseTopicsParentData, setCourseTopicsParentData] = useState<any>()
  const [courseTopicsParentChildData, setCourseTopicsParentChildData] = useState<any>()
  const [tableTitle, setTableTitle] = useState<any>()
  const [modalTitle, setModalTitle] = useState('')
  const courseLoader = useLoader(false);
  const ProgressTrackCardLoader = useLoader(false)
  const courseTopicLoader = useLoader(false)
  const [completedTopicCount, setCompletedTopicCount] = useState(0)
  const [showCalendar, setShowCalendar] = useState(false)
  const [date, setDate] = useState<any>(new Date())
  const [monthYear, setMonthYear] = useState<any>()
  const [currentDay, setCurrentDay] = useState<any>()
  const [previousDay, setPreviousDay] = useState<any>()


  useEffect(() => {
    const today = new Date().toLocaleString('en-US');
    // console.log("tody==>", today)
    displayDateHandler(today)
  }, [])

  const getNormalizedTaskMetaTypeCard = (item, index) => {
    const type = item?.type

    switch (type) {
      case "SWD":

        return <GetStudentSoftwareDevelopmentTaskCard
          data={item}
        />

      case "VDO":

        return <GetStudentVideoScreeningTaskCard
          data={item}
          buttonOnClick={() => {
            // dispatch(getTaskDetails([item]))
            // goTo(ROUTES.HOME.STUDENT_PAGE_TASK)
          }}
          disabled={false}
        />

      case "PGE":
        return < GetStudentPageTaskCard
          data={item}
          buttonOnClick={() => {
            // dispatch(getTaskDetails([item]))
            // goTo(ROUTES.HOME.STUDENT_PAGE_TASK)
          }}
          disabled={false}
        />
      case "LC":

        return <GetStudentLinkedInCommunityTaskCard
          data={item}
          buttonOnClick={() => {
            // dispatch(getTaskDetails([item]))
            // goTo(ROUTES.HOME.LINKEDIN_COMMUNITY)
          }}
          disabled={false}
        />

      case "COM":

        return <GetStudentCommunityTaskCard
          data={item}
          buttonOnClick={() => {
            // dispatch(getTaskDetails([item]))
            // goTo(ROUTES.HOME.STUDENT_COMMUNITY)
          }}
          disabled={false}
        />

      case "MI":
        return <GetStudentMockInterviewTaskCard
          data={item}
          buttonOnClick={() => {
            // dispatch(getTaskDetails(item))
            // if (item?.task_meta?.student_course_task?.is_scheduled && item?.task_meta?.student_course_task?.is_completed === false) {
            //   setSelectedItem(item)
            //   getTokenByUser()
          }}
        />
      case "AI":
        return <GetStudentSoftwareScreeningTaskCard
          data={item}
          buttonOnClick={() => { }}
        />
      case "SCR":
        return <GetStudentSoftwareScreeningTaskCard
          data={item}
          buttonOnClick={() => {
            // dispatch(getTaskDetails(item))
            // if (item?.task_meta?.student_course_task?.is_scheduled && item?.task_meta?.student_course_task?.is_completed === false) {
            //   setSelectedItem(item)
            //   getTokenByUser()
            // }
            // else if ((!item?.task_meta?.student_course_task || item?.task_meta?.student_course_task.is_requested === false) && item?.task_meta?.is_completed === false) {
            //   setSelectedItem(item)
            //   setIsRequestModal(!isRequestModal)
            // }


          }}
        />

      case "SS":
        return <GetStudentSoftwareScreeningScheduleVariantTaskCard
          data={item}
          buttonOnClick={() => {
            // dispatch(getTaskDetails(item))
            // if (item?.task_meta?.student_course_task?.is_scheduled && item?.task_meta?.student_course_task?.is_completed === false) {
            //   setSelectedItem(item)
            //   getTokenByUser()
            // }
            // else if ((!item?.task_meta?.student_course_task || item?.task_meta?.student_course_task.is_requested === false) && item?.task_meta?.is_completed === false) {
            //   setSelectedItem(item)
            //   setIsRequestModal(!isRequestModal)
            // }


          }}
        />

      case "MITA":
        return <GetStudentMockInterviewTodayAccomplishmentTaskCard
          data={item}
          buttonOnClick={() => {
            // dispatch(getTaskDetails(item))
            // if (item?.task_meta?.student_course_task?.is_scheduled && item?.task_meta?.student_course_task?.is_completed === false) {
            //   setSelectedItem(item)
            //   getTokenByUser()
            // }
            // else if ((!item?.task_meta?.student_course_task || item?.task_meta?.student_course_task.is_requested === false) && item?.task_meta?.is_completed === false) {
            //   setSelectedItem(item)
            //   setIsRequestModal(!isRequestModal)
            // }


          }}
        />

      case "SDTA":
        return <GetStudentSoftwareDevelopmentTodayAccomplishmentTaskCard
          data={item}
          buttonOnClick={() => {
            // dispatch(getTaskDetails(item))
            // if (item?.task_meta?.student_course_task?.is_scheduled && item?.task_meta?.student_course_task?.is_completed === false) {
            //   setSelectedItem(item)
            //   getTokenByUser()
            // }
            // else if ((!item?.task_meta?.student_course_task || item?.task_meta?.student_course_task.is_requested === false) && item?.task_meta?.is_completed === false) {
            //   setSelectedItem(item)
            //   setIsRequestModal(!isRequestModal)
            // }


          }}
        />


      default:
    }
  }



  // display date function

  const displayDateHandler = (value: any) => {
    const date = new Date(value);
    console.log("datee==>", date)
    const monthYearOptions: any = { month: 'short', year: 'numeric' };
    const formattedMonthYear = date.toLocaleDateString('en-US', monthYearOptions);
    console.log("fooo==>", formattedMonthYear)
    setMonthYear(formattedMonthYear)

    const dayOptions: any = { day: 'numeric' }
    const formattedDay: any = date.toLocaleDateString('en-US', dayOptions);
    console.log(formattedDay, formattedDay - 1)
    setCurrentDay(formattedDay)
    setPreviousDay(formattedDay - 1)
    setDate(value)
    setShowCalendar(false)
  }

  // decrease date function

  const handleReduceDate = () => {
    const newDate = new Date(date);
    newDate.setDate(newDate.getDate() - 1);
    displayDateHandler(newDate)
    setDate(newDate);
  };

  const handleIncreaseDate = () => {
    const newDate = new Date(date);
    newDate.setDate(newDate.getDate() + 1);
    displayDateHandler(newDate)
    setDate(newDate);
  };

  return (
    <>

      <div className="pb-3 zoom">
        <AdminNavbar userName={dashboardDetails?.user_details?.name} userProfile={dashboardDetails?.user_details?.photo} isBack={true} isShowToggle />
      </div>


      <div className="container-fluid zoom" >
        <div className='row'>

          <div className="col-sm-8 p-0 m-0">
            <div>
              <h4 className="col">{'Current Task'}</h4>
            </div>

            <div className="overflow-auto scroll-hidden mt--3">

              <div className='pt-4'>
                {CURRENT_TASK && CURRENT_TASK?.length > 0 && CURRENT_TASK.map((el, index) => {
                  return (
                    <>
                      {getNormalizedTaskMetaTypeCard(el, index)}
                    </>
                  )
                })}
              </div>

              <div className="row align-items-center justify-content-around pt-2">

                <div className="">
                  <Badge
                    className="pointer btn-primaryBlue"
                    text={'Completed Task'}
                    color={'primary'}
                    size="md"
                    style={{ fontSize: 12, }}
                  />
                </div>

                <div className="">
                  <Badge
                    className="pointer btn-secondaryGrey"
                    text={'Next Task'}
                    // color={'dark'} //#D9D9D9
                    size="md"
                    style={{ fontSize: 12 }}
                  />
                </div>
              </div>

              <div className="mt-3">
                {COMPLETED_TASKS && COMPLETED_TASKS.length > 0 && COMPLETED_TASKS.map((task, index) => {
                  return (
                    <>
                      {getNormalizedTaskMetaTypeCard(task, index)}
                    </>
                  )
                })}
              </div>
            </div>
            <div className="d-flex justify-content-end pr-4 pointer">
              <h4>{'View All'}</h4>
            </div>

          </div>

          <div className="col-sm-4">

            <div className="justify-content-end d-flex" style={{ marginRight: 80 }}>
              <h4 className="">{'ACTIVITIES'}</h4>
            </div>
            <Card className="mt-2" style={{ borderRadius: '15px', boxShadow: '2px 2px 2px 2px rgba(0.1, 0.1, 0.1, 0.1)' }}>
              <div className="row justify-content-between">
                {/* <div className="col-sm-8" style={{ display: 'flex', marginTop: -80, marginLeft: -31 }}> */}
                <div className="col-sm-8 d-flex top--6 m-0 p-0 ml--2">
                  <Image
                    alt="..."
                    height={175}
                    src={icons.calendarAmigo}
                  />
                </div>
                <div className="mr-3" style={{ marginTop: 45, }}>
                  <span className="" style={{ fontWeight: 'normal', fontSize: 12, color: palette.primaryColor }} >{'Schedules'}</span>
                </div>
                {/* </div> */}
              </div>

              {/**screening card */}
              <div className="">
                <div style={{ marginTop: -100 }}>
                  {SCHEDULED_TASKS && SCHEDULED_TASKS.length > 0 && SCHEDULED_TASKS.map((item, index) => {
                    return <>
                      {getNormalizedTaskMetaTypeCard(item, index)}
                    </>
                  })
                  }
                </div>
              </div>

              <div className="mb--3">
                <div className="">

                  <Calendar
                    title={`Today's Accomplishment`}
                    isOpen={showCalendar}
                    initialDate={new Date()}
                    onChange={(value) => {
                      displayDateHandler(value._d)
                    }}
                    isValidDate={true}
                    onClickCalendarDropdown={() => setShowCalendar(!showCalendar)}
                    calendarData={{ monthYear, currentDay, previousDay }}
                    handleReduceDate={handleReduceDate}
                    handleIncreaseDate={handleIncreaseDate}
                    date = {date}
                  />

                </div>
                <div>
                  {TODAYS_TASK && TODAYS_TASK.length > 0 && TODAYS_TASK.map((item, index) => {
                    return <>
                      {getNormalizedTaskMetaTypeCard(item, index)}
                    </>
                  })}
                </div>

              </div>
              <div className="d-flex justify-content-end " style={{ marginRight: -17, marginBottom: -35 }}>
                <Image
                  height={173}
                  src={icons.startUpLife}
                />
              </div>
            </Card>
          </div>


        </div>
      </div >
    </>

  );
}

export { CourseSection };

