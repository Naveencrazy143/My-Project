import React, { useEffect, useState } from 'react'
import { Back, Card, DropDown, Input, Image, Button, Modal } from '@Components'
import { DynamicHeight, useNavigation } from '@Hooks'
import { ROUTES } from '@Routes'
import { AddCommunity, AddLinkedInCommunity } from '@Modules'
import { SelectedCommunityItem, SelectedLinkedInCommunityItem, fetchTaskDetails, postAddCourseTask, settingIsOpenTaskTypeModal } from '@Redux'
import { useDispatch, useSelector } from 'react-redux'
import { translate } from '@I18n';
import { generateUUID, showToast } from '@Utils'

function CommunityGroupListing() {

    const dynamicHeight: any = DynamicHeight()
    const { goTo, goBack } = useNavigation()
    const dispatch = useDispatch();

    const { isOpenTaskTypeModal, communityItem, courseTopicName, courseTopicTasks, currentTaskItem } = useSelector(
        (state: any) => state.DashboardReducer
    );

    const [title, setTitle] = useState("")
    const [communityDataSet, setCommunityDataSet] = useState<any>([])
    const [editingCommunityIndex, setEditingCommunityIndex] = useState<number>()
    const [submitLoader, setSubmitLoader] = useState(false)
    const [isOpenDeleteModalOpen, setIsOpenDeleteModalOpen] = useState(false)
    const [communityData, setCommunityData] = useState<any>()


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
                setTitle(success?.details?.details?.title)
                setCommunityDataSet(success?.details?.details?.base_data)
            },
            onError: (error) => () => { }
        }))
    }

    const validatePostParams = () => {

        if (!title) {
            showToast("error", "Title field cannot be empty")
            return false
        }
        else if (communityDataSet.length === 0) {
            showToast("error", "Please add atleast one Community")
            return false
        }
        else {
            return true
        }
    }

    const onSubmit = () => {

        const params = {
            task_meta_type: 'COM',
            name: "Community",
            tag: "JS",
            title: title,
            is_manditory: true,
            order_sequence: courseTopicTasks?.length + 1,
            topic_id: courseTopicName.id,
            base_data: communityDataSet,
            ...(currentTaskItem && { id: currentTaskItem?.task_meta?.id })
        }

        console.log("params=========>", params);


        if (validatePostParams()) {
            setSubmitLoader(true)
            dispatch(postAddCourseTask({
                params,
                onSuccess: (success: any) => () => {
                    setSubmitLoader(false)
                    showToast('success', success.message)
                    goBack()
                },
                onError: (error: any) => () => {
                    setSubmitLoader(false)
                },
            }))
        }

    }

    const onDeleteCommunity = (item: any) => {

        const filteredCommunity = communityDataSet.filter((element) => element.id !== item.id)
        setCommunityDataSet(filteredCommunity)
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

    console.log("communityData", communityData?.title)

    return (
        <div className='container-fluid pt-2'>
            <Back text={'Communities'} />
            <Card className='overflow-auto scroll-hidden mt-0 ' style={{ height: dynamicHeight.dynamicWidth <= 1400 ? dynamicHeight.dynamicHeight - 30 : dynamicHeight.dynamicHeight - 100 }}>
                <div className='text-right'>
                    <Button
                        text={'Add'}
                        onClick={() => {
                            dispatch(SelectedCommunityItem(undefined))
                            dispatch(settingIsOpenTaskTypeModal(!isOpenTaskTypeModal))
                        }}
                    />
                </div>

                <div className='col-sm-4'>
                    <Input
                        heading={translate("common.title")!}
                        placeholder={translate("common.title")!}
                        value={title}
                        onChange={(e) => {
                            setTitle(e.target.value)
                        }}
                    />
                </div>

                <div className='col pt-3'>
                    {communityDataSet && communityDataSet?.length > 0 && communityDataSet?.map((el, index) => {

                        return (
                            <div className=''>
                                <Card className='pointer' onClick={() => { }}>

                                    {/* <div className='text-right'>
                                        <i className="bi bi-pencil text-info pointer "
                                            onClick={() => {
                                                setEditingCommunityIndex(index)
                                                dispatch(settingIsOpenTaskTypeModal(!isOpenTaskTypeModal))
                                                dispatch(SelectedCommunityItem(el))
                                            }}
                                        ></i>

                                        <i className="bi bi-trash3 text-info pointer mx-3"
                                            onClick={() => {
                                                setIsOpenDeleteModalOpen(true)
                                                setCommunityData(el)
                                            }}
                                        ></i>
                                    </div> */}

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

                                        <div className='text-right'>
                                        <i className="bi bi-pencil text-info pointer "
                                            onClick={() => {
                                                setEditingCommunityIndex(index)
                                                dispatch(settingIsOpenTaskTypeModal(!isOpenTaskTypeModal))
                                                dispatch(SelectedCommunityItem(el))
                                            }}
                                        ></i>

                                        <i className="bi bi-trash3 text-info pointer mx-3"
                                            onClick={() => {
                                                setIsOpenDeleteModalOpen(true)
                                                setCommunityData(el)
                                            }}
                                        ></i>
                                    </div>

                                    </div>
                                    <div className='text-right mt--4'>
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

                {communityDataSet.length > 0 && (
                    <div className='text-right pb-4 mr-3'>
                        <Button
                            isLoading={submitLoader}
                            size={'md'}
                            text={translate('common.submit')!}
                            onClick={() => {
                                onSubmit()
                            }}
                        />
                    </div>
                )}

                <Modal
                    isOpen={isOpenTaskTypeModal}
                    onClose={() => {
                        dispatch(settingIsOpenTaskTypeModal(!isOpenTaskTypeModal))
                    }}
                    size={'md'}
                    title={communityItem && Object.keys(communityItem)?.length > 0 ? 'Edit community' : 'Add community'}
                >
                    <div>
                        <AddCommunity
                            onAddCommunity={(item: any) => {
                                dispatch(settingIsOpenTaskTypeModal(!isOpenTaskTypeModal))

                                //this is for edit scenario 
                                if (communityItem && Object.keys(communityItem)?.length > 0) {
                                    communityDataSet.forEach((obj, i) => {
                                        if (i === editingCommunityIndex) {
                                            Object.keys(item).length > 0 && Object.keys(item).forEach((key) => {
                                                obj[key] = item[key];
                                            });
                                        }
                                    });
                                }
                                //this is for add scenario
                                else {
                                    const uuid = generateUUID()
                                    setCommunityDataSet([...communityDataSet, { id: uuid, ...item } as never])
                                }
                            }} />
                    </div>

                </Modal>


            </Card>
            <Modal isOpen={isOpenDeleteModalOpen} onClose={() => { setIsOpenDeleteModalOpen(false) }}
                title={`Do you want to delete ?`}
            >
                <div className='mt--4'>
                    <span >{communityData?.title}</span>
                </div>
                <div className='text-right mt-4'>
                    <Button
                        text={'Cancel'}
                        color='secondary'
                        onClick={() => {
                            setIsOpenDeleteModalOpen(false)
                        }}
                    />

                    <Button
                        text={'Delete'}
                        color='primary'
                        onClick={() => {
                            onDeleteCommunity(communityData)
                            setIsOpenDeleteModalOpen(false)
                        }}
                    />
                </div>
            </Modal>
        </div>
    )
}

export { CommunityGroupListing }