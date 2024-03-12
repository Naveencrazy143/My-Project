import { icons } from '@Assets'
import { Back, Button, Card, Checkbox, Image, Input, Modal } from '@Components'
import { useApp } from '@Contexts'
import { useLoader, useNavigation } from '@Hooks'
import { translate } from '@I18n'
import {CodeEditor,FlowDiagramHeader,Procedure} from '@Modules'
import { downloadTaskTYpe, fetchGuestTaskDetails, fetchGuestTasks, fetchStudentCourseTasks, fetchTaskDetails, fetchTaskObject, getTaskDetails, isBackNavigation, postAddTaskByGuest, postTaskByStudent, selectedGuestTaskItem, setCodeOutputData, settingProcedureData, settingStudentFlowDiagramData, settingStudentProcedureData, settingStudentProgramData } from '@Redux'
import { GUEST_PATH } from '@Routes'
import { convertToUpperCase, disableCopyRightClickDnd, filteredDescription, filteredName, showToast } from '@Utils'
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

const ADD = 1
const UPDATE = 2
const DELETE = 3


const VIEW_TYPE = [
    { id: "QT", name: 'include QT' },
    { id: "IT", name: 'include IT' },
    { id: "RT", name: 'include RT' },
    { id: "PT", name: 'include PT' },
    { id: "FT", name: 'include FT' },
    { id: "CT", name: 'include CT' }
]

