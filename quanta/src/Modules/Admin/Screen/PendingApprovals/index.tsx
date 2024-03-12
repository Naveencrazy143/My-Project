import { icons } from '@Assets';
import { Button, Card, CommonTable, DateTimePicker, DropDown, Input, Modal, NoRecordsFound, Image, Checkbox } from '@Components';
import { DynamicHeight, useLoader, useNavigation, } from '@Hooks';
import { translate } from '@I18n';
import { courseIdeType, fetchApproverList, fetchStudentCourseTaskDetailsFaculty, fetchStudentCourseTasksFaculty, getStudentTaskData, isBackNavigation, postStudentCourseTasksDetails, settingStudentFlowDiagramData, settingStudentProcedureData, settingStudentProgramData, settingStudentWrittenQuestion, viewStudentTaskDetailsId } from '@Redux';
import { ROUTES } from '@Routes';
import { convertDurationToTime, getImageUrl, showToast } from '@Utils';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { GetLinkedInCommunityCard, GetMockInterviewCard, GetPageCard, GetSoftwareDevelopmentCard, GetSoftwareScreeningCard, GetVideoScreeningCard } from '../../Container/PendingApprovalTaskMetaCard';

const TIME_DURATION = [
    { id: '15 min', name: '15 min', value: '15 min' },
    { id: '30 min', name: '30 min', value: '30 min' },
    { id: '45 min', name: '45 min', value: '45 min' },
    { id: '1 hr', name: '1 hr', value: '1 hr' },
    { id: '1 hr 30 min', name: '1 hr 30 min', value: '1 hr 30 min' },
    { id: '2 hr', name: '2 hr', value: '2 hr' },
]

