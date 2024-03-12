import { icons } from "@Assets";
import { Badge, Button, Card, Image } from "@Components"
import { translate } from "@I18n"
import { palette } from "@Themes";
import { convertTimeToDisplayTimeFormat, getDisplayDateWithTimeFromMoment } from "@Utils";
import moment from "moment";
import { useEffect, useState } from "react";

export const GetStudentSoftwareDevelopmentTaskCard = ({ data, buttonOnClick, disabled, shareOnclick, viewOnClick }: any) => {
    return (
        <div className="mx-1">
            <Card className="mb-2" style={{ borderRadius: '15px', boxShadow: '2px 2px 2px 2px rgba(0.1, 0.1, 0.1, 0.1)' }}>
                <div className="mb--3">
                    <div className={`d-flex justify-content-between mt--2`}>
                        <div className="col-sm-auto row">
                            <Image
                                height={30}
                                variant={'default'}
                                alt="..."
                                src={icons.softwareDev}
                            />

                            {/* {Title and description} */}

                            <div className="col mt--2">
                                {!data.is_manditory ? (
                                    <span className={`mr-1`} style={{ fontSize: 20, marginLeft: '-11px', color: palette.darkRed }}>●</span>
                                ) : <span className="mt-1 ml-1">{''}</span>}
                                <span className="h4" style={{ letterSpacing: 0.3, marginTop: 20 }}>{data.name}</span>

                                <div className="mt--1">
                                    <span className="ml-1" style={{ fontSize: 12, fontWeight: "500" }}>{data.description}</span>
                                </div>

                            </div>
                        </div>

                        {data.completedTasks && data.totalTasks && <div className="">
                            <h5 className="" >
                                {`${data.completedTasks}/${data.totalTasks}`}
                            </h5>

                            {/* <i className="bi bi-eye-fill fa-md text-primary pointer" onClick={viewOnClick}></i> */}
                        </div>}
                    </div>

                    <div className="">
                        <div className={`d-flex justify-content-between `}>

                            {/* {Status} */}

                            <div className="col-sm-3 mt-2" style={{ marginLeft: 30 }}>
                                {!data?.task_meta?.student_course_task?.is_approved &&
                                    (<span className="ml-1" style={{ fontSize: 12, fontWeight: '500' }} >{'Yet To Start'}
                                    </span>)}
                            </div>

                            {/* {Action button} */}

                            <div className="col pointer mt-1 ">
                                <Badge
                                    className="btn-primaryBlue"
                                    text={'Start'}
                                    color="info"
                                    size="sm"
                                    onClick={buttonOnClick}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </Card>
        </div>
    )
}


