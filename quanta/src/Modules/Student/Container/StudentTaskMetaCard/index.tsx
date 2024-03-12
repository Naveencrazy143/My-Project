import { icons } from "@Assets";
import { Button, Card, Image } from "@Components"
import { translate } from "@I18n"
import { convertTimeToDisplayTimeFormat, getDisplayDateWithTimeFromMoment } from "@Utils";
import moment from "moment";
import { useEffect, useState } from "react";

export const GetStudentSoftwareDevelopmentCard = ({ data, buttonOnClick, disabled, shareOnclick, viewOnClick }: any) => {

    return (
        <>
            <Card >
                <div className={`d-flex justify-content-between`}>
                    <div className="col-sm-auto row">
                        <Image
                            height={40}
                            variant={'default'}
                            alt="..."
                            src={icons.softwareDev}
                        />

                        {/* {Title and description} */}

                        <div className="col">
                            {data.task_meta.is_manditory && (
                                <span className={`text-danger mr-1`} style={{ marginLeft: '-11px' }}>●</span>
                            )}
                            {data.task_meta.name}

                            <div>
                                <h5 className=" font-weight-light">{data.task_meta.description}</h5>
                            </div>

                        </div>
                    </div>

                    {/* {Share and view icons} */}

                    {data.task_meta.student_course_task && <div className="d-flex">
                        <div className="mr-3">
                            <i className="bi bi-share-fill fa-md text-primary pointer" onClick={shareOnclick}></i>
                        </div>

                        <i className="bi bi-eye-fill fa-md text-primary pointer" onClick={viewOnClick}></i>
                    </div>}
                </div>

                <div>
                    <div className={`d-flex ${data?.task_meta?.student_course_task?.is_approved && 'justify-content-between'} `}>

                        {/* {Status} */}

                        <div style={{ marginLeft: data?.task_meta?.student_course_task?.is_approved ? '40px' : '55px' }}>
                            {!data?.task_meta?.student_course_task?.is_approved &&
                                (<h5 className={`text-${data?.task_meta?.student_course_task && data.task_meta?.student_course_task.is_submitted ? "warning font-weight-bold" : data?.task_meta?.student_course_task?.is_approved ? 'success font-weight-bold' :
                                    data?.task_meta?.student_course_task?.is_rejected ? 'danger font-weight-bold' : data?.task_meta?.student_course_task && !data.task_meta?.student_course_task.is_submitted && !data?.task_meta?.student_course_task?.is_approved && !data?.task_meta?.student_course_task?.is_rejected ? 'Resume font-weight-bold' : 'Yet to start'}`}>

                                    {data?.task_meta?.student_course_task && data.task_meta?.student_course_task.is_submitted ? <><div>{translate("student.pendingApproval")?.toUpperCase()!}</div>  <span className='font-weight-light' style={{ color: "#525F7F", fontSize: '10px' }}>{translate("student.awaitingFacultyApproval")!}</span></> : data?.task_meta?.student_course_task?.is_approved ?
                                        <div>
                                            <Image src={icons.tickGreen} height={35} />
                                        </div>
                                        :
                                        data?.task_meta?.student_course_task?.is_rejected ? translate("admin.rejected")! : data?.task_meta?.student_course_task && !data.task_meta?.student_course_task.is_submitted && !data?.task_meta?.student_course_task?.is_approved && !data?.task_meta?.student_course_task?.is_rejected ? translate("student.inprogress")!.toUpperCase() : translate("student.yetToStart")!.toUpperCase()}
                                </h5>)}
                        </div>

                        {/* {Action button} */}

                        <div className="col pointer">
                            <Button size="sm" text={data?.task_meta?.student_course_task && !data.task_meta?.student_course_task.is_submitted && !data?.task_meta?.student_course_task?.is_approved && !data?.task_meta?.student_course_task?.is_rejected ? translate("student.resume")! : !data?.task_meta?.student_course_task ? translate("course.start")! : translate("student.redo")!}
                                onClick={buttonOnClick}
                                disabled={disabled}
                            />
                        </div>

                        {data?.task_meta?.student_course_task?.is_approved && (
                            <div>
                                <Image src={icons.tickGreen} height={35} />
                            </div>
                        )}
                    </div>
                </div>

            </Card>
        </>
    )
}


