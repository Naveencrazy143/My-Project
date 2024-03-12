import React, { FC, useEffect, useState } from 'react'
import { CodeEditor } from "@Modules";
import { useNavigation } from '@Hooks';
import { Back } from '@Components';
import { ROUTES } from '@Routes';
import { icons } from '@Assets';
import classnames from 'classnames';
import { Navbar, Container, Collapse, Form, Nav, NavItem, UncontrolledDropdown, DropdownToggle, Media, DropdownItem, DropdownMenu, Col, NavLink, NavbarBrand, Row, UncontrolledCollapse } from 'reactstrap';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { courseIdeType, doEditQuestion, getMessageEvents, getStudentTaskData, isBackNavigation } from '@Redux';

const HOME = 0;

interface props {
  navHeader: any;
  editorIndex?: number | string | undefined
  courseIde?: any;
}

const HeaderNavbar = ({ navHeader, editorIndex, courseIde }: props) => {

  const dispatch = useDispatch();

  const [activeIndex, setActiveIndex] = useState(HOME);
  const [showNavbar, setShowNavbar] = useState(false);

  // useEffect(()=>{setActiveIndex(HOME)},[])

  const nearestIndex = (
    currentPosition,
    sectionPositionArray,
    startIndex,
    endIndex
  ) => {

    // console.log('t--->',currentPosition)
    // console.log('a--->',sectionPositionArray[startIndex].headerRef.current?.offsetTop+"+=====")
    // console.log('m--->',startIndex)
    // console.log('i--->',endIndex)

    if (startIndex === endIndex) return startIndex;
    else if (startIndex === endIndex - 1) {
      if (
        Math.abs(
          sectionPositionArray[startIndex]?.headerRef?.current?.offsetTop -
          currentPosition
        ) <
        Math.abs(
          sectionPositionArray[endIndex]?.headerRef?.current?.offsetTop -
          currentPosition
        )
      )
        return startIndex;
      else return endIndex;
    } else {
      var nextNearest = ~~((startIndex + endIndex) / 2);
      var a = Math.abs(
        sectionPositionArray[nextNearest]?.headerRef?.current?.offsetTop -
        currentPosition
      );
      var b = Math.abs(
        sectionPositionArray[nextNearest + 1]?.headerRef?.current?.offsetTop -
        currentPosition
      );
      if (a < b) {
        return nearestIndex(
          currentPosition,
          sectionPositionArray,
          startIndex,
          nextNearest
        );
      } else {
        return nearestIndex(
          currentPosition,
          sectionPositionArray,
          nextNearest,
          endIndex
        );
      }
    }
  };




  useEffect(() => {
    const handleScroll = (e) => {
      var index = nearestIndex(
        window.scrollY,
        navHeader,
        0,
        navHeader.length - 1
      );
      // console.log(index + "====useEffect"+index);
      setActiveIndex(index);
    };
    document.addEventListener("scroll", handleScroll);
    return () => {
      document.removeEventListener("scroll", handleScroll);
    };
  }, []);


  function goTo(arg0: string) {
    throw new Error('Function not implemented.');
  }

  // console.log(activeIndex+"=======");



  return (
    // <>
    //   <div className='container-fluid d-flex justify-content-center pt-4 pb-2 fixed-top bg-white'>
    //     <div  style={{marginTop:'-11px'}} onClick={() => {}}>
    //       <Back />
    //     </div>
    //     {navHeader.map((item, index) => {
    //       console.log('tamil---->',item.isCompleted)
    //       return (
    //         <>
    //           <span className={`  ml-4 `}>
    //             <a href={`#${item.href}`} className={` navHeader ${activeIndex === index ? 'text-primary' : 'text-black'} ${item.isCompleted === true ? 'active' : 'disabled'}`}
    //               onClick={() => {
    //                 setActiveIndex(index)
    //                 setShowNavbar(false)
    //               }}>{item.headerTitle}</a>
    //           </span>
    //         </>
    //       )
    //     })}
    //   </div>
    // </>

    <>
      <Navbar
        style={{ padding: '0.5rem 0rem 0rem 0rem' }}
        className="navbar-horizontal navbar-dark bg-info fixed-top "
        expand="lg"
      >
        <Container className=''>
          <button
            aria-controls="navbar-default"
            aria-expanded={false}
            aria-label="Toggle navigation"
            className="navbar-toggler "
            data-target="#navbar-default"
            data-toggle="collapse"
            id="navbar-default"
            type="button"
          >
            <span className="navbar-toggler-icon" />
          </button>
          <UncontrolledCollapse navbar toggler="#navbar-default" className='justify-content-center'>
            <div className="navbar-collapse-header">
              <div className='row'>
                <div className="collapse-close float-right  col-sm-12" >
                  <button
                    aria-controls="navbar-default"
                    aria-expanded={false}
                    aria-label="Toggle navigation"
                    className="navbar-toggler"
                    data-target="#navbar-default"
                    data-toggle="collapse"
                    id="navbar-default"
                    type="button"
                  >
                    <span />
                    <span />
                  </button>
                </div>
              </div>
            </div>
            <Nav className="py-2" navbar>
              <NavItem>
                <Nav className='mr-3' style={{ marginTop: '-14px' }}>
                  <div onClick={() => {
                    dispatch(isBackNavigation(true))
                  }}>
                    <Back onClick={() => {
                      // dispatch(getStudentTaskData(undefined))
                      dispatch(getStudentTaskData(null))
                      dispatch(courseIdeType(''))
                      dispatch(doEditQuestion({ editQues: false, editSampleIO: false, editRules: false }))
                      dispatch(getMessageEvents([]))
                    }}
                    />
                    {/* <Image src={icons.back} height={20} width={24}  /> */}
                  </div>
                </Nav>
              </NavItem>
              {navHeader.map((item, index) => {
                return (
                  <>
                    <NavItem>
                      <Nav
                        className={` navHeader ${activeIndex === index ? 'navColor1' : 'navColor'} ${item.isCompleted === true ? 'active' : 'disabled'}`}
                        href={`#${item.href}`}
                        onClick={() => {
                          setActiveIndex(index)
                          setShowNavbar(false)
                        }}
                      >
                        {item.headerTitle}
                      </Nav>
                    </NavItem>
                  </>
                )
              })}
            </Nav>
          </UncontrolledCollapse>
        </Container>
      </Navbar>
    </>

  )
}

export { HeaderNavbar }