function GuestQuestionCreation() {
    const courseLoader = useLoader(false);

    const { courseTopicName, taskDetails, getStudentTaskDetails, studentFlowDiagramData, } = useSelector(
        (state: any) => state.DashboardReducer
    );

    const { selectedGuestTask, codeOutputData } = useSelector(
        (state: any) => state.GuestReducer
    );

    const { studentProcedureData, studentProgramData, isExpandCodeEditor, isBack } = useSelector((state: any) => state.DashboardReducer);

    const { goTo, goBack } = useNavigation()
    const dispatch = useDispatch();

    const [rules, setRules] = useState<any>([
        {
            id: 20, value: "", child: []
        },
    ])

    const [headerTitle, setHeaderTitle] = useState('')

    const [title, setTitle] = useState('')
    const [code, setCode] = useState<any>('')

    const [focus, setFocus] = useState('')
    const [question, setQuestion] = useState<string>('')
    const [sampleIOArray, setSampleIOArray] = useState<any>(
        [
            { id: 1, input: [{ id: 1, value: '' }], output: [{ id: 1, value: '' }] },
        ]
    )
    const [questionSubmitLoader, setQuestionSubmitLoader] = useState(false)
    const [checkedTaskType, setCheckedTaskType] = useState<any>([])
    const [ioSubmitLoader, setIoSubmitLoader] = useState(false)
    const [rulesSubmitLoader, setRulesSubmitLoader] = useState(false)
    const [procedureSubmitLoader, setProcedureSubmitLoader] = useState(false)
    const [codeSubmitLoader, setCodeSubmitLoader] = useState(false)

    const [flowDiagreamImage, setFlowDiagreamImage] = useState<any>("")
    const [codeOutput, setCodeOutput] = useState('')





    /** question submission api----------------------------------------------------********************
     */


    // useEffect(() => {
    //     disableCopyRightClickDnd(true)
    //     return () => {
    //         disableCopyRightClickDnd(false)
    //         dispatch(setCodeOutputData(''))

    //     }
    // }, []);

    /**
     * 1. add question api
     * 2. on success calling getcoursetask function to filter all 'my tasks ids' with this success id
     */

    const addTaskByStudent = () => {

        if (title === '') {
            showToast('error', 'Title field cannot be empty')
        }
        else if (question === '') {
            showToast('error', 'Question field cannot be empty')
        }
        else {
            setHeaderTitle(title)
            setQuestionSubmitLoader(true)
            const params = {
                problem_statement: question,
                task_meta_type:"SWD",
                name: title,
            }

            dispatch(postAddTaskByGuest({
                params,
                onSuccess: (success) => () => {
                    setQuestionSubmitLoader(false)
                    showToast('success', success?.message)
                    if (success?.details?.task_meta_id) {
                        getGuestTasks(success?.details?.task_meta_id)
                    }
                },
                onError: (error) => () => {
                    setQuestionSubmitLoader(false)
                    showToast('error', error)
                }
            }))
        }
    }

    const getGuestTasks = (questionId) => {
        const params = {}

        dispatch(fetchGuestTasks({
            params,
            onSuccess: (success) => () => {
                // console.log("itemguesr==>",success)
                const filteredData = success?.details?.filter((item: any) => item?.task_meta_details?.id === questionId)
                dispatch(selectedGuestTaskItem(filteredData[0]))

            },
            onError: (error) => () => {
            }
        }))
    }

    // to update end time in guest list 
    const getGuestTasksAfterSubmit = () => {
        const params = {}

        dispatch(fetchGuestTasks({
            params,
            onSuccess: (success) => () => {
                // console.log("succccprocedureee===>",success)
                dispatch(settingStudentProcedureData(success?.details[0]?.task_answer_details?.procedure))
            },
            onError: (error) => () => {
            }
        }))
    }

    // function checkedCourseHandler(course) {
    //     const mappedCourse = course.map((item) => {
    //         return item.id
    //     })

    // }
    // console.log("checkeeddddddd-->", registeredCourses)

    function checkedCoursesHandler(evt: any) {
        const isChecked = evt.target.checked;
        if (isChecked) {
            setCheckedTaskType([...checkedTaskType as never, evt.target.id as never])
        } else {
            let filtered = checkedTaskType.filter(item => item !== evt.target.id)
            setCheckedTaskType(filtered)
        }
    }

    /**
     * to get question added task prefilled api
     * getStudentTaskDetails is the state in reducer onClick of resume the topic tasks
     */
    // console.log("selectedGuestTask===>",selectedGuestTask)
    useEffect(() => {
        if (selectedGuestTask?.task_meta_details?.id) {
            getGuestTaskDetails()
        }

    }, [])

    const getGuestTaskDetails = () => {
        const params = {
            task_meta_id: selectedGuestTask?.task_meta_details?.id,
        }

        dispatch(fetchGuestTaskDetails({
            params,
            onSuccess: (success) => () => {
                console.log("successsss===>",success)
                prefillTaskDetails(success?.details)
                setFlowDiagreamImage(success?.details?.task_answer_details?.image_of_flow_diagram)
                dispatch(settingStudentProcedureData(success?.details?.task_answer_details?.procedure ? success?.details?.task_answer_details?.procedure : []))
                dispatch(settingStudentFlowDiagramData(success?.details?.task_answer_details?.flow_diagram ? success?.details?.task_answer_details?.flow_diagram : []))
                dispatch(settingStudentProgramData(success?.details?.task_answer_details?.program !== null ? atob(success?.details?.task_answer_details?.program) : ""))
                dispatch(setCodeOutputData(success?.details?.task_answer_details?.code_output ? success?.details?.task_answer_details?.code_output : ""))

                let dataString = success?.task_answer_details?.code_output
                // console.log("dattataa====>",dataString)
                // Replace single quotes with double quotes in code_output string
                let jsonString = dataString.replace(/'/g, '"');

                // Replace None with null in the JSON string. coz None is for python.
                jsonString = jsonString.replace(/None/g, 'null');

                // Parse the updated JSON string
                let parseObj = JSON.parse(jsonString);
                setCodeOutput(parseObj)
            },
            onError: (error) => () => {
            }
        }))
    }

    const prefillTaskDetails = (editItem) => {
        // console.log("editwitem==>",editItem)
        setHeaderTitle(editItem?.name)
        setTitle(editItem?.name)
        setQuestion(editItem?.details?.problem_statement)
        editItem && editItem?.details?.rules.length > 0 && setRules(editItem?.details?.rules)
        const data = editItem?.details?.sample_io.map((it, index) => { return { id: index + 1, "input": it.i.map((ip, index) => { return { id: index + 1, value: ip } }), "output": it.o.map((ip, index) => { return { id: index + 1, value: ip } }) } })
        data && data.length > 0 && setSampleIOArray(data)
        // setCode(editItem?.task_answer_details?.code_output)
    }



    const emptyStates = () => {
        setQuestion('')
        setRules([
            {
                id: 20, value: "", child: []
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

    //---------------------------- validation ---------------------------------//

    const validatePoseParams = (type: string) => {
        // console.log("validatePoseParams",data);

        let input = false
        let output = false
        sampleIOArray.forEach((item: any) => {

            item.input.forEach((it: any) => {
                if (it.value.length === 0) {
                    input = false
                }
                else {
                    input = true
                }
            })
            item.output.forEach((it: any) => {
                if (it.value.length === 0) {
                    output = false
                }
                else {
                    output = true
                }
            })
        })

        if (question === '') {
            showToast('error', "Question Field Cannot be empty")
            return
        }
        else {
            onSubmit('', type)
        }
    }

    const updateLoaderState = (type: string, value: boolean) => {
        if (type === 'Qu') {
            setQuestionSubmitLoader(value)
        } else if (type === 'Io') {
            setIoSubmitLoader(value)
        } else if (type === 'Rl') {
            setRulesSubmitLoader(value)
        } else if (type === 'Pr') {
            setProcedureSubmitLoader(value)
        } else if (type === 'Cd') {
            setCodeSubmitLoader(value)
        }
    }

    const onSubmit = (procedureData: any, type: string) => {

        const sampleIOArrayApiStructure = sampleIOArray && sampleIOArray?.length > 0 && sampleIOArray?.map((it: any) => { return { "i": it?.input.map((ip: any) => ip?.value), "o": it?.output?.map((ip: any) => ip.value) } })
        updateLoaderState(type, true)
        const params = {
            id: selectedGuestTask?.task_meta_details?.id,
            problem_statement: question,
            name: title,
            rules: rules,
            sample_io: sampleIOArrayApiStructure,
            procedure: studentProcedureData.length > 0 ? studentProcedureData : procedureData,
            program: studentProgramData && btoa(studentProgramData),
            code_output: codeOutputData ? (codeOutputData) : ""
        }

        dispatch(postAddTaskByGuest({
            params,
            onSuccess: (success: any) => () => {
                updateLoaderState(type, false)
                showToast('success', success.message)
                getGuestTasksAfterSubmit() // to update end time in guest task section

            },
            onError: (error: any) => () => {
                updateLoaderState(type, false)
                if (error?.status_code === 0) {
                    showToast('error', error?.error_message)
                }
            },
        }))

    }

    const LiComponent = (item, index) => {

        return (
            <>
                <div className="row mt-2">
                    <div className="col">
                        <h5>{typeof (item.id) == 'number' ? item.id : ''}</h5>
                        <textarea
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
                                    const updatedNode = [...getCurrentNode(rules, item.id, UPDATE, e.target.value)]
                                    setRules(updatedNode)
                                }

                            }}
                        />
                    </div>
                    <div className="mt-4 d-none d-xl-block">
                        <div onClick={() => {
                            let updatedNode = [...getCurrentNode(rules, item.id, DELETE, '')]
                            setRules(updatedNode)

                        }}>
                            {item.id !== 1 && (
                                <div>
                                    <Image src={icons.deleteGrey} height={20} onClick={() => { }} />
                                </div>
                            )}
                        </div>
                        <div className='mt-sm-2 float-right'>
                            <Button
                                text={'Add Sub'}
                                size={"sm"}
                                onClick={() => {
                                    let updatedNode = [...getCurrentNode(rules, item.id, ADD, '')]
                                    setRules(updatedNode)
                                }}
                            />
                        </div>
                    </div>
                    <div className="mt-xl-4 mt-sm-0 mt-3 col-sm-12 d-block d-sm-none">
                        <span onClick={() => {
                            let updatedNode = [...getCurrentNode(rules, item.id, DELETE, '')]
                            setRules(updatedNode)

                        }}>
                            {item.id !== 1 && (
                                <span className='float-right'>
                                    <Image src={icons.deleteGrey} height={20} onClick={() => { }} />
                                </span>
                            )}
                        </span>
                        <div className='mt-sm-2 mr-2 float-right'>
                            <Button
                                text={'Add Sub'}
                                size={"sm"}
                                onClick={() => {
                                    let updatedNode = [...getCurrentNode(rules, item.id, ADD, '')]
                                    setRules(updatedNode)
                                }}
                            />
                        </div>
                    </div>

                </div>
                {
                    item.child &&
                    item.child.map((item: any, index: number) => (
                        <div className="ml-3">
                            {LiComponent(item, index)}

                        </div>
                    ))}
            </>
        );
    };

    // const renderInput = () => {
    //     return rules && rules.length > 0 && rules?.map((item: any, index: number) => {
    //         return <LiComponent key={item?.id} item={item} index={index} />
    //     })
    // }
// console.log("studentProgramData==>",studentProgramData)
    return (
        <>
            {!isExpandCodeEditor && (
                <div className='container-fluid'>
                    <div className='row pl-xl-2 pl-lg-2 pl-sm-0 pl-4' >
                        {/* <Back text={selectedGuestTask?.id ? selectedGuestTask.name : 'Add Task'} /> */}
                        <Back text={selectedGuestTask?.task_meta_details?.id ? filteredName(headerTitle, 49) : translate("guest.addTask")!}
                            onClick={() => {
                                dispatch(isBackNavigation(true))
                                dispatch(selectedGuestTaskItem({}))
                                emptyStates()
                            }}
                        />
                    </div>

                    <Card className='mt-3'>
                        <div className='mb-3 mt--2'>
                            <h3 className='text-info'>{translate("guest.question")!}</h3>
                        </div>
                        <Input
                            id={'Title'}
                            heading={translate("guest.title")!}
                            placeholder={'Title'}
                            value={convertToUpperCase(title)}
                            onChange={(e) => { setTitle(convertToUpperCase(e.target.value)) }}
                        />
                        <textarea
                            className="form-control"
                            placeholder={translate("guest.typeTheQuestion")!}
                            value={question}
                            onChange={(e) => {
                                if (setFocus) {
                                    setFocus('')
                                }
                                setQuestion(convertToUpperCase(e.target.value))
                            }}
                            style={{ resize: 'none', height: '15vh' }}
                        />
                        <Button
                            className='float-right mb-4 mt-4 mb--1 '
                            isLoading={questionSubmitLoader}
                            text={translate("common.save")}
                            size={"md"}
                            onClick={() => {
                                if (setFocus) {
                                    setFocus('')
                                }
                                if (!questionSubmitLoader) {
                                    selectedGuestTask?.id ? validatePoseParams('Qu') : addTaskByStudent()
                                }
                            }}
                        />


                    </Card>

                    {(selectedGuestTask?.task_meta_details?.id) && <div>
                        {sampleIOArray && sampleIOArray.length > 0 && sampleIOArray.map((el, parentIndex) => {
                            return (

                                <Card className='pb-3'>
                                    <div className='mb--3'>
                                        <div className='row '>
                                            <div className='col  mt--1'>
                                                <h3 className='text-info'>{` ${el.id} : ${translate("guest.sampleI/O")}`}</h3>
                                            </div>

                                            {el.id === sampleIOArray.length && sampleIOArray.length > 1 && (
                                                <div className='text-right mr-3 mt--1 shadow-none'>
                                                    <Button
                                                        text={'delete'}
                                                        size={'sm'}
                                                        onClick={() => {
                                                            if (setFocus) {
                                                                setFocus('')
                                                            }
                                                            let updatedSampleInput = [...sampleIOArray]
                                                            updatedSampleInput.splice(parentIndex, 1)
                                                            setSampleIOArray(updatedSampleInput)
                                                        }}
                                                    />
                                                </div>
                                            )}


                                        </div>
                                        {/* <ol> */}
                                        <>
                                            <div className='ml-3 mt-2 '>
                                                <div className='row'>
                                                    <div className='col-sm-6 '>


                                                        {/**
                                                 * input childs
                                                 */}
                                                        <label className='h3 ml--3 text-info d-block d-xl-none'>{translate("guest.sampleInput")}</label>
                                                        {el && el?.input?.length > 0 && el.input.map((element, childIndex) => {
                                                            return (
                                                                <div className='row mr--3'>
                                                                    <div className='col pr-2'>
                                                                        <Input
                                                                            className=''
                                                                            style={{ marginLeft: '-16px' }}
                                                                            placeholder={translate("common.typeHere")!}
                                                                            value={element.value}
                                                                            onChange={(e) => {
                                                                                if (setFocus) {
                                                                                    setFocus('')
                                                                                }
                                                                                onChangeInputHandler(e.target.value, parentIndex, childIndex)

                                                                            }}
                                                                        />

                                                                    </div>
                                                                    {/**
                                                             * input child delete
                                                            */}

                                                                    {element.id === el.input.length && el.input.length > 1 && (
                                                                        <div className='ml--2 mr-4' style={{ marginRight: '30px' }}>
                                                                            <Image
                                                                                src={icons.deleteGrey}
                                                                                height={20}
                                                                                onClick={() => {
                                                                                    if (setFocus) {
                                                                                        setFocus('')
                                                                                    }
                                                                                    let updatedSampleInput = [...sampleIOArray]
                                                                                    let remaining = updatedSampleInput[parentIndex].input.splice(childIndex, 1)
                                                                                    setSampleIOArray(updatedSampleInput)
                                                                                }}
                                                                            />
                                                                        </div>
                                                                    )}
                                                                </div>
                                                            )
                                                        })}

                                                        <div className='text-right mt-xl-0 mt--2 mr-3'>
                                                            <Button
                                                                text={translate("guest.addInput")}
                                                                size={'sm'}
                                                                onClick={() => {
                                                                    if (setFocus) {
                                                                        setFocus('')
                                                                    }
                                                                    let newInputField = [...sampleIOArray]
                                                                    const newObject = { id: newInputField[parentIndex].input.length + 1, value: '' }
                                                                    newInputField[parentIndex].input = [...newInputField[parentIndex].input, newObject]
                                                                    setSampleIOArray(newInputField)
                                                                }}
                                                            />
                                                        </div>

                                                    </div>
                                                    <div className='col-sm-6 ml-xl-0 ml--3 mt-xl-0 mt-3'>
                                                        {/**
                                                 * output childs
                                                 */}
                                                        <label className='h3 text-info d-block d-xl-none'>{translate("guest.sampleOutput")!}</label>
                                                        {el && el?.output?.length > 0 && el.output.map((element, childIndex) => {
                                                            return (
                                                                <div key={element} className='row'>
                                                                    <div className='col'>
                                                                        <Input
                                                                            className=''
                                                                            style={{ marginLeft: '' }}
                                                                            value={element.value}
                                                                            placeholder={translate("common.typeHere")!}
                                                                            onChange={(e) => {
                                                                                if (setFocus) {
                                                                                    setFocus('')
                                                                                }
                                                                                onChangeOutputHandler(e.target.value, parentIndex, childIndex)

                                                                            }}
                                                                        />

                                                                    </div>

                                                                    {/**
                                                             * output child delete
                                                            */}
                                                                    {element.id === el.output.length && el.output.length > 1 && (

                                                                        <div className='' style={{ marginRight: '15px' }}>
                                                                            <Image
                                                                                src={icons.deleteGrey}
                                                                                height={20}
                                                                                onClick={() => {
                                                                                    if (setFocus) {
                                                                                        setFocus('')
                                                                                    }
                                                                                    let updatedSampleInput = [...sampleIOArray]
                                                                                    updatedSampleInput[parentIndex].output.splice(childIndex, 1)
                                                                                    // console.log("output deleted-->", updatedSampleInput);

                                                                                    setSampleIOArray(updatedSampleInput)
                                                                                }}
                                                                            />
                                                                        </div>
                                                                    )}
                                                                </div>
                                                            )
                                                        })}
                                                        <div className='text-right  mt-xl-0 mt--2'>
                                                            <Button
                                                                text={translate("guest.addOutput")}
                                                                size={'sm'}
                                                                onClick={() => {
                                                                    if (setFocus) {
                                                                        setFocus('')
                                                                    }
                                                                    let newInputField = [...sampleIOArray]
                                                                    const newObject = { id: newInputField[parentIndex].output.length + 1, value: '' }
                                                                    newInputField[parentIndex].output = [...newInputField[parentIndex].output, newObject]
                                                                    setSampleIOArray(newInputField)
                                                                }}
                                                            />
                                                        </div>
                                                    </div>

                                                </div>
                                            </div>
                                        </>
                                        {/* </ol> */}
                                    </div>

                                </Card>

                            )
                        })}

                        <div className='text-right mt--2 pb-4'>
                            <Button
                                text={translate("guest.addAnotherSampleIO")}
                                size={'sm'}
                                onClick={() => {
                                    if (setFocus) {
                                        setFocus('')
                                    }
                                    const addNewField = {
                                        id: sampleIOArray.length + 1, input: [{ id: 1, value: "" }], output: [{ id: 1, value: "" }]
                                    }
                                    setSampleIOArray([...sampleIOArray, addNewField])
                                }
                                }
                            />
                            <div>
                                <Button
                                    className='mb-4 mt-4 mb--1 mr-2'
                                    isLoading={ioSubmitLoader}
                                    text={translate("common.save")}
                                    size={"md"}
                                    onClick={() => {
                                        if (setFocus) {
                                            setFocus('')
                                        }
                                        if (!ioSubmitLoader) {
                                            selectedGuestTask?.task_meta_details?.id && validatePoseParams('Io')
                                        }
                                    }}
                                />
                            </div>
                        </div>

                    </div>}
                </div>
            )}

            {(selectedGuestTask?.task_meta_details?.id) && !isExpandCodeEditor && <>
                <div className="container-fluid mt-2">
                    <Card>
                        <div className='col mb--2'>
                            <h3 className='text-info ml--3 mt--2'>{translate('guest.rules')}</h3>
                        </div>
                        <form id="create-form">
                            <div className="row">
                                <div className="col-sm-12 pr-sm-5">
                                    <div
                                        id="tabs-icons-text"
                                        role="tablist">
                                        {
                                            rules && rules.length > 0 && rules.map((item: any, index: number) => {
                                                return LiComponent(item, index)
                                            })
                                        }
                                    </div>

                                    <div className="text-right mt-4 pl-4">
                                        <Button
                                            className=''
                                            text={translate("guest.addAnother")}
                                            size={"sm"}
                                            onClick={() => {
                                                if (setFocus) {
                                                    setFocus('')
                                                }
                                                let newInput = { id: rules.length + 1, value: '', child: [] }
                                                setRules([...rules, newInput])
                                            }}
                                        />
                                    </div>
                                </div>

                            </div>
                        </form>
                    </Card>
                    <div className='text-right'>
                        <Button
                            className='mb--2 mr-2'
                            isLoading={rulesSubmitLoader}
                            text={translate("common.save")}
                            size={"md"}
                            onClick={() => {
                                if (setFocus) {
                                    setFocus('')
                                }
                                if (!rulesSubmitLoader) {
                                    selectedGuestTask?.task_meta_details?.id && validatePoseParams('Rl')
                                }
                            }}
                        />
                    </div>

                    {/* procedure */}

                    <div className='mx--4 mt-4'>
                        <Procedure
                            value={studentProcedureData .length > 0 ? studentProcedureData : selectedGuestTask?.task_answer_details?.procedure }
                            showSubmitButton
                            isLoading={procedureSubmitLoader}
                            onSubmit={(data) => {
                                dispatch(settingStudentProcedureData(data))
                                selectedGuestTask?.task_meta_details?.id && onSubmit(data, 'Pr')
                                // onSubmit(studentWrittenQuestion, data, studentFlowDiagramData, btoa(studentProgramData))
                            }}
                        />
                    </div>
                    <div className='text-right'>
                        <Button
                            className='mr-2'
                            isLoading={procedureSubmitLoader}
                            text={translate("common.save")}
                            size={"md"}
                            onClick={() => {
                                if (setFocus) {
                                    setFocus('')
                                }
                                if (!procedureSubmitLoader) {
                                    selectedGuestTask?.task_meta_details?.id && validatePoseParams('Pr')
                                }
                            }}
                        />
                    </div>

                    {/* flow diagram image */}
                    <div className='mx--4 mt-4'>
                        <FlowDiagramHeader img={studentFlowDiagramData} isGuest />
                    </div>


                </div>
            </>}
            {/* Code editor */}
            {(selectedGuestTask?.task_meta_details?.id) && (
                <div className='m-0 p-0 container-fluid'>
                    <CodeEditor
                        value={studentProgramData}
                        showAddSubmit
                        codeOutput={codeOutput}
                        courseIde={'JS'}
                        isFromStudentTask={true}
                        // isLoading={isLoadingSubmitButton}
                        onSubmit={(code) => {
                            dispatch(settingStudentProgramData(btoa(code)))
                            if (code) {
                                onSubmit(btoa(code), 'Cd')
                            }
                        }}
                    />
                </div>
            )}
            {!isExpandCodeEditor && (selectedGuestTask?.task_meta_details?.id) && (
                <div className='mt-3'>
                    <Button
                        className='float-right mb-4 mr-4'
                        isLoading={codeSubmitLoader}
                        text={translate("common.save")}
                        size={"md"}
                        onClick={() => {
                            if (setFocus) {
                                setFocus('')
                            }


                            if (codeOutputData && codeOutputData?.status?.id !== 11) {
                                validatePoseParams('Cd')
                            }
                            else if (codeOutputData?.status?.id === 11) {
                                showToast('error', 'Your code still has error, please correct and then submit')
                            }
                            else if (studentProgramData && !codeOutputData) {
                                showToast('info', 'Please run the code to continue')
                            }
                            else {
                                validatePoseParams('Cd')

                            }

                        }}
                    />
                    {/* <Button
                        className='float-right mb-4  mr-2 mb--1 '
                        isLoading={questionSubmitLoader}
                        text={translate("guest.clickToDownload")}
                        size={"md"}
                        onClick={() => {
                            if (setFocus) {
                                setFocus('')
                            }
                            const params = {
                                question: question,
                                sampleIO: sampleIOArray,
                                procedure: studentProcedureData,
                                rules: rules,
                                flowDiagramImage: flowDiagreamImage,
                                code: studentProgramData
                            }
                            dispatch(fetchTaskObject(params))
                            goTo(GUEST_PATH.GUEST_DOWNLOAD_AS_IMAGE, false)
                        }}
                    /> */}
                </div>
            )}



        </>

    )
}

export { GuestQuestionCreation }

