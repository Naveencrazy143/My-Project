import { Back, Card, Divider, FormTypography } from '@Components'
import { DynamicHeight } from '@Hooks'
import { fetchFacultyDetails, fetchStudentDetails } from '@Redux';
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';

function ViewFacultyDetails() {
    const dynamicHeight: any = DynamicHeight()
    const dispatch = useDispatch();


    const { selectedFacultyId, facultyDetails } = useSelector(
        (state: any) => state.DashboardReducer
    );

    console.log("facultyDetails", facultyDetails);


    useEffect(() => {
        if (selectedFacultyId) {
            getFacultyDetails()
        }
    }, [])

    const getFacultyDetails = () => {

        const params = {
          faculty_id: selectedFacultyId
        }
        dispatch(fetchFacultyDetails({
          params,
          onSuccess: (success) => () => {
            console.log("success----lll", success)
          },
          onError: (error) => () => {
            // showToast('error', 'Network error')
          }
        }))
      }

    return (
        <>
            <div className={`container-fluid pt-4 pb-xl-0 pb-1`}>
                <Back text={'Faculty details'} />
                {/* <Card className='overflow-auto scroll-hidden mt-0' style={{ height: dynamicHeight.dynamicWidth <= 1400 ? dynamicHeight.dynamicHeight + 20 : dynamicHeight.dynamicHeight - 110 }}>
                    <h2>{'Personal information'}</h2>

                    <div className='row'>
                        <div className='col-sm-6'>
                            <FormTypography title={'First name'} subTitle={studentDetails && studentDetails?.student_personal_info[0]?.first_name} />
                        </div>
                        <div className='col-sm-6'>
                            <FormTypography title={'Last name'} subTitle={studentDetails && studentDetails?.student_personal_info[0]?.last_name} />
                        </div>
                    </div>

                    <div className='row'>
                        <div className='col-sm-6'>
                            <FormTypography title={'E-mail'} subTitle={studentDetails && studentDetails?.student_personal_info[0]?.email} />
                        </div>
                        <div className='col-sm-6'>
                            <FormTypography title={'Gender'} subTitle={studentDetails && studentDetails?.student_personal_info[0]?.gender} />
                        </div>
                    </div>

                    <div className='row'>
                        <div className='col-sm-6'>
                            <FormTypography title={'Date of birth'} subTitle={studentDetails && studentDetails?.student_personal_info[0]?.dob} />
                        </div>
                        <div className='col-sm-6'>
                            <FormTypography title={'Mobile number'} subTitle={studentDetails && studentDetails?.student_personal_info[0]?.mobile_number} />
                        </div>
                    </div>

                    <div className='row'>
                        <div className='col-sm-6'>
                            <FormTypography title={'Aadhar'} subTitle={studentDetails && studentDetails?.student_personal_info[0]?.aadhar} />
                        </div>
                        <div className='col-sm-6'>
                            <FormTypography title={'Date of joining'} subTitle={studentDetails && studentDetails?.date_of_joining} />
                        </div>
                    </div>

                    <div className='row'>
                        <div className='col-sm-6'>
                            <FormTypography title={'Address'} subTitle={studentDetails && studentDetails?.student_personal_info[0]?.address} />
                        </div>
                        <div className='col-sm-6'>
                            <FormTypography title={'Pincode'} subTitle={studentDetails && studentDetails?.student_personal_info[0]?.pincode} />
                        </div>
                    </div>

                    <Divider />

                    <h2>{'Educational details'}</h2>

                    <div className='row'>
                        <div className='col-sm-6'>
                            <FormTypography title={'Graduation'} subTitle={studentDetails && studentDetails?.student_educational_items[0]?.graduation} />
                        </div>
                        <div className='col-sm-6'>
                            <FormTypography title={'Qualification details'} subTitle={studentDetails && studentDetails?.student_educational_items[0]?.details} />
                        </div>
                    </div>

                    <div className='row'>
                        <div className='col-sm-6'>
                            <FormTypography title={'Institution'} subTitle={studentDetails && studentDetails?.student_educational_items[0]?.institution} />
                        </div>
                        <div className='col-sm-6'>
                            <FormTypography title={'Year of passing'} subTitle={studentDetails && studentDetails?.student_educational_items[0]?.year_of_passing} />
                        </div>
                    </div>

                    <Divider />

                    <h2>{'Course details'}</h2>

                    <div className=''>
                        {studentDetails && studentDetails?.student_course?.length > 1 ?
                            studentDetails?.student_course.map((el: any, index) => {
                                return (
                                    <>
                                        <div className='row'>
                                            <div className='col-sm-6'>
                                                <FormTypography title={`Course : ${index + 1} `} subTitle={el?.course.name} />
                                            </div>
                                            <div className='col-sm-6'>
                                                <FormTypography title={'Course start date'} subTitle={studentDetails && studentDetails?.student_course[0]?.course_duration?.start_date} />
                                            </div>
                                        </div >

                                        <div className='row'>
                                            <div className='col-sm-6'>
                                                <FormTypography title={'Course end date'} subTitle={studentDetails && studentDetails?.student_course[0]?.course_duration?.end_date ? studentDetails?.student_course[0]?.course_duration?.end_date : '-'} />
                                            </div>

                                        </div >
                                    </>

                                )
                            }) :
                            <>
                                <div className='row'>

                                    <div className='col-sm-6'>
                                        <FormTypography title={'Course name'} subTitle={studentDetails && studentDetails?.student_course[0]?.course.name} />
                                    </div>

                                    <div className='col-sm-6'>
                                        <FormTypography title={'Course start date'} subTitle={studentDetails && studentDetails?.student_course[0]?.course_duration?.start_date} />
                                    </div>
                                </div>

                                <div className='row'>
                                    <div className='col-sm-6'>
                                        <FormTypography title={'Course end date'} subTitle={studentDetails && studentDetails?.student_course[0]?.course_duration?.end_date ? studentDetails?.student_course[0]?.course_duration?.end_date : '-'} />
                                    </div>
                                    <div className='col-sm-6'>
                                        <FormTypography title={'Referer name'} subTitle={studentDetails && studentDetails?.referrer?.name} />
                                    </div>
                                </div>
                            </>
                        }

                        {studentDetails && studentDetails?.student_course?.length > 1 && (
                            <div className='col-sm-6 ml--2'>
                                <FormTypography title={'Referer name'} subTitle={studentDetails && studentDetails?.referrer?.name} />
                            </div>)}

                    </div>



                </Card> */}
            </div>
        </>
    )
}

export { ViewFacultyDetails }