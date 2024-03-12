import { Card, Modal, DateTimePicker, Input, DropDown, Checkbox, Button, Image, Divider, Badge, Back } from '@Components'
import React, { useEffect, useState } from 'react'
import { DynamicHeight, useInput, useNavigation } from '@Hooks'
import { ShiftTimeCreation } from '@Modules'
import { translate } from '@I18n'
import { WEEK_DAY_LIST, convertTo24Hour, dateRangeOverlaps, getDate, getImageUrl, gettingWeekDaysById, showToast } from '@Utils'
import { icons } from '@Assets'
import { fetchFacultiesList, fetchApproverList, getAllBranchesList, fetchCourses, postAddBatch, postAddWeeklyCalendar, getCourseBatchDetails } from '@Redux'
import { useDispatch, useSelector } from 'react-redux'


const WEEK_DAYS_LIST_DATA = [
    { week_day: 1, is_working: true, time_breakdown: [] },
    { week_day: 2, is_working: true, time_breakdown: [] },
    { week_day: 3, is_working: true, time_breakdown: [] },
    { week_day: 4, is_working: true, time_breakdown: [] },
    { week_day: 5, is_working: true, time_breakdown: [] },
    { week_day: 6, is_working: false, time_breakdown: [] },
    { week_day: 7, is_working: false, time_breakdown: [] }]

const TYPE_DATA = [
    { id: '1', value: 'Basic', name: 'Basic' },
    { id: '2', value: 'Advanced', name: 'Advanced' }

]

