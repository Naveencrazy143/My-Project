import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import moment from "moment";
import { postUpdateUserOnlineActivityLog } from '@Redux';


function UserActiveStatus() {

    const dispatch = useDispatch()

    const { loginDetails } = useSelector((state: any) => state.AppReducer);

    const { dashboardDetails } = useSelector(
        (state: any) => state.DashboardReducer
    );
console.log("dashboarrr===", dashboardDetails)
    useEffect(() => {

        if (loginDetails && loginDetails?.isLoggedIn) {
            setInterval(() => {

                let currentTime = moment().format("YYYY-MM-DD HH:mm:ss")
                const params = {
                    employee_company_id: dashboardDetails?.user_details?.employee_id,
                    last_active_time: currentTime,
                    ...(dashboardDetails?.user_details?.user_online_log_id !== null && { id: dashboardDetails?.user_details?.user_online_log_id })

                }
                dispatch(postUpdateUserOnlineActivityLog({
                    params,
                    onSuccess: (success: any) => () => {

                    },
                    onError: (error: any) => () => {
                    },

                }))
            }, 300000)
        }
    }, [])
    return (
        <></>
    )
}

export { UserActiveStatus }