export const GetStudentVideoScreeningCard = ({ data, buttonOnClick, disabled }) => {
    return (
        <>
            <Card >
                <div className={`d-flex justify-content-between`}>
                    <div className="col-sm-auto row">
                        <Image
                            height={40}
                            variant={'default'}
                            alt="..."
                            src={icons.video}
                        />

                        {data?.task_meta?.is_manditory ? <span className={`text-danger mr-1 ml-1 mt--2`}>●</span> : <>&nbsp;&nbsp;&nbsp;</>}

                        <Image
                            height={40}
                            variant={'avatar'}
                            alt="..."
                            src={'https://a1png.com/wp-content/uploads/2021/01/ms-dhoni-6.png'}
                        />

                        {/* {Title and description} */}

                        <div className="col mt--1">
                            {data.task_meta.name}
                            <div>
                                <h5 className=" font-weight-light">{data.task_meta.description}</h5>
                            </div>

                        </div>
                    </div>

                </div>

                <div>
                    <div className={`d-flex ${data?.task_meta?.student_course_task?.is_approved && 'justify-content-between'} `}>

                        <h5 className="ml-5 text-muted mt-1">{convertTimeToDisplayTimeFormat(data.task_meta.details.total_video_duration) || convertTimeToDisplayTimeFormat('26:36')}</h5>

                        {/* {Status} */}
                        <div className={`${data?.task_meta?.student_course_task?.is_approved ? 'ml-6' : 'ml-4'} mt-1`}>
                            {!data?.task_meta?.student_course_task?.is_approved &&
                                (<h5 className={`text-${data?.task_meta?.student_course_task && data.task_meta?.student_course_task.is_submitted ? "warning font-weight-bold" : data?.task_meta?.student_course_task?.is_approved ? 'success font-weight-bold' :
                                    data?.task_meta?.student_course_task?.is_rejected ? 'danger font-weight-bold' : data?.task_meta?.student_course_task && !data.task_meta?.student_course_task.is_submitted && !data?.task_meta?.student_course_task?.is_approved && !data?.task_meta?.student_course_task?.is_rejected ? 'Resume font-weight-bold' : 'Yet to start'}`}>

                                    {!data?.task_meta && data.task_meta?.is_completed &&
                                        translate("student.yetToStart")!.toUpperCase()}
                                </h5>)}
                        </div>

                        {/* {Action button} */}

                        <div className="col pointer">
                            <Button size="sm" text={!data?.task_meta?.is_completed ? translate("course.start")! : 'Re-watch'}
                                onClick={buttonOnClick}
                                disabled={disabled}
                            />
                        </div>

                        {data?.task_meta?.is_completed && (
                            <div>
                                <Image src={icons.tickGreen} height={35} />
                            </div>
                        )}
                    </div>
                </div>

            </Card>
        </>
    )
}

export const GetStudentPageCard = ({ data, buttonOnClick, disabled }) => {
    // console.log("elellelepageee==>", el)

    return (
        <>
            <Card>
                <div className={`d-flex justify-content-between`}>
                    <div className="col-sm-auto row">
                        <Image
                            height={35}
                            variant={'default'}
                            alt="..."
                            src={icons.page}
                        />

                        {/* {Title and description} */}

                        <div className="col mt--1">
                            {data?.task_meta?.is_manditory ? <span className={`text-danger mr-1`} style={{ marginLeft: '-11px' }}>●</span> : <>&nbsp;&nbsp;&nbsp;</>}
                            {data.task_meta.name}

                            <div>
                                <h5 className=" font-weight-light">{data.task_meta.description}</h5>
                            </div>

                        </div>
                    </div>

                </div>

                <div>
                    <div className={`d-flex ${data?.task_meta?.student_course_task?.is_approved && 'justify-content-between'} `}>

                        {/* {Status} */}

                        <div style={{ marginLeft: data?.task_meta?.student_course_task?.is_approved ? '40px' : '55px' }}>
                            {!data?.task_meta?.student_course_task?.is_approved &&
                                (<h5 className={`text-${data?.task_meta?.student_course_task && data.task_meta?.student_course_task.is_submitted ? "warning font-weight-bold" : data?.task_meta?.student_course_task?.is_approved ? 'success font-weight-bold' :
                                    data?.task_meta?.student_course_task?.is_rejected ? 'danger font-weight-bold' : data?.task_meta?.student_course_task && !data.task_meta?.student_course_task.is_submitted && !data?.task_meta?.student_course_task?.is_approved && !data?.task_meta?.student_course_task?.is_rejected ? 'Resume font-weight-bold' : 'Yet to start'}`}>

                                    {data?.task_meta?.student_course_task && data.task_meta?.student_course_task.is_submitted ? <><div>{translate("student.pendingApproval")?.toUpperCase()!}</div>  <span className='font-weight-light' style={{ color: "#525F7F", fontSize: '10px' }}>{translate("student.awaitingFacultyApproval")!}</span></> : data?.task_meta?.is_completed ?
                                        <div>
                                            <Image src={icons.tickGreen} height={35} />
                                        </div>
                                        :
                                        data?.task_meta?.student_course_task?.is_rejected ? translate("admin.rejected")! : data?.task_meta?.student_course_task && !data.task_meta?.student_course_task.is_submitted && !data?.task_meta?.student_course_task?.is_approved && !data?.task_meta?.student_course_task?.is_rejected ? translate("student.inprogress")!.toUpperCase() : translate("student.yetToStart")!.toUpperCase()}
                                </h5>)}
                        </div>

                        {/* {Action button} */}

                        <div className="col pointer">
                            <Button size="sm" text={!data?.task_meta?.is_completed ? translate("course.start")! : 'Re-read'}
                                onClick={buttonOnClick}
                            />
                        </div>

                        {data?.task_meta?.student_course_task?.is_approved && (
                            <div>
                                <Image src={icons.tickGreen} height={35} />
                            </div>
                        )}
                    </div>
                </div>

            </Card>
        </>
    )
}

