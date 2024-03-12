import { Card, Checkbox } from '@Components';
import React from 'react'
import { ListTypeComponentProps } from './interface';
import { title } from 'process';


const ListTypeComponent = ({ data, title, onCheckChange, checked, id = "", text = "", checkBox = false, style, }: ListTypeComponentProps) => {
    return (
        <>
            <Card className='' style={{ backgroundColor: ' rgba(0,0,0,.75)' }}>
                <div className='row justify-content-between'>
                    <h2 className='text-white ml-3'>{title}</h2>
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
                </div>
                <ul
                    id="tabs-icons-text"
                    role="tablist"
                >
                    <ol className='ml--5 text-white'>
                        {data && data.length > 0 && data?.map((it: any, index: number) => {
                            return (
                                <>
                                    <li className=' font-weight-light ' style={{ fontSize: '14px' }} >{it.value}
                                        <ol type='a' className="text-white" >
                                            {it && it?.child?.length > 0 && it?.child?.map((cIt1: any) => {
                                                return (
                                                    <>
                                                        <li className=' font-weight-light' style={{ fontSize: '14px' }}>{cIt1?.value}</li>
                                                        <ol type='i' className="text-white" >
                                                            {cIt1 && cIt1?.child?.length > 0 && cIt1?.child?.map((cIt2: any) => {
                                                                return (
                                                                    <>
                                                                        <li className=' font-weight-light ' style={{ fontSize: '14px' }}>{cIt2?.value}</li>
                                                                        <ul className="text-white" style={{ listStyleType: 'disc' }}>

                                                                            {cIt2 && cIt2?.child?.length > 0 && cIt2?.child?.map((cIt3: any) => {
                                                                                return (
                                                                                    <>
                                                                                        <li className=' font-weight-light ' style={{ fontSize: '14px' }}>{cIt3?.value}</li>
                                                                                        <ol type='a'>
                                                                                            {cIt3 && cIt3?.child?.length > 0 && cIt3?.child?.map((cIt4: any) => {
                                                                                                return (
                                                                                                    <>
                                                                                                        <li className=' font-weight-light ' style={{ fontSize: '14px' }}>{cIt4?.value}</li>
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
               <p className={`text-right mb--3 ${!style ? 'd-none' : ''}`} style={{ color: "rgb(9, 191, 254)", fontSize: '10px' }}> {"@Powered by "}<strong>{"EDAT"}</strong></p>
            </Card>
        </>
    )
}

export { ListTypeComponent }