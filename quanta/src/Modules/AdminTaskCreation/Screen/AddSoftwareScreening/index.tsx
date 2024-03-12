import { Button, Input, InputHeading, Image, Card, Back, DropDown, Checkbox } from '@Components'
import { HeadingProps } from './interface'
import { useSelector } from 'react-redux';
import { translate } from '@I18n';
import { useDispatch } from 'react-redux';
import { DynamicHeight, useNavigation } from '@Hooks';
import { useEffect, useState } from 'react';
import { fetchTaskDetails, isBackNavigation, postAddCourseTask, settingCurrentTaskItem } from '@Redux';
import { showToast } from '@Utils';

const TIME_DURATION = [
    { id: '15 min', name: '15 min' },
    { id: '30 min', name: '30 min' },
    { id: '45 min', name: '45 min' },
    { id: '1 hr', name: '1 hr' },
]

const SCREENING_TYPE = [
    { id: 1, name: 'Manual', value: 'Manual' },
    { id: 2, name: 'AI', value: 'AI' }

]

const AddSoftwareScreening = ({ }: HeadingProps) => {

    const { courseTopicTasks, courseTopicName, currentTaskItem } = useSelector((state: any) => state.DashboardReducer);
    const dispatch = useDispatch()
    const dynamicHeight: any = DynamicHeight()
    const { goTo, goBack } = useNavigation()

    const [submitLoader, setSubmitLoader] = useState(false)
    const [checked, setChecked] = useState(false);
    const [title, setTitle] = useState("")
    const [description, setDescription] = useState("")
    const [timeDuration, setTimeDuration] = useState("")
    const [screeningType, setScreeningType] = useState('')

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
                console.log("success.details==>", success.details);

                prefillDetails(success.details)
            },
            onError: (error) => () => { }
        }))
    }

    const prefillDetails = (item: any) => {
        setTitle(item?.details?.title)
        setTimeDuration(item?.details?.duration)
        setChecked(item?.is_manditory)
        setDescription(item?.description)
        setScreeningType(item?.task_meta_type == 'SCR' ? '1' : '2')
    }

    const validatePostParams = () => {
        if (!title) {
            showToast("error", "Title field cannot be empty")
            return
        } else if (!timeDuration) {
            showToast("error", "Time duration field cannot be empty")
            return
        } else if (!description) {
            showToast("error", "Description field cannot be empty")
            return
        }
        else {
            onSubmit()
        }
    }

    const onSubmit = () => {

        setSubmitLoader(true)

        const params = {
            // task_meta_type: screeningType == '1' ? 'SCR' : 'AI',
            task_meta_type: 'SCR',
            name: "manual screening",
            description: description,
            tag: "JS",
            is_manditory: true,
            topic_id: courseTopicName.id,
            order_sequence: courseTopicTasks?.length + 1,
            title: title,
            duration: timeDuration,
            ...(currentTaskItem && { id: currentTaskItem.task_meta.id }),
        }


        dispatch(postAddCourseTask({
            params,
            onSuccess: (success: any) => () => {
                console.log("success====>",success);
                
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

    return (
        <>
            <div className='container-fluid pt-2'>
                <div className='pb-2' >
                    <Back text={`${currentTaskItem ? 'Edit' : 'Add'} Software Screening`} onClick={() => {
                        dispatch(settingCurrentTaskItem(undefined))
                    }} />
                </div>
                <Card className='overflow-auto scroll-hidden mt-0 ' style={{ height: dynamicHeight.dynamicWidth <= 1400 ? dynamicHeight.dynamicHeight - 30 : dynamicHeight.dynamicHeight - 110 }}>
                    {/* <div className='row pb-3'>
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
                    </div> */}
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

                    <div className="form-group">
                        <InputHeading heading={translate("course.description")!} id={"Description"} />
                        <textarea
                            className="form-control"
                            id={"Description"}
                            placeholder={translate("page.writeDescription")!}
                            onChange={(e) => { setDescription(e.target.value) }}
                            value={description}
                        />
                    </div>

                    <div className="form-group">
                        <DropDown
                            heading={'Type'}
                            placeholder={'Type'}
                            id={'Type'}
                            data={SCREENING_TYPE}
                            onChange={(e) => { setScreeningType(e.target.value) }}
                            value={screeningType}
                        />
                    </div>

                    <div>
                        <DropDown
                            heading={'Time Duration'}
                            placeholder={'Time Duration'}
                            id={"Time Duration"}
                            data={TIME_DURATION}
                            onChange={(e) => { setTimeDuration(e.target.value) }}
                            value={timeDuration}
                        />
                    </div>

                    <div className='text-right pt-4'>
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

export { AddSoftwareScreening }