export const GetStudentLinkedInCommunityCard = ({ data, buttonOnClick, disabled }: any) => {

    return (
        <>
            <Card>
                <div className={`d-flex justify-content-between`}>
                    <div className="col-sm-auto row">
                        <Image
                            height={35}
                            variant={'default'}
                            alt="..."
                            src={icons.linkedIn}
                        />

                        {/* {Title and description} */}

                        <div className="col">
                            {data?.task_meta?.is_manditory ? <span className={`text-danger mr-1`} style={{ marginLeft: '-11px' }}>●</span> : <>&nbsp;&nbsp;&nbsp;</>}
                            {data.task_meta.details?.title}
                        </div>
                    </div>

                </div>

                <div>
                    <div className={`d-flex ${data?.task_meta?.student_course_task?.is_approved && 'justify-content-between'} `}>

                        {/* {Status} */}

                        <div style={{ marginLeft: data?.task_meta?.student_course_task?.is_approved ? '40px' : '55px' }}>
                            {!data?.task_meta?.student_course_task?.is_approved &&
                                (<h5 className={`text-${data?.task_meta?.student_course_task && data.task_meta?.student_course_task.is_submitted ? "warning font-weight-bold" : data?.task_meta?.student_course_task?.is_approved ? 'success font-weight-bold' :
                                    data?.task_meta?.student_course_task?.is_rejected ? 'danger font-weight-bold' : data?.task_meta?.student_course_task && !data.task_meta?.student_course_task.is_submitted && !data?.task_meta?.student_course_task?.is_approved && !data?.task_meta?.student_course_task?.is_rejected ? 'Resume font-weight-bold' : 'Yet to start'}`}>

                                    {data?.task_meta?.student_course_task && data.task_meta?.student_course_task.is_submitted ? <><div>{translate("student.pendingApproval")?.toUpperCase()!}</div>  <span className='font-weight-light' style={{ color: "#525F7F", fontSize: '10px' }}>{translate("student.awaitingFacultyApproval")!}</span></> : data?.task_meta?.student_course_task?.is_approved ?
                                        <div>
                                            <Image src={icons.tickGreen} height={35} />
                                        </div>
                                        :
                                        data?.task_meta?.student_course_task?.is_rejected ? translate("admin.rejected")! : data?.task_meta?.student_course_task && !data.task_meta?.student_course_task.is_submitted && !data?.task_meta?.student_course_task?.is_approved && !data?.task_meta?.student_course_task?.is_rejected ? translate("student.inprogress")!.toUpperCase() : translate("student.yetToStart")!.toUpperCase()}
                                </h5>)}
                        </div>

                        {/* {Action button} */}

                        <div className="col pointer">
                            <Button size="sm" text={'View'}
                                onClick={buttonOnClick}
                                disabled={disabled}
                            />
                        </div>

                        {data?.task_meta?.student_course_task?.is_approved && (
                            <div>
                                <Image src={icons.tickGreen} height={35} />
                            </div>
                        )}
                    </div>
                </div>

            </Card>
        </>
    )
}



