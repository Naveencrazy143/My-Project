import { icons } from "@Assets";
import { Card, CommonTable, NoRecordsFound, Image, Modal, Button, Pagination } from '@Components'
import { DynamicHeight, useLoader, useModal, useNavigation } from '@Hooks';
import { translate } from '@I18n';
import { AdminNavbar, StudentProgressTrackCard, TimeLine, CardStatus, TaskStatusCard, ProfilePicture, ProfileCard, UserProfileDetails, ScheduledMeetingList, StudentSessions } from "@Modules";
import { fetchBatchVideoCallUsers, fetchDashboardDetails, fetchStudentCourseSection, fetchStudentCourseTopics, fetchStudentTasksTimeline, isBackNavigation, postGenericCrudDetails, settingCourseTopicName, settingStudentCurrentCourseSection, settingStudentSectionDataWithExtraKey } from '@Redux';
import { ROUTES } from "@Routes";
import moment from "moment";
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { Nav, NavItem, NavLink, Progress } from "reactstrap";

let date = moment().format("YYYY-MM-DD")

const data = [
  { id: 1, statusTitle: 'Previous task', totalTask: 10, completedTask: 20 }
]

const dataList = [
  { id: 1, heading: 'Previous task', subHeading: 'Variables', icons: 'ni ni-active-40', shareIcon: 'bi bi-share-fill pointer text-primary', viewIcon: 'bi bi-eye-fill pointer text-primary' },
  { id: 2, heading: 'Current task', subHeading: 'String', icons: 'ni ni-chart-pie-35', shareIcon: 'bi bi-share-fill pointer text-primary', viewIcon: 'bi bi-eye-fill pointer text-primary' },
  { id: 2, heading: 'next task', subHeading: 'Operators', icons: 'ni ni-money-coins', shareIcon: 'bi bi-share-fill pointer text-primary', viewIcon: 'bi bi-eye-fill pointer text-primary' }

]

const DROPDOWN_ITEM = [
  { id: 1, name: 'Start', image: 'bi bi-arrow-right-circle-fill' },
  { id: 2, name: 'Share', image: 'bi bi-share-fill' },
  { id: 3, name: 'View', image: 'bi bi-eye-fill' }
]

const LIST_ITEMS = [
  { id: 1, name: 'TASK', },
  { id: 2, name: 'SESSIONS', },
  // { id: 3, name: 'STUDENTS', },
  // { id: 1, text: 'MEETING', }
]

