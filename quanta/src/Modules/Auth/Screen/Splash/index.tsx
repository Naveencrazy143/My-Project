import { Logo } from "@Components";
import { useNavigation } from "@Hooks";
import { fetchDashboardDetails, getCurrentNav, settingCurrentCourse, settingIsSuperAdmin, webAppConfig } from '@Redux';
import { GUEST_PATH, ROUTES } from "@Routes";
import { FCM_TOKEN } from "@Utils";
import { useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux';

const SPLASH_STAY_TIME_MILE_SECONDS = 3000;

function Splash() {
  const { goTo } = useNavigation();
  const dispatch = useDispatch();
  const { loginDetails, appConfigData } = useSelector((state: any) => state.AppReducer);
  const fcmTokenValue = localStorage.getItem(FCM_TOKEN)
  console.log("fcm======>", fcmTokenValue)

  useEffect(() => {
    dispatch(getCurrentNav("Courses"))
    setTimeout(() => {
      if (loginDetails && loginDetails?.isLoggedIn) {
        getDashboardDetails()
      } else {
        goTo(ROUTES.AUTH.LOGIN, true);
      }
    }, SPLASH_STAY_TIME_MILE_SECONDS);
  }, []);


  //web app config api

  function getWebAppConfig() {
    const params = {
      device_model: appConfigData?.model,
      device_platform: appConfigData?.platform,
      device_brand: appConfigData?.brand,
      device_token: fcmTokenValue
    }
    dispatch(webAppConfig({
      params,
      onSuccess: (success) => () => {
        console.log("successsssss----->", success)
      },
      onError: (error) => () => {

      }
    }))
  }


  // dashboard Api

  const getDashboardDetails = () => {

    const params = {}
    dispatch(fetchDashboardDetails({
      params,
      onSuccess: (success) => () => {
        if (fcmTokenValue) {
          getWebAppConfig() // web app config api call
        }

        dispatch(settingIsSuperAdmin(success?.details?.permission_details?.is_super_admin))

        if (success?.details?.user_details?.is_faculty) {
          goTo(ROUTES.HOME.DASHBOARD, true)
        }
        else if (success?.details?.permission_details?.is_guest) {
          goTo(GUEST_PATH.GUEST_TASK_SECTION, true)
        }
        else if (!success?.details?.user_details?.is_faculty && success?.details?.user_details?.student_course_count > 1 || success?.details?.user_details?.student_course_count === 0) {
          goTo(ROUTES.HOME.STUDENT_DASHBOARD, true)
        }
        else if (!success?.details?.user_details?.is_faculty && success?.details?.user_details?.student_course_count === 1) {
          dispatch(settingCurrentCourse(success?.details?.user_details?.student_course_details))
          goTo(ROUTES.HOME.COURSE_SECTION, true)
        }


      },
      onError: (error) => () => {

      }
    }))
  }


  return (
    <div className={"d-flex h-100 justify-content-center align-items-center"}>
      <Logo />
    </div>
  );
}

export { Splash };

