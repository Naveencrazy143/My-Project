import React, { useEffect, useState } from 'react';
import { Card, Input, Button, Back, DateTimePicker, Dropzone, DropDown, AppLoader } from '@Components';
import { ButtonGroup, Form, FormGroup } from 'reactstrap';
import { translate } from '@I18n';
import { useSelector, useDispatch } from "react-redux";
import { postAddStudent, getDepartmentData, postGenericCrudDetails, fetchStudentsList, fetchStudentDetails, editUserRegister, getAllBranchesList, fetchRefererList } from "@Redux";
import { useDropDown, useInput, useLoader, useNavigation } from '@Hooks';
import { getValidateError, ifObjectExist, showToast, validate, STUDENT_FORM_RULES, convertToUpperCase, getImageUrl, isMinimumPeriodElapsed } from '@Utils'

const GENDER_LIST = [
  { id: '1', name: 'Male', value: 'M' },
  { id: '2', name: 'Female', value: 'F' },
  { id: '3', name: 'Others', value: 'O' },
];

function RegisterUser() {
  const dispatch = useDispatch();
  const { goBack } = useNavigation()

  const { departmentData, editUserDetails, studentDetails, branchesDropdownData, dashboardDetails, refererListData } = useSelector(
    (state: any) => state.DashboardReducer
  );

  const P2 = 'P2'
  const UE = 'UE'
  const UG = 'UG'
  const PG = 'PG'
  const DP = 'DP'


  const loader = useLoader(false)
  const [isActive, setIsActive] = useState(UE)
  const [gender, setGender] = useState('')
  const [departmentId, setDepartmentId] = useState('')
  const [yearOfPassing, setYearOfPassing] = useState<any>('')
  const [image, setImage] = useState<any>("")
  const [selectedImage, setSelectedImage] = useState<any>("")

  const [branchId, setBranchId] = useState('')
  const [dateOfJoining, setDateOfJoining] = useState<any>('')
  const [dateOfBirth, setDateOfBirth] = useState<any>('')
  const [submitLoader, setSubmitLoader] = useState(false)
  const [referrerId, setReferrerId] = useState('')



  const firstName = useInput('')
  const lastName = useInput('')
  const contactNumber = useInput('')
  const email = useInput('')
  const aadhar = useInput('')
  const qualificationDetails = useInput('')
  const institution = useInput('')
  const address = useInput('')
  const pincode = useInput('')

  const [educationalDetailId, setEducationalDetailId] = useState("")
  let imageUrlValue = image && image.toString().includes('https')

  useEffect(() => {
    const params = {
      student_id: editUserDetails?.id
    }
    if (editUserDetails) {
      dispatch(fetchStudentDetails({
        params,
        onSuccess: (success) => () => {
          setEducationalDetailId(success?.details?.student_educational_items[0]?.id)
          prefillFacultyDetails(success)
          setImage(getImageUrl(success?.details?.photo))
        },
        onError: (error) => () => {
          // console.log("errrr-->", error)
          // showToast('error', 'Network error')
        }
      }))
    }
  }, [])

  const prefillFacultyDetails = (studentDetails) => {
    firstName.set(convertToUpperCase(studentDetails.details.student_personal_info[0].first_name))
    lastName.set(convertToUpperCase(studentDetails.details.student_personal_info[0].last_name))
    contactNumber.set(studentDetails.details.student_personal_info[0].mobile_number)
    email.set(studentDetails.details.student_personal_info[0].email)
    aadhar.set(studentDetails.details.student_personal_info[0].aadhar)
    qualificationDetails.set(studentDetails.details.student_educational_items[0].details)
    institution.set(studentDetails.details.student_educational_items[0].institution)
    address.set(studentDetails.details.student_personal_info[0].address)
    pincode.set(studentDetails.details.student_personal_info[0].pincode)
    setDateOfBirth(studentDetails.details.student_personal_info[0].dob)
    setGender(studentDetails?.details?.student_personal_info[0]?.gender)
    setIsActive(studentDetails.details.student_educational_items[0].graduation)
    setYearOfPassing(studentDetails.details.student_educational_items[0].year_of_passing)
    setDateOfJoining(studentDetails.details.date_of_joining)
    setDepartmentId(studentDetails.details.department_id)
    setEducationalDetailId(studentDetails?.details?.student_educational_items[0]?.id)
    setBranchId(studentDetails.details.branch_id.id)
    setReferrerId(studentDetails.details?.referrer?.id)
  }

  const submitRegisteredAdminHandler = () => {

    const params = {
      first_name: convertToUpperCase(firstName.value),
      last_name: lastName.value,
      mobile_number: contactNumber.value,
      email: email.value,
      aadhar_number: aadhar.value,
      ...(departmentId && { department_id: departmentId }),
      branch_id: branchId,
      referrer_id: referrerId,
      gender: gender,
      ...(editUserDetails && { id: editUserDetails.id }),
      address: address.value,
      pincode: pincode.value,
      dob: dateOfBirth,
      date_of_joining: dateOfJoining,
      graduation: isActive,
      institution: institution.value,
      details: qualificationDetails.value,
      year_of_passing: yearOfPassing,
      ...(!image?.includes('https') && !image?.includes('http') && { photo: image}),
    };

    /**
     * getting all the params with the same key as payload values
     * passing those values into validate function as 2nd argument
     * STUDENT_FORM_RULES has some validation based on type of inputs
     * ifObjectExist(validation) ---> if it is false, then should not dispatch postAddStudent
     */
    const validParams = {
      first_name: convertToUpperCase(firstName.value),
      last_name: lastName.value,
      mobile_number: contactNumber.value,
      email: email.value,
      gender: gender,
      aadhar_number: aadhar.value,
      department_id: departmentId,
      branch_id: branchId,
      year_of_passing: yearOfPassing,
      graduation: isActive,
      details: qualificationDetails.value,
      institution: institution.value,
      dob: dateOfBirth,
      address: address.value,
      pincode: pincode.value,
      date_of_joining: dateOfJoining,
      photo: image,
      referrer_id: referrerId
    }

    const validation = validate(STUDENT_FORM_RULES, validParams)

    if (ifObjectExist(validation)) {
      if (!isMinimumPeriodElapsed(dateOfBirth, 18, 'years')) {
        showToast('error', 'Minimum 18 years required to undergo this course')
        return
      }

      setSubmitLoader(true)
      dispatch(
        postAddStudent({
          params,
          onSuccess: (response: any) => () => {
            setSubmitLoader(false)
            showToast('success', response.message)
            getStudentsList()
            dispatch(editUserRegister(''))
            goBack()
          },
          onError: (error: any) => () => {
            setSubmitLoader(false)
            if (error?.status_code === 0) {
              showToast('error', error.error_message)
            }
          },
        }),
      );
    } else {
      setSubmitLoader(false)
      showToast("error", getValidateError(validation))
    }
  };

  //to get updated student list after updating student details

  const getStudentsList = () => {

    const params = {}

    dispatch(fetchStudentsList({
      params,
      onSuccess: (success: any) => () => {

      },
      onError: (error) => () => {
      },
    }))
  }

  const getDepartments = () => {
    const params = {}
    dispatch(getDepartmentData({
      params,
      onSuccess: (success: any) => () => {
      },
      onError: (error) => () => {
      },
    }));
  }

  const getAllBranches = () => {
    const params = {}
    dispatch(getAllBranchesList({
      params,
      onSuccess: (response: any) => () => {
      },
      onError: (error) => () => {
      },
    }));
  }

  const getReferrerList = () => {

    const params = {}
    dispatch(fetchRefererList({
      params,
      onSuccess: (success) => () => { },
      onError: (error) => () => { }
    }))
  }

  useEffect(() => {

    getDepartments()
    getAllBranches()
    getReferrerList()

  }, [])

  return (
    <div>
      <div className='container-fluid'>
        <Back text={`${editUserDetails ? translate('course.editStudent')! : translate('course.addStudent')!} `} 
        onClick={()=>{
            dispatch(editUserRegister(''))
        }}/>
        {/* <AppLoader /> */}

        <Card isLoading={loader.loader}>
          <Form >
            <div className='row'>
              <div className='col-sm-6'>
                <Input
                  id={'FirstName'}
                  heading={translate('auth.firstName')!}
                  placeholder={translate('auth.firstName')!}
                  type={'text'}
                  value={firstName.value}
                  onChange={firstName.onChange}
                />
              </div>
              <div className='col-sm-6 '>
                <Input
                  id={'LastName'}
                  heading={translate('auth.lastName')}
                  placeholder={translate('auth.lastName')!}
                  type={'text'}
                  value={lastName.value}
                  onChange={lastName.onChange}
                />
              </div>
            </div>
            <div className='row'>
              <div className='col-sm-6 '>
                <Input
                  id={'ContactNumber'}
                  heading={translate('auth.contactNumber')!}
                  type={'number'}
                  value={contactNumber.value}
                  placeholder={translate('auth.contactNumber')!}
                  onChange={contactNumber.onChange}
                  maxLength={10}
                />
              </div>
              <div className='col-sm-6 '>
                <Input
                  id={'E-mail'}
                  heading={translate('auth.e-mail')!}
                  type={'email'}
                  value={email.value}
                  placeholder={translate('auth.email')!}
                  onChange={email.onChange}
                />
              </div>
            </div>
            <div className='row'>
              <div className='col-sm-6 mb-4'>
                <DropDown
                  heading={translate('auth.gender')}
                  placeholder={translate('auth.gender')!}
                  data={GENDER_LIST}
                  value={gender}
                  onChange={(e) => {
                    setGender(e.target.value)

                  }}
                />

              </div>
              <div className='col-sm-6'>
                <Input
                  id={'Aadhar'}
                  heading={translate('auth.aadhar')!}
                  type={'number'}
                  value={aadhar.value}
                  placeholder={translate('auth.aadhar')!}
                  onChange={aadhar.onChange}
                  maxLength={12}
                />
              </div>
            </div>


            <div className='row '>
              <div className='col-sm-6 '>
                <DateTimePicker
                  heading={translate('auth.dateOfBirth')!}
                  placeholder={translate('auth.dateOfBirth')!}
                  onChange={(e) => { setDateOfBirth(e) }}
                  value={dateOfBirth}
                />
              </div>
              <div className='col-sm-6 '>
                <DateTimePicker
                  heading={translate('course.yearOfPassing')!}
                  placeholder={translate('course.yearOfPassing')!}
                  onChange={(e) => { setYearOfPassing(e) }}
                  value={yearOfPassing}
                />

              </div>
            </div>
            <div className='row'>
              <div className='col-sm-6'>
                <DropDown
                  heading={translate('auth.stack')!}
                  placeholder={translate('auth.stack')!}
                  data={departmentData}
                  value={departmentId}
                  onChange={(e) => {
                    setDepartmentId(e.target.value)
                  }}
                />
              </div>
              {dashboardDetails?.permission_details?.is_super_admin ?
                <div className='col-sm-6'>
                  <DropDown
                    heading={translate('auth.branch')!}
                    data={branchesDropdownData}
                    placeholder={translate('auth.branch')!}
                    value={branchId}
                    onChange={(e) => {
                      setBranchId(e.target.value)
                    }}
                  />

                </div> :
                <div className='col-sm-6 '>
                  <Input
                    id={'address'}
                    heading={translate('auth.address')!}
                    value={address.value}
                    placeholder={translate('auth.address')!}
                    onChange={address.onChange}
                  />
                </div>
              }

            </div>
            <div className='row mt-2'>
              {dashboardDetails?.permission_details?.is_super_admin && (
                <div className='col-sm-6 '>
                  <Input
                    id={'address'}
                    heading={translate('auth.address')!}
                    value={address.value}
                    placeholder={translate('auth.address')!}
                    onChange={address.onChange}
                  />
                </div>
              )}
              <div className='col-sm-6 '>
                <Input
                  id={'pincode'}
                  heading={translate('auth.zipcode')!}
                  type={'number'}
                  maxLength={6}
                  value={pincode.value}
                  placeholder={translate('auth.zipcode')!}
                  onChange={pincode.onChange}
                />
              </div>
            </div>

            <div>
              <DateTimePicker
                heading={translate("common.dateOfJoining")!}
                placeholder={translate("common.dateOfJoining")!}
                onChange={(e) => { setDateOfJoining(e) }}
                value={dateOfJoining}
              />
            </div>

            <div className='mb-3'>
              <DropDown
                heading={translate("common.referrer")!}
                placeholder={translate("common.referrer")!}
                data={refererListData}
                value={referrerId}
                onChange={(e) => {
                  setReferrerId(e.target.value)
                }}
              />
            </div>
            <label className={`form-control-label`}>{translate('auth.highestQualification')!}</label>

            <div className='mb-4'>
              <ButtonGroup className="btn-group-toggle" data-toggle="buttons">

                <Button className={`${isActive === UE && 'active'}`} color="secondary" onClick={() => {
                  setIsActive(UE)
                }} text={'UE'}>
                  <input
                    autoComplete="off"
                    name="options"
                    type="radio"
                    value={isActive}
                  />
                </Button>
                <Button className={`${isActive === P2 && 'active'}`} color="secondary" onClick={() => setIsActive(P2)} text={'P2'}>
                  <input
                    autoComplete="off"
                    name="options"
                    type="radio"
                    value={isActive}
                  />
                </Button>
                <Button className={`${isActive === DP && 'active'}`} color="secondary" onClick={() => setIsActive(DP)} text={'DP'}>
                  <input
                    autoComplete="off"
                    name="options"
                    type="radio"
                    value={isActive}
                  />
                </Button>
                <Button className={`${isActive === UG && 'active'}`} color="secondary" onClick={() => setIsActive(UG)} text={'UG'}>
                  <input
                    autoComplete="off"
                    name="options"
                    type="radio"
                    value={isActive}
                  />
                </Button>
                <Button className={`${isActive === PG && 'active'}`} color="secondary" onClick={() => setIsActive(PG)} text={'PG'}>
                  <input
                    autoComplete="off"
                    name="options"
                    type="radio"
                    value={isActive}
                  />
                </Button>
              </ButtonGroup>
            </div>
            <Input
              id={'QualificationDetails'}
              heading={translate('auth.qualificationDetails')!}
              value={qualificationDetails.value}
              placeholder={translate('auth.qualificationDetails')!}
              onChange={qualificationDetails.onChange}
            />

            <Input
              id={'Institution'}
              heading={translate('auth.institution')!}
              value={institution.value}
              placeholder={translate('auth.institution')!}
              onChange={institution.onChange}
            />

            <label className={`form-control-label`}>{translate("admin.selectprofile")}</label>
            <div>
              <Dropzone variant='ICON'
                icon={image}
                profile={image}
                onSelect={(image) => {
                  let encoded = image.toString().replace(/^data:(.*,)?/, '');
                  setImage(encoded)
                  setSelectedImage(encoded)
                }}
                size={'xl'}
              />
            </div>

            <div className='text-right mt-3'>
              <Button
                isLoading={submitLoader}
                text={translate('common.submit')}
                size={'md'}
                onClick={() => {
                  if (!submitLoader) {
                    submitRegisteredAdminHandler()

                  }
                }}
              />
            </div>
          </Form>
        </Card>
      </div>
    </div>
  );
}

export { RegisterUser };