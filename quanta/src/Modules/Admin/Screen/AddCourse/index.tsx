import React, { useEffect, useState } from 'react'
import { Button, DropDown, Input, Modal } from '@Components'
import { translate } from '@I18n'
import { fetchCourses, fetchFacultiesList, getCourseIde, getDepartmentData, isCourseRenderer, postAddCourse, postGenericCrudDetails, settingCurrentCourse, settingDefaultCourse, settingIsSuperAdmin } from '@Redux';
import { useDispatch, useSelector } from "react-redux";
import { useLoader, useNavigation } from '@Hooks'
import { ROUTES } from '@Routes';
import { showToast, convertToUpperCase } from '@Utils';


function AddCourse() {

    const dispatch = useDispatch();
    const { goTo, goBack } = useNavigation()

    const { registeredCourses, courseRenderer, departmentData, courseIdeList } = useSelector(
        (state: any) => state.DashboardReducer
    );


    const [isOpenModal, setIsOpenModal] = useState(true)
    const [departmentId, setDepartmentId] = useState('')
    const [courseIde, setCourseIde] = useState('')

    const [addCourseDetails, setAddCourseDetails] = useState({
        name: '', description: ''
    })
    const addCourseModalLoader = useLoader(false)
    console.log("registeredCourses", departmentData);

    useEffect(() => {
        fetchCourseIde()
        fetchDepartmentData()
    }, [])

    const fetchDepartmentData = () => {
        const params = {}
        dispatch(getDepartmentData({
            params,
            onSuccess: (success) => () => {
            },
            onError: (error) => () => { }
        }));
    }

    const fetchCourseIde = () => {
        const params = {}
        dispatch(getCourseIde({
            params,
            onSuccess: (success: any) => () => {

            },
            onError: (error: string) => () => {
            },
        }))
    }

    const onChangeHandler = (e) => {
        setAddCourseDetails({ ...addCourseDetails, [e.target.name]: e.target.value })
    }

    const validateInputFields = () => {
        if (!addCourseDetails?.name) {
            showToast('error', translate('course.nameCannotBeEmpty ')!)
            return false
        }
        else if (!addCourseDetails?.description) {
            showToast('error', translate('course.descriptionCannotBeEmpty ')!)
            return false
        }
        else if (!departmentId) {
            showToast('error', 'Select the Stack')
            return false
        }
        else if (!courseIde) {
            showToast('error', 'Select the course IDE')
            return false
        }
        else {
            return true
        }
    }

    const onSubmit = () => {
        if (validateInputFields()) {

            const params = {
                name: convertToUpperCase(addCourseDetails.name),
                description: convertToUpperCase(addCourseDetails.description),
                department_id: departmentId,
                ide_id: courseIde
            }

            addCourseModalLoader.showLoader()
            dispatch(postAddCourse({
                params,
                onSuccess: (success: any) => () => {
                    addCourseModalLoader.hideLoader()
                    showToast('success', success.message)
                    setIsOpenModal(false)
                    const params = {}
                    dispatch(fetchCourses({
                        params,
                        onSuccess: (success) => () => {
                            dispatch(settingDefaultCourse(success[0].sections))
                        },
                        onError: (error) => () => { }

                    }))

                    dispatch(isCourseRenderer(!courseRenderer))

                    // dispatch(settingCurrentCourse([]))
                    goTo('/dashboard' + ROUTES.ADMIN.MANAGE_COURSES, false)
                    // window.location.reload();
                },
                onError: (error: string) => () => {
                    addCourseModalLoader.hideLoader()

                },
            }))
        }
    }

    return (
        <div>
            <Modal isOpen={isOpenModal}
                onClose={() => {
                    // goTo('/dashboard' + ROUTES.HOME.ADMIN_COURSE_SECTION, false)
                    // dispatch(settingCurrentCourse([]))
                    goBack()
                    setIsOpenModal(!isOpenModal)
                }} title={translate("course.addCourse")!}
                isModalLoading={addCourseModalLoader.loader}>
                <div className='mb-4 mt--4'>
                    <Input
                        heading={translate('auth.name')}
                        placeholder={translate('auth.name')!}
                        value={addCourseDetails.name}
                        name={'name'}
                        onChange={(e) => onChangeHandler(e)}
                    />

                    <label className='form-control-label'>{translate('course.description')}</label>
                    <textarea
                        cols={5}
                        name={'description'}
                        value={addCourseDetails.description}
                        className="form-control"
                        placeholder={translate('course.typeHere')!}
                        onChange={(e) => {
                            onChangeHandler(e)
                        }}
                    />
                    <div className='mt-3'>
                        <DropDown
                            heading={translate('auth.stack')!}
                            placeholder={translate('auth.stack')!}
                            data={departmentData}
                            value={departmentId}
                            onChange={(e) => {
                                setDepartmentId(e.target.value)
                            }}
                        />
                    </div>

                    <div className='mt-3'>
                        <DropDown
                            heading={`${translate("auth.course")} IDE`}
                            placeholder='Course IDE'
                            data={courseIdeList}
                            value={courseIde}
                            onChange={(e) => {
                                setCourseIde(e.target.value)
                            }}
                        />
                    </div>
                </div>

                <div className='text-right'>
                    <Button
                        color={'secondary'}
                        text={translate('common.cancel')}
                        onClick={() => {
                            setIsOpenModal(!isOpenModal)

                            const params = {}
                            dispatch(fetchCourses({
                                params,
                                onSuccess: (success) => () => {
                                    // dispatch(settingCurrentCourse(success[0]))
                                },
                                onError: (error) => () => { }

                            }))

                            goTo('/dashboard' + ROUTES.ADMIN.MANAGE_COURSES, true)

                            // dispatch(settingCurrentCourse([]))
                            // goBack()

                        }}
                    />
                    <Button
                        text={translate("common.submit")!}
                        onClick={() => {
                            onSubmit()
                        }}
                    />
                </div>
            </Modal>
        </div>
    )
}

export { AddCourse }