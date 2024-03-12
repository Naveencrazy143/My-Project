import { icons } from '@Assets';
import { Button, Card, Divider, DropDown, FormTypography, Image, Modal, useKeyPress } from '@Components';
import { DynamicHeight, useNavigation } from '@Hooks';
import { StudentBatchList } from '@Modules';
import { fetchBatchStudents, fetchCourseSections, fetchCourseTopics, fetchGetBatchCompletionEvent, getCourseBatchDetails, postAddBatch, postAddBatchCompletionEvent } from '@Redux';
import { ROUTES } from '@Routes';
import { getDisplayDateFromMoment, getImageUrl, showToast } from '@Utils';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';


const DROPDOWN_ITEM = [
    { id: 1, name: 'Assign starts from topic' }
]

function AssignBatchToStudent() {

    const dynamicHeight: any = DynamicHeight()
    const dispatch = useDispatch()
    const { goTo } = useNavigation()


    const { selectedBatchDetails, courseBatchDetails, currentPage, currentPage2, courseTopics, courseSections, batchCompletionEvents } = useSelector(
        (state: any) => state.DashboardReducer
    );
    const enterPress = useKeyPress('Enter')


    const [studentAddModal, setStudentAddModal] = useState(false)
    const [searchStudent, setSearchStudent] = useState('')
    const [searchAddedStudent, setSearchAddedStudent] = useState('')
    const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false)
    const [selectedSection, setSelectedSection] = useState("")
    const [selectedTopic, setSelectedTopic] = useState("")
    const [isUpdateSubmitLoader, setIsUpdateSubmitLoader] = useState(false)

    useEffect(() => {
        getCourseBatchDetailsData()
    }, [])

    useEffect(() => {

        if (enterPress && studentAddModal) {
            getBatchStudentList(currentPage)
        }


    }, [enterPress])

    useEffect(() => {
        getBatchCompletionEvent()
    }, [])

    const getCourseBatchDetailsData = () => {

        const params = {
            course_batch_id: selectedBatchDetails.id
        }
        dispatch(getCourseBatchDetails({
            params,
            onSuccess: (success: any) => () => {
            },
            onError: (error: string) => () => {
            },
        }))
    }

    const getBatchStudentList = (pageNumber: number) => {

        const params = {
            ...(searchStudent && { q: searchStudent }),
            page_number: pageNumber,
            batch_id: selectedBatchDetails.id
        }

        dispatch(fetchBatchStudents({
            params,
            onSuccess: (success: any) => () => {

            },
            onError: (error: string) => () => {
            },
        }))
    }

    // const getCourseBatchAddedStudents = (pageNumber: number) => {

    //     const params = {
    //         ...(searchAddedStudent && { q: searchAddedStudent }),
    //         page_number: pageNumber,
    //         batch_id: selectedBatchDetails.id
    //     }

    //     dispatch(fetchCourseBatchAddedStudents({
    //         params,
    //         onSuccess: (success: any) => () => {
    //             console.log("success============>", success)
    //         },
    //         onError: (error: string) => () => {
    //         },
    //     }))
    // }

    // to list course sections in a modal dropdown

    const getCourseSections = () => {
        const params = {
            course_id: selectedBatchDetails?.course?.id
        }
        dispatch(fetchCourseSections({
            params,
            onSuccess: (success: any) => () => {
                setIsUpdateModalOpen(true)
                // setSelectedTopic()

                // getCourseTopics()
            },
            onError: (error: any) => () => {
            },
        }))
    }


    // to list course topics in a modal dropdown
    const getCourseTopics = (id) => {
        const params = {
            course_section_id: id
        }
        dispatch(fetchCourseTopics({
            params,
            onSuccess: (success: any) => () => {

                setIsUpdateModalOpen(true)
            },
            onError: (error: any) => () => {
            },
        }))
    }

    const validationPoseParams = () => {
        if (!selectedSection) {
            showToast('error', "Please select section")
            return
        }
        else if (!selectedTopic) {
            showToast('error', "Please select topic")
            return
        } else {
            onSubmitTimeline()
        }
    }

    const onSubmitTimeline = () => {

        const params = {
            id: selectedBatchDetails?.id,
            topic_id: selectedTopic
        }
        setIsUpdateSubmitLoader(true)
        dispatch(postAddBatch({
            params,
            onSuccess: (success: any) => () => {
                addBatchCompletionEvent()
                setIsUpdateSubmitLoader(false)
                setIsUpdateModalOpen(false)
                setSelectedTopic('')
                setSelectedSection('')
            },
            onError: (error: any) => () => {
                setIsUpdateSubmitLoader(false)
                if (error?.status_code === 0) {
                    showToast('error', error.error_message)
                }
            },
        }))
    }

    const addBatchCompletionEvent = () => {
        const params = {
            event_type: "TPC",
            course_batch_id: selectedBatchDetails?.id
        }
        dispatch(postAddBatchCompletionEvent({
            params,
            onSuccess: (success: any) => () => {
                showToast("success", success.message)
                getBatchCompletionEvent()
            },
            onError: (error: any) => () => {
                if (error?.status_code === 0) {
                    showToast('error', error.error_message)
                }
            },
        }))
    }

    const getBatchCompletionEvent = () => {
        const params = {
            course_batch_id: selectedBatchDetails?.id
        }
        dispatch(fetchGetBatchCompletionEvent({
            params,
            onSuccess: (success: any) => () => {
                console.log("timeline success==>", success)
            },
            onError: (error: any) => () => {
                if (error?.status_code === 0) {
                    showToast('error', error.error_message)
                }
            },
        }))
    }



    return (

        <>
            <div className='row'>
                <div className='col-sm-6'>
                    <Card style={{ height: dynamicHeight.dynamicWidth <= 1400 ? dynamicHeight.dynamicHeight - 40 : dynamicHeight.dynamicHeight - 115 }}>
                        <div>
                            <div className='row justify-content-between px-3'>
                                <h3>{'Batch details'}</h3>
                                <div>
                                    <Button
                                        text={"Update"}
                                        onClick={() => {
                                            getCourseSections()
                                        }}
                                    />
                                    <i className="bi bi-pencil text-info pointer"
                                        onClick={() => {
                                            goTo('/dashboard' + ROUTES.ADMIN.BATCH_CREATION)
                                        }}
                                    ></i>
                                </div>
                            </div>
                            </div>
                            <div className='mt--3'>
                                <Divider />
                            </div>
                            <div className='overflow-auto scroll-hidden px-3 mt--3' style={{ height: dynamicHeight.dynamicWidth <= 1400 ? dynamicHeight.dynamicHeight - 122 : dynamicHeight.dynamicHeight - 197 }}>
                            <div className='row '>
                                <div className='col-sm-6'>
                                    <FormTypography title={'Batch name'} subTitle={courseBatchDetails && courseBatchDetails?.batch_name} />
                                </div>
                                <div className='col-sm-6'>
                                    <FormTypography title={'Batch code'} subTitle={courseBatchDetails && courseBatchDetails?.batch_code} />
                                </div>
                            </div>

                            <div className='row'>
                                <div className='col-sm-6'>
                                    <FormTypography title={'Batch start date'} subTitle={courseBatchDetails && getDisplayDateFromMoment(courseBatchDetails?.start_date)} />
                                </div>
                                <div className='col-sm-6'>
                                    <FormTypography title={'Batch end date'} subTitle={courseBatchDetails && getDisplayDateFromMoment(courseBatchDetails?.end_date)} />
                                </div>
                            </div>

                            <div className='row'>
                                <div className='col-sm-6'>
                                    <FormTypography title={'Course'} subTitle={courseBatchDetails && courseBatchDetails?.course?.name} />
                                </div>
                                <div className='col-sm-6'>
                                    <FormTypography title={'Students'} subTitle={courseBatchDetails && courseBatchDetails?.student_limit ? courseBatchDetails.student_count + "/" + courseBatchDetails?.student_limit : '-'} />
                                </div>
                            </div>

                            <div className='row'>
                                <div className='col-sm-6'>
                                    <FormTypography title={'Branch'} subTitle={courseBatchDetails && courseBatchDetails?.company_branch?.name} />
                                </div>
                            </div>

                            <div className='pt-2'>
                                <h5 className={`ct-title text-muted`} >{'Approvers'}</h5>

                                {
                                    courseBatchDetails && courseBatchDetails?.approver?.map((el: any) => {
                                        return (
                                            <>
                                                <div className='d-flex justify-content-between my-3'>
                                                    <div className='d-flex'>
                                                        <Image
                                                            variant={'rounded'}
                                                            alt="..."
                                                            src={el.photo ? getImageUrl(el?.photo) : icons.profile}
                                                        />
                                                        <h4 className='ml-2 mt-2'>{el?.name}</h4>
                                                    </div>

                                                </div>
                                            </>
                                        )
                                    })
                                }
                            </div>


                            <div className='pt-2 pb-3'>
                                <h5 className={`ct-title text-muted`} >{'Faculties'}</h5>

                                {
                                    courseBatchDetails && courseBatchDetails?.faculty?.map((el: any) => {
                                        return (
                                            <>
                                                <div className='d-flex justify-content-between my-3'>
                                                    <div className='d-flex'>
                                                        <Image
                                                            variant={'rounded'}
                                                            alt="..."
                                                            src={el.photo ? getImageUrl(el?.photo) : icons.profile}
                                                        />
                                                        <h4 className='ml-2 mt-2'>{el?.name}</h4>
                                                    </div>

                                                </div>
                                            </>
                                        )
                                    })
                                }
                            </div>
                        </div>
                    </Card>
                </div>

                {/* <div className='col-sm-6'>
                    <BatchTimeLine
                        heading={'Batch Timeline'}
                        data={batchCompletionEvents}
                    />
                </div> */}
                <div className='col-sm-6'>

                <StudentBatchList/>
                </div>

            </div>
            <Modal isOpen={isUpdateModalOpen} onClose={() => {
                setIsUpdateModalOpen(false)
                setSelectedTopic('')
                setSelectedSection('')
            }} title={`Completed till topic`} titleClassname={'font-weight-bold'}>
                <div className="mt--4 ml--1">
                    <DropDown
                        placeholder={"Course Sections"}
                        data={courseSections}
                        onChange={(e) => {
                            setSelectedSection(e.target.value)
                            getCourseTopics(e.target.value)
                        }}
                        value={selectedSection}
                    />
                </div>
                <div className="mt-4 ml--1">
                    <DropDown
                        placeholder={"Course Topics"}
                        data={courseTopics}
                        onChange={(e) => {
                            setSelectedTopic(e.target.value)
                        }}
                        value={selectedTopic}
                    />
                </div>
                <div className='text-right mt-4'>
                    <Button
                        text={'Submit'}
                        isLoading={isUpdateSubmitLoader}
                        onClick={() => {
                            validationPoseParams()
                        }}
                    />
                </div>
            </Modal>
        </>

    )
}

export { AssignBatchToStudent };

