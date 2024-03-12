import { Images } from "@Assets";
import { Button, Card, Image } from "@Components";
import { FC } from "react";
import { CardBody, CardImg } from "reactstrap";
import { ProfilePictureProps } from "./interface";
import { SERVER } from "@Services";

const ProfilePicture: FC<ProfilePictureProps> = ({ bgImage, photo, children, onClick, isUserProfile = false, editOnClick, isShowEdit }) => {
    console.log("phtoto=>", photo);
    
    return (
        <>
            <div className="mx--4 mt--4">
                {isUserProfile && (
                    <CardImg
                        alt="..."
                        src={bgImage || Images.mountain}
                        top
                        height={'250vh'}

                    />
                )}
                <div className="row justify-content-center">
                    <div className="order-lg-2 col-lg-3" >
                        <div className="card-profile-image">
                            {/* <Image
                                src={photo || Images.angular}
                                variant={'rounded'}
                                size={'xl'}

                            /> */}
                            <img
                                style={{ border: '4px solid rgba(253, 248, 248, 0.947)' }}
                                alt="..."
                                className="rounded-circle"
                                src={photo || 'https://tse1.mm.bing.net/th?id=OIP.sZIpYrRJV4_mCFtPwpws8QHaE8&pid=Api&P=0&h=180'}
                                height={isUserProfile ? 140 : 85}
                                width={isUserProfile ? 200 : 85}
                            />
                        </div>
                    </div>
                </div>

                {isUserProfile && isShowEdit ? (
                    <div className="text-right mr-4 mt-2">
                        <i className="bi bi-pencil text-info pointer"
                            onClick={editOnClick}
                        ></i>
                    </div>
                ) : <div className="mt-4"></div>}
            </div>
        </>
    );
}

export { ProfilePicture };

