import React, { useEffect, useState } from "react";
import { useLocation, NavLink as NavLinkRRD, Link } from "react-router-dom";
import classnames from "classnames";
import PerfectScrollbar from "react-perfect-scrollbar";

import {
  Collapse,
  NavbarBrand,
  Navbar,
  NavItem,
  NavLink,
  Nav,
} from "reactstrap";
import { Button, Modal } from '@Components'
import { SidebarProps } from './interfaces';
import { useDispatch, useSelector } from "react-redux";
import { otpLoginFailure, settingCurrentCourse, settingCurrentCourseSection, resetAppReducer, resetAuthReducer, resetDashboardReducer, settingStudentCurrentCourseSection, getCurrentNav, resetGuestReducer, resetStudentReducer } from "@Redux";
import { log } from "console";
import { useNavigation } from "@Hooks";
import { translate } from '@I18n'
import { AUTH_PATH } from "@Routes";


function Sidebar({ toggleSideNav, sideNavOpen = false, routes, logo, rtlActive = false }: SidebarProps) {

  const dispatch = useDispatch();
  const { goTo } = useNavigation()


  const [state, setState] = React.useState<any>({});
  // console.log('000000', state)

  const location = useLocation();
  const { registeredCourses, studentCourses, dashboardDetails, currentCourse, currentNav } = useSelector(
    (state: any) => state.DashboardReducer
  );


  const [active, setActive] = useState('')
  const [isOpenModal, setIsOpenModal] = useState(false)

  useEffect(() => {
    setState(getCollapseStates(routes));
  }, []);
  //   useEffect(() => {
  //     setActive('')
  // },[currentCourse])



  // verifies if routeName is the one active (in browser input)
  const activeRoute = (routeName: string) => {
    return location.pathname.indexOf(routeName) > -1 ? "active" : "";
  };

  // makes the sidenav normal on hover (actually when mouse enters on it)
  const onMouseEnterSideNav = () => {
    if (!document.body.classList.contains("g-sidenav-pinned")) {
      document.body.classList.add("g-sidenav-show");
    }
  };

  // makes the sidenav mini on hover (actually when mouse leaves from it)
  const onMouseLeaveSideNav = () => {
    if (!document.body.classList.contains("g-sidenav-pinned")) {
      document.body.classList.remove("g-sidenav-show");
    }
  };

  // this creates the intial state of this component based on the collapse routes
  // that it gets through routes
  const getCollapseStates = (routes: any) => {
    let initialState = {};
    routes.map((prop: any, key: any) => {
      if (prop.collapse) {
        initialState = {
          [prop.state]: getCollapseInitialState(prop.views),
          ...getCollapseStates(prop.views),
          ...initialState,
        };
      }
      return null;
    });
    return initialState;
  };


  // this verifies if any of the collapses should be default opened on a rerender of this component
  // for example, on the refresh of the page,
  // while on the src/views/forms/RegularForms.js - route /admin/regular-forms
  const getCollapseInitialState = (routes: any) => {

    for (let i = 0; i < routes.length; i++) {
      if (routes[i].collapse && getCollapseInitialState(routes[i].views)) {
        return true;
      } else if (location.pathname.indexOf(routes[i].path) !== -1) {
        return true;
      }
    }
    return false;
  };
  // this is used on mobile devices, when a user navigates
  // the sidebar will autoclose
  const closeSideNav = () => {
    if (window.innerWidth < 1200) {
      if (toggleSideNav) {
        toggleSideNav();
      }
    }
  };
  // this function creates the links and collapses that appear in the sidebar (left menu)
  const createLinks = (routes: any) => {
    // console.log("==routes",routes)
    if (routes) {
      return routes.map((prop: any, key: any) => {
        // console.log("propeepsss==>",prop)
        if (prop.redirect) {
          return null;
        }
        if (prop.collapse) {
          var st: any = {};
          st[prop["state"] as keyof typeof st] = !state[prop.state];
          return (
            <NavItem key={key}>
              <NavLink
                href="#pablo"
                data-toggle="collapse"
                to={prop.layout + prop.path}
                aria-expanded={state[prop.state]}
                className={` ${classnames({
                  active: getCollapseInitialState(prop.views),
                })}`}
                onClick={(e) => {
                  e.preventDefault();
                  console.log('00000', st);

                  setState(st);
                }}
              >
                {prop.icon ? (
                  <>
                    <i className={`${prop.icon} icon-link ml-2`} />
                    <span className="nav-link-text ml-2">{prop.name}</span>
                  </>
                ) : prop.miniName ? (
                  <>
                    <span className="sidenav-mini-icon icon-link"> {prop.miniName} </span>
                    <span className="sidenav-normal"> {prop.name} </span>
                  </>
                ) : null}
              </NavLink>
              <Collapse isOpen={state[prop.state]}>
                <Nav className="nav-sm flex-column" >
                  {createLinks(prop.views)}
                </Nav>
              </Collapse>
            </NavItem>
          );
        }
        return (
          <NavItem className={`${prop.name === currentNav ? "sass-nav-active" : 'sass-nav'}`} key={key}>
            <NavLink
              to={prop.layout + prop.path}
              className=""
              onClick={() => {
                closeSideNav()
                dispatch(getCurrentNav(prop.name))
              }}
              tag={NavLinkRRD}
            >
              {prop.icon !== undefined ? (

                <>
                  <i className={`${prop.icon}  ${prop.name === currentNav ? "text-info" : 'text-black'} ${prop.name === 'Group Chat DM' && 'ml-2'}`} onClick={() => setActive('')} />
                  <div className="col ml--2" onClick={() => {
                    setActive('')
                  }
                  }>
                    <span className={` text-wrap  ${prop.name === currentNav ? "sass-active-text" : 'sass-link-text'}`}>{prop.name}</span>
                  </div>
                </>
              ) : prop.miniName !== undefined ? (
                <div className={`col-12 px-0  ${active === key ? 'bg-select text-info py-2 rounded' : "text-muted "}`} onClick={() => {
                  setActive(key)

                  if (dashboardDetails?.user_details?.is_faculty) {
                    if (prop.name !== 'Add Course' && prop.name !== 'Assign Course') {
                      dispatch(settingCurrentCourseSection(""))
                      dispatch(settingStudentCurrentCourseSection(""))

                      let currentCourse = registeredCourses.filter((item) => item.name === prop.name)
                      dispatch(settingCurrentCourse(currentCourse))
                    }

                  }
                  else {
                    dispatch(settingCurrentCourseSection(""))
                    dispatch(settingStudentCurrentCourseSection(""))
                    let currentCourse = studentCourses.filter((item) => item.course.name === prop.name)
                    dispatch(settingCurrentCourse(currentCourse))
                  }

                }}>
                  <span className="sidenav-mini-icon icon-link"> {prop.miniName} </span>
                  <span className={`sidenav-normal ${(prop.name === 'Add Course' || prop.name === 'Assign Course') ? 'text-secondary' : ''}`}> {prop.name} </span>
                </div>
              ) : (
                prop.name
              )}
            </NavLink>
          </NavItem>
        );
      });
    }
  };

  let navbarBrandProps;
  if (logo && logo.innerLink) {
    navbarBrandProps = {
      to: logo.innerLink,
      tag: Link,
    };
  } else if (logo && logo.outterLink) {
    navbarBrandProps = {
      href: logo.outterLink,
      target: "_blank",
    };
  }

  const scrollBarInner = (
    <div className="scrollbar-inner overflow-auto scroll-hidden">
      <div className="sidenav-header d-flex align-items-center ">
        {logo ? (
          <NavbarBrand {...navbarBrandProps}>
            <div className="row">
              <div>
                <img
                  alt={logo.imgAlt}
                  className="navbar-brand-img"
                  src={logo.imgSrc}
                  height={logo.imgHeight}
                  width={logo.imgWidth}
                />
              </div>
              <div className="mt-2">
                <h5 className="ml-1">{logo.text}</h5>
              </div>
            </div>
          </NavbarBrand>
        ) : null}
        <div className="ml-auto">
          <div
            className={classnames("sidenav-toggler d-none d-xl-block", {
              active: sideNavOpen,
            })}
            onClick={toggleSideNav} /////////////////////
          >
            <div className="sidenav-toggler-inner">
              <i className="sidenav-toggler-line" />
              <i className="sidenav-toggler-line" />
              <i className="sidenav-toggler-line" />
            </div>
          </div>
        </div>
      </div>
      <div className="navbar-inner">
        <Collapse navbar isOpen={true}>
          <Nav navbar>
            {createLinks(routes)}
            <NavItem className={`${'Logout' === currentNav ? "sass-nav-active" : 'sass-nav'}`}
              onClick={() => {
                setIsOpenModal(true)
                dispatch(getCurrentNav("Logout"))
              }}>
              <NavLink style={{ cursor: "pointer" }}>
                <i className={`ni ni-button-power font-weight-bold ${'Logout' === currentNav ? "text-info" : 'text-black'}`} onClick={() => {
                  // setIsOpenModal(true)
                }} />
                <span className={`${'Logout' === currentNav ? "text-info" : 'text-black'} pl-2`} onClick={() => {
                  // setIsOpenModal(true)
                }}>{translate("auth.logout")}
                </span>
              </NavLink>
            </NavItem>
          </Nav>
        </Collapse>
      </div>
    </div>
  );

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

  return (
    <Navbar
      className={
        "sidenav navbar-vertical navbar-expand-xs navbar-light bg-white " +
        (rtlActive ? "" : "fixed-left overflow-hidden")
      }
      onMouseEnter={onMouseEnterSideNav}
      onMouseLeave={onMouseLeaveSideNav}

    >
      {navigator.platform.indexOf("Win") > -1 ? (
        <PerfectScrollbar>{scrollBarInner}</PerfectScrollbar>
      ) : (
        scrollBarInner
      )}

      <div className="pl-1 row">
        <div className="col">
          <h6 className="text-black mb--3 font-weight-light ">{'powered by '}<strong className="font-weight-bold text-black">EDAT</strong></h6>
        </div>
      </div>
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
    </Navbar>
  );
}

