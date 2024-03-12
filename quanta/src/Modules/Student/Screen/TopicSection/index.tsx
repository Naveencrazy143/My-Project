import { icons } from '@Assets';
import { Back, Button, Card, CommonTable, NoRecordsFound, Image, DropDown, Modal, InputWithImage, Checkbox, Spinner } from '@Components';
import { useLoader, useNavigation } from '@Hooks';
import { addStudentCourseTaskResponseId, courseIdeType, fetchStudentCourseTasks, fetchTokenByUser, getTaskDetails, isBackNavigation, postStudentCourseTasksDetails, postTaskByStudent, setGuestTaskCode, settingFlowDiagramImage, settingStudentFlowDiagramData, settingStudentFlowDiagramImage, settingStudentProcedureData, settingStudentProgramData, settingStudentWrittenQuestion, taskTypeHandler, } from '@Redux';
import { ROUTES, STUDENT_ROUTES } from '@Routes';
import { filteredName, getDisplayDateWithTimeFromMoment, showToast } from '@Utils';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { CopyToClipboard } from 'react-copy-to-clipboard';
import { translate } from '@I18n';
import { GetStudentCommunityCard, GetStudentLinkedInCommunityCard, GetStudentMockInterviewCard, GetStudentMyTaskCard, GetStudentPageCard, GetStudentSoftwareDevelopmentCard, GetStudentSoftwareScreeningCard, GetStudentVideoScreeningCard } from '../../Container/StudentTaskMetaCard';

const TASK_TYPE = [
  { id: '1', name: 'System Tasks' },
  { id: '2', name: 'My Tasks' },
]

const VIEW_TYPE = [
  { id: "IF", name: 'include IT' },
  { id: "RF", name: 'include RT' },
  { id: "PF", name: 'include PT' },
  { id: "FF", name: 'include FT' },
]

const IDE_TYPE = [
  { id: "JS", name: 'JavaScript' },
  { id: "HTML", name: 'HTML' },
  { id: "CSS", name: 'CSS' },
]

