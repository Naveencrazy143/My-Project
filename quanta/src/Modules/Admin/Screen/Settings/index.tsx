import React, { useEffect, useState } from 'react'
import { Button, Card, Checkbox, CommonTable, DropDown, Input, Modal, NoRecordsFound, Radio, RadioGroup } from '@Components'
import { translate } from '@I18n'
import { addDepartment, addDesignation, getAllBranchesList, getDepartmentData, getDesignationData, postBranch, } from '@Redux';
import { useDispatch, useSelector } from "react-redux";
import { convertToUpperCase, removeCodeFromName, showToast } from '@Utils';
import { DynamicHeight, useLoader } from '@Hooks';
import { DropDownMenuArrow } from '@Modules';

const data = [
    { id: 1, value: 'Admin' },
    { id: 2, value: 'Faculty' },
    { id: 3, value: 'Approver' }
]

function Settings() {
    const dispatch = useDispatch();
    const { departmentData, designationData, dashboardDetails, branchesDropdownData, branch } = useSelector(
        (state: any) => state.DashboardReducer
    );
    const dynamicHeight: any = DynamicHeight()




    const [isDesignationModal, setIsDesignationModal] = useState(false)
    const [isDepartmentModal, setIsDepartmentModal] = useState(false)
    const [departmentListStatus, setDepartmentListStatus] = useState(false)
    const [designationListStatus, setDesignationListStatus] = useState(false)
    const [branchesListStatus, setBranchesListStatus] = useState(false)
    const [isBranchesModal, setIsBranchesModal] = useState(false)
    const [department, setDepartment] = useState('')
    const [designation, setDesignation] = useState('')
    const departmentListLoader = useLoader(false)
    const designationListLoader = useLoader(false)
    const postAddingDepartmentLoader = useLoader(false)
    const postAddingDesignationLoader = useLoader(false)
    const branchesListLoader = useLoader(false)
    const postAddingBranchesLoader = useLoader(false)


    const [isActive, setIsActive] = useState('Admin')
    const [parentBranch, setParentBranch] = useState('')
    // const [isParent, setIsParent] = useState(false)
    const [branchName, setBranchName] = useState('')
    const [currentBranchData, setCurrentBranchData] = useState<any>(null)
    const [filteredBranches, setFilteredBranches] = useState([])

    const getDepartmentList = () => {
        // dispatch(getDepartmentData({}));
        departmentListLoader.showLoader()

        const params = {}

        dispatch(getDepartmentData({
            params,
            onSuccess: (success: any) => () => {
                departmentListLoader.hideLoader()
            },
            onError: (error: string) => () => {
                departmentListLoader.hideLoader()
            },
        }))

    }

    const getDesignationList = () => {
        // dispatch(getDesignationData({}));
        designationListLoader.showLoader()

        const params = {}
        dispatch(getDesignationData({
            params,
            onSuccess: (success: any) => () => {
                designationListLoader.hideLoader()
            },
            onError: (error: string) => () => {
                designationListLoader.hideLoader()
            },
        }))
    }
    ///
    const postAddingDepartment = () => {

        if (department === '') {
            showToast('error', 'Stack field cannot be empty')
        }
        else {
            const params = {
                name: convertToUpperCase(department)
            }
            postAddingDepartmentLoader.showLoader()
            dispatch(addDepartment({
                params,
                onSuccess: (success: any) => () => {
                    setDepartment('')
                    postAddingDepartmentLoader.hideLoader()
                    getDepartmentList();
                    setIsDepartmentModal(false)
                    showToast('success', success.message)
                },
                onError: (error) => () => {
                    postAddingDepartmentLoader.hideLoader()
                    if (error?.status_code === 0) {
                        showToast('error', error?.error_message)
                    }
                },
            }))
        }
    }


    const postAddingDesignation = () => {
        const roleKey = isActive === 'Admin' ? 'is_admin' : isActive === 'Faculty' ? 'is_faculty' : 'is_approver'
        if (designation === '') {
            showToast('error', 'Role field cannot be empty ')

        }
        else {
            const params = {
                name: convertToUpperCase(designation),
                [roleKey]: true
            }

            if (!designation) {
                showToast('error', 'Role field cannot be empty')
            }
            else {
                postAddingDesignationLoader.showLoader()
                dispatch(addDesignation({
                    params,
                    onSuccess: (success: any) => () => {
                        postAddingDesignationLoader.hideLoader()
                        setDesignation('')
                        setIsActive('Admin')
                        getDesignationList()
                        setIsDesignationModal(false)
                        showToast('success', success.message)
                    },
                    onError: (error: any) => () => {
                        postAddingDesignationLoader.hideLoader()
                        if (error?.status_code === 0) {
                            showToast('error', error?.error_message)
                        }
                    },
                }))
            }


        }
    }


    const normalizedDepartmentData = (data: any) => {
        return data.map((el: any) => {
            return {
                [`${translate("auth.name")!}`]: el.name,

            };
        });
    };

    const normalizedDesignationData = (data: any) => {
        return data.map((el: any) => {
            return {
                [`${translate("auth.name")!}`]: el.name,

            };
        });
    };

    //branch prefill while edit branch

    const prefillingBranchData = (el: any) => {

        const prefilledFilteredBranches = branchesDropdownData && branchesDropdownData.length > 0 &&
            branchesDropdownData.filter((item: any) => item.id !== el?.id)
        setBranchName(removeCodeFromName(el?.name))
        setParentBranch(el?.parent_id)
        setFilteredBranches(prefilledFilteredBranches)
    }

    //branch table data

    const normalizedBranchesData = (data: any) => {
        return data.map((el: any) => {
            return {
                [`${translate("auth.name")!}`]: el.name,
                [`${translate("auth.parent")!}`]: el?.parent_name ? el?.parent_name : '-',
                "": <><DropDownMenuArrow
                    onAddClick={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        prefillingBranchData(el)
                        setIsBranchesModal(true)
                        setCurrentBranchData(el)
                    }
                    }
                    showDelete
                />
                </>

            };
        });
    };



    // get branch list

    const getAllBranchesListData = () => {
        // console.log("parrrn==>",isParent)
        branchesListLoader.showLoader()
        const params = {}
        dispatch(getAllBranchesList({
            params,
            onSuccess: (response: any) => () => {
                branchesListLoader.hideLoader()
            },
            onError: (error) => () => {
                branchesListLoader.hideLoader()
            },
        }))
    }

    // add branch api

    const postAddingBranch = () => {
        if (branchName === '') {
            showToast('error', 'Please fill branch name')
        }
        else if (parentBranch === '') {
            showToast('error', 'Please select parent branch')
        }
        else {

            postAddingBranchesLoader.showLoader()

            const params = {
                ...(currentBranchData && { id: currentBranchData?.id }),
                name: branchName,
                parent_id: parentBranch
            }
            dispatch(postBranch({
                params,
                onSuccess: (success: any) => () => {
                    postAddingBranchesLoader.hideLoader()
                    showToast('success', success.message)
                    setIsBranchesModal(false)
                    clearBranchStates()
                    getAllBranchesListData()
                    setCurrentBranchData('')
                },
                onError: (error: any) => () => {
                    postAddingBranchesLoader.hideLoader()
                    if (error?.status_code === 0) {
                        showToast('error', error?.error_message)
                    }
                },
            }))
        }
    }

    //clearing states while add and edit branch

    const clearBranchStates = () => {
        setBranchName('')
        setParentBranch('')
    }

    return (
        <>
            <div className='container-fluid h-100vh'>
                <div className="row pt-4">
                    <div className='col-sm-4 mt-2' >
                        <Card className=''
                            style={{ height: departmentListStatus ? dynamicHeight.dynamicWidth <= 1400 ? dynamicHeight.dynamicHeight + 15 : dynamicHeight.dynamicHeight - 50 : "5em" }}>


                            <div className='row'>
                                <div className='col'>
                                    <h3>{translate('auth.stack')!}</h3>
                                </div>
                                <div className='text-right mr-3 '>
                                    <Button
                                        text={departmentListStatus ? translate('course.hide') : translate('course.view')}
                                        size={'sm'}
                                        onClick={() => {
                                            if (!departmentListStatus) {
                                                getDepartmentList()
                                            }
                                            setDepartmentListStatus(!departmentListStatus)
                                        }}
                                    />
                                    {dashboardDetails?.permission_details?.is_super_admin && (
                                        <Button
                                            text={translate('course.add')}
                                            size={'sm'}
                                            onClick={() => setIsDepartmentModal(!isDepartmentModal)}
                                        />
                                    )}

                                </div>
                            </div>
                            <div className={` overflow-auto scroll-hidden`}
                                style={{ height: departmentListStatus ? dynamicHeight.dynamicWidth <= 1400 ? dynamicHeight.dynamicHeight - 58 : dynamicHeight.dynamicHeight - 140 : 0, margin: '0px -39px 0px -39px' }}>

                                {departmentData && departmentData?.length > 0 ?
                                    <CommonTable displayDataSet={normalizedDepartmentData(departmentData)}
                                        isLoading={departmentListLoader.loader}
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
                    <div className='col-sm-4 mt-2'>
                        <Card style={{ height: designationListStatus ? dynamicHeight.dynamicWidth <= 1400 ? dynamicHeight.dynamicHeight + 15 : dynamicHeight.dynamicHeight - 50 : "5em" }}>

                            <div className='row'>
                                <div className='col'>
                                    <h3>{translate('course.facultyRole')}</h3>
                                </div>
                                <div className='text-right mr-3 '>
                                    <Button
                                        text={designationListStatus ? translate('course.hide') : translate('course.view')}
                                        size={'sm'}
                                        onClick={() => {
                                            if (!designationListStatus) {
                                                getDesignationList()
                                            }
                                            setDesignationListStatus(!designationListStatus)
                                        }}
                                    />
                                    {dashboardDetails?.permission_details?.is_super_admin && (

                                        <Button
                                            text={translate('course.add')}
                                            size={'sm'}
                                            onClick={() => setIsDesignationModal(!isDesignationModal)}
                                        />
                                    )}
                                </div>
                            </div>

                            <div className={` overflow-auto scroll-hidden`}
                                style={{ height: designationListStatus ? dynamicHeight.dynamicWidth <= 1400 ? dynamicHeight.dynamicHeight - 58 : dynamicHeight.dynamicHeight - 140 : 0, margin: '0px -39px 0px -39px' }}
                            >
                                {designationData && designationData?.length > 0 ?
                                    <CommonTable displayDataSet={normalizedDesignationData(designationData)}
                                        isLoading={designationListLoader.loader}
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


                    <div className='col-sm-4 mt-2'>
                        <Card style={{ height: branchesListStatus ? dynamicHeight.dynamicWidth <= 1400 ? dynamicHeight.dynamicHeight + 15 : dynamicHeight.dynamicHeight - 50 : "5em" }}>
                            <div className='row'>
                                <div className='col'>
                                    <h3>{translate("auth.branches")!}</h3>
                                </div>
                                <div className='text-right mr-3 '>
                                    <Button
                                        text={branchesListStatus ? translate('course.hide') : translate('course.view')}
                                        size={'sm'}
                                        onClick={() => {
                                            if (!branchesListStatus) {
                                                getAllBranchesListData()
                                            }
                                            setBranchesListStatus(!branchesListStatus)
                                        }}
                                    />
                                    {dashboardDetails?.permission_details?.is_super_admin && (

                                        <Button
                                            text={translate('course.add')}
                                            size={'sm'}
                                            onClick={() => {
                                                if (!branchesListStatus) {
                                                    getAllBranchesListData()
                                                }
                                                setIsBranchesModal(!isBranchesModal)
                                            }}
                                        />
                                    )}
                                </div>
                            </div>

                            <div className={` overflow-auto scroll-hidden`}
                                style={{ height: branchesListStatus ? dynamicHeight.dynamicWidth <= 1400 ? dynamicHeight.dynamicHeight - 50 : dynamicHeight.dynamicHeight - 140 : 0, margin: '0px -39px 0px -39px' }}
                            >
                                {branchesDropdownData && branchesDropdownData?.length > 0 ?
                                    <CommonTable displayDataSet={normalizedBranchesData(branchesDropdownData)}
                                    // isLoading={branchesListLoader.loader}
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



                </div>

                {/**
            * Department
            */}

                <Modal isModalLoading={postAddingDepartmentLoader.loader} isOpen={isDepartmentModal}
                    onClose={() => {
                        setDepartment('')
                        setIsActive('Admin')

                        setIsDepartmentModal(!isDepartmentModal)
                    }}
                    title={translate('auth.addStack')!} >
                    <div className="">
                        <Input
                            placeholder={translate('auth.stack')!}
                            value={department}
                            onChange={(e) => setDepartment(e.target.value)}
                        />
                    </div>
                    <div className='text-right'>
                        <Button
                            color={'secondary'}
                            text={translate('common.cancel')}
                            onClick={() => {
                                setDepartment('')
                                setIsActive('Admin')

                                setIsDepartmentModal(!isDepartmentModal)
                            }}
                        />
                        <Button

                            text={translate('common.submit')}
                            onClick={() => {
                                postAddingDepartment()
                            }}
                        />
                    </div>
                </Modal>

                {/**
            * Designation
            */}

                <Modal isModalLoading={postAddingDesignationLoader.loader} isOpen={isDesignationModal}
                    onClose={() => {
                        setDesignation('')
                        setIsDesignationModal(!isDesignationModal)
                    }}
                    title={translate('course.addFacultyRole')!}>
                    <div className=''>
                        <div className="">
                            <Input
                                heading={translate('auth.name')!}
                                placeholder={translate('course.role')!}
                                value={designation}
                                onChange={(e) => setDesignation(e.target.value)}
                            />
                        </div>
                        {/* <div className='mb-4 ml-2 mr-3 d-flex flex-row-reverse'> */}
                        <label className={`form-control-label`}>{translate("auth.userType")!}</label>
                        <div className='mb-3'>
                            <RadioGroup
                                data={data}
                                onButtonClick={(value) => {
                                    setIsActive(value)
                                }}
                                isActive={isActive}
                            />
                        </div>
                        {/* </div> */}
                    </div>
                    <div className='text-right'>
                        <Button
                            color={'secondary'}
                            text={translate('common.cancel')}
                            onClick={() => {
                                setDesignation('')
                                setIsDesignationModal(!isDesignationModal)
                            }}
                        />
                        <Button
                            text={translate('common.submit')}
                            onClick={() => {
                                postAddingDesignation()
                            }}
                        />

                    </div>

                </Modal>

                <Modal isModalLoading={postAddingBranchesLoader.loader} isOpen={isBranchesModal}
                    onClose={() => {
                        clearBranchStates()
                        setIsBranchesModal(!isBranchesModal)
                        setCurrentBranchData('')
                    }}
                    title={`${currentBranchData?.id ? translate("common.edit")! : translate("course.add")!} ${translate("auth.branch")!}`}
                >
                    <div className=''>
                        <div className="">
                            <Input
                                heading={translate('auth.name')!}
                                placeholder={translate("admin.branchName")!}
                                value={branchName}
                                onChange={(e) => setBranchName(convertToUpperCase(e.target.value))}
                            />
                        </div>

                        <div>
                            <DropDown
                                heading={`${translate("auth.parent")} ${translate("auth.branch")!}`}
                                placeholder={`${translate("auth.parent")} ${translate("auth.branch")!}`}
                                data={currentBranchData ? filteredBranches : branchesDropdownData}
                                value={parentBranch}
                                onChange={(e) => {
                                    setParentBranch(e.target.value)
                                }}
                            />
                        </div>

                    </div>
                    <div className='text-right mt-4'>
                        <Button
                            color={'secondary'}
                            text={translate('common.cancel')}
                            onClick={() => {
                                setIsBranchesModal(!isBranchesModal)
                                clearBranchStates()
                                setCurrentBranchData('')
                            }}
                        />
                        <Button
                            text={translate('common.submit')}
                            onClick={() => {
                                postAddingBranch()
                            }}
                        />

                    </div>

                </Modal>


            </div>
        </>
    )
}

export { Settings } 