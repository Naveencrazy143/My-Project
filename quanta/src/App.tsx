import { PageNotFound, ScreenWrapper } from "@Components";
import { Dashboard, UserActiveStatus } from "@Modules";
import { AUTH_ROUTES, GUEST_ROUTES, RequireAuth, STUDENT_ROUTES, RequireHome } from "@Routes";
import { useDispatch, useSelector } from "react-redux";
import { Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
/**
 *  select-react  - important need to add this app.js
 */
import "select2/dist/css/select2.min.css";

import "@fortawesome/fontawesome-free/css/all.min.css";
import "@fullcalendar/common/main.min.css";
import "@fullcalendar/daygrid/main.min.css";
import "quill/dist/quill.core.css";
import "react-perfect-scrollbar/dist/css/styles.css";
import "sweetalert2/dist/sweetalert2.min.css";

import { changeLanguage } from "@I18n";
import DeviceInfo from "./Modules/Auth/Screen/DeviceInfo";


function App() {
  
  const dispatch = useDispatch()
  const { language, loginDetails } = useSelector((state: any) => state.AuthReducer);
  const { dashboardDetails } = useSelector(
    (state: any) => state.DashboardReducer
  );
  changeLanguage(language?.value);

  const getRoutes = (routes: any) => {
    return routes.map((prop: any, key: any) => {
      return (
        <Route
          path={prop.path}
          element={prop.component}
          key={key}
        />
      );
    });
  };

  const getStudentRoutes = (routes: any) => {
    return routes.map((prop: any, key: any) => {
      return (
        <Route
          path={prop.path === '/programming/task' ? `/programming/task/:id?/typeview?` : prop.path}
          element={prop.path === '/programming/task' ? prop.component : <RequireAuth>{prop.component}</RequireAuth>}
          key={key}
        />

      );
    });
  };


  const getGuestRoutes = (routes: any) => {
    return routes.map((prop: any, key: any) => {

      return (
        
        <Route
          path={prop.path === '/programming/task' ? `/programming/task/:id?/typeview?` : prop.path}
          element={<RequireAuth>{prop.component}</RequireAuth>}
          key={key}
        />
      );
    });
  };


  return (
    <>
    
      <UserActiveStatus />
      <ScreenWrapper>
        <DeviceInfo />
        <Routes >
          {getRoutes(AUTH_ROUTES)}
          {(dashboardDetails?.user_details?.is_faculty) ?
            <Route path={'/dashboard/*'} element={<Dashboard />} /> :
            dashboardDetails?.permission_details?.is_guest ? getGuestRoutes(GUEST_ROUTES) :
              getStudentRoutes(STUDENT_ROUTES)
          }
          <Route path={"*"} element={<PageNotFound />} />
        </Routes>
        <ToastContainer />
      </ScreenWrapper>
    </>

  )
}

export default App;
