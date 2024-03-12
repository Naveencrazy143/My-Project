import { Card, NoRecordsFound, Pagination } from '@Components';
import { DynamicHeight } from '@Hooks';
import { getTimelineRelativeTimeFormat } from '@Utils';
import { FC } from 'react';
import { TimeLineProps } from "./interface";

const TimeLine: FC<TimeLineProps> = ({ heading, textVariant, text, badge = true, data, numOfPages, currentPage, paginationNumberClick, previousClick, nextClick, cardHeight = 0, scrollHeight = 0 }) => {

    const dynamicHeight: any = DynamicHeight()


    function iconBg(typeName: any) {
        const { type, name } = typeName
        if (name === 'tick') {
            return type
        }
        else if (name === 'cross') {
            return type
        }
        else if (name === 'task') {
            return type
        }
        else if (name === 'inp') {
            return type
        }
        else {
            return 'default'
        }
    }

    function iconName(type: any) {
        if (type === 'tick') {
            return <i className="bi bi-check-lg text-white"></i>
        }
        else if (type === 'cross') {
            return <i className="bi bi-x-lg text-white"></i>
        }
        else if (type === 'task') {
            return <i className="bi bi-clock-history text-white"></i>
        }
        else if (type === 'inp') {
            return <i className="bi bi-hourglass-split text-white"></i>
        }
        else {
            return <i className="bi bi-bell text-white"></i>
        }
    }



    return (
        <>
            <Card title={heading} className='' style={{
                height: dynamicHeight.dynamicWidth <= 1400 ? dynamicHeight.dynamicHeight - 2 : dynamicHeight.dynamicHeight - 0,
            }}
                CardBodyStyle={{ paddingLeft: '0px' }}
            >
                <div className='scroll-hidden overflow-auto pt-2' style={{ height: dynamicHeight.dynamicWidth <= 1400 ? dynamicHeight.dynamicHeight - 130 : dynamicHeight.dynamicHeight - 120, marginTop: '-43px' }}>

                    {data && data.length > 0 ? data.map((item: any, index: number) => {

                        return (

                            <div
                                className={`${data?.length - 1 !== index && 'timeline'} timeline-one-side pt-2 ml-4`}
                                data-timeline-axis-style="dashed"
                                data-timeline-content="axis"
                            // style={{ margin: '0px 5px 0px 5px' }}
                            >
                                <div className="timeline-block">
                                    <span className={`timeline-step  ${iconBg(item?.icon_type) && `bg-${iconBg(item.icon_type)}`}`}>
                                        {iconName(item?.icon_type?.name)}
                                    </span>
                                    <div className="mx-5" style={{ paddingLeft: 10 }}>
                                        <div className='row justify-content-between'>
                                            <div className=''>
                                                <h5 className="mb-0">{item?.title}</h5>
                                            </div>
                                            <div className=''>
                                                <small className='text-muted text-xs'>
                                                    {getTimelineRelativeTimeFormat(item?.event_time)}
                                                </small>
                                            </div>
                                        </div>
                                        <p className="text-sm mt-1 mb-0 text-wrap">
                                            {item.description}
                                        </p>
                                        <p className="text-xs mt-1 mb-0">
                                            {item.sub_text}
                                        </p>
                                        <div className="mt-3 mb-3">
                                            {/* {timeLineDetails && item.badgeName.map((el: any) => {
                                            return (
                                                <>
                                                    {badge ? <Badge color={item.badgeVariant} pill text={el} /> :
                                                        <span className={' pl-4 text-muted'}><strong>{el}</strong></span>
                                                    }
                                                </>

                                            )
                                        })} */}

                                        </div>

                                    </div>

                                </div>

                            </div>

                        )
                    }
                    )

                        :
                        <div className=''>
                            <NoRecordsFound />
                        </div>
                    }

                    
                </div>

                {data && data.length > 0 && (
                            <Pagination
                                additionalClass={'pb-3'}
                                currentPage={currentPage}
                                noOfPage={numOfPages}
                                totalPages={numOfPages}
                                paginationNumberClick={(el) => {
                                    if (paginationNumberClick) {
                                        paginationNumberClick(el)
                                    }
                                }}
                                previousClick={(val) => {
                                    if (previousClick) {
                                        previousClick(val)
                                    }
                                }}
                                nextClick={(val) => {
                                    if (nextClick) {
                                        nextClick(val)
                                    }
                                }}
                            />
                    )}

            </Card>

        </>
    )
}

export { TimeLine };
