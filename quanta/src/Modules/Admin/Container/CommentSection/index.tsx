import { icons } from '@Assets';
import { Button, Card, Image } from '@Components';
import { translate } from '@I18n';
import { displayDate, getDisplayTimeFromMoment } from '@Utils';
import React from 'react';
import { useSelector } from 'react-redux';
import { CardFooter } from 'reactstrap';
import { CommentSectionProps } from './interface';

function CommentSection({
    name = 'You',
    message,
    isSender,
    senderSrc = icons.profileBlack,
    receiverSrc = icons.profileBlack,
    onClick, height = "60vh",
    onChange,
    value,
    onRefresh,
    isLoading,
    messageLength,
    onPopUp,
    onPopClose,
    isPopUp,
    id,
    ...rest
}: CommentSectionProps) {

    const { dashboardDetails
    } = useSelector(
        (state: any) => state.DashboardReducer
    );

    // const messagesRef = useRef(null);
    // const textInputRef = useRef(null);

    const alignChatMessage = (el) => {
        let dashboardId = dashboardDetails?.user_details?.employee_id
        if (dashboardId === el?.by_user?.id) {
            return true
        }
        else {
            return false
        }
    }

    // function handleElementClick() {
    //     const messages: any = messagesRef.current;
    //     const textInput: any = textInputRef.current;
    //     // setIsExpanded(true);
    //     messages.scrollTop = messages.scrollHeight;
    //     textInput.focus();
    //   }

    return (
        <div className='container-fluid ' >
            {id && <div className='position-fixed bottom-2 start-0 end-0'>
                <Button
                    className='rounded-circle'
                    color='primary'
                    variant={'icon-rounded'}
                    size={'lg'}
                    buttonIcon={'ni ni-chat-round'}
                    onClick={
                        onPopUp
                    }
                />

            </div>}
            <section className={`chat-section ${isPopUp ? 'blur' : ''}`} >
                <div className="container" style={{
                    display: isPopUp ? '' : 'none',
                    position: 'fixed',
                    bottom: '0',
                    // right: '-20px',
                    top: '',
                    zIndex: '9',

                }} >

                    <div className="row d-flex justify-content-start " >
                        <div className="col-sm-0 col-11 col-lg-4 col-xl-4">

                            <Card className=''>
                                <div className="card-header d-flex align-items-center p-3 mx--4 mt--3">
                                    <div className="mr-auto">
                                        <h5 className="mb-0 h4">{translate("common.chat")}</h5>
                                    </div>
                                    <span className='fa-lg' onClick={onRefresh}>
                                        {isLoading ? <i className="fas fa-spinner fa-spin text-primary"></i>
                                            : <i className="bi bi-arrow-clockwise text-primary"></i>}
                                    </span>
                                    <span className='fa-lg' onClick={onPopUp}><i className="ni ni-fat-remove text-primary"></i></span>
                                </div>

                                <div className="card-body overflow-auto scroll-hidden chat-Design mx--4" style={{ position: "relative", height: height }}>
                                    {message && message.length > 0 && message.map((el, index) => {
                                        const today = new Date();
                                        const date = new Date(el?.created_at);
                                        const formattedDate = displayDate(el?.created_at);

                                        const isFirstMessage = index === 0;
                                        const previousDate: any = !isFirstMessage ? new Date(message[index - 1]?.created_at) : null;
                                        const isFirstMessageOfDay = isFirstMessage || date.toDateString() !== previousDate.toDateString();
                                        const isDifferentDay = !isFirstMessage && date?.getDate() !== previousDate?.getDate();
                                        // const dateToShow = isFirstMessageOfDay ? "Today" : isDifferentDay ? formattedDate : null;
                                        const dateToShow = isDifferentDay ? formattedDate : null;



                                        // const dateToShow = formattedDate
                                        return (
                                            <div key={el.id}>
                                                {dateToShow && el?.message && (
                                                    <h5 className="text-center font-weight-light text-primary mb-3">
                                                        {`- - - - - - - ${dateToShow} - - - - - - -`}
                                                    </h5>
                                                )}
                                                <div
                                                  
                                                    className={`d-flex flex-row ${alignChatMessage(el)
                                                        ? "d-flex justify-content-end mb-4 pt-1 "
                                                        : "justify-content-start mb-3 pt-1 "
                                                        } mt--3 `}
                                                >
                                                    {!alignChatMessage(el) && el?.message && (
                                                        <Image
                                                            variant="rounded"
                                                            className="ml--3"
                                                            size="sm"
                                                            src={!alignChatMessage(el) && el.user_photo || receiverSrc}
                                                            alt="avatar 1"
                                                        />
                                                    )}
                                                    <div  style={{ maxWidth: "70%" }}>
                                                        <div>
                                                            <p
                                                                className={`small px-2 mr-1 mb-1 rounded text-wrap ${alignChatMessage(el)
                                                                    ? " mr-1 bg-comment text-white"
                                                                    : " ml-1 bg-lighter text-dark"
                                                                    } `}
                                                            >
                                                                {!alignChatMessage(el) && el?.message && (
                                                                    <div className="h5 text-primary mb--1 pt-2">
                                                                        {el?.by_user?.name}
                                                                    </div>
                                                                )}
                                                                {el.message?.length > 40 ? (
                                                                    <div>
                                                                        {el.message?.substring(0, 40)}
                                                                        {el.message
                                                                            ?.substring(40)
                                                                            .split(" ")
                                                                            .reduce((acc, val) => {
                                                                                if ((acc[acc.length - 1] + val).length > 40) {
                                                                                    acc.push(val);
                                                                                } else {
                                                                                    acc[acc.length - 1] += ` ${val}`;
                                                                                }
                                                                                return acc;
                                                                            }, [""])
                                                                            .map((line, i) => (
                                                                                <React.Fragment key={i}>
                                                                                    {i > 0 && <br />}
                                                                                    {line}
                                                                                </React.Fragment>
                                                                            ))}
                                                                    </div>
                                                                ) : (
                                                                    el?.message && <div className="p-1">{el?.message}</div>
                                                                )}
                                                                {el?.message && (
                                                                    <p
                                                                        className={`small ${!alignChatMessage(el) ? "text-muted" : "text-white"
                                                                            } text-right d-block`}
                                                                    >
                                                                        {getDisplayTimeFromMoment(el?.created_at)}
                                                                    </p>
                                                                )}
                                                            </p>
                                                        </div>
                                                    </div>
                                                    {alignChatMessage(el) && el?.message && (
                                                        <Image
                                                            className="mr--3"
                                                            variant="rounded"
                                                            size="sm"
                                                            src={alignChatMessage(el) && el.user_photo || receiverSrc}
                                                            alt="avatar 1"
                                                        />
                                                    )}
                                                </div>
                                            </div>

                                        )
                                    })
                                    }
                                </div>

                                <CardFooter className=" text-muted  d-flex justify-content-start align-items-center mb--4 mx--4">
                                    <Image variant='rounded' size='md' src={dashboardDetails?.user_details?.photo || receiverSrc}
                                        alt="avatar 1" />
                                    <input type="text"
                                        className="form-control form-control-md mx-3 "
                                        id="exampleFormControlInput1"
                                        placeholder={translate("common.typeMessage")!}
                                        autoComplete="off"
                                        onChange={(val) => {
                                            if (onChange) {
                                                onChange(val)
                                            }
                                        }}
                                        value={value}
                                    />
                                    <span className="ms-3 mr-1" onClick={onClick} ><i className={`fas fa-paper-plane text-info ${messageLength && messageLength.length > 0 ? '' : 'disabled'}`}></i></span>
                                </CardFooter>
                            </Card>

                        </div>
                    </div>

                </div >
            </section >
        </div >
    )
}
export { CommentSection };

