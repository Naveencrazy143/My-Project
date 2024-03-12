import { icons } from "@Assets";
import { Button, Card, Image } from "@Components"
import { translate } from "@I18n"
import { DropDownMenuArrow } from "@Modules";
import { convertTimeToDisplayTimeFormat } from "@Utils";

export const GetSoftwareDevelopmentCard = ({ data, onEditClick, onDeleteClick }) => {


    return (
        <>
            <Card className='pointer'>
                <div className={`d-flex justify-content-between`}>
                    <div className="col-sm-auto row">
                        <Image
                            height={35}
                            variant={'default'}
                            alt="..."
                            src={icons.softwareDev}
                        />

                        {/* {Title and description} */}

                        <div className="col mt--0">
                            {data?.task_meta?.is_manditory ? <span className={`text-danger mr-1`} style={{ marginLeft: '-11px' }}>●</span> : ''}
                            {data.task_meta.name}

                            <div>
                                <h5 className=" font-weight-light">{data.task_meta.description}</h5>
                            </div>

                        </div>
                    </div>
                    <div className='pointer'>
                        <DropDownMenuArrow
                            onAddClick={onEditClick}
                            onDeleteClick={onDeleteClick}
                        />
                    </div>
                </div>


            </Card>
        </>
    )
}





export const GetVideoScreeningCard = ({ data, onEditClick, onDeleteClick }) => {

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

                        {data?.task_meta?.is_manditory ?  <span className={`text-danger mr-1 ml-2 mt--2`}>●</span> : <>&nbsp;&nbsp;&nbsp;</>}

                        <Image
                            height={40}
                            variant={'avatar'}
                            alt="..."
                            src={'https://a1png.com/wp-content/uploads/2021/01/ms-dhoni-6.png'}
                        />

                        {/* {Title and description} */}

                        <div className="col mt--1">
                            {data.task_meta.name}
                            <div>
                                <h5 className=" font-weight-light">{data.task_meta.description}</h5>
                            </div>

                        </div>
                    </div>
                    <div className='pointer'>
                        <DropDownMenuArrow
                            onAddClick={onEditClick}
                            onDeleteClick={onDeleteClick}
                        />
                    </div>
                </div>
                <div className="ml-5 mt-1">
                    <h5 className="text-muted">{convertTimeToDisplayTimeFormat(data.task_meta.details.total_video_duration)}</h5>
                </div>

            </Card>
        </>
    )
}

export const GetPageCard = ({ data, onEditClick, onDeleteClick }) => {

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

                        <div className="col mt--1">
                           {data?.task_meta?.is_manditory ?  <span className={`text-danger mr-1`} style={{ marginLeft: '-11px' }}>●</span> : ' '}
                            {data.task_meta.name}

                            <div>
                                <h5 className=" font-weight-light">{data.task_meta.description}</h5>
                            </div>

                        </div>
                    </div>

                    <div className='pointer'>
                        <DropDownMenuArrow
                            onAddClick={onEditClick}
                            onDeleteClick={onDeleteClick}
                        />
                    </div>
                </div>

            </Card>
        </>
    )
}

export const GetLinkedInCommunityCard = ({ data, onEditClick, onDeleteClick }) => {

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

                    <div className='pointer'>
                        <DropDownMenuArrow
                            onAddClick={onEditClick}
                            onDeleteClick={onDeleteClick}
                        />
                    </div>
                </div>

            </Card>
        </>
    )
}

export const GetCommunityCard = ({ data, onEditClick, onDeleteClick }) => {

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

                    <div className='pointer'>
                        <DropDownMenuArrow
                            onAddClick={onEditClick}
                            onDeleteClick={onDeleteClick}
                        />
                    </div>
                </div>

            </Card>
        </>
    )
}

export const GetMockInterviewCard = ({ data, onEditClick, onDeleteClick }) => {

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
                            {data?.task_meta?.is_manditory ? <span className={`text-danger mr-1`} style={{ marginLeft: '-11px' }}>●</span> : <>{' '}</>}
                            {data.task_meta.name}

                            <div>
                                <h5 className=" font-weight-light">{data.task_meta.description}</h5>
                            </div>

                        </div>
                    </div>

                    <div>
                        <DropDownMenuArrow
                            onAddClick={onEditClick}
                            onDeleteClick={onDeleteClick}
                        />
                    </div>

                </div>

            </Card>
        </>
    )
}

export const GetSoftwareScreeningCard = ({ data, onEditClick, onDeleteClick }) => {

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

                        <div className="col mt--1">
                            <span className={`text-danger mr-1`} style={{ marginLeft: '-11px' }}>●</span>
                            {data.task_meta.name}

                            <div>
                                <h5 className=" font-weight-light">{data.task_meta.description}</h5>
                            </div>

                        </div>
                    </div>

                    <div>
                        <DropDownMenuArrow
                            onAddClick={onEditClick}
                            onDeleteClick={onDeleteClick}
                        />
                    </div>
                </div>
            </Card>
        </>
    )
}