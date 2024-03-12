import React from 'react';
import { Navigate, useLocation } from 'react-router-dom'
import { useSelector } from "react-redux";
import { ScreenWrapper } from '@Components'
import { ROUTES } from '@Routes'




type RequireHomeProps = {
    children: React.ReactNode;
}

export const RequireHome = ({ children }: RequireHomeProps) => {
    const location = useLocation()

    console.log(location.pathname+'======11111111111');



    const { loginDetails, dashboardDetails } = useSelector(
        (state: any) => state.AppReducer
    );
console.log("dashboard details===>", dashboardDetails)

console.log(location.pathname+'======');

    if (loginDetails?.isLoggedIn) {
        return <Navigate to={ROUTES.HOME.STUDENT_DASHBOARD} state={{ path: location.pathname }} />
    }




    return (
        <>
            <ScreenWrapper>
                {children}
            </ScreenWrapper>
        </>

    )
}

export default RequireHome;
