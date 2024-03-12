
import React, { useEffect, useState } from 'react';
import { useLocation, Route, Routes, Navigate } from "react-router-dom";
import { Sidebar } from '@Components'
import { DASHBOARD_ROUTES, ADMIN_ROUTES, IS_SUPER_ADMIN_ROUTES, RequireAuth } from '@Routes'
import { icons } from '@Assets'
import { useDispatch, useSelector } from 'react-redux';
import { fetchCourses, toggleSideBarOpen} from '@Redux';
import { getImageUrl } from '@Utils';

function Dashboard() {

  const [sideNavOpen, setSideNavOpen] = useState(true);
  const location = useLocation();
  const dispatch = useDispatch();

  const mainContentRef = React.useRef<HTMLDivElement | null>(null);
  const [adminDashboardRoutes, setAdminDashboardRoutes] = useState<any>(ADMIN_ROUTES)

  const { dashboardDetails} = useSelector(
    (state: any) => state.DashboardReducer
  );


  useEffect(() => {

    document.documentElement.scrollTop = 0;
    document.scrollingElement!.scrollTop = 0;
    if (mainContentRef.current) {
      mainContentRef.current.scrollTop = 0;
    }
  }, [location]);

  /**
   * toggles collapse between mini sidenav and normal 
   **/



  const getRoutes = (routes: any) => {
    if (routes) {
      return routes?.map((prop: any, key: any) => {
        if (prop.collapse) {
          return getRoutes(prop.views);
        }
        if (prop.layout === "/dashboard") {
          return (
            <Route
              path={prop.path}
              element={<RequireAuth>{prop.component}</RequireAuth>}
              key={key}
            />
          );
        } else {
          return null;
        }
      });
    }
  };

  const getInternalRoutes = (routes: any) => {
    return routes.map((prop: any, key: any) => {
      return (
        <Route
          path={prop.path}
          element={<RequireAuth>{prop.component}</RequireAuth>}
          key={key}
        />
      );
    });
  };

  const toggleSideNav = () => {

    if (document.body.classList.contains('g-sidenav-pinned')) {
      document.body.classList.remove('g-sidenav-pinned');
      document.body.classList.add('g-sidenav-hidden');
    }
    else {
      document.body.classList.add('g-sidenav-pinned');
      document.body.classList.remove('g-sidenav-hidden');
    }
    // dispatch(toggleSideBarOpen(!sideNavOpen));
    setSideNavOpen(!sideNavOpen)
  };


  return (
    <div className='zoom'>
      {dashboardDetails?.user_details?.is_faculty && (
        <Sidebar
          routes={(dashboardDetails?.user_details?.is_faculty)&& (dashboardDetails?.permission_details?.is_super_admin) ? IS_SUPER_ADMIN_ROUTES : adminDashboardRoutes}
          toggleSideNav={toggleSideNav}
          sideNavOpen={sideNavOpen}
          logo={{
            innerLink: '/',
            imgSrc: dashboardDetails?.company_logo === null ? icons.logo : getImageUrl(dashboardDetails?.company_logo),
            imgAlt: '...',
            text: dashboardDetails?.company?.name
          }}
        />
      )}

      <div className={'main-content'} ref={mainContentRef}>
        <Routes>
          {getRoutes((dashboardDetails?.user_details?.is_faculty) && (dashboardDetails?.permission_details?.is_super_admin) ? IS_SUPER_ADMIN_ROUTES : adminDashboardRoutes)}
          {getInternalRoutes(DASHBOARD_ROUTES)}
          <Route path="*" element={<Navigate to="/dashboard/manage-courses" />} />
        </Routes>
      </div>

      {sideNavOpen ? (
        <div className={'backdrop d-xl-none'} onClick={toggleSideNav} />
      ) : null}

    </div>
  );
}

export { Dashboard };

