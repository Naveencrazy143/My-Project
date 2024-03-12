import { icons } from "@Assets";
import { Card, Divider, Image, NoRecordsFound, Spinner } from "@Components";
import { DynamicHeight } from "@Hooks";
import { DropDownMenuArrow } from "@Modules";
import React, { FC, useEffect, useState } from 'react';
import { useSelector } from "react-redux";
import { ProgressTrackCardProps } from "./interface";
import { SERVER } from "@Services";

const ProgressTrackCard: FC<ProgressTrackCardProps> =
    ({
        heading,
        onClick,
        taskCompletion,
        headerButton,
        dragAndDrop,
        data,
        isImage = false,
        onAddClick,
        dndData,
        onSubmitDndClick,
        isLoading,
        isDropDownMenuArrow = false,
        dropDownClick,
        title,
        completionRatioText,
        taskCompletionRatio,
        isDndModalOpen,
        dropDownDeleteClick,
        cardClass,
        childCardClass,
        onSubmitFileUpload,
        onFileSelect,
        showUpload,
        uploadTitle,
        activeSection,
        onTemplateClick,
        isDownloadTemplate,
        isOpen,
        isUploadModalOpen,
    }) => {
        const dynamicHeight: any = DynamicHeight()


        const { dashboardDetails, registeredCourses, currentCourse, studentCurrentCourseSection, studentCourseSection, currentCourseSectionObject } = useSelector(
            (state: any) => state.DashboardReducer
        );
        const [select, setSelect] = useState<any>(0)


        const filteredDescription = (value: string) => {
            if (value.length > 57) {
                return value.substring(0, 57) + '...';
            }
            else {
                return value
            }
        }

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

        const filterLength = (value: string) => {
            if (value.length > 20) {
                return value.substring(0, 20) + '...';
            }
            else {
                return value
            }
        }

        const isMandatory = true

        return (
            <Card isCardBody title={title || 'Course section'} taskCompletionRatio={taskCompletionRatio || '10'} completionRatioText={completionRatioText || '20'}
                buttonText={headerButton} onAddClick={onAddClick}
                upload={showUpload} onFileSelect={onFileSelect} onSubmitFileUpload={onSubmitFileUpload} uploadTitle={uploadTitle}
                data={data} dragAndDrop={dragAndDrop} dndData={dndData} isDndModalOpen={isDndModalOpen} onSubmitDndClick={onSubmitDndClick}
                className={cardClass}
                onTemplateClick={onTemplateClick} isDownloadTemplate={isDownloadTemplate}
                style={{ height: dynamicHeight.dynamicWidth <= 1400 ? dynamicHeight.dynamicHeight - 47 : dynamicHeight.dynamicHeight - 108 }}
                isOpen={isOpen} isUploadModalOpen={isUploadModalOpen}
            >
                {isLoading &&
                    <div className="mt--6">
                        <Spinner />
                    </div>
                }
                <div className="px-4 mb-4 overflow-auto scroll-hidden "
                    style={{ height: dynamicHeight.dynamicWidth <= 1400 ? dynamicHeight.dynamicHeight - 141 : dynamicHeight.dynamicHeight - 200, marginTop: " -20px" }}
                >
                    {!isLoading && (
                        <div>
                            {data && data?.length > 0 ? data.map((key: any, index: number) => {

                                return (
                                    <div className="mt-4">
                                        <div className={`row align-items-center ${index === select ? " bg-select" : ''}  mr--4 ml--4 py-4 `}
                                            style={{ marginTop: '-25px', marginBottom: '-24.8px' }}
                                        >
                                            {isImage && <div className="col-auto" onClick={() => {
                                                if (onClick) {
                                                    onClick(key)
                                                    setSelect(index)
                                                }
                                            }}>

                                                <Image
                                                    variant={'rounded'}
                                                    alt="..."
                                                    src={key.thumbnail ? SERVER + key.thumbnail : icons.defaultImage}
                                                />
                                            </div>}
                                            <div className="col" onClick={() => {
                                                if (onClick) {
                                                    onClick(key)
                                                    setSelect(index)
                                                    console.log('ooooooo--===', select);

                                                }
                                            }}>
                                                <h5>{<div className="text-wrap text-justify">
                                                    {key.name.length > 22 ? (
                                                        <div>
                                                            {key.is_manditory &&
                                                                <span className={`text-danger mr-1`} style={{ marginLeft: '-12px' }}> ●</span>
                                                            }
                                                            {key.name?.substring(0, 22)}
                                                            {key.name?.substring(22).split(' ').reduce((acc, val) => {
                                                                if ((acc[acc.length - 1] + val).length > 22) {
                                                                    acc.push(val);
                                                                } else {
                                                                    acc[acc.length - 1] += ` ${val}`;
                                                                }
                                                                return acc;
                                                            }, ['']).map((line, i) => (
                                                                <React.Fragment key={i}>
                                                                    {i > 0 && <br />}
                                                                    {line}
                                                                </React.Fragment>
                                                            ))}
                                                        </div>) : (
                                                        <div>
                                                            {key.is_manditory &&
                                                                <span className={`text-danger mr-1`} style={{ marginLeft: '-12px' }}> ●</span>
                                                            }
                                                            {key.name}

                                                        </div>
                                                    )
                                                    }
                                                </div>}</h5>
                                                <h6 className="mt--1 ">{key.description}</h6>
                                                {/* <div className="mt--4">
                                                    <div className="text-right">
                                                        <h6 className="text-muted ls-1">{'10/20'}</h6>
                                                    </div>
                                                    <Progress
                                                        className="progress-xs"
                                                        max={`${'30'}`}
                                                        value={`${'20'}`}
                                                        color="warning"
                                                    />
                                                </div> */}
                                            </div>
                                            {isDropDownMenuArrow &&
                                                <div>
                                                    <DropDownMenuArrow onAddClick={() => { if (dropDownClick) { dropDownClick(key) } }} onDeleteClick={() => { if (dropDownDeleteClick) { dropDownDeleteClick(key) } }} />
                                                </div>
                                            }
                                        </div>
                                        {(data.length - 1 > index || data.length <= 4) && <Divider />}
                                    </div>
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

export { ProgressTrackCard };