export const GetStudentCommunityCard = ({ data, buttonOnClick, disabled }) => {

    return (
        <>
            <Card>
                <div className={`d-flex justify-content-between`}>
                    <div className="col-sm-auto row">
                        <Image
                            height={35}
                            variant={'default'}
                            alt="..."
                            src={icons.linkedIn}
                        />

                        {/* {Title and description} */}

                        <div className="col">
                            {data?.task_meta?.is_manditory ? <span className={`text-danger mr-1`} style={{ marginLeft: '-11px' }}>●</span> : <>&nbsp;&nbsp;&nbsp;</>}
                            {data.task_meta.details?.title}
                        </div>
                    </div>

                </div>

                <div>
                    <div className={`d-flex ${data?.task_meta?.student_course_task?.is_approved && 'justify-content-between'} `}>

                        {/* {Status} */}

                        <div style={{ marginLeft: data?.task_meta?.student_course_task?.is_approved ? '40px' : '55px' }}>
                            {!data?.task_meta?.student_course_task?.is_approved &&
                                (<h5 className={`text-${data?.task_meta?.student_course_task && data.task_meta?.student_course_task.is_submitted ? "warning font-weight-bold" : data?.task_meta?.student_course_task?.is_approved ? 'success font-weight-bold' :
                                    data?.task_meta?.student_course_task?.is_rejected ? 'danger font-weight-bold' : data?.task_meta?.student_course_task && !data.task_meta?.student_course_task.is_submitted && !data?.task_meta?.student_course_task?.is_approved && !data?.task_meta?.student_course_task?.is_rejected ? 'Resume font-weight-bold' : 'Yet to start'}`}>

                                    {!data?.task_meta?.is_completed  && 
                                        translate("student.yetToStart")!.toUpperCase()}
                                </h5>)}
                        </div>

                        {/* {Action button} */}

                        <div className="col pointer">
                            <Button size="sm" text={'View'}
                                onClick={buttonOnClick}
                                disabled={disabled}
                            />
                        </div>

                        {data?.task_meta?.is_completed && (
                            <div>
                                <Image src={icons.tickGreen} height={35} />
                            </div>
                        )}
                    </div>
                </div>

            </Card>
        </>
    )
}



export const GetStudentMockInterviewCard = ({ data, buttonOnClick }) => {
    const [sessionStartAt, setSessionStartAt] = useState<any>()

    console.log("0000000000000000000000000",)


    // if (sessionStartAt === " " || sessionStartAt === true) {
    setInterval(() => {
        if (data?.task_meta?.student_course_task && data.task_meta?.student_course_task.is_scheduled) {
            let { task_meta } = data
            let { student_course_task } = task_meta
            let { schedule_start_time } = student_course_task
            let startDate = new Date(schedule_start_time).getTime()
            let currentDate = new Date().getTime()
            let distance = startDate - currentDate
            if (distance < 0) {
                setSessionStartAt(false)
            }
            else {
                setSessionStartAt(true)
            }
        }
        // console.log("sessionStartAt", sessionStartAt)
    }, 1000)
    // }


    return (
        <>
            <Card >
                <div className={`d-flex justify-content-between`}>
                    <div className="col-sm-auto row">
                        <Image
                            height={35}
                            variant={'default'}
                            alt="..."
                            src={icons.mockInterview}
                        />

                        {/* {Title and description} */}

                        <div className="col mt--2">
                            {data?.task_meta?.is_manditory ? <span className={`text-danger mr-1`} style={{ marginLeft: '-11px' }}>●</span> : <></>}
                            {data.task_meta.name}

                            <div>
                                <h5 className=" font-weight-light">{data.task_meta.description}</h5>
                            </div>

                        </div>
                    </div>


                </div>

                <div>
                    <div className={`d-flex ${data?.task_meta?.student_course_task?.is_approved && 'justify-content-between'} `}>

                        {/* {Status} */}

                        <div style={{ marginLeft: data?.task_meta?.student_course_task?.is_approved ? '40px' : '55px' }}>
                            {!data?.task_meta?.student_course_task?.is_approved &&
                                (<h5 className={`text-${data?.task_meta?.student_course_task && data.task_meta?.student_course_task.is_requested ? "warning font-weight-bold" : data?.task_meta?.student_course_task?.is_approved ? ' font-weight-bold' :
                                    data?.task_meta?.student_course_task?.is_scheduled ? 'green font-weight-bold' : 'Yet to start'}`}>

                                    {data?.task_meta?.student_course_task && data.task_meta?.student_course_task.is_completed ? <><div className="text-success">{"Completed"} <Image src={icons.tickGreen} height={35} /></div> </>
                                        : data?.task_meta?.student_course_task && data.task_meta?.student_course_task.is_requested ? <><div>{translate("student.pendingApproval")?.toUpperCase()!}</div>  <span className='font-weight-light' style={{ color: "#525F7F", fontSize: '10px' }}>{translate("student.awaitingFacultyApproval")!}</span></>
                                            :
                                            <>
                                                <div> {data?.task_meta?.student_course_task?.is_scheduled ? 'Request Approved ' : translate("student.yetToStart")!.toUpperCase()}</div>
                                                <span className="text-black font-weight-light">{data?.task_meta?.student_course_task?.is_scheduled ? 'Awaiting for Mock Interview ' : ""}</span>
                                            </>}
                                </h5>)}
                        </div>

                        {/* {Action button} */}

                        {<div className="col pointer">
                            <Button size="sm" text={data?.task_meta?.student_course_task && data.task_meta?.student_course_task.is_completed ? "Re-watch" : data?.task_meta?.student_course_task && data.task_meta?.student_course_task.is_requested ? 'Requested' : data?.task_meta?.student_course_task && data.task_meta?.student_course_task.is_scheduled ? 'Start now' : 'Request'}
                                // disabled={data?.task_meta?.student_course_task && data.task_meta?.student_course_task.is_requested ? true : false}
                                disabled={sessionStartAt}
                                onClick={buttonOnClick}
                            />
                        </div>
                        }
                        {data?.task_meta?.student_course_task?.is_approved && (
                            <div>
                                <Image src={icons.tickGreen} height={35} />
                            </div>
                        )}
                    </div>
                </div>

            </Card>
        </>
    )
}