function TopicSection({ navigation }: any) {

  const dispatch = useDispatch();
  const { goTo } = useNavigation()

  const { studentCourseTasks, courseTopicName, isBack, studentPageSections, taskType, getStudentTaskDetails, dashboardDetails } = useSelector(
    (state: any) => state.DashboardReducer
  );

  const [courseTaskLoader, setCourseTaskLoader] = useState(false)

  const [isViewOpen, setIsViewOpen] = useState(false)
  const [server, setServer] = useState('')
  const [checkedViewType, setCheckedViewType] = useState<any>([])
  const [urlWithQueryParams, setUrlWithQueryParams] = useState('')
  const [isCopied, setIsCopied] = useState(false)
  const [isSelectIdeModalOpen, setIsSelectIdeModalOpen] = useState(false)
  const [selectedIde, setSelectedIde] = useState('JS')
  const [submitLoader, setSubmitLoader] = useState(false)
  const [isRequestModal, setIsRequestModal] = useState(false)
  const [selectedItem, setSelectedItem] = useState<any>(undefined)

  const statusCardValues = studentCourseTasks && studentCourseTasks.length > 0 && studentCourseTasks[0]
  const statusCard = [
    { id: 1, name: translate("common.total")!, value: statusCardValues?.total_tasks || '0', icon: 'bi bi-thermometer-high fa-lg', color: "info" },
    { id: 2, name: translate("common.mandatory")!, value: statusCardValues?.manditory_tasks || '0', icon: "bi bi-exclamation-circle-fill fa-lg", color: "danger" },
    { id: 3, name: translate("common.minimum")!, value: statusCardValues?.minimum_completion || '0', icon: "bi bi-thermometer-low fa-lg", color: "secondary" },
    { id: 4, name: translate("common.completed")!, value: `${statusCardValues?.completed_tasks || '0'} / ${statusCardValues?.total_tasks || '0'}`, icon: "bi bi-check-circle-fill fa-lg", color: "success" }
  ]


  useEffect(() => {
    dispatch(getTaskDetails(undefined))
    dispatch(settingFlowDiagramImage(""))
    dispatch(settingStudentFlowDiagramData([]))
  }, [])
  useEffect(() => {
    // if (!isBack) {
    getStudentCourseTasks()
    // }

    if (isBack) {
      dispatch(isBackNavigation(false))
    }

  }, [taskType])


  const getStudentCourseTasks = () => {

    setCourseTaskLoader(true)
    const params = {
      course_topic_id: courseTopicName?.id,
      ...(taskType === '2' && { student_id: dashboardDetails?.user_details?.employee_id })
    }

    dispatch(fetchStudentCourseTasks({
      params,
      onSuccess: (success) => () => {
        setCourseTaskLoader(false)
      },
      onError: (error) => () => {
        setCourseTaskLoader(false)

      }
    }))
  }


  function checkedViewTypeHandler(evt: any) {
    const isChecked = evt.target.checked;
    if (isChecked) {
      let filtered = checkedViewType.filter((item: any) => item !== evt.target.id)
      setCheckedViewType(filtered)
      setIsCopied(false)
    }
    else {
      setCheckedViewType([...checkedViewType as never, evt.target.id as never])
      setIsCopied(false)
    }
  }

  let queryParams = ''
  checkedViewType.forEach((el: string) => {
    queryParams += el
  })

  useEffect(() => {
    setUrlWithQueryParams(server + '?type=' + queryParams)
  }, [queryParams])


  const checkStatus = (data) => {

    const manditory = data?.findIndex((item, index) => item.is_manditory === true)

    if (data[manditory]?.student_course_task === null) {
      return manditory

    }
    else if (data[manditory]?.student_course_task !== null) {
      if (data[manditory]?.student_course_task?.is_submitted) {
        const manditory1 = data?.findIndex((item, index) => item.is_manditory === true && item.student_course_task === null)
        return manditory1
      }
      else if (data[manditory]?.student_course_task?.is_approved) {

        const manditory1 = data?.findIndex((item, index) => item.is_manditory === true && item.student_course_task === null)
        return manditory1
      }
      else {
        return manditory
      }
    }

    else {
      return manditory
    }
  }

  const getUrlLink = (el: any) => {
    const currentUrl = window.location.href;
    const url = currentUrl.lastIndexOf('/')
    const finalUrl = currentUrl.substring(0, url)
    const serverUrl = `${finalUrl}/programming/task/${el?.task_meta?.code}`
    dispatch(setGuestTaskCode(el?.task_meta?.code))
    setServer(serverUrl)
    setIsViewOpen(true)
  }


  const onRequestForMockAndScreening = () => {

    const params = {
      task_meta_id: selectedItem.task_meta?.id,
      is_requested: true,
      is_approval_required: true
    }

    setSubmitLoader(true)
    dispatch(postStudentCourseTasksDetails({
      params,
      onSuccess: (success) => () => {
        setSubmitLoader(false)
        getStudentCourseTasks()
        setIsRequestModal(!isRequestModal)
        showToast('success', 'Request for Mock interview send successfully')
      },
      onError: (error: any) => () => {
        setSubmitLoader(false)
        showToast('error', error?.error_message)
      }
    }))
  }


  const getTokenByUser = () => {
    const params = {
      user_name: dashboardDetails?.user_details?.name,
      email_id: dashboardDetails?.user_details?.email,
      end_video_call: false
    }
    dispatch(fetchTokenByUser({
      params,
      onSuccess: (success: any) => () => {
        goTo(ROUTES.ADMIN.VIDEO_CALL)
      },
      onError: (error: string) => () => {
      },
    }))
  }

  const getNormalizedTaskMetaTypeCard = (item, index) => {
    const type = item?.task_meta?.task_meta_type
    // console.log("iteemmm==>", item)
    switch (type) {
      case "SWD":

        return <GetStudentSoftwareDevelopmentCard
          data={item}
          disabled={checkStatus(studentCourseTasks) >= index || checkStatus(studentCourseTasks) === -1 ? false : true}
          buttonOnClick={() => {
            dispatch(isBackNavigation(false))
            dispatch(addStudentCourseTaskResponseId(""))
            dispatch(settingStudentWrittenQuestion(''))
            dispatch(settingStudentProcedureData(''))
            dispatch(settingStudentProgramData(''))
            dispatch(settingStudentFlowDiagramData(''))
            dispatch(getTaskDetails([item]))
            dispatch(courseIdeType(item?.course_ide?.name))
            goTo(ROUTES.HOME.LANDING, false)
          }}
          shareOnclick={() => {
            if (item?.task_meta?.student_course_task) {
              getUrlLink(item)
            }
          }}
          viewOnClick={() => {
            dispatch(setGuestTaskCode(item.task_meta.code))
            dispatch(isBackNavigation(false))
            dispatch(getTaskDetails([item]))
            dispatch(settingStudentProgramData(item?.student_course_task?.program ? atob(item.student_course_task.program) : ""))
            goTo(ROUTES.HOME.STUDENT_VIEW + `/${item.task_meta.code}`, false)
          }}
        />

      case "VDO":

        return <GetStudentVideoScreeningCard
          data={item}
          buttonOnClick={() => {
            dispatch(getTaskDetails([item]))
            goTo(ROUTES.HOME.VIDEO_SCREENING)
          }}
          disabled={checkStatus(studentCourseTasks) >= index || checkStatus(studentCourseTasks) === -1 ? false : true}
        />

      case "PGE":
        return < GetStudentPageCard
          data={item}
          buttonOnClick={() => {
            dispatch(getTaskDetails([item]))
            goTo(ROUTES.HOME.STUDENT_PAGE_TASK)
          }}
          disabled={checkStatus(studentCourseTasks) >= index || checkStatus(studentCourseTasks) === -1 ? false : true}
        />
      case "LC":

        return <GetStudentLinkedInCommunityCard
          data={item}
          buttonOnClick={() => {
            dispatch(getTaskDetails([item]))
            goTo(ROUTES.HOME.LINKEDIN_COMMUNITY)
          }}
          disabled={checkStatus(studentCourseTasks) >= index || checkStatus(studentCourseTasks) === -1 ? false : true}
        />

      case "COM":

        return <GetStudentCommunityCard
          data={item}
          buttonOnClick={() => {
            dispatch(getTaskDetails([item]))
            goTo(ROUTES.HOME.STUDENT_COMMUNITY)
          }}
          disabled={checkStatus(studentCourseTasks) >= index || checkStatus(studentCourseTasks) === -1 ? false : true}
        />

      case "MI":
        return <GetStudentMockInterviewCard
          data={item}
          buttonOnClick={() => {
            dispatch(getTaskDetails(item))
            if (item?.task_meta?.student_course_task?.is_scheduled && item?.task_meta?.student_course_task?.is_completed === false) {
              setSelectedItem(item)
              getTokenByUser()
            }
            else if ((!item?.task_meta?.student_course_task || item?.task_meta?.student_course_task.is_requested === false) && item?.task_meta?.is_completed === false) {
              setSelectedItem(item)
              setIsRequestModal(!isRequestModal)
            }
          }}
        />
      case "AI":
        return <GetStudentSoftwareScreeningCard
          data={item}
          buttonOnClick={() => { }}
        />
      case "SCR":
        return <GetStudentSoftwareScreeningCard
          data={item}
          buttonOnClick={() => {
            dispatch(getTaskDetails(item))
            if (item?.task_meta?.student_course_task?.is_scheduled && item?.task_meta?.student_course_task?.is_completed === false) {
              setSelectedItem(item)
              getTokenByUser()
            }
            else if ((!item?.task_meta?.student_course_task || item?.task_meta?.student_course_task.is_requested === false) && item?.task_meta?.is_completed === false) {
              setSelectedItem(item)
              setIsRequestModal(!isRequestModal)
            }


          }}
        />
      default:
    }
  }

  return (
    <>

      {taskType === '1' && <Card>
        <div className='row'>
          {statusCard && statusCard.map((item) => {
            return (

              <div className={`${studentPageSections && studentPageSections.length > 0 ? 'col-sm-6 mb-3' : 'col-sm-3'}`}>
                <div className='row'>
                  <div className="col-auto">
                    <div className={`icon-shape bg-gradient-${item.color} text-white p-2`}>
                      <i className={`${item.icon}`} />
                    </div>
                  </div>
                  <div className="">
                    <h5
                      className="text-uppercase text-muted mb-0 text-green"
                    >
                      {item.name}
                    </h5>
                    <span className="h5 font-weight-bold mb-0">
                      {item.value}
                    </span>
                  </div>

                </div>
              </div>

            )
          })}
        </div>
      </Card>}


      {/* <Card className='mt--3'> */}
      {/* overflow-auto scroll-hidden mt-0 studentTopicSectionCard */}

      <div className='row'>
        <div className='col-sm-4'>
          <DropDown
            placeholder='Task Type'
            data={TASK_TYPE}
            value={taskType}
            onChange={(e) => {
              dispatch(taskTypeHandler(e.target.value))
            }}
          />
        </div>

        {taskType === '2' && <div className='pr-3 mt-lg-2 mt-sm-0 mt-3 ml-auto'>
          <Button
            text={translate("student.createTask")!}
            size={'sm'}
            onClick={() => {
              dispatch(getTaskDetails([]))
              setIsSelectIdeModalOpen(true)
            }}
          />
        </div>}
      </div>


      {studentCourseTasks && studentCourseTasks?.length > 0 && taskType === '1' ?
        // <div className=" overflow-auto scroll-hidden" style={{ marginLeft: '-39px', marginRight: '-39px' }} >
        //   <CommonTable displayDataSet={normalizedSystemTaskData(studentCourseTasks)}
        //     isLoading={courseTaskLoader.loader}
        //   />
        // </div>
        <>
          {/* {courseTaskLoader &&
            <div className=''>
              <Spinner />
            </div>
          } */}
          <div className='pt-4'>


            {studentCourseTasks && studentCourseTasks?.length > 0 && studentCourseTasks.map((el, index) => {
              return (
                <>
                  {getNormalizedTaskMetaTypeCard(el, index)}
                </>
              )
            })}
          </div>
        </>
        :
        studentCourseTasks && studentCourseTasks?.length > 0 && taskType === '2' ?

          // <div className=" overflow-auto scroll-hidden" style={{ marginLeft: '-39px', marginRight: '-39px' }} >
          //   <CommonTable displayDataSet={normalizedMyTaskData(studentCourseTasks)}
          //     isLoading={courseTaskLoader.loader}
          //   />
          // </div>
          <div className='pt-3'>
            {studentCourseTasks && studentCourseTasks?.length > 0 && studentCourseTasks.map((el, index) => {
              console.log("elemrntt==>", el)
              return (
                <>
                  {<GetStudentMyTaskCard
                    data={el}
                    buttonOnClick={() => {
                      dispatch(isBackNavigation(false))
                      dispatch(getTaskDetails([el]))
                      dispatch(settingStudentProgramData(''))
                      dispatch(isBackNavigation(false))
                      dispatch(courseIdeType(el?.course_ide?.name))
                      dispatch(settingStudentFlowDiagramData(el?.task_meta?.student_course_task?.flow_diagram))
                      dispatch(settingStudentProgramData(el.task_meta?.student_course_task?.program))
                      // dispatch(settingFlowDiagramImage(el?.task_meta?.student_course_task?.image_of_flow_diagram))
                      goTo(ROUTES.HOME.STUDENT_QUESTION_CREATION)
                    }}
                    shareOnclick={() => {
                      getUrlLink(el)
                    }}
                    viewOnClick={() => {
                      dispatch(setGuestTaskCode(el.task_meta.code))
                      dispatch(getTaskDetails([el]))
                      dispatch(isBackNavigation(false))
                      dispatch(courseIdeType(el?.course_ide?.name))

                      dispatch(settingStudentProgramData(el?.student_course_task?.program ? atob(el.student_course_task.program) : ""))
                      goTo(ROUTES.HOME.STUDENT_VIEW + `/${el.task_meta.code}`, false)
                    }}
                  />}
                </>
              )
            })}

          </div>
          :
          <div className=''>
            <NoRecordsFound />
          </div>
      }

      {/* </Card> */}

      <Modal isOpen={isViewOpen} onClose={() => {
        setUrlWithQueryParams(server)
        setCheckedViewType([])
        setIsViewOpen(false)
        setIsCopied(false)
      }} title={''} titleClassname={'text-muted fw-light'}
      >
        <div className="mt--4 ml--1">
          <CopyToClipboard text={queryParams ? urlWithQueryParams : server}>
            <InputWithImage
              image={`clipboard-${isCopied ? 'check-fill' : 'fill'} pointer`}
              onClick={() => {
                setIsCopied(true)
              }}
              value={queryParams ? urlWithQueryParams : server}
            />
          </CopyToClipboard>
        </div>
        <div className='col'>
          <div className='flex-wrap  d-flex'>
            {VIEW_TYPE.map((el: any) => {
              return (
                <div className=' col-sm-4'>
                  <Checkbox
                    id={el.id}
                    text={el.name}
                    onCheckChange={(e) => {
                      checkedViewTypeHandler(e)
                    }}
                    checked={!checkedViewType.includes(el?.id)}
                  />
                </div>
              )
            })
            }
          </div>
        </div>
        <div className='text-center'>
          <CopyToClipboard text={queryParams ? urlWithQueryParams : server}>
            <Button
              text={translate("guest.copy")!}
              onClick={() => {
                setIsCopied(true)
              }}
            />
          </CopyToClipboard>
        </div>
      </Modal>


      <Modal isOpen={isSelectIdeModalOpen} onClose={() => {
        setIsSelectIdeModalOpen(false)
      }} title={'Select IDE'}
      >
        <div className='text-center'>
        </div>
        <DropDown
          placeholder='Select IDE'
          data={IDE_TYPE}
          onChange={(e) => setSelectedIde(e.target.value)}
          value={selectedIde}
        />
        <div className='text-right mt-4'>
          <Button
            text={'Start'}
            onClick={() => {
              goTo(ROUTES.HOME.STUDENT_QUESTION_CREATION)
              dispatch(settingStudentProcedureData([]))
              dispatch(settingStudentProgramData(''))
              dispatch(settingStudentFlowDiagramData(''))
              dispatch(isBackNavigation(false))
            }}
          />
        </div>
      </Modal>

      {/* {Mock request modal} */}

      <Modal isOpen={isRequestModal} isModalLoading={submitLoader} onClose={() => { setIsRequestModal(!isRequestModal) }} title={`Are you sure, Do you want to request for an ${selectedItem?.task_meta?.task_meta_type === "MI" ? "Mock interview" : "Software screening"}  ?`} titleClassname={'text-muted font-weight-normal'}>

        <div className='text-right'>
          <Button
            color={'secondary'}
            text={translate('common.cancel')}
            onClick={() => { setIsRequestModal(!isRequestModal) }}
          />
          <Button
            text={'Request'}
            onClick={() => {
              onRequestForMockAndScreening()
            }}
          />
        </div>
      </Modal>
    </>
  )
}

export { TopicSection };
