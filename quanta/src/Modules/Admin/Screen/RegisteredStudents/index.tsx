


import React, { useEffect, useRef, useState } from 'react'
import { Button, Card, CommonTable, InputWithImage, Modal, NoRecordsFound, Image, useKeyPress, Badge, DropDown, AvatarWithName, FileUpload } from '@Components'
import { useNavigation, useLoader, DynamicHeight } from "@Hooks";
import { AUTH_PATH, ROUTES } from '@Routes';
import { editUserRegister, fetchCourseTopics, fetchStudentsList, getAllBranchesList, postGenericCrudDetails, fetchUserOnlineActiveLog, isShowStudentsList, fetchCourses, postBulkUploadStudents, fetchEmployeesTemplates } from '@Redux';
import { useDispatch, useSelector } from "react-redux";
import { translate } from '@I18n'
import { UserOnlineStatus, DropDownMenuArrow } from '../../../Student/Container';
import { getImageUrl, showToast, getDisplayDateFromMoment, urlDownloader, convertToUpperCase } from '@Utils'
import { icons } from '@Assets';
import { SERVER } from '@Services';


function RegisteredStudents() {
    const dispatch = useDispatch();
    const dynamicHeight: any = DynamicHeight()
    // console.log("dynamicHeight", dynamicHeight)

    const { studentsListData, editUserDetails, courseTopics, branchesDropdownData, isSuperAdmin, registeredCourses, userOnlineActiveLog, isShowStudentsListCard } = useSelector(
        (state: any) => state.DashboardReducer
    );

    const [userListStatus, setUserListStatus] = useState(false)
    const studentsListLoader = useLoader(false)
    const [searchUser, setSearchUser] = useState('')
    const [deleteModal, setDeleteModal] = useState(false)
    const [currentDeleteItem, setCurrentDeleteItem] = useState<any>()
    const [searchStudent, setSearchStudent] = useState('')
    const enterPress = useKeyPress('Enter')
    const [usersStatusListData, setUsersStatusListData] = useState(userOnlineActiveLog)
    const [onCourseClickModal, setOnCourseClickModal] = useState(false)
    const [branchId, setBranchId] = useState('-1')
    const [branchesData, setBranchesData] = useState([])
    const [studentSelectedCourse, setStudentSelectedCourse] = useState<any>([])
    const [selectedSectionTopics, setSelectedSectionTopics] = useState<any>([])
    const [topicId, setTopicId] = useState('')
    const assignStartsFromModalLoader = useLoader(false)
    const activeStatusCardLoader = useLoader(false)
    const [studentCourseId, setStudentCourseId] = useState("")
    const [studentBulkUploadData, setStudentBulkUploadData] = useState<any>()
    const [submitLoader, setSubmitLoader] = useState(false)
    const [studentSearch, setStudentSearch] = useState(false)
    const [onlineStatusSearch, setOnlineStatusSearch] = useState(false)

    const [isBulkUploadModalOpen, setIsBulkUploadModalOpen] = useState<boolean>(false)
    const [isStudentSearch, setIsStudentSearch] = useState(false)
    const [isUserSearch, setIsUserSearch] = useState(false)


    const { goTo } = useNavigation()

    useEffect(() => {

        if (enterPress && (searchStudent || !searchStudent) && isStudentSearch) {
            getStudentsList("")

        }
        if (enterPress && (searchUser || !searchUser) && isUserSearch) {
            getStudentActiveLog()
        }

    }, [enterPress])

    useEffect(() => {
        const interval = setInterval(() => {
            getStudentActiveLog()
        }, 600000)

        return () => {
            clearInterval(interval)
        }
    }, [])

    useEffect(() => {
        getBranchesList()
    }, [])

    const getBranchesList = () => {
        const params = {}
        dispatch(getAllBranchesList({
            params,
            onSuccess: (success) => () => {
                if (branchesDropdownData && branchesDropdownData?.length > 0) {
                    let allObj = { id: '-1', name: 'All' }
                    let branchesObj: any = [allObj, ...branchesDropdownData]
                    setBranchesData(branchesObj)
                }
            },
            onError: (error) => () => { }
        },
        ))
    }


    const getCourseTopics = (id) => {

        const params = {
            course_section_id: id
        }

        dispatch(fetchCourseTopics({
            params,
            onSuccess: (success: any) => () => {
                setSelectedSectionTopics(success.data)
            },
            onError: (error: any) => () => {
            },
        }))
    }


    const getStudentsList = (branchId) => {
        const params = {
            ...(searchStudent && { q: searchStudent }),
            ...(branchId && branchId !== '-1' && { branch_id: branchId })
        }
        studentsListLoader.showLoader()

        dispatch(fetchStudentsList({
            params,
            onSuccess: (success: any) => () => {
                studentsListLoader.hideLoader()
            },
            onError: (error: any) => () => {
                // console.log
                studentsListLoader.hideLoader()
            },
        }))
    }

    /**
     * Api for user online active log
     */

    const getStudentActiveLog = () => {

        const params = {
            is_student: true,
            ...(searchUser && { q: searchUser })
        }
        activeStatusCardLoader.showLoader()
        dispatch(fetchUserOnlineActiveLog({
            params,
            onSuccess: (success) => () => {
                activeStatusCardLoader.hideLoader()
                setUsersStatusListData(success.details)
            },
            onError: (error: any) => () => {
                activeStatusCardLoader.hideLoader()
            }
        },
        ))
    }

    const onDeleteHandler = (id: string) => {


        const params = {
            mq: "employee__EmployeeCompanyInfo",
            data: { id: id },
            force_delete: true
        }

        setSubmitLoader(true)

        dispatch(postGenericCrudDetails({
            params,
            onSuccess: (success: any) => () => {
                setSubmitLoader(false)
                showToast('success', success.message)
                setDeleteModal(!deleteModal)
                getStudentsList("")
            },
            onError: (error) => () => {
                setSubmitLoader(false)
                if (error?.status_code === 0) {
                    showToast('error', error?.error_message)
                }
            },
        }))

    }

    const onSubmitHandler = () => {
        const params = {
            mq: "student__StudentCourse",
            data: {
                id: studentCourseId,
                starts_from_topic_id: topicId
            }
        }
        assignStartsFromModalLoader.showLoader()

        dispatch(postGenericCrudDetails({
            params,
            onSuccess: (success: any) => () => {
                setOnCourseClickModal(false)
                assignStartsFromModalLoader.hideLoader()
                showToast('success', success.message)
            },
            onError: (error: any) => () => {
                assignStartsFromModalLoader.hideLoader()
                if (error?.status_code) {
                    showToast('error', error.error_message)
                }
            },

        }))
    }

    const normalizedStudentsData = (data: any) => {
        return data.map((el: any) => {

            return {
                "":
                    <Image
                        variant={'rounded'}
                        alt="..."
                        src={el.photo ? getImageUrl(el.photo) : icons.profile}
                    />,
                [`${translate("auth.name")}`]: convertToUpperCase(el.name),

                [`${translate("auth.course")}`]: el.student_course.length > 0 ?
                    el.student_course.map((it) => {
                        return (
                            <div className='py-1'>
                                <Badge
                                    text={it.course.name}
                                    color={'success'}
                                // onClick={() => {

                                //     const params = {}

                                //     dispatch(fetchCourses({
                                //         params,
                                //         onSuccess: (success: any) => () => {

                                //             let currentCourseId = el?.student_course?.filter((item) => item?.course?.name === it.course.name)
                                //             setStudentCourseId(currentCourseId[0]?.id)

                                //             let currentCourse = success?.filter((item) => item.name === it.course.name)
                                //             setStudentSelectedCourse(currentCourse)
                                //             setOnCourseClickModal(true)
                                //         },
                                //         onError: (error: string) => () => {
                                //         },
                                //     }))

                                // }}
                                />
                            </div>
                        )
                    })
                    : "    -",

                [`${translate("auth.stack")}`]: el.stack ? el.stack : "    -",
                [`${translate("auth.branch")}`]: el.branch_id ? el.branch_id.name : '    -',
                [`${translate("common.dateOfJoining")}`]: el.date_of_joining ? getDisplayDateFromMoment(el.date_of_joining) : '            -',
                [`${translate("common.referrer")}`]: <AvatarWithName
                    name={el?.referrer?.name}
                    id={el?.referrer?.id}
                    src={getImageUrl(el?.referrer_photo)}
                />,
                [`${translate("common.action")}`]:
                    <>
                        <DropDownMenuArrow
                            isStudent
                            isVideoCall
                            onDeleteClick={(e) => {
                                e.stopPropagation()
                                setCurrentDeleteItem(el)
                                setDeleteModal(!deleteModal)
                            }}
                            onAddClick={(e) => {
                                e.stopPropagation()
                                // goTo('/dashboard' + AUTH_PATH.REGISTER_STUDENTS, false, 'Edit')
                                dispatch(editUserRegister(el))
                                goTo('/dashboard' + AUTH_PATH.REGISTER_STUDENTS)
                            }}
                            // onAssignCourse={() => {
                            //     dispatch(editUserRegister(el))
                            //     goTo('/dashboard' + ROUTES.ADMIN.ASSIGN_COURSE_STUDENTS)
                            // }}
                            onAddRemark={(e) => {
                                e.stopPropagation()
                                console.log("clicked");
                                dispatch(editUserRegister(el))
                                goTo('/dashboard' + ROUTES.ADMIN.ADMIN_REMARK)
                                // goTo('/dashboard' + ROUTES.ADMIN.ADD_REMARK) 
                            }}
                            onVideoCall={(e) => {
                                e.stopPropagation()
                                goTo('/dashboard' + ROUTES.ADMIN.VIDEO_CALL)
                            }}


                        />
                    </>
            };
        });
    };


    // bulk upload students

    const bulkUploadStudents = () => {

        const params = {
            csv_file: studentBulkUploadData
        }
        setIsBulkUploadModalOpen(true)
        dispatch(postBulkUploadStudents({
            params,
            onSuccess: (success: any) => () => {
                setIsBulkUploadModalOpen(false)
                showToast('success', success.message)
                getStudentsList('')
            },
            onError: (error: any) => () => {
                setIsBulkUploadModalOpen(true)
                if (error?.status_code === 0) {
                    showToast('error', error?.error_message)
                }
            },
        }))
    }

    //template download on click
    const studentTemplateDownload = (e) => {
        e.stopPropagation()
        e.preventDefault()
        const params = {
            employee_template_type: "STU"
        }
        dispatch(fetchEmployeesTemplates({
            params,
            onSuccess: (success: any) => () => {
                urlDownloader(success?.details[0]?.student_template)
            },
            onError: (error: any) => () => {
                if (error?.status_code === 0) {
                    showToast('error', error?.error_message)
                }
            },
        }))
    }


    return (
        <div className='container-fluid pt-4'>
            <div className='row '>
                <div className='col-xl-8 col-sm-12 col-lg-8'>
                    <Card style={{
                        height: isShowStudentsListCard ? dynamicHeight.dynamicWidth <= 1400 ? dynamicHeight.dynamicHeight + 15 : dynamicHeight.dynamicHeight - 50 : "5em",
                    }}>
                        <div className='row'>
                            <div className='col'>
                                <span className='h3'>{translate('course.students')}</span>
                                <div className='float-right row mr-0'>
                                    <div className="mt-0">
                                        <FileUpload
                                            isDownloadTemplate
                                            onTemplateClick={(e) => studentTemplateDownload(e)}
                                            title={translate("course.uploadStudentDetails")!}
                                            onSelect={(data) => {
                                                setStudentBulkUploadData(data)
                                            }}
                                            onSubmitClick={() => {
                                                bulkUploadStudents()
                                            }}
                                            isUploadModalOpen={isBulkUploadModalOpen}
                                            isOpen={isBulkUploadModalOpen}
                                        />
                                    </div>
                                    <Button
                                        text={isShowStudentsListCard ? translate('course.hide') : translate('course.view')}
                                        size={'sm'}
                                        onClick={() => {
                                            dispatch(isShowStudentsList(!isShowStudentsListCard))
                                            if (!isShowStudentsListCard) {
                                                getBranchesList()
                                                getStudentsList("")
                                            }

                                        }}
                                    />
                                    <Button
                                        size={'sm'}
                                        text={translate('course.add')}
                                        onClick={() => {
                                            dispatch(editUserRegister(undefined))
                                            goTo('/dashboard' + AUTH_PATH.REGISTER_STUDENTS)
                                        }}

                                    />
                                </div>
                            </div>

                        </div>
                        <div className='row'>
                            <div className='col-sm-12'>

                                {isShowStudentsListCard &&
                                    <div className='row'>
                                        <div className='col-sm-6  mb--2 pt-4' >
                                            <InputWithImage
                                                image="search"
                                                placeholder={translate("auth.search")!}
                                                onChange={(e) => {
                                                    setSearchStudent(e.target.value)
                                                    setStudentSearch(true)
                                                    setOnlineStatusSearch(false)
                                                }}
                                                onClick={() => {
                                                    getStudentsList("")
                                                }}
                                                onFocus={() => {
                                                    setIsStudentSearch(true)
                                                }}
                                                onBlur={() => {
                                                    setIsUserSearch(false);
                                                    setIsStudentSearch(false);
                                                }}
                                            />
                                        </div>
                                        {isSuperAdmin && (
                                            <div className='col-sm-6 pt-4'>
                                                <DropDown
                                                    // heading={translate('auth.branch')!}
                                                    data={branchesData}
                                                    placeholder={'Select Branch'}
                                                    value={branchId}
                                                    onChange={(e) => {
                                                        setBranchId(e.target.value)
                                                        getStudentsList(e.target.value)
                                                        setOnlineStatusSearch(false)

                                                    }}
                                                />
                                            </div>
                                        )}
                                    </div>}
                            </div>


                        </div>

                        {/* isShowStudentsListCard ? dynamicHeight.dynamicWidth <= 576 ? dynamicHeight.dynamicHeight - 130 : dynamicHeight.dynamicHeight - 220 : 0, */}
                        <div className={` overflow-auto scroll-hidden `}
                            style={{
                                height: isShowStudentsListCard ? dynamicHeight.dynamicWidth <= 576 ? dynamicHeight.dynamicHeight - 200 :
                                    dynamicHeight.dynamicWidth <= 1400 ? dynamicHeight.dynamicHeight - 130 : dynamicHeight.dynamicHeight - 220 : 0,
                                margin: '0px -39px 0px -39px '
                            }}

                        >


                            {studentsListData && studentsListData?.length > 0 ?
                                <CommonTable displayDataSet={normalizedStudentsData(studentsListData)}
                                    isLoading={studentsListLoader.loader}
                                    tableOnClick={(e, index) => {
                                        e.stopPropagation()
                                        const current = studentsListData[index]
                                        dispatch(editUserRegister(current))
                                        goTo('/dashboard' + ROUTES.ADMIN.VIEW_STUDENT_DETAILS)

                                    }}
                                />
                                :
                                <div className=" d-flex justify-content-center align-items-center" style={{
                                    height: '80.5vh'
                                }}>

                                    <NoRecordsFound />
                                </div>
                            }
                        </div>
                    </Card>
                </div>
                <div className='col-xl-4 col-sm-12 col-lg-4' >
                    <UserOnlineStatus
                        // className='onlineStatus-Card'
                        isLoading={activeStatusCardLoader.loader}
                        data={usersStatusListData}
                        onClick={(status: boolean) => {
                            setUserListStatus(!status)
                            if (!userListStatus) {
                                getStudentActiveLog()
                            }

                        }}
                        isViewClick={userListStatus}
                        onChange={(e) => {
                            setStudentSearch(false)
                            setOnlineStatusSearch(true)
                            setSearchUser(e.target.value)
                        }}
                        onSearchClick={() => {
                            getStudentActiveLog()
                        }}
                        onFocus={() => {
                            setIsUserSearch(true)
                        }}
                        onBlur={() => {
                            setIsUserSearch(false);
                            setIsStudentSearch(false);
                        }}
                    />
                </div>

            </div>


            {/**
       * delete modal
       */}

            <Modal isOpen={deleteModal} onClose={() => { setDeleteModal(!deleteModal) }} title={`Do you want to delete the selected Student?`} titleClassname={'text-muted fw-light'}>
                <div className="mt--4 ml--1">
                    <h2>{currentDeleteItem?.name}</h2>
                </div>

                <div className='text-right'>
                    <Button
                        color={'secondary'}
                        text={translate('common.cancel')}
                        onClick={() => { setDeleteModal(!deleteModal) }}
                    />
                    <Button
                        isLoading={submitLoader}
                        text={'Proceed'}
                        onClick={() => {
                            if (!submitLoader) {
                                onDeleteHandler(currentDeleteItem.id)
                            }
                        }}
                    />
                </div>
            </Modal>

            <Modal isOpen={onCourseClickModal} onClose={() => { setOnCourseClickModal(!onCourseClickModal) }}
                title={'Assign starts from'}
                isModalLoading={assignStartsFromModalLoader.loader}
            >
                <div className='mt--4'>
                    <div className='mb-3'>
                        <DropDown
                            heading={'Section'}
                            placeholder='Section'
                            data={studentSelectedCourse[0]?.sections}
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
                        onClick={() => { setOnCourseClickModal(!onCourseClickModal) }}
                    />
                    <Button

                        text={translate('common.submit')}
                        onClick={() => {
                            onSubmitHandler()
                        }}
                    />
                </div>
            </Modal>
        </div>

    )
}

export { RegisteredStudents } 
