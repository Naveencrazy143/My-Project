import { HeaderNavbar, Question, Procedure, CodeEditor, FlowDiagramHeader, CommentSection, GuestQuestion } from '@Modules'
import { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { addStudentCourseTaskResponseId, fetchGuestTaskDetails, fetchStudentCourseTasks, fetchStudentCourseTasksDetails, fetchStudentTasksTimeline, fetchTaskDetails, fetchTaskEvents, getTaskDetails, isExpandCodeEditorAction, postGenericCrudDetails, postStudentCourseTasksDetails, postTaskEvent, settingStudentFlowDiagramData, settingStudentProcedureData, settingStudentProgramData, settingStudentWrittenQuestion } from '@Redux';
import { convertToUpperCase, disableCopyRightClickDnd, showToast } from '@Utils';
import moment from 'moment';
import { log } from 'console';
import { useKeyPress } from '@Components';



function GuestLanding() {
  const questionRef = useRef<HTMLDivElement>(null)
  const procedureRef = useRef<HTMLDivElement>(null)
  const codeRef = useRef<HTMLDivElement>(null)
  const flowDiagramRef = useRef<HTMLDivElement>(null)
  const [isRefresh, setIsRefresh] = useState(false)


  const [message, setMessage] = useState<string>('')
  const enterPress = useKeyPress('Enter')

  // useEffect(() => {
  //   if (enterPress && message.trim().length > 0 && isPopUp) {
  //     // addTaskEvent()
  //   }
  // }, [enterPress])

  useEffect(() => {
    disableCopyRightClickDnd(true)
    return () => {
      disableCopyRightClickDnd(false)
    }
  }, [])


  const [navHeader, setNavHeader] = useState([
    {
      headerTitle: "Questions",
      headerRef: questionRef,
      headerID: "questions",
      href: "Questions",
      isCompleted: true
    },
    {
      headerTitle: "Procedure",
      headerRef: procedureRef,
      headerID: "procedure",
      href: "Procedure",
      isCompleted: false
    },
    {
      headerTitle: "FlowDiagram",
      headerRef: flowDiagramRef,
      headerID: "flowDiagram",
      href: 'FlowDiagram',
      isCompleted: false
    },

    {
      headerTitle: "Code",
      headerRef: codeRef,
      headerID: "code",
      href: 'Code',
      isCompleted: false
    },
  ]);


  const dispatch = useDispatch();

  const { getStudentTaskDetails, courseTopicName, studentProcedureData,
    studentWrittenQuestion, studentFlowDiagramData, studentProgramData, getEvents, isExpandCodeEditor, isBack, addStudentTaskResponseId, currentCourse
  } = useSelector((state: any) => state.DashboardReducer);

  const { selectedGuestTask } = useSelector(
    (state: any) => state.GuestReducer
  );

  const [writtenQuestion, setWrittenQuestion] = useState('')
  const [isLoadingSubmitButton, setIsLoadingSubmitButton] = useState(false)
  const [flowDiagreamImage, setFlowDiagreamImage] = useState<any>()
  const [isPopUp, setIsPopUp] = useState(false)


  useEffect(() => {

    // if (!isBack) {
      const params = {
        task_id: selectedGuestTask?.id

      }
      dispatch(fetchGuestTaskDetails({
        params,
        onSuccess: (success: any) => () => {
        },
        onError: (error: string) => () => {
        },
      }))
    // }
  }, [])


  //   if (getStudentTaskDetails[0]?.student_course_task) {
  //     getStudentCourseTaskDetails(getStudentTaskDetails[0]?.student_course_task?.id)
  //   }
  // }, [])

  useEffect(() => {
    // setting is expand code editor true for show  all the components 
    dispatch(isExpandCodeEditorAction(false))
  }, [])


  /**
   * Api for getting an submitted task details to prefill the fields
   */

  const getStudentCourseTaskDetails = (id) => {

    const params = {
      student_task_id: id ? id : getStudentTaskDetails[0]?.student_course_task?.id
    }

    dispatch(fetchStudentCourseTasksDetails({
      params,
      onSuccess: (success) => () => {
        setFlowDiagreamImage(success?.details?.image_of_flow_diagram)
        dispatch(addStudentCourseTaskResponseId(success?.details?.id))

        if (success?.details?.formulated_question) {
          setWrittenQuestion(success?.details?.formulated_question)
          let updatedNavHeader = [...navHeader]
          updatedNavHeader[1].isCompleted = true
          setNavHeader(updatedNavHeader)
        }
        if (success?.details?.procedure.length > 0) {
          let updatedNavHeader = [...navHeader]
          updatedNavHeader[2].isCompleted = true
          setNavHeader(updatedNavHeader)
        }
        if (success?.details?.flow_diagram.length > 0) {
          let updatedNavHeader = [...navHeader]
          updatedNavHeader[3].isCompleted = true
          setNavHeader(updatedNavHeader)
        }

        /**
         * setting an details of all the fields in state
         */

        dispatch(settingStudentWrittenQuestion(success?.details?.formulated_question))
        dispatch(settingStudentProcedureData(success?.details?.procedure ? success?.details?.procedure : []))
        dispatch(settingStudentFlowDiagramData(success?.details?.flow_diagram ? success?.details?.flow_diagram : []))
        dispatch(settingStudentProgramData(success?.details?.program !== null ? atob(success?.details?.program) : ""))
        setWrittenQuestion(success?.details?.formulated_question)

        // if (validateAllThefieldsAreFilled(success?.details?.program)) {
        //   submitForApproval()
        // }

      },
      onError: (error) => () => { }
    }))
  }

  /**
   * function for validating all the fields are filled 
   */

  const validateAllThefieldsAreFilled = (program) => {

    if (studentWrittenQuestion === '') {
      return false
    }
    else if (studentProcedureData.length === 0) {
      return false
    }
    else if (studentFlowDiagramData.length === 0) {
      return false
    }
    else if (program === null || studentProcedureData === "") {
      return false
    }
    else {
      return true
    }

  }



  /**
   * Api for approval
   */

  const submitForApproval = () => {

    const params = {
      course_task_id: getStudentTaskDetails[0]?.id,
      id: getStudentTaskDetails[0]?.student_course_task?.id,
      is_submitted: true,
    }
    if (getStudentTaskDetails[0]?.student_course_task?.is_submitted === false) {

      dispatch(postStudentCourseTasksDetails({
        params,
        onSuccess: (success) => () => {
          showToast('success', success.message)
          getStudentCourseTasks()
          // postTimelineCourseEvent('SUB', addStudentTaskResponseId)
        },
        onError: (error) => () => {
          console.log(error)
        }
      }))
    }

  }

  /**
   * getting task details after first time question submission for take the task submitted id
   */

  const getStudentCourseTasks = () => {


    const params = {
      course_topic_id: courseTopicName?.id
    }

    dispatch(fetchStudentCourseTasks({
      params,
      onSuccess: (success) => () => {
        let currentTaskObject = success.details.filter((item) => item.id === getStudentTaskDetails[0].id)
        dispatch(getTaskDetails(currentTaskObject))

      },
      onError: (error) => () => {
      }
    }))
  }

  /**
   * Api for submit the tasks
   */
  let date = moment().format("YYYY-MM-DD")

  const onSubmit = (questionInput, procedureData, flowDiadramData, programData) => {
    // if (questionInputValidation()) {
    const params = {
      start_date: date,
      ...(getStudentTaskDetails[0]?.student_course_task?.id && { id: getStudentTaskDetails[0]?.student_course_task?.id }),
      base_status: "ST",
      is_inprogress: true,
      course_task_id: getStudentTaskDetails[0]?.id,
      formulated_question: questionInput,
      procedure: procedureData,
      flow_diagram: studentFlowDiagramData,
      ...(programData && { program: programData }),
      ...(validateAllThefieldsAreFilled(programData) && getStudentTaskDetails[0]?.student_course_task?.is_submitted === false && { is_submitted: true })
    }

    setIsLoadingSubmitButton(true)
    dispatch(postStudentCourseTasksDetails({
      params,
      onSuccess: (success) => () => {
        showToast('success', success.message)
        setIsLoadingSubmitButton(false)

        if (validateAllThefieldsAreFilled(programData) && getStudentTaskDetails[0]?.student_course_task?.is_submitted === false) {
          getStudentCourseTasks()
          // postTimelineCourseEvent('SUB', addStudentTaskResponseId)
        }

        if (success?.details?.id) {
          getStudentCourseTasks()
          getStudentCourseTaskDetails(success.details.id)

          dispatch(addStudentCourseTaskResponseId(success.details.id))
          // postTimelineCourseEvent('STD', success.details.id)
        }
        else {
          getStudentCourseTaskDetails(getStudentTaskDetails[0]?.student_course_task?.id)
        }

      },
      onError: (error) => () => {
        setIsLoadingSubmitButton(false)

        console.log(error)
      }
    }))
  }

  // const postTimelineCourseEvent = (type, id) => {
  //   const params = {
  //     task_status_type: type,
  //     id: id
  //   }

  //   console.log("papappa==>", params)

  //   dispatch(postTaskEvent({
  //     params,
  //     onSuccess: (success: any) => () => {
  //       const params = {
  //         q: '',
  //         student_course_id: currentCourse[0]?.id
  //       }
  //       dispatch(fetchStudentTasksTimeline({
  //         params,
  //         onSuccess: (success: any) => () => {
  //           // onCommentLoader.hideLoader()
  //         },
  //         onError: (error: string) => () => {
  //           // onCommentLoader.hideLoader()
  //         },
  //       }))

  //     },
  //     onError: (error: string) => () => {
  //       // onCommentLoader.hideLoader()
  //     },
  //     // }
  //   }))
  // }


  // const addTaskEvent = () => {
  //   // onCommentLoader.showLoader()
  //   const params = {
  //     message_scope: "TSK",
  //     id: getStudentTaskDetails[0]?.student_course_task?.id,
  //     message: message,
  //     event_type: "TEM"
  //   }
  //   dispatch(postTaskEvent({
  //     params,
  //     onSuccess: (success: any) => () => {
  //       // onCommentLoader.hideLoader()
  //       getTaskEvents()
  //       setMessage('')
  //     },
  //     onError: (error: string) => () => {
  //       // onCommentLoader.hideLoader()
  //     },
  //     // }
  //   }))

  // }

  // const getTaskEvents = () => {
  //   const params = {
  //     message_scope: "TSK",
  //     student_course_task_id: getStudentTaskDetails[0]?.student_course_task?.id,
  //   }
  //   setIsRefresh(true)
  //   dispatch(fetchTaskEvents({
  //     params,
  //     onSuccess: (success: any) => () => {
  //       setIsRefresh(false)

  //       // onCommentLoader.hideLoader()
  //     },
  //     onError: (error: string) => () => {
  //       setIsRefresh(false)

  //       // onCommentLoader.hideLoader()
  //     },

  //   }))
  // }

  // useEffect(() => {
  //   if (!isBack && getStudentTaskDetails[0]?.student_course_task?.id) {
  //     getTaskEvents()
  //   }
  // }, [getStudentTaskDetails[0]?.student_course_task?.id])

  return (
    <>

      <div className='m-0 p-0 zoom' >

        {!isExpandCodeEditor && (
          <HeaderNavbar navHeader={navHeader} editorIndex={!isExpandCodeEditor ? 3 : ''} />
        )}

        {navHeader.map((it, index) => {
          return (
            <>

              {!isExpandCodeEditor && it.isCompleted && it.headerTitle === "Questions" &&
                <div ref={questionRef} className='mt-6' >
                  <GuestQuestion
                    value={writtenQuestion}
                    onInputChange={(value) => {
                      dispatch(settingStudentWrittenQuestion(value))
                      setWrittenQuestion(convertToUpperCase(value))
                    }}
                    isLoading={isLoadingSubmitButton}
                    onSubmit={(value) => {
                      onSubmit(value, studentProcedureData, studentFlowDiagramData, btoa(studentProgramData))
                    }}
                  />
                </div>}

              {!isExpandCodeEditor && it.isCompleted && it.headerTitle === "Procedure" &&
                <div ref={procedureRef}>
                  <Procedure
                    value={studentProcedureData}
                    isLoading={isLoadingSubmitButton}
                    onSubmit={(data) => {
                      dispatch(settingStudentProcedureData(data))
                      onSubmit(studentWrittenQuestion, data, studentFlowDiagramData, btoa(studentProgramData))
                    }}
                  />
                </div>}

              {!isExpandCodeEditor && it.isCompleted && it.headerTitle === "FlowDiagram" &&
                <div ref={flowDiagramRef}>
                  <FlowDiagramHeader img={flowDiagreamImage} />
                </div>}
              {/* {it[4].isCompleted === false ? <div style={{ marginTop: it[index].isCompleted === false ? '20px' : '' }}> </div> : ''} */}
              <div className='m-0 p-0 container-fluid d-flex' ref={codeRef}>
                {it.isCompleted && it.headerTitle === "Code" &&
                  <CodeEditor
                    value={studentProgramData}
                    isLoading={isLoadingSubmitButton}
                    onSubmit={(code) => {
                      dispatch(settingStudentProgramData(btoa(code)))
                      if (code) {
                        onSubmit(studentWrittenQuestion, studentProcedureData, studentFlowDiagramData, btoa(code))
                      }
                    }}
                  />
                }
              </div>
            </>
          )
        })}



      </div>
    </>
  )
}

export { GuestLanding }