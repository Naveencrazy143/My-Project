import { Card, Divider, DragAndReorder, Image, Button, NoRecordsFound, Spinner, FileUpload } from "@Components";
import { title } from "process";
import { FC, useEffect, useState } from "react";
import {
    Progress
} from "reactstrap";
import { ProgressTrackCardProps } from "./interface";
import { DropDownMenuArrow } from "@Modules"
import { icons } from "@Assets";
import { getImageUrl } from "@Utils";
import { useDispatch, useSelector } from "react-redux";
import { isActiveSectionList, postGenericCrudDetails, settingStudentCurrentCourseSection, settingStudentSectionDataWithExtraKey } from "@Redux";

const StudentProgressTrackCard: FC<ProgressTrackCardProps> =
    ({
        onClick,
        data,
        isImage = false,
        isLoading,
        cardClass,
        childCardClass,
        completedTopicCount = 0,
        children
    }) => {

        const { currentCourse, studentCurrentCourseSection, studentCourseSection, currentCourseSectionObject, isActiveSection } = useSelector(
            (state: any) => state.DashboardReducer
        );


        const dispatch = useDispatch();

        const [select, setSelect] = useState<any>()
        const [selectedSection, setSelectedSection] = useState<any>()
        const [sectionData, setSectionData] = useState(data)

        useEffect(() => {
            setSectionData(data)
        }, [data])

        useEffect(() => {

            if (studentCurrentCourseSection) {
                studentCourseSection?.map((el, index) => {
                    if (el.id === studentCurrentCourseSection.id) {
                        setSelect(index)
                    }
                })
            }

            if (currentCourseSectionObject) {
                currentCourse[0]?.sections.map((el, index) => {
                    if (el.id === currentCourseSectionObject.id) {
                        setSelect(index)
                    }
                })
            }

            if (!studentCurrentCourseSection && !currentCourseSectionObject) {
                setSelect(0)
            }

        }, [currentCourse])


        const checkStatus = (data) => {


            if (currentCourse[0]?.starts_from_topic !== null) {

                const manditory = data?.findIndex((item, index) => item.id === currentCourse[0]?.starts_from_topic?.course_section_id)

                if (data[manditory]?.completed_manditory_topics < data[manditory]?.manditory_topics) {

                    return manditory
                }

                else {

                    const manditory1 = data?.findIndex((item, index) => item.is_manditory === true && item?.completed_manditory_topics < item?.manditory_topics)
                    return manditory1
                }
            }
            else {

                const manditory = data?.findIndex((item, index) => item.is_manditory === true)

                if (data[manditory]?.completed_manditory_topics < data[manditory]?.manditory_topics) {
                    return manditory
                }

                else {

                    const manditory1 = data?.findIndex((item, index) => item.is_manditory === true && item?.completed_manditory_topics < item?.manditory_topics)
                    return manditory1
                }
            }
        }



        const filterLength = (value: string) => {
            if (value.length > 20) {
                return value.substring(0, 20) + '...';
            }
            else {
                return value
            }
        }

        return (
            <Card isCardBody
                style={{ height: cardClass - 120 }}
            >
                {isLoading &&
                    <div className="mt--6">
                        <Spinner />
                    </div>
                }
                <div className={`${childCardClass} mt-0`} style={{ height: cardClass - 120 }}>
                    {!isLoading && (
                        <div>
                            {sectionData && sectionData?.length > 0 ? sectionData.map((key: any, index: number) => {

                                return (
                                    <>
                                        <div className={`mt-4  ${checkStatus(data) >= index || checkStatus(data) === -1 ? 'active' : 'disabled'}`}>
                                            <div className={`row ${index === select ? " bg-select" : ''}  mr--4 ml--4 py-4 `}
                                                style={{ marginTop: '-25px', marginBottom: '-24.8px' }}
                                            >
                                                {isImage && <div className="col-sm-auto ml-2" onClick={() => {
                                                    if (onClick) {
                                                        setSelect(index)
                                                    }
                                                }}>

                                                    <Image
                                                        variant={'rounded'}
                                                        alt="..."
                                                        src={key.thumbnail ? key.thumbnail : icons.defaultImage}
                                                    />
                                                </div>}
                                                <div className="col" onClick={() => {
                                                    if (onClick) {
                                                        if (checkStatus(data) >= index || checkStatus(data) === -1) {
                                                            setSelect(index)
                                                        }
                                                    }
                                                }}>
                                                    <div className="ml-2">
                                                        <div className="d-flex justify-content-between">

                                                            <div>
                                                                <h5>{<div className="text-wrap">
                                                                    <div>
                                                                        {key.is_manditory &&
                                                                            <span className={`text-danger mr-1`} style={{ marginLeft: '-11px' }}>●</span>
                                                                        }
                                                                        {key.name}

                                                                    </div>
                                                                    <h6 className=" font-weight-light">{filterLength(key?.description)}</h6>

                                                                </div>}</h5>
                                                            </div>

                                                            {!key.marked_as_completed && (
                                                                <div
                                                                    className="mr-3"
                                                                    style={{ cursor: 'pointer' }}
                                                                    onClick={(e) => {
                                                                        if (onClick) {
                                                                            if (checkStatus(data) >= index || checkStatus(data) === -1) {

                                                                                onClick(key, key.isActive)
                                                                                setSelect(index)
                                                                                const updatedSections = sectionData && sectionData.length > 0 && sectionData?.map(section => {
                                                                                    if (section.id === key.id) {
                                                                                        return {
                                                                                            ...section,
                                                                                            isActive: !key.isActive,
                                                                                        };
                                                                                    } else {
                                                                                        return {
                                                                                            ...section,
                                                                                            isActive: false,
                                                                                        };
                                                                                    }
                                                                                });
                                                                                dispatch(settingStudentSectionDataWithExtraKey(updatedSections))
                                                                                setSectionData(updatedSections)
                                                                            }
                                                                        }
                                                                    }} >
                                                                    {key.isActive ? <i className="bi bi-chevron-up text-muted"></i> : <i className="bi bi-chevron-down text-muted"></i>}
                                                                </div>
                                                            )}
                                                        </div>

                                                    </div>

                                                    <div className="mt--3">
                                                        {!key.marked_as_completed && (
                                                            <div className="col row mb-2">
                                                                <div className="col text-right">
                                                                    <h6 className="text-muted ls-1 mt-2">{`${key?.completed_topics} / ${key?.total_topics}`}</h6>
                                                                </div>
                                                                <div className="text-right mr--4">
                                                                    {key?.student_course_section?.is_completed && (
                                                                        <Image src={icons.tickGreen} height={35} />
                                                                    )}
                                                                </div>

                                                            </div>
                                                        )}
                                                        {!key.marked_as_completed ? (
                                                            <div className="col-sm-12 ml--1">
                                                                <Progress
                                                                    className="progress-xs"
                                                                    max={key?.total_topics}
                                                                    value={key?.completed_topics}
                                                                    color={key?.completed_topics === key?.total_topics ? "green" : "warning"}
                                                                />
                                                            </div>

                                                        ) :
                                                            <div className=" row text-right">
                                                                <div className="col mr--2">
                                                                    <Image src={icons.tickGreen} height={35} />
                                                                </div>
                                                                <h5 className="font-weight-light mt-2 mr-1">{'(Marked as completed)'}</h5>
                                                            </div>
                                                        }

                                                    </div>
                                                </div>
                                            </div>

                                            {(data.length - 1 > index || data.length <= 4) && <Divider />}
                                            {key.id === studentCurrentCourseSection.id && key.isActive && (
                                                <div className="mt-5">
                                                    {children}
                                                </div>
                                            )}
                                        </div>
                                    </>
                                )
                            }) :
                                <div className=" d-flex justify-content-center align-items-center" style={{ height: '51.5vh' }}>
                                    <NoRecordsFound />
                                </div>
                            }
                        </div>
                    )}
                </div>


            </Card>
        )
    }

export { StudentProgressTrackCard };
