import React, { useEffect, useState } from 'react'
import { Button, Card, Input, Image, Back, InputHeading, Checkbox, DropDown, StepContainer, CommonTable } from '@Components'
import { ListComponent, Procedure } from '@Modules'
import { icons } from '@Assets'
import { translate } from '@I18n'
import { useLoader, useNavigation } from '@Hooks'
import { useDispatch, useSelector } from 'react-redux'
import { fetchCourses, fetchTaskDetails, getCourseIde, postGenericCrudDetails, fetchTopicTaskTypes, isBackNavigation, postAddCourseTask, doEditQuestion, settingCurrentTaskItem } from '@Redux'
import { allowedNodeEnvironmentFlags } from 'process'
import { ROUTES } from '@Routes'
import { convertToUpperCase, showToast } from '@Utils'

const ADD = 1
const UPDATE = 2
const DELETE = 3

const TASK_TYPE = [
    { id: '02ae448a-ffd4-4bee-bc6f-78e81ee36da5', name: 'Basics' },
    { id: '446d0777-665d-4cd9-bf0b-a46232daec23', name: 'Realtime' }

]

const TOOL_SEVERITY_SELECT = [
    { id: '1', name: '1' },
    { id: '2', name: '2' },
    { id: '3', name: '3' },
    { id: '4', name: '4' },
    { id: '5', name: '5' },
]

const COGNITIVE_SEVERITY_SELECT = [
    { id: '1', name: '1' },
    { id: '2', name: '2' },
    { id: '3', name: '3' },
    { id: '4', name: '4' },
    { id: '5', name: '5' },
]

