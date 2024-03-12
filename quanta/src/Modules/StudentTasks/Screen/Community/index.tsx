import React, { useEffect, useState } from 'react'
import { Back, Card, Image, Button, Checkbox } from '@Components'
import { DynamicHeight, useNavigation } from '@Hooks'
import { ROUTES } from '@Routes'
import { SelectedLinkedInCommunityItem, fetchTaskDetails, postAddCourseTask, postStudentCourseTasksDetails, settingIsOpenTaskTypeModal } from '@Redux'
import { useDispatch, useSelector } from 'react-redux'
import { translate } from '@I18n';
import { showToast } from '@Utils'

function Community() {

    const dynamicHeight: any = DynamicHeight()
    const { goTo, goBack } = useNavigation()
    const dispatch = useDispatch();

    const { currentTaskItem, getStudentTaskDetails } = useSelector(
        (state: any) => state.DashboardReducer
    );

    const [submitLoader, setSubmitLoader] = useState(false)
    const [communityDataSet, setCommunityDataSet] = useState<any>([])

    useEffect(() => {
        if (getStudentTaskDetails[0].student_course_task_meta_id === null) {
            setCommunityDataSet(getStudentTaskDetails[0]?.task_meta?.details?.base_data.map((el: any) => ({ ...el, is_mark_as_join: false })))
        }
        else {
            setCommunityDataSet(getStudentTaskDetails[0]?.task_meta?.student_course_task?.base_data)

        }
    }, [])


    const validateJoiningCommunities = () => {
        const iscompletedJoiningAllCommunities = communityDataSet && communityDataSet.length > 0 && communityDataSet.every((joinedCommunity: any) => {
            return joinedCommunity.is_mark_as_join === true
        })
        if (iscompletedJoiningAllCommunities) {
            onSubmit(iscompletedJoiningAllCommunities)
        } else {
            showToast('error', "You haven't joined in all the communities")
        }
    }

    const onSubmit = (iscompletedJoiningAllCommunities: any) => {

        const params = {
            task_meta_id: getStudentTaskDetails[0]?.task_meta?.id,
            base_data: communityDataSet,
            is_completed: iscompletedJoiningAllCommunities,
            ...(getStudentTaskDetails[0]?.student_course_task_meta_id && { id: getStudentTaskDetails[0]?.student_course_task_meta_id })
        }

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

    const handleLinkedInCommunityClick = (url: string) => {
        const absoluteUrlPattern = /^(https?:\/\/)/i;

        if (!absoluteUrlPattern.test(url)) {
            // If the URL is relative, prepend it with http://
            url = `http://${url}`;
        }
        window.open(url, '_blank');
    };

    const getCommunityIcon = (code) => {

        let icon: any = {}

        switch (code) {
            case 'FACEBOOK':
                icon = { class: 'btn-icon-only rounded-circle btn btn-facebook', icon: 'fab fa-facebook' }
                break;

            case 'GOOGLE':
                icon = { class: 'btn-icon-only rounded-circle btn-google-plus', icon: 'fab fa-google-plus-g' }
                break;

            case 'LINKEDIN':
                icon = { class: 'btn-icon-only rounded-circle btn btn-facebook', icon: 'bi bi-linkedin' }
                break;

            case 'YOUTUBE':
                icon = { class: 'btn-icon-only rounded-circle btn btn-youtube', icon: 'fab fa-youtube' }
                break;

            case 'TELEGRAM':
                icon = { class: 'btn-icon-only rounded-circle  btn btn-twitter', icon: 'ni ni-send' }
                break;

            case 'INSTAGRAM':
                icon = { class: 'btn-icon-only rounded-circle btn btn-youtube', icon: 'fab fa-instagram' }
                break;

            case 'TWITTER':
                icon = { class: 'btn-icon-only rounded-circle btn btn-twitter', icon: 'fab fa-twitter' }
                break;

            case 'GLOBAL':
                icon = { class: 'btn-icon-only rounded-circle btn btn-global', icon: 'ni ni-world-2' }
                break;
        }
        return icon
    }

    console.log("communityDataSet===>", communityDataSet)

    return (
        <div className='container-fluid pt-2 '>
            <Back text={getStudentTaskDetails[0]?.task_meta?.details?.title || 'LinkedIn community'} />
            {/* <Card className='overflow-auto scroll-hidden mt-0 ' style={{ height: dynamicHeight.dynamicWidth <= 1400 ? dynamicHeight.dynamicHeight - 30 : dynamicHeight.dynamicHeight - 100 }}> */}

            <div className='overflow-auto scroll-hidden pt-3' style={{ height: dynamicHeight.dynamicWidth <= 1400 ? dynamicHeight.dynamicHeight - 125 : dynamicHeight.dynamicHeight - 150 }}>
                {communityDataSet && communityDataSet?.length > 0 && communityDataSet?.map((el, index) => {
                    return (
                        <div>
                            <Card className='pointer' onClick={() => { }}>

                                <div className='row'>
                                    <div className='ml-3 mb-2'>
                                        <Button
                                            style={{ fontSize: '25px', height: '50px', width: '50px' }}
                                            className={getCommunityIcon(el.code).class}
                                            size={'lg'}
                                            variant={'icon-rounded'}
                                            buttonIcon={getCommunityIcon(el.code).icon}
                                        />
                                    </div>

                                    <div className='col'>
                                        <div className='row'>
                                            <div className="col h3">
                                                &nbsp;&nbsp;{el?.title}
                                            </div>

                                        </div>

                                        <div className={'h4 fw-normal font-weight-light ml-2'}>
                                            {el?.description}
                                        </div>

                                        <div className={'h5 fw-normal font-weight-light ml-2'}>
                                            {el?.url}
                                        </div>
                                    </div>

                                </div>
                                <div className='text-right'>
                                    <Button
                                        text={el.is_mark_as_join ? 'Joined' : 'Join'}
                                        disabled={el.is_mark_as_join}
                                        onClick={() => {
                                            let updatedData = communityDataSet.map((element: any) => {
                                                if (el.id === element.id) {
                                                    return { ...element, is_mark_as_join: !element.is_mark_as_join };
                                                }
                                                return element;
                                            });
                                            setCommunityDataSet(updatedData);
                                        }}
                                    />
                                    <Button
                                        text={'Open'}
                                        onClick={() => {
                                            handleLinkedInCommunityClick(el?.url)
                                        }}
                                    />
                                </div>
                            </Card>
                        </div>
                    )
                })}
            </div>

            <div className='text-right my-3 mx-3'>
                <Button
                    isLoading={submitLoader}
                    size={'md'}
                    text={translate('common.submit')!}
                    onClick={() => {
                        validateJoiningCommunities()
                    }}
                />
            </div>
            {/* </Card> */}
        </div>
    )
}

export { Community }