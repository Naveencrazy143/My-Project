// import { ImageView } from '@components';
// import { goTo, ROUTE, useNav } from '@utils';
import { icons } from '@Assets';
import { useNavigation } from '@Hooks';
import { ROUTES } from '@Routes';
import React, { useState, useEffect } from 'react'
import toast, { Toaster } from 'react-hot-toast';
import { GetToken } from './GetToken';
import { onMessageListener } from './OnMessaging';
import { courseIdeType, getStudentTaskData } from '@Redux';
import { useDispatch } from 'react-redux';
// import { Icons } from '@assets';


const MAX_LENGTH = 70

const FirebaseMessaging = () => {
    const { goTo } = useNavigation()
    const dispatch = useDispatch()


    const [notification, setNotification] = useState<any>([]);

    useEffect(()=>{
        dispatch(getStudentTaskData(undefined))
    },[])

    const notify = () => {
        notification.forEach((message: any) => {
            toast(<ToastDisplay data={message} />, {
                position: 'top-right', duration: 3000,
            });
        });
    };


    function ToastDisplay({ data }: any) {
        const MAX_LENGTH = 50;

        const bodyContent = data?.body?.length <= MAX_LENGTH
            ? data?.body
            : data?.body?.slice(0, MAX_LENGTH) + '...';

        return (
            <div onClick={() => {
                // goTo(navigation, data?.route);
            }}>
                <p><b>{data?.title}</b></p>
                <div className='d-flex justify-content-center align-items-center'>
                    {/* {data.icon && <div>
                        <ImageView
                            icon={data.icon}
                            style={{ height: '50px', width: '50px', borderRadius: "5px" }}
                        />
                    </div>} */}
                    <div className={data.icon ? 'ml-3' : ''}>{bodyContent}</div>
                </div>
            </div>
        );
    };

    useEffect(() => {
        if (notification && notification.length > 0) {
            notify()
        }
    }, [notification])

    const NOTI_TYPE_TASK_SUBMISSION = 'TASK_SUBMISSION'
    const NOTI_TYPE_PENDING_APPROVAL = 'PENDING_APPROVAL'
    const NOTI_TYPE_STUDENT_PAGE = 'STUDENT_PAGE'
    const TASK_SUBMISSION_AD = 'TASK_SUBMISSION_AD'
    const NOTI_TYPE_USER_REMARK_REQUEST = 'USER_REMARKS_REQUEST'
    const NOTI_TYPE_USER_REMARK_REQUEST_AD = 'USER_REMARKS_REQUEST_AD'
    const FACULTY_CHAT = 'FACULTY_CHAT'
    const STUDENT_CHAT = 'STUDENT_CHAT'

    function navigateToScreen(el: any) {
        const routeData = JSON.parse(el?.data?.extra_data.replace(/'/g, '"'))
        const route_type = JSON.parse(el?.data?.extra_data.replace(/'/g, '"')).route_type
        console.log("routeData==>",routeData)


        if (route_type === NOTI_TYPE_PENDING_APPROVAL) {

            goTo('/dashboard' + ROUTES.ADMIN.PENDING_APPROVALS) 
        }
        else if (route_type === NOTI_TYPE_TASK_SUBMISSION) {

            dispatch(courseIdeType(routeData.route_params?.ide))
            dispatch(getStudentTaskData(routeData))
            goTo(ROUTES.HOME.LANDING)
        }
        else if (route_type === NOTI_TYPE_STUDENT_PAGE) {

            goTo(ROUTES.HOME.STUDENT_PAGE)
        }
        else if (route_type === TASK_SUBMISSION_AD) {

            dispatch(courseIdeType(routeData.route_params?.ide))
            dispatch(getStudentTaskData(routeData))
            goTo('/dashboard' + ROUTES.ADMIN.VIEW_STUDENT_TASK_DETAILS)
        }
        else if (route_type === NOTI_TYPE_USER_REMARK_REQUEST) {

            goTo('/dashboard' + ROUTES.ADMIN.ADMIN_REMARK)
        }
        else if (route_type === NOTI_TYPE_USER_REMARK_REQUEST_AD) {

            goTo('/dashboard' + ROUTES.ADMIN.SUPER_ADMIN_REMARK)
        }
        else if (route_type === FACULTY_CHAT) {

            dispatch(courseIdeType(routeData.route_params?.ide))
            dispatch(getStudentTaskData(routeData))
            goTo('/dashboard' + ROUTES.ADMIN.VIEW_STUDENT_TASK_DETAILS)
        }
        else if (route_type === STUDENT_CHAT) {

            dispatch(courseIdeType(routeData.route_params?.ide))
            dispatch(getStudentTaskData(routeData))
            goTo(ROUTES.HOME.LANDING)
        }

    }


    onMessageListener()
        .then((payload: any) => {
            console.log("foreground message", payload);
            setNotification(payload)
            const title = payload?.data?.title;
            const options = {
                body: payload?.data?.message,
                icon: icons.logo
            };
            new Notification(title, options).addEventListener('click', function () {
                navigateToScreen(payload)
                this.close()
            });

        })
        .catch((err: any) => console.log('failed: ', err));

    return (
        <>
            <GetToken />
        </>
    )
}

export { FirebaseMessaging }


