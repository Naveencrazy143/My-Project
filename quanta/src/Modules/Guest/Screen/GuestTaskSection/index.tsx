import { Button, Card, Checkbox, CommonTable, DropDown, InputWithImage, Modal, NoRecordsFound } from '@Components'
import { DynamicHeight, useNavigation } from '@Hooks'
import { AdminNavbar } from '@Modules'
import { fetchGuestTasks, selectedGuestTaskItem, settingStudentFlowDiagramData, settingStudentProcedureData, settingStudentProgramData, setGuestTaskCode, isBackNavigation } from '@Redux'
import { GUEST_PATH } from '@Routes'
import { convertToUpperCase, filteredName, getDisplayDateWithTimeFromMoment, showToast } from '@Utils'
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { CopyToClipboard } from 'react-copy-to-clipboard';
import { translate } from '@I18n'

const VIEW_TYPE = [
    { id: "IF", name: 'include IT' },
    { id: "RF", name: 'include RT' },
    { id: "PF", name: 'include PT' },
    { id: "FF", name: 'include FT' },
]

const IDE_TYPE = [
    { id: "JS", name: 'JavaScript' },
    { id: "HTML", name: 'HTML' },
    { id: "CSS", name: 'CSS' },
]


function GuestTaskSection() {
    const { goTo } = useNavigation()
    const dispatch = useDispatch()
    const dynamicHeight: any = DynamicHeight()


    const { guestTasks, selectedGuestTask, guestTaskCode } = useSelector(
        (state: any) => state.GuestReducer
    );
    const { dashboardDetails, isBack } = useSelector(
        (state: any) => state.DashboardReducer
    );
    const [isViewOpen, setIsViewOpen] = useState(false)
    const [server, setServer] = useState('')
    const [checkedViewType, setCheckedViewType] = useState<any>([])
    const [urlWithQueryParams, setUrlWithQueryParams] = useState('')
    const [isCopied, setIsCopied] = useState(false)
    const [isSelectIdeModalOpen, setIsSelectIdeModalOpen] = useState(false)
    const [selectedIde, setSelectedIde] = useState('JS')

    useEffect(() => {
        if (!isBack) {
            getGuestTasks()
        }
        else {
            dispatch(isBackNavigation(false))
        }
    }, [])

    useEffect(() => {
        dispatch(settingStudentProcedureData([]))
        dispatch(settingStudentProgramData(undefined))
    }, [])

    function checkedViewTypeHandler(evt: any) {
        const isChecked = evt.target.checked;
        if (isChecked) {
            let filtered = checkedViewType.filter((item: any) => item !== evt.target.id)
            setCheckedViewType(filtered)
            setIsCopied(false)
        }
        else {
            setCheckedViewType([...checkedViewType as never, evt.target.id as never])
            setIsCopied(false)
        }
    }

    let queryParams = ''
    checkedViewType.forEach((el: string) => {
        queryParams += el
    })

    useEffect(() => {
        setUrlWithQueryParams(server + '?type=' + queryParams)
    }, [queryParams])

    const getGuestTasks = () => {
        const params = {}

        dispatch(fetchGuestTasks({
            params,
            onSuccess: (success) => () => {
            },
            onError: (error) => () => {
            }
        }))
    }

    const getUrlLink = (el: any) => {
        const currentUrl = window.location.href;
        const url = currentUrl.lastIndexOf('/')
        const finalUrl = currentUrl.substring(0, url)
        const serverUrl = `${finalUrl}/programming/task/${el?.task_meta_details.code}`
        dispatch(setGuestTaskCode(el.task_meta_details.code))
        setServer(serverUrl)
        setIsViewOpen(true)
    }

    const normalizedTaskData = (data: any) => {
        return data.map((el: any) => {
            // console.log("eleemnt==>", el)
            return {
                [`${translate("common.task")!}`]: convertToUpperCase(filteredName(el?.task_meta_details?.name, 30)),
                [`${translate("guest.createdAt")!}`]: getDisplayDateWithTimeFromMoment(el?.taskSWD_details?.created_at),
                [`${translate("guest.savedAt")!}`]: getDisplayDateWithTimeFromMoment(el?.taskSWD_details?.updated_at),
                [`${translate("common.status")!}`]: <Button size="sm"
                    text={translate("common.continue")}
                    onClick={() => {
                        goTo(GUEST_PATH.GUEST_QUESTION_CREATION, false)
                        dispatch(selectedGuestTaskItem(el))
                        dispatch(settingStudentProgramData(''))
                        dispatch(isBackNavigation(false))
                        dispatch(settingStudentProcedureData(el?.task_answer_details?.procedure))
                        dispatch(settingStudentProgramData(el?.task_answer_details?.program ? atob(el.task_answer_details.program) : ""))
                    }
                    }
                />,
                ' ': <i className="bi bi-share-fill fa-lg text-primary pointer" onClick={() => {
                    getUrlLink(el)
                }}></i>,

                '  ': <i className="bi bi-eye-fill fa-lg text-primary pointer" onClick={() => {
                    dispatch(setGuestTaskCode(el.task_meta_details.code))
                    dispatch(selectedGuestTaskItem(el))
                    dispatch(isBackNavigation(false))
                    dispatch(settingStudentProcedureData(el?.task_answer_details?.procedure))
                    dispatch(settingStudentProgramData(el?.task_answer_details?.program ? atob(el.task_answer_details.program) : ""))

                    goTo(GUEST_PATH.GUEST_VIEW + `/${el.task_meta_details.code}`, false)
                }}
                ></i>

            };
        });
    };

    return (
        <>
            <div className='pb-2 zoom' >
                <AdminNavbar isShowToggle={true} userName={dashboardDetails?.user_details?.name} />
            </div>
            <div className='container-fluid pt-4  zoom'>

                <Card className=' ' style={{ height: dynamicHeight.dynamicWidth <= 1400 ? dynamicHeight.dynamicHeight - 60 : dynamicHeight.dynamicHeight - 130 }}>

                    <div className="row pb-2" >
                        <div className='col'>
                            <div className='float-right d-flex'>
                                <Button
                                    color="primary"
                                    onClick={() => {
                                        setIsSelectIdeModalOpen(true)
                                    }}
                                    size="sm"
                                    text={translate("guest.startNewTask")}
                                />
                            </div>
                        </div>
                    </div>
                    {guestTasks && guestTasks?.details?.length > 0 ? <div className="overflow-auto scroll-hidden" style={{ height: dynamicHeight.dynamicWidth <= 1400 ? dynamicHeight.dynamicHeight - 122 : dynamicHeight.dynamicHeight - 200, marginLeft: '-39px', marginRight: '-39px' }}>
                        <CommonTable displayDataSet={normalizedTaskData(guestTasks.details)}
                        />
                    </div>
                        :
                        <div className=" d-flex justify-content-center align-items-center mt--5" style={{ height: dynamicHeight.dynamicWidth <= 1400 ? dynamicHeight.dynamicHeight - 70 : dynamicHeight.dynamicHeight - 130 }}>
                            <NoRecordsFound />
                        </div>
                    }

                </Card>
            </div>


            <Modal isOpen={isViewOpen} onClose={() => {
                setUrlWithQueryParams(server)
                setCheckedViewType([])
                setIsViewOpen(false)
                setIsCopied(false)
            }} title={''} titleClassname={'text-muted fw-light'}
            >
                <div className="mt--4 ml--1">
                    <CopyToClipboard text={queryParams ? urlWithQueryParams : server}>
                        <InputWithImage
                            image={`clipboard-${isCopied ? 'check-fill' : 'fill'} pointer`}
                            onClick={() => {
                                setIsCopied(true)
                            }}
                            value={queryParams ? urlWithQueryParams : server}
                        />
                    </CopyToClipboard>
                </div>
                <div className='col'>
                    <div className='flex-wrap  d-flex'>
                        {VIEW_TYPE.map((el: any) => {
                            return (
                                <div className=' col-sm-4'>
                                    <Checkbox
                                        id={el.id}
                                        text={el.name}
                                        onCheckChange={(e) => {
                                            checkedViewTypeHandler(e)
                                        }}
                                        checked={!checkedViewType.includes(el?.id)}
                                    />
                                </div>
                            )
                        })
                        }
                    </div>
                </div>
                <div className='text-center'>
                    <CopyToClipboard text={queryParams ? urlWithQueryParams : server}>
                        <Button
                            text={translate("guest.copy")}
                            onClick={() => {
                                setIsCopied(true)
                            }}
                        />
                    </CopyToClipboard>
                </div>
            </Modal>


            <Modal isOpen={isSelectIdeModalOpen} onClose={() => {
                setIsSelectIdeModalOpen(false)
            }} title={'Select IDE'}
            >
                <div className='text-center'>
                </div>
                <DropDown
                    placeholder='Select IDE'
                    data={IDE_TYPE}
                    onChange={(e) => setSelectedIde(e.target.value)}
                    value={selectedIde}
                />
                <div className='text-right mt-4'>
                    <Button
                        text={'Start'}
                        onClick={() => {
                            goTo(GUEST_PATH.GUEST_QUESTION_CREATION, false)
                            dispatch(settingStudentProcedureData([]))
                            dispatch(settingStudentProgramData(''))
                            dispatch(settingStudentFlowDiagramData(''))
                            dispatch(isBackNavigation(false))
                        }}
                    />
                </div>
            </Modal>
        </>
    )
}

export { GuestTaskSection }