Sidebar.defaultProps = {
  routes: [{}],
  toggleSidenav: () => { },
  sidenavOpen: false,
  rtlActive: false,
};
export { Sidebar };

// import React, { useEffect, useState } from "react";
// import { CHILD_PATH, NAV_ITEM, useNav } from "@utils";
// import { Icons } from "@assets";
// import { ImageView } from "@components";
// import { useDispatch, useSelector } from "react-redux";
// import { currentNavIndex } from "../../../../store/app/actions";
// import { log } from "console";
// // import { matchRouteName } from "../../../../store/dashboard/actions";

// type NavItemProps = {
//   id: string;
//   name: string;
//   value: string;
//   icon: any;
// };

// const Navbar = ({ }) => {
//   const navigate = useNav();
//   const dispatch = useDispatch();

//   const { navIndex } = useSelector((state: any) => state.AppReducer);
//   const pathname = window.location.pathname

//   const currentNav = (it: any, index: any) => {
//     navigate(it.route);
//     // dispatch(matchRouteName(it.id))
//     dynamicActiveNav()
//   };

//   useEffect(() => {
//     dynamicActiveNav()
//   }, [pathname])


//   const dynamicActiveNav = () => {
//     NAV_ITEM.filter((el: any, index: number) => {
//       if (pathname === el.route) {
//         dispatch(currentNavIndex(index));
//       } else {
//         childNav()
//       }
//     })
//   }


