import { Back, Button, Card, Checkbox, DropDown, Input, InputHeading, showToast } from '@Components';
import { DynamicHeight, useNavigation } from '@Hooks';
import { translate } from '@I18n';
import { fetchUserRemark, isBackNavigation, postGenericCrudDetails, postUserRemarks } from '@Redux';
import { convertToUpperCase } from '@Utils';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';


const SEVERITY_SELECT = [
  { id: 1, name: '1' },
  { id: 2, name: '2' },
  { id: 3, name: '3' },
  { id: 4, name: '4' },
  { id: 5, name: '5' },
]

const commentType = [
  { id: '1', name: 'Positive' },
  { id: '2', name: 'Negative' }
]

function AddRemark() {
  const dispatch = useDispatch();
  const { goBack } = useNavigation()
  const dynamicHeight: any = DynamicHeight()


  const [remarkType, setRemarkType] = useState('')
  const [severity, setSeverity] = useState('1')
  const [isMandatory, setIsMandatory] = useState(false)
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [submitLoader, setSubmitLoader] = useState(false)
  const { editUserDetails, dashboardDetails } = useSelector(
    (state: any) => state.DashboardReducer
  );


  useEffect(() => {
    const params = {
      employee_company_id: editUserDetails?.id
    }
    dispatch(fetchUserRemark({
      params,
      onSuccess: (success: any) => () => {
        console.log("userremark", success);

      },
      onError: (error: string) => () => {
        // showToast('Network error', 'error')
      }
    }))

  }, [])

  const addUserRemarks = () => {
    if (remarkType === '') {
      showToast('Please Select Remark Type', 'error')
    }
    else if (severity === '') {
      showToast('Please Select Severity', 'error')
    }
    else if (title === '') {
      showToast('Title Field cannot be empty', 'error')
    }
    else if (description === '') {
      showToast('Description Field cannot be empty', 'error')
    }
    else {
      setSubmitLoader(true)

      const params = {
        employee_company_id: editUserDetails?.id,
        title: title,
        description: description,
        is_positive: remarkType === "1" ? true : false,
        is_negative: remarkType === "2" ? true : false,
        is_high_priority: isMandatory,
        severity: severity,
      }
      dispatch(postUserRemarks({
        params,
        onSuccess: (success: any) => () => {
          setSubmitLoader(false)
          emptyStates()
          goBack()
        },
        onError: (error: string) => () => {
          setSubmitLoader(false)
          // showToast('Network error', 'error')
        },
      }))
    }
  }

  const emptyStates = () => {
    setDescription('')
    setIsMandatory(false)
    setRemarkType('')
    setSeverity('1')
    setTitle('')
  }


  return (
    <div className='container-fluid'>
      <div className='row' onClick={() => dispatch(isBackNavigation(true))}>
        <Back text={'User Remark'} />
      </div>

      <Card className='p-3 overflow-auto scroll-hidden mt-0' style={{
        height: dynamicHeight.dynamicWidth <= 1400 ? dynamicHeight.dynamicHeight - 20 : dynamicHeight.dynamicHeight - 50,
      }}>
        <div className='row'>
          <div className='col-sm-5'>
            <DropDown
              heading={translate("admin.remarkType")}
              placeholder={translate("admin.remarkType")!}
              data={commentType}
              value={remarkType}
              onChange={(e) => {
                setRemarkType(e.target.value)
              }}
            />
          </div>
          <div className='col-sm-5'>
            <DropDown
              heading={translate("common.severity")}
              placeholder={translate("common.severity")!}
              data={SEVERITY_SELECT}
              value={severity}
              onChange={(e) => {
                setSeverity(e.target.value)
              }}
            />
          </div>
          <div className='col-sm-2 pt-xl-5 pt-sm-0 pt-4'>
            <Checkbox
              id='1'
              text={translate("admin.highPriority")!}
              variant={'info'}
              checked={isMandatory}
              defaultChecked={false}
              onCheckChange={() => {
                setIsMandatory(!isMandatory)
              }}
            />
          </div>
        </div>
        <div className='row mt-3 '>
          <div className='col'>
            <div >
              <Input
                className=''
                heading={translate("common.title")!}
                placeholder={translate("common.typeHere")!}
                value={title}
                onChange={(e) => {
                  setTitle(convertToUpperCase(e.target.value))
                }}
              />
            </div>
            <InputHeading heading={translate("common.describe")!} />
            <textarea
              className="form-control"
              placeholder={translate("admin.describeAboutRemark")!}
              value={description}
              onChange={(e) => {
                setDescription(convertToUpperCase(e.target.value))
              }}
              style={{ height: '20vh' }}
            />
          </div>
        </div>
        <div className='pt-5'>
          <Button
            className='float-right  '
            isLoading={submitLoader}
            text={translate("common.submit")!}
            size={"md"}
            onClick={() => {
              if (!submitLoader) {
                addUserRemarks()
              }
            }}
          />
        </div>
      </Card>

    </div>
  )
}

export { AddRemark };
