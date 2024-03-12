/*!

=========================================================
* Argon Dashboard PRO React - v1.2.3
=========================================================

* Product Page: https://www.creative-tim.com/product/argon-dashboard-pro-react
* Copyright 2021 Creative Tim (https://www.creative-tim.com)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
import { useEffect, useState } from "react";
// nodejs library that concatenates classes
import classnames from "classnames";
// nodejs library to set properties for components
import PropTypes from "prop-types";
// reactstrap components
import { icons } from "@Assets";
import { Button, Modal } from '@Components';
import { useNavigation } from "@Hooks";
import { translate } from '@I18n';
import { isActiveSectionList, isBackNavigation, resetAppReducer, resetAuthReducer, resetDashboardReducer, resetGuestReducer, resetStudentReducer, toggleSideBarOpen } from "@Redux";
import { AUTH_PATH, ROUTES } from "@Routes";
import { useDispatch, useSelector } from "react-redux";
import {
  Collapse, Container, DropdownItem, DropdownMenu, DropdownToggle,
  Form,
  Media, Nav, Navbar,
  NavItem, UncontrolledDropdown
} from "reactstrap";
import { NavbarProps } from "./interface";
import { SERVER } from "@Services";

function AdminNavbar({ theme, sidenavOpen, toggleSidenav, userName, userProfile, isBack = false, isShowToggle = false, fixedTop }: NavbarProps) {

  const { goTo } = useNavigation()
  const dispatch = useDispatch();

  const { currentCourse, isActiveSection, dashboardDetails, sideNavOpen } = useSelector(
    (state: any) => state.DashboardReducer
  );

  const [isOpenModal, setIsOpenModal] = useState(false)
  let courseCount;
  let isCompletedCourse;

  useEffect(() => {

    // if (!dashboardDetails?.permission_details?.is_admin && !dashboardDetails?.permission_details?.is_super_admin && !dashboardDetails?.permission_details?.is_guest) {
    //   courseCount = dashboardDetails?.user_details?.student_course_count
    //   isCompletedCourse = dashboardDetails?.user_details?.student_course_details[0]?.is_completed
    // }
  }, [])

  const logout = () => {
    // console.log("You have been loged out");
    localStorage.clear();
    dispatch(resetAppReducer());
    dispatch(resetAuthReducer());
    dispatch(resetDashboardReducer());
    dispatch(resetGuestReducer());
    dispatch(resetStudentReducer())
    goTo(AUTH_PATH.LOGIN, true);
  };
  const { goBack } = useNavigation()


  // const toggleSideNav = () => {

  //   if (document.body.classList.contains('g-sidenav-pinned')) {
  //     document.body.classList.remove('g-sidenav-pinned');
  //     document.body.classList.add('g-sidenav-hidden');
  //   }
  //   else {
  //     document.body.classList.add('g-sidenav-pinned');
  //     document.body.classList.remove('g-sidenav-hidden');
  //   }
  //   dispatch(toggleSideBarOpen(!sideNavOpen));
  //   console.log("sideNavOpen", sideNavOpen)
  // };
  // console.log("dashbooooo", dashboardDetails);


  return (
    <>
      <Navbar
        style={{ padding: '0.7rem 0rem', }}
        className={classnames(
          `navbar-top navbar-expand border-bottom z-index-1  ${fixedTop}`,
          { "navbar-dark bg-info": theme === "dark" },
          { "navbar-light bg-secondary": theme === "light" }
        )}
      >


        <Container fluid>
          <Collapse navbar isOpen={true}>
            <Form
              className={classnames(
                "navbar-search form-inline mr-sm-3",
                { "navbar-search-light": theme === "dark" },
                { "navbar-search-dark": theme === "light" }
              )}
            >
              {isBack &&
                <>
                  {dashboardDetails?.user_details?.student_course_count > 1 || dashboardDetails?.user_details?.is_faculty ? (
                    <i style={{ WebkitTextStroke: "0.7px" }} className="bi bi-arrow-left text-white fa-lg pl-3" onClick={() => {
                      dispatch(isBackNavigation(true))
                      dispatch(isActiveSectionList(false))
                      goBack()
                    }}></i>
                  ) : <></>}
                  <span className="pl-2 text-white  nav-link">{dashboardDetails?.user_details?.is_faculty ? currentCourse[0]?.name : currentCourse[0]?.course?.name}</span>
                  {/* {!dashboardDetails?.permission_details?.is_admin && !dashboardDetails?.permission_details?.is_guest && (
                    <h5 className="pl-2 text-white mt-3">{courseCount === 1 && isCompletedCourse ? '(Your course has been completed)' : ""}</h5>
                  )} */}
                </>
              }
            </Form>

            <Nav className={`align-items-center ml-md-auto ${!dashboardDetails?.permission_details?.is_admin && !dashboardDetails?.permission_details?.is_super_admin ? 'd-none d-sm-block d-md-block' : ''}`} navbar>
              <NavItem className="d-xl-none">
                <div
                  className={classnames(
                    "pr-3 sidenav-toggler",
                    { active: sidenavOpen },
                    { "sidenav-toggler-dark": theme === "dark" }
                  )}
                  onClick={() => { toggleSidenav() }}
                >
                  <div className="sidenav-toggler-inner">
                    <i className="sidenav-toggler-line text-white" />
                    <i className="sidenav-toggler-line text-white" />
                    <i className="sidenav-toggler-line text-white" />
                  </div>
                </div>
              </NavItem>
            </Nav>


            {/* Notification */}
            {!dashboardDetails?.permission_details?.is_guest && <div className=" mr-4" onClick={() => {
              if (dashboardDetails?.permission_details?.is_admin || dashboardDetails?.permission_details?.is_super_admin) {
                goTo('/dashboard' + AUTH_PATH.NOTIFICATIONS, false)
              }
              else {
                goTo(AUTH_PATH.NOTIFICATIONS, false)
              }
            }}> <i className="bi bi-bell text-white pointer" ></i> </div>}


            <Nav className="align-items-center ml-auto ml-md-0" navbar>

              <UncontrolledDropdown nav>

                <div className={`row`}>
                  <span className="avatar avatar-sm rounded-circle">
                    <img
                      alt="..."
                      src={userProfile && SERVER + userProfile || icons.profile}
                      height={35}
                      width={30}
                    />
                  </span>

                  <span className={`mb-0 text-sm font-weight-bold ml-2 text-white align-self-center ${(dashboardDetails?.permission_details?.is_admin || dashboardDetails?.permission_details?.is_super_admin) ? ' mr--4 pr-4' : 'mr--2'}`}>
                    {userName || 'John Snow'}
                  </span>


                  <DropdownToggle className="nav-link" color="" tag="a">
                    <Media className="">
                      <div className='media-body text-white dropdown-toggle py-1 text-center'
                        style={{ width: '30px', cursor: 'pointer' }}> </div>
                    </Media>
                  </DropdownToggle>
                </div>

                {isShowToggle &&
                  <DropdownMenu right>
                    <DropdownItem className="noti-title" header tag="div">
                      <h6 className="text-overflow m-0">{translate("common.welcome")}</h6>
                    </DropdownItem>

                    {dashboardDetails?.permission_details?.is_guest === false && <DropdownItem
                      onClick={(e) => {
                        dispatch(isBackNavigation(false))
                        goTo(ROUTES.HOME.STUDENT_PROFILE)
                      }}
                    >
                      <i className="ni ni-circle-08" />
                      <span>Profile</span>
                    </DropdownItem>}

                    {dashboardDetails?.permission_details?.is_guest === false && <DropdownItem
                      onClick={(e) => {
                        dispatch(isBackNavigation(false))
                        goTo(ROUTES.HOME.STUDENT_ANONYMOUS_COMPLAINT, false)
                      }}
                    >
                      <i className="ni ni-archive-2" />
                      <span>Anonymous complaint / ticket</span>
                    </DropdownItem>}

                    <DropdownItem divider />
                    <DropdownItem
                      onClick={(e) => setIsOpenModal(!isOpenModal)}
                    >
                      <i className="ni ni-button-power" />
                      <span>{translate("auth.logout")!}</span>
                    </DropdownItem>
                  </DropdownMenu>
                }


                {/**
                * Admin dropdown toggle
                */}

                {(dashboardDetails?.permission_details?.is_admin || dashboardDetails?.permission_details?.is_super_admin) && (
                  <DropdownMenu right>
                    <DropdownItem className="noti-title" header tag="div">
                      <h6 className="text-overflow m-0">{translate("common.welcome")}</h6>
                    </DropdownItem>

                    <DropdownItem
                      onClick={(e) => {
                        dispatch(isBackNavigation(false))
                        goTo('/dashboard' + ROUTES.HOME.STUDENT_PROFILE)
                      }}
                    >
                      <i className="ni ni-circle-08" />
                      <span>Profile</span>
                    </DropdownItem>


                  </DropdownMenu>
                )}

              </UncontrolledDropdown>
            </Nav>
          </Collapse>
        </Container>
      </Navbar >
      <Modal isOpen={isOpenModal} size={'sm'} onClose={() => setIsOpenModal(!isOpenModal)} title={translate('course.logout')!}>
        <div className='text-right'>
          <Button
            color={'secondary'}
            text={translate('common.no')!}
            onClick={() => { setIsOpenModal(!isOpenModal) }}
          />
          <Button

            text={translate('common.yes')!}
            onClick={() => {
              logout()
            }}
          />
        </div>
      </Modal>
    </>
  );
}

AdminNavbar.defaultProps = {
  toggleSidenav: () => { },
  sidenavOpen: false,
  theme: "dark",
};
AdminNavbar.propTypes = {
  toggleSidenav: PropTypes.func,
  sidenavOpen: PropTypes.bool,
  theme: PropTypes.oneOf(["dark", "light"]),
};

export { AdminNavbar };