function QuestionCreation() {
    const courseLoader = useLoader(false);

    const { courseTopicName, courseTopicTasks, currentTaskItem, courseIdeList, topicTaskTypes, editQuestion } = useSelector(
        (state: any) => state.DashboardReducer
    );

    // console.log("editQuestion====>", editQuestion);


    const { goTo, goBack } = useNavigation()
    const dispatch = useDispatch();

    const [rules, setRules] = useState<any>([
        {
            id: 1, value: "", child: []
        },
    ])

    const [focus, setFocus] = useState('')

    const [question, setQuestion] = useState<string>('')
    const [sampleIOArray, setSampleIOArray] = useState<any>(
        [
            { id: 1, input: [{ id: 1, value: '' }], output: [{ id: 1, value: '' }] },
        ]
    )
    const [checked, setChecked] = useState(false);
    const [rulesValidate, setRulesValidate] = useState(false);

    const [taskType, setTaskType] = useState('')
    const [courseIde, setCourseIde] = useState('')
    const [submitLoader, setSubmitLoader] = useState(false)
    const [toolSeveritySelect, setToolSeveritySelect] = useState('1')
    const [cognitiveSeveritySelect, setCognitiveSeveritySelect] = useState('1')
    const [sampleIO, setSampleIO] = useState([])

    useEffect(() => {
        const quesObj = { editQues: false, editSampleIO: false, editRules: false }
        dispatch(doEditQuestion(quesObj))
    }, [])

    useEffect(() => {
        getTopicTaskTypes()

        const params = {}
        dispatch(getCourseIde({
            params,
            onSuccess: (success: any) => () => {

            },
            onError: (error: string) => () => {
            },
        }))

        if (currentTaskItem) {

            dispatch(doEditQuestion({ editQues: true, editSampleIO: true, editRules: true }))
            const params = {
                task_meta_id: currentTaskItem.task_meta.id
            }
            dispatch(fetchTaskDetails({
                params,
                onSuccess: (success) => () => {
                    prefillDetails(success.details)
                },
                onError: (error) => () => { }
            }))
        }
    }, [rulesValidate])

    const getTopicTaskTypes = () => {
        const params = {}
        dispatch(fetchTopicTaskTypes({
            params,
            onSuccess: (success) => () => {
            },
            onError: (error) => () => { }
        }))
    }

    const prefillDetails = (editItem) => {
        setQuestion(editItem.details.problem_statement)
        editItem && editItem.details.rules.length > 0 && setRules(editItem.details.rules)
        setSampleIO(editItem?.details.sample_io)
        const data = editItem.details.sample_io.map((it, index) => { return { id: index + 1, "input": it.i.map((ip, index) => { return { id: index + 1, value: ip } }), "output": it.o.map((ip, index) => { return { id: index + 1, value: ip } }) } })
        data && data.length > 0 && setSampleIOArray(data)
        setTaskType(editItem.details.task_type[0].id)
        setChecked(editItem.is_manditory)
        setCourseIde(editItem.details.ide)
        setCognitiveSeveritySelect(editItem.details.cognitive_severity)
        setToolSeveritySelect(editItem.details.tool_severity)
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
        let finalValue = sampleIOArray.map((el) => {
            el.input.map((it) => {
                input.inputA = [...input.inputA, it.value]
            })
            el.output.map((it) => {
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



    const sampleIOArrayApiStructure = sampleIOArray.map(it => { return { "i": it.input.map(ip => ip.value), "o": it.output.map(ip => ip.value) } })

    //---------------------------- validation ---------------------------------//

    const listValidationHandler = (arr: Array<any>) => {
        let bool = false
        const getCurrentNodeRecursive = (
            arr: Array<any>
        ) => {
            arr.forEach((it, index) => {
                if (it.value === '') {
                    bool = true
                }
                else {
                    getCurrentNodeRecursive(it.child);
                }
            });
        }
        getCurrentNodeRecursive(arr);
        if (bool) {
            return true
        }
        else {
            return false;
        }
    };




    const validatePoseParams = (rules) => {
        // console.log("validatePoseParams",data);


        let input = false
        let output = false
        sampleIOArray.forEach((item) => {

            item.input.forEach((it) => {
                if (it.value.length === 0) {
                    input = false
                }
                else {
                    input = true
                }
            })
            item.output.forEach((it) => {
                if (it.value.length === 0) {
                    output = false
                }
                else {
                    output = true
                }
            })
        })

        if (taskType === '') {
            showToast('error', "Please Select Task Type")
            return
        }
        else if (courseIde === '') {
            showToast('error', "Please Select Course IDE")
            return
        }
        else if (question === '') {
            showToast('error', "Question Field Cannot be empty")
            return
        }
        else if ((input === false || output === false)) {
            showToast('error', "Sample i/o Field Cannot be empty")
            return
        }
        else if (listValidationHandler(rules)) {
            showToast('error', 'Rules field cannot be empty')
            return
        }
        else {
            onSubmit()
        }
    }

    const onSubmit = () => {

        setSubmitLoader(true)
        const params = {
            task_meta_type: "SWD",
            name: question.substring(0, 47),
            description: question,
            tag: "JS",
            ide_id: courseIde,
            problem_statement: question,
            rules: rules,
            sample_io: sampleIOArrayApiStructure,
            is_manditory: checked,
            order_sequence: courseTopicTasks?.length + 1,
            topic_id: courseTopicName.id,
            task_type_id: taskType,
            ...(currentTaskItem && { id: currentTaskItem.task_meta.id }),
            tool_severity: toolSeveritySelect,
            cognitive_severity: cognitiveSeveritySelect
        }


        dispatch(postAddCourseTask({
            params,
            onSuccess: (success: any) => () => {
                setSubmitLoader(false)
                showToast('success', success.message)
                // goTo('/dashboard' + ROUTES.HOME.ADMIN_TOPIC_SECTION)
                goBack()
                courseLoader.hideLoader()

            },
            onError: (error: string) => () => {
                setSubmitLoader(false)
                courseLoader.hideLoader()
            },
        }))

    }

    const LiComponent = (item, index) => {
        return (
            <>
                <div className="row  mt-2">
                    <div className="col">
                        <h5>{typeof (item.id) == 'number' ? item.id : ''}</h5>
                        <textarea
                            id={item.id}
                            autoFocus={item.id === focus}
                            style={{ resize: "none" }}
                            cols={5}
                            className="form-control"
                            placeholder={translate("common.typeHere")!}
                            value={convertToUpperCase(item.value)}
                            onFocus={(e) => {
                                var temp_value = e.target.value
                                e.target.value = ''
                                e.target.value = temp_value
                            }}
                            onChange={(e) => {
                                if (focus !== item.id) {
                                    setFocus(item.id)
                                }

                                const updatedNode = [...getCurrentNode(rules, item.id, UPDATE, e.target.value)]
                                setRules(updatedNode)
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
                            {/* <Image src={icons.delete} height={20} /> */}
                        </div>
                        <div className='mt-sm-2 float-right'>
                            <Button
                                text={translate("course.addSub")}
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
                            {/* <Image src={icons.delete} height={20} /> */}
                        </span>
                        <div className='mt-sm-2 mr-2 float-right'>
                            <Button
                                text={translate("course.addSub")}
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
                    item.child.map((el, i) => (
                        <div className="ml-3">
                            {/* <LiComponent
                                index={index}
                                item={item}
                            /> */}
                            {LiComponent(el, i)}
                        </div>
                    ))}
            </>
        );
    };



    // const normalizedEmployeeLog = (data: any) => {
    //     return data?.map((el: any) => {
    //         return {
    //             // sI: el.id,
    //             [`${translate("guest.sampleInput")!}`]: el?.input?.length > 1 ? el?.input?.map(el=>el?.value) :  el?.input?.length > 0 ? el?.input?.map((el: any) => el?.value) : el?.input,
    //             [`${translate("guest.sampleOutput")!}`]: el?.output?.length > 1 ? el?.output?.map(el=>el?.value) : el?.output?.length > 0 ? el?.output.map((el: any) => el?.value) : el?.output,
    //         };
    //     });
    // };

    const normalizedEmployeeLog = (data: any) => {

        return data?.map((el: any, index: number) => {
            return {
                // sI: el.id,
                "S.No": index + 1,
                [`${translate("guest.sampleInput")}`]: el?.i?.length > 1 ? el?.i?.join('\n') : el?.i,
                [`${translate("guest.sampleOutput")}`]: el?.o?.length > 1 ? el?.o?.join('\n') : el?.o,
            };
        });
    };

    return (
        <>
            <div className='container-fluid'>
                <div className='row pl-xl-2 pl-lg-2 pl-sm-0 pl-4' onClick={() => {
                    dispatch(isBackNavigation(true))
                    // dispatch(settingCurrentTaskItem(undefined))
                }}>
                    <Back text={currentTaskItem ? translate("guest.editTask")! : translate("guest.addTask")!}
                        onClick={() => dispatch(doEditQuestion({ editQues: false, editSampleIO: false, editRules: false }))}
                    />

                </div>

                <Card className='mt-3'>
                    <div className='row pb-3'>

                        <div className='col-sm-3  pt-xl-2 pt-sm-0 pt-2'>
                            <DropDown
                                heading={translate("common.taskType")!}
                                placeholder='Task type'
                                data={topicTaskTypes}
                                value={taskType}
                                onChange={(e) => {
                                    setFocus('')
                                    setTaskType(e.target.value)
                                }}
                            />
                        </div>
                        <div className='col-sm-3  pt-xl-2 pt-sm-0 pt-3'>
                            <DropDown
                                heading={`${translate("auth.course")} IDE`}
                                placeholder='Course IDE'
                                data={courseIdeList}
                                value={courseIde}
                                onChange={(e) => {
                                    setFocus('')
                                    setCourseIde(e.target.value)
                                }}
                            />
                        </div>
                        <div className='col-sm-2  pt-xl-2 pt-sm-0 pt-3'>
                            <DropDown
                                heading={translate("admin.toolSeverity")}
                                placeholder='Tool Severity'
                                data={TOOL_SEVERITY_SELECT}
                                value={toolSeveritySelect}
                                onChange={(e) => {
                                    setFocus('')

                                    setToolSeveritySelect(e.target.value)
                                }}
                            />
                        </div>
                        <div className='col-sm-2 pt-xl-2 pt-sm-0 pt-3'>
                            <DropDown
                                heading={translate("admin.cognitiveSeverity")}
                                placeholder='Cognitive Severity'
                                data={COGNITIVE_SEVERITY_SELECT}
                                value={cognitiveSeveritySelect}
                                onChange={(e) => {
                                    setFocus('')
                                    setCognitiveSeveritySelect(e.target.value)
                                }}
                            />
                        </div>
                        <div className='col-sm-2  pt-xl-5 pt-sm-0 pt-4 text-right' >
                            <Checkbox
                                id='1'
                                text={translate("admin.isMandatory")!}
                                variant={'info'}
                                checked={checked}
                                // defaultChecked={false}
                                onCheckChange={() => {

                                    setFocus('')
                                    setChecked(!checked)
                                }}
                            />
                        </div>
                    </div>
                </Card>


                {editQuestion?.editQues && question?.length > 0 ? <Card className='' >
                    <div className='row justify-content-between px-3'>
                        <h3 className='text-info'>{translate('course.question')}</h3>
                        <i className="bi bi-pencil text-info pointer"
                            onClick={() => dispatch(doEditQuestion({ ...editQuestion, editQues: false }))}
                        ></i>
                    </div>
                    <div className="overflow-auto scroll-hidden mb--1 text-wrap" style={{ height: '35.5vh' }}>
                        <StepContainer strData={question} />
                    </div>
                </Card>

                    :

                    <Card className='mt-3'>
                        <div className='mb-3 mt--2'>
                            <h3 className='text-info'>{translate("guest.question")}</h3>
                        </div>
                        <textarea
                            className="form-control"
                            placeholder={translate("guest.typeTheQuestion")!}
                            value={question ? question.replaceAll("\"\"", "\"") : ''}
                            onChange={(e) => {
                                setFocus('')
                                setQuestion(convertToUpperCase(e.target.value))
                            }}
                            style={{ resize: 'none', height: '15vh' }}
                        />
                    </Card>}



                {editQuestion?.editSampleIO && sampleIO?.length > 0 ? <div className='col sm-6 m-0 p-0'>

                    <Card className=''>
                        <div className='row justify-content-between px-3'>
                            <h3 className='text-info'>{translate('course.sampleI/O')}</h3>
                            <i className="bi bi-pencil text-primary pointer"
                                onClick={() => dispatch(doEditQuestion({ ...editQuestion, editSampleIO: false }))}
                            ></i>
                        </div>
                        <div className='overflow-auto scroll-hidden ' style={{ margin: '0px -39px 0px -39px' }}>
                            {/* style={{ height: '30.5vh' }} */}
                            {sampleIO &&
                                (<CommonTable
                                    noHeader
                                    displayDataSet={normalizedEmployeeLog(sampleIO)}
                                />)
                            }
                        </div>
                    </Card>

                </div>


                    :


                    sampleIOArray && sampleIOArray.length > 0 && sampleIOArray.map((el, parentIndex) => {
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
                                                    text={translate("common.delete")}
                                                    size={'sm'}
                                                    onClick={() => {
                                                        setFocus('')
                                                        let updatedSampleInput = [...sampleIOArray]
                                                        updatedSampleInput.splice(parentIndex, 1)
                                                        setSampleIOArray(updatedSampleInput)
                                                    }}
                                                />
                                            </div>
                                        )}


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
                                                                        className=''
                                                                        style={{ marginLeft: '-16px' }}
                                                                        placeholder={translate("common.typeHere")!}
                                                                        value={element.value}
                                                                        onChange={(e) => {
                                                                            setFocus('')
                                                                            onChangeInputHandler(e.target.value, parentIndex, childIndex)

                                                                        }}
                                                                    />

                                                                </div>

                                                                {element.id === el.input.length && el.input.length > 1 && (
                                                                    <div className='ml--2 mr-4 align-self-center' style={{ marginRight: '30px' }}>
                                                                        <Image
                                                                            src={icons.deleteGrey}
                                                                            height={20}
                                                                            onClick={() => {
                                                                                setFocus('')
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
                                                                setFocus('')
                                                                let newInputField = [...sampleIOArray]
                                                                const newObject = { id: newInputField[parentIndex].input.length + 1, value: '' }
                                                                newInputField[parentIndex].input = [...newInputField[parentIndex].input, newObject]
                                                                setSampleIOArray(newInputField)
                                                            }}
                                                        />
                                                    </div>

                                                </div>
                                                <div className='col-sm-6 ml-xl-0 ml--3 mt-xl-0 mt-3'>
                                                    <label className='h3 text-info d-block d-xl-none'>{translate("guest.sampleOutput")}</label>
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
                                                                            setFocus('')
                                                                            onChangeOutputHandler(e.target.value, parentIndex, childIndex)

                                                                        }}
                                                                    />

                                                                </div>
                                                                {element.id === el.output.length && el.output.length > 1 && (

                                                                    <div className='align-self-center' style={{ marginRight: '15px' }}>
                                                                        <Image
                                                                            src={icons.deleteGrey}
                                                                            height={20}
                                                                            onClick={() => {
                                                                                setFocus('')
                                                                                let updatedSampleInput = [...sampleIOArray]
                                                                                updatedSampleInput[parentIndex].output.splice(childIndex, 1)
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
                                                                setFocus('')
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
                                </div>

                            </Card>

                        )
                    })
                }

                {!editQuestion?.editSampleIO && sampleIO?.length > 0 && <div className='text-right mt--2 pb-4'>
                    <Button
                        text={translate("guest.addAnotherSampleIO")}
                        size={'sm'}
                        onClick={() => {
                            setFocus('')
                            const addNewField = {
                                id: sampleIOArray.length + 1, input: [{ id: 1, value: "" }], output: [{ id: 1, value: "" }]
                            }
                            setSampleIOArray([...sampleIOArray, addNewField])
                        }
                        }
                    />
                </div>}
            </div>

            {editQuestion?.editRules && rules[0]?.value?.length > 0 ? <div className='container-fluid col-sm-12 px-4 pb-1'>
                <ListComponent data={rules} title={'Rules'} isEdit />
            </div>

                :
                <div className="container-fluid">
                    <Card>
                        <div className='col mb--2'>
                            <h3 className='text-info ml--3 mt--2'>{translate("guest.rules")}</h3>
                        </div>
                        <form id="create-form">
                            <div className="row">
                                <div className="col-sm-12 pr-sm-5">
                                    <div
                                        id="tabs-icons-text"
                                        role="tablist">
                                        {
                                            // renderInput()
                                            rules && rules.length > 0 && rules.map((item: any, index: number) => {
                                                // return <LiComponent key={item.id} item={item} index={index} />
                                                return LiComponent(item, index)
                                            })
                                        }
                                    </div>

                                    <div className="text-right mt-4">
                                        <Button
                                            text={translate("guest.addAnother")}
                                            size={"sm"}
                                            onClick={() => {
                                                setFocus('')
                                                let newInput = { id: rules.length + 1, value: '', child: [] }
                                                setRules([...rules, newInput])
                                            }}
                                        />
                                    </div>
                                </div>
                            </div>
                        </form>
                    </Card>
                </div>}

            <>
                <div className='float-right mr-4 mb-4'>
                    <Button
                        // className='float-right mb-4 mr-2 '
                        isLoading={submitLoader}
                        text={translate("common.submit")}
                        size={"md"}
                        onClick={() => {
                            if (!submitLoader) {
                                setFocus('')

                                validatePoseParams(rules)
                            }


                        }}
                    />
                </div>
            </>

        </>

    )
}

export { QuestionCreation }