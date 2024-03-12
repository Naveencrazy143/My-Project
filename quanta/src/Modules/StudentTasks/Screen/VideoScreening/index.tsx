import { Back, Button, Card, Image } from '@Components'
import { DynamicHeight, useNavigation } from '@Hooks'
import { translate } from '@I18n'
import { VideoPlayerYoutube } from '@Modules'
import { postStudentCourseTasksDetails } from '@Redux'
import { showToast } from '@Utils'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

function VideoScreening() {
    const dynamicHeight: any = DynamicHeight()
    const { goTo, goBack } = useNavigation()
    const dispatch = useDispatch();

    const { dashboardDetails, getStudentTaskDetails } = useSelector(
        (state: any) => state.DashboardReducer
    );

    console.log("getStudentTaskDetails", getStudentTaskDetails);


    const { youtubeVideoTitle } = useSelector(
        (state: any) => state.StudentReducer
    );


    const [videoScreeningData, setVideoScreeningData] = useState<any>([{

        id: 1, videoUrl: '6LD30ChPsSs', comments: [
            {
                id: 1, time: '00:05:027', comment: [
                    { id: 1, comment: "hii", name: 'Dhivya', photo: 'https://a1png.com/wp-content/uploads/2021/01/ms-dhoni-6.png' },
                    { id: 2, comment: "How r u", name: 'Dhivya', photo: 'https://a1png.com/wp-content/uploads/2021/01/ms-dhoni-6.png' },

                ]
            },
            {
                id: 2, time: '00:10:027', comment: [
                    { id: 1, comment: "hii 1111", name: 'Muthu', photo: 'https://a1png.com/wp-content/uploads/2021/01/ms-dhoni-6.png' },
                    { id: 2, comment: "How r u 1111", name: 'Muthu', photo: 'https://a1png.com/wp-content/uploads/2021/01/ms-dhoni-6.png' }
                ]
            },
            {
                id: 3, time: '00:15:027', comment: [
                    { id: 1, comment: "hii 2222", name: 'Tamil', photo: 'https://a1png.com/wp-content/uploads/2021/01/ms-dhoni-6.png' },
                    { id: 3, comment: "How r u 2222", name: 'Tamil', photo: 'https://a1png.com/wp-content/uploads/2021/01/ms-dhoni-6.png' }
                ]
            }
        ]
    }])

    const [videoScreeningData2, setVideoScreeningData2] = useState<any>([

        { id: 1, comment: "hii", name: 'Dhivya', photo: 'https://a1png.com/wp-content/uploads/2021/01/ms-dhoni-6.png', time: '00:05:027' },
        { id: 2, comment: "How r u", name: 'Dhivya', photo: 'https://a1png.com/wp-content/uploads/2021/01/ms-dhoni-6.png', time: '00:05:027' },
        { id: 3, comment: "hii", name: 'Dhivya', photo: 'https://a1png.com/wp-content/uploads/2021/01/ms-dhoni-6.png', time: '00:06:027' },
        { id: 4, comment: "How r u", name: 'Dhivya', photo: 'https://a1png.com/wp-content/uploads/2021/01/ms-dhoni-6.png', time: '00:06:027' },
        { id: 5, comment: "hii", name: 'Dhivya', photo: 'https://a1png.com/wp-content/uploads/2021/01/ms-dhoni-6.png', time: '00:10:027' },
        { id: 6, comment: "How r u", name: 'Dhivya', photo: 'https://a1png.com/wp-content/uploads/2021/01/ms-dhoni-6.png', time: '00:11:027' },
        { id: 7, comment: "hii", name: 'Dhivya', photo: 'https://a1png.com/wp-content/uploads/2021/01/ms-dhoni-6.png', time: '00:11:027' },
        { id: 8, comment: "How r u", name: 'Dhivya', photo: 'https://a1png.com/wp-content/uploads/2021/01/ms-dhoni-6.png', time: '00:13:027' }

    ])

    const [currentComment, setCurrentComment] = useState<any>([])
    const [lastComment, setLastComment] = useState<any>([]);
    const [currentDuration, setCurrentDuration] = useState('')
    const [submitLoader, setSubmitLoader] = useState(false)
    const [interval, setinterval] = useState<any>("")
    const [minute, setminute] = useState(0)
    const [seconds, setseconds] = useState(0)
    const [isRun, setIsRun] = useState(false)

    useEffect(() => {
        if (isRun) {
            stopWatchRunner()
        }
        else {
            clearInterval(interval)
        }

    }, [isRun])

    function stopWatchRunner() {
        setinterval(setInterval(stopWatchStopper, 1000))
        let secondsIncrement = seconds
        let minutesIncrement = minute

        function stopWatchStopper() {

            secondsIncrement = secondsIncrement + 1
            setseconds(secondsIncrement)

            if (secondsIncrement === 60) {
                minutesIncrement = minutesIncrement + 1
                setminute(minutesIncrement)
                secondsIncrement = 0
                setseconds(secondsIncrement)
            }
        }
    }


    const calculateHalfOfTheScreenHeight = () => {

        const screenHeight = dynamicHeight.dynamicHeight
        let halfOfTheScreenHeight: any = 70 / 100 * screenHeight

        return halfOfTheScreenHeight
    }

    const calculateTheScreenWidth = () => {

        const screenWidth = dynamicHeight.dynamicWidth
        let halfOfTheScreenWidth: any = 60 / 100 * screenWidth

        return halfOfTheScreenWidth
    }

    const opts = {
        height: calculateHalfOfTheScreenHeight(),
        width: dynamicHeight.dynamicWidth <= 992 ? dynamicHeight.dynamicWidth - 80 : calculateTheScreenWidth(),
        playerVars: {
            autoplay: 0,
            modestbranding: 1,
            controls: 1,
            showinfo: 0,
            showRelatedVideos: false,
            rel: 0
        }
    };


    const onSubmit = () => {

        let formattedMinutes = minute < 10 ? "0" + minute : minute;
        let formattedSeconds = seconds < 10 ? "0" + seconds : seconds;
        let formattedTime = `${formattedMinutes}:${formattedSeconds}`;


        let slicedSpentDuration = +formattedTime?.slice(0, 2)
        let minimumSpentMinutes = +getStudentTaskDetails[0]?.task_meta?.details?.minimum_watch_mins

        const params = {
            task_meta_id: getStudentTaskDetails[0]?.task_meta?.id,
            watch_hours: formattedTime,
            is_completed: true,
            ...(getStudentTaskDetails[0]?.student_course_task_meta_id && { id: getStudentTaskDetails[0]?.student_course_task_meta_id })
        }

        // getStudentTaskDetails[0]?.task_meta?.is_completed
        if (!getStudentTaskDetails[0]?.task_meta?.is_completed) {
            if (slicedSpentDuration >= minimumSpentMinutes) {
                addStudentCourseTaskDetails(params)
            }
            else {
                showToast('error', "You haven't completed the minimum spent minutes!")
            }
        }
        else {
            addStudentCourseTaskDetails(params)
        }

    }


    const addStudentCourseTaskDetails = (params: any) => {
        setSubmitLoader(true)
        dispatch(postStudentCourseTasksDetails({
            params,
            onSuccess: (success) => () => {
                setSubmitLoader(false)
                showToast('success', success?.message)
                goBack()
            },
            onError: (error: any) => () => {
                setSubmitLoader(false)
                showToast('error', error?.error_message)
            }
        }))
    }


    const getCurrentComment = (current: any) => {
        if (current.slice(0, 5) === '00:00') {
            setCurrentComment([])
            setLastComment([])
        }
        const data = videoScreeningData[0].comments.length > 0 && videoScreeningData[0].comments.map((el) => {
            return el
        })

        const filteredDurationComment = data.filter((it) => {
            if (it.time.slice(0, 5) === current.slice(0, 5)) {
                return it
            }
        })

        if (filteredDurationComment.length > 0) {
            setCurrentComment(filteredDurationComment)
            setLastComment(filteredDurationComment)
        } else {
            // If there are no comments available for the current timestamp, display the last comment that was displayed
            setCurrentComment(lastComment)
        }
    }


    // const getComments = (current: string) => {

    //     const filteredDurationComment = videoScreeningData2.filter((it) => {
    //         if (it.time.slice(0, 5) === current.slice(0, 5)) {
    //             return it
    //         }
    //     })
    //     lastComment.push(...filteredDurationComment)
    //     setCurrentComment(lastComment)
    // }



    return (
        <div className={`container-fluid pt-2 pb-xl-0 pb-1`}>
            <Back text={`Video screening  ${youtubeVideoTitle && `(${youtubeVideoTitle})`}`} />
            <Card className='overflow-auto scroll-hidden' style={{ height: dynamicHeight.dynamicWidth <= 1400 ? dynamicHeight.dynamicHeight + 20 : dynamicHeight.dynamicHeight - 95 }}>
                <div className='row'>
                    <div className='col-sm-8'>
                        <VideoPlayerYoutube
                            videoId={getStudentTaskDetails[0]?.task_meta?.details?.url}
                            videoStyle={opts}
                            videoListener={(current, isPaused) => {

                                if (isPaused) {
                                    setIsRun(true)
                                } else {
                                    setIsRun(false)
                                }
                                setCurrentDuration(current.slice(0, 5))
                                getCurrentComment(current)
                            }}
                        />
                    </div>
                    {/* <div className='col-sm-3'>
                        {getStudentTaskDetails[0]?.task_meta?.details?.url && (
                            <h3 className='ml-2 mt-2'>{`Comments`}</h3>
                        )}

                        {currentComment && currentComment[0]?.comment?.length > 0 ? currentComment[0]?.comment?.map((it) => {

                            return (
                                <div>
                                    <div className='d-flex py-3 px-2'>
                                        <div className='ml-0'>
                                            <Image
                                                variant={'rounded'}
                                                alt="..."
                                                src={it.photo}
                                            />
                                        </div>
                                        <div className='ml-2'>
                                            <h4 className='row ml-1'>{it?.name}<h5 className='ml-2 mt-1 text-light'> {lastComment[0].time.slice(0, 5)}</h5></h4>
                                            <h4 className='mt--2 ml-1'>{it?.comment}</h4>
                                        </div>
                                    </div>
                                </div>
                            )
                        }) :
                            lastComment[0]?.comment?.length > 0 && lastComment[0]?.comment?.map((it) => {
                                return (
                                    <div>
                                        <div className='d-flex py-3 px-2'>
                                            <div className='ml-0'>
                                                <Image
                                                    variant={'rounded'}
                                                    alt="..."
                                                    src={it.photo}
                                                />
                                            </div>
                                            <div className='ml-2'>
                                                <h4 className='row ml-1'>{it?.name}<h5 className='ml-2 mt-1 text-light'> {lastComment[0].time.slice(0, 5)}</h5></h4>
                                                <h4 className='mt--2 ml-1' style={{ width: dynamicHeight.dynamicWidth <= 992 ? dynamicHeight.dynamicWidth - 100 : calculateTheScreenWidth() }}>{it?.comment}</h4>
                                            </div>
                                        </div>
                                    </div>
                                )
                            })

                        }


                        {getStudentTaskDetails[0]?.task_meta?.details?.url && (

                            <div className='d-flex py-3'>
                                <div className='ml-1'>
                                    <Image
                                        variant={'rounded'}
                                        alt="..."
                                        src={dashboardDetails?.user_details?.photo}
                                    />
                                </div>
                                <div className='col'>
                                    <input type="text"
                                        className="form-control form-control-md"
                                        id="exampleFormControlInput1"
                                        placeholder={'Add a comment'}
                                        autoComplete="off"

                                    />
                                </div>
                                <div>
                                    <span className=""  ><i style={{ fontSize: '25px' }} className={`fas fa-paper-plane text-info mt--1 py-3`}></i></span>
                                </div>
                            </div>
                        )}

                    </div> */}
                </div>


                <div className='text-right'>
                    <Button
                        isLoading={submitLoader}
                        text={translate('common.submit')!}
                        size={'md'}
                        onClick={() => {
                            onSubmit()
                        }}
                    />
                </div>
            </Card>
        </div>
    )
}

export { VideoScreening }