
import { DynamicHeight, useNavigation } from '@Hooks';
import { useEffect, useRef, useState } from 'react';
import { JitsiMeeting, JaaSMeeting } from '@jitsi/react-sdk';
import { useDispatch, useSelector } from 'react-redux';
import { ROUTES } from '@Routes';
import jwt from 'jsonwebtoken';
import { fetchTokenByUser, getTaskDetails, postBatchVideoCallUsers, postStudentCourseTasksDetails } from '@Redux';






const VideoConference = () => {

    const dispatch = useDispatch()
    let dynamicHeight: any = DynamicHeight()



    const { dashboardDetails, userToken, scheduleMeetingDetails, getStudentTaskDetails } = useSelector(
        (state: any) => state.DashboardReducer
    );

    // console.log("getStudentTaskDetails", getStudentTaskDetails)

    const apiRef = useRef<any>();
    const [logItems, updateLog] = useState<any>([]);
    const [roomName, setRoomName] = useState<any>(scheduleMeetingDetails ? scheduleMeetingDetails.room_name.replace(/\s/g, '').replace(/-/g, '') :
        getStudentTaskDetails ? getStudentTaskDetails?.task_meta?.details?.title.replace(/\s/g, '').replace(/-/g, '') : 'EDAT MEETING'.replace(/\s/g, '').replace(/-/g, ''))
    const { goTo, goBack } = useNavigation()




    useEffect(() => {
        // if (scheduleMeetingDetails) {
        //     setRoomName(scheduleMeetingDetails.room_name)
        // }
        // if (getStudentTaskDetails) {
        //     setRoomName(getStudentTaskDetails?.task_meta?.details?.title)
        // }
    }, [])


    const printEventOutput = payload => {
        updateLog(items => [...items, JSON.stringify(payload)]);
    };

    const handleAudioStatusChange = (payload, feature) => {
        if (payload.muted) {
            updateLog(items => [...items, `${feature} off`])
        } else {
            updateLog(items => [...items, `${feature} on`])
        }
    };

    const handleChatUpdates = payload => {
        if (payload.isOpen || !payload.unreadCount) {
            return;
        }
        apiRef.current.executeCommand('toggleChat');
        updateLog(items => [...items, `you have ${payload.unreadCount} unread messages`])
    };

    const postIsCompletedTaskMeta = () => {

        const params = {
            id: getStudentTaskDetails?.student_course_task_meta_id,
            is_scheduled: false,
            is_completed: true
        }

        dispatch(postStudentCourseTasksDetails({ //addStudentCourseTaskMeta
            params,
            onSuccess: (success) => () => {
                dispatch(getTaskDetails(undefined))
                // showToast('success', 'Request for Mock interview send successfully')
            },
            onError: (error: any) => () => {
                // showToast('error', error?.error_message)
            }
        }))
    }

    const postBatchVideoCallUser = () => {
        const params = {
            id: scheduleMeetingDetails?.id,
            is_completed: true
        }
        dispatch(postBatchVideoCallUsers({
            params,
            onSuccess: (success: any) => () => {
                console.log("success============>", success)
            },
            onError: (error: string) => () => {
            },

        }))
    }

    const postEndVideoCallUser = () => {
        const params = {
            end_video_call: true
        }
        dispatch(fetchTokenByUser({
            params,
            onSuccess: (success: any) => () => {

            },
            onError: (error: string) => () => {
            },
        }))
    }


    const handleApiReady = apiObj => {
        console.log("0000000000000", apiObj)
        apiRef.current = apiObj;
        apiRef.current.on('audioMuteStatusChanged', payload => handleAudioStatusChange(payload, 'audio'));
        apiRef.current.on('videoMuteStatusChanged', payload => handleAudioStatusChange(payload, 'video'));
        apiRef.current.on('raiseHandUpdated', printEventOutput);
        apiRef.current.on('titleViewChanged', printEventOutput);
        apiRef.current.on('chatUpdated', handleChatUpdates);
    };

    const handleReadyToClose = () => {
        /* eslint-disable-next-line no-alert */
        if (scheduleMeetingDetails) {
            postBatchVideoCallUser()
        }
        else if(getStudentTaskDetails) {
            postIsCompletedTaskMeta()
        }
        postEndVideoCallUser()

        goBack(-1)
    };


    console.log("dashboardDetails", dashboardDetails)

    const renderSpinner = () => (
        <div className='d-flex justify-content-center align-items-center'
            style={{
                backgroundColor: '#141414',
                height: scheduleMeetingDetails ? "110.7vh" : '100vh'
            }}
        >
            <div className="spinner-border text-light" role="status">
                <span className="sr-only">Loading...</span>
            </div>
        </div>
    );


    return (

        <>
            {userToken ? <div className=' m-0 h-100vh ' >

                <JitsiMeeting
                    domain={"meetings.quantaedat.com"}
                    jwt={userToken}
                    roomName={`${roomName}`}
                    getIFrameRef={(iframeRef) => { iframeRef.style.height = scheduleMeetingDetails ? "110.7vh" : '100vh'; iframeRef.style.padding = "0px"; iframeRef.style.margin = "0px" }}
                    configOverwrite={{
                        ...(dashboardDetails?.user_details?.is_faculty === false && { toolbarButtons: ["microphone", 'camera', 'fullscreen', 'hangup', 'chat', 'raisehand', 'tileview'] }),
                        startWithAudioMuted: true,
                        disableModeratorIndicator: false,
                        startScreenSharing: false,
                        enableEmailInStats: false,
                        prejoinPageEnabled: false,
                        maxFullResolutionParticipants: -1,
                        brandingRoomAlias: null,

                        constraints: {
                            video: {
                                height: {
                                    ideal: 720,
                                    max: 720,
                                    // min: 240
                                }
                            }
                        },

                        resolution: 1080,
                    }}

                    interfaceConfigOverwrite={{
                        DISABLE_JOIN_LEAVE_NOTIFICATIONS: true,
                        // TOOLBAR_BUTTONS: [
                        //     "microphone", 'camera', 'closedcaptions', 'desktop', 'fullscreen',
                        //     'fodeviceselection', 'hangup', 'profile', 'info', 'chat', 'recording',
                        //     'livestreaming', 'etherpad', 'sharedvideo', 'settings', 'raisehand',
                        //     'videoquality', 'filmstrip', 'invite', 'feedback', 'stats', 'shortcuts',
                        //     'tileview', 'videobackgroundblur', 'download', 'help', 'mute-everyone',
                        //     'e2ee'
                        //     ],


                    }}
                    spinner={renderSpinner}
                    onApiReady={externalApi => handleApiReady(externalApi)}
                    onReadyToClose={handleReadyToClose}
                />

            </div>
                :
                <>
                    <div className=' d-flex justify-content-center align-items-center' style={{
                        backgroundColor: '#141414',
                        height: scheduleMeetingDetails ? "110.7vh" : '100vh'
                    }}>
                        <div
                            className="spinner-border text-light fa-lg" role="status">
                            <span className="sr-only">Loading...</span>
                        </div>
                    </div>
                </>
            }
        </>
    );
};

export { VideoConference };