function BatchCreation() {
    const dynamicHeight: any = DynamicHeight()
    const dispatch = useDispatch()
    const { goTo, goBack } = useNavigation()


    const { facultiesListData, approverListData, branchesDropdownData, registeredCourses, selectedBatchDetails, courseBatchDetails, currentCourse } = useSelector(
        (state: any) => state.DashboardReducer
    );


    const [openModel, setOpenModel] = useState(false)
    const [selectedDayIndex, setSelectedDayIndex] = useState<any>({})
    const [batchName, setBatchName] = useState('')
    const [type, setType] = useState<any>(selectedBatchDetails ? '2' : '1')
    const [course, setCourse] = useState(currentCourse && currentCourse[0] ? currentCourse[0] : '')
    const [batchCode, setBatchCode] = useState('')
    const [branch, setBranch] = useState('')

    const [weekDayList, setWeekDayList] = useState(WEEK_DAYS_LIST_DATA)

    const [weeklyData, setWeeklyData] = useState<any>([...WEEK_DAYS_LIST_DATA])

    const [shiftsTime, setShiftsTime] = useState<any>({ title: "", inTime: '', outTime: '' })
    const [basicShiftTime, setBasicShiftTime] = useState({ title: "", start_time: '', end_time: '' })
    const [batchDuration, setBatchDuration] = useState({ startDate: "", endDate: "" })
    const [batchStrength, setBatchStrength] = useState("")
    const [isFacultyModal, setIsFacultyModal] = useState(false)
    const [selectedFacultiesList, setSelectedFacultiesList] = useState([])
    const [isApproverModal, setIsApproverModal] = useState(false)
    const [selectedApproversList, setSelectedApproversList] = useState([])

    const [onSubmitLoader, setOnSubmitLoader] = useState(false)


    useEffect(() => {
        getAllBranchesListData()
        getCourses()
        if (selectedBatchDetails) {
            getCourseBatchDetailsData()
        }
    }, [])



    const getCourses = () => {
        const params = {}
        dispatch(fetchCourses({
            params,
            onSuccess: (success) => () => { },
            onError: (error) => () => { }
        }))
    }

    const getAllBranchesListData = () => {
        const params = {}
        dispatch(getAllBranchesList({
            params,
            onSuccess: (response: any) => () => {
            },
            onError: (error) => () => {
            },
        }))
    }

    const getCourseBatchDetailsData = () => {

        const params = {
            course_batch_id: selectedBatchDetails.id
        }
        dispatch(getCourseBatchDetails({
            params,
            onSuccess: (success: any) => () => {
                prefillBatchDetails(success.details)
            },
            onError: (error: string) => () => {
            },
        }))
    }

    const getFacultiesList = () => {

        const params = {}
        dispatch(fetchFacultiesList({
            params,
            onSuccess: (success: any) => () => {
            },
            onError: (error: string) => () => {
            },
        }))
    }

    const getApproverList = () => {

        const params = {}
        dispatch(fetchApproverList({
            params,
            onSuccess: (success: any) => () => {
            },
            onError: (error: string) => () => {
            },
        }))
    }


    const prefillBatchDetails = (batchDetails: any) => {
        console.log("batchDetails.faculty", batchDetails);


        console.log("qqqqqqqqqq", batchDetails.faculty);


        setBatchName(batchDetails.batch_name)
        setBatchCode(batchDetails.batch_code)
        setBatchStrength(batchDetails.student_limit)
        setCourse(currentCourse ? batchDetails.course : batchDetails.course.id)
        setBranch(batchDetails.company_branch.id)
        setBatchDuration({ startDate: batchDetails.start_date, endDate: batchDetails.end_date })
        setSelectedFacultiesList(batchDetails.faculty === null ? [] : batchDetails.faculty)
        setSelectedApproversList(batchDetails.approver === null ? [] : batchDetails.approver)
        setWeeklyData(batchDetails.weekly_calendar.week_calendar)
    }


    const postValidateParams = () => {
        if (!batchName) {
            showToast('error', 'Batch name should not be empty')
            return false
        }
        else if (!batchCode) {
            showToast('error', 'Batch code should not be empty')
            return false
        }
        else if (!batchDuration.startDate) {
            showToast('error', 'Batch start date should not be empty')
            return false
        }
        else if (!batchDuration.endDate) {
            showToast('error', 'Batch end date should not be empty')
            return false
        }
        else if (batchDuration.startDate > batchDuration.endDate) {
            showToast('error', 'Batch start date must be smaller than end date')
            return false
        }
        // else if (!course) {
        //     showToast('error', 'Please select course')
        //     return false
        // }
        else if (selectedFacultiesList.length === 0 || selectedFacultiesList === null) {
            showToast('error', 'Please select atleast one Faculty')
            return false
        }
        else if (selectedApproversList.length === 0 || selectedApproversList === null) {
            showToast('error', 'Please select atleast one Approver')
            return false
        }
        else if (!batchStrength) {
            showToast('error', 'Batch limit field cannot be empty')
            return false
        }
        else if (!branch) {
            showToast('error', 'Please select Branch')
            return false
        }
        else if (type === '1' && !selectedBatchDetails && basicTimeValidation().errorMessage) {
            showToast('error', basicTimeValidation().errorMessage)
            return false
        }
        else if (type === '2' && validateAdvancedSchedule().status) {
            showToast('error', validateAdvancedSchedule().errorMessage)
            return false
        }
        else {
            return true
        }
    }

    const basicTimeValidation = () => {

        let status = { status: false, errorMessage: '' }

        if (!basicShiftTime.title) {
            status = { status: true, errorMessage: 'Title field Cannot be be empty' }
        }
        else if (basicShiftTime.start_time == "") {
            status = { status: true, errorMessage: 'Start time Cannot be be empty' }
        }
        else if (basicShiftTime.end_time == "") {
            status = { status: true, errorMessage: '  End time Cannot be be empty' }

        }
        return status
    }

    const validateAdvancedSchedule = () => {
        let status = { status: false, errorMessage: '' }

        const hasWorkingDay = weeklyData.some((week: any) => week.is_working);

        if (hasWorkingDay) {
            weeklyData.map((el: any) => {
                if (el.is_working) {
                    if (el.time_breakdown.length === 0) {
                        status = { status: true, errorMessage: `Please assign time for enabled days` }
                    }
                }
            })
        }
        else {
            status = { status: true, errorMessage: `At least one day should be Enabled` }

        }
        return status
    }

    const onSubmit = () => {
        if (type === '1' && !selectedBatchDetails) {
            for (let i = 0; i < weekDayList.length; i++) {
                if (weekDayList[i].is_working) {
                    weekDayList[i].time_breakdown.push(basicShiftTime as never);
                }
            }
        }


        console.log("1111111111", selectedFacultiesList);


        const params = {
            batch_name: batchName,
            batch_code: batchCode,
            start_date: batchDuration.startDate,
            end_date: batchDuration.endDate,
            course_id: currentCourse ? course.id : course,
            faculty_ids: selectedFacultiesList.map((el: any) => { return el.id }),
            approver_ids: selectedApproversList.map((el: any) => { return el.id }),
            student_limit: parseInt(batchStrength),
            company_branch_id: branch,
            ...(selectedBatchDetails && { id: courseBatchDetails.id })
        }

        console.log("params===========>", params);


        if (postValidateParams()) {
            setOnSubmitLoader(true)
            dispatch(postAddBatch({
                params,
                onSuccess: (response: any) => () => {
                    setOnSubmitLoader(false)

                    showToast('success', response.message)
                    goBack()
                    addWeeklyCalendar(selectedBatchDetails ? courseBatchDetails?.id : response.details.id)
                },
                onError: (error) => () => {
                    setOnSubmitLoader(false)
                },
            }))
        }
    }

    const addWeeklyCalendar = (batchId: string) => {


        const params = {
            batch_id: batchId,
            week_calendar: type === '1' && !selectedBatchDetails ? weekDayList : weeklyData,
            ...(selectedBatchDetails && { id: courseBatchDetails?.weekly_calendar?.id })
        }

        dispatch(postAddWeeklyCalendar({
            params,
            onSuccess: (response: any) => () => {
                resetState()
                // showToast('success',response.message)
            },
            onError: (error) => () => {
            },
        }))
    }

    const resetState = () => {

        setBatchName('')
        setBatchCode('')
        setBatchStrength('')
        setCourse('')
        setBranch('')
        setBatchDuration({ startDate: "", endDate: "" })
        setBasicShiftTime({ title: "", start_time: '', end_time: '' })
        setSelectedFacultiesList([])
        setSelectedApproversList([])

    }

    const dateValidation = () => {

        if (shiftsTime.inTime == "" && shiftsTime.outTime == "") {
            showToast("error", 'Time Cannot be be empty')
            return false
        }
        else if (!shiftsTime.title) {
            showToast('error', 'Title field cannot be empty')
            return false
        }
        else {
            return true
        }
    }

    function updateShiftTimeBreakdown() {
        console.log("cameee1111")

        if (dateValidation()) {
            if (shiftsTime.inTime && shiftsTime.outTime) {
                let updatedWeek = [...weeklyData]
                let changedWeek = updatedWeek
                const timeBreakdown = updatedWeek[selectedDayIndex].time_breakdown

                const currentShift = {
                    title: shiftsTime.title,
                    start_time: convertTo24Hour(shiftsTime.inTime),
                    end_time: convertTo24Hour(shiftsTime.outTime),
                };


                if (timeBreakdown && timeBreakdown.length > 0) {
                    if (timeBreakdown.length < 3) {
                        const isExist = timeBreakdown.some((each: any) => {
                            return (
                                currentShift.start_time === each.startTime &&
                                currentShift.end_time === each.endTime
                            );
                        });
                        if (!isExist) {
                            let is_add = true;
                            timeBreakdown.forEach((element: any) => {
                                const isOverLab = dateRangeOverlaps(
                                    getDate(currentShift.start_time),
                                    getDate(currentShift.end_time),
                                    getDate(element.start_time),
                                    getDate(element.end_time),
                                );
                                console.log(isOverLab);

                                if (isOverLab) {
                                    is_add = false;
                                    return;
                                }
                            });

                            if (is_add) {
                                changedWeek[selectedDayIndex] = { ...changedWeek[selectedDayIndex], time_breakdown: [...timeBreakdown, currentShift] }
                            }
                            else {
                                showToast("error", 'Selected time is already exist')
                            }
                        }

                    } else {
                        showToast("error", 'Limit exceeded')

                    }
                }
                else {
                    changedWeek[selectedDayIndex] = { ...changedWeek[selectedDayIndex], time_breakdown: [...timeBreakdown, currentShift] }
                }
                setShiftsTime({ title: "", inTime: '', outTime: '' })
                setWeeklyData(updatedWeek)
                setOpenModel(!openModel)
            }
        }

        // else {
        //     showToast("error", 'Time Cannot be be empty')
        // }
    }


    const onDelete = (selectedShift: any, breakdownItemIndex: number, index: number) => {
        let deletedShift = [...weeklyData]
        deletedShift[index].time_breakdown.splice(breakdownItemIndex, 1)
        setWeeklyData(deletedShift)
    }


    const workingDayStatus = (index: number) => {
        let updatedWeek = [...weeklyData]
        let changedWeek = updatedWeek
        changedWeek[index] = { ...changedWeek[index], is_working: !changedWeek[index].is_working }
        setWeeklyData(updatedWeek)
    }

    const dateTimePickerHandler = (value: string, key: string) => {
        setShiftsTime({ ...shiftsTime, [key]: value });
    };

    const courseDurationHandler = (value: string, key: string) => {
        setBatchDuration({ ...batchDuration, [key]: value })
    }

    const basicTimePickerHandler = (value: string, key: string) => {
        setBasicShiftTime({ ...basicShiftTime, [key]: convertTo24Hour(value) })
    }

    const addSelectedFaculty = (item: any) => {
        let updateSelectedFaculties = [...selectedFacultiesList];

        const isExists = updateSelectedFaculties?.some(
            (el: any) => el.id === item.id
        );

        if (isExists) {
            updateSelectedFaculties = updateSelectedFaculties?.filter(
                (eachItem: any) => eachItem.id !== item.id
            );
        }
        else {
            updateSelectedFaculties = [...updateSelectedFaculties, item as never];
        }
        setSelectedFacultiesList(updateSelectedFaculties as never)
    };


    const addSelectedApprover = (item: any) => {
        let updateSelectedApprover = [...selectedApproversList];

        const isExists = updateSelectedApprover?.some(
            (el: any) => el.id === item.id
        );

        if (isExists) {
            updateSelectedApprover = updateSelectedApprover?.filter(
                (eachItem: any) => eachItem.id !== item.id
            );
        }
        else {
            updateSelectedApprover = [...updateSelectedApprover, item as never];
        }

        setSelectedApproversList(updateSelectedApprover as never)
    };

    return (
        <div className={`container-fluid pt-2`}>
            <Back text={selectedBatchDetails ? translate('batch.editBatch')! : translate('batch.createBatch')!} />

            <Card className='overflow-auto scroll-hidden mt-0' style={{ height: dynamicHeight.dynamicWidth <= 1400 ? dynamicHeight.dynamicHeight - 15 : dynamicHeight.dynamicHeight - 50 }}>
                {/* <h2>{'Create Batch'}</h2> */}


                <div className='row mt-3'>
                    <div className='col-sm-6'>
                        <Input
                            heading={translate('batch.batchName')!}
                            placeholder={translate('batch.batchName')!}
                            value={batchName}
                            onChange={(e) => {
                                setBatchName(e.target.value)
                            }}
                        />
                    </div>
                    <div className='col-sm-6'>
                        <Input
                            heading={translate('batch.batchLimit')!}
                            placeholder={translate('batch.batchLimit')!}
                            value={batchStrength}
                            onChange={(e) => {
                                setBatchStrength(e.target.value)
                            }}
                        />
                    </div>
                </div>

                <div className='row mb-4'>
                    <div className='col-sm-6'>

                        {currentCourse ?
                            <Input
                                placeholder={translate('course.course')!}
                                heading={translate('course.course')!}
                                value={course.name}
                                disabled={true}

                            /> :

                            <DropDown
                                data={registeredCourses}
                                placeholder={translate('course.course')!}
                                heading={translate('course.course')!}
                                value={course}
                                onChange={(e) => {
                                    setCourse(e.target.value)
                                }}
                            />
                        }
                    </div>
                    <div className='col-sm-6'>
                        <DropDown
                            data={branchesDropdownData}
                            placeholder={translate('auth.branch')!}
                            heading={translate('auth.branch')!}
                            value={branch}
                            onChange={(e) => {
                                setBranch(e.target.value)
                            }}
                        />
                    </div>
                </div>

                <div className='col-sm-6 ml--3'>
                    <Input
                        heading={translate('batch.batchCode')!}
                        placeholder={translate('batch.batchCode')!}
                        value={batchCode}
                        onChange={(e) => {
                            setBatchCode(e.target.value)
                        }}
                    />
                </div>

                <div className='pt-2'>
                    <h3>{translate('batch.courseDuration')!}</h3>

                    <div className='row pt-2'>
                        <div className='col-sm-6'>
                            <h5 className="mb-2">{translate('common.startDate')!}</h5>
                            <DateTimePicker
                                disableFuture
                                value={batchDuration.startDate}
                                placeholder={translate('common.selectDate')!}
                                onChange={(time: any) => {
                                    courseDurationHandler(time, "startDate")
                                }}
                            />
                        </div>

                        <div className='col-sm-6'>
                            <h5 className="mb-2">{translate('common.endDate')!}</h5>
                            <DateTimePicker
                                disableFuture
                                value={batchDuration.endDate}
                                placeholder={translate('common.selectDate')!}
                                onChange={(time: any) => {
                                    courseDurationHandler(time, "endDate")
                                }}
                            />
                        </div>
                    </div>
                </div>

                <div className='row mb-4'>
                    <div className='col-sm-6'>
                        <div className=' d-flex pt-2'>
                            <h3>{translate('course.faculties')!}</h3>
                            <div className='ml-2'>
                                <Button
                                    text={translate('course.add')!}
                                    onClick={() => {
                                        getFacultiesList()
                                        setIsFacultyModal(!isFacultyModal)
                                    }}
                                />
                            </div>
                        </div>
                        <div className='mt-3'>
                            {
                                selectedFacultiesList && selectedFacultiesList.length > 0 && selectedFacultiesList.map((el: any) => {
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
                                                    <i className="bi bi-x-circle-fill pointer text-danger" onClick={() => {
                                                        const filteredFaculties = selectedFacultiesList?.filter((it: any) => it.id !== el.id)
                                                        setSelectedFacultiesList(filteredFaculties)
                                                    }}></i>
                                                </div>
                                            </div>
                                        </>
                                    )
                                })
                            }
                        </div>
                    </div>


                    <div className='col-sm-6'>
                        <div className='d-flex pt-2'>
                            <h3>{translate('assignCourseToStudent.approver')!}</h3>
                            <div className='ml-2'>
                                <Button
                                    text={'Add'}
                                    onClick={() => {
                                        getApproverList()
                                        setIsApproverModal(!isApproverModal)
                                    }}
                                />
                            </div>
                        </div>

                        <div className='mt-3'>
                            {
                                selectedApproversList && selectedApproversList.length > 0 && selectedApproversList.map((el: any) => {
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
                                                            const filteredApprover = selectedApproversList?.filter((it: any) => it.id !== el.id)
                                                            setSelectedApproversList(filteredApprover)
                                                        }}></i>
                                                </div>
                                            </div>
                                        </>
                                    )
                                })
                            }
                        </div>
                    </div>
                </div>

                <Divider />

                <h3>{translate('batch.weekSchedule')!}</h3>


                <div className='row'>
                    {type === '1' && !selectedBatchDetails && (
                        <div className='col-sm-6'>
                            <Input
                                heading={translate('common.title')!}
                                placeholder={translate('common.title')!}
                                value={basicShiftTime.title}
                                onChange={(e) => {
                                    setBasicShiftTime({ ...basicShiftTime, title: e.target.value })
                                }}
                            />

                        </div>
                    )}

                    {!selectedBatchDetails && (
                        <div className='col-sm-6'>
                            <DropDown
                                data={TYPE_DATA}
                                placeholder={translate('batch.type')!}
                                heading={translate('batch.type')!}
                                value={type}
                                onChange={(e) => {
                                    setType(e.target.value)
                                }}
                            />
                        </div>
                    )}
                </div>


                {type === '1' && !selectedBatchDetails ? (
                    <>
                        <div className='row'>
                            <div className='col-sm-6'>
                                <h5 className="mb-2">{'Start Time'}</h5>
                                <DateTimePicker
                                    initialValue={basicShiftTime.start_time}
                                    type={'time'}
                                    placeholder={'Select start time'}
                                    onChange={(time: any) => {
                                        basicTimePickerHandler(time, "start_time")
                                    }}
                                />
                            </div>

                            <div className='col-sm-6'>
                                <h5 className="mb-2">{'End Time'}</h5>
                                <DateTimePicker
                                    type={'time'}
                                    initialValue={basicShiftTime.end_time}
                                    placeholder={'Select end time'}
                                    onChange={(time: any) => {
                                        basicTimePickerHandler(time, "end_time")
                                    }}
                                />
                            </div>
                        </div>

                        <div className='row'>
                            {weekDayList.map((it: any, index: number) => {
                                return (
                                    <div className='mx-3'>
                                        <Checkbox
                                            text={gettingWeekDaysById(WEEK_DAY_LIST, 'id', it.week_day + '').name}
                                            checked={it.is_working}
                                            id={it.week_day}
                                            onCheckChange={(e) => {
                                                let updatedData = weekDayList.map((element: any) => {
                                                    if (it.week_day === element.week_day) {
                                                        return { ...element, is_working: !element.is_working };
                                                    }
                                                    return element;
                                                });
                                                setWeekDayList(updatedData);
                                            }}
                                        />
                                    </div>
                                )
                            })}
                        </div>
                    </>
                ) :
                    <>
                        <ShiftTimeCreation
                            datesList={weeklyData}
                            onAddClick={(index) => {
                                setOpenModel(!openModel)
                                setSelectedDayIndex(index)
                            }}

                            onCheckBoxClick={(index) => {
                                workingDayStatus(index)
                            }}

                            onDeleteClick={(el, breakdownItemIndex, index) => {
                                onDelete(el, breakdownItemIndex, index)
                            }}
                        />
                    </>}

                <div className='float-right py-3'>
                    <Button
                        size={'md'}
                        text={'Submit'}
                        onClick={() => onSubmit()}
                        isLoading={onSubmitLoader}
                    />
                </div>

            </Card>


            <Modal isOpen={openModel} onClose={() => {
                setShiftsTime({ inTime: '', outTime: '', title: "" })
                setOpenModel(!openModel)
            }} title={'Select Shift Timing'} size={'md'}>
                <Input
                    heading={'Title'}
                    placeholder={'Title'}
                    value={shiftsTime.title}
                    onChange={(e) => {
                        dateTimePickerHandler(e.target.value, "title")
                    }}
                />
                <div className={'d-flex ml--3'} >

                    <div className={'col-lg-6 '}>
                        <h5 className="mb-2">{'Start Time'}</h5>
                        <DateTimePicker
                            initialValue={shiftsTime.inTime}
                            type={'time'}
                            placeholder={'Select start time'}
                            onChange={(time: any) => {
                                dateTimePickerHandler(time, "inTime")
                            }}
                        />
                    </div>
                    <div className={' col-lg-6'}>
                        <h5 className="mb-2">{'End Time'}</h5>
                        <DateTimePicker
                            type={'time'}
                            initialValue={shiftsTime.outTime}
                            placeholder={'Select end time'}
                            onChange={(time: any) => {
                                dateTimePickerHandler(time, "outTime")
                            }}
                        />
                    </div>
                </div>

                <div className="float-right">
                    <button type="button" className="btn btn-secondary ml-auto" onClick={() => {
                        setOpenModel(!openModel)
                        setShiftsTime({ inTime: '', outTime: '', title: "" })
                    }}>{translate('common.cancel')}</button>
                    <button type="button" className="btn btn-primary ml-auto" onClick={() => { updateShiftTimeBreakdown() }}>{translate('common.submit')}</button>
                </div>
            </Modal>

            {/**
             * faculty add modal
            */}

            <Modal
                margin={'ml-2'}
                title={'Faculties'}
                isOpen={isFacultyModal}
                onClose={() => {
                    setIsFacultyModal(!isFacultyModal)
                }}>
                <div className='mt--4'>
                    {facultiesListData && facultiesListData?.map((el: any) => {
                        const isActive = selectedFacultiesList?.some((item: any) => item.id === el.id)

                        return (
                            <div className='d-flex justify-content-between my-4'>
                                <div className='col-xl-6 col-sm-0 '>
                                    <h3>{el.name}</h3>
                                </div>
                                <td className="col-xl-2 col-sm-0 mt-sm-0" style={{ whiteSpace: "pre-wrap" }}>
                                    <i className={`bi bi-${isActive ? 'check-circle-fill text-success' : 'circle-fill text-light'}`}
                                        onClick={() => {
                                            addSelectedFaculty(el)
                                        }}
                                    ></i>
                                </td>

                            </div>
                        )
                    })}
                </div>

            </Modal>

            {/**
             * Approver add modal
            */}

            <Modal
                margin={'ml-1'}
                title={'Approvers'}
                isOpen={isApproverModal}
                onClose={() => {
                    setIsApproverModal(!isApproverModal)
                }}>

                <div className='mt--4'>
                    {approverListData && approverListData?.map((el: any) => {
                        const isActive = selectedApproversList?.some((item: any) => item.id === el.id)

                        return (
                            <div className='d-flex justify-content-between my-4'>
                                <div className='col-xl-6 col-sm-0 '>
                                    <h3>{el.name}</h3>
                                </div>
                                <td className="col-xl-2 col-sm-0 mt-sm-0" style={{ whiteSpace: "pre-wrap" }}>
                                    <i className={`bi bi-${isActive ? 'check-circle-fill text-success' : 'circle-fill text-light'}`}
                                        onClick={() => {
                                            addSelectedApprover(el)
                                        }}
                                    ></i>


                                </td>

                            </div>
                        )
                    })}
                </div>
            </Modal>
        </div>
    )
}

export { BatchCreation }