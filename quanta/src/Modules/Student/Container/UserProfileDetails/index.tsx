import { Card, Button } from "@Components";
import { ProfilePicture } from "@Modules";
import { FC } from "react";
import { ProfileCardProps } from "./interface";
import { translate } from "@I18n";
import { DynamicHeight } from "@Hooks";


const UserProfileDetails: FC<ProfileCardProps> = ({ name, subText, bgImage, photo, height = '43vh', mobileNumber, qualification, editOnClick, mediaData, isShowEdit = false, isStudent = false }) => {
    // const { bgImage, photo, name, age, location, designation, officeName } = data
    const dynamicHeight: any = DynamicHeight()
    // console.log("phtotoo>", photo)

    const socialMediaUrls: any = mediaData !== undefined && Object.keys(mediaData).length > 0 && Object.entries(mediaData[0]).reduce((acc, [key, value]) => {
        if (value) {
            acc[key] = value;
        }
        return acc;
    }, {});

    const keysArray = socialMediaUrls && Object.keys(socialMediaUrls);

    const calculateTheScreenWidth = () => {

        const screenWidth = dynamicHeight.dynamicWidth
        let halfOfTheScreenWidth: any = isStudent ? 31 / 100 * screenWidth : 26.5 / 100 * screenWidth

        return halfOfTheScreenWidth
    }

    const handleOpenSocialMediaProfile = (url: string) => {
        const absoluteUrlPattern = /^(https?:\/\/)/i;

        if (!absoluteUrlPattern.test(url)) {
            // If the URL is relative, prepend it with http://
            url = `http://${url}`;
        }
        window.open(url, '_blank');
    };


    const getSocialMediaButton = (type) => {

        switch (type) {
            case 'facebook_url':
                return (
                    <>
                        <Button
                            className="btn btn-facebook btn-icon-only rounded-circle"
                            size={'md'}
                            variant={'icon-rounded'}
                            buttonIcon={'fab fa-facebook'}
                            onClick={() => {
                                handleOpenSocialMediaProfile(mediaData[0][type])
                            }}
                        />
                    </>
                )

            case 'google_url':
                return (
                    <>
                        <Button
                            className="btn-google-plus btn-icon-only rounded-circle btn btn-google"
                            size={'md'}
                            variant={'icon-rounded'}
                            buttonIcon={'fab fa-google-plus-g'}
                            onClick={() => {
                                handleOpenSocialMediaProfile(mediaData[0][type])
                            }}
                        />
                    </>
                )

            case 'linkedin_url':
                return (
                    <>
                        <Button
                            className="btn btn-facebook btn-icon-only rounded-circle"
                            size={'md'}
                            variant={'icon-rounded'}
                            buttonIcon={'bi bi-linkedin'}
                            onClick={() => {
                                handleOpenSocialMediaProfile(mediaData[0][type])
                            }}
                        />
                    </>
                )

            case 'instagram_url':
                return (
                    <>
                        <Button
                            className="btn-instagram btn-icon-only rounded-circle btn btn-default"
                            size={'md'}
                            variant={'icon-rounded'}
                            buttonIcon={'fab fa-instagram'}
                            onClick={() => {
                                handleOpenSocialMediaProfile(mediaData[0][type])
                            }}
                        />
                    </>
                )

            case 'twitter_url':
                return (
                    <>
                        <Button
                            className="btn-icon-only rounded-circle btn btn-twitter"
                            size={'md'}
                            variant={'icon-rounded'}
                            buttonIcon={'fab fa-twitter'}
                            onClick={() => {
                                handleOpenSocialMediaProfile(mediaData[0][type])
                            }}
                        />
                    </>
                )

            case 'dribble_url':
                return (
                    <>
                        <Button
                            className="btn-icon-only rounded-circle btn btn-dribbble"
                            size={'md'}
                            variant={'icon-rounded'}
                            buttonIcon={'fab fa-dribbble'}
                            onClick={() => {
                                handleOpenSocialMediaProfile(mediaData[0][type])
                            }}
                        />
                    </>
                )
        }
    }

    return (
        <>
            <Card className={`card-profile m-0 p-0 overflow-auto scroll-hidden`}
                // style={{ height: dynamicHeight.dynamicWidth <= 1400 ? dynamicHeight.dynamicHeight - 40 : dynamicHeight.dynamicHeight-120, width: dynamicHeight.dynamicWidth <= 992 ? dynamicHeight.dynamicWidth - 50 : calculateTheScreenWidth() }}
                style={{ height: dynamicHeight.dynamicWidth <= 1400 ? dynamicHeight.dynamicHeight -2 : dynamicHeight.dynamicHeight - 0, }}
            >
                <ProfilePicture bgImage={bgImage} photo={photo} isUserProfile editOnClick={editOnClick} isShowEdit={isShowEdit} />
                <div className="pt-5 px-3 pb-2">
                    <div className="text-center">
                        <h5 className="h2">
                            {name || 'Jessica Jones'}
                            {subText &&
                                <div className="mt--2">
                                    <span className="text-muted text-wrap" style={{fontSize:11, fontWeight:"normal" }}>{subText || ''}</span>
                                </div>
                            }
                            {mobileNumber && (
                                <div className="pt-3">
                                    <h5 className="">{mobileNumber}</h5>
                                </div>
                            )}

                            {qualification && (
                                <div className="mt--2">
                                <span className="text-muted text-wrap" style={{fontSize:11, fontWeight:"normal" }}>{qualification}</span>
                            </div>
                            )}
                        </h5>

                        <div className="">

                            {keysArray && keysArray.map((el) => {
                                return (
                                    <>
                                        {getSocialMediaButton(el)}
                                    </>
                                )
                            })}


                        </div>
                    </div>
                </div>

            </Card>


        </>
    );
}

export { UserProfileDetails };