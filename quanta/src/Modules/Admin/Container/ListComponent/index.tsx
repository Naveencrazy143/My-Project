import { Card, Checkbox } from '@Components';
import React from 'react'
import { ListComponentProps } from './interface';
import { title } from 'process';
import { doEditQuestion } from '@Redux';
import { useDispatch, useSelector } from 'react-redux';


const ListComponent = ({ data, title, onCheckChange, checked, id = "", text = "", checkBox = false, style, isEdit = false }: ListComponentProps) => {
    const { editQuestion } = useSelector(
        (state: any) => state.DashboardReducer
    );
    const dispatch = useDispatch();
    return (
        <>
            <Card className='' >
                {editQuestion?.editRules && data?.length > 0 ? <div className='row justify-content-between pr-3'>
                    <h3 className='text-info ml-3'>{title}</h3>
                    {isEdit && <i className="bi bi-pencil text-info pointer"
                        onClick={() => dispatch(doEditQuestion({ ...editQuestion, editRules: false }))}
                    ></i>}
                </div>
                    :
                    <div className='row justify-content-between'>
                        <h2 className='text-primary ml-3'>{title}</h2>
                        {checkBox && <div className={`mr-2 ${style}`}>
                            <Checkbox
                                id={id}
                                text={text}
                                onCheckChange={(val) => {
                                    if (onCheckChange) {
                                        onCheckChange(val)
                                    }
                                }}
                                checked={checked}
                            />
                        </div>}
                    </div>}
                <ul
                    id="tabs-icons-text"
                    role="tablist"
                >
                    <ol className='ml--5 text-dark'>
                        {data && data.length > 0 && data?.map((it: any, index: number) => {
                            return (
                                <>
                                    <li className=' font-weight-light ' style={{ fontFamily: "inherit", fontWeight: "bolder", fontSize: 16 }} >{it.value}
                                        <ol type='a' className="text-dark" >
                                            {it && it?.child?.length > 0 && it?.child?.map((cIt1: any) => {
                                                return (
                                                    <>
                                                        <li className=' font-weight-light' style={{ fontFamily: "inherit", fontWeight: "bolder", fontSize: 16 }}>{cIt1?.value}</li>
                                                        <ol type='i' className="text-dark" >
                                                            {cIt1 && cIt1?.child?.length > 0 && cIt1?.child?.map((cIt2: any) => {
                                                                return (
                                                                    <>
                                                                        <li className=' font-weight-light ' style={{ fontFamily: "inherit", fontWeight: "bolder", fontSize: 16 }}>{cIt2?.value}</li>
                                                                        <ul className="text-dark" style={{ listStyleType: 'disc' }}>

                                                                            {cIt2 && cIt2?.child?.length > 0 && cIt2?.child?.map((cIt3: any) => {
                                                                                return (
                                                                                    <>
                                                                                        <li className=' font-weight-light ' style={{ fontFamily: "inherit", fontWeight: "bolder", fontSize: 16 }}>{cIt3?.value}</li>
                                                                                        <ol type='a'>
                                                                                            {cIt3 && cIt3?.child?.length > 0 && cIt3?.child?.map((cIt4: any) => {
                                                                                                return (
                                                                                                    <>
                                                                                                        <li className=' font-weight-light ' style={{ fontFamily: "inherit", fontWeight: "bolder", fontSize: 16 }}>{cIt4?.value}</li>
                                                                                                        <ol type='i'>
                                                                                                            {cIt4 && cIt4?.child?.length > 0 && cIt4?.child?.map((cIt5: any) => {
                                                                                                                return (
                                                                                                                    <>
                                                                                                                        <li className='text-justify font-weight-normal'>{cIt5?.value}</li>
                                                                                                                    </>
                                                                                                                )
                                                                                                            })}
                                                                                                        </ol>
                                                                                                    </>
                                                                                                )
                                                                                            })}
                                                                                        </ol>
                                                                                    </>
                                                                                )
                                                                            })}
                                                                        </ul>
                                                                    </>
                                                                )
                                                            })}
                                                        </ol>
                                                    </>
                                                )
                                            })}
                                        </ol>
                                    </li>
                                </>
                            );
                        })}
                    </ol>
                </ul>
                {/* <p className={`text-right mb--3 ${!style ? 'd-none' : ''}`} style={{ color: "rgb(9, 191, 254)", fontSize: '10px' }}> {"@Powered by "}<strong>{"EDAT"}</strong></p> */}
            </Card>
        </>
    )
}

export { ListComponent }