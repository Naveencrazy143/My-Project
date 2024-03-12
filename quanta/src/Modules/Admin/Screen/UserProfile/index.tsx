import { EditProfile, ProfileCard, ProfileHeader, ProgressTrackCard, UserProfileDetails } from "@Modules"

const UserProfile = ({ mediaData, userDetails }) => {

    return (
        <div>
            <ProfileHeader name={userDetails.details[0].user_personal_details.first_name + ' ' + userDetails.details[0].user_personal_details.last_name}/>
            <div className='m-4 mt--6'>
                <div className='row'>
                    <div className='col-lg-8'>
                        {/* <UserStatusCard /> */}
                        <div >
                            <EditProfile />
                        </div>
                    </div>
                    <div className='col-lg-4'>
                        <UserProfileDetails
                            mediaData={mediaData}
                            name={userDetails.details[0].user_personal_details.first_name + ' ' + userDetails.details[0].user_personal_details.last_name}
                            subText={userDetails.details[0].user_personal_details.email}
                            mobileNumber={userDetails.details[0].mobile_number}
                            qualification={userDetails.details[0].user_educational_details.details}
                            editOnClick={() => {
                                //  setIsShowEdit(true)
                            }}
                        />

                    </div>
                </div>

            </div>

        </div>
    )
}

export { UserProfile }
