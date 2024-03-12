import { Button, CommonTable, InputHeading, NoRecordsFound, ProgressBar, Spinner, showToast } from '@Components'
import { DynamicHeight, useLoader, useNavigation } from '@Hooks'
import { translate } from '@I18n'
import { BatchTimeLine, DropDownMenuArrow } from '@Modules'
import { editScheduleMeetingDetails, fetchBatchVideoCallUsers, fetchGetBatchCompletionEvent, fetchTokenByUser } from '@Redux'
import { ROUTES } from '@Routes'
import { convertToUpperCase } from '@Utils'
import moment from 'moment'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Card, CardBody, CardHeader, CardImg, Col, ListGroup, ListGroupItem, Row, } from 'reactstrap'


function ScheduledMeetingList() {
    const { goTo, goBack } = useNavigation()
    const dispatch = useDispatch()
    const [scheduledVideoCallData, setScheduledVideoCallData] = useState<any>("")
    const [scheduledData, setScheduledData] = useState<any>()
    const dynamicHeight: any = DynamicHeight()
    const { dashboardDetails, scheduleMeetingDetails, batchCompletionEvents, selectedBatchDetails, currentPage, numOfPages } = useSelector(
        (state: any) => state.DashboardReducer
    );
    const getScheduledList = useLoader(false)

    useEffect(() => {
        getScheduledVideoCallDetails()
        getBatchCompletionEvent(currentPage)
    }, [])


    console.log("scheduledData", selectedBatchDetails)

    const getBatchCompletionEvent = (pageNumber: any) => {
        const params = {
            course_batch_id: selectedBatchDetails?.id,
            page_number: pageNumber,
        }
        dispatch(fetchGetBatchCompletionEvent({
            params,
            onSuccess: (success: any) => () => {
                console.log("timeline success==>", success)
            },
            onError: (error: any) => () => {
                if (error?.status_code === 0) {
                    showToast('error', error.error_message)
                }
            },
        }))
    }

    const getScheduledVideoCallDetails = () => {
        getScheduledList.showLoader()
        const params = {
            batch_code: selectedBatchDetails?.batch_code
        }
        dispatch(fetchBatchVideoCallUsers({
            params,
            onSuccess: (success: any) => () => {
                getScheduledList.hideLoader()
                setScheduledVideoCallData(success?.details)
            },
            onError: (error: string) => () => {
                getScheduledList.hideLoader()
            },
        }))
    }



    const getTokenByUser = () => {
        const params = {
            user_name: dashboardDetails?.user_details?.name,
            email_id: dashboardDetails?.user_details?.email,
            end_video_call: false,
            id: selectedBatchDetails?.id
        }
        dispatch(fetchTokenByUser({
            params,
            onSuccess: (success: any) => () => {
                goTo('/dashboard' + ROUTES.ADMIN.VIDEO_CALL)
            },
            onError: (error: string) => () => {
            },
        }))
    }


    const settingCountDownTime = (stTime: any, endTime: any) => {
        console.log("", stTime)

        var endTime1 = new Date(endTime).getTime();

        var countDownDate = new Date(stTime).getTime();
        var now = new Date().getTime();
        var distance = countDownDate - now;
        var distance1 = endTime1 - now;
        let isActive = distance < 0 ? true : false

        console.log("starttimeisActive", isActive)


        if (distance1 > 0) {
            var days1 = Math.floor(distance1 / (1000 * 60 * 60 * 24));
            var hours1 = Math.floor((distance1 % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            var minutes1 = Math.floor((distance1 % (1000 * 60 * 60)) / (1000 * 60));
            var seconds1 = Math.floor((distance1 % (1000 * 60)) / 1000);
            return (days1 + "d " + hours1 + "h " + minutes1 + "m " + seconds1 + "s ");

        }
        else if (distance1 < 0) {
            return "Session has been Ended";
        }

        else {
            var days = Math.floor(distance / (1000 * 60 * 60 * 24));
            var hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
            var seconds = Math.floor((distance % (1000 * 60)) / 1000);

            return (days + "d " + hours + "h " + minutes + "m " + seconds + "s ")
        }
    };

    const CountDown = (time: any) => {
        console.log("================>", time)
        let { time: time1 } = time
        let { start_time, end_time } = time1
        console.log("start_time", start_time)
        const [countDownTime, setCountDownTime] = useState("");

        useEffect(() => {
            const intervalId = setInterval(() => {
                setCountDownTime(settingCountDownTime(start_time, end_time));
            }, 1000);

            return () => clearInterval(intervalId);
        }, [time]);

        return <div>{countDownTime || "Loading..."}</div>;
    };

    //pagination for batch timeline
    function paginationHandler(
        type: "next" | "prev" | "current",
        position?: number
    ) {
        let page =
            type === "next"
                ? currentPage + 1
                : type === "prev"
                    ? currentPage - 1
                    : position;
        getBatchCompletionEvent(page);
    }



    return (
        <div className=''>
            {/* <div className='text-right mb--2'>
                {!dashboardDetails?.is_faculty && <Button
                    className=''
                    text={"Create Session"}
                    onClick={() => {
                        goTo('/dashboard' + ROUTES.ADMIN.SCHEDULE_MEETING)
                    }}
                />}
            </div> */}
            <div className='row'>
                {<div className='col-sm-6'>
                    {getScheduledList.loader ?
                        <div className='d-flex justify-content-center align-items-center h-100vh'>
                            <Spinner />
                        </div>
                        :
                        <Card style={{ height: dynamicHeight.dynamicWidth <= 1400 ? dynamicHeight.dynamicHeight - 40 : dynamicHeight.dynamicHeight - 115 }}>
                            <div className='row my-4 mb-4 justify-content-between mx-3'>
                                <div>
                                    <h5 className="h3 mb-0">Session List</h5>
                                </div>
                                <div className='text-right mb--2'>
                                    {!dashboardDetails?.is_faculty &&
                                        <i className="bi bi-camera-video-fill pointer text-primary fa-lg mr-2" onClick={() => {
                                            getTokenByUser()
                                            // dispatch(editScheduleMeetingDetails(el))
                                        }}></i>}
                                    {!dashboardDetails?.is_faculty && <Button
                                        className=''
                                        text={"Create Session"}
                                        onClick={() => {
                                            goTo('/dashboard' + ROUTES.ADMIN.SCHEDULE_MEETING)
                                        }}
                                    />}
                                </div>
                            </div>

                            <CardBody className="p-0 overflow-auto scroll-hidden" style={{ height: '88vh' }}>
                                <ListGroup ListGroup data-toggle="checklist" flush>
                                    {getScheduledList.loader ?
                                        <div className='d-flex justify-content-center align-items-center h-100vh'>
                                            <Spinner />
                                        </div>
                                        :
                                        scheduledVideoCallData && scheduledVideoCallData?.length > 0 ? scheduledVideoCallData.map((el) => {
                                            var countDownDate = new Date(el.start_time).getTime();
                                            var endTime1 = new Date(el.end_time).getTime();
                                            var now = new Date().getTime();
                                            var distance = countDownDate - now;
                                            var distance1 = endTime1 - now;
                                            let isActive = distance < 0 ? true : false

                                            console.log("isActive", isActive)
                                            return (
                                                <div
                                                    onClick={(e) => {
                                                        setScheduledData(el)
                                                    }}
                                                >

                                                    <ListGroupItem className="checklist-entry flex-column align-items-start py-4 px-4">
                                                        <div className={`checklist-item ${el.is_completed ? "checklist-item-danger checklist-item-checked" : "checklist-item-success "} `}>
                                                            <div className="checklist-info">
                                                                <h5 className="checklist-title mb-0">Room Name: {el.room_name}</h5>
                                                                <small>
                                                                    <div className=''>
                                                                        {/* <CountDown
                                                                        time={el}
                                                                    /> */}
                                                                        <span className='h5'>Date: </span>
                                                                        <span> {moment(el.start_time).format('MMMM Do YYYY')}</span>
                                                                    </div>
                                                                </small>
                                                                <small>
                                                                    <div className=''>
                                                                        <span className='h5'>Start Time: </span>
                                                                        <span> {moment(el.start_time).format('h:mm a')}</span>
                                                                    </div>
                                                                    <div className=''>
                                                                        <span className='h5'>End Time: </span>
                                                                        <span> {moment(el.end_time).format(' h:mm a')}</span>
                                                                    </div>
                                                                </small>
                                                            </div>
                                                            {!el.is_completed ? (
                                                                <div>
                                                                    <div className="">
                                                                        <Button
                                                                            disabled={isActive}
                                                                            text={"Join"}
                                                                            onClick={() => {
                                                                                getTokenByUser()
                                                                                dispatch(editScheduleMeetingDetails(el))
                                                                            }}
                                                                        />

                                                                    </div>
                                                                    <div className="mt-2">
                                                                        <Button
                                                                            disabled={isActive}
                                                                            text={"Edit"}
                                                                            onClick={() => {
                                                                                dispatch(editScheduleMeetingDetails(el))
                                                                                goTo('/dashboard' + ROUTES.ADMIN.SCHEDULE_MEETING)
                                                                            }}
                                                                        />

                                                                    </div>
                                                                </div>) :
                                                                <h5 className='text-green'>{'Session Completed'}</h5>
                                                            }
                                                        </div>
                                                    </ListGroupItem>
                                                </div>
                                            )
                                        })

                                            :
                                            <>
                                                <div className=" d-flex justify-content-center align-items-center mt--3" style={{ height: '88vh' }}>
                                                    {/* errorTopicCard */}
                                                    <NoRecordsFound />
                                                </div>
                                            </>
                                    }
                                </ListGroup>

                            </CardBody>
                        </Card>}
                </div>}
                <div className='col-sm-6'>
                    <BatchTimeLine
                        heading={'Batch Timeline'}
                        data={batchCompletionEvents}
                        currentPage={currentPage}
                        numOfPages={numOfPages}
                        paginationNumberClick={(currentPage: number | undefined) => {
                            paginationHandler("current", currentPage);
                        }}
                        previousClick={() => paginationHandler("prev")}
                        nextClick={() => paginationHandler("next")}
                    />
                </div>
            </div>
        </div >

        //style={{ margin: '-53px 0px 0px 0px' }}
    )
}

export { ScheduledMeetingList }