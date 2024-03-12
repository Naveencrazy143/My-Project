import { icons } from '@Assets';
import { Back, Card, Checkbox, DropDown, Image, InputWithImage, NoRecordsFound, useKeyPress } from '@Components';
import { translate } from '@I18n';
import { UserProfileCard } from '@Modules';
import { fetchUserRemark, isBackNavigation } from '@Redux';
import { getDisplayDateFromMoment, getDisplayDateWithTimeFromMoment, showToast } from '@Utils';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

const REMARK_TYPE = [
    { id: '-1', name: 'All' },
    { id: '2', name: 'Positive' },
    { id: '3', name: 'Negative' }
]

const STATUS = [
    { id: '-1', title: 'All' },
    { id: '2', title: 'Pending' },
    { id: '3', title: 'Approved' },
    { id: '4', title: 'Rejected' },
];

function UserRemarkDetails() {

    const dispatch = useDispatch();
    const { remarkUser, studentsListData, dashboardDetails, userRemarksData } = useSelector(
        (state: any) => state.DashboardReducer
    );
    const enterPress = useKeyPress('Enter')

    const [isHighPriority, setIsHighPriority] = useState(false)
    const [remarkType, setRemarkType] = useState<any>('')
    const [status, setStatus] = useState('')
    const [searchRemark, setSearchRemark] = useState('')
    const [remarkTypeId, setRemarkTypeId] = useState('-1')
    const [statusId, setStatusId] = useState('-1')


    const [filteredStudent, setFilteredStudent] = useState([])

    console.log("userRemarksData==>", userRemarksData)


    useEffect(() => {
        getFilteredStudent()
        // getStudentRemark()
    }, [])

    useEffect(() => {
        if (enterPress) {
            getUserRemark()
        }
    }, [enterPress])

    useEffect(() => {
        getUserRemark()
    }, [isHighPriority, remarkType, status])

    const getUserRemark = () => {
        const params = {
            employee_company_id: remarkUser?.user_details?.id,
            ...(isHighPriority && { is_high_priority: isHighPriority }),
            ...(remarkType && remarkType !== '-1' && {
                is_positive: remarkType === '2' && true,
                is_negative: remarkType === '3' && true,
            }),
            ...(status && status !== '-1' && {
                is_agreed: status === '3' && true,
                is_deferred: status === '4' && true,
            }),
            ...(searchRemark && { q: searchRemark }),
        }

        dispatch(fetchUserRemark({
            params,
            onSuccess: (success: any) => () => {
            },
            onError: (error: any) => () => {
            },
        }))
    }

    const getFilteredStudent = () => {
        const filteredData = studentsListData && studentsListData.length > 0 && studentsListData?.filter((item: any) => {
            return item.id === remarkUser?.user_details?.id
        })
        setFilteredStudent(filteredData)
    }


    return (
        <div className='container-fluid'>
            <div className='pb-2' onClick={() => dispatch(isBackNavigation(true))}>
                <Back text={translate("remarks.userRemarkDetails")!} />
            </div>
            <div className='row'>
                <div className='col-sm-4'>
                    <UserProfileCard
                        photo={remarkUser?.user_photo}
                        name={remarkUser?.user_details?.name}
                        dateOfJoining={getDisplayDateFromMoment(remarkUser?.user_details?.date_of_joining)}
                        positiveCount={remarkUser?.positive_remarks_count}
                        negativeCount={remarkUser?.negative_remarks_count}
                        studentData={filteredStudent && filteredStudent.length > 0 && filteredStudent[0]}
                    />
                </div>



                <div className='col-sm-8 container-fluid  h-100v'>
                    <Card className=' '>
                        <div className='row'>
                            <div className='col-sm-4'>
                                <DropDown
                                    heading={translate("admin.remarkType")!}
                                    data={REMARK_TYPE}
                                    value={remarkTypeId}
                                    placeholder={translate("admin.remarkType")!}
                                    onChange={(e) => {
                                        setRemarkType(e.target.value)
                                        setRemarkTypeId(e.target.value)

                                    }}
                                />
                            </div>
                            <div className='col-sm-4 pt-sm-0 pt-4'>
                                <DropDown
                                    heading={translate("common.status")!}
                                    data={STATUS}
                                    value={statusId}
                                    placeholder={translate("admin.selectStatus")!}
                                    onChange={(e) => {
                                        setStatus(e.target.value)
                                        setStatusId(e.target.value)
                                    }}
                                />
                            </div>
                            <div className='col-sm-4 pt-xl-4 pt-sm-0 pt-4'>
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
                    <div className='row'>
                        <div className='col '>
                            {userRemarksData && userRemarksData?.length > 0 ? userRemarksData.map((el: any) => {
                                return (
                                    <>
                                        {/* {dashboardDetails?.user_details?.employee_id === el?.remarked_by?.id && */}
                                        <Card>
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
                                                            <div className='h5 mb--1'>
                                                                <i className="bi bi-clock-history fa-md"></i>
                                                                <span className='ml-1'>{translate("admin.pending")!}</span>
                                                            </div>
                                                    }
                                                    {(el?.is_agreed || el?.is_deferred) &&
                                                        <div className='h5 mb--1 mt-1 text-right text-muted'>
                                                            {el?.agreed_by ? el?.agreed_by?.name : el?.deferred_by?.name}
                                                        </div>
                                                    }
                                                </div>
                                            </div>

                                        </Card>
                                        {/* } */}
                                    </>
                                )
                            })
                                :
                                <div className=" d-flex justify-content-center align-items-center" style={{
                                    height: "77.2vh"
                                }}>
                                    <NoRecordsFound />
                                </div>
                            }
                        </div>
                    </div>
                    {/* </Card> */}
                </div>

            </div>
        </div>
    )
}

export { UserRemarkDetails };