export const GetStudentSoftwareScreeningCard = ({ data, buttonOnClick }: any) => {
    const [sessionStartAt, setSessionStartAt] = useState<any>()
    // console.log("sessionStartAt=============>", sessionStartAt)

    setInterval(() => {
        if (data?.task_meta?.student_course_task && data.task_meta?.student_course_task.is_scheduled) {
            let { task_meta } = data
            let { student_course_task } = task_meta
            let { schedule_start_time } = student_course_task
            let startDate = new Date(schedule_start_time).getTime()
            let currentDate = new Date().getTime()
            let distance = startDate - currentDate
            if (distance < 0) {
                setSessionStartAt(false)
            }
            else {
                setSessionStartAt(true)
            }
            // console.log("sessionStartAt=============>", distance)

        }
    }, 1000)

    return (
        <>
            <Card>
                <div className={`d-flex justify-content-between`}>
                    <div className="col-sm-auto row">
                        <Image
                            height={35}
                            variant={'default'}
                            alt="..."
                            src={icons.linkedIn}
                        />

                        {/* {Title and description} */}

                        <div className="col">
                            {data?.task_meta?.is_manditory ? <span className={`text-danger mr-1`} style={{ marginLeft: '-11px' }}>●</span> : <>&nbsp;&nbsp;&nbsp;</>}
                            {data.task_meta.name}

                            <div>
                                <h5 className=" font-weight-light">{data.task_meta.description}</h5>
                            </div>

                        </div>
                    </div>
                </div>

                <div>
                    <div className={`d-flex ${data?.task_meta?.student_course_task?.is_approved && 'justify-content-between'} `}>

                        {/* {Status} */}

                        <div style={{ marginLeft: data?.task_meta?.student_course_task?.is_approved ? '40px' : '55px' }}>
                            {!data?.task_meta?.student_course_task?.is_approved &&
                                // (<h5 className={`text-${data?.task_meta?.student_course_task && data.task_meta?.student_course_task.is_requested ? "warning font-weight-bold" : data?.task_meta?.student_course_task?.is_approved ? 'success font-weight-bold' :
                                //     data?.task_meta?.student_course_task?.is_scheduled ? 'green font-weight-bold' : 'Yet to start'}`}>

                                //     {data?.task_meta?.student_course_task && data.task_meta?.student_course_task.is_requested ? <><div>{translate("student.pendingApproval")?.toUpperCase()!}</div>  <span className='font-weight-light' style={{ color: "#525F7F", fontSize: '10px' }}>{translate("student.awaitingFacultyApproval")!}</span></>
                                //         :
                                //         data?.task_meta?.student_course_task?.is_scheduled ? 'Request Approved' : translate("student.yetToStart")!.toUpperCase()}
                                // </h5>)
                                (<h5 className={`text-${data?.task_meta?.student_course_task && data.task_meta?.student_course_task.is_requested ? "warning font-weight-bold" : data?.task_meta?.student_course_task?.is_approved ? ' font-weight-bold' :
                                    data?.task_meta?.student_course_task?.is_scheduled ? 'green font-weight-bold' : 'Yet to start'}`}>

                                    {data?.task_meta?.student_course_task && data.task_meta?.student_course_task.is_completed ? <><div className="text-success">{"Completed"} <Image src={icons.tickGreen} height={35} /></div> </>
                                        : data?.task_meta?.student_course_task && data.task_meta?.student_course_task.is_requested ? <><div>{translate("student.pendingApproval")?.toUpperCase()!}</div>  <span className='font-weight-light' style={{ color: "#525F7F", fontSize: '10px' }}>{translate("student.awaitingFacultyApproval")!}</span></>
                                            :
                                            <>
                                                <div> {data?.task_meta?.student_course_task?.is_scheduled ? 'Request Approved ' : translate("student.yetToStart")!.toUpperCase()}</div>
                                                <span className="text-black font-weight-light">{data?.task_meta?.student_course_task?.is_scheduled ? 'Awaiting for Mock Interview ' : ""}</span>
                                            </>}
                                </h5>)
                            }
                        </div>

                        {/* {Action button} */}

                        <div className="col pointer">
                            <Button size="sm" text={data?.task_meta?.student_course_task && data.task_meta?.student_course_task.is_completed ? "Re-watch" : data?.task_meta?.student_course_task && data.task_meta?.student_course_task.is_requested ? 'Requested' : data?.task_meta?.student_course_task && data.task_meta?.student_course_task.is_scheduled ? 'Start now' : 'Request'}
                                // disabled={data?.task_meta?.student_course_task && data.task_meta?.student_course_task.is_requested ? true : false}
                                disabled={sessionStartAt}
                                onClick={buttonOnClick}
                            />
                        </div>

                        {data?.task_meta?.student_course_task?.is_approved && (
                            <div>
                                <Image src={icons.tickGreen} height={35} />
                            </div>
                        )}
                    </div>
                </div>

            </Card>
        </>
    )
}

