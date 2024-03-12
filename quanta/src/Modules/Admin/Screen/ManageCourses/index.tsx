import React, { useEffect } from 'react'
import { AdminNavbar, ProfilePicture, ProfileCard, UserProfile } from "@Modules";
import { useSelector, useDispatch } from 'react-redux';
import { fetchCourses, fetchStudentCourses, isBackNavigation, settingCurrentCourse, settingCurrentCourseSection, settingStudentCurrentCourseSection, syncDetails } from '@Redux';
import { icons } from "@Assets"
import { useNavigation } from '@Hooks';
import { ROUTES } from '@Routes';
import { Button, NoRecordsFound } from '@Components';
import { getImageUrl } from '@Utils';
import { translate } from '@I18n';


function ManageCourses() {

    const dispatch = useDispatch()
    const { goTo } = useNavigation()
    const { dashboardDetails, registeredCourses, isBack, currentNav } = useSelector((state: any) => state.DashboardReducer);
    const { isSync } = useSelector(
        (state: any) => state.AppReducer
    );


    useEffect(() => {
        if (!isSync.course || currentNav === 'Courses') {
            getCourses()
        }
    }, [])

    const getCourses = () => {
        const params = {}

        dispatch(fetchCourses({
            params,
            onSuccess: (success: any) => () => {
                dispatch(syncDetails({ ...isSync, 'course': true }))
            },
            onError: (error: string) => () => {
            },
        }))
    }

    return (
        <>
            <div className=''>
                <AdminNavbar userName={dashboardDetails?.user_details?.name} fixedTop={'fixed-top'} userProfile={dashboardDetails?.user_details?.photo} />
            </div>
            <div className='container-fluid'>

                <div className='text-right mt-7 mr-3'>
                    <Button
                        text={'View all batches'}
                        onClick={() => {
                            dispatch(settingCurrentCourse(''))
                            goTo('/dashboard' + ROUTES.ADMIN.BATCH_GROUP_LISTING)
                        }}
                    />
                    <Button
                        text={translate("course.addCourse")}
                        onClick={() => {
                            dispatch(syncDetails({ ...isSync, 'course': false }))
                            goTo('/dashboard' + ROUTES.ADMIN.ADD_COURSE)
                        }}
                    />
                    {/* <Button
                        text={'View all Batches'}
                        onClick={() => {
                            goTo('/dashboard' + ROUTES.ADMIN.ADD_COURSE)
                        }}
                    /> */}
                </div>
                <div className={`row pb-3 mt--2 mx-lg-0 mx-sm-0 mx-2`}>
                    {registeredCourses && registeredCourses?.length > 0 ? (
                        registeredCourses.map((item, index) => {

                            return (

                                <div className='col-xl-3 col-lg-4 col-md-4 col-sm-6  pt-5 '
                                    onClick={() => {

                                    }}>

                                    <ProfileCard className='zoom ' courseName={item?.name} photo={getImageUrl(item?.thumbnail)} subText={item?.description}
                                        disable={true}
                                        height={'15em'}
                                        buttonText={'Course details'}
                                        buttonSize={'sm'}
                                        buttonOnClick={(e) => {
                                            dispatch(settingCurrentCourseSection(""))
                                            dispatch(settingStudentCurrentCourseSection(""))
                                            dispatch(syncDetails({ ...isSync, 'courseTopics': false }))
                                            let currentCourse = registeredCourses.filter((el) => el.name === item.name)
                                            dispatch(settingCurrentCourse(currentCourse))
                                            goTo('/dashboard' + ROUTES.HOME.ADMIN_COURSE_SECTION)
                                        }}
                                        buttonText2={'Batches'}
                                        buttonSize2={'sm'}
                                        buttonOnClick2={() => {
                                            let currentCourse = registeredCourses.filter((el) => el.name === item.name)
                                            dispatch(settingCurrentCourse(currentCourse))
                                            goTo('/dashboard' + ROUTES.ADMIN.BATCH_GROUP_LISTING)

                                        }}
                                        isAdmin
                                    />
                                </div>
                            )
                        })
                    )
                        :
                        <div className='container justify-content-center'>
                            <NoRecordsFound />
                        </div>
                    }
                </div>
            </div>

        </>
    )
}

export { ManageCourses }