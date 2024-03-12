import { Back, Card, Input } from '@Components'
import { useApp } from '@Contexts'
import { useInput, useLoader, useNavigation } from '@Hooks'
import { translate } from '@I18n'
import { ListTypeComponent,Procedure,FlowDiagramHeader,CodeEditor } from '@Modules'
import { fetchStudentTasksDetailsOpen, getGuestTaskDetailsOpen, isBackNavigation, selectedGuestTaskItem, settingStudentFlowDiagramData, settingStudentProcedureData, settingStudentProgramData,  } from '@Redux'
import { SERVER } from '@Services'
import { convertToUpperCase, filteredName } from '@Utils'
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router'

const ADD = 1
const UPDATE = 2
const DELETE = 3

function StudentView() {
    const courseLoader = useLoader(false);

    const { selectedGuestTask } = useSelector(
        (state: any) => state.GuestReducer
    );


    const { id } = useParams();


    const { studentProcedureData, studentProgramData, studentFlowDiagramImage, getStudentTaskDetails
    } = useSelector((state: any) => state.DashboardReducer);

    const { goTo, goBack } = useNavigation()
    const dispatch = useDispatch();

    const [rules, setRules] = useState<any>([
        {
            id: 1, value: "", child: []
        },
    ])

    const { focus, setFocus } = useApp()


    const [question, setQuestion] = useState<string>('')
    const [sampleIOArray, setSampleIOArray] = useState<any>(
        [
            { id: 1, input: [{ id: 1, value: '' }], output: [{ id: 1, value: '' }] },
        ]
    )
    const [flowDiagreamImage, setFlowDiagreamImage] = useState<any>("")


    const [codeOutput, setCodeOutput] = useState('')


    const title = useInput('')


    /**
     * to get question added task prefilled api
     * getStudentTaskDetails is the state in reducer onClick of resume the topic tasks
     */
    useEffect(() => {
        getStudentTaskDetailsHandler()
        getDisplayStatus('')
    }, [])


    const getDisplayStatus = (key) => {
        let type: any = (new URLSearchParams(window.location.search)).get("type")
        let splitTypes = type?.match(/.{1,2}/g)
        return splitTypes?.find(it => it[0] === key) ? (splitTypes?.find(it => it[1] === 'F') ? false : true) : true
    }

    let showStatus = {
        showIO: getDisplayStatus('I'),
        showRules: getDisplayStatus('R'),
        showProcedure: getDisplayStatus('P'),
        showFD: getDisplayStatus('F')
    }

    const getStudentTaskDetailsHandler = () => {
        const params = { code: id }
        dispatch(fetchStudentTasksDetailsOpen({
            params,
            onSuccess: (success: any) => () => {
                prefillTaskDetails(success?.details)
                setFlowDiagreamImage(success?.details?.task_answer_details?.image_of_flow_diagram)
                dispatch(settingStudentProcedureData(success?.details?.task_answer_details?.procedure ? success?.details?.task_answer_details?.procedure : []))
                dispatch(settingStudentFlowDiagramData(success?.details?.task_answer_details?.flow_diagram ? success?.details?.task_answer_details?.flow_diagram : []))
                dispatch(settingStudentProgramData(success?.details?.task_answer_details?.program !== null ? window.atob(success?.details?.task_answer_details?.program) : ""))
                
                let dataString = success?.details?.task_answer_details?.code_output
                // console.log("dattataa====>",dataString)
                // Replace single quotes with double quotes in code_output string
                let jsonString = dataString.replace(/'/g, '"');

                // Replace None with null in the JSON string. coz None is for python.
                jsonString = jsonString.replace(/None/g, 'null');

                // Parse the updated JSON string
                let parseObj = JSON.parse(jsonString);
                setCodeOutput(window.atob(parseObj?.stdout))
                // console.log("parseeeee===>", parseObj)
            },
            onError: (error) => () => {
            }
        }))
    }

    const prefillTaskDetails = (editItem) => {
        console.log("editttt===>", editItem)
        title.set(filteredName(editItem?.name, 100))
        setQuestion(editItem?.details?.problem_statement)
        editItem && editItem?.details?.rules.length > 0 && setRules(editItem?.details?.rules)
        const data = editItem.details?.sample_io.map((it, index) => { return { id: index + 1, "input": it.i.map((ip, index) => { return { id: index + 1, value: ip } }), "output": it.o.map((ip, index) => { return { id: index + 1, value: ip } }) } })
        data && data.length > 0 && setSampleIOArray(data)
    }

    const emptyStates = () => {
        setQuestion('')
        setRules([
            {
                id: 1, value: "", child: []
            },
        ])
        setSampleIOArray([
            { id: 1, input: [{ id: 1, value: '' }], output: [{ id: 1, value: '' }] },
        ])
    }

    const getCurrentNode = (arr: Array<any>, id: string, current: number, updatedValue: string) => {

        const getCurrentNodeRecursive = (
            id: string,
            arr: Array<any>
        ) =>
            arr.forEach((it, index) => {
                if (it.id === id) {

                    if (current === DELETE) {
                        arr.splice(index, 1);
                    }

                    if (current === ADD) {
                        it.child = [...it.child, {
                            id: (Math.random() + 1).toString(36).substring(7), value:
                                '', child: []
                        }]
                    } else if (current === UPDATE) {
                        it.value = updatedValue
                    }
                }
                else {
                    getCurrentNodeRecursive(id, it.child);
                }
            });




        getCurrentNodeRecursive(id, arr);
        return arr;
    };



    const LiComponent = ({ item, index }) => {

        return (
            <>
                <div className="row  mt-2">
                    <div className="col">
                        {/* <h5>{typeof (item.id) == 'number' ? item.id : ''}</h5> */}
                        <textarea
                            disabled
                            id={item.id}
                            autoFocus={item.id === focus}
                            style={{ resize: "none" }}
                            cols={5}
                            className="form-control"
                            placeholder="Type Here"
                            value={item.value}
                            onFocus={(e) => {
                                var temp_value = e.target.value
                                e.target.value = ''
                                e.target.value = temp_value
                            }}
                            onChange={(e) => {
                                if (setFocus) {
                                    setFocus(item.id)
                                }
                                const updatedNode = [...getCurrentNode(rules, item.id, UPDATE, e.target.value)]
                                setRules(updatedNode)
                            }}
                        />
                    </div>
                </div>
                {
                    item.child &&
                    item.child.map(item => (
                        <div className="ml-3">
                            <LiComponent
                                index={index}
                                item={item}
                            />
                        </div>
                    ))}
            </>
        );
    };

    console.log("flowDiagreamImage==>", flowDiagreamImage);
    console.log("studentflow===>", studentFlowDiagramImage);
    
    
 
    return (
        <>
            <div className='container-fluid zoom' style={{ backgroundImage: "linear-gradient(315deg, rgb(4, 93, 233) 0%, rgb(9, 198, 500) 74%)" }} >
                <div className='row pl-xl-2 pl-lg-2 pl-sm-0 pl-4' >
                    <Back headerClass='text-white'
                        text={translate("guest.viewTask")!}
                        isViewStudent
                        onClick={() => {
                            dispatch(isBackNavigation(true))
                            dispatch(selectedGuestTaskItem({}))
                            emptyStates()
                            dispatch(isBackNavigation(true))
                            // disableCopyRightClickDnd(false)
                        }} />
                </div>

                <Card className='mt-3' style={{ backgroundColor: ' rgba(0,0,0,.75)' }}>
                    <div className='mb-3 mt--2'>
                        <h2 className='text-white'>{translate("guest.title")!}</h2>
                    </div>
                    <p className='text-white text-justify'>{title.value}</p>
                    <h2 className='text-white'>{translate("guest.question")!}</h2>

                    <p className='text-white text-justify'>{question}</p>

                </Card>

                {showStatus?.showIO && <div >
                    <Card className='' style={{ backgroundColor: ' rgba(0,0,0,.75)' }}>
                        <div>
                            {sampleIOArray && sampleIOArray?.length > 0 && sampleIOArray?.map((el) => {
                                return (
                                    <>
                                        <div className='row justify-content-between'>
                                            <h2 className='text-white ml-3'>{translate("guest.sampleI/O")!}</h2>
                                        </div>
                                        <div className='row justify-content-around '>
                                            <div>
                                                <h4 className='text-white '>{translate("guest.sampleInput")}</h4>
                                                <ul className='text-white text-justify ml--4'>
                                                    {el.input.map((it) => {
                                                        return (
                                                            <>
                                                                <li className=' font-weight-light' style={{ fontSize: '14px' }}>{it.value}</li>
                                                            </>
                                                        )
                                                    })
                                                    }
                                                </ul >
                                            </div>
                                            <div>
                                                <h4 className='text-white'>{translate("guest.sampleOutput")!}</h4>
                                                <ul className='text-white ml--4 text-justify'>
                                                    {el.output.map((it) => {
                                                        return (
                                                            <>
                                                                <li className=' font-weight-light' style={{ fontSize: '14px' }}>{it.value}</li>
                                                            </>
                                                        )
                                                    })
                                                    }
                                                </ul >
                                            </div>
                                        </div>
                                    </>
                                )
                            })

                            }
                        </div >
                    </Card>
                </div>}

                {showStatus?.showRules && <div className=''>
                    <ListTypeComponent
                        title={translate("guest.rules")!}
                        data={rules}
                    />
                </div>}

                {/* procedure */}

                {showStatus?.showProcedure &&
                    <div className=''>
                        <ListTypeComponent
                            title={translate("guest.procedure")!}
                            data={studentProcedureData && studentProcedureData?.length > 0 ? studentProcedureData : getStudentTaskDetails && getStudentTaskDetails.length>0 && getStudentTaskDetails[0]?.task_meta?.student_course_task?.procedure}
                        />
                    </div>
                }


                {showStatus?.showFD && <Card className='' style={{ backgroundColor: ' rgba(0,0,0,.75)' }}>
                    <h2 className='text-white'>{translate("guest.flowDiagram")!}</h2>
                    <div className='text-center py-5'>
                        <img src={flowDiagreamImage && SERVER + flowDiagreamImage || studentFlowDiagramImage && SERVER +  studentFlowDiagramImage} alt='...'
                            width={'25%'}
                            style={{ filter: "invert(100%)" }}></img>
                    </div>
                </Card>}


                <div className='pb-1 mx-2'>

                    <Card className='' style={{ backgroundColor: ' rgba(0,0,0,.75)' }} >
                        <div className='mb-3 mt--2'>
                            <h2 className='text-white'>{translate("guest.code")!}</h2>
                        </div>
                        <div className='col row justify-content-around'>
                            <div className='text-white col-sm-6'>
                                <p className="mb-0 font-weight-bold"><u>{'Program'}</u></p>
                                <pre className='mt-2 pl-2 overflow-auto scroll-hidden' style={{ height: '200px' }}>
                                    <code className='text-white'>{studentProgramData}</code>
                                </pre>
                            </div>
                            <div className='text-white col-sm-6'>
                                <p className="mb-0 font-weight-bold "><u>{translate("guest.output")!}</u></p>
                                <pre className='mt-2 pl-2 overflow-auto scroll-hidden' style={{ height: '200px' }}>
                                    <code className='text-white'>
                                        {codeOutput}
                                    </code>
                                </pre>
                            </div>
                        </div>
                    </Card>
                </div>
            </div>

            {/* <div className='pb-1 px-4' style={{ backgroundImage: "linear-gradient(315deg, rgb(4, 93, 233) 0%, rgb(9, 198, 500) 74%)" }}>
                
            </div> */}

        </>

    )
}

export { StudentView }