//Student my task

export const GetStudentMyTaskCard = ({ data, buttonOnClick, shareOnclick, viewOnClick }) => {
    console.log("wwwwwwwwwwww", data);


    return (
        <>
            <Card >
                <div className={`d-flex justify-content-between`}>
                    <div className="col-sm-auto row">
                        <Image
                            height={40}
                            variant={'default'}
                            alt="..."
                            src={icons.softwareDev}
                        />

                        {/* {Title and description} */}

                        <div className="col">
                            {data.task_meta.is_manditory && (
                                <span className={`text-danger mr-1`} style={{ marginLeft: '-11px' }}>●</span>
                            )}
                            {data.task_meta.name}

                            <div>
                                <h5 className=" font-weight-light">{data.task_meta.description}</h5>
                            </div>

                        </div>
                    </div>

                    {/* {Share and view icons} */}

                    <div className="d-flex">
                        <div className="mr-3">
                            <i className="bi bi-share-fill fa-md text-primary pointer" onClick={shareOnclick}></i>
                        </div>

                        <i className="bi bi-eye-fill fa-md text-primary pointer" onClick={viewOnClick}></i>
                    </div>
                </div>

                <div>
                    <div className="col pointer ml-3 mb-2 text-right">
                        <Button size="sm"
                            text={translate("common.continue")!}
                            onClick={buttonOnClick}
                        />
                    </div>
                    <div className="d-flex justify-content-between">
                        <div>
                            <span style={{fontSize:12}}>{`${translate("guest.createdAt")!}  :  `}<span style={{fontSize: 13, fontWeight: '500'}}>{getDisplayDateWithTimeFromMoment(data?.created_at)}</span></span>
                        </div>
                        <div>
                            <span style={{fontSize:12}}>{`${translate("guest.savedAt")!}  :  `}<span style={{fontSize: 13, fontWeight: '500'}}>{getDisplayDateWithTimeFromMoment(data?.updated_at)}</span></span>
                        </div>
                    </div>


                </div>

            </Card>
        </>
    )
}