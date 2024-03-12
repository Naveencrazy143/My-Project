import React, { useEffect, useState } from 'react'
import { Back, Card, DropDown, Input, Image, Button, Modal } from '@Components'
import { DynamicHeight, useNavigation } from '@Hooks'
import { ROUTES } from '@Routes'
import { AddLinkedInCommunity } from '@Modules'
import { SelectedLinkedInCommunityItem, fetchTaskDetails, postAddCourseTask, settingIsOpenTaskTypeModal } from '@Redux'
import { useDispatch, useSelector } from 'react-redux'
import { translate } from '@I18n';
import { generateUUID, showToast } from '@Utils'

function LinkedInCommunityGroupListing() {

    const dynamicHeight: any = DynamicHeight()
    const { goTo, goBack } = useNavigation()
    const dispatch = useDispatch();

    const { isOpenTaskTypeModal, linkedInCommunityItem, courseTopicName, courseTopicTasks, currentTaskItem } = useSelector(
        (state: any) => state.DashboardReducer
    );

    const [title, setTitle] = useState("")
    const [communityDataSet, setCommunityDataSet] = useState<any>([])
    const [editingCommunityIndex, setEditingCommunityIndex] = useState<number>()
    const [submitLoader, setSubmitLoader] = useState(false)


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
            task_meta_type: 'LC',
            name: "Linkedin community",
            tag: "JS",
            title: title,
            is_manditory: true,
            order_sequence: courseTopicTasks?.length + 1,
            topic_id: courseTopicName.id,
            base_data: communityDataSet,
            ...(currentTaskItem && { id: currentTaskItem?.task_meta?.id })
        }

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
        console.log("item===>", item);
        console.log("communityDataSet", communityDataSet);

        const filteredCommunity = communityDataSet.filter((element) => element.id !== item.id)
        console.log("filteredCommunity===>", filteredCommunity);

        setCommunityDataSet(filteredCommunity)
    }

    const handleLinkedInCommunityClick = (url: string) => {
        window.open(url, '_blank');
    };

    return (
        <div className='container-fluid pt-2'>
            <Back text={'LinkedIn community'} />
            <Card className='overflow-auto scroll-hidden mt-0 ' style={{ height: dynamicHeight.dynamicWidth <= 1400 ? dynamicHeight.dynamicHeight - 30 : dynamicHeight.dynamicHeight - 100 }}>
                <div className='text-right'>
                    <Button
                        text={'Add'}
                        onClick={() => {
                            dispatch(SelectedLinkedInCommunityItem(undefined))
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

                                    <div className='text-right'>
                                        <i className="bi bi-pencil text-info pointer "
                                            onClick={() => {
                                                setEditingCommunityIndex(index)
                                                dispatch(settingIsOpenTaskTypeModal(!isOpenTaskTypeModal))
                                                dispatch(SelectedLinkedInCommunityItem(el))
                                            }}
                                        ></i>

                                        <i className="bi bi-trash3 text-info pointer mx-3"
                                            onClick={() => {
                                                onDeleteCommunity(el)
                                            }}
                                        ></i>
                                    </div>

                                    <div className='row'>

                                        <div className='ml-3 mb-2'>
                                            <Image
                                                variant={'avatar'}
                                                alt="..."
                                                src={el?.thumbnail}
                                            />
                                        </div>

                                        <div className='col'>
                                            <div className='row'>
                                                <div className="col h3">
                                                    &nbsp;&nbsp;{el?.group_title}
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
                    <div className='text-right my-3 mx-3'>
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
                    title={linkedInCommunityItem && Object.keys(linkedInCommunityItem)?.length > 0 ? 'Edit LinkedIn community' : 'Add LinkedIn community'}
                >
                    <div>
                        <AddLinkedInCommunity
                            onAddCommunity={(item: any) => {
                                dispatch(settingIsOpenTaskTypeModal(!isOpenTaskTypeModal))

                                //this is for edit scenario 
                                if (linkedInCommunityItem && Object.keys(linkedInCommunityItem)?.length > 0) {
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
        </div>
    )
}

export { LinkedInCommunityGroupListing }