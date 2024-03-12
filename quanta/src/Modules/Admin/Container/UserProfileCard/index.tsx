import { icons, Images } from '@Assets';
import { Button } from '@Components';
import { translate } from '@I18n';
import { Card, CardImg } from 'reactstrap';
import { UserProfileCardProps } from './interface';

function UserProfileCard({ name, dateOfJoining, positiveCount, negativeCount, photo, studentData }: UserProfileCardProps) {

    return (
        <>
            <Card className="card-profile" >
                <CardImg
                    alt="..."
                    src={Images?.coverPhoto}
                    top
                />
                <div className="row justify-content-center">
                    <div className="col-sm-3">
                        <div className="card-profile-image">
                            <a href="#pablo" onClick={(e) => e.preventDefault()}>
                                <img
                                    height={'100vh'}
                                    width={'100vh'}
                                    alt="..."
                                    className="rounded-circle"
                                    src={photo || icons?.productPhoto}
                                />
                            </a>
                        </div>
                    </div>
                </div>
                <div className="text-center px-4 border-0 pt-5 pt-md-4 pb-0 pb-md-4">
                    <div className="d-flex justify-content-between">
                        <Button
                            className="mr-4"
                            color="success"
                            onClick={(e) => e.preventDefault()}
                            size="sm"
                            text={`${translate("remarks.positive")!}\n(${positiveCount || 0})`}
                        >

                        </Button>
                        <Button
                            className="float-right"
                            color="danger"
                            onClick={(e) => e.preventDefault()}
                            size="sm"
                            text={`${translate("remarks.negative")!} \n (${negativeCount || 0})`}
                        >

                        </Button>
                    </div>
                </div>
                <div className="pt-0">
                    {/* <Row>
                  <div className="col">
                    <div className="card-profile-stats d-flex justify-content-center">
                      <div>
                        <span className="heading">22</span>
                        <span className="description">Friends</span>
                      </div>
                      <div>
                        <span className="heading">10</span>
                        <span className="description">Photos</span>
                      </div>
                      <div>
                        <span className="heading">89</span>
                        <span className="description">Comments</span>
                      </div>
                    </div>
                  </div>
                </Row> */}
                    <div className="text-center ">
                        <h5 className="h3">
                            {name}
                            {/* <span className="font-weight-light">, 27</span> */}
                        </h5>
                        <div className="h5 font-weight-300">
                            <i className="ni location_pin" />
                            {dateOfJoining}
                        </div>
                        <div className='mb-4'>
                            <div className='mt-4'>
                                <h5 className="h3">
                                    {studentData && studentData?.student_course.length > 1 ? translate("common.courses")! : translate("auth.course")!}
                                </h5>
                            </div>
                            {studentData && studentData?.student_course.length > 0 && studentData?.student_course.map((item: any) => {
                                return (
                                    <div className="h5 font-weight-300">
                                        <i className="ni location_pin" />
                                        {item?.course?.name}
                                    </div>
                                )
                            })}
                        </div>
                    </div>
                </div>
            </Card>
        </>
    )
}

export { UserProfileCard };

