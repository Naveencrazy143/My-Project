import { Card, NoRecordsFound, Pagination } from '@Components';
import { DynamicHeight } from '@Hooks';
import { getTimelineRelativeTimeFormat } from '@Utils';
import { FC } from 'react';
import { BatchTimeLineProps } from "./interface";

const BatchTimeLine: FC<BatchTimeLineProps> = ({ heading, textVariant, text, badge = true, data, numOfPages, currentPage, paginationNumberClick, previousClick, nextClick }) => {

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
            <Card title={heading} className='' style={{ height: dynamicHeight.dynamicWidth <= 1400 ? dynamicHeight.dynamicHeight - 40 : dynamicHeight.dynamicHeight - 115 }}>
                <div className='scroll-hidden overflow-auto  pt-3' style={{ height: dynamicHeight.dynamicWidth <= 1400 ? dynamicHeight.dynamicHeight - 160 : dynamicHeight.dynamicHeight - 235, marginTop: '-43px' }}>

                    {data && data.length > 0 ? data.map((item: any, index: number) => {
                        return (

                            <div
                                className={`${data?.length - 1 !== index && 'timeline'} timeline-one-side pt-2 mx-3`}
                                data-timeline-axis-style="dashed"
                                data-timeline-content="axis"
                                style={{ margin: '0px 5px 0px 5px' }}
                            >
                                <div className="timeline-block">
                                    <span className={`timeline-step  ${iconBg(item?.icon_type) && `bg-${iconBg(item.icon_type)}`}`}>
                                        {iconName(item?.icon_type?.name)}
                                    </span>
                                    <div className="timeline-content">
                                        <div className='row justify-content-between'>
                                            <h5 className="mb-0">{item?.completed_topic_details?.topic_name}</h5>

                                            <small className='text-muted text-xs pr-3'>
                                                {getTimelineRelativeTimeFormat(item?.created_at)}
                                            </small>
                                        </div>
                                        <p className="text-sm mt-1 mb-0 text-wrap">
                                            {item?.completed_topic_details?.course_section_name}
                                        </p>
                                        <p className="text-xs mt-1 mb-0">
                                            {item?.completed_topic_details?.course_name}
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

export { BatchTimeLine };
