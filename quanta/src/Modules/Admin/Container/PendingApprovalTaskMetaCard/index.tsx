import { icons } from "@Assets";
import { Button, Card, Image } from "@Components"
import { translate } from "@I18n"
import { DropDownMenuArrow } from "@Modules";

export const GetSoftwareDevelopmentCard = ({ data, buttonOnClick }) => {

    console.log("data GetSoftwareDevelopmentCard==>", data)

    return (
        <>
            {data?.details && data?.details.length > 0 && <Card className='pointer'>
                <div className={`d-flex justify-content-between`}>
                    <div className="col-sm-auto row">
                        <Image
                            height={35}
                            variant={'default'}
                            alt="..."
                            src={icons.softwareDev}
                        />

                        {/* {Title and description} */}

                        <div className="col mt--1">
                        {data?.details[0]?.course_details?.course_topic?.is_manditory && <span className={`text-danger mr-1`} style={{ marginLeft: '-11px' }}>●</span>}
                            {data?.details[0]?.course_details?.course_topic?.task_meta_name}

                            <div>
                                <h5 className=" font-weight-light">{data.details[0].course_details.course_section.section_name + ' | ' + data.details[0].course_details.course_topic.topic_name}</h5>
                            </div>

                        </div>
                    </div>

                    <div>
                        <Button
                            text={'View'}
                            onClick={buttonOnClick}
                        />
                    </div>
                </div>
                <div className='float-right d-flex'>
                    <Image
                        alt="..."
                        size={'sm'}
                        variant={'rounded'}
                        src={icons.profile}
                    />
                    <h4 className="mt-1 ml-2 text-muted">{data.details[0].course_details.student_name}</h4>
                </div>

            </Card>}
        </>
    )
}



export const GetVideoScreeningCard = ({ data }) => {

    return (
        <>
            <Card className='pointer'>
                <div className={`d-flex justify-content-between`}>
                    <div className="col-sm-auto row">
                        <Image
                            height={35}
                            variant={'default'}
                            alt="..."
                            src={icons.video}
                        />

                        <span className={`text-danger mr-1 ml-2`}>●</span>

                        <Image
                            height={40}
                            variant={'avatar'}
                            alt="..."
                            src={'https://a1png.com/wp-content/uploads/2021/01/ms-dhoni-6.png'}
                        />

                        {/* {Title and description} */}

                        <div className="col">
                            {data.task_meta.name}
                            <div>
                                <h5 className=" font-weight-light">{data.task_meta.description}</h5>
                            </div>

                        </div>
                    </div>
                </div>

            </Card>
        </>
    )
}

export const GetPageCard = ({ data }) => {

    return (
        <>
            <Card className='pointer'>
                <div className={`d-flex justify-content-between`}>
                    <div className="col-sm-auto row">
                        <Image
                            height={35}
                            variant={'default'}
                            alt="..."
                            src={icons.page}
                        />

                        {/* {Title and description} */}

                        <div className="col">
                            <span className={`text-danger mr-1`} style={{ marginLeft: '-11px' }}>●</span>
                            {data.task_meta.name}

                            <div>
                                <h5 className=" font-weight-light">{data.task_meta.description}</h5>
                            </div>

                        </div>
                    </div>

                </div>

            </Card>
        </>
    )
}

export const GetLinkedInCommunityCard = ({ data }) => {

    return (
        <>
            <Card >
                <div className={`d-flex justify-content-between`}>
                    <div className="col-sm-auto row">
                        <Image
                            height={35}
                            variant={'default'}
                            alt="..."
                            src={icons.linkedIn}
                        />

                        {/* {Title and description} */}

                        <div className="col">
                            <span className={`text-danger mr-1`} style={{ marginLeft: '-11px' }}>●</span>
                            {data.task_meta.details?.title}
                        </div>
                    </div>

                </div>

            </Card>
        </>
    )
}

export const GetMockInterviewCard = ({ data, buttonOnClick }) => {

    return (
        <>
            <Card className='pointer'>
                <div className={`d-flex justify-content-between`}>
                    <div className="col-sm-auto row">
                        <Image
                            height={35}
                            variant={'default'}
                            alt="..."
                            src={icons.mockInterview}
                        />

                        {/* {Title and description} */}

                        <div className="col mt--2">
                            <span className={`text-danger mr-1`} style={{ marginLeft: '-11px' }}>●</span>
                            {data?.details[0]?.mi_details?.title}

                            <div>
                                <h5 className=" font-weight-light">{data?.details[0]?.course_details?.course_section?.section_name + ' | ' + data?.details[0]?.course_details?.course_topic?.topic_name}</h5>
                            </div>

                        </div>
                    </div>

                    <div>
                        <Button
                            text={'Schedule'}
                            onClick={buttonOnClick}
                        />
                    </div>
                </div>

                <div className='float-right d-flex'>
                    <Image
                        alt="..."
                        size={'sm'}
                        variant={'rounded'}
                        src={icons.profile}
                    />
                    <h4 className="mt-1 ml-2 text-muted">{data?.details[0]?.course_details?.student_name}</h4>
                </div>

            </Card>
        </>
    )
}

export const GetSoftwareScreeningCard = ({ data, buttonOnClick }) => {

    return (
        <>
            <Card className='pointer'>
                <div className={`d-flex justify-content-between`}>
                    <div className="col-sm-auto row">
                        <Image
                            height={35}
                            variant={'default'}
                            alt="..."
                            src={icons.linkedIn}
                        />

                        {/* {Title and description} */}

                        <div className="col">
                            <span className={`text-danger mr-1`} style={{ marginLeft: '-11px' }}>●</span>
                            {data.details[0].manual_screening_details.title}

                            <div>
                                <h5 className=" font-weight-light">{data.details[0].course_details.course_section.section_name + ' | ' + data.details[0].course_details.course_topic.topic_name}</h5>
                            </div>

                        </div>
                    </div>

                    <div>
                        <Button
                            text={'Schedule'}
                            onClick={buttonOnClick}
                        />
                    </div>
                </div>

                <div className='float-right d-flex'>
                    <Image
                        alt="..."
                        size={'sm'}
                        variant={'rounded'}
                        src={icons.profile}
                    />
                    <h4 className="mt-1 ml-2 text-muted">{data.details[0].course_details.student_name}</h4>
                </div>
            </Card>
        </>
    )
}