//   const childNav = () => {
//     CHILD_PATH.filter((el: any) => {
//       if (pathname === el.path) {
//         NAV_ITEM.filter((element: any, index: number) => {
//           if (el.parent === element.route) {
//             dispatch(currentNavIndex(index));
//           }
//         })
//       }
//     })
//   }

//   return (
//     <nav
//       className="sidenav navbar navbar-vertical  fixed-left  navbar-expand-xs bg-primary"
//       id="sidenav-main"
//     >
//       <div className="scrollbar-inner">
//         <div className="sidenav-header  align-items-center">
//           <a className="navbar-brand">
//             <ImageView icon={Icons.LogoSmall} />
//           </a>
//           <div className=" ml-auto">
//             <div
//               className="sidenav-toggler d-none d-sm-block"
//               data-action="sidenav-unpin"
//               data-target="#sidenav-main"
//             >
//               <div className="sidenav-toggler-inner">
//                 <i className="sidenav-toggler-line bg-white"></i>
//                 <i className="sidenav-toggler-line bg-white"></i>
//                 <i className="sidenav-toggler-line bg-white"></i>
//               </div>
//             </div>
//           </div>
//         </div>
//         <div className="navbar-inner mt-5">
//           <div className="collapse navbar-collapse" id="sidenav-collapse-main">
//             <ul className="navbar-nav">
//               {NAV_ITEM.map((it: any, index: number) => {
//                 return (
//                   <li
//                     className="nav-item"
//                     onClick={() => currentNav(it, index)}
//                   >
//                     <a
//                       key={index}
//                       style={{ cursor: 'pointer' }}
//                       className={
//                         navIndex === index ? "nav-link active" : "nav-link"
//                       }
//                     >
//                       <i
//                         className={
//                           navIndex === index
//                             ? `${it.icon} text-primary`
//                             : `${it.icon} text-white`
//                         }
//                       ></i>
//                       <span
//                         className={
//                           navIndex === index
//                             ? "nav-link-text text-primary mt-2 ml-2"
//                             : "nav-link-text text-white mt-2 ml-2"
//                         }
//                       >
//                         {it.name}
//                       </span>
//                     </a>
//                   </li>
//                 );
//               })}
//             </ul>
//           </div>
//           <small className={"text-white text-version"}>Version: 1.23</small>
//         </div>
//       </div>

//       {/* <small
//         className={
//           "bottom-0  text-white text-version text-center"
//         }
//       >
//         Version: 0.3.2
//       </small> */}
//     </nav>
//   );
// };

export default Navbar;
