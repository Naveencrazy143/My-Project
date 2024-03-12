import { icons } from '@Assets'
import { Back, Card, FormTypography, Image, Button, Modal, Pagination, DropDownMenu, DropDown, Input, useKeyPress, DatePicker, DateTimePicker, Checkbox, InputHeading, Spinner, showToast } from '@Components'
import { editScheduleMeetingDetails, fetchCourseBatchAddedStudents, fetchStudentCourseSection, fetchStudentCourses, fetchTokenByUser, getCourseBatchDetails, postBatchVideoCallUsers, } from '@Redux'
import { getImageUrl } from '@Utils'
import { translate } from '@I18n'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import moment from 'moment'
import { DynamicHeight, useLoader, useNavigation } from '@Hooks'


const DROPDOWN_ITEM = [
    { id: 1, name: 'Assign starts from topic' }
]
const ScheduleMeeting = () => {
    const dispatch = useDispatch()
    const { selectedBatchDetails, courseBatchDetails, dashboardDetails, scheduleMeetingDetails, courseBatchAddedStudentsList, currentPage2, numOfPages2, scheduleMeetingUserData } = useSelector(
        (state: any) => state.DashboardReducer
    );
    const batchAddedStudentLoader = useLoader(false)
    const dynamicHeight: any = DynamicHeight()
    const enterPress = useKeyPress('Enter')
    const { goTo, goBack } = useNavigation()

    const [filteredData, setFilteredData] = useState<any>()
    const [searchAddedStudent, setSearchAddedStudent] = useState('')
    const [selectedBatchUserDetails, setSelectedBatchUserDetails] = useState<any>([])
    const [batchCode, setBatchCode] = useState('')
    const [batchId, setBatchId] = useState('')
    const [roomTitle, setRoomTitle] = useState<any>()
    const [scheduleData, setScheduleDate] = useState<any>()
    const [startTime, setStartTime] = useState<any>()
    const [endTime, setEndTime] = useState<any>()
    const [approversDetails, setApproversDetails] = useState<any>()
    const [ttt, seTtt] = useState()

    useEffect(() => {
        getCourseBatchAddedStudents(1)

    }, [])

    console.log("selectedBatchUserDetails====>", moment(scheduleData + "T" + startTime).format('YYYY-MM-DDTHH:mm:ss'))
    // new Date("2023-05-17 10:00:00").toISOString())

    useEffect(() => {
        if (enterPress) {
            getCourseBatchAddedStudents(currentPage2)
        }
    }, [enterPress, selectedBatchUserDetails])

    useEffect(() => {
        getCourseBatchDetailsData()

        if (scheduleMeetingDetails) {
            setBatchCode(scheduleMeetingDetails?.batch_code)
            setSelectedBatchUserDetails(scheduleMeetingDetails?.employee_company)
            setRoomTitle(scheduleMeetingDetails?.room_name)
            setScheduleDate(moment(scheduleMeetingDetails?.start_time).format('YYYY-MM-DD'))
            setStartTime(moment(scheduleMeetingDetails?.start_time).format('h:mm:ss'))
            setEndTime(moment(scheduleMeetingDetails?.end_time).format('h:mm:ss'))
        }
        else {
            settingApproverData()
        }
        return (() => {
            dispatch(editScheduleMeetingDetails(undefined))
        })

    }, [])




    // h:mm:ss a

    const settingApproverData = () => {
        let array: any = []
        array.push(dashboardDetails?.user_details)
        // array.push(...data)
        setSelectedBatchUserDetails(array)
        setApproversDetails(array)
    }

    // console.log("selectedBatchUserDetails", editScheduleMeetingDetails)


    const getCourseBatchDetailsData = () => {
        const params = {
            course_batch_id: selectedBatchDetails.id
        }
        dispatch(getCourseBatchDetails({
            params,
            onSuccess: (success: any) => () => {
                console.log("success?.details?.approver", success?.details?.approver)

                setBatchCode(success?.details?.batch_code)
                setBatchId(success?.details?.id)

            },
            onError: (error: string) => () => {
            },
        }))
    }

    const getCourseBatchAddedStudents = (pageNumber: number) => {
        batchAddedStudentLoader.showLoader()
        const params = {
            ...(searchAddedStudent && { q: searchAddedStudent }),
            page_number: pageNumber,
            batch_id: selectedBatchDetails.id
        }

        dispatch(fetchCourseBatchAddedStudents({
            params,
            onSuccess: (success: any) => () => {
                // settingApproverData()
                batchAddedStudentLoader.hideLoader()
                console.log("success============>", success)
            },
            onError: (error: string) => () => {
                batchAddedStudentLoader.hideLoader()
            },
        }))
    }

    const addBatchVideoCallUsers = () => {
        const params = {
            ...(scheduleMeetingDetails && { id: scheduleMeetingDetails.id }),
            room_name: roomTitle,
            batch_id: batchId,
            batch_code: batchCode,
            start_date: moment(scheduleData + "T" + startTime).format('YYYY-MM-DDTHH:mm:ss'),
            end_date: moment(scheduleData + "T" + endTime).format('YYYY-MM-DDTHH:mm:ss'),
            emp_details: filteredData
        }
        dispatch(postBatchVideoCallUsers({
            params,
            onSuccess: (success: any) => () => {
                goBack()
                console.log("success============>", success)
                showToast(success?.message, 'success')
            },
            onError: (error: any) => () => {
                showToast(error?.error_message, 'error')
            },

        }))
    }

    const addSelectedFaculty = (item: any, type: any) => {
        if (type === 'Select All') {
            setSelectedBatchUserDetails([...selectedBatchUserDetails, ...courseBatchAddedStudentsList])
        }
        else if (type === 'Remove All') {
            setSelectedBatchUserDetails(approversDetails)
        }
        else {
            let updateSelectedBatchUser = [...selectedBatchUserDetails];

            const isExists = updateSelectedBatchUser?.some(
                (el: any) => el.id === item.id
            ) as never;

            if (isExists) {
                updateSelectedBatchUser = updateSelectedBatchUser?.filter(
                    (eachItem: any) => eachItem.id !== item.id
                );
            }
            else {
                updateSelectedBatchUser = [...updateSelectedBatchUser, item as never];
            }
            setSelectedBatchUserDetails(updateSelectedBatchUser as never)
        }
    };

    console.log("scheduleMeetingUserData", dashboardDetails?.user_details)

    useEffect(() => {
        batchDataFilter()
    }, [selectedBatchUserDetails])

    const batchDataFilter = () => {
        let array: any = []
        selectedBatchUserDetails?.forEach((el) => {
            array.push({
                emp_id: el.id || el.employee_id,
                user_name: el.name,
                email_id: el.email
            })
        })
        setFilteredData(array)
    }

    function paginationHandler3(
        type: "next" | "prev" | "current",
        position?: number
    ) {
        let page: any =
            type === "next"
                ? currentPage2 + 1
                : type === "prev"
                    ? currentPage2 - 1
                    : position;
        getCourseBatchAddedStudents(page);
    }

    return (
        <div className='container-fluid py-4'>
            <div className='row ml-1 mt--2'>
                <Back
                    onClick={() => {
                        goBack(1)
                    }}
                />
                <h3 className='mt-3 ml-2'>Meeting Schedule</h3>
            </div>
            <Card>

                <div className='row mt-2'>

                    <div className=' col-sm-3'>
                        <InputHeading
                            id={"Title"}
                            heading={"Title"}
                        />
                        <Input
                            placeholder='Title'
                            id='Title'
                            value={roomTitle}
                            onChange={(e) => {
                                setRoomTitle(e.target.value)
                            }}
                        />
                    </div>
                    <div className=' col-sm-3'>
                        <DateTimePicker
                            disableFuture={true}
                            heading={"Schedule Date"}
                            placeholder={"Schedule Date"}
                            value={scheduleData}
                            onChange={(e) => { setScheduleDate(e) }}
                        />
                    </div>
                    <div className='col-sm-3'>
                        <InputHeading
                            id={"Start Time"}
                            heading={"Start Time"}
                        />
                        <Input
                            // defaultValue="10:30:00"
                            id="Start Time"
                            type="time"
                            value={startTime || "10:30:00"}
                            onChange={
                                (e) => { setStartTime((e.target.value)) }
                            }
                        />
                    </div>
                    <div className='col-sm-3'>
                        {/* <DateTimePicker
                            dateFormatType={"HH:mm:ss"}
                            disableFuture={true}
                            type='time'
                            heading={"End Time"}
                            placeholder={"Schedule Time"}
                            value={''}
                            onChange={(e) => { setEndTime(e) }}
                        /> */}
                        <InputHeading
                            id={"End Time"}
                            heading={"End Time"}
                        />
                        <Input
                            // defaultValue="10:30:00"
                            id="End Time"
                            type="time"
                            value={endTime || "10:30:00"}
                            onChange={
                                (e) => { setEndTime(e.target.value) }
                            }
                        />
                    </div>
                    {/* <div className='col-sm-3' >
                        <label htmlFor="title">Title</label>
                        <DropDown />
                    </div> */}
                </div>
            </Card>

            <div className='row  mt-3 '>


                <div className='col-sm-6'>
                    <Card style={{ height: dynamicHeight.dynamicWidth <= 1400 ? dynamicHeight.dynamicHeight + 330 : dynamicHeight.dynamicHeight - 50 }}>
                        <div className='mb-4 d-flex justify-content-between mr-3'>
                            <h3 className=''>{"Batch Student List"}</h3>
                            <div className=''>
                                <Button
                                    text={"Select All"}
                                    onClick={() => {
                                        addSelectedFaculty(courseBatchAddedStudentsList, 'Select All')
                                    }}
                                />
                            </div>
                        </div>
                        <div>
                            <div className='col-sm-8 ml--3  mt--4'>
                                <Input
                                    // heading={'Search Student'}
                                    placeholder={'Search student'}
                                    value={searchAddedStudent}
                                    onChange={(e) => {
                                        setSearchAddedStudent(e.target.value)
                                    }}
                                />
                            </div>
                        </div>
                        {batchAddedStudentLoader.loader ?
                            <div className="mt--6">
                                <Spinner />
                            </div>
                            :
                            <div className='overflow-auto scroll-hidden' style={{ height: dynamicHeight.dynamicWidth <= 1400 ? dynamicHeight.dynamicHeight + 140 : dynamicHeight.dynamicHeight - 180 }}>
                                {
                                    courseBatchAddedStudentsList && courseBatchAddedStudentsList.length > 0 && courseBatchAddedStudentsList.map((el: any) => {
                                        console.log("data===>", el)
                                        const isActive = selectedBatchUserDetails?.some((item: any) => item.id === el.id)
                                        return (
                                            <>
                                                <div className='d-flex justify-content-between mb-4' >
                                                    <div className='d-flex'>
                                                        <Image
                                                            variant={'rounded'}
                                                            alt="..."
                                                            src={el.photo ? getImageUrl(el.photo) : icons.profile}
                                                        />
                                                        <h4 className='ml-2 mt-2'>{el.name}</h4>
                                                    </div>
                                                    <div>
                                                        <div className='mt--4'>
                                                            <div className='d-flex justify-content-between my-4'>
                                                                {/* <div className='col-xl-6 col-sm-0 '>
                                                            <h3>{el.name}</h3>
                                                        </div> */}
                                                                <td className="col-xl-2 col-sm-0 mt-sm-0" style={{ whiteSpace: "pre-wrap" }}>
                                                                    <i className={`bi bi-${isActive ? 'check-circle-fill pointer text-success' : 'circle-fill text-light'} pointer`}
                                                                        onClick={() => {
                                                                            addSelectedFaculty(el, '')
                                                                        }}
                                                                    ></i>
                                                                </td>

                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </>
                                        )
                                    })
                                }
                            </div>
                        }

                        <div className='mt--5'>
                            {!batchAddedStudentLoader.loader && courseBatchAddedStudentsList && courseBatchAddedStudentsList.length > 0 && (
                                <Pagination
                                    additionalClass='pb-3'
                                    currentPage={currentPage2}
                                    noOfPage={numOfPages2}
                                    totalPages={numOfPages2}
                                    paginationNumberClick={(currentPage: number | undefined) => {
                                        paginationHandler3("current", currentPage);
                                    }}
                                    previousClick={() => paginationHandler3("prev")}
                                    nextClick={() => paginationHandler3("next")}
                                />
                            )}
                        </div>
                    </Card>

                </div>
                <div className='col-sm-6'>
                    <Card style={{ height: dynamicHeight.dynamicWidth <= 1400 ? dynamicHeight.dynamicHeight + 330 : dynamicHeight.dynamicHeight - 50 }}>
                        <div className='mb-4 d-flex justify-content-between mr-3'>
                            <h3 className='mb-4'>{"Selected List"}</h3>
                            <div className=''>
                                <Button
                                    text={"Remove All"}
                                    onClick={() => {
                                        addSelectedFaculty('', 'Remove All')
                                    }}
                                />
                            </div>
                        </div>
                        <div className='overflow-auto scroll-hidden' style={{ height: dynamicHeight.dynamicWidth <= 1400 ? dynamicHeight.dynamicHeight + 170 : dynamicHeight.dynamicHeight - 160 }}>
                            {selectedBatchUserDetails && selectedBatchUserDetails.map((el) => {
                                const isActive = approversDetails?.some((item: any) => item.id === el.id)

                                return (
                                    <>
                                        <div className='d-flex justify-content-between mb-4'>
                                            <div className='d-flex'>
                                                <Image
                                                    variant={'rounded'}
                                                    alt="..."
                                                    src={el.photo ? getImageUrl(el.photo) : icons.profile}
                                                />
                                                <h4 className='ml-2 mt-2'>{el.name}</h4>
                                            </div>
                                            <div>
                                                <div className='mt--4'>
                                                    <div className='d-flex justify-content-between my-4'>
                                                        {/* <div className='col-xl-6 col-sm-0 '>
                                                            <h3>{el.name}</h3>
                                                        </div> */}
                                                        <td className="col-xl-2 col-sm-0 mt-sm-0" style={{ whiteSpace: "pre-wrap" }}>
                                                            <i className={`bi bi-${isActive ? "" : 'bi bi-x-circle-fill pointer text-danger'}`}
                                                                onClick={() => {
                                                                    addSelectedFaculty(el, '')
                                                                }}
                                                            ></i>
                                                        </td>

                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </>
                                )
                            })
                            }

                        </div>

                    </Card>
                </div>
            </div>
            <div className='text-right'>
                <Button
                    text={"Submit"}
                    size='lg'
                    onClick={() => {
                        addBatchVideoCallUsers()

                    }}
                />
            </div>


        </div >
    )
}

export { ScheduleMeeting }