export const GetStudentVideoScreeningTaskCard = ({ data, buttonOnClick, disabled }) => {
    // console.log("datattaa===>", data);

    return (
        <div className="mx-1">
            <Card className="mb-2" style={{ borderRadius: '15px', boxShadow: '2px 2px 2px 2px rgba(0.1, 0.1, 0.1, 0.1)' }}>
                <div className="mb--3 mt--2">

                    <div className={`d-flex justify-content-between`}>
                        <div className="col row">
                            <Image
                                height={30}
                                variant={'default'}
                                alt="..."
                                src={icons.video}
                            />

                            {data?.is_manditory ? <span className={`mr-1 ml-1 mt--2`} style={{ fontSize: 20, color: palette.darkRed }}>●</span> : <>&nbsp;&nbsp;&nbsp;&nbsp;</>}

                            <Image
                                height={30}
                                variant={'avatar'}
                                alt="..."
                                src={icons.videoImg}
                            />

                            {/* {Title and description} */}

                            <div className="mt--1 col">
                                <span className="h4" style={{ letterSpacing: 0.3 }} >{data.name}</span>
                                <div className="mt--2">
                                    <span className="" style={{ fontWeight: '200', fontSize: 12 }}>
                                        {data.topic}

                                    </span>
                                </div>
                                <div className="d-flex justify-content-between">
                                    <div className="mt--1">

                                        <span className="" style={{ fontSize: 12, fontWeight: '500' }}>{data.description}</span>
                                    </div>

                                    <div style={{ marginRight: -40 }} >
                                        <h5 className="text-muted" style={{ letterSpacing: 0.3, fontSize: 12, fontWeight: "500" }}>{`Time Duration : ${data.timeDuration}`}</h5>
                                    </div>
                                </div>
                            </div>

                        </div>
                        <h5 className="">
                            {`${data.completedTasks}/${data.totalTasks}`}

                        </h5>

                    </div>


                    {!data.is_todays_task && <div className="mt--1">
                        <div className={`d-flex ${data?.task_meta?.student_course_task?.is_approved && 'justify-content-between'} `}>


                            {/* {Status} */}
                            <div className={`col-sm-3 pl-4`} style={{ marginLeft: 25 }}>
                                <span style={{ fontSize: 12, fontWeight: '500' }} className={`mr-3 `}>
                                    {'Yet To Start'}  </span>
                            </div>

                            {/* {Action button} */}

                            <div className="col pointer pl--3 mt--1">
                                <Badge
                                    className="btn-primaryBlue"
                                    text={'Start'}
                                    color="info"
                                    size="sm"
                                    onClick={buttonOnClick}
                                />

                            </div>
                            {/* <h5 className="ml-5 text-muted mt-1">{convertTimeToDisplayTimeFormat('26:36')}</h5> */}


                            {data?.task_meta?.student_course_task?.is_approved && (
                                <div>
                                    <Image src={icons.tickGreen} height={35} />
                                </div>
                            )}
                        </div>
                    </div>}
                </div>
            </Card>
        </div>
    )
}

export const GetStudentPageTaskCard = ({ data, buttonOnClick, disabled }) => {

    return (
        <div className="mx-1">
            <Card className="mb-2" style={{ borderRadius: '15px', boxShadow: '2px 2px 2px 2px rgba(0.1, 0.1, 0.1, 0.1)' }}>
                <div className="mt--2 mb--3">

                    <div className={`d-flex justify-content-between`}>
                        <div className="col-sm-12 row">
                            <Image
                                height={30}
                                variant={'default'}
                                alt="..."
                                src={icons.page}
                            />

                            {/* {Title and description} */}

                            <div className="col mt--1">
                                {data?.is_manditory ? <span className={`mr-1`} style={{ marginLeft: '-11px', fontSize: 20, color: palette.darkRed }}>●</span> : <>&nbsp;</>}
                                <span className="h4" style={{ letterSpacing: 0.3 }} >{data?.name}</span>
                                <div className="ml-1">
                                    <div>
                                        <h5 className="" style={{ letterSpacing: 0.3, fontSize: 12, fontWeight: '200' }}>{data?.topic}</h5>
                                    </div>
                                    <div className="d-flex justify-content-between">
                                        <div className="mt--1">

                                            <h5 className="" style={{ fontSize: 12, fontWeight: '500' }}>{data.description}</h5>
                                        </div>
                                        <div>
                                            <i className="bi bi-check-circle-fill text-success fa-lg"></i>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div>

                            </div>

                        </div>
                        <h5 className="">
                            {`${data.completedTasks}/${data.totalTasks}`}
                        </h5>
                    </div>

                    <div className="d-flex justify-content-between pointer ml-4">
                        <div className="col ml-2">
                            <Badge
                                className="btn-primaryBlue"
                                text={data.is_completed ? 'REDO' : 'START'}
                                size="sm"
                                onClick={buttonOnClick}
                            />
                        </div>
                        <div className="mt--1" >
                            <Image
                                height={33}
                                src={icons.timeline}
                            />
                        </div>
                    </div>


                </div>
            </Card>
        </div>
    )
}

export const GetStudentLinkedInCommunityTaskCard = ({ data, buttonOnClick, disabled }: any) => {

    return (
        <>
            <Card className="mb-2">
                <div className={`d-flex justify-content-between`}>
                    <div className="col-sm-auto row">
                        <Image
                            height={30}
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

                {!data.is_todays_task && <div>
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
                </div>}

            </Card>
        </>
    )
}