function CourseSection({ navigation }: any) {

  const { goTo } = useNavigation()
  const dispatch = useDispatch();
  const modal = useModal(false)
  const dynamicHeight: any = DynamicHeight()
  const [selectedNav, setSelectedNav] = useState<any>(1)


  const { currentCourse, studentCourseTopics, studentCourseSection, dashboardDetails, studentCurrentCourseSection, studentSectionDataListModified, isBack, usersVideoCallDetails } = useSelector(
    (state: any) => state.DashboardReducer
  );

  console.log("usersVideoCallDetails", usersVideoCallDetails);


  // console.log("studentTasksTimeLine==>",studentTaskTimeLine)
  const [courseTopicsParentData, setCourseTopicsParentData] = useState<any>()
  const [courseTopicsParentChildData, setCourseTopicsParentChildData] = useState<any>()
  const [tableTitle, setTableTitle] = useState<any>()
  const [modalTitle, setModalTitle] = useState('')
  const courseLoader = useLoader(false);
  const ProgressTrackCardLoader = useLoader(false)
  const courseTopicLoader = useLoader(false)
  const [completedTopicCount, setCompletedTopicCount] = useState(0)

  let currentIndex;

  useEffect(() => {

    if (dashboardDetails?.user_details?.student_course_count === 1) {
      if (dashboardDetails?.user_details?.student_course_details[0]?.base_status === "CR") {
        addStartDate(dashboardDetails)
      }
      else if (dashboardDetails?.user_details?.student_course_details[0]?.base_status === "ST") {
        checkIsCompletedCourse(dashboardDetails?.user_details?.student_course_details[0])
      }
    }

    if (currentCourse && currentCourse.length > 0 && !isBack) {
      getStudentCourseSections()
    }

    if (Object.keys(studentCurrentCourseSection).length > 1 && !isBack) {
      getCourseTopics(studentCurrentCourseSection)

    }
    if (isBack) {
      dispatch(isBackNavigation(false))
      let isParentTopics = studentCourseTopics && studentCourseTopics.length > 0 && studentCourseTopics.filter((el) => el?.is_parent === true)
      setCourseTopicsParentData(isParentTopics)
    }
    // getBatchViedioCallSessions()

  }, [])


  const addStartDate = (courseData) => {
    const params = {
      mq: "student__StudentCourse",
      data: {
        id: courseData?.user_details?.student_course_details[0]?.id,
        start_date: date,
        base_status: 'ST'
      }
    }

    if (courseData?.user_details?.student_course_details[0]?.base_status === "CR") {

      dispatch(postGenericCrudDetails({
        params,
        onSuccess: (success: any) => () => {
          getDashboardDetails()
        },
        onError: (error: any) => () => {
        },
      }))
    }
  }

  //Dashboard Api

  const getDashboardDetails = () => {
    const params = {}
    dispatch(fetchDashboardDetails({
      params,
      onSuccess: (success) => () => {
      },
      onError: (error) => () => {
      }
    }))
  }


  const getBatchViedioCallSessions = () => {


    const params = {}
    dispatch(fetchBatchVideoCallUsers({
      params,
      onSuccess: (success) => () => {
      },
      onError: (error) => () => {
      }
    }))
  }

  /**
   * Checking the course status when the student course length is one 
   */

  const checkIsCompletedCourse = async (courseData) => {

    if (courseData?.is_completed === false && courseData?.base_status === "ST") {
      if (courseData?.manditory_sections === courseData?.completed_manditory_sections || (courseData?.total_sections === courseData?.manditory_sections && courseData?.total_sections === courseData?.completed_sections)) {
        const params = {
          mq: "student__StudentCourse",
          data: {
            id: courseData.id,
            is_completed: true,
            is_partially_completed: courseData?.total_sections === courseData?.manditory_sections ? false : true,
            end_date: date,
            base_status: 'CP'
          }
        }
        updateCourseStatus(params)

      }
    }
    else if (courseData?.is_partially_completed === true) {
      if (courseData?.total_sections === courseData?.completed_sections) {
        const params = {
          mq: "student__StudentCourse",
          data: {
            id: courseData.id,
            is_completed: true,
            is_partially_completed: false,
          }
        }
        updateCourseStatus(params)
      }
    }

  }

  /**
   * Api for updating the course status when the student course length is one 
   */

  const updateCourseStatus = (params: any) => {
    dispatch(postGenericCrudDetails({
      params,
      onSuccess: (success: any) => () => {
        getDashboardDetails()
      },
      onError: (error: any) => () => {
      },
    }))
  }

  /**
   * Api for getting an student course section
   */

  const getStudentCourseSections = () => {

    ProgressTrackCardLoader.showLoader()
    const params = {
      student_course_id: currentCourse[0]?.id
    }

    //Api

    dispatch(fetchStudentCourseSection({
      params,
      onSuccess: (success: any) => () => {
        ProgressTrackCardLoader.hideLoader()
        checkIsCompletedSection(success.details)


        const modifiedSectionData = success.details.map((el: any) => {
          return { ...el, isActive: false }
        })

        dispatch(settingStudentSectionDataWithExtraKey(modifiedSectionData))

        // if (Object.keys(studentCurrentCourseSection).length === 0) {
        //   getCourseTopics(success?.details[0])
        // }
      },

      onError: (error: any) => () => {
        ProgressTrackCardLoader.hideLoader()
      },
    }))

  }

  /**
   * Api for getting an student course topics
   */

  const getCourseTopics = (item) => {


    courseTopicLoader.showLoader()

    setTableTitle(item)
    const params = {
      course_section_id: item.id
    }

    dispatch(fetchStudentCourseTopics({
      params,
      onSuccess: (success: any) => () => {
        courseTopicLoader.hideLoader()
        let isParentTopics = success.details.filter((el) => el.is_parent === true)
        setCourseTopicsParentData(isParentTopics)
        getCompletedManditoryTopicCount(success.details)
        checkIsCompletedTopic(success.details, item)
      },
      onError: (error: any) => () => {
        courseTopicLoader.hideLoader()
      },
    }))
  }

  const getCompletedManditoryTopicCount = (data) => {
    const count = data.filter((el) => el?.is_manditory === true && el?.student_course_topic?.is_completed)
    setCompletedTopicCount(count.length)
  }

  /**
   * Function called for checking the section is completed or not
   */

  const checkIsCompletedSection = async (sectionData) => {

    let manditoryMarkedAsCompletedCount = 0

    sectionData.forEach(async (el) => {

      if (el?.student_course_section?.is_completed === false) {

        if (await (el?.manditory_topics === el?.completed_manditory_topics || (el?.total_topics === el?.manditory_topics && el?.total_topics === el?.completed_topics))) {

          const params = {
            mq: "student__StudentCourseSection",
            data: {
              id: el?.student_course_section?.id,
              is_completed: true,
              is_partially_completed: el?.total_topics === el?.manditory_topics ? false : true,
            }
          }

          updatingSectionStatusApi(params)

        }

      }
      else if (el?.student_course_section?.is_partially_completed === true) {

        if (await (el?.total_topics === el?.completed_topics)) {

          const params = {
            mq: "student__StudentCourseSection",
            data: {
              id: el?.student_course_section?.id,
              is_completed: true,
              is_partially_completed: false,
            }
          }
          updatingSectionStatusApi(params)

        }
      }
    })

  }

  /**
   * Section completion status updating api for Sections
   */

  const updatingSectionStatusApi = (params) => {

    dispatch(postGenericCrudDetails({
      params,
      onSuccess: (success: any) => () => {
        getStudentCourseSections()
      },
      onError: (error: any) => () => {
      },
    }))
  }

  /**
 * Function called for checking the topic is completed or not
 */

  const checkIsCompletedTopic = async (courseTopics: any, sectionData: any) => {

    courseTopics?.forEach(async (item, index) => {
      if (item?.student_course_topic?.is_completed === false) {

        if (await (item?.completed_manditory_tasks === item?.manditory_tasks || (item?.total_tasks === item?.manditory_tasks && item?.total_tasks === item?.completed_tasks))) {

          const params = {
            mq: "student__StudentCourseTopic",
            data: {
              id: item?.student_course_topic?.id,
              is_completed: true,
              is_partially_completed: item?.total_tasks === item?.manditory_tasks ? false : true,
            }
          }

          updatingTopicStatusApi(params, sectionData)

        }
      }

      else if (item?.student_course_topic?.is_partially_completed === true) {
        if (await (item?.total_tasks === item?.completed_tasks)) {

          const params = {
            mq: "student__StudentCourseTopic",
            data: {
              id: item?.student_course_topic?.id,
              is_completed: true,
              is_partially_completed: false,
            }
          }
          updatingTopicStatusApi(params, sectionData)

        }
      }
      else {

      }
    }
    )
  }

  /**
   * topic completion status updating api
   */

  const updatingTopicStatusApi = (params, sectionData) => {

    dispatch(postGenericCrudDetails({
      params,
      onSuccess: (success: any) => () => {

        getCourseTopics(sectionData)
        getStudentCourseSections()
      },
      onError: (error: string) => () => {
      },
    }))
  }


  /**
  * Function is called for getting an child topics of the  parents
  */

  const getCourseTopicsParentChild = (item) => {
    let childTopics = studentCourseTopics.filter((el: any) => item.id === el.parent)

    setCourseTopicsParentChildData(childTopics)
    setModalTitle(item.name)
    if (childTopics) {
      modal.onChange(true)
    }
  }

  /**
   * Function is called for the section and topic is manditory or not
   */

  const checkStatus = (data) => {

    //item.id === currentCourse[0]?.starts_from_topic?.id

    if (currentCourse?.starts_from_topic !== null) {

      const manditory = data?.findIndex((item, index) => item.is_manditory === true)

      if (data[manditory]?.completed_manditory_tasks < data[manditory]?.manditory_tasks) {
        return manditory
      }
      else {

        const manditory1 = data?.findIndex((item, index) => item.is_manditory === true && item?.completed_manditory_tasks < item?.manditory_tasks)
        return manditory1
      }
    }

    else {

      const manditory = data?.findIndex((item, index) => item.is_manditory === true)

      if (data[manditory]?.completed_manditory_tasks < data[manditory]?.manditory_tasks) {
        return manditory
      }

      else {
        const manditory1 = data?.findIndex((item, index) => item.is_manditory === true && item?.completed_manditory_tasks < item?.manditory_tasks)
        return manditory1
      }
    }

  }


  /**
   * Table data set
   */

  const normalizedParentData = (data: any) => {
    return data.map((el: any, index) => {
      let isChild = studentCourseTopics?.some((item) => item.parent === el.id)

      return {

        [`${translate("course.topic")!}`]: <div className="text-wrap">
          <div>
            {el.is_manditory &&
              <span className={`text-danger mr-1`} style={{ marginLeft: '-11px' }}>●</span>
            }
            {el.name}
          </div>
        </div>,

        [`${translate("common.status")!}`]:
          // checkStatus(data) >= index || checkStatus(data) === -1 ?

          el?.student_course_topic !== null && el?.student_course_topic?.is_completed && el?.student_course_topic?.is_partially_completed ?
            <div className="flex-direction-column">
              <Progress
                className="progress-xs"
                max={el.total_tasks}
                value={el.completed_tasks}
                color={el.completed_tasks === el.total_tasks ? "green" : "warning"}
              />
            </div>
            :
            el?.student_course_topic !== null && el?.student_course_topic?.is_completed && !el?.student_course_topic?.is_partially_completed ?
              <div className="row ml-0">
                <div>
                  <Image src={icons.tickGreen} height={35} />
                </div>
              </div>
              : el?.marked_as_completed ?
                <div className="ml-0">
                  <div className="mb-1">
                    <Image src={icons.tickGreen} height={35} />
                  </div>
                  <span className="font-weight-light">{`(${translate("student.markedACompleted")!})`}</span>
                </div>
                : translate("student.yetToStart")!
        // : <></>
        ,

        "":
          // checkStatus(data) >= index || checkStatus(data) === -1 ?
          el?.student_course_topic !== null && el?.student_course_topic?.is_completed && el?.student_course_topic?.is_partially_completed ?
            <div className="flex-direction-column">
              <div className="">
                {<span className="h2 font-weight-light mr-1">{el?.completed_tasks}</span>}
                {`/ ${el.total_tasks}`}
              </div>
            </div>
            :
            el?.student_course_topic !== null && el?.student_course_topic?.is_completed && !el?.student_course_topic?.is_partially_completed ?
              <div className="row ml-0">
                <div>
                  {<span className="h2 font-weight-light ml-1 mr-1">{el?.completed_tasks}</span>}
                  {`/ ${el.total_tasks}`}
                </div>
              </div>
              : '-'
        // : <></>
        ,

        " ": <div
          className="text-center py-1 "
          style={{ width: '35px' }}
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            if (isChild) {
              getCourseTopicsParentChild(el)
            }
          }} >
          {isChild && <i className="bi bi-chevron-down text-muted"></i>}
        </div>,

        "  ":
          !el.marked_as_completed && (
            <div>
              <i className={`bi bi-arrow-right fa-2x text-primary ${checkStatus(data) >= index || checkStatus(data) === -1 ? "" : "disabled"}`}
                onClick={() => {
                  if (checkStatus(data) >= index || checkStatus(data) === -1) {
                    dispatch(settingCourseTopicName(el))
                    dispatch(isBackNavigation(false))
                    goTo(ROUTES.HOME.STUDENT_PAGE, false)
                  }

                }} ></i>
            </div>
          )
      };
    });
  };

  // // get student timeline 
  // useEffect(() => {
  //   getStudentTasksTimeLine(currentPage)
  // }, [])


  // const getStudentTasksTimeLine = (pageNumber: any) => {
  //   const params = {
  //     q: '',
  //     student_course_id: currentCourse[0]?.id,
  //     page_number: pageNumber,

  //   }
  //   dispatch(fetchStudentTasksTimeline({
  //     params,
  //     onSuccess: (success: any) => () => {
  //     },
  //     onError: (error: any) => () => {
  //     },
  //   }))
  // }


  // function paginationHandler(
  //   type: "next" | "prev" | "current",
  //   position?: number
  // ) {
  //   let page =
  //     type === "next"
  //       ? currentPage + 1
  //       : type === "prev"
  //         ? currentPage - 1
  //         : position;
  //   getStudentTasksTimeLine(page);
  // }

  // console.log("studentTasksTimeLine==>", studentTasksTimeLine)
  return (
    <>

      <div className="pb-3 zoom">
        <AdminNavbar userName={dashboardDetails?.user_details?.name} userProfile={dashboardDetails?.user_details?.photo} isBack={true} isShowToggle />
      </div>


      <div className="container-fluid zoom " >
        <div className='row '>
          <>
            <div className="col-sm-8">
              <div className="scroll-hidden" style={{ overflowX: 'auto' }}>
                <TaskStatusCard color={'white'}
                  dataList={dataList}
                  data={DROPDOWN_ITEM}
                />
              </div>
              <div className="" >
                <StudentProgressTrackCard
                  activeSection={currentIndex}
                  cardClass={dynamicHeight.dynamicWidth <= 1400 ? dynamicHeight.dynamicHeight - 60 : dynamicHeight.dynamicHeight - 125}
                  childCardClass={`px-4 mb-4 overflow-auto scroll-hidden student-scroll`}
                  isImage
                  isLoading={ProgressTrackCardLoader.loader}
                  data={studentSectionDataListModified ? studentSectionDataListModified : []}
                  onClick={(item, dropdownStatus, isMarked) => {
                    dispatch(settingStudentCurrentCourseSection(item))
                    if (!dropdownStatus && !isMarked) {
                      getCourseTopics(item)
                    }

                  }}
                  completedTopicCount={completedTopicCount}
                >

                  <Card isLoading={courseLoader.loader} className=" py-0">

                    {courseTopicsParentData && courseTopicsParentData?.length > 0 ?
                      <div className=" mt--6" style={{ margin: '0px -39px 0px -39px' }}>
                        <CommonTable displayDataSet={normalizedParentData(courseTopicsParentData)}
                          tableDisabled={2}
                          isLoading={courseTopicLoader.loader}
                        />
                      </div>
                      :
                      <div className=" d-flex justify-content-center align-items-center">
                        {/* errorTopicCard */}
                        <NoRecordsFound />
                      </div>
                    }
                  </Card>
                </StudentProgressTrackCard>
              </div>

            </div>

          </>
          {/* <div className="col-sm-4">
            <TimeLine
              heading={translate("timeline.title")!}
              data={studentTasksTimeLine}
              currentPage={currentPage}
              numOfPages={numOfPages}
              paginationNumberClick={(currentPage: number | undefined) => {
                paginationHandler("current", currentPage);
              }}
              previousClick={() => paginationHandler("prev")}
              nextClick={() => paginationHandler("next")}
            />

          </div> */}
          <div className="col-sm-4">
            <StudentSessions
              title="Sessions"
            />

          </div>
        </div>

        {/* Child topic modal */}

        < Modal isOpen={modal.visible} onClose={() => modal.onChange(false)
        } title={modalTitle} size={'lg'} >
          {courseTopicsParentChildData && courseTopicsParentChildData?.length > 0 ?
            <div className=" overflow-auto scroll-hidden mt--5" style={{ marginLeft: '-39px', marginRight: '-39px' }} >
              <CommonTable displayDataSet={normalizedParentData(courseTopicsParentChildData)}
              />
            </div>
            : <NoRecordsFound />}
        </ Modal>
      </div>

      {/* Child topic modal */}

      <Modal isOpen={modal.visible} onClose={() => modal.onChange(false)} title={modalTitle} size={'lg'}>
        {courseTopicsParentChildData && courseTopicsParentChildData?.length > 0 ?
          <div className=" overflow-auto scroll-hidden mt--5" style={{ marginLeft: '-39px', marginRight: '-39px' }} >
            <CommonTable displayDataSet={normalizedParentData(courseTopicsParentChildData)}
            />
          </div>
          : <NoRecordsFound />}
      </Modal>
    </>

  );
}

export { CourseSection };

