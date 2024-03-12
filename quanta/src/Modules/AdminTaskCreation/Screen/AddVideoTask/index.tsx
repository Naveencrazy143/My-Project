import { Button, Input, InputHeading, Image, Card, Back, DropDown, Checkbox } from '@Components'
import { HeadingProps } from './interface'
import { useSelector } from 'react-redux';
import { translate } from '@I18n';
import { useDispatch } from 'react-redux';
import { DynamicHeight, useNavigation } from '@Hooks';
import { useEffect, useState } from 'react';
import { fetchTaskDetails, isBackNavigation, postAddCourseTask, settingCurrentTaskItem } from '@Redux';
import { showToast } from '@Utils';
import YouTube, { YouTubePlayer } from 'react-youtube';

const TOOL_SEVERITY_SELECT = [
    { id: '1', name: '1' },
    { id: '2', name: '2' },
    { id: '3', name: '3' },
    { id: '4', name: '4' },
    { id: '5', name: '5' },
]

const COGNITIVE_SEVERITY_SELECT = [
    { id: '1', name: '1' },
    { id: '2', name: '2' },
    { id: '3', name: '3' },
    { id: '4', name: '4' },
    { id: '5', name: '5' },
]


const AddVideoTask = ({ }: HeadingProps) => {
    const { courseTopicTasks, courseTopicName, currentTaskItem } = useSelector((state: any) => state.DashboardReducer);
    const dispatch = useDispatch()
    const dynamicHeight: any = DynamicHeight()
    const { goTo, goBack } = useNavigation()

    const [submitLoader, setSubmitLoader] = useState(false)
    const [checked, setChecked] = useState(false);
    const [title, setTitle] = useState("")
    const [baseData, setBaseData] = useState("")
    const [description, setDescription] = useState("")
    const [minimumWatchMinutes, setMinimumWatchMinutes] = useState("")
    const [duration, setDuration] = useState('');


    useEffect(() => {
        if (currentTaskItem) {
            getMetaTaskDetails()
        }
    }, [])

    const getMetaTaskDetails = () => {
        const params = {
            task_meta_id: currentTaskItem?.task_meta?.id
        }
        dispatch(fetchTaskDetails({
            params,
            onSuccess: (success: any) => () => {
                console.log("success.details===>", success.details);

                prefillDetails(success.details)
            },
            onError: (error) => () => { }
        }))
    }

    const prefillDetails = (item: any) => {

        setTitle(item?.details?.title)
        setDescription(item?.description)
        setBaseData(item?.details?.url)
        setChecked(item?.is_manditory)
        setMinimumWatchMinutes(item?.details?.minimum_watch_mins)
    }

    const validatePostParams = () => {
        if (!title) {
            showToast("error", "Title field cannot be empty")
            return
        } else if (!minimumWatchMinutes) {
            showToast("error", "Minimum watch minutes field cannot be empty")
            return
        } else if (!baseData) {
            showToast("error", "url field cannot be empty")
            return
        } else {
            onSubmit()
        }
    }

    const onSubmit = () => {

        setSubmitLoader(true)
        const params = {
            task_meta_type: "VDO",
            name: title,
            description: description,
            minimum_watch_mins: minimumWatchMinutes,
            tag: "JS",
            title: title,
            url: baseData,
            total_video_duration: duration,
            is_manditory: checked,
            order_sequence: courseTopicTasks?.length + 1,
            topic_id: courseTopicName.id,
            ...(currentTaskItem && { id: currentTaskItem.task_meta.id }),
        }

        dispatch(postAddCourseTask({
            params,
            onSuccess: (success: any) => () => {
                setSubmitLoader(false)
                showToast('success', success.message)
                goBack()
                // courseLoader.hideLoader()

            },
            onError: (error: any) => () => {
                setSubmitLoader(false)
                // courseLoader.hideLoader()
            },
        }))
    }
    let videoElement: YouTubePlayer = null;

    const opts = {
        height: "0",
        width: "0",
        playerVars: {
            autoplay: 0
        }
    };

    const onReady = (event: YouTubePlayer) => {
        videoElement = event;
        const durationInSeconds = videoElement.target.getDuration();
        const minutes = Math.floor(durationInSeconds / 60);
        const seconds = Math.floor(durationInSeconds % 60);
        const formattedDuration = `${minutes}:${seconds.toString().padStart(2, "0")}`;
        setDuration(formattedDuration)
    };

    return (
        <>
            <div className='container-fluid pt-2 '>
                {baseData && (
                    <YouTube videoId={baseData} opts={opts} onReady={onReady} />
                )}
                <div className='pb-2' >
                    <Back text={`${currentTaskItem ? 'Edit' : 'Add'} Video`} onClick={() => {
                        // dispatch(isBackNavigation(true))
                        dispatch(settingCurrentTaskItem(undefined))
                    }} />
                </div>
                <Card className='overflow-auto scroll-hidden mt-0' style={{ height: dynamicHeight.dynamicWidth <= 1400 ? dynamicHeight.dynamicHeight - 30 : dynamicHeight.dynamicHeight - 110 }}>
                    <div className='row pb-3'>
                        <div className='col-sm-12 text-right' >
                            <Checkbox
                                id='1'
                                text={translate("admin.isMandatory")!}
                                variant={'info'}
                                checked={checked}
                                defaultChecked={false}
                                onCheckChange={() => {
                                    setChecked(!checked)
                                }}
                            />
                        </div>
                    </div>
                    <div>
                        <Input
                            id={"Title"}
                            heading={translate("common.title")!}
                            placeholder={translate("common.title")!}
                            onChange={(e) => {
                                setTitle(e.target.value)
                            }}
                            value={title}
                        />
                    </div>

                    <div>
                        <Input
                            id={"Description"}
                            heading={translate("course.description")!}
                            placeholder={translate("course.description")!}
                            onChange={(e) => {
                                setDescription(e.target.value)
                            }}
                            value={description}
                        />
                    </div>

                    <div>
                        <Input
                            heading={'Minimum watch minutes'}
                            placeholder={'Minimum watch minutes'}
                            onChange={(e) => {
                                setMinimumWatchMinutes(e.target.value)
                            }}
                            value={minimumWatchMinutes}
                        />
                    </div>

                    <div>
                        <Input
                            heading={'Url'}
                            placeholder={'Url'}
                            onChange={(e) => {
                                setBaseData(e.target.value)
                            }}
                            value={baseData}
                            id={"Url"}
                        />
                    </div>
                    <div className='text-right pt-2 pb-3'>
                        <Button
                            isLoading={submitLoader}
                            text={translate("common.submit")!}
                            size={'md'}
                            onClick={() => validatePostParams()}
                        />
                    </div>
                </Card>
            </div>
        </>
    )

}

export { AddVideoTask }
