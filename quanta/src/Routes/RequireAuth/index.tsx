import React, { useEffect } from 'react';
import { Navigate, useLocation, } from 'react-router-dom'
import { useSelector, useDispatch } from "react-redux";
import { ROUTES } from '@Routes'
import { FirebaseMessaging } from "../../FirebaseMessaging";
import { webAppConfig } from '@Redux';



// type RequireAuthProps = {
//     children: React.ReactNode;
// }

// export const RequireAuth = ({ children }: RequireAuthProps) => {

//     const location = useLocation()




//     const { userLoggedIn, loginDetails } = useSelector(
//         (state: any) => state.AppReducer
//     );

//     if (!loginDetails?.isLoggedIn) {
//         return <Navigate to={ROUTES.AUTH.SPLASH} state={{ path: location.pathname }} />
//     }

//     return (
//         <ScreenWrapper>
//             {children}
//         </ScreenWrapper>
//     )
// }

// export default RequireAuth;


type RequireAuthProps = {
    children: React.ReactNode;
}

export const RequireAuth = ({ children }: RequireAuthProps) => {

    const { loginDetails, token, appConfigData } = useSelector(
        (state: any) => state.AppReducer
    );

    const dispatch = useDispatch()


    useEffect(() => {
        if (loginDetails && loginDetails.isLoggedIn && token) {
            getWebAppConfig()
        }
    }, [token])


    function getWebAppConfig() {
        const params = {
            device_model: appConfigData?.model,
            device_platform: appConfigData?.platform,
            device_brand: appConfigData?.brand,
            device_token: token
        }
        dispatch(webAppConfig({
            params,
            onSuccess: () => () => {
            },
            onError: () => () => {
            }
        }))
    }

    const location = useLocation()


    if (!loginDetails?.isLoggedIn) {
        return <Navigate to={ROUTES.AUTH.LOGIN} state={{ path: location.pathname }} />
    }

    return (
        <>
            <FirebaseMessaging />

            <div className='main-content'>
                <div className=''>
                    {children}
                </div>
            </div>
        </>
    )
}

export default RequireAuth;

