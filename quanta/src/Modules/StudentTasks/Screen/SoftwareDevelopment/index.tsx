import { useKeyPress } from '@Components';
import { DynamicHeight } from '@Hooks';
import { translate } from '@I18n';
import { CodeEditor, CommentSection, FlowDiagramHeader, HeaderNavbar, Procedure, Question } from '@Modules';
import { addStudentCourseTaskResponseId, courseIdeType, doEditQuestion, fetchStudentCourseTasks, fetchStudentCourseTasksDetails, fetchStudentTasksTimeline, fetchTaskDetails, fetchTaskEvents, getMessageEvents, getTaskDetails, isExpandCodeEditorAction, postStudentCourseTasksDetails, postTaskEvent, setCodeOutputData, settingStudentFlowDiagramData, settingStudentProcedureData, settingStudentProgramData, settingStudentWrittenQuestion } from '@Redux';
import { convertToUpperCase, showToast } from '@Utils';
import moment from 'moment';
import { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from "react-redux";



function Landing() {
  const questionRef = useRef<HTMLDivElement>(null)
  const procedureRef = useRef<HTMLDivElement>(null)
  const codeRef = useRef<HTMLDivElement>(null)
  const flowDiagramRef = useRef<HTMLDivElement>(null)
  const [isRefresh, setIsRefresh] = useState(false)
  const [codeOutput, setCodeOutput] = useState<any>('')
  let dynamicHeight: any = DynamicHeight()



  const [message, setMessage] = useState<string>('')
  const enterPress = useKeyPress('Enter')

  useEffect(() => {
    if (enterPress && message.trim().length > 0 && isPopUp) {
      addTaskEvent()
    }
  }, [enterPress])



  const [navHeader, setNavHeader] = useState([
    {
      headerTitle: "Questions",
      headerRef: questionRef,
      headerID: "Questions",
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

  const { getStudentTaskDetails, courseTopicName, studentProcedureData, taskDetails,
    studentWrittenQuestion, studentFlowDiagramData, studentProgramData, getEvents, isExpandCodeEditor, isBack, addStudentTaskResponseId, currentCourse,
    studentTasksTimeLine, courseIde, editQuestion, MessageEvents
  } = useSelector((state: any) => state.DashboardReducer);

  const { codeOutputData } = useSelector(
    (state: any) => state.GuestReducer
  );

  const { studentTaskData } = useSelector(
    (state: any) => state.AppReducer
  );


  const [writtenQuestion, setWrittenQuestion] = useState('')
  const [isLoadingSubmitButton, setIsLoadingSubmitButton] = useState(false)
  const [flowDiagreamImage, setFlowDiagreamImage] = useState<any>()
  const [isPopUp, setIsPopUp] = useState(false)
  // const [courseIde, setCourseIde] = useState('')

  useEffect(() => {
    if (!isPopUp)
      // disableCopyRightClickDnd(true)
      return () => {
        // disableCopyRightClickDnd(false)
        dispatch(setCodeOutputData(''))
        // dispatch(getStudentTaskData(null))

      }
  }, [isPopUp])

  useEffect(() => {
    const quesObj = { editQues: false, editSampleIO: false, editRules: false }
    dispatch(doEditQuestion(quesObj))
  }, [])



  useEffect(() => {

    const params = {
      task_meta_id: studentTaskData?.route_params ? studentTaskData?.route_params?.task_meta_id : getStudentTaskDetails && getStudentTaskDetails[0]?.task_meta?.id
    }
    dispatch(fetchTaskDetails({ // getTaskMetaDetails api
      params,
      onSuccess: (success: any) => () => {
        dispatch(courseIdeType(success.details.details.ide.name))

      },
      onError: (error: string) => () => {
      },
    }))


    if (studentTaskData?.route_params || getStudentTaskDetails[0]?.student_course_task_meta_id) {
      console.log("called");

      getStudentCourseTaskDetails(gettingAnTaskEventId())
    }
  }, [])


  useEffect(() => {
    // setting is expand code editor true for show  all the components 
    dispatch(isExpandCodeEditorAction(false))

    if (studentTaskData !== null && studentTaskData?.route_type === "STUDENT_CHAT") {
      setIsPopUp(!isPopUp)
    }
  }, [])


  /**
   * Api for getting an submitted task details to prefill the fields
   */
  const gettingAnTaskEventId = () => {

    if (studentTaskData && studentTaskData?.route_params?.student_course_task_meta_id) {
      return studentTaskData?.route_params?.student_course_task_meta_id
    }
    else if (studentTaskData && studentTaskData?.route_params?.reference_id) {
      return studentTaskData?.route_params?.reference_id
    }
    else if (getStudentTaskDetails.length > 0) {
      return getStudentTaskDetails[0]?.student_course_task_meta_id
    }
  }


  const getStudentCourseTaskDetails = (id) => {

    const params = {
      student_task_meta_id: id
    }

    dispatch(fetchStudentCourseTasksDetails({ //getStudentTaskMetaDetails
      params,
      onSuccess: (success) => () => {


        setFlowDiagreamImage(success?.details?.details?.student_course_task?.image_of_flow_diagram)
        dispatch(addStudentCourseTaskResponseId(success?.details?.details?.student_course_task?.id))

        if (success?.details?.details?.student_course_task?.formulated_question) {
          dispatch(doEditQuestion({ ...editQuestion, editQues: true }))
          setWrittenQuestion(success?.details?.details?.student_course_task?.formulated_question)
          let updatedNavHeader = [...navHeader]
          updatedNavHeader[1].isCompleted = true
          setNavHeader(updatedNavHeader)
        }

        if (success?.details?.details?.student_course_task?.procedure.length > 0) {
          dispatch(doEditQuestion({ ...editQuestion, editRules: true }))
          let updatedNavHeader = [...navHeader]
          updatedNavHeader[2].isCompleted = true
          setNavHeader(updatedNavHeader)
        }

        if (success?.details?.details?.student_course_task?.flow_diagram.length > 0) {
          let updatedNavHeader = [...navHeader]
          updatedNavHeader[3].isCompleted = true
          setNavHeader(updatedNavHeader)
        }

        if (success?.details?.details?.student_course_task?.formulated_question && success?.details?.details?.student_course_task?.procedure.length > 0) {
          dispatch(doEditQuestion({ ...editQuestion, editQues: true, editRules: true }))

        }


        /**
         * setting an details of all the fields in state
         */

        dispatch(settingStudentWrittenQuestion(success?.details?.details?.student_course_task?.formulated_question))
        dispatch(settingStudentProcedureData(success?.details?.details?.student_course_task?.procedure ? success?.details?.details?.student_course_task?.procedure : []))
        dispatch(settingStudentFlowDiagramData(success?.details?.details?.student_course_task?.flow_diagram ? success?.details?.details?.student_course_task?.flow_diagram : []))
        dispatch(settingStudentProgramData(success?.details?.details?.student_course_task?.program !== null ? window.atob(success?.details?.details?.student_course_task?.program) : ""))
        setWrittenQuestion(success?.details?.details?.student_course_task?.formulated_question)

        let dataString = success?.details?.details?.student_course_task?.code_output
        let jsonString = dataString.replace(/'/g, "\"");

        // Replace None with null in the JSON string. coz None is for python.
        jsonString = jsonString.replace(/None/g, 'null');
        const escapedStr = jsonString.replace(/\n/g, "\\n");

        // Parse the updated JSON string
        let parseObj = JSON.parse(escapedStr);

        setCodeOutput(parseObj)
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
   * getting task details after first time question submission for take the task submitted id
   */

  const getStudentCourseTasks = () => {


    const params = {
      course_topic_id: studentTaskData?.route_params?.course_topic_id ? studentTaskData?.route_params?.course_topic_id : courseTopicName?.id
    }

    dispatch(fetchStudentCourseTasks({ //getStudentCourseTaskItems
      params,
      onSuccess: (success) => () => {
        let currentTaskObject = success.details.filter((item) => item.id === (studentTaskData?.route_params?.task_id || getStudentTaskDetails[0].id))
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

    const params = {
      start_date: date,
      ...((studentTaskData?.route_params?.reference_id || getStudentTaskDetails[0]?.student_course_task_meta_id || studentTaskData?.route_params?.student_course_task_meta_id) && { id: studentTaskData?.route_params?.student_course_task_meta_id ? studentTaskData?.route_params?.student_course_task_meta_id : getStudentTaskDetails && getStudentTaskDetails.length > 0 && getStudentTaskDetails[0]?.student_course_task_meta_id ? getStudentTaskDetails[0]?.student_course_task_meta_id : studentTaskData?.route_params?.reference_id }),
      base_status: "ST",
      is_inprogress: true,
      task_meta_id: studentTaskData?.route_params ? studentTaskData.route_params.task_meta_id : getStudentTaskDetails && getStudentTaskDetails[0]?.task_meta?.id,
      formulated_question: questionInput,
      procedure: procedureData,
      flow_diagram: studentFlowDiagramData,
      ...(programData && { program: programData }),
      ...(validateAllThefieldsAreFilled(programData) && ((getStudentTaskDetails && getStudentTaskDetails[0]?.task_meta?.student_course_task?.is_submitted === false) || studentTaskData?.route_params) && { is_submitted: true }),
      ...(validateAllThefieldsAreFilled(programData) && ((getStudentTaskDetails && getStudentTaskDetails[0]?.task_meta?.is_approval_required === false) || studentTaskData?.route_params) && { is_approval_required: true }),
      code_output: codeOutputData ? (codeOutputData) : codeOutput,
    }


    setIsLoadingSubmitButton(true)
    dispatch(postStudentCourseTasksDetails({ //addStudentCourseTaskMeta
      params,
      onSuccess: (success) => () => {
        showToast('success', success?.message)
        setIsLoadingSubmitButton(false)

        if (validateAllThefieldsAreFilled(programData) && getStudentTaskDetails[0]?.task_meta?.student_course_task?.is_submitted === false) {
          getStudentCourseTasks()
          postTimelineCourseEvent('SUB', getStudentTaskDetails[0]?.student_course_task_meta_id)
        }

        if (success?.details?.id) {
          getStudentCourseTasks()
          getStudentCourseTaskDetails(success.details.id)

          dispatch(addStudentCourseTaskResponseId(success.details.id))
          postTimelineCourseEvent('STD', success.details.id)
        }
        else {
          getStudentCourseTaskDetails(gettingAnTaskEventId())
        }
      },
      onError: (error: any) => () => {
        setIsLoadingSubmitButton(false)
        if (error?.status_code === 0) {
          showToast('error', error?.error_message)
        }
      }
    }))
  }

  const postTimelineCourseEvent = (type, id) => {
    const params = {
      task_status_type: type,
      id: id
    }

    dispatch(postTaskEvent({
      params,
      onSuccess: (success: any) => () => {
        getStudentTasksTimeline()
      },
      onError: (error: any) => () => {
        // onCommentLoader.hideLoader()
      },
      // }
    }))
  }

  const getStudentTasksTimeline = () => {
    const params = {
      q: '',
      student_course_id: currentCourse[0]?.id
    }
    dispatch(fetchStudentTasksTimeline({
      params,
      onSuccess: (success: any) => () => {
        // onCommentLoader.hideLoader()
      },
      onError: (error: string) => () => {
        // onCommentLoader.hideLoader()
      },
    }))
  }

  const addTaskEvent = () => {
    // onCommentLoader.showLoader()
    const params = {
      message_scope: "TSK",
      id: gettingAnTaskEventId(),
      message: message,
      event_type: "TEM"
    }

    dispatch(postTaskEvent({
      params,
      onSuccess: (success: any) => () => {
        // onCommentLoader.hideLoader()
        getTaskEvents()
        setMessage('')
      },
      onError: (error: any) => () => {
        // onCommentLoader.hideLoader()
      },
      // }
    }))

  }


  const getTaskEvents = () => {

    const params = {
      message_scope: "TSK",
      student_course_task_meta_id: gettingAnTaskEventId(),
    }

    setIsRefresh(true)
    dispatch(fetchTaskEvents({
      params,
      onSuccess: (success: any) => () => {
        const filteredMessage = success?.details && success?.details.length > 0 && success?.details.filter((item) => {
          return item.message !== null
        })
        dispatch(getMessageEvents(filteredMessage))
        setIsRefresh(false)
        // onCommentLoader.hideLoader()
      },
      onError: (error: any) => () => {
        setIsRefresh(false)

        // onCommentLoader.hideLoader()
      },

    }))
  }


  useEffect(() => {

    if (studentTaskData || getStudentTaskDetails[0]?.student_course_task_meta_id !== null) {
      getTaskEvents()
    }

  }, [])

  return (
    <>
      {!isExpandCodeEditor && (
        <HeaderNavbar navHeader={navHeader} editorIndex={!isExpandCodeEditor ? 3 : ''} courseIde={courseIde} />
      )}
      <div className=' zoom' >


        {!isExpandCodeEditor && (
          <div className='' style={{
            position: 'fixed',
            bottom: '0',
            zIndex: '1001'
          }}>
            <CommentSection
              message={MessageEvents}
              onChange={(e) => {
                setMessage(e.target.value)
              }}
              onClick={() => {
                if (message.trim().length > 0) {
                  addTaskEvent()
                }
              }}
              value={message}
              onRefresh={() => getTaskEvents()}
              isLoading={isRefresh}
              height='54vh'
              messageLength={message}
              isPopUp={isPopUp}
              onPopUp={() => {
                setIsPopUp(!isPopUp)
              }}
              id={studentTaskData !== null && studentTaskData?.route_params?.student_course_task_meta_id ? studentTaskData?.route_params?.student_course_task_meta_id
                : getStudentTaskDetails ? getStudentTaskDetails[0]?.student_course_task_meta_id
                  : studentTaskData?.route_params?.reference_id
              }
            />
          </div>
        )}

        {navHeader.map((it, index) => {
          return (
            <>

              {!isExpandCodeEditor && it.isCompleted && it.headerTitle === "Questions" &&
                <div ref={questionRef} className='mt-6' >
                  <Question
                    value={writtenQuestion}
                    onInputChange={(value) => {
                      dispatch(settingStudentWrittenQuestion(value))
                      setWrittenQuestion(convertToUpperCase(value))
                    }}
                    isLoading={isLoadingSubmitButton}
                    onSubmit={(value) => {
                      onSubmit(value, studentProcedureData, studentFlowDiagramData, window.btoa(studentProgramData))
                    }}
                  />
                </div>}

              {!isExpandCodeEditor && it.isCompleted && it.headerTitle === "Procedure"
                &&
                <div ref={procedureRef}>
                  <Procedure
                    value={studentProcedureData}
                    isLoading={isLoadingSubmitButton}
                    onSubmit={(data) => {
                      dispatch(settingStudentProcedureData(data))
                      onSubmit(studentWrittenQuestion, data, studentFlowDiagramData, window.btoa(studentProgramData))
                    }}
                  />
                </div>
              }

              {!isExpandCodeEditor && it.isCompleted && it.headerTitle === "FlowDiagram" &&
                <div ref={flowDiagramRef}>
                  <FlowDiagramHeader img={flowDiagreamImage} />
                </div>}


              <div className={` ${isExpandCodeEditor ? "" : "container-fluid pb-3"}`} ref={codeRef} style={{ zoom: dynamicHeight.dynamicWidth <= 1400 ? '111%' : "", backgroundColor: isExpandCodeEditor ? '#1e1e1e' : "" }}>
                {it.isCompleted && it.headerTitle === "Code" &&
                  <CodeEditor
                    value={studentProgramData}
                    courseIde={courseIde ? courseIde : 'JS'}
                    codeOutput={codeOutput}
                    isLoading={isLoadingSubmitButton}
                    isFromStudentTask
                    onSubmit={(code) => {

                      if ((courseIde === "HTML")) {

                        onSubmit(studentWrittenQuestion, studentProcedureData, studentFlowDiagramData, window.btoa(code))
                      }
                      else {

                        if (codeOutputData && codeOutputData?.status?.id !== 11) {

                          onSubmit(studentWrittenQuestion, studentProcedureData, studentFlowDiagramData, window.btoa(code))
                        }
                        else if (codeOutputData?.status?.id === 11) {


                          showToast('error', translate('editor.codeError')!)
                        }

                        else if ((code && !codeOutputData && !codeOutput)) {

                          showToast('info', translate('editor.noRunError')!)
                        }
                        else if (!code) {

                          showToast('info', translate('editor.noCodeError')!)
                        }

                        else {

                          onSubmit(studentWrittenQuestion, studentProcedureData, studentFlowDiagramData, window.btoa(code))
                        }
                        // dispatch(settingStudentProgramData(btoa(code)))
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

export { Landing };

