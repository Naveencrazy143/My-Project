import { Button, Card } from "@Components";
import { ProfilePicture } from "@Modules";
import { FC } from "react";
import { ProfileCardProps } from "./interface";
import { getDisplayDateFromMoment } from "@Utils";
import { translate } from "@I18n";
import { Progress } from "reactstrap";


const ProfileCard: FC<ProfileCardProps> = ({ courseName, subText, bgImage, photo, buttonOnClick, startDate, endDate, disable = false, buttonSize2, buttonText2, buttonOnClick2, isAdmin = false,
    assignDate, height = '43vh', buttonText, buttonSize, cursor = 'pointer', length = 60, subLength = 150, className, completed = 0, total }) => {
    // const { bgImage, photo, name, age, location, designation, officeName } = data

    const getSubstringedSubTitle = (text) => {
        if (text?.length > length) {
            return text.substring(0, subLength) + '...'
        }
        else {
            return text
        }

    }

    return (
        <>
            <Card className={` card-profile m-0 p-0 zoomHover ${className}`} style={{ height: height, cursor: cursor }}>
                <ProfilePicture bgImage={bgImage} photo={photo} />
                <div className="pt-4 px-3 pb-2">
                    <div className="text-center">
                        <h5 className="h3">
                            {courseName || 'Jessica Jones'}
                            {subText &&
                                <div className="pt-3">
                                    <h6 className="text-muted text-wrap ">{`${getSubstringedSubTitle(subText) || ''}`}</h6>
                                </div>
                            }
                        </h5>
                        {startDate && !disable && (
                            <div className="row justify-content-between pt-4">
                                <div>
                                    <h5>{translate("common.startDate")!} <i className={`bi bi-calendar-${startDate ? 'check-fill' : 'minus-fill'} ml-1 ${startDate ? 'text-success' : 'text-danger'}`}></i></h5>
                                    <div className="text-center">
                                        <h6>{getDisplayDateFromMoment(startDate) || '-'}</h6>
                                    </div>
                                </div>
                                <div>

                                    <h5>{translate("common.endDate")!}<i className={`bi bi-calendar-${endDate ? 'check-fill' : 'minus-fill'} ml-2 ${endDate ? 'text-success' : 'text-danger'}`}></i> </h5>
                                    <div className="text-center">
                                        <h6>{getDisplayDateFromMoment(endDate) || '-'}</h6>
                                    </div>
                                </div>
                            </div>
                        )}

                        {!startDate && !disable && (
                            <div>
                                <h4>{'Yet to start'}</h4>
                                <div>
                                    <h6 className="ls-1">{`You have been registered with this course on (${getDisplayDateFromMoment(assignDate)}) date, please click START NOW to proceed`}</h6>
                                </div>
                            </div>
                        )}

                    </div>

                </div>

                {completed ? <div className="">
                    <Progress
                        className="progress-xs"
                        max={`${total}`}
                        value={`${completed}`}
                        color="success"
                    />
                </div> : <></>}

                {buttonText && (
                    <div className=" d-flex position-absolute fixed-bottom  justify-content-center mb-3" style={{ zIndex: 'unset' }}>
                        <Button
                            size={buttonSize}
                            text={buttonText}
                            onClick={(e) => {
                                if (buttonOnClick) {
                                    buttonOnClick(e)
                                }
                            }}
                        />
                        {isAdmin && <Button
                            size={buttonSize2}
                            text={buttonText2}
                            onClick={(e) => {
                                if (buttonOnClick2) {
                                    buttonOnClick2(e)
                                }
                            }}
                        />}
                    </div>
                )}

            </Card>


        </>
    );
}

export { ProfileCard };