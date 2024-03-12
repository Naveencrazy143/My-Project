import { Button, Card, Modal, StepContainer, useKeyPress } from '@Components';
import { useLoader, useNavigation } from '@Hooks';
import { translate } from '@I18n';
import { CodeEditor, CommentSection, FlowDiagramHeader, HeaderNavbar, ListComponent, Procedure, Question } from '@Modules';
import { fetchStudentCourseTaskDetailsFaculty, fetchTaskDetails, fetchTaskEvents, getMessageEvents, getStudentTaskData, postGenericCrudDetails, postSubmitTaskApprovalByFaculty, postTaskEvent, settingStudentFlowDiagramData, settingStudentProcedureData, settingStudentProgramData, settingStudentWrittenQuestion } from '@Redux';
import { ROUTES } from '@Routes';
import { showToast } from '@Utils';
import { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from "react-redux";

function ViewStudentTaskDetails() {
    const questionRef = useRef<HTMLDivElement>(null)
    const procedureRef = useRef<HTMLDivElement>(null)
    const codeRef = useRef<HTMLDivElement>(null)
    const flowDiagramRef = useRef<HTMLDivElement>(null)
    const viewStudentTaskDetailsLoader = useLoader(false)
    const getStudentCourseTaskDetailsLoader = useLoader(false)
    const [isPopUp, setIsPopUp] = useState(false)
    const enterPress = useKeyPress('Enter')


    const [message, setMessage] = useState<string>('')

    const onApproveLoader = useLoader(false)
    const onCommentLoader = useLoader(false)
    const { goBack, goTo } = useNavigation()


    const onRejectLoader = useLoader(false)

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
            isCompleted: true
        },
        {
            headerTitle: "FlowDiagram",
            headerRef: flowDiagramRef,
            headerID: "flowDiagram",
            href: 'FlowDiagram',
            isCompleted: true
        },

        {
            headerTitle: "Code",
            headerRef: codeRef,
            headerID: "code",
            href: 'Code',
            isCompleted: true
        },
    ]);

    const dispatch = useDispatch();

    const { viewStudentTaskId,
        studentProcedureData, studentWrittenQuestion, studentFlowDiagramData, studentProgramData, dashboardDetails, courseIde, MessageEvents
    } = useSelector(
        (state: any) => state.DashboardReducer);


    const { studentTaskData } = useSelector((state: any) => state.AppReducer);
    const [studentProgramCode, setStudentProgramCode] = useState<any>()
    const [codeOutput, setCodeOutput] = useState('')


    const [isApproveModal, setIsApproveModal] = useState(false)
    const [statusText, setStatusText] = useState('')
    const modalLoader = useLoader(false)
    const [isRefresh, setIsRefresh] = useState(false)



    useEffect(() => {
        if (enterPress && message.trim().length > 0 && isPopUp) {
            addTaskEvent()
        }

    }, [enterPress])

    // console.log("studentTaskData===>",studentTaskData)

    useEffect(() => {

        viewStudentTaskDetailsLoader.showLoader()
        const params = {
            task_meta_id: studentTaskData?.route_type === 'TASK_SUBMISSION_AD'
                ? studentTaskData?.route_params?.task_meta_id
                : studentTaskData?.route_params?.task_meta_id
                    ? studentTaskData?.route_params?.task_meta_id
                    : viewStudentTaskId?.details[0]?.course_details?.course_topic?.task_meta_id
        }

        dispatch(fetchTaskDetails({
            params,
            onSuccess: (success: any) => () => {
                // console.log("suucuucc==>",success)
                viewStudentTaskDetailsLoader.hideLoader()
                // setStudentProgramCode(success?.details?.task_answer_details?.program)
                // dispatch(settingStudentProgramData(success?.details?.task_answer_details?.program !== null && atob(success?.details?.task_answer_details?.program)))

            },
            onError: (error: string) => () => {
                viewStudentTaskDetailsLoader.hideLoader()
            }
        }))

    }, [])

    useEffect(() => {
        getStudentCourseTaskDetailsFaculty()

        if (studentTaskData !== null && studentTaskData?.route_type === "FACULTY_CHAT") {
            setIsPopUp(!isPopUp)
        }

        return () => {
            dispatch(getStudentTaskData(null))
        }
    }, [])

    useEffect(() => {
        getTaskEvents()
    }, [])

    const getStudentCourseTaskDetailsFaculty = () => {

        getStudentCourseTaskDetailsLoader.showLoader()

        const params = {
            student_task_meta_id: studentTaskData?.route_type === 'TASK_SUBMISSION_AD'
                ? studentTaskData?.route_params?.reference_id
                : studentTaskData?.route_params?.student_course_task_meta_id
                    ? studentTaskData.route_params.student_course_task_meta_id
                    : viewStudentTaskId?.student_course_task_meta_id
        }
        dispatch(fetchStudentCourseTaskDetailsFaculty({
            params,
            onSuccess: (success: any) => () => {
                console.log("succeesssssss===>", success)
                // console.log("successdetails==?",success.details)
                getStudentCourseTaskDetailsLoader.hideLoader()
                dispatch(settingStudentWrittenQuestion(success?.details?.details?.formulated_question ? success?.details?.details?.formulated_question : ''))
                dispatch(settingStudentProcedureData(success?.details?.details?.procedure ? success?.details?.details?.procedure : []))
                dispatch(settingStudentFlowDiagramData(success?.details?.details?.image_of_flow_diagram ? success?.details?.details?.image_of_flow_diagram : ''))
                dispatch(settingStudentProgramData(success?.details?.details?.program ? atob(success?.details?.details?.program) : ""))
                setStudentProgramCode(atob(success?.details?.details?.program))

                let dataString = success?.details?.details?.code_output
                // console.log("dattataa====>",dataString)
                // Replace single quotes with double quotes in code_output string
                let jsonString = dataString.replace(/'/g, '"');

                // Replace None with null in the JSON string. coz None is for python.
                jsonString = jsonString.replace(/None/g, 'null');

                // Parse the updated JSON string
                let parseObj = JSON.parse(jsonString);
                setCodeOutput(parseObj)

            },
            onError: (error: string) => () => {
                getStudentCourseTaskDetailsLoader.hideLoader()
            }
        }))
    }

    // approve task api
    const onApprove = () => {

        onApproveLoader.showLoader()

        const params = {
            id: studentTaskData?.route_type === 'TASK_SUBMISSION_AD'
                ? studentTaskData?.route_params?.reference_id
                : studentTaskData?.route_params?.student_course_task_meta_id
                    ? studentTaskData.route_params.student_course_task_meta_id
                    : viewStudentTaskId?.student_course_task_meta_id,
            is_approved: true,
            is_rejected: false,
            is_submitted: false,
        }

        modalLoader.showLoader()
        dispatch(postSubmitTaskApprovalByFaculty({
            params,
            onSuccess: (success: any) => () => {
                modalLoader.hideLoader()
                setIsApproveModal(false)
                showToast('success', success.message)
                dispatch(settingStudentWrittenQuestion(''))
                dispatch(settingStudentProcedureData([]))
                dispatch(settingStudentFlowDiagramData(''))
                dispatch(settingStudentProgramData(""))
                postTimelineCourseEvent('APD')
                goBack()

            },
            onError: (error: any) => () => {
                modalLoader.hideLoader()
                if (error?.status_code === 0) {
                    showToast('error', error?.error_message)
                }
            },
        }))
    }

    // posting timeline details for approval 
    const postTimelineCourseEvent = (type: string) => {

        const params = {
            task_status_type: type,
            id: studentTaskData?.route_type === 'TASK_SUBMISSION_AD'
                ? studentTaskData?.route_params?.reference_id
                : studentTaskData?.route_params?.student_course_task_meta_id
                    ? studentTaskData.route_params.student_course_task_meta_id
                    : viewStudentTaskId?.student_course_task_meta_id,
        }

        dispatch(postTaskEvent({
            params,
            onSuccess: (success: any) => () => {
            },
            onError: (error: any) => () => {
                if (error?.status_code === 0) {
                    showToast('error', error?.error_message)
                }
            },
        }))
    }

    // reject task api
    const onReject = () => {
        onRejectLoader.showLoader()
        const params = {
            id: studentTaskData?.route_type === 'TASK_SUBMISSION_AD'
                ? studentTaskData?.route_params?.reference_id
                : studentTaskData?.route_params?.student_course_task_meta_id
                    ? studentTaskData.route_params.student_course_task_meta_id
                    : viewStudentTaskId?.student_course_task_meta_id,
            is_approved: false,
            is_rejected: true,
            is_submitted: false,
        }

        modalLoader.showLoader()

        dispatch(postSubmitTaskApprovalByFaculty({
            params,
            onSuccess: (success: any) => () => {
                modalLoader.hideLoader()
                setIsApproveModal(false)
                showToast('success', success.message)
                dispatch(settingStudentWrittenQuestion(''))
                dispatch(settingStudentProcedureData([]))
                dispatch(settingStudentFlowDiagramData(''))
                dispatch(settingStudentProgramData(""))
                postTimelineCourseEvent('RJD')
                goBack()
            },
            onError: (error: any) => () => {
                modalLoader.hideLoader()
                if (error?.status_code === 0) {
                    showToast('error', error?.error_message)
                }
            },
        }))
    }

    const addTaskEvent = () => {
        onCommentLoader.showLoader()
        const params = {
            message_scope: "TSK",
            id: studentTaskData?.route_type === 'TASK_SUBMISSION_AD'
                ? studentTaskData?.route_params?.reference_id
                : studentTaskData?.route_params?.student_course_task_meta_id
                    ? studentTaskData.route_params.student_course_task_meta_id
                    : viewStudentTaskId?.student_course_task_meta_id,
            message: message,
            event_type: "TEM"
        }
        dispatch(postTaskEvent({
            params,
            onSuccess: (success: any) => () => {
                onCommentLoader.hideLoader()
                getTaskEvents()
                setMessage('')
            },
            onError: (error: any) => () => {
                onCommentLoader.hideLoader()
                if (error?.status_code === 0) {
                    showToast('error', error?.error_message)
                }
            },

        }))
    }

    const getTaskEvents = () => {

        const params = {
            student_course_task_meta_id: studentTaskData?.route_type === 'TASK_SUBMISSION_AD'
                ? studentTaskData?.route_params?.reference_id
                : studentTaskData?.route_params?.student_course_task_meta_id
                    ? studentTaskData.route_params.student_course_task_meta_id
                    : viewStudentTaskId?.student_course_task_meta_id,
            message_scope: "TSK",
        }
        setIsRefresh(true)
        dispatch(fetchTaskEvents({
            params,
            onSuccess: (success: any) => () => {
                const filteredMessage = success?.details && success?.details.length > 0 && success?.details.filter((item) => {
                    if (item.message !== null && item.message !== '') {
                        return item.message
                    }
                })
                dispatch(getMessageEvents(filteredMessage))
                setIsRefresh(false)
                onCommentLoader.hideLoader()
            },
            onError: (error) => () => {
                setIsRefresh(false)
                onCommentLoader.hideLoader()
            },

        }))
    }

    console.log("studencodeee==>",studentProgramCode)
    console.log("studencodeee111", studentProgramData)

    return (
        <div className='m-0 p-0'>
            <div className='' style={{
                position: 'fixed',
                bottom: '0',
                zIndex: '9'
            }}>
                <CommentSection
                    message={MessageEvents}
                    onChange={(e) => setMessage(e.target.value)}
                    onClick={() => {
                        if (message.trim().length > 0 && isPopUp) {
                            addTaskEvent()
                        }
                    }}
                    value={message}
                    onRefresh={() => getTaskEvents()}
                    isLoading={isRefresh}
                    messageLength={message}
                    isPopUp={isPopUp}
                    onPopUp={() => setIsPopUp(!isPopUp)}
                    id={studentTaskData?.route_type === 'TASK_SUBMISSION_AD'
                        ? studentTaskData?.route_params?.reference_id
                        : studentTaskData?.route_params?.student_course_task_meta_id
                            ? studentTaskData.route_params.student_course_task_meta_id
                            : viewStudentTaskId?.student_course_task_meta_id}
                />
            </div>
            <HeaderNavbar navHeader={navHeader} />


            {navHeader.map((it, index) => {
                return (
                    <>
                        {it.isCompleted && it.headerTitle === "Questions" &&
                            <div ref={questionRef} className='mt-6'>
                                <Question
                                    value={studentWrittenQuestion}
                                    showAddSubmit
                                    isPendingApproval
                                />
                            </div>}

                        {it.isCompleted && it.headerTitle === "Procedure" &&
                            <div className='container-fluid col-sm-12 px-4' ref={procedureRef}>
                                <ListComponent data={studentProcedureData} title={'Procedure'} />
                            </div>}

                        {it.isCompleted && it.headerTitle === "FlowDiagram" &&
                            <div ref={flowDiagramRef}>
                                <FlowDiagramHeader
                                    img={studentFlowDiagramData}
                                    showAddSubmit
                                />
                                {/* <FlowDiagramHeader img={flowDiagram} /> */}
                            </div>}

                        {it.isCompleted && it.headerTitle === "Code" &&
                            <div ref={codeRef} className='mx-3'>
                                <CodeEditor
                                    showExpand
                                    courseIde={courseIde}
                                    codeOutput={codeOutput}
                                    value={studentProgramCode ? studentProgramCode : studentProgramData}
                                    showAddSubmit
                                />
                            </div>}
                    </>
                )
            })}

            <div className='text-right pb-3 mr-4 pr-2 mt-3'>
                <Button
                    color={'danger'}
                    size={'md'}
                    text={translate('course.reject')}
                    // isLoading={onRejectLoader.loader}
                    onClick={() => {
                        setStatusText('Reject')
                        setIsApproveModal(!isApproveModal)
                        // onReject()
                    }}
                />
                <Button

                    text={translate('course.approve')}
                    size={'md'}
                    onClick={() => {
                        setStatusText('Approve')
                        setIsApproveModal(!isApproveModal)
                        // onApprove()
                    }}
                />
            </div>
            <Modal isOpen={isApproveModal} onClose={() => setIsApproveModal(!isApproveModal)} size={'sm'}
                title={`Do you want to ${statusText} this task?`} titleClassname={'text-muted fw-light'}
                isModalLoading={modalLoader.loader}
            >
                <div className='mt--4'>
                    <h3>{viewStudentTaskId?.details[0]?.course_details?.course_topic?.task_meta_name}</h3>
                </div>
                <div className='text-right'>
                    <Button
                        color={'secondary'}
                        text={translate('common.cancel')}
                        onClick={() => { setIsApproveModal(!isApproveModal) }}
                    />
                    <Button

                        text={'Proceed'}
                        onClick={() => {

                            if (statusText === 'Approve') {
                                onApprove()
                            }
                            else {
                                onReject()
                            }
                        }}
                    />
                </div>
            </Modal>

        </div>
    )
}

export { ViewStudentTaskDetails };
