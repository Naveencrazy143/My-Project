import React, { useEffect, useState } from 'react'
import { Button, Card, CommonTable, InputWithImage, Modal, NoRecordsFound, Image, useKeyPress, DropDown, FileUpload } from '@Components'
import { DynamicHeight, useLoader, useNavigation } from "@Hooks";
import { AUTH_PATH, ROUTES } from '@Routes';
import { fetchFacultiesList, fetchFacultyDetails, fetchStudentDetails, fetchUserOnlineActiveLog, getAllBranchesList, postGenericCrudDetails, settingSelectedFacultyId, isShowFacultiesList, fetchEmployeesTemplates, postBulkUploadFaculties, selectedFacultyDetails } from '@Redux';
import { useDispatch, useSelector } from "react-redux";
import { translate } from '@I18n'
import { DropDownMenuArrow, UserOnlineStatus } from '@Modules';
import { convertToUpperCase, getImageUrl, showToast, urlDownloader } from '@Utils';
import moment from 'moment';
import { icons } from '@Assets';


function RegisteredFaculties() {

    const dispatch = useDispatch();
    const dynamicHeight: any = DynamicHeight()

    const { facultiesListData, dashboardDetails, branchesDropdownData, isSuperAdmin, userOnlineActiveLog, isShowFacultiesListCard } = useSelector(
        (state: any) => state.DashboardReducer
    );
    const enterPress = useKeyPress('Enter')

    const [userListStatus, setUserListStatus] = useState(false)
    const facultiesListLoader = useLoader(false)
    const activeStatusCardLoader = useLoader(false)
    const [searchUser, setSearchUser] = useState('')
    const [deleteModal, setDeleteModal] = useState(false)
    const [currentDeleteItem, setCurrentDeleteItem] = useState<any>()
    const [searchFaculty, setSearchFaculty] = useState('')
    const [usersStatusListData, setUsersStatusListData] = useState(userOnlineActiveLog)
    const [branchId, setBranchId] = useState('-1')
    const [branchesData, setBranchesData] = useState([])
    const [facultiesBulkUploadData, setFacultiesBulkUploadData] = useState<any>()
    const [submitLoader, setSubmitLoader] = useState(false)
    const [isBulkUploadModalOpen, setIsBulkUploadModalOpen] = useState<boolean>(false)

    const [isFacultySearch, setIsFacultySearch] = useState(false)
    const [isUserSearch, setIsUserSearch] = useState(false)

    const { goTo } = useNavigation()

    useEffect(() => {
        if (enterPress && (searchFaculty || !searchFaculty) && isFacultySearch) {
            getFacultiesList("")
        }
        if (enterPress && (searchUser || !searchUser) && isUserSearch) {
            getFacultyActiveLog()
        }
    }, [enterPress])

    useEffect(() => {
        const interval = setInterval(() => {
            getFacultyActiveLog()
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
                if (branchesDropdownData && branchesDropdownData.length > 0) {
                    let allObj = { id: '-1', name: 'All' }
                    let branchesObj: any = [allObj, ...branchesDropdownData]
                    setBranchesData(branchesObj)
                }
            },
            onError: (error) => () => { }
        },
        ))
    }

    const getFacultiesList = (branchId) => {
        facultiesListLoader.showLoader()
        const params = {
            ...(searchFaculty && { q: searchFaculty }),
            ...(branchId && branchId !== '-1' && { branch_id: branchId })
        }
        dispatch(fetchFacultiesList({
            params,
            onSuccess: (success: any) => () => {
                facultiesListLoader.hideLoader()
            },
            onError: (error: string) => () => {
                facultiesListLoader.hideLoader()
            },
        }))
    }

    /**
     * Api for user active log
     */

    const getFacultyActiveLog = () => {

        const params = {
            ...(searchUser && { q: searchUser }),
            is_student: false
        }
        activeStatusCardLoader.showLoader()
        dispatch(fetchUserOnlineActiveLog({
            params,
            onSuccess: (success) => () => {
                activeStatusCardLoader.hideLoader()
                setUsersStatusListData(success.details)
            },
            onError: (error) => () => {
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
        console.log("paramns-->", params);
        setSubmitLoader(true)

        dispatch(postGenericCrudDetails({
            params,
            onSuccess: (success: any) => () => {
                setSubmitLoader(false)
                showToast('success', success.message)
                setDeleteModal(!deleteModal)
                getFacultiesList("")
            },
            onError: (error: string) => () => {
                setSubmitLoader(false)
                // showToast('error', 'Network error')
            },
        }))

    }

    const normalizedFacultiesData = (data: any) => {
        return data.map((el: any) => {
            return {
                "":
                    <Image
                        variant={'rounded'}
                        alt="..."
                        src={el.photo ? getImageUrl(el.photo) : icons.profile}
                    />,
                [`${translate("auth.name")!}`]: convertToUpperCase(el.name),
                [`${translate("auth.stack")!}`]: el.department_id ? el.department_id.name : '    -',
                [`${translate("course.role")!}`]: el.designation_id ? el.designation_id.name : '   -',
                [`${translate("auth.branch")!}`]: el.branch_id ? el.branch_id.name : '    -',
                [`${translate("common.action")!}`]:
                    <>
                        <DropDownMenuArrow
                            disabled={dashboardDetails?.permission_details?.is_super_admin ? false : true}
                            onDeleteClick={() => {
                                setCurrentDeleteItem(el)
                                setDeleteModal(!deleteModal)
                            }}
                            onAddClick={() => {
                                // console.log("eselle==>",el)
                                manageFacultyHandler(el.id)
                                dispatch(selectedFacultyDetails(el))
                            }}
                        />
                    </>
            };
        });
    };

    const manageFacultyHandler = (id) => {

        id ? dispatch(settingSelectedFacultyId(id)) : dispatch(settingSelectedFacultyId(undefined))
        goTo('/dashboard' + AUTH_PATH.REGISTER_FACULTY)
    }

    // console.log("dynamicHeight.dynamicHeight", dynamicHeight.bodyHeight);

    // to upload bulk faculties for onboard process
    const bulkUploadFaculties = () => {
        setIsBulkUploadModalOpen(true)
        const params = {
            csv_file: facultiesBulkUploadData
        }
        dispatch(postBulkUploadFaculties({
            params,
            onSuccess: (success: any) => () => {
                showToast('success', success.message)
                setIsBulkUploadModalOpen(false)
                getFacultiesList('')
            },
            onError: (error: any) => () => {
                // showToast('error', 'Network error')
                setIsBulkUploadModalOpen(true)
                if (error?.status_code === 0) {
                    showToast('error', error?.error_message)
                }
            },
        }))
    }

    // to download sample template for faculties onboard
    const facultyTemplateDownload = (e) => {
        e.stopPropagation()
        e.preventDefault()
        const params = {
            employee_template_type: "FTY"
        }
        dispatch(fetchEmployeesTemplates({
            params,
            onSuccess: (success: any) => () => {
                urlDownloader(success?.details[0]?.faculty_template)
            },
            onError: (error: any) => () => {
                if (error?.status_code === 0) {
                    showToast('error', error?.error_message)
                }
                // showToast('error', 'Network error')
            },
        }))
    }

    return (
        <div className='container-fluid' style={{ paddingTop: 30 }}>
            <div className='row'>
                <div className='col-sm-8'>
                    <Card
                        style={{
                            height: isShowFacultiesListCard ? dynamicHeight.dynamicWidth <= 1400 ? dynamicHeight.dynamicHeight + 15 : dynamicHeight.dynamicHeight - 50 : "5em",
                        }}

                    >
                        <div className='row'>
                            <div className='col'>
                                <span className='h3'>{translate('course.faculties')}</span>
                                <div className='float-right row mr-0'>
                                    {dashboardDetails?.permission_details?.is_super_admin && <div className="mt-0">
                                        <FileUpload
                                            isDownloadTemplate
                                            onTemplateClick={(e) => facultyTemplateDownload(e)}
                                            title={translate("course.uploadFacultyDetails")!}
                                            onSelect={(data) => {
                                                setFacultiesBulkUploadData(data)
                                            }}
                                            onSubmitClick={() => {
                                                bulkUploadFaculties()
                                            }}
                                            isUploadModalOpen={isBulkUploadModalOpen}
                                            isOpen={isBulkUploadModalOpen}
                                        />
                                    </div>}
                                    <Button
                                        text={isShowFacultiesListCard ? translate('course.hide')! : translate('course.view')!}
                                        size={'sm'}
                                        onClick={() => {
                                            dispatch(isShowFacultiesList(!isShowFacultiesListCard))
                                            if (!isShowFacultiesListCard) {
                                                getBranchesList()
                                            }
                                            if (!isShowFacultiesListCard) {
                                                getFacultiesList("")
                                            }

                                        }}
                                    />
                                    {dashboardDetails?.permission_details?.is_super_admin && (
                                        <Button
                                            size={'sm'}
                                            text={translate('course.add')!}
                                            onClick={() => manageFacultyHandler(undefined)}
                                        />
                                    )}
                                </div>
                            </div>

                        </div>
                        <div className='row'>
                            <div className='col-sm-12'>
                                {isShowFacultiesListCard &&
                                    <div className='row'>
                                        <div className='col-sm-6  mb--2 mt-4'>
                                            <InputWithImage
                                                image="search"
                                                placeholder={translate("auth.search")!}
                                                onChange={(e) => {
                                                    setSearchFaculty(e.target.value)
                                                }}
                                                onClick={() => {
                                                    getFacultiesList("")
                                                }}
                                                onFocus={() => {
                                                    setIsFacultySearch(true)
                                                }}
                                                onBlur={() => {
                                                    // setTimeout(() => {
                                                        setIsFacultySearch(false)
                                                        setIsUserSearch(false)
                                                    // }, 1000)
                                                }}
                                            />
                                        </div>

                                        {isSuperAdmin && (
                                            <div className='col-sm-6 mt-4'>
                                                <DropDown
                                                    // heading={translate('auth.branch')!}
                                                    data={branchesData}
                                                    placeholder={'Select Branch'}
                                                    value={branchId}
                                                    onChange={(e) => {
                                                        setBranchId(e.target.value)
                                                        getFacultiesList(e.target.value)
                                                    }}
                                                />
                                            </div>
                                        )}
                                    </div>
                                }
                            </div>

                        </div>
                        <div className={` overflow-auto scroll-hidden`}
                            style={{
                                height: isShowFacultiesListCard ? dynamicHeight.dynamicWidth <= 576 ? dynamicHeight.dynamicHeight - 200 :
                                    dynamicHeight.dynamicWidth <= 1400 ? dynamicHeight.dynamicHeight - 130 : dynamicHeight.dynamicHeight - 220 : 0,
                                margin: '0px -39px 0px -39px '
                            }}

                        >

                            {facultiesListData && facultiesListData?.length > 0 ?
                                <CommonTable displayDataSet={normalizedFacultiesData(facultiesListData)}
                                    isLoading={facultiesListLoader.loader}
                                // tableOnClick={(e, index) => {
                                //     const current = facultiesListData[index]
                                //     dispatch(selectedFacultyDetails(current))
                                //     goTo('/dashboard' + ROUTES.ADMIN.VIEW_FACULTY_DETAILS)

                                // }}
                                />
                                :
                                <div className=" d-flex justify-content-center align-items-center" style={{
                                    height: '60.5vh'
                                }}>

                                    <NoRecordsFound />
                                </div>
                            }
                        </div>

                    </Card>
                </div>
                <div className='col-sm-4' >
                    <UserOnlineStatus
                        isLoading={activeStatusCardLoader.loader}
                        data={usersStatusListData}
                        onClick={(status: boolean) => {
                            setUserListStatus(!status)
                            if (!userListStatus) {
                                getFacultyActiveLog()
                            }
                        }}

                        isViewClick={userListStatus}
                        onChange={(e) => {
                            setSearchUser(e.target.value)
                        }}
                        onSearchClick={() => {
                            getFacultyActiveLog()
                        }}
                        onFocus={() => {
                            setIsUserSearch(true)
                        }}
                        onBlur={() => {
                            // setTimeout(() => {
                                setIsFacultySearch(false)
                                setIsUserSearch(false)
                            // }, 1000)
                        }}
                    />
                </div>
            </div>
            {/* <Chat/> */}

            {/**
       * delete modal
       */}

            <Modal isOpen={deleteModal} onClose={() => { setDeleteModal(!deleteModal) }} title={`Do you want to delete the selected Faculty?`} titleClassname={'text-muted fw-light'}>
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
        </div>
    )
}

export { RegisteredFaculties } 