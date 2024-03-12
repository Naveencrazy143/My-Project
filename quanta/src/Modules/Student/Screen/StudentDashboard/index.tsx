import { icons } from "@Assets";
import { DynamicHeight, useNavigation } from '@Hooks';
import { translate } from "@I18n";
import { AdminNavbar, ProfileCard } from "@Modules";
import { fetchStudentCourses, fetchStudentCourseSection, isActiveSectionList, isBackNavigation, postGenericCrudDetails, settingCurrentCourse, settingStudentCurrentCourseSection } from '@Redux';
import { ROUTES } from '@Routes';
import { getImageUrl } from '@Utils';
import moment from 'moment';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { Button } from "@Components";


let date = moment().format("YYYY-MM-DD")

function StudentDashboard() {

    const dynamicHeight: any = DynamicHeight()


    const dispatch = useDispatch()
    const { goTo } = useNavigation()
    const { dashboardDetails, studentCourses, isBack, isActiveSection } = useSelector((state: any) => state.DashboardReducer);


    useEffect(() => {
        if (isBack === false) {
            getStudentCourse()
        }
        if (isBack) {
            dispatch(isBackNavigation(false))
        }
        dispatch(isActiveSectionList(!isActiveSection))

    }, [])

    const getStudentCourse = () => {
        const params = {}
        dispatch(fetchStudentCourses({
            params,
            onSuccess: (success) => () => {
                checkIsCompletedCourse(success?.details)
            },
            onError: (error) => () => { }
        }))
    }


    const checkIsCompletedCourse = async (courseData) => {
        console.log("called");
        console.log("dataaa===>.", courseData)


        let manditoryMarkedAsCompletedCount = 0
        let markedAsCompletedCount = 0

        courseData.forEach(async (el) => {

            if (await el?.is_completed === false && el.base_status === "ST") {

                if (await (el?.manditory_sections === el?.completed_manditory_sections || (el?.total_sections === el?.manditory_sections && el?.total_sections === el?.completed_sections))) {

                    const params = {
                        mq: "student__StudentCourse",
                        data: {
                            id: el.id,
                            is_completed: true,
                            is_partially_completed: el?.total_sections === el?.manditory_sections ? false : true,
                            end_date: date,
                            base_status: 'CP'
                        }
                    }
                    updateCourseStatus(params)
                }

            }

            else if (el?.is_partially_completed === true) {

                if (await (el?.total_sections === el?.completed_sections + markedAsCompletedCount)) {
                    const params = {
                        mq: "student__StudentCourse",
                        data: {
                            id: el.id,
                            is_completed: true,
                            is_partially_completed: false,
                            end_date: date,
                            base_status: 'CP'
                        }
                    }
                    updateCourseStatus(params)
                }

            }
        })

    }

    const updateCourseStatus = (params) => {

        dispatch(postGenericCrudDetails({
            params,
            onSuccess: (success: any) => () => {
                getStudentCourse()

            },
            onError: (error: string) => () => {
            },
        }))
    }

    const addStartDate = (courseData) => {
        const params = {
            mq: "student__StudentCourse",
            data: {
                id: courseData?.id,
                start_date: date,
                base_status: 'ST'
            }
        }

        if (courseData?.base_status === "CR") {

            dispatch(postGenericCrudDetails({
                params,
                onSuccess: (success: any) => () => {
                    getStudentCourse()
                },
                onError: (error: string) => () => {
                },
            }))
        }
    }

    console.log("dashboardDetails==>", dashboardDetails);
    

    return (

        <div className='container-fluid zoom'>
            <div className=''>
                <AdminNavbar userName={dashboardDetails?.user_details?.name} fixedTop='fixed-top' userProfile={dashboardDetails?.user_details?.photo} isShowToggle={true} />
            </div>

            <div className={`row mt-7`}>
                {studentCourses && studentCourses.length > 0 ? (
                    studentCourses.map((item, index) => {
                        return (
                            <div className='col-xsm-3 col-sm-6 col-lg-3 col-md-6 pt-5' >
                                <ProfileCard cursor='' courseName={item.course.name} photo={item.course.thumbnail ? item.course.thumbnail : icons.defaultImage} subText={item.course.description}
                                    startDate={item?.base_status !== "CR" && item?.course_duration?.start_date}
                                    height='17em'
                                    endDate={item?.base_status === "CP" && item?.course_duration?.end_date}
                                    assignDate={item?.course_duration?.start_date}
                                    subLength={70}
                                    buttonText={item?.base_status && item?.course_duration?.end_date ? translate("common.completed")! : item?.base_status === "ST" ? translate("common.resume")! : translate("common.startNow")!}
                                    bgImage={getImageUrl(item.course.banner_image)}
                                    total={item?.total_sections}
                                    completed={item?.completed_sections}
                                    buttonOnClick={() => {
                                        dispatch(isBackNavigation(false))
                                        dispatch(settingStudentCurrentCourseSection(""))
                                        let currentCourse = studentCourses.filter((el) => el.course.name === item.course.name)
                                        dispatch(settingCurrentCourse(currentCourse))
                                        goTo(ROUTES.HOME.COURSE_SECTION)
                                        addStartDate(item)
                                    }}
                                />
                            </div>
                        )
                    })
                )
                    :
                    <div className='container justify-content-center align-items-center'>
                        {/* <NoRecordsFound /> */}
                        <small className='d-flex justify-content-center align-items-center'>{translate("course.noCourseIsAssigned")!}</small>
                    </div>
                }
            </div>

        </div>
    )
}

export { StudentDashboard };
