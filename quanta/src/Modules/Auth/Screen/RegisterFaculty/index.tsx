import { Back, Button, Card, Checkbox, DateTimePicker, DropDown, Dropzone, Input } from '@Components';
import { useInput, useLoader, useNavigation } from '@Hooks';
import { translate } from '@I18n';
import { fetchCourses, fetchDashboardDetails, fetchFacultiesList, fetchFacultyDetails, getAllBranchesList, getDepartmentData, getDesignationData, postAddFaculty, selectedFacultyDetails } from "@Redux";
import { USER_FORM_RULES, convertToUpperCase, getImageUrl, getValidateError, ifObjectExist, isMinimumPeriodElapsed, showToast, validate } from '@Utils';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { ButtonGroup, Form } from 'reactstrap';

const GENDER_LIST = [
  { id: '1', name: 'Male', value: 'M' },
  { id: '2', name: 'Female', value: 'F' },
  { id: '3', name: 'Others', value: 'O' },
];



function RegisterFaculty() {

  const dispatch = useDispatch();
  const { goBack } = useNavigation()
  const { departmentData, designationData, selectedFacultyId, dashboardDetails, branchesDropdownData, registeredCourses, selectedFaculty } = useSelector(
    (state: any) => state.DashboardReducer
  );

  const P2 = 'P2'
  const UE = 'UE'
  const UG = 'UG'
  const PG = 'PG'
  const DP = 'DP'

  const loader = useLoader(false)

  const [isActive, setIsActive] = useState(UG)
  const [gender, setGender] = useState<any>()
  const [departmentId, setDepartmentId] = useState('')
  const [designationId, setDesignationId] = useState('')
  const [yearOfPassing, setYearOfPassing] = useState<any>('')
  const [image, setImage] = useState('')
  const [selectedImage, setSelectedImage] = useState<any>("")

  const [dateOfBirth, setDateOfBirth] = useState<any>()
  const [educationalDetailId, setEducationalDetailId] = useState('')
  const [branchId, setBranchId] = useState('')
  const [submitLoader, setSubmitLoader] = useState(false)
  const [checkedCourses, setCheckedCourses] = useState([])
  console.log("departmentId", image);


  // const [roleId, setRoleId] =useState("f78b97b8-d0e2-44a0-9f14-89f458be3c28")
  const firstName = useInput('')
  const lastName = useInput('')
  const contactNumber = useInput('')
  const email = useInput('')
  const aadhar = useInput('')
  const qualificationDetails = useInput('')
  const institution = useInput('')
  const address = useInput('')
  const pincode = useInput('')
  // const gender = useDropDown({})

  console.log("firstName", firstName)

  useEffect(() => {
    if (!departmentData) {
      const params = {}
      dispatch(getDepartmentData({
        params,
        onSuccess: (response: any) => () => {
          // getCourses(response)
        },
        onError: (error) => () => {
        },
      }));

    }

    if (!designationData) {

      const params = {}
      dispatch(getDesignationData({
        params,
        onSuccess: (response: any) => () => {
        },
        onError: (error) => () => {
        },
      }));
    }
    if (selectedFacultyId) {
      getFacultyDetails()
    }

    const params = {}
    dispatch(getAllBranchesList({
      params,
      onSuccess: (response: any) => () => {
      },
      onError: (error) => () => {
      },
    }))
  }, [])

  useEffect(() => {
    getCourses(selectedFaculty?.department_id?.id)
  }, [selectedFaculty?.department_id?.id])

  const getCourses = (id) => {
    const params = {
      department_id: id ? id : selectedFaculty?.department_id?.id
    }
    dispatch(fetchCourses({
      params,
      onSuccess: (response: any) => () => {
        console.log("responseadad", response);

      },
      onError: (error) => () => {
      },

    }))
  }

  const getDashboardDetails = () => {

    const params = {}
    dispatch(fetchDashboardDetails({
      params,
      onSuccess: (success) => () => {
      },
      onError: (error) => () => {
      }
    }))
  }

  const submitRegisteredAdminHandler = () => {
    const params = {
      ...(selectedFacultyId && { id: selectedFacultyId }),
      first_name: convertToUpperCase(firstName.value),
      last_name: lastName.value,
      mobile_number: contactNumber.value,
      email: email.value,
      aadhar_number: aadhar.value,
      department_id: departmentId,
      designation_id: designationId,
      gender: gender,
      address: address.value,
      pincode: pincode.value,
      dob: dateOfBirth,
      branch_id: branchId,
      course_ids: checkedCourses,
      graduation: isActive,
      institution: institution.value,
      details: qualificationDetails.value,
      year_of_passing: yearOfPassing,
      ...(!image?.includes('https')&& !image?.includes('http') && { photo: image }),
    };

    const validParams = {
      first_name: convertToUpperCase(firstName.value),
      last_name: lastName.value,
      mobile_number: contactNumber.value,
      email: email.value,
      aadhar_number: aadhar.value,
      department_id: departmentId,
      designation_id: designationId,
      gender: gender,
      address: address.value,
      pincode: pincode.value,
      dob: dateOfBirth,
      branch_id: branchId,
      course_ids: checkedCourses,
      graduation: isActive,
      institution: institution.value,
      details: qualificationDetails.value,
      year_of_passing: yearOfPassing,
      photo: image
    }

    const validation = validate(USER_FORM_RULES, validParams)

    if (ifObjectExist(validation)) {
      if (!isMinimumPeriodElapsed(dateOfBirth, 18, 'years')) {
        showToast('error', 'Minimum 18 years required to be a faculty')
        return
      }
      // loader.showLoader()
      setSubmitLoader(true)
      dispatch(
        postAddFaculty({
          params,
          onSuccess: (response: any) => () => {

            setSubmitLoader(false)
            getFacultiesList()
            dispatch(selectedFacultyDetails({}))
            showToast('success', response.message)
            {selectedFacultyId === dashboardDetails?.user_details?.employee_id && getDashboardDetails()}
            goBack()
          },
          onError: (error: any) => () => {
            setSubmitLoader(false)
            showToast('error', error.error_message)
          },
        }),
      )
    } else {
      setSubmitLoader(false)
      showToast("error", getValidateError(validation))
    }
  };

  //to get updated faculty list after updating faculty details

  const getFacultiesList = () => {

    const params = {}
    dispatch(fetchFacultiesList({
      params,
      onSuccess: (success: any) => () => {


      },
      onError: (error: string) => () => {
        // showToast('error', 'Network error')
      },
    }))
  }


  const getFacultyDetails = () => {

    const params = {
      faculty_id: selectedFacultyId
    }
    dispatch(fetchFacultyDetails({
      params,
      onSuccess: (success) => () => {
        console.log("success----lll", success)
        prefillFacultyDetails(success.details)

      },
      onError: (error) => () => {
        // showToast('error', 'Network error')
      }
    }))
  }

  const prefillFacultyDetails = (facultyDetails) => {

    console.log(facultyDetails, "====");


    firstName.set(convertToUpperCase(facultyDetails.faculty_personal_info[0].first_name))
    lastName.set(convertToUpperCase(facultyDetails.faculty_personal_info[0].last_name))
    contactNumber.set(facultyDetails.faculty_personal_info[0].mobile_number)
    email.set(facultyDetails.faculty_personal_info[0].email)
    aadhar.set(facultyDetails.faculty_personal_info[0].aadhar)
    qualificationDetails.set(facultyDetails.faculty_educational_items[0].details)
    institution.set(facultyDetails.faculty_educational_items[0].institution)
    address.set(facultyDetails.faculty_personal_info[0].address)
    pincode.set(facultyDetails.faculty_personal_info[0].pincode)
    setDateOfBirth(facultyDetails.faculty_personal_info[0].dob)
    setGender(facultyDetails.faculty_personal_info[0].gender)
    setIsActive(facultyDetails.faculty_educational_items[0].graduation)
    setYearOfPassing(facultyDetails.faculty_educational_items[0].year_of_passing)
    setDepartmentId(selectedFaculty?.department_id?.id)
    setDesignationId(facultyDetails.designation_id.id)
    setBranchId(facultyDetails.branch_id.id)
    setImage(getImageUrl(facultyDetails.photo))
    // console.log("getImageUrlgetImageUrl", getImageUrl(facultyDetails.photo));

    setEducationalDetailId(facultyDetails.faculty_educational_items[0]?.id)
    checkedCourseHandler(facultyDetails?.course)
  }

  function checkedCourseHandler(course) {
    const mappedCourse = course.map((item) => {
      return item.id
    })
    setCheckedCourses(mappedCourse)
  }

  function checkedCoursesHandler(evt: any) {
    const isChecked = evt.target.checked;
    if (isChecked) {
      setCheckedCourses([...checkedCourses as never, evt.target.id as never])
    } else {
      let filtered = checkedCourses.filter(item => item !== evt.target.id)
      setCheckedCourses(filtered)
    }
  }

  console.log("selectedtimage==?>", selectedImage)

  return (
    <div>
      <div className='container-fluid'>
        <Back text={selectedFacultyId ? translate('course.editFaculty')! : translate('course.addFaculty')!} onClick={() => {
          dispatch(selectedFacultyDetails({}))
          // setCheckedCourses([])
        }} />
        {/* {!loader && <Spinner />}
        {loader && ( */}
        {/* <AppLoader /> */}

        <Card isLoading={loader.loader}>
          <Form >
            <div className='row'>
              <div className='col-sm-6 '>
                <Input
                  id={'FirstName'}
                  heading={translate('auth.firstName')}
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
                  heading={translate('auth.contactNumber')}
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

            <div className='row'>
              <div className='col-sm-6'>
                <DateTimePicker
                  heading={translate('course.yearOfPassing')!}
                  placeholder={translate('course.yearOfPassing')!}
                  value={yearOfPassing}
                  onChange={(e) => { setYearOfPassing(e) }}
                />
              </div>
              <div className='col-sm-6'>
                <DateTimePicker
                  heading={translate('auth.dateOfBirth')!}
                  placeholder={translate('auth.dateOfBirth')!}
                  value={dateOfBirth}
                  onChange={(e) => { setDateOfBirth(e) }}
                />
              </div>
            </div>
            <div className='row'>
              <div className='col-sm-6 mb-4'>
                <DropDown
                  heading={translate('auth.stack')!}
                  placeholder={translate('auth.stack')!}
                  data={departmentData}
                  value={departmentId}
                  onChange={(e) => {
                    setDepartmentId(e.target.value)
                    getCourses(e.target.value)
                  }}
                />
              </div>

              <div className='col-sm-6'>
                <DropDown
                  heading={translate('course.facultyRole')!}
                  placeholder={translate('course.facultyRole')!}
                  data={designationData}
                  value={designationId}
                  onChange={(e) => { setDesignationId(e.target.value) }}
                />
              </div>
            </div>
            <div className='row pt-3'>
              <div className='col-sm-6'>
                <div>
                  <DropDown
                    heading={translate('auth.branch')!}
                    data={branchesDropdownData}
                    placeholder={translate('auth.branch')!}
                    value={branchId}
                    onChange={(e) => {
                      setBranchId(e.target.value)
                    }}
                  />

                </div>
                <div className='pt-4'>
                  <Input
                    id={'address'}
                    heading={translate('auth.address')!}
                    value={address.value}
                    placeholder={translate('auth.address')!}
                    onChange={address.onChange}
                  />
                </div>
                <div className=''>

                  <Input
                    id={'pincode'}
                    heading={translate('auth.zipcode')!}
                    type={'number'}
                    value={pincode.value}
                    placeholder={translate('auth.zipcode')!}
                    onChange={pincode.onChange}
                    maxLength={6}
                  />
                </div>
              </div>
              <div className='col-sm-6'>
                <label className='form-control-label pb-2'>{'Courses'}</label>
                <div className='flex-wrap  d-flex'>
                  {registeredCourses && registeredCourses?.length > 0 &&
                    registeredCourses.map((el: any) => {
                      return (
                        <div className=' col-sm-4'>
                          <Checkbox id={el?.id}
                            text={el?.name}
                            onCheckChange={(e) => checkedCoursesHandler(e)}
                            checked={checkedCourses.includes(el?.id as never)}
                          />
                        </div>
                      )
                    })
                  }
                </div>
              </div>
            </div>


            <label className={`form-control-label`}>{translate('auth.highestQualification')!}</label>

            <div className='mb-4'>
              <ButtonGroup className="btn-group-toggle" data-toggle="buttons">
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
                <Button className={`${isActive === UE && 'active'}`} color="secondary" onClick={() => setIsActive(UE)} text={'UE'}>
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
            {/* MyPDFComponent */}
          </Form>

        </Card>
        {/* )} */}
      </div>
    </div>
  );
}

export { RegisterFaculty };