export const GetStudentCommunityTaskCard = ({ data, buttonOnClick, disabled }) => {

    return (
        <>
            <Card className="mb-2">
                <div className={`d-flex justify-content-between`}>
                    <div className="col-sm-auto row">
                        <Image
                            height={30}
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

                {!data.is_todays_task && <div>
                    <div className={`d-flex ${data?.task_meta?.student_course_task?.is_approved && 'justify-content-between'} `}>

                        {/* {Status} */}

                        <div style={{ marginLeft: data?.task_meta?.student_course_task?.is_approved ? '40px' : '55px' }}>
                            {!data?.task_meta?.student_course_task?.is_approved &&
                                (<h5 className={`text-${data?.task_meta?.student_course_task && data.task_meta?.student_course_task.is_submitted ? "warning font-weight-bold" : data?.task_meta?.student_course_task?.is_approved ? 'success font-weight-bold' :
                                    data?.task_meta?.student_course_task?.is_rejected ? 'danger font-weight-bold' : data?.task_meta?.student_course_task && !data.task_meta?.student_course_task.is_submitted && !data?.task_meta?.student_course_task?.is_approved && !data?.task_meta?.student_course_task?.is_rejected ? 'Resume font-weight-bold' : 'Yet to start'}`}>

                                    {data?.task_meta?.is_completed ?
                                        <div>
                                            <Image src={icons.tickGreen} height={35} />
                                        </div>
                                        :
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

                        {data?.task_meta?.student_course_task?.is_approved && (
                            <div>
                                <Image src={icons.tickGreen} height={35} />
                            </div>
                        )}
                    </div>
                </div>}

            </Card>
        </>
    )
}



export const GetStudentMockInterviewTaskCard = ({ data, buttonOnClick }) => {
    const [sessionStartAt, setSessionStartAt] = useState<any>()

    // if (sessionStartAt === " " || sessionStartAt === true) {
    // setInterval(() => {
    //     if (data?.task_meta?.student_course_task && data.task_meta?.student_course_task.is_scheduled) {
    //         let { task_meta } = data
    //         let { student_course_task } = task_meta
    //         let { schedule_start_time } = student_course_task
    //         let startDate = new Date(schedule_start_time).getTime()
    //         let currentDate = new Date().getTime()
    //         let distance = startDate - currentDate
    //         if (distance < 0) {
    //             setSessionStartAt(false)
    //         }
    //         else {
    //             setSessionStartAt(true)
    //         }
    //     }
    // }, 1000)
    // // }


    return (
        <div className="mx-1">
            <Card className="mb-2" style={{ borderRadius: '15px', boxShadow: '2px 2px 2px 2px rgba(0.1, 0.1, 0.1, 0.1)' }}>
                <div className="mt--2 mb--2">
                    <div className={`d-flex justify-content-between`}>
                        <div className="col-sm-12 row">
                            <Image
                                className="mr--1"
                                height={30}
                                variant={'default'}
                                alt="..."
                                src={icons.mockInterview}
                            />

                            {/* {Title and description} */}

                            <div className="col mt--2">
                                {/* {!data?.is_manditory ? <span className={`text-danger mr-1`} style={{ marginLeft: '-11px', fontSize: 20 }}>●</span> : <></>} */}
                                {data?.is_manditory ? <span className={`mt--1`} style={{ fontSize: 20, color: palette.darkRed }}>●</span> : <span className="mt-1">&nbsp;&nbsp;</span>}

                                <span className="h4" style={{ letterSpacing: 0.3 }}>{data.name}</span>
                                <div className="mt--1 ml-2">
                                    <span style={{ fontWeight: '200', fontSize: 12 }}>{data?.topic}</span>
                                </div>

                                <div className="mt--1 row justify-content-between">
                                    <div className="pl-4">
                                        <span className="" style={{ fontSize: 12, fontWeight: "500" }}>{data.description}</span>
                                    </div>
                                    <div style={{ marginRight: -28 }}>
                                        <h5 className="text-muted" style={{ letterSpacing: 0.3, fontSize: 12, fontWeight: "500" }}>{`Time Duration : ${data.timeDuration}`}</h5>
                                    </div>
                                </div>

                            </div>

                        </div>
                        <h5 className="">
                            {`${data.completedTasks}/${data.totalTasks}`}
                        </h5>

                    </div>


                    {!data.is_todays_task && <div>
                        <div className={`row mb--3`}>

                            {/* {Status} */}

                            <div className="col-sm-3" style={{ marginLeft: 44 }}>
                                <span className="" style={{ fontSize: 12, fontWeight: '500', marginLeft: 5 }} >
                                    {'Yet To Start'}
                                </span>
                            </div>
                            <div className="pb--2">
                                <Badge
                                    className="btn-primaryBlue pointer"
                                    text={'Start'}
                                    size="sm"
                                    onClick={buttonOnClick}
                                />
                            </div>
                            {/* {data?.task_meta?.student_course_task?.is_approved && (
                                <div>
                                    <Image src={icons.tickGreen} height={35} />
                                </div>
                            )} */}
                        </div>
                    </div>}
                </div>
            </Card>
        </div>
    )
}

export const GetStudentSoftwareScreeningTaskCard = ({ data, buttonOnClick }: any) => {
    const [sessionStartAt, setSessionStartAt] = useState<any>()
    // console.log("sessionStartAt=============>", sessionStartAt)

    // setInterval(() => {
    //     if (data?.task_meta?.student_course_task && data.task_meta?.student_course_task.is_scheduled) {
    //         let { task_meta } = data
    //         let { student_course_task } = task_meta
    //         let { schedule_start_time } = student_course_task
    //         let startDate = new Date(schedule_start_time).getTime()
    //         let currentDate = new Date().getTime()
    //         let distance = startDate - currentDate
    //         if (distance < 0) {
    //             setSessionStartAt(false)
    //         }
    //         else {
    //             setSessionStartAt(true)
    //         }
    //         // console.log("sessionStartAt=============>", distance)

    //     }
    // }, 1000)

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
                            {data?.is_manditory && !data.is_todays_task ? <span className={`text-danger mr-1`} style={{ marginLeft: '-11px' }}>●</span> : <>&nbsp;&nbsp;&nbsp;</>}
                            {data.name}

                            <div>
                                <h5 className=" font-weight-light">{data.description}</h5>
                            </div>

                        </div>
                    </div>
                </div>

                {!data?.is_todays_task && <div>
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
                                disabled={data?.task_meta?.student_course_task && data.task_meta?.student_course_task.is_requested ? true : false}
                                onClick={buttonOnClick}
                            />
                        </div>

                        {data?.task_meta?.student_course_task?.is_approved && (
                            <div>
                                <Image src={icons.tickGreen} height={35} />
                            </div>
                        )}
                    </div>
                </div>}

            </Card>
        </>
    )
}

/*schedule variants*/

// software screening schedule variant

export const GetStudentSoftwareScreeningScheduleVariantTaskCard = ({ data, buttonOnClick }: any) => {
    const [sessionStartAt, setSessionStartAt] = useState<any>()

    return (
        <>
            <Card className="mb-2" style={{ borderRadius: '15px', boxShadow: '2px 2px 2px 2px rgba(0.1, 0.1, 0.1, 0.1)' }}>
                <div className="mt--3 mb--4">
                    <div className="d-flex justify-content-end mt--2 mb--3">
                        <h5 className="text-muted" style={{ fontWeight: '500', fontSize: 10, letterSpacing: 0.3 }}>{`Time Duration : ${data.timeDuration}`}</h5>
                    </div>
                    <div className={`row justify-content-between ml-2`}>
                        <div className="row">
                            <Image
                                height={30}
                                variant={'default'}
                                alt="..."
                                src={icons.linkedIn}
                            />
                            {/* {Title and description} */}
                            <div>
                                <span className="h5 ml-2">{data.name}</span>
                                <div className="mt--1 mb-1">
                                    <span className="ml-2" style={{ fontWeight: '500', fontSize: 9.5 }}>{data.description}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </Card>
        </>
    )
}

/* Today's Accomplishment*/

// software development schedule variant

export const GetStudentSoftwareDevelopmentTodayAccomplishmentTaskCard = ({ data, buttonOnClick, disabled, shareOnclick, viewOnClick }: any) => {
    return (
        <div className="">
            <Card className="mb-2" style={{ borderRadius: '15px', boxShadow: '2px 2px 2px 2px rgba(0.1, 0.1, 0.1, 0.1)' }}>
                <div className="mb--3">
                    <div className={`d-flex justify-content-between mt--2`}>
                        <div className="col-sm-auto row">
                            <Image
                                height={30}
                                variant={'default'}
                                alt="..."
                                src={icons.softwareDev}
                            />


                            <div className="col mt--2">
                                <span className="h5">{data.name}</span>
                                <div>
                                    <span className="" style={{ fontWeight: '500', fontSize: 9.5 }}>{data.description}</span>
                                </div>

                            </div>
                        </div>
                    </div>
                </div>
            </Card>
        </div>
    )
}

// mock interview schedule variant

export const GetStudentMockInterviewTodayAccomplishmentTaskCard = ({ data, buttonOnClick, disabled, shareOnclick, viewOnClick }: any) => {
    return (
        <div className="">
            <Card className="mb-2" style={{ borderRadius: '15px', boxShadow: '2px 2px 2px 2px rgba(0.1, 0.1, 0.1, 0.1)' }}>
                <div className="mb--3">
                    <div className={`d-flex justify-content-between mt--2`}>
                        <div className="col-sm-auto row">
                            <Image
                                height={30}
                                variant={'default'}
                                alt="..."
                                src={icons.mockInterview}
                            />


                            <div className="col mt--2">
                                <span className="h5">{data.name}</span>
                                <div>
                                    <span className="" style={{ fontWeight: '500', fontSize: 9.5 }}>{data.description}</span>
                                </div>

                            </div>
                        </div>
                    </div>
                </div>
            </Card>
        </div>
    )
}

export const GetStudentScreeningScheduleVariantTaskCard = ({ data, buttonOnClick }: any) => {
    const [sessionStartAt, setSessionStartAt] = useState<any>()
    // console.log("sessionStartAt=============>", sessionStartAt)

    // setInterval(() => {
    //     if (data?.task_meta?.student_course_task && data.task_meta?.student_course_task.is_scheduled) {
    //         let { task_meta } = data
    //         let { student_course_task } = task_meta
    //         let { schedule_start_time } = student_course_task
    //         let startDate = new Date(schedule_start_time).getTime()
    //         let currentDate = new Date().getTime()
    //         let distance = startDate - currentDate
    //         if (distance < 0) {
    //             setSessionStartAt(false)
    //         }
    //         else {
    //             setSessionStartAt(true)
    //         }
    //         // console.log("sessionStartAt=============>", distance)

    //     }
    // }, 1000)

    return (
        <>
            <Card className="" style={{ marginTop: '-22px' }}>
                <div className={`d-flex justify-content-between`}>
                    <div className="col-sm-auto row">
                        <Image
                            height={30}
                            variant={'default'}
                            alt="..."
                            src={icons.linkedIn}
                        />

                        {/* {Title and description} */}

                        <div className="col">
                            <span className="h4">{data.name}</span>
                            <div>
                                <h5 className=" font-weight-light">{data.description}</h5>
                            </div>

                        </div>
                    </div>
                </div>

                {/* <div>
                    <div className={`d-flex ${data?.task_meta?.student_course_task?.is_approved && 'justify-content-between'} `}>


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
                                </h5>)
                            }
                        </div>


                        <div className="col pointer">
                            <Button size="sm" text={data?.task_meta?.student_course_task && data.task_meta?.student_course_task.is_completed ? "Re-watch" : data?.task_meta?.student_course_task && data.task_meta?.student_course_task.is_requested ? 'Requested' : data?.task_meta?.student_course_task && data.task_meta?.student_course_task.is_scheduled ? 'Start now' : 'Request'}
                                disabled={data?.task_meta?.student_course_task && data.task_meta?.student_course_task.is_requested ? true : false}
                                onClick={buttonOnClick}
                            />
                        </div>

                        {data?.task_meta?.student_course_task?.is_approved && (
                            <div>
                                <Image src={icons.tickGreen} height={35} />
                            </div>
                        )}
                    </div>
                </div> */}

            </Card>
        </>
    )
}
