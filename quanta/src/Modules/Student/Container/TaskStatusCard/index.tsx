import { FC } from "react";
import { Card, DropDownMenu, Image } from "@Components";
import { TaskStatusCardProps } from "./interface";

const TaskStatusCard: FC<TaskStatusCardProps> = ({ data, color = "success", dataList }) => {

    return (
        <>
            <div className={'d-flex'}>
                {dataList &&
                    dataList.map((item: any, index: number) => {
                        const { heading, subHeading, icons, shareIcon, viewIcon } = item
                        return (
                            <div className={`col-12 col-md-6 col-lg-4 zoomHover pointer`}>
                                <Card className={`bg-${color} border-0 overflow-auto scroll-hidden`} style={{ height: '120px' }}>
                                    <div className="ml--2 row justify-content-between">
                                        <div>
                                            <h5 className={'text-uppercase text-muted'}>
                                                {heading || "Performance"}
                                            </h5>
                                        </div>
                                    </div>
                                    <div className="row justify-content-between">


                                        <div className="ml-2 mt-3">
                                            <span className={'h4 font-weight-bold '}>
                                                {subHeading || "49,65%"}
                                            </span>
                                        </div>
                                        <div className="mx-3 ml-2 mt-3 justify-content-between" style={{ display: "flex", width: "60px" }}>
                                            <i className={shareIcon}></i>
                                            <div style={{ width: "10px" }}></div>
                                            <i className={viewIcon}></i>
                                        </div>

                                    </div>

                                </Card>

                            </div>
                        )
                    })
                }

            </div>
        </>
    )
}
export { TaskStatusCard };
