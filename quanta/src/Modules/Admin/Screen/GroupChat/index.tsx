import React, { useEffect, useRef, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Button, Divider, Dropzone, Image, Input, InputHeading, InputWithImage, Modal, NoRecordsFound, Spinner, useKeyPress } from '@Components'
import { Card, CardBody, CardFooter, CardHeader, ListGroup, ListGroupItem, } from 'reactstrap'
import { UserOnlineStatus } from '@Modules'
import { fetchBatchChat, postBatchChat, getCourseBatches, fetchBatchUserOnlineActivityLog } from '@Redux'
import { base64ToImage, convertToUpperCase, displayDate, getDisplayTimeFromMoment, getImageUrl, getTimelineRelativeTimeFormat, } from '@Utils'
import { icons } from '@Assets'
import { DynamicHeight } from '@Hooks'
import { translate } from '@I18n'
import moment from 'moment'
import { SERVER } from '@Services'

function GroupChat() {
    const [chatText, setChatText] = useState<any>("")
    const [selectedBatchGroup, setSelectedBatchGroup] = useState<any>()
    const [isOpenUploadImageModal, setIsOpenUploadImageModal] = useState<any>(false)
    const dispatch = useDispatch()
    const { dashboardDetails, scheduleMeetingDetails, courseBatchesList, batchGroupChatDetails, batchUserActivityLogDetails } = useSelector(
        (state: any) => state.DashboardReducer
    );
    const enterPress = useKeyPress('Enter')
    const dynamicHeight: any = DynamicHeight()
    const fileInputRef = useRef<any>();
    const [image, setImage] = useState<any>([])
    let currentTime = moment().format("YYYY-MM-DD")
    var fiveMinutesAgoStatus = moment().subtract(5, 'minutes').format("YYYY-MM-DD HH:mm:ss");


    useEffect(() => {
        getCourseBatchDetails()

    }, [])

    useEffect(() => {
        if (enterPress && chatText) {
            postBatchGroupChat()
        }
    }, [enterPress])

    useEffect(() => {
        getBatchGroupChat(selectedBatchGroup)
        activeBatchUser(selectedBatchGroup)
    }, [selectedBatchGroup])

    const getCourseBatchDetails = () => {
        const params = {

        }
        dispatch(getCourseBatches({
            params,
            onSuccess: (success: any) => async () => {
                getBatchGroupChat(success?.details[0])
                activeBatchUser(success?.details[0])
                console.log("success========>", success?.details[0])
                await setSelectedBatchGroup(success?.details[0])

            },
            onError: (error: string) => () => {
            },
        }))
    }

    const activeBatchUser = (data) => {
        const params = {
            course_batch_id: data?.id,
            is_student: true
        }
        dispatch(fetchBatchUserOnlineActivityLog({
            params,
            onSuccess: (success: any) => () => {

            },
            onError: (error: string) => () => {
            },
        }))
    }

    const handleRefClick = () => {
        fileInputRef.current.click();
    };


    const uploadMultipleImgSelect = async (data) => {
        let file = data.target.files[0]
        let array: any = []
        const reader = new FileReader();
        reader.onload = async (e) => {
            let base64: any = await e.target?.result
            let encoded = base64.toString().replace(/^data:(.*,)?/, '');

            await array.push(encoded)
            await setImage([...image, ...array])
            console.log("array==========>", array)
        }
        reader.readAsDataURL(file);
    }


    const getBatchGroupChat = (data) => {
        const params = {
            course_batch_id: data?.id
        }
        dispatch(fetchBatchChat({
            params,
            onSuccess: (success: any) => () => {


            },
            onError: (error: string) => () => {
            },
        }))
    }

    const alignChatMessage = (el) => {
        let dashboardId = dashboardDetails?.user_details?.employee_id
        if (dashboardId === el?.event_by?.id) {
            return true
        }
        else {
            return false
        }
    }

    const postBatchGroupChat = () => {
        const params = {
            course_batch_id: selectedBatchGroup?.id,
            message: chatText,
            batch_attachments: [
                {
                    name: "attachments",
                    attachments: image
                }
            ]
        }
        console.log("params===>", params)
        dispatch(postBatchChat({
            params,
            onSuccess: (success: any) => () => {
                getBatchGroupChat(selectedBatchGroup)
                setChatText('')
                setImage([])

            },
            onError: (error: string) => () => {
            },
        }))
    }

    const activeStatus = (value) => {
        if (value) {
            const convert = moment(value).format("YYYY-MM-DD HH:mm:ss")
            console.log("fiveMinutesAgoStatus", fiveMinutesAgoStatus, "convert", convert);

            if (fiveMinutesAgoStatus < convert) {
                return true
            }
        }

        else {
            return false
        }

    }

    const findLastActiveAt = (value) => {

        if (value) {
            const convert = moment(value).format("YYYY-MM-DD")

            if (fiveMinutesAgoStatus < convert) {
                return ''
            }
            else {

                if (convert === currentTime) {
                    return getTimelineRelativeTimeFormat(value)
                }
                else {
                    return getTimelineRelativeTimeFormat(value)
                }
            }
        }

        else {
            return ''
        }

    }

    console.log("dashboardDetails", dynamicHeight.dynamicWidth)
    // dynamicHeight.dynamicWidth <= 1400 ? "000000" : "9999999" )


    return (
        <>
            <div className='container-fluid pt-2'>
                <div className='row'>
                    {courseBatchesList && courseBatchesList.length > 0 && courseBatchesList.map((el) => {
                        return (
                            <>
                                <Card
                                    className={` ${el?.id === selectedBatchGroup?.id ? "bg-primary" : "bg-white"} ml-3  pointer `}
                                    onClick={() => {
                                        setSelectedBatchGroup(el)
                                    }}
                                    style={{
                                        width:'13rem'
                                    }}
                                  
                                >
                                    <div className='col d-flex justify-content-center align-items-center'>
                                        {true && <Image className='ml--1' variant={'rounded'} src={"http://192.168.15.126:8001/uploads/employee_document/file-1d30443a-488f-43e3-bf3c-c1233e5e5e4c.png"} size={'xs'} />}
                                        <small className={` ml-2  ${el?.id === selectedBatchGroup?.id ? "text-white" : ""}`}><div className='text-xs'>{el.batch_name}</div> <div className='text-xs'>{'#' + el.batch_code}</div></small>
                                    </div>
                                </Card>
                            </>
                        )
                    })}
                </div>
                <Card
                    className=''
                    style={{
                        height: dynamicHeight.dynamicWidth <= 1400 ? dynamicHeight.dynamicHeight - 40 : dynamicHeight.dynamicHeight - 255
                    }}
                >
                    <div className='row'>

                        <div className={` col-sm-9  p-0 m-0 `}>
                            <Card
                                style={{
                                    height: dynamicHeight.dynamicWidth <= 1400 ? dynamicHeight.dynamicHeight - 40 : dynamicHeight.dynamicHeight - 175
                                }}>
                                <CardHeader>
                                    <div className='row justify-content-between mx-2'>
                                        <h3>{selectedBatchGroup?.batch_name}</h3>
                                        <div className=''
                                            onClick={() => {
                                                // setShowActiveStatus(!showActiveStatus)
                                            }}
                                        >
                                            <i className="bi bi-people-fill text-primary fa-lg pointer"></i>
                                        </div>
                                    </div>
                                </CardHeader>
                                <CardBody
                                    id="scrollableDiv"
                                    style={{
                                        height: "100%",
                                        display: 'flex',
                                        flexDirection: 'column-reverse',
                                    }}
                                    className={'overflow-auto scroll-hidden'}
                                >
                                    {
                                        batchGroupChatDetails && batchGroupChatDetails?.length > 0 && batchGroupChatDetails?.map((el, index) => {
                                            const today = new Date();
                                            const date = new Date(el?.created_at);
                                            const formattedDate = displayDate(el?.created_at);

                                            const isFirstMessage = index === 0;
                                            const previousDate: any = !isFirstMessage ? new Date(batchGroupChatDetails[index - 1]?.created_at) : null;
                                            const isFirstMessageOfDay = isFirstMessage || date.toDateString() !== previousDate.toDateString();
                                            const isDifferentDay = !isFirstMessage && date?.getDate() !== previousDate?.getDate();
                                            // const dateToShow = isFirstMessageOfDay ? "Today" : isDifferentDay ? formattedDate : null;
                                            const dateToShow = isDifferentDay ? formattedDate : null;



                                            console.log("999999999999", dateToShow)
                                            return (
                                                <>
                                                    <div className=''>
                                                        {dateToShow && el?.message && (
                                                            <h5 className="text-center font-weight-light text-primary mb-3">
                                                                {`- - - - - - - ${dateToShow} - - - - - - -`}
                                                            </h5>
                                                        )}

                                                    </div >
                                                    <div
                                                        className={`d-flex flex-row ml-2 ${alignChatMessage(el)
                                                            ? " justify-content-end mb-2 pt-2  "
                                                            : " justify-content-start mb-3 pt-2 "
                                                            } mt--3 `}
                                                    >
                                                        <div>
                                                            {!alignChatMessage(el) && (el?.message || el.attachments.length > 0) && (
                                                                <>
                                                                    <div className='row '>
                                                                        <Image
                                                                            variant="rounded"
                                                                            className=""
                                                                            size="sm"
                                                                            src={!alignChatMessage(el) && SERVER + el?.event_by?.profile_image || icons.profileBlack}
                                                                            alt="avatar 1"
                                                                        />
                                                                        <small className='ml-2 pt-1'>
                                                                            <h6
                                                                                style={{
                                                                                    fontSize: '12px'
                                                                                }}
                                                                            >{el.event_by.name}</h6>
                                                                            <div className='mt--2 '
                                                                                style={{
                                                                                    fontSize: '10px'
                                                                                }}
                                                                            >
                                                                                {getDisplayTimeFromMoment(el?.created_at)}
                                                                            </div>
                                                                        </small>
                                                                    </div>
                                                                </>
                                                            )
                                                            }
                                                            {!alignChatMessage(el) &&
                                                                <div className=''>
                                                                    <div className='ml-4 mt-2'
                                                                        style={{
                                                                            display: "flex",
                                                                            flexDirection: 'row'
                                                                        }}
                                                                    >
                                                                        <p
                                                                            className={`small px-2   text-wrap bg-lighter text-dark`}
                                                                            style={{
                                                                                maxWidth: '70vh',
                                                                                borderRadius: '0px 8px 8px 8px'
                                                                            }}
                                                                        >
                                                                            {!alignChatMessage(el) && el?.message && (
                                                                                <div className="h5 text-primary mb--1 pt-2">
                                                                                    {el?.by_user?.name}
                                                                                </div>
                                                                            )}
                                                                            {el.message?.length > 40 ? (
                                                                                <>
                                                                                    {el.message}
                                                                                </>
                                                                            ) : (
                                                                                el?.message && <div className="p-1">{el?.message}</div>
                                                                            )}
                                                                        </p>
                                                                    </div>
                                                                    <div className={`row ${alignChatMessage(el) ? "mr-1" : 'ml-1 mt--2 mb-3'}`}
                                                                        style={{
                                                                            maxWidth: '70vh'
                                                                        }}
                                                                    >
                                                                        {
                                                                            el.attachments && el.attachments.map((it) => {
                                                                                return (
                                                                                    <div className='mr-2 pt-2' style={{

                                                                                    }}>
                                                                                        <Image
                                                                                            width={70}
                                                                                            height={70}
                                                                                            src={getImageUrl(it?.attachment_file)}
                                                                                        />
                                                                                    </div>
                                                                                )
                                                                            })
                                                                        }
                                                                    </div>

                                                                </div>}
                                                            {alignChatMessage(el) && (el?.message || el.attachments.length > 0) && (
                                                                <div className=''
                                                                    style={{
                                                                        display: "flex",
                                                                        flexDirection: 'row-reverse'
                                                                    }}>
                                                                    <Image
                                                                        variant="rounded"
                                                                        className=""
                                                                        size="sm"
                                                                        src={alignChatMessage(el) && SERVER + el?.event_by?.profile_image || icons.profileBlack}
                                                                        alt="avatar 1"
                                                                    />
                                                                    <small className='mr-2 pt-1'>
                                                                        <h6
                                                                            style={{
                                                                                fontSize: '12px'
                                                                            }}
                                                                        >{el.event_by.name}</h6>
                                                                        <div className='mt--2 text-right'
                                                                            style={{
                                                                                fontSize: '10px'
                                                                            }}
                                                                        >
                                                                            {getDisplayTimeFromMoment(el?.created_at)}
                                                                        </div>
                                                                    </small>
                                                                </div>
                                                            )}
                                                            {alignChatMessage(el) &&
                                                                <div className=''>
                                                                    <div className=' mt-2'
                                                                        style={{
                                                                            display: "flex",
                                                                            flexDirection: 'row-reverse',
                                                                            marginRight: '34px'
                                                                        }}>
                                                                        <p
                                                                            className={`small px-2   text-wrap bg-comment text-white`}
                                                                            style={{
                                                                                maxWidth: '50vh',
                                                                                borderRadius: '8px 0px 8px 8px'
                                                                            }}
                                                                        >
                                                                            {!alignChatMessage(el) && el?.message && (
                                                                                <div className="h5 text-primary mb--1 pt-2">
                                                                                    {el?.by_user?.name}
                                                                                </div>
                                                                            )}

                                                                            {el?.message !== "" && <div className="p-1">{el?.message}</div>}
                                                                        </p>


                                                                    </div>
                                                                    {<div className={`row ${alignChatMessage(el) ? "mr-1 mb-3" : 'ml-1'}`}
                                                                        style={{
                                                                            maxWidth: '70vh',
                                                                            display: "flex",
                                                                            flexDirection: 'row-reverse'
                                                                        }}
                                                                    >
                                                                        {
                                                                            el.attachments && el.attachments.map((it) => {
                                                                                console.log("090090909", getImageUrl(it?.attachment_file))
                                                                                return (
                                                                                    <div className='mr-2 pt-2' style={{

                                                                                    }}>
                                                                                        <Image
                                                                                            width={70}
                                                                                            height={70}
                                                                                            src={getImageUrl(it?.attachment_file)}
                                                                                        />
                                                                                    </div>
                                                                                )
                                                                            })
                                                                        }
                                                                    </div>}
                                                                </div>}
                                                        </div >
                                                    </div>

                                                </>
                                            )
                                        })

                                    }


                                </CardBody>
                                <CardFooter className=''>
                                    <div className='d-flex'>
                                        {/* <Image
                                            variant='rounded'
                                            size='md'
                                            src={dashboardDetails?.user_details?.photo}
                                            alt="avatar 1"
                                        /> */}
                                        <div className=''>
                                            <i className="bi bi-plus-circle-fill text-primary fa-2x pointer"
                                                onClick={() => {
                                                    setIsOpenUploadImageModal(!isOpenUploadImageModal)
                                                }}
                                            ></i>
                                        </div>


                                        <input type="text"
                                            style={{
                                                borderRadius: '15px'
                                            }}
                                            placeholder='write message'
                                            className="form-control form-control-md mx-3 "
                                            id="exampleFormControlInput1"
                                            autoComplete="off"
                                            onChange={(val) => {
                                                setChatText(val.target.value)
                                            }}
                                            value={chatText}
                                        />

                                        <div className=" mr-1"
                                            style={{
                                                marginTop: '9px'
                                            }}
                                            onClick={() => {
                                                postBatchGroupChat()
                                            }}
                                        >
                                            <div>

                                                <i className={`fas fa-paper-plane text-info fa-lg pointer`}

                                                ></i>
                                            </div>
                                        </div>
                                    </div>
                                </CardFooter>
                            </Card>

                        </div>
                        {<div className='col-sm-3 p-0 m-0'>
                            <Card
                                className='p-3 '
                                style={{
                                    height: dynamicHeight.dynamicWidth <= 1400 ? dynamicHeight.dynamicHeight - 40 : dynamicHeight.dynamicHeight - 175,
                                }}

                            >

                                <div className="row">
                                    <div className="col">
                                        <h3>{translate("admin.activeStatus")}</h3>
                                        {
                                            <div className="mt-3 mb--4 ">
                                                <InputWithImage image="search" placeholder={translate("auth.search")!}
                                                    onChange={(text: string) => {

                                                    }}
                                                    onClick={() => {

                                                    }}
                                                // onBlur={onBlur}
                                                // onFocus={onFocus}
                                                />
                                            </div>
                                        }
                                    </div>
                                    {/* <div className="text-right pr-3">
                                    <Button text={isAddClick ? translate("course.hide") : translate("course.view")} size={'sm'} onClick={() => {
                                        
                                    }}
                                    />
                                </div> */}
                                </div>

                                {<div className={`mt-3 overflow-auto scroll-hidden `}
                                    style={{ height: dynamicHeight.dynamicWidth <= 1400 ? dynamicHeight.dynamicHeight - 165 : dynamicHeight.dynamicHeight - 220 }}

                                >

                                    {batchUserActivityLogDetails && batchUserActivityLogDetails.length > 0 ?
                                        batchUserActivityLogDetails.map((item: any) => {

                                            return (
                                                <>
                                                    {/* {isLoading &&
                                                    <div className="mt--6 ml--3">
                                                        <Spinner />
                                                    </div>
                                                } */}

                                                    {
                                                        <ListGroup className="list my--3" flush>
                                                            <ListGroupItem className="ml--2">
                                                                <div className="row align-items-center ml-2">
                                                                    <img
                                                                        style={{
                                                                            objectFit: "fill",
                                                                            opacity: activeStatus(item.last_active_time) ? '' : "0.4",
                                                                            borderRadius: '50%',
                                                                            width: '12%',
                                                                            height: '12%'
                                                                        }}
                                                                        alt="..."
                                                                        src={SERVER + item?.user_photo}
                                                                    />
                                                                    <small className='ml-3 '>
                                                                        <h4 className={`text-${activeStatus(item.last_active_time) ? 'black' : "muted"} mb-0 h5`}>
                                                                            {convertToUpperCase(item.user_details.name)}
                                                                        </h4>
                                                                        <div className="row m-0">
                                                                            <span className={`text-${activeStatus(item.last_active_time) ? 'success' : "muted"} mr-1`}>●</span>
                                                                            <h6 className={`text-${activeStatus(item.last_active_time) ? 'success' : 'muted'} ls-1`} style={{ marginTop: 6 }}>{item.last_active_time && activeStatus(item.last_active_time) ? 'ONLINE' : 'OFFLINE'}</h6>
                                                                        </div>
                                                                        <div>
                                                                            {/* <h6>{item.last_active_time ? activeStatus(item.last_active_time) ? "" : `Last active:  ${findLastActiveAt(item.last_active_time)}` : ''}</h6> */}
                                                                            {/* <h6>
                                                                                {item.last_active_time ?
                                                                                    activeStatus(item.last_active_time) ? "" :
                                                                                        <span className="text-muted">Last Active: {findLastActiveAt(item.last_active_time)}</span> :
                                                                                    ''}
                                                                            </h6> */}
                                                                        </div>
                                                                    </small>

                                                                    {/* </div> */}
                                                                </div>
                                                            </ListGroupItem>
                                                        </ListGroup >
                                                    }

                                                </>

                                            )
                                        }) :
                                        <div className=" d-flex justify-content-center align-items-center mt--5" style={{
                                            height: '77.6vh'
                                        }}>

                                            <NoRecordsFound />
                                        </div>
                                    }
                                </div>}
                            </Card>


                        </div>}
                    </div >

                </Card >
            </div >
            <Modal
                margin={'ml-1'}
                title={''}
                isOpen={isOpenUploadImageModal}
                onClose={() => {
                    setIsOpenUploadImageModal(!isOpenUploadImageModal)
                }}>
                <div className='container  mt--5  '>
                    <div className=''>
                        <div className=''>
                            <InputHeading
                                heading={"Name"}
                                id='Name'
                            />
                            <Input
                                id='Name'
                            />
                        </div>
                        <div>
                            <input
                                style={{ display: "none" }}
                                type='file'
                                accept="image/*"
                                multiple
                                ref={fileInputRef}
                                onChange={(e) => {
                                    uploadMultipleImgSelect(e)
                                }}
                            />

                            <div className='row ml-2'>
                                <div className='pt-3'>
                                    <Image
                                        src={icons.productPhoto}
                                        variant='rounded'
                                        onClick={handleRefClick}
                                        size={"md"}
                                    />
                                </div>
                                {
                                    image && image.length > 0 && image.map((el) => {
                                        console.log("kkkkkkkkk", base64ToImage(el))
                                        return (
                                            <div className='col-sm-2 py-2'>
                                                <Image
                                                    src={`data:image/jpeg;base64,${el}`}
                                                    alt='...'
                                                    width={60}
                                                    height={60}
                                                />
                                            </div>
                                        )
                                    })
                                }
                            </div>
                        </div>

                    </div>
                    <div className='text-right pt-4'>
                        <Button
                            text={"Submit"}
                            onClick={() => {
                                setIsOpenUploadImageModal(!isOpenUploadImageModal)
                            }}
                        />
                    </div>
                </div>
            </Modal>
        </>
    )
}

export { GroupChat }