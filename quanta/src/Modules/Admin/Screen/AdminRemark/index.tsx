import { icons } from '@Assets';
import { Back, Button, Card, Checkbox, DropDown, InputWithImage, NoRecordsFound, Image, useKeyPress } from '@Components'
import { useNavigation } from '@Hooks';
import { translate } from '@I18n';
import { fetchUserRemark, isBackNavigation } from '@Redux';
import { ROUTES } from '@Routes';
import { getDisplayDateWithTimeFromMoment, showToast } from '@Utils';
import moment from 'moment';
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';

const COMMENT_TYPE = [
  { id: '1', name: 'All' },
  { id: '2', name: 'Positive' },
  { id: '3', name: 'Negative' }
]

const REQUEST_TYPE = [
  { id: "1", title: 'All' },
  { id: "2", title: 'Pending' },
  { id: "3", title: 'Approved' },
  { id: "4", title: 'Rejected' },
];

function AdminRemark() {
  const dispatch = useDispatch();
  const { editUserDetails, userRemarksData, dashboardDetails, isBack } = useSelector(
    (state: any) => state.DashboardReducer
  );
  const { goTo } = useNavigation()
  const enterPress = useKeyPress('Enter')

  const [isHighPriority, setIsHighPriority] = useState(false)
  const [commentType, setCommentType] = useState<any>('1')
  const [requestType, setRequestType] = useState<any>("1")
  const [searchRemark, setSearchRemark] = useState('')


  useEffect(() => {
    if (!isBack) {
      getUserRemark()
    }
    else {
      dispatch(isBackNavigation(false))
    }

  }, [isHighPriority, commentType, requestType]);

  useEffect(() => {
    if (enterPress) {
      getUserRemark()
    }
  }, [enterPress])

  const getUserRemark = () => {
    const params = {
      employee_company_id: editUserDetails?.id,

      ...(isHighPriority && { is_high_priority: isHighPriority }),
      ...(commentType && commentType !== '1' && {
        is_positive: commentType === '2' && true,
        is_negative: commentType === '3' && true,
      }),
      ...(requestType && requestType !== '1' && {
        is_agreed: requestType === '3' && true,
        is_deferred: requestType === '4' && true,
      }),
      ...(searchRemark && { q: searchRemark }),
    }
    dispatch(fetchUserRemark({
      params,
      onSuccess: (success: any) => () => {
        console.log("success", success);

      },
      onError: (error: string) => () => {
      },
    }))
  }

  return (
    <div className='container-fluid py-2  h-100v'>
      <div className='pb-2'>
        <Back text={translate("admin.remark")!} />
      </div>
      <div className='mb-3'>
        <div className='col  text-right'>
          <Button
            text={translate("course.add")}
            onClick={() => {
              goTo('/dashboard' + ROUTES.ADMIN.ADD_REMARK)
              dispatch(isBackNavigation(false))
            }}
          />
        </div>
      </div>
      <Card className=' '>
        <div className='row'>
          <div className='col-sm-5'>
            <DropDown
              heading={translate("admin.remarkType")!}
              data={COMMENT_TYPE}
              placeholder={translate("admin.remarkType")!}
              onChange={(e) => {
                setCommentType(e.target.value)
              }}
              value={commentType}
            />
          </div>
          <div className='col-sm-5 pt-sm-0 pt-4'>
            <DropDown
              heading={translate("common.status")!}
              data={REQUEST_TYPE}
              placeholder={translate("admin.selectStatus")!}
              onChange={(e) => {
                setRequestType(e.target.value)
              }}
              value={requestType}
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
      <div className='row pt-4'>
        <div className='col '>
          {userRemarksData && userRemarksData?.length > 0 ? userRemarksData?.map((el: any) => {
            return (
              <>
                {dashboardDetails?.user_details?.employee_id === el?.remarked_by?.id &&
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
                            {translate("admin.postedAt")!}
                          </span>
                          <br />
                          <span className='h5 float-right mt--2 '>
                            {getDisplayDateWithTimeFromMoment(el.created_at)}
                          </span>
                        </div>

                      </div>
                    </div>
                    <div className={'h4 fw-normal font-weight-light'}>
                      {el.description}
                    </div>

                    <div className={'row d-flex justify-content-between  mt-3'}>
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
                      <div className={'mt-3 mr-3'}>
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
                      {/* <div className=''>
                        <Button
                          color={'danger'}
                          text={'Reject'}
                        />
                        <Button
                          text={'Approve'}
                        />
                      </div> */}
                    </div>

                  </Card>
                }
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
  )
}

export { AdminRemark }