function PendingApprovals() {

    const dynamicHeight = DynamicHeight()


    const { studentCourseTasksFaculty, isBack, approverListData, dashboardDetails } = useSelector(
        (state: any) => state.DashboardReducer
    );

    console.log("dashboardDetails", dashboardDetails);


    const [isOpenScheduleModal, setIsOpenScheduleModal] = useState(false)
    const [selectedItem, setSelectedItem] = useState<any>(undefined)
    const [timeDuration, setTimeDuration] = useState("")
    const [startDate, setStartDate] = useState<any>()
    const [endDate, setEndDate] = useState<any>("")
    const [selectedPanelList, setSelectedPanelList] = useState([])
    const [isApproverModal, setIsApproverModal] = useState(false)
    const [submitLoader, setSubmitLoader] = useState(false)
    const [isIncludeMe, setIsIncludeMe] = useState(false)
    const [title, setTitle] = useState('')


    const PendingApprovalsLoader = useLoader(false)

    useEffect(() => {

        PendingApprovalsLoader.showLoader()
        getStudentTaskItemsFaculty()

    }, [])

    const getStudentTaskItemsFaculty = () => {
        const params = {}
        dispatch(fetchStudentCourseTasksFaculty({   //getStudentTaskItemsFaculty api
            params,
            onSuccess: (success: any) => () => {
                PendingApprovalsLoader.hideLoader()
            },
            onError: (error) => () => {
                PendingApprovalsLoader.hideLoader()
            }
        }))
    }

    const { goTo } = useNavigation()
    const dispatch = useDispatch()

    const getStudentCourseTaskDetailsFaculty = (id) => {

        const params = {
            student_task_meta_id: id,
        }

        dispatch(fetchStudentCourseTaskDetailsFaculty({  //getStudentCourseTaskMetaDetailsFaculty api
            params,
            onSuccess: (success: any) => () => {
                dispatch(settingStudentProgramData(success?.details?.details?.program !== null ? atob(success?.details?.details?.program) : ""))
                goTo('/dashboard' + ROUTES.ADMIN.VIEW_STUDENT_TASK_DETAILS, false)
            },
            onError: (error: any) => () => {
            }
        }))
    }

    const getApproverList = () => {

        const params = {}
        dispatch(fetchApproverList({
            params,
            onSuccess: (success: any) => () => {
            },
            onError: (error: any) => () => {
            },
        }))
    }

    const validatePostParams = () => {

        if (!startDate) {
            showToast('error', 'Please select start date and time for interview')
            return false
        }
        else if (!endDate) {
            showToast('error', 'Please select end date and time for interview')
            return false
        }
        else if (selectedPanelList.length === 0 && approversIds.length === 0) {
            showToast('error', 'Please select atleast one interviewer')
            return false
        }
        else {
            return true
        }
    }

    let approversIds: any

    const onScheduleInterview = () => {

        approversIds = selectedPanelList.map((el: any) => { return el.id })

        if (isIncludeMe) {
            approversIds.push(dashboardDetails.user_details.employee_id)
        }

        const params = {
            id: selectedItem?.student_course_task_meta_id,
            is_requested: false,
            is_approval_required: false,
            is_scheduled: true,
            schedule_start_time: startDate,
            schedule_end_time: endDate,
            panel_ids: [...approversIds]
        }

        if (validatePostParams()) {
            dispatch(postStudentCourseTasksDetails({
                params,
                onSuccess: (success) => () => {
                    setSubmitLoader(false)
                    setStartDate('')
                    setEndDate('')
                    setIsIncludeMe(false)
                    setSelectedPanelList([])
                    setIsOpenScheduleModal(!isOpenScheduleModal)
                    getStudentTaskItemsFaculty()
                    showToast('success', 'Mock interview scheduled successfully')
                },
                onError: (error: any) => () => {
                    setSubmitLoader(false)
                    showToast('error', error?.error_message)
                }
            }))
        }
    }

    const addSelectedPanel = (item: any) => {
        let updateSelectedPanels = [...selectedPanelList];

        const isExists = updateSelectedPanels?.some(
            (el: any) => el.id === item.id
        );

        if (isExists) {
            updateSelectedPanels = updateSelectedPanels?.filter(
                (eachItem: any) => eachItem.id !== item.id
            );
        }
        else {
            updateSelectedPanels = [...updateSelectedPanels, item as never];
        }

        setSelectedPanelList(updateSelectedPanels as never)
    };


    const getNormalizedTaskMetaTypeCard = (item, index) => {

        const type = item.task_meta_type

        switch (type) {
            case "SWD":

                return <GetSoftwareDevelopmentCard 
                    data={item}
                    buttonOnClick={() => {
                        dispatch(courseIdeType(item?.details[0]?.course_ide?.name))
                        dispatch(isBackNavigation(false))
                        dispatch(settingStudentWrittenQuestion(''))
                        dispatch(settingStudentProcedureData([]))
                        dispatch(settingStudentFlowDiagramData(''))
                        dispatch(getStudentTaskData(null))
                        dispatch(viewStudentTaskDetailsId(item))
                        getStudentCourseTaskDetailsFaculty(item.student_course_task_meta_id)
                    }}
                />

            case "VDO":

                return <GetVideoScreeningCard
                    data={item}
                />

            case "PGE":
                return <GetPageCard
                    data={item}
                />

            case "LC":

                return <GetLinkedInCommunityCard
                    data={item}
                />

            case "MI":
                return <GetMockInterviewCard
                    data={item}
                    buttonOnClick={() => {
                        setSelectedItem(item)
                        getApproverList()
                        setTitle(item?.details[0]?.mi_details?.title)
                        setTimeDuration(item?.details[0]?.mi_details?.duration)
                        setIsOpenScheduleModal(!isOpenScheduleModal)
                    }}
                />
            case "AI":
                return <GetSoftwareScreeningCard
                    data={item}
                    buttonOnClick={() => { }}
                />

            case "SCR":
                return <GetSoftwareScreeningCard
                    data={item}
                    buttonOnClick={() => {
                        setSelectedItem(item)
                        getApproverList()
                        setTitle(item?.details[0]?.manual_screening_details?.title)
                        setTimeDuration(item?.details[0]?.manual_screening_details?.duration)
                        setIsOpenScheduleModal(!isOpenScheduleModal)
                    }}
                />
            default:
        }
    }

    return (
        <>
            <div className='container-fluid pt-4 '>
                <div className='pb-3 pl-xl-0 pl-sm-0 pl-2'>
                    <h3>{translate('course.pendingApprovals')} </h3>
                </div>
                {/* <Card> */}
                {studentCourseTasksFaculty && studentCourseTasksFaculty?.length > 0 ?
                    // <div className=" overflow-auto " style={{ marginLeft: '-39px', marginRight: '-39px' }}>
                    //     <CommonTable displayDataSet={normalizedTaskData(studentCourseTasksFaculty)}
                    //     />
                    // </div>

                    <div className='overflow-auto scroll-hidden ' style={{ height: dynamicHeight.dynamicWidth <= 1400 ? dynamicHeight.dynamicHeight - 40 : dynamicHeight.dynamicHeight - 105 }}>
                        {studentCourseTasksFaculty.map((el, index) => {
                            return (
                                <>
                                    {getNormalizedTaskMetaTypeCard(el, index)}
                                </>
                            )
                        })}
                    </div>
                    : <div className='d-flex justify-content-center align-items-center' style={{ height: dynamicHeight.dynamicWidth <= 1400 ? dynamicHeight.dynamicHeight - 100 : dynamicHeight.dynamicHeight - 150 }} ><NoRecordsFound /></div>
                }
                {/* </Card> */}
            </div>

            <Modal
                isOpen={isOpenScheduleModal}
                onClose={() => {
                    setIsOpenScheduleModal(!isOpenScheduleModal)
                    setStartDate('')
                    setEndDate('')
                    setIsIncludeMe(false)
                    setSelectedPanelList([])
                }}
            >
                <div>
                    <Input
                        heading={'Title'}
                        placeholder={'Title'}
                        value={title}
                        disabled={true}
                    />
                </div>

                <div>
                    <DropDown
                        heading={'Time Duration'}
                        placeholder={'Time Duration'}
                        id={"Time Duration"}
                        data={TIME_DURATION}
                        onChange={(e) => {
                            setTimeDuration(e.target.value)
                        }}
                        value={timeDuration}
                    />
                </div>

                <div className='mt-3'>
                    <DateTimePicker
                        disableFuture
                        type={'both'}
                        heading={'Start date and time'}
                        placeholder={'Start date and time'}
                        onChange={(e) => {
                            setStartDate(e)
                        }}
                        initialValue={startDate}
                    />
                </div>

                <div>
                    <DateTimePicker
                        disableFuture
                        type={'both'}
                        heading={'End date and time'}
                        placeholder={'End date and time'}
                        onChange={(e) => { setEndDate(e) }}
                        initialValue={endDate}
                    />
                </div>
                <div className=''>
                    <div className='d-flex pt-2 justify-content-between'>
                        <div className='ml-2 row'>
                            <h4>{translate('assignCourseToStudent.approver')!}</h4>
                            <div className='col'>
                                <Button
                                    text={'Add'}
                                    onClick={() => {
                                        getApproverList()
                                        setIsApproverModal(!isApproverModal)
                                    }}
                                />
                            </div>
                        </div>

                        <div className='' >
                            <Checkbox
                                id='1'
                                text={'Include me'}
                                variant={'info'}
                                checked={isIncludeMe}
                                defaultChecked={false}
                                onCheckChange={() => {
                                    setIsIncludeMe(!isIncludeMe)
                                }}
                            />
                        </div>
                    </div>

                    <div className='mt-3'>
                        {
                            selectedPanelList && selectedPanelList.length > 0 && selectedPanelList.map((el: any) => {
                                return (
                                    <>
                                        <div className='d-flex justify-content-between my-3'>
                                            <div className='d-flex'>
                                                <Image
                                                    variant={'rounded'}
                                                    alt="..."
                                                    src={el.photo ? getImageUrl(el.photo) : icons.profile}
                                                />
                                                <h4 className='ml-2 mt-2'>{el.name}</h4>
                                            </div>
                                            <div>
                                                <i className="bi bi-x-circle-fill pointer text-danger"
                                                    onClick={() => {
                                                        const filteredApprover = selectedPanelList?.filter((it: any) => it.id !== el.id)
                                                        setSelectedPanelList(filteredApprover)
                                                    }}></i>
                                            </div>
                                        </div>
                                    </>
                                )
                            })
                        }
                    </div>
                </div>

                <div className='text-right'>
                    <Button
                        isLoading={submitLoader}
                        text={translate('common.submit')!}
                        onClick={() => { onScheduleInterview() }}
                    />
                </div>

            </Modal>

            <Modal
                margin={'ml-1'}
                title={'Approvers'}
                isOpen={isApproverModal}
                onClose={() => {
                    setIsApproverModal(!isApproverModal)
                }}>

                <div className='mt--4'>
                    {approverListData && approverListData?.map((el: any) => {
                        const isActive = selectedPanelList?.some((item: any) => item.id === el.id)

                        return (
                            <div className='d-flex justify-content-between my-4'>
                                <div className='col-xl-6 col-sm-0 '>
                                    <h3>{el.name}</h3>
                                </div>
                                <td className="col-xl-2 col-sm-0 mt-sm-0" style={{ whiteSpace: "pre-wrap" }}>
                                    <i className={`bi bi-${isActive ? 'check-circle-fill text-success' : 'circle-fill text-light'}`}
                                        onClick={() => {
                                            addSelectedPanel(el)
                                        }}
                                    ></i>


                                </td>

                            </div>
                        )
                    })}
                </div>
            </Modal>
        </>
    )
}

export { PendingApprovals };