import { Back, Card, NoRecordsFound, Pagination } from '@Components';
import { useNavigation } from '@Hooks';
import { translate } from '@I18n';
import { courseIdeType, getNotifications, getStudentTaskData } from '@Redux';
import { ROUTES } from '@Routes';
import { getTimelineRelativeTimeFormat } from '@Utils';
import { stat } from 'fs';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';


const Notifications = ({ }) => {
    const { notificationDetails, currentPage, numOfPages } = useSelector(
        (state: any) => state.AppReducer
    )

    const { goTo } = useNavigation()

    const dispatch = useDispatch()

    useEffect(() => {
        fetchNotifications(currentPage)
        dispatch(courseIdeType(undefined))
        dispatch(getStudentTaskData(undefined))
    }, [])

    useEffect(() => {
        dispatch(getStudentTaskData(undefined))
    }, [])

    function fetchNotifications(pageNumber: any) {
        const params = {
            page_number: pageNumber,
        }
        console.log("parammmmmm===>", JSON.stringify(params))
        dispatch(getNotifications({
            params,
            onSuccess: (success: any) => () => {

            },
            onError: (error: any) => () => {
            },
        }))
    }
    console.log("notificationDetails==>", notificationDetails)

    function navigateToScreen(el) {

        // console.log("elemrnt===qqqqqqqqqq>", el)

        const route_type = el?.extra?.route_type
        const NOTI_TYPE_TASK_SUBMISSION = 'TASK_SUBMISSION'
        const NOTI_TYPE_PENDING_APPROVAL = 'PENDING_APPROVAL'
        const NOTI_TYPE_STUDENT_PAGE = 'STUDENT_PAGE'
        const TASK_SUBMISSION_AD = 'TASK_SUBMISSION_AD'
        const NOTI_TYPE_USER_REMARK_REQUEST = 'USER_REMARKS_REQUEST'
        const NOTI_TYPE_USER_REMARK_REQUEST_AD = 'USER_REMARKS_REQUEST_AD'
        const FACULTY_CHAT = 'FACULTY_CHAT'
        const STUDENT_CHAT = 'STUDENT_CHAT'

        if (route_type === NOTI_TYPE_PENDING_APPROVAL) {
            goTo(ROUTES.ADMIN.PENDING_APPROVALS)
        }
        else if (route_type === NOTI_TYPE_TASK_SUBMISSION) {
            dispatch(courseIdeType(el?.extra?.route_params?.ide))
            dispatch(getStudentTaskData(el?.extra))
            console.log("studentTaskData========>", el.extra)
            goTo(ROUTES.HOME.LANDING)
        }
        else if (route_type === NOTI_TYPE_STUDENT_PAGE) {
            goTo(ROUTES.HOME.STUDENT_PAGE)
        }
        else if (route_type === TASK_SUBMISSION_AD) {
            dispatch(courseIdeType(el?.extra?.route_params?.ide))
            dispatch(getStudentTaskData(el?.extra))
            goTo('/dashboard' + ROUTES.ADMIN.VIEW_STUDENT_TASK_DETAILS)
        }
        else if (route_type === NOTI_TYPE_USER_REMARK_REQUEST) {
            goTo('/dashboard' + ROUTES.ADMIN.ADMIN_REMARK)
        }
        else if (route_type === NOTI_TYPE_USER_REMARK_REQUEST_AD) {
            goTo('/dashboard' + ROUTES.ADMIN.SUPER_ADMIN_REMARK)
        }
        else if (route_type === FACULTY_CHAT) {
            dispatch(courseIdeType(el?.extra?.route_params?.ide))
            dispatch(getStudentTaskData(el?.extra))
            console.log("studentTaskData", el.extra)
            goTo('/dashboard' + ROUTES.ADMIN.VIEW_STUDENT_TASK_DETAILS)
        }
        else if (route_type === STUDENT_CHAT) {
            dispatch(courseIdeType(el?.extra?.route_params?.ide))
            dispatch(getStudentTaskData(el?.extra))
            console.log("studentTaskData===>", el.extra)
            goTo(ROUTES.HOME.LANDING)
        }

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
        fetchNotifications(page);
    }

    return (
        <>
            <div className='container-fluid py-2 h-100v zoom'>
                <div className='pb-2'>
                    <Back text={translate("admin.notifications")!} />
                </div>
                <div className='row pt-4'>
                    <div className='col-sm-12 '>
                        {notificationDetails && notificationDetails?.length > 0 ? notificationDetails?.map((el: any) => {
                            return (
                                <>
                                    <Card className='pointer' onClick={() => navigateToScreen(el)}>
                                        <div className={"row justify-content-between "} >
                                            <div className='col-8'>
                                                <div className="h3">
                                                    {el.title}
                                                </div>
                                                <div className={' text-wrap'}>
                                                    <p>
                                                        {el.message}
                                                    </p>

                                                </div>
                                            </div>
                                            <div className='text-right col-4'>
                                                <div className='mb--2'>
                                                    <span className='h6  font-weight-light '>
                                                        {translate("admin.postedAt")!}
                                                    </span>
                                                </div>
                                                <div>
                                                    <span className='h5 '>
                                                        {getTimelineRelativeTimeFormat(el.created_at)}
                                                    </span>
                                                </div>

                                            </div>
                                        </div>

                                    </Card>

                                </>
                            )
                        })
                            :
                            <div className=" d-flex justify-content-center align-items-center" style={{
                                height: "77.2vh"
                            }}>
                                <NoRecordsFound />
                            </div>
                        }

                        {notificationDetails && notificationDetails.length > 0 && (
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

                    </div>
                </div>
            </div>
        </>
    )
}

export { Notifications };
