import React, { useEffect, useState } from 'react'
import { ProfileHeader, TimeLine, UserProfile, UserProfileDetails } from '@Modules'
import { useDispatch, useSelector } from 'react-redux';
import { addUserDigitalProfile, fetchStudentTasksTimeline, fetchUserDigitalProfile, getUserDetails } from '@Redux';
import { DynamicHeight } from '@Hooks';
import { Input, Card, Button, Modal, Back } from '@Components'
import { translate } from '@I18n';
import { getSocialMediaIcon, showToast } from '@Utils';
import { SERVER } from '@Services';

function StudentProfile() {

    const dispatch = useDispatch();
    const dynamicHeight: any = DynamicHeight()

    const { userProfileDetails, userDigitalProfileDetails } = useSelector(
        (state: any) => state.StudentReducer
    );

    const { dashboardDetails, studentTasksTimeLine, currentPage, currentCourse, numOfPages, studentCourses } = useSelector(
        (state: any) => state.DashboardReducer
    );
    console.log("currentCourse", currentCourse);


    const [isShowEdit, setIsShowEdit] = useState(false)
    const [userDetails, setUserDetails] = useState({
        firstName: '', lastName: '', email: '', address: '', pincode: '', aboutMe: '', mobileNumber: ''
    })
    const [socialMediaProfiles, setSocialMediaProfiles] = useState<any>({})
    const [isOpenModal, setIsOpenModal] = useState(false)
    const [mediaType, setMediaType] = useState('')
    const [mediaKey, setMediaKey] = useState('')
    const [submitLoader, setSubmitLoader] = useState(false)

    useEffect(() => {
        getUserDigitalProfileDetails()
        fetchUserDetails()

        return () => {
            setSocialMediaProfiles({})
        }
    }, [])

    const getUserDigitalProfileDetails = () => {

        const params = {}

        dispatch(fetchUserDigitalProfile({
            params,
            onSuccess: (success: any) => () => {
            },
            onError: (error: any) => () => {
            },
        }))
    }

    const fetchUserDetails = () => {

        const params = {}

        dispatch(getUserDetails({
            params,
            onSuccess: (success: any) => () => {
                prefillUserDetails(success.details)
            },
            onError: (error: any) => () => {
            },
        }))
    }



    const prefillUserDetails = (details: any) => {
        let userInitData = { ...userDetails };

        if (details) {

            if (details[0].user_personal_details.first_name)
                userInitData.firstName = details[0].user_personal_details.first_name;

            if (details[0].user_personal_details.last_name)
                userInitData.lastName = details[0].user_personal_details.last_name;

            if (details[0].user_personal_details.email)
                userInitData.email = details[0].user_personal_details.email;

            if (details[0].address)
                userInitData.address = details[0].address;

            if (details[0].mobile_number)
                userInitData.mobileNumber = details[0].mobile_number;

            if (details[0].pincode)
                userInitData.pincode = details[0].pincode;


        }

        setUserDetails(userInitData)

        if (userDigitalProfileDetails.details[0].about_me)
            userInitData.aboutMe = userDigitalProfileDetails.details[0].about_me;

        const socialMediaUrls = Object.keys(userDigitalProfileDetails.details[0]).length > 0 && Object.entries(userDigitalProfileDetails.details[0]).reduce((acc, [key, value]) => {
            if (value) {
                acc[key] = value;
            }
            return acc;
        }, {});

        setSocialMediaProfiles(socialMediaUrls)
    }


    // // get student timeline 
    useEffect(() => {
        if (!dashboardDetails?.user_details?.is_faculty) {
            getStudentTasksTimeLine(currentPage)
        }
    }, [])


    const getStudentTasksTimeLine = (pageNumber: any) => {
        const params = {
            q: '',
            student_course_id: currentCourse.length > 0 ? currentCourse[0]?.id : studentCourses[0].id,
            page_number: pageNumber,

        }
        dispatch(fetchStudentTasksTimeline({
            params,
            onSuccess: (success: any) => () => {
            },
            onError: (error: any) => () => {
            },
        }))
    }


    function paginationHandler(
        type: "next" | "prev" | "current",
        position?: number
    ) {
        let page =
            type === "next"
                ? currentPage + 1
                : type === "prev"
                    ? currentPage - 1
                    : position;
        getStudentTasksTimeLine(page);
    }

    const onSubmit = () => {

        const params = {
            first_name: userDetails.firstName,
            last_name: userDetails.lastName,
            email: userDetails.email,
            mobile_number: userDetails.mobileNumber,
            address: userDetails.address,
            pincode: userDetails.pincode,
            about_me: userDetails.aboutMe,
            ...(userDigitalProfileDetails?.details[0]?.id && { id: userDigitalProfileDetails.details[0]?.id }),
            ...(Object.keys(socialMediaProfiles).length > 0 && { ...socialMediaProfiles })
        }
        setSubmitLoader(true)

        dispatch(addUserDigitalProfile({
            params,
            onSuccess: (success: any) => () => {
                showToast('success', success.message)
                getUserDigitalProfileDetails()
                fetchUserDetails()
                setIsShowEdit(false)
                setSubmitLoader(false)
            },
            onError: (error: any) => () => {
                setSubmitLoader(false)
            },
        }))

    }


    const onChangeHandler = (e: any) => {
        setUserDetails({ ...userDetails, [e.target?.name]: e.target?.value });
    };

    const onChangeSocialMediaHandler = (e: any) => {
        setSocialMediaProfiles({ ...socialMediaProfiles, [e.target?.name]: e.target?.value });
    };


    const getSocialMediaKey = (type) => {

        let mediaKey = ''

        switch (type) {
            case 'FB':
                mediaKey = 'facebook_url'
                break;

            case 'GL':
                mediaKey = 'google_url'
                break;

            case 'LN':
                mediaKey = 'linkedin_url'
                break;

            case 'IM':
                mediaKey = 'instagram_url'
                break;

            case 'TR':
                mediaKey = 'twitter_url'
                break;

            case 'DE':
                mediaKey = 'dribble_url'
                break;
        }
        return mediaKey
    }

    return (
        // <>
        //     <div className='ml-3'>
        //         <Back text={'Profile'} />
        //     </div>

        //     {/* <UserProfile
        //         mediaData={userDigitalProfileDetails.details}
        //         userDetails={userProfileDetails}
        //     /> */}

        //     <div className={`d-flex ${!isShowEdit ? 'justify-content-center' : 'ml-5'} pt-2`} >

        //         <div >
        // <UserProfileDetails
        // isShowEdit
        //                     mediaData={userDigitalProfileDetails?.details}
        //                     name={userProfileDetails?.details[0]?.user_personal_details?.first_name + ' ' + userProfileDetails?.details[0]?.user_personal_details?.last_name}
        //                     subText={userProfileDetails?.details[0]?.user_personal_details?.email}
        //                     mobileNumber={userProfileDetails?.details[0]?.mobile_number}
        //                     qualification={userProfileDetails?.details[0]?.user_educational_details?.details}
        //                     editOnClick={() => {
        //                         setIsShowEdit(true)
        //                     }}
        //                 // photo={dashboardDetails.user_details.photo}
        //                 />
        //         </div>

        //         {isShowEdit && (
        //             <div className='col-sm-8  ' >
        //                 <Card className='overflow-auto scroll-hidden' style={{ height: dynamicHeight.dynamicWidth <= 1400 ? dynamicHeight.dynamicHeight - 70 : dynamicHeight.dynamicHeight - 93 }}>
        //                     <h6 className="heading-small text-muted mb-4">
        //                         User information
        //                     </h6>
        //                     <div className="row">

        //                         <div className='col-sm-6'>
        //                             <Input
        //                                 heading={'First name'}
        //                                 placeholder="First name"
        //                                 name={"firstName"}
        //                                 value={userDetails.firstName}
        //                                 onChange={(event) => {
        //                                     onChangeHandler(event);
        //                                 }}
        //                             />
        //                         </div>
        //                         <div className='col-sm-6'>
        //                             <Input
        //                                 heading={'Last name'}
        //                                 placeholder="Last name"
        //                                 name={"lastName"}
        //                                 value={userDetails.lastName}
        //                                 onChange={(event) => {
        //                                     onChangeHandler(event);
        //                                 }}
        //                             />
        //                         </div>

        //                     </div>

        //                     <div className="row">
        //                         <div className='col-sm-6'>
        //                             <Input
        //                                 heading={'Mobile number'}
        //                                 placeholder='Mobile number'
        //                                 type="number"
        //                                 name={"mobileNumber"}
        //                                 value={userDetails.mobileNumber}
        //                                 maxLength={10}
        //                                 onChange={(event) => {
        //                                     onChangeHandler(event);
        //                                 }}
        //                             />
        //                         </div>
        //                         <div className='col-sm-6'>
        //                             <Input
        //                                 heading={' Email address'}
        //                                 placeholder="Email address"
        //                                 type="email"
        //                                 name={"email"}
        //                                 disabled={true}
        //                                 value={userDetails.email}
        //                                 onChange={(event) => {
        //                                     onChangeHandler(event);
        //                                 }}
        //                             />
        //                         </div>
        //                     </div>

        //                     <hr className="my-4" />

        //                     <h6 className="heading-small text-muted mb-4">
        //                         Contact information
        //                     </h6>

        //                     <div className="row">
        //                         <div className='col-sm-6'>
        //                             <Input
        //                                 heading={'Address'}
        //                                 placeholder="Home Address"
        //                                 name={"address"}
        //                                 value={userDetails.address}
        //                                 onChange={(event) => {
        //                                     onChangeHandler(event);
        //                                 }}
        //                             />
        //                         </div>
        //                         <div className='col-sm-6'>
        //                             <Input
        //                                 heading={'Postal code'}
        //                                 placeholder="Postal code"
        //                                 type="number"
        //                                 name={"pincode"}
        //                                 value={userDetails.pincode}
        //                                 onChange={(event) => {
        //                                     onChangeHandler(event);
        //                                 }}
        //                             />
        //                         </div>
        //                     </div>
        //                     <hr className="my-4" />

        //                     <h6 className="heading-small text-muted mb-4">About me</h6>
        //                     <div className="row">
        //                         <div className='col'>
        //                             <Input
        //                                 heading={'About Me'}
        //                                 placeholder="A few words about you ..."
        //                                 rows="4"
        //                                 type="textarea"
        //                                 name={"aboutMe"}
        //                                 value={userDetails.aboutMe}
        //                                 onChange={(event) => {
        //                                     onChangeHandler(event);
        //                                 }}
        //                             />
        //                         </div>
        //                     </div>

        //                     <div className="pt-3">
        //                         <Button
        //                             className="btn btn-facebook btn-icon-only rounded-circle"
        //                             size={'md'}
        //                             variant={'icon-rounded'}
        //                             buttonIcon={'fab fa-facebook'}
        //                             onClick={() => {
        //                                 setMediaType('FB')
        //                                 setMediaKey(getSocialMediaKey('FB'))
        //                                 if ('facebook_url' in socialMediaProfiles === false) {
        //                                     setSocialMediaProfiles({ ...socialMediaProfiles, facebook_url: '' })
        //                                 }
        //                                 setIsOpenModal(!isOpenModal)
        //                             }}
        //                         />
        //                         <Button
        //                             className="btn-google-plus btn-icon-only rounded-circle btn btn-google"
        //                             size={'md'}
        //                             variant={'icon-rounded'}
        //                             buttonIcon={'fab fa-google-plus-g'}
        //                             onClick={() => {
        //                                 setMediaType('GL')
        //                                 setMediaKey(getSocialMediaKey('GL'))
        //                                 if ('google_url' in socialMediaProfiles === false) {
        //                                     setSocialMediaProfiles({ ...socialMediaProfiles, google_url: '' })
        //                                 }
        //                                 setIsOpenModal(!isOpenModal)
        //                             }}
        //                         />
        //                         <Button
        //                             className="btn btn-facebook btn-icon-only rounded-circle"
        //                             size={'md'}
        //                             variant={'icon-rounded'}
        //                             buttonIcon={'bi bi-linkedin'}
        //                             onClick={() => {
        //                                 setMediaType('LN')
        //                                 setMediaKey(getSocialMediaKey('LN'))
        //                                 if ('linkedin_url' in socialMediaProfiles === false) {
        //                                     setSocialMediaProfiles({ ...socialMediaProfiles, linkedin_url: '' })
        //                                 }
        //                                 setIsOpenModal(!isOpenModal)
        //                             }}
        //                         />
        //                         <Button
        //                             className="btn-instagram btn-icon-only rounded-circle btn btn-default"
        //                             size={'md'}
        //                             variant={'icon-rounded'}
        //                             buttonIcon={'fab fa-instagram'}
        //                             onClick={() => {
        //                                 setMediaType('IM')
        //                                 setMediaKey(getSocialMediaKey('IM'))
        //                                 if ('instagram_url' in socialMediaProfiles === false) {
        //                                     setSocialMediaProfiles({ ...socialMediaProfiles, instagram_url: '' })
        //                                 }
        //                                 setIsOpenModal(!isOpenModal)
        //                             }}
        //                         />
        //                         <Button
        //                             className="btn-icon-only rounded-circle btn btn-twitter"
        //                             size={'md'}
        //                             variant={'icon-rounded'}
        //                             buttonIcon={'fab fa-twitter'}
        //                             onClick={() => {
        //                                 setMediaType('TR')
        //                                 setMediaKey(getSocialMediaKey('TR'))
        //                                 if ('twitter_url' in socialMediaProfiles === false) {
        //                                     setSocialMediaProfiles({ ...socialMediaProfiles, twitter_url: '' })
        //                                 }
        //                                 setIsOpenModal(!isOpenModal)
        //                             }}
        //                         />
        //                         <Button
        //                             className="btn-icon-only rounded-circle btn btn-dribbble"
        //                             size={'md'}
        //                             variant={'icon-rounded'}
        //                             buttonIcon={'fab fa-dribbble'}
        //                             onClick={() => {
        //                                 setMediaType('DE')
        //                                 setMediaKey(getSocialMediaKey('DE'))
        //                                 if ('dribble_url' in socialMediaProfiles === false) {
        //                                     setSocialMediaProfiles({ ...socialMediaProfiles, dribble_url: '' })
        //                                 }
        //                                 setIsOpenModal(!isOpenModal)
        //                             }}
        //                         />
        //                     </div>

        //                     <div className='text-right pb-3'>
        //                         <Button
        //                             size={'md'}
        //                             text={translate('common.submit')}
        //                             onClick={() => {
        //                                 onSubmit()
        //                             }}
        //                         />

        //                     </div>
        //                 </Card>
        //             </div>
        //         )}

        //         <Modal
        //             isOpen={isOpenModal}
        //             onClose={() => {
        //                 setIsOpenModal(!isOpenModal)
        //             }}
        //         >
        //             <div className='mt--4'>
        //                 <Input
        //                     heading={'Profile URL'}
        //                     placeholder={'Profile URL'}
        //                     value={socialMediaProfiles && socialMediaProfiles[mediaKey]}
        //                     name={mediaKey && mediaKey}
        //                     onChange={(e) => {
        //                         onChangeSocialMediaHandler(e)
        //                     }}
        //                 />
        //             </div>

        //         </Modal>
        //     </div>
        // </>

        /**
         * Method 2
         */

        <div>
            <div className='col-12 col-sm-12 col-md-12 col-lg-12 col-xs-12 col-xl-12' >
                <ProfileHeader name={userProfileDetails ? userProfileDetails?.details[0]?.user_personal_details?.first_name + ' ' + userProfileDetails?.details[0]?.user_personal_details?.last_name : ''} />
            </div>
            <div className='m-4 mt--6'>
                <div className='row'>
                    {/* <UserStatusCard /> */}

                    {isShowEdit || dashboardDetails?.user_details?.is_faculty ? (
                        <div className='col-sm-12 col-12 col-md-6 col-lg-8' >
                            <Card className='overflow-auto scroll-hidden ' style={{ height: dynamicHeight.dynamicWidth <= 1400 ? dynamicHeight.dynamicHeight - 2 : dynamicHeight.dynamicHeight - 0 }}>
                                <h6 className="heading-small text-muted mb-4">
                                    User information
                                </h6>
                                <div className="row">

                                    <div className='col-sm-6'>
                                        <Input
                                            heading={'First name'}
                                            placeholder="First name"
                                            name={"firstName"}
                                            value={userDetails.firstName}
                                            onChange={(event) => {
                                                onChangeHandler(event);
                                            }}
                                        />
                                    </div>
                                    <div className='col-sm-6'>
                                        <Input
                                            heading={'Last name'}
                                            placeholder="Last name"
                                            name={"lastName"}
                                            value={userDetails.lastName}
                                            onChange={(event) => {
                                                onChangeHandler(event);
                                            }}
                                        />
                                    </div>

                                </div>

                                <div className="row">
                                    <div className='col-sm-6'>
                                        <Input
                                            heading={'Mobile number'}
                                            placeholder='Mobile number'
                                            type={'number'}
                                            name={"mobileNumber"}
                                            value={userDetails.mobileNumber}
                                            maxLength={10}
                                            onChange={(event) => {
                                                onChangeHandler(event);
                                            }}
                                        />
                                    </div>
                                    <div className='col-sm-6'>
                                        <Input
                                            heading={' Email address'}
                                            placeholder="Email address"
                                            type="email"
                                            name={"email"}
                                            disabled={true}
                                            value={userDetails.email}
                                            onChange={(event) => {
                                                onChangeHandler(event);
                                            }}
                                        />
                                    </div>
                                </div>

                                <hr className="my-4" />

                                <h6 className="heading-small text-muted mb-4">
                                    Contact information
                                </h6>

                                <div className="row">
                                    <div className='col-sm-6'>
                                        <Input
                                            heading={'Address'}
                                            placeholder="Home Address"
                                            name={"address"}
                                            value={userDetails.address}
                                            onChange={(event) => {
                                                onChangeHandler(event);
                                            }}
                                        />
                                    </div>
                                    <div className='col-sm-6'>
                                        <Input
                                            heading={'Postal code'}
                                            placeholder="Postal code"
                                            type="number"
                                            name={"pincode"}
                                            value={userDetails.pincode}
                                            onChange={(event) => {
                                                onChangeHandler(event);
                                            }}
                                        />
                                    </div>
                                </div>
                                <hr className="my-4" />

                                <h6 className="heading-small text-muted mb-4">About me</h6>
                                <div className="row">
                                    <div className='col'>
                                        <Input
                                            heading={'About Me'}
                                            placeholder="A few words about you ..."
                                            rows="4"
                                            type="textarea"
                                            name={"aboutMe"}
                                            value={userDetails.aboutMe}
                                            onChange={(event) => {
                                                onChangeHandler(event);
                                            }}
                                        />
                                    </div>
                                </div>

                                <div className="pt-3">
                                    <Button
                                        className="btn btn-facebook btn-icon-only rounded-circle mb-2"
                                        size={'md'}
                                        variant={'icon-rounded'}
                                        buttonIcon={'fab fa-facebook'}
                                        onClick={() => {
                                            setMediaType('FB')
                                            setMediaKey(getSocialMediaKey('FB'))
                                            if ('facebook_url' in socialMediaProfiles === false) {
                                                setSocialMediaProfiles({ ...socialMediaProfiles, facebook_url: '' })
                                            }
                                            setIsOpenModal(!isOpenModal)
                                        }}
                                    />
                                    <Button
                                        className="btn-google-plus btn-icon-only rounded-circle btn btn-google mb-2"
                                        size={'md'}
                                        variant={'icon-rounded'}
                                        buttonIcon={'fab fa-google-plus-g'}
                                        onClick={() => {
                                            setMediaType('GL')
                                            setMediaKey(getSocialMediaKey('GL'))
                                            if ('google_url' in socialMediaProfiles === false) {
                                                setSocialMediaProfiles({ ...socialMediaProfiles, google_url: '' })
                                            }
                                            setIsOpenModal(!isOpenModal)
                                        }}
                                    />
                                    <Button
                                        className={"btn btn-facebook btn-icon-only rounded-circle mb-2"}
                                        size={'md'}
                                        variant={'icon-rounded'}
                                        buttonIcon={'bi bi-linkedin'}
                                        onClick={() => {
                                            setMediaType('LN')
                                            setMediaKey(getSocialMediaKey('LN'))
                                            if ('linkedin_url' in socialMediaProfiles === false) {
                                                setSocialMediaProfiles({ ...socialMediaProfiles, linkedin_url: '' })
                                            }
                                            setIsOpenModal(!isOpenModal)
                                        }}
                                    />
                                    <Button
                                        className="btn-instagram btn-icon-only rounded-circle btn btn-default mb-2"
                                        size={'md'}
                                        variant={'icon-rounded'}
                                        buttonIcon={'fab fa-instagram'}
                                        onClick={() => {
                                            setMediaType('IM')
                                            setMediaKey(getSocialMediaKey('IM'))
                                            if ('instagram_url' in socialMediaProfiles === false) {
                                                setSocialMediaProfiles({ ...socialMediaProfiles, instagram_url: '' })
                                            }
                                            setIsOpenModal(!isOpenModal)
                                        }}
                                    />
                                    <Button
                                        className="btn-icon-only rounded-circle btn btn-twitter mb-2"
                                        size={'md'}
                                        variant={'icon-rounded'}
                                        buttonIcon={'fab fa-twitter'}
                                        onClick={() => {
                                            setMediaType('TR')
                                            setMediaKey(getSocialMediaKey('TR'))
                                            if ('twitter_url' in socialMediaProfiles === false) {
                                                setSocialMediaProfiles({ ...socialMediaProfiles, twitter_url: '' })
                                            }
                                            setIsOpenModal(!isOpenModal)
                                        }}
                                    />
                                    <Button
                                        className="btn-icon-only rounded-circle btn btn-dribbble mb-2"
                                        size={'md'}
                                        variant={'icon-rounded'}
                                        buttonIcon={'fab fa-dribbble'}
                                        onClick={() => {
                                            setMediaType('DE')
                                            setMediaKey(getSocialMediaKey('DE'))
                                            if ('dribble_url' in socialMediaProfiles === false) {
                                                setSocialMediaProfiles({ ...socialMediaProfiles, dribble_url: '' })
                                            }
                                            setIsOpenModal(!isOpenModal)
                                        }}
                                    />
                                </div>

                                <div className='text-right pb-3'>
                                    <Button
                                        isLoading={submitLoader}
                                        size={'md'}
                                        text={translate('common.submit')}
                                        onClick={() => {
                                            onSubmit()
                                        }}
                                    />

                                </div>
                            </Card>
                        </div>
                    ) :
                        (<div className="col-sm-12 col-12 col-md-6 col-lg-8">
                            <TimeLine
                                cardHeight={100}
                                scrollHeight={180}
                                heading={translate("timeline.title")!}
                                data={studentTasksTimeLine}
                                currentPage={currentPage}
                                numOfPages={numOfPages}
                                paginationNumberClick={(currentPage: number | undefined) => {
                                    paginationHandler("current", currentPage);
                                }}
                                previousClick={() => paginationHandler("prev")}
                                nextClick={() => paginationHandler("next")}
                            />

                        </div>)
                    }
                    <div className='col-sm-12 col-12 col-md-6 col-lg-4'>
                        <UserProfileDetails
                            isShowEdit={!dashboardDetails?.user_details?.is_faculty ? true : false}
                            isStudent={!dashboardDetails?.user_details?.is_faculty ? true : false}
                            mediaData={userDigitalProfileDetails?.details}
                            name={userProfileDetails?.details[0]?.user_personal_details?.first_name + ' ' + userProfileDetails?.details[0]?.user_personal_details?.last_name}
                            subText={userProfileDetails?.details[0]?.user_personal_details?.email}
                            mobileNumber={userProfileDetails?.details[0]?.mobile_number}
                            qualification={userProfileDetails?.details[0]?.user_educational_details?.details}
                            editOnClick={() => {
                                setIsShowEdit(true)
                            }}
                            photo={SERVER +  dashboardDetails.user_details.photo}
                        />

                    </div>
                </div>

            </div>

            <Modal
                isOpen={isOpenModal}
                onClose={() => {
                    setIsOpenModal(!isOpenModal)
                }}
            >

                <div className='mt--5 mb-2'>
                    <Button
                        style={{ fontSize: '25px', height: '50px', width: '50px' }}
                        className={getSocialMediaIcon(mediaType).class}
                        size={'lg'}
                        variant={'icon-rounded'}
                        buttonIcon={getSocialMediaIcon(mediaType).icon}
                    />
                </div>

                <div >
                    <Input
                        heading={'Profile URL'}
                        placeholder={'Profile URL'}
                        value={socialMediaProfiles && socialMediaProfiles[mediaKey]}
                        name={mediaKey && mediaKey}
                        onChange={(e) => {
                            onChangeSocialMediaHandler(e)
                        }}
                    />
                </div>

            </Modal >
        </div >
    )
}

export { StudentProfile }