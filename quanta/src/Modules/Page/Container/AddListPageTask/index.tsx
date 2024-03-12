import { icons } from "@Assets";
import { Button, Image, Input, InputHeading } from "@Components";
import { useApp } from "@Contexts";
import { translate } from "@I18n";
import { convertToUpperCase } from "@Utils";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AddParagraphPageTaskProps } from './interface';

const ADD = 1
const UPDATE = 2
const DELETE = 3

const AddListPageTask = ({ titleValue, onChangeTitle, descriptionValue, onChangeDescription, onClick, value, onSubmit, isLoading, referenceName, onChangeReferenceName }: AddParagraphPageTaskProps) => {
    const { focus, setFocus } = useApp()
    const { editSectionType } = useSelector((state: any) => state.DashboardReducer);

    const [procedures, setProcedures] = useState<any>(value && value.length > 0 ? value : [
        {
            id: 1, value: "", child: []
        },
    ])

    console.log("procedures", procedures);

    const dispatch = useDispatch()

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
                <div className="row mt-2">
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
                                if (setFocus)
                                    setFocus(item.id)
                                const updatedNode = [...getCurrentNode(procedures, item.id, UPDATE, e.target.value)]
                                setProcedures(updatedNode)
                            }}
                        />
                    </div>
                    <div className="mt-4 d-none d-xl-block">
                        <div onClick={() => {
                            let updatedNode = [...getCurrentNode(procedures, item.id, DELETE, '')]
                            setProcedures(updatedNode)

                        }}>
                            {item.id !== 1 && (
                                <div>
                                    <Image src={icons.deleteGrey} height={20} onClick={() => { }} />
                                </div>
                            )}
                        </div>
                        <div className='mt-sm-2'>
                            <Button
                                text={translate("course.addSub")!}
                                size={"sm"}
                                onClick={() => {
                                    let updatedNode = [...getCurrentNode(procedures, item.id, ADD, '')]
                                    setProcedures(updatedNode)
                                }}
                            />
                        </div>
                        <div className="mt-xl-4 mt-sm-0 mt-3 col-sm-12 d-block d-sm-none">
                            <span onClick={() => {
                                let updatedNode = [...getCurrentNode(procedures, item.id, DELETE, '')]
                                setProcedures(updatedNode)

                            }}>
                                {item.id !== 1 && (
                                    <div className="float-right">
                                        <Image src={icons.deleteGrey} height={20} onClick={() => { }} />
                                    </div>
                                )}
                            </span>
                            <div className='mt-sm-2 mr-2 float-right'>
                                <Button
                                    text={'Add Sub'}
                                    size={"sm"}
                                    onClick={() => {
                                        let updatedNode = [...getCurrentNode(procedures, item.id, ADD, '')]
                                        setProcedures(updatedNode)
                                    }}
                                />
                            </div>
                        </div>
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
        return procedures?.map((item: any, index: number) => {
            return <LiComponent key={item.id} item={item} index={index} />
        })

    }

    const validateRulesParams = (arr: Array<any>) => {

        let isValid = true

        const getCurrentNodeRecursive = (
            arr: Array<any>
        ) =>
            arr.forEach((it, index) => {

                if (it?.value === '') {
                    // showToast('error', 'The procedure input field cannot be empty')
                    return isValid = false;
                }
                getCurrentNodeRecursive(it.child);
            });

        getCurrentNodeRecursive(arr);
        return isValid;
    };


    return (
        <>
            <div>
                <div className='col'>
                    <Input
                        id={'title'}
                        heading={translate("common.title")!}
                        placeholder={translate("common.title")!}
                        type={'text'}
                        value={titleValue}
                        onChange={(val) => {
                            if (onChangeTitle) {
                                onChangeTitle(val)
                            }
                            if (setFocus) {
                                setFocus('')
                            }
                        }}
                    />
                    <Input
                        id={'reference name'}
                        heading={translate("page.referenceName")!}
                        placeholder={translate("page.referenceName")!}
                        type={'text'}
                        value={referenceName}
                        onChange={(val) => {
                            if (onChangeReferenceName) {
                                onChangeReferenceName(val)
                            }
                        }}
                        disabled={editSectionType ? true : false}
                    />
                    <form id="create-form">
                        <div className="row">
                            <div className="col-sm-12 pr-5">
                                <InputHeading heading={translate("page.list")!} />
                                <div
                                    id="tabs-icons-text"
                                    role="tablist">
                                    {
                                        renderInput()
                                    }
                                </div>

                                <div className="text-right mt-3">
                                    <Button
                                        text={translate("guest.addAnother")!}
                                        size={"md"}
                                        onClick={() => {
                                            if (setFocus) {
                                                setFocus('')
                                            }
                                            let newInput = { id: procedures.length + 1, value: '', no: procedures.length + 1, child: [] }
                                            setProcedures([...procedures, newInput])
                                        }}
                                    />
                                </div>
                            </div>
                        </div>
                    </form>

                    <div className='text-right pt-4 pb-3'>
                        <Button
                            text={translate("common.submit")!}
                            size={'md'}
                            isLoading={isLoading}
                            onClick={() => {
                                if (onClick) {
                                    onClick(procedures)
                                    const validated = validateRulesParams(procedures)
                                    if (setFocus) {
                                        setFocus('')
                                    }
                                    // dispatch(settingStudentProcedureData(procedures))
                                }
                            }}
                        />
                    </div>
                </div>
            </div>

        </>
    )
}

export { AddListPageTask };

