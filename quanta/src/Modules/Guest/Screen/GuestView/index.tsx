import { Back, Card, Input } from '@Components'
import { useApp } from '@Contexts'
import { useInput, useLoader, useNavigation } from '@Hooks'
import { translate } from '@I18n'
import { ListTypeComponent, Procedure, FlowDiagramHeader, CodeEditor } from '@Modules'
import { getGuestTaskDetailsOpen, isBackNavigation, selectedGuestTaskItem, settingStudentFlowDiagramData, settingStudentProcedureData, settingStudentProgramData } from '@Redux'
import { convertToUpperCase, filteredName } from '@Utils'
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router'

const ADD = 1
const UPDATE = 2
const DELETE = 3

function GuestView() {
    const courseLoader = useLoader(false);

    const { selectedGuestTask } = useSelector(
        (state: any) => state.GuestReducer
    );


    const { id } = useParams();


    const { studentProcedureData, studentProgramData,
    } = useSelector((state: any) => state.DashboardReducer);

    console.log("selectedGuestTask==>", selectedGuestTask)
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
    const title = useInput('')
    const [codeOutput, setCodeOutput] = useState('')



    /**
     * to get question added task prefilled api
     * getStudentTaskDetails is the state in reducer onClick of resume the topic tasks
     */
    useEffect(() => {
        getGuestTaskDetails()
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

    const getGuestTaskDetails = () => {
        const params = { "code": id }

        dispatch(getGuestTaskDetailsOpen({
            params,
            onSuccess: (success) => () => {
                // console.log("sucuccguest==>", success)
                prefillTaskDetails(success?.details)
                title.set(filteredName(success?.name, 20))

                setFlowDiagreamImage(success?.task_answer_details?.image_of_flow_diagram)
                dispatch(settingStudentProcedureData(success?.task_answer_details?.procedure ? success?.task_answer_details?.procedure : []))
                dispatch(settingStudentFlowDiagramData(success?.task_answer_details?.flow_diagram ? success?.task_answer_details?.flow_diagram : []))
                dispatch(settingStudentProgramData(success?.task_answer_details?.program !== null ? atob(success?.task_answer_details?.program) : ""))

                let dataString = success?.task_answer_details?.code_output
                // console.log("dattataa====>",dataString)
                // Replace single quotes with double quotes in code_output string
                let jsonString = dataString.replace(/'/g, '"');

                // Replace None with null in the JSON string. coz None is for python.
                jsonString = jsonString.replace(/None/g, 'null');

                // Parse the updated JSON string
                let parseObj = JSON.parse(jsonString);
                setCodeOutput(atob(parseObj?.stdout))
                // console.log("parseeeee===>", parseObj)
            },
            onError: (error) => () => {
            }
        }))
    }

    const prefillTaskDetails = (editItem) => {
        setQuestion(editItem?.problem_statement)
        editItem && editItem.rules.length > 0 && setRules(editItem?.rules)
        const data = editItem.sample_io.map((it, index) => { return { id: index + 1, "input": it.i.map((ip, index) => { return { id: index + 1, value: ip } }), "output": it.o.map((ip, index) => { return { id: index + 1, value: ip } }) } })
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

    const onChangeInputHandler = (value: string, parentIndex: number, childIndex: number) => {
        let updatedSampleInput = [...sampleIOArray]
        updatedSampleInput[parentIndex].input[childIndex].value = value
        setSampleIOArray(updatedSampleInput)
    }

    const onChangeOutputHandler = (value: string, parentIndex: number, childIndex: number) => {
        let updatedSampleInput = [...sampleIOArray]
        updatedSampleInput[parentIndex].output[childIndex].value = value
        setSampleIOArray(updatedSampleInput)

    }


    const onSubmitClick = () => {
        let input: any = { inputA: [], outputA: [] }
        let finalValue = sampleIOArray.map((el: any) => {
            el.input.map((it: any) => {
                input.inputA = [...input.inputA, it.value]
            })
            el.output.map((it: any) => {
                input.outputA = [...input.outputA, it.value]
            })
        })
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
                            placeholder={translate("common.typeHere")!}
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

    const renderInput = () => {
        return rules && rules.length > 0 && rules?.map((item: any, index: number) => {
            return <LiComponent key={item?.id} item={item} index={index} />
        })
    }

    return (
        <>
            <div className='container-fluid zoom' style={{ backgroundImage: "linear-gradient(315deg, rgb(4, 93, 233) 0%, rgb(9, 198, 500) 74%)" }}>
                <div className='row pl-xl-2 pl-lg-2 pl-sm-0 pl-4' >
                    <Back headerClass='text-white' text={translate("guest.viewTask")!} isViewStudent onClick={() => {
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

                {/* {showStatus?.showIO && <div>
                    {sampleIOArray && sampleIOArray.length > 0 && sampleIOArray.map((el, parentIndex) => {
                        return (

                            <Card className='pb-3'>
                                <div className='mb--3'>
                                    <div className='row '>
                                        <div className='col  mt--1'>
                                            <h3 className='text-info'>{` ${el.id} : ${translate("guest.sampleI/O")}`}</h3>
                                        </div>
                                    </div>
                                    <>
                                        <div className='ml-3 mt-2 '>
                                            <div className='row'>
                                                <div className='col-sm-6 '>

                                                    <label className='h3 ml--3 text-info d-block d-xl-none'>{translate("guest.sampleInput")}</label>
                                                    {el && el?.input?.length > 0 && el.input.map((element, childIndex) => {
                                                        return (
                                                            <div className='row mr--3'>
                                                                <div className='col pr-2'>
                                                                    <Input
                                                                        disabled
                                                                        className=''
                                                                        style={{ marginLeft: '-16px' }}
                                                                        placeholder={'Type here'}
                                                                        value={element.value}
                                                                    />

                                                                </div>
                                                            </div>
                                                        )
                                                    })}
                                                </div>
                                                <div className='col-sm-6 ml-xl-0 ml--3 mt-xl-0 mt-3'>
                                                    <label className='h3 text-info d-block d-xl-none'>{translate("guest.sampleOutput")}</label>
                                                    {el && el?.output?.length > 0 && el.output.map((element, childIndex) => {
                                                        return (
                                                            <div key={element} className='row'>
                                                                <div className='col'>
                                                                    <Input
                                                                        disabled
                                                                        className=''
                                                                        style={{ marginLeft: '' }}
                                                                        value={element.value}
                                                                        placeholder={'Type here'}
                                                                    />

                                                                </div>

                                                            </div>
                                                        )
                                                    })}
                                                </div>

                                            </div>
                                        </div>
                                    </>
                                </div>
                            </Card>
                        )
                    })}
                </div>} */}

                {showStatus?.showIO && <div >
                    <Card className='' style={{ backgroundColor: ' rgba(0,0,0,.75)' }}>
                        <div>
                            {sampleIOArray && sampleIOArray?.length > 0 && sampleIOArray?.map((el) => {
                                return (
                                    <>
                                        <div className='row justify-content-between'>
                                            <h2 className='text-white ml-3'>{"Sample I/O"}</h2>
                                        </div>
                                        <div className='row justify-content-around '>
                                            <div>
                                                <h4 className='text-white '>{"Sample Input"}</h4>
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
                                                <h4 className='text-white'>{"Sample Output"}</h4>
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

                {/* {showStatus?.showRules && <Card>
                    <div className='col mb--2'>
                        <h3 className='text-info ml--3 mt--2'>{translate("guest.rules")!}</h3>
                    </div>
                    <form id="create-form">
                        <div className="row">
                            <div className="col-sm-12 pr-sm-5">
                                <div
                                    id="tabs-icons-text"
                                    role="tablist">
                                    {
                                        renderInput()
                                    }
                                </div>
                            </div>
                        </div>
                    </form>
                </Card>} */}

                {showStatus?.showRules && <div className=''>
                    <ListTypeComponent
                        title={translate("guest.rules")!}
                        data={rules}
                        id='RT'
                    />
                </div>}

                {/* procedure */}

                {/* {showStatus?.showProcedure && <div className='mx-sm--4'>
                    <Procedure
                        value={studentProcedureData}
                        disabled={true}
                    />
                </div>} */}

                {showStatus?.showProcedure && <div className=''>
                    <ListTypeComponent
                        title={translate("guest.procedure")!}
                        data={studentProcedureData}
                    />
                </div>}

                {/* flow diagram image */}
                {/* {showStatus.showFD && <div className='mx-sm--4 text-white' >
                    <FlowDiagramHeader img={flowDiagreamImage} isGuest showAddSubmit />
                </div>} */}

                {showStatus?.showFD && <Card className='' style={{ backgroundColor: ' rgba(0,0,0,.75)' }}>
                    <h4 className='text-white'>{translate("guest.flowDiagram")!}</h4>
                    <div className='text-center py-5'>
                        <img src={flowDiagreamImage} alt='...'
                            width={'25%'}
                            style={{ filter: "invert(100%)" }}></img>
                    </div>
                </Card>}

                {/* Code editor */}



                {/* <div className=' p-0 pb-4 px--5 container-fluid d-flex' style={{ pointerEvents: 'none' }}>
                    <CodeEditor
                        value={studentProgramData}
                        showAddSubmit
                        onSubmit={(code) => {
                            dispatch(settingStudentProgramData(btoa(code)))

                        }}
                    />
                </div> */}


                <div className='pb-1'>
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


        </>

    )
}

export { GuestView }

