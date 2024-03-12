import { icons } from '@Assets';
import { Button, Card, DropDownMenu, Input, Pagination, useKeyPress, Image, Modal, DropDown, Divider } from '@Components';
import { useNavigation, DynamicHeight } from '@Hooks';
import { translate } from '@I18n';
import { assignCourseBatchToStudent, fetchBatchStudents, fetchCourseBatchAddedStudents, fetchCourseTopics, fetchStudentsList } from '@Redux';
import { getDisplayDateFromMoment, getImageUrl, showToast } from '@Utils';
import moment from 'moment';
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';




const DROPDOWN_ITEM = [
    { id: 1, name: 'Assign starts from topic' }
]

function StudentBatchList() {
    const { selectedBatchDetails, courseBatchDetails, currentCourse, courseTopics, batchStudentListData, currentPage, numOfPages, courseBatchAddedStudentsList, currentPage2, numOfPages2 } = useSelector(
        (state: any) => state.DashboardReducer
    );

    const dynamicHeight: any = DynamicHeight()
    const dispatch = useDispatch()
    const { goTo } = useNavigation()


    const date = moment().format("YYYY-MM-DD")
    const enterPress = useKeyPress('Enter')

    const [studentAddModal, setStudentAddModal] = useState(false)
    const [isOpenAssignTopic, setIsOpenAssignTopic] = useState(false)
    const [isModalLoading, setIsModalLoading] = useState(false)
    const [selectedStudentId, setSelectedStudentId] = useState('')
    const [topicId, setTopicId] = useState('')
    const [assignTopicLoading, setAssignTopicLoading] = useState(false)
    const [searchStudent, setSearchStudent] = useState('')
    const [searchAddedStudent, setSearchAddedStudent] = useState('')




    useEffect(() => {
        getCourseBatchAddedStudents(1)
    }, [])


    useEffect(() => {

        if (enterPress && studentAddModal) {
            getBatchStudentList(currentPage)
        }

        if (enterPress && !studentAddModal) {
            getCourseBatchAddedStudents(currentPage2)
        }
    }, [enterPress])



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


    const getCourseBatchAddedStudents = (pageNumber: number) => {

        const params = {
            ...(searchAddedStudent && { q: searchAddedStudent }),
            page_number: pageNumber,
            batch_id: selectedBatchDetails.id
        }

        dispatch(fetchCourseBatchAddedStudents({
            params,
            onSuccess: (success: any) => () => {
                console.log("success============>", success)
                console.log("nottu=======>", success)

            },
            onError: (error: string) => () => {
            },
        }))
    }

    const onAssignStudentToBatch = (studentId: string, key: string, removeId?: string) => {

        const params = {
            start_date: date,
            base_status: "CR",
            employee_company_id: studentId,
            course_batch_id: selectedBatchDetails.id,
            is_added: key == 'Add' ? true : false,
            ...(removeId && { id: removeId })
        }

        setIsModalLoading(true)
        dispatch(assignCourseBatchToStudent({
            params,
            onSuccess: (success: any) => () => {
                if (key == 'Add') {
                    showToast('success', 'Student added to this batch successfully')
                }
                else {
                    showToast('success', 'Student removed from this batch successfully')
                }
                setIsModalLoading(false)
                // getCourseBatchAddedStudents(currentPage)
                getBatchStudentList(currentPage)
                getStudentsList()
            },
            onError: (error: string) => () => {
                setIsModalLoading(false)
            },
        }))
    }

    const getCourseTopics = (id) => {

        const params = {
            course_section_id: id
        }

        dispatch(fetchCourseTopics({
            params,
            onSuccess: (success: any) => () => {
            },
            onError: (error: any) => () => {
            },
        }))
    }


    const assignStudentStartFromTopic = () => {

        const params = {
            id: selectedStudentId,
            starts_from_topic_id: topicId
        }

        setAssignTopicLoading(true)
        dispatch(assignCourseBatchToStudent({
            params,
            onSuccess: (success: any) => () => {
                showToast('success', success.message)
                setAssignTopicLoading(false)
                setIsOpenAssignTopic(!isOpenAssignTopic)
                getBatchStudentList(currentPage)
            },
            onError: (error: string) => () => {
                setAssignTopicLoading(false)
            },
        }))
    }


    function paginationHandler(
        type: "next" | "prev" | "current",
        position?: number
    ) {
        let page =
            type === "next"
                ? currentPage + 1
                : type === "prev"
                    ? currentPage - 1
                    : position;
        getBatchStudentList(page);
    }


    function paginationHandler2(
        type: "next" | "prev" | "current",
        position?: number
    ) {
        let page =
            type === "next"
                ? currentPage2 + 1
                : type === "prev"
                    ? currentPage2 - 1
                    : position;
        getCourseBatchAddedStudents(page);
    }

    // to update student list with course

    const getStudentsList = () => {
        const params = {
        }

        dispatch(fetchStudentsList({
            params,
            onSuccess: (success: any) => () => {
            },
            onError: (error: any) => () => {
            },
        }))
    }


    return (
        <div className='pb-4'>
            <div className=''>
                <Card className=' mt-0 col-sm-12' style={{ height: dynamicHeight.dynamicWidth <= 1400 ? dynamicHeight.dynamicHeight - 40 : dynamicHeight.dynamicHeight - 115 }}>
                    <div className='row'>
                        <div className='col'>
                            <h3>{'Batch Students'}</h3>
                        </div>
                        <div className='float-right pr-3'>
                            <Button
                                text={'Add Student'}
                                onClick={() => {
                                    getBatchStudentList(currentPage)
                                    setStudentAddModal(!studentAddModal)
                                }}
                            />
                        </div>
                    </div>
                    <div className='col-sm-8 ml--3 mt-3'>
                        <Input
                            // heading={'Search Student'}
                            placeholder={'Search student'}
                            value={searchAddedStudent}
                            onChange={(e) => {
                                setSearchAddedStudent(e.target.value)
                            }}
                        />
                    </div>

                    <div className='overflow-auto scroll-hidden pb-4 mt--3' style={{ height: dynamicHeight.dynamicWidth <= 1400 ? dynamicHeight.dynamicHeight - 220 : dynamicHeight.dynamicHeight - 310 }}>
                        {
                            courseBatchAddedStudentsList && courseBatchAddedStudentsList.length > 0 && courseBatchAddedStudentsList.map((el: any) => {
                                return (
                                    <>
                                        <div className='d-flex justify-content-between my-4'>
                                            <div className='d-flex'>
                                                <Image
                                                    variant={'rounded'}
                                                    alt="..."
                                                    src={el.photo ? getImageUrl(el.photo) : icons.profile}
                                                />
                                                <h4 className='ml-2 mt-2'>{el.name}</h4>
                                            </div>
                                            <div>
                                                <DropDownMenu
                                                    data={DROPDOWN_ITEM}
                                                    onItemClick={() => {
                                                        setSelectedStudentId(el?.Batch_student?.id)
                                                        setIsOpenAssignTopic(!isOpenAssignTopic)
                                                    }}
                                                />
                                            </div>
                                        </div>
                                    </>
                                )
                            })
                        }


                    </div>
                    <div className='mb--3' style={{
                        position: "relative"
                    }} >

                        {courseBatchAddedStudentsList && courseBatchAddedStudentsList.length > 0 && (
                            <Pagination
                                additionalClass='pb-3'
                                currentPage={currentPage2}
                                noOfPage={numOfPages2}
                                totalPages={numOfPages2}
                                paginationNumberClick={(currentPage: number | undefined) => {
                                    paginationHandler2("current", currentPage);
                                }}
                                previousClick={() => paginationHandler2("prev")}
                                nextClick={() => paginationHandler2("next")}
                            />
                        )}
                    </div>
                </Card>
            </div>

            {/* Student add modal */}

            <Modal
                title={'Students'}
                isOpen={studentAddModal}
                onClose={() => {
                    setStudentAddModal(!studentAddModal)
                    getCourseBatchAddedStudents(currentPage2)
                }}
                isModalLoading={isModalLoading}

            >
                <div className='col-sm-8 ml--2'>
                    <Input
                        // heading={'Search Student'}
                        placeholder={'Search student'}
                        value={searchStudent}
                        onChange={(e) => {
                            setSearchStudent(e.target.value)
                        }}
                    />
                </div>
                {batchStudentListData && batchStudentListData?.map((el: any) => {
                    console.log("elemrnt==>", el)

                    const isBatch = el?.batch_student && el?.batch_student?.filter((el) => el.course_batch_id === selectedBatchDetails.id)

                    return (
                        <div className='d-flex justify-content-between my-4'>
                            <div className='d-flex'>
                                <Image
                                    variant={'rounded'}
                                    alt="..."
                                    src={el.photo ? getImageUrl(el.photo) : icons.profile}
                                />
                                <h4 className='ml-2 mt-2'>{el.name}</h4>
                            </div>
                            <div className="col-xl-2 col-sm-0 mt-sm-0" style={{ whiteSpace: "pre-wrap" }}>

                                {
                                    el.batch_student.length > 0 ?
                                        <div>
                                            {isBatch.length > 0 && isBatch[0].is_added ? (
                                                <Button
                                                    text={'Remove'}
                                                    onClick={() => {
                                                        onAssignStudentToBatch(el.id, 'Remove', isBatch[0].id)
                                                    }}
                                                />
                                            ) : isBatch.length > 0 && !isBatch[0].is_added ?
                                                (
                                                    <Button
                                                        text={'Add'}
                                                        onClick={() => {
                                                            onAssignStudentToBatch(el.id, 'Add', isBatch[0].id)
                                                        }}
                                                    />
                                                ) : (
                                                    <Button
                                                        text={'Add'}
                                                        onClick={() => {
                                                            onAssignStudentToBatch(el.id, 'Add', "")
                                                        }}
                                                    />
                                                )
                                            }

                                        </div> :
                                        <>
                                            <Button
                                                text={'Add'}
                                                onClick={() => {
                                                    onAssignStudentToBatch(el.id, 'Add', el?.Batch_student && el?.Batch_student?.id ? el?.Batch_student?.id : "")
                                                }}
                                            />
                                        </>
                                }

                            </div>

                        </div>
                    )
                })}

                {batchStudentListData && batchStudentListData.length > 0 && (
                    <Pagination
                        currentPage={currentPage}
                        // additionalClass={'card-footer'}
                        noOfPage={numOfPages}
                        totalPages={numOfPages}
                        paginationNumberClick={(currentPage: number | undefined) => {
                            paginationHandler("current", currentPage);
                        }}
                        previousClick={() => paginationHandler("prev")}
                        nextClick={() => paginationHandler("next")}
                    />
                )}


            </Modal>

            {/* Assign start from topic modal */}

            <Modal isOpen={isOpenAssignTopic}
                isModalLoading={assignTopicLoading}
                onClose={() => { setIsOpenAssignTopic(!isOpenAssignTopic) }}
                title={'Assign starts from'}
            >
                <div className='mt--4'>
                    <div className='mb-3'>
                        <DropDown
                            heading={'Section'}
                            placeholder='Section'
                            data={currentCourse[0]?.sections}
                            // value={courseIde}
                            onChange={(e) => {
                                getCourseTopics(e.target.value)

                            }}
                        />
                    </div>
                    <div className='mb-3'>
                        <DropDown
                            heading={'Topic'}
                            placeholder='Topic'
                            data={courseTopics}
                            value={topicId}
                            onChange={(e) => {
                                setTopicId(e.target.value)
                            }}
                        />
                    </div>
                </div>

                <div className='text-right'>
                    <Button
                        color={'secondary'}
                        text={translate('common.cancel')}
                        onClick={() => { setIsOpenAssignTopic(!isOpenAssignTopic) }}
                    />
                    <Button

                        text={translate('common.submit')}
                        onClick={() => {
                            assignStudentStartFromTopic()
                        }}
                    />
                </div>
            </Modal>
        </div>
    )
}

export { StudentBatchList }