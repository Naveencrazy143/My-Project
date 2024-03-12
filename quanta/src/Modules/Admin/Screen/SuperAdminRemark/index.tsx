import { icons } from '@Assets';
import { Back, Button, Card, Checkbox, DropDown, Image, InputWithImage, Modal, NoRecordsFound, useKeyPress } from '@Components';
import { useNavigation } from '@Hooks';
import { translate } from '@I18n';
import { fetchStudentsList, fetchUsersRemark, isBackNavigation, postGenericCrudDetails, postSubmitUserRemarksApproval, remarkUserId } from '@Redux';
import { ROUTES } from '@Routes';
import { getDisplayDateWithTimeFromMoment, showToast } from '@Utils';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

const COMMENT_TYPE = [
    { id: '-1', title: 'All' },
    { id: '2', name: 'Positive' },
    { id: '3', name: 'Negative' }
]

const STATUS = [
    { id: '-1', title: 'All' },
    { id: '2', title: 'Pending' },
    { id: '3', title: 'Approved' },
    { id: '4', title: 'Rejected' },
];

function SuperAdminRemark() {
    const dispatch = useDispatch();
    const { editUserDetails, usersRemarksData, dashboardDetails, isBack } = useSelector(
        (state: any) => state.DashboardReducer
    );
    const { goTo } = useNavigation()
    const [isHighPriority, setIsHighPriority] = useState(false)
    const [remarkType, setRemarkType] = useState('')
    const [status, setStatus] = useState('')
    const [searchRemark, setSearchRemark] = useState('')
    const [isApproveModal, setIsApproveModal] = useState(false)
    const [statusText, setStatusText] = useState('')
    const [selectedRemark, setSelectedRemark] = useState<any>('')
    const enterPress = useKeyPress('Enter')
    const [remarktypeId, setRemarkTypeId] = useState('-1')
    const [statusId, setstatusId] = useState('-1')
    const [submitLoader, setSubmitLoader] = useState(false)
    const [isSearchName, setIsSearchName] = useState(false)

    console.log("isBack==>", isBack)
    useEffect(() => {
        if (!isBack) {
            getUsersRemark()
        }
        else {
            dispatch(isBackNavigation(false))
        }
    }, [isHighPriority, remarkType, status]);

    useEffect(() => {
        if (enterPress && isSearchName) {
            getUsersRemark()
        }
    }, [enterPress])

    useEffect(() => {
        if (!isBack) {
            getStudentsList()
        }
        else {
            dispatch(isBackNavigation(false))
        }
    }, [])

    // to list courses of students

    const getStudentsList = () => {
        const params = {}
        dispatch(fetchStudentsList({
            params,
            onSuccess: (success: any) => () => {

            },
            onError: (error: any) => () => {
            },
        }))

    }
    const getUsersRemark = () => {
        const params = {
            ...(searchRemark && { q: searchRemark }),
            ...(isHighPriority && { is_high_priority: isHighPriority }),
            ...(remarkType && remarkType !== '-1' && {
                is_positive: remarkType === '2' && true,
                is_negative: remarkType === '3' && true,
            }),
            ...(status && status !== '-1' && {
                is_agreed: status === '3' && true,
                is_deferred: status === '4' && true,
            })
        };
        dispatch(fetchUsersRemark({
            params,
            onSuccess: (success: any) => () => {
            },
            onError: (error: any) => () => {
            },
        }))
    }

    const onApprove = () => {
        setSubmitLoader(true)
        const params = {
            id: selectedRemark?.id,
            is_agreed: true,
            is_deferred: false,
        }
        dispatch(postSubmitUserRemarksApproval({
            params,
            onSuccess: (success: any) => () => {
                setSubmitLoader(false)
                showToast('success', success.message)
                setIsApproveModal(false)
                getUsersRemark()
            },
            onError: (error) => () => {
                setSubmitLoader(false)
                if (error?.status_code === 0) {
                    showToast('error', error?.error_message)
                }
            },
        }))
    }
    const onReject = () => {
        setSubmitLoader(true)
        const params = {
            id: selectedRemark?.id,
            is_agreed: false,
            is_deferred: true,
        }
        dispatch(postSubmitUserRemarksApproval({
            params,
            onSuccess: (success: any) => () => {
                setSubmitLoader(false)
                showToast('success', success.message)
                setIsApproveModal(false)
                getUsersRemark()
            },
            onError: (error: any) => () => {
                setSubmitLoader(false)
                if (error.status_code === 0) {
                    showToast('error', error?.error_message)
                }
            },
        }))
    }

    return (
        <div className='container-fluid py-2  h-100v'>
            <div className='pb-2'>
                <Back text={translate("remarks.studentsRemarks")!} />
            </div>
            <Card className=' '>
                <div className='row'>
                    <div className='col-sm-4 mt-4 pt-2'>
                        <InputWithImage
                            image="search"
                            placeholder={translate("auth.search")!}
                            onChange={(e) => {
                                setSearchRemark(e.target.value)
                            }}
                            onClick={() => {
                                getUsersRemark()
                            }}
                            onFocus={() => {
                                setIsSearchName(true)
                            }}
                            onBlur={() => {
                                setIsSearchName(false)
                            }}
                        />
                    </div>
                    <div className='col-sm-3 pt-sm-0'>
                        <DropDown
                            heading={translate("admin.remarkType")!}
                            data={COMMENT_TYPE}
                            value={remarktypeId}
                            placeholder={translate("admin.remarkType")!}
                            onChange={(e) => {
                                setRemarkTypeId(e.target.value)
                                setRemarkType(e.target.value)
                            }}
                        />
                    </div>
                    <div className='col-sm-3 pt-sm-0 pt-4'>
                        <DropDown
                            heading={translate("common.status")!}
                            data={STATUS}
                            value={statusId}
                            placeholder={translate("admin.selectStatus")!}
                            onChange={(e) => {
                                setstatusId(e.target.value)
                                setStatus(e.target.value)
                            }}
                        />
                    </div>
                    <div className='col-sm-2 pt-xl-4 pt-4'>
                        <Checkbox
                            id='1'
                            text={translate("admin.highPriority")!}
                            variant={'info'}
                            checked={isHighPriority}
                            defaultChecked={false}
                            onCheckChange={() => {
                                setIsHighPriority(!isHighPriority)
                            }}
                        />
                    </div>
                </div>
            </Card>

            {usersRemarksData && usersRemarksData?.length > 0 ? usersRemarksData?.map((el: any) => {
                return (
                    <Card onClick={(e) => {
                        e.preventDefault()
                        e.stopPropagation()
                        dispatch(remarkUserId(el))
                        goTo('/dashboard' + ROUTES.ADMIN.USER_REMARK_DETAILS)
                        dispatch(isBackNavigation(false))
                    }}>
                        <div className={"d-flex justify-content-between"} >
                            <div className='row'>
                                <div className="h2">
                                    <Image src={el?.is_high_priority && el?.is_negative ? icons?.badgeRed : el?.is_high_priority && el?.is_positive && icons?.badgeGreen} height={'30px'} />
                                </div>
                                {el?.is_high_priority ? <div className="h2">
                                    {el.title}
                                </div>
                                    :
                                    <div className="h2">
                                        &nbsp;&nbsp;{el.title}
                                    </div>}
                            </div>
                            <div className='d-flex justify-content-between'>
                                <div>
                                    <span className='h6 float-right font-weight-light'>
                                        {translate("admin.postedAt")}
                                    </span>
                                    <br />
                                    <span className='h5 float-right mt--2'>
                                        {getDisplayDateWithTimeFromMoment(el?.created_at)}
                                    </span>
                                </div>

                            </div>
                        </div>
                        <div className={'h4 fw-normal font-weight-light'}>
                            {el.description}
                        </div>
                        {el?.remarked_by && <div className={'text-right'}>
                            <div className='h6 mb--1 font-weight-light'>
                                {translate("admin.postedBy")!}
                            </div>
                            <div className='h5 mb--1 text-muted'>
                                {el?.remarked_by?.name}
                            </div>
                        </div>}
                        <div className={'row d-flex justify-content-between mt-3'}>
                            <div className='row ml-3'>
                                <div>
                                    <Image
                                        alt="..."
                                        size={'sm'}
                                        variant={'rounded'}
                                        src={el?.user_photo ? el?.user_photo : icons.profile}
                                    />
                                </div>
                                <div className="h4 mt-2 ml-2 text-muted">
                                    {el?.user_details?.name}
                                </div>
                            </div>
                            <div className={'mr-3'}>
                                {el?.is_agreed ? <div className='h5 mb--1 text-success'>

                                    <i className="bi bi-check-circle-fill"></i>
                                    <span className='ml-1'>{translate("admin.approved")!}</span>
                                </div>
                                    : el?.is_deferred ?
                                        <div className='h5 mb--1 text-danger'>
                                            <i className="bi bi-x-circle-fill"></i>
                                            <span className='ml-1'>{translate("admin.rejected")!}</span>
                                        </div>
                                        :
                                        <div className=''>
                                            <Button
                                                onClick={(e) => {
                                                    e.preventDefault()
                                                    e.stopPropagation()
                                                    setIsApproveModal(!isApproveModal)
                                                    setStatusText('reject')
                                                    setSelectedRemark(el)
                                                    // onApproveHandler('reject', el)
                                                }}
                                                color={'danger'}
                                                text={translate("common.reject")!}
                                            />
                                            <Button
                                                onClick={(e) => {
                                                    e.preventDefault()
                                                    e.stopPropagation()
                                                    setIsApproveModal(!isApproveModal)
                                                    setStatusText('approve')
                                                    setSelectedRemark(el)
                                                    // onApproveHandler('approve', el)
                                                }}
                                                text={translate("course.approve")!}

                                            />
                                        </div>}
                            </div>

                        </div>
                    </Card>
                );
            }) : <NoRecordsFound />}
            <Modal isOpen={isApproveModal} onClose={() => setIsApproveModal(!isApproveModal)} size={'sm'}
                title={`Do you want to ${statusText} this remark?`} titleClassname={'text-muted fw-light'}
            // isModalLoading={modalLoader.loader}
            >
                <div className='mt--4'>
                    <h3>{selectedRemark?.title}</h3>
                </div>
                <div className='text-right'>
                    <Button
                        color={'secondary'}
                        text={translate('common.cancel')}
                        onClick={() => { setIsApproveModal(!isApproveModal) }}
                    />
                    <Button
                        isLoading={submitLoader}
                        text={translate("common.proceed")!}
                        onClick={() => {
                            if (statusText === 'approve') {
                                if (!submitLoader) {
                                    onApprove()
                                }
                            }
                            else {
                                if (!submitLoader) {
                                    onReject()
                                }
                            }
                        }}
                    />
                </div>
            </Modal>

        </div>
    )
}

export { SuperAdminRemark };
