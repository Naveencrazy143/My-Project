import { Button, Card, CommonTable } from '@Components';
import { addStudentCourseTaskResponseId, fetchStudentCourseTasksDetails, fetchTaskDetails, postGenericCrudDetails, postStudentCourseTasksDetails } from '@Redux';
import React, { useState } from 'react';
import { useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { translate } from '@I18n'
import { useInput } from '@Hooks';
import { showToast } from '@Utils';
import moment from 'moment';
import { useApp } from "@Contexts";

interface Props {
    ref?: any;
    onSubmit?: (value) => void;
    value?: string
    onInputChange?: (value) => void;
    showAddSubmit?: boolean
    isLoading?: boolean

}

const GuestQuestion = React.forwardRef(({ ref, onSubmit, value, onInputChange, showAddSubmit = false, isLoading, ...props }: Props) => {

    console.log(ref + "========ref");

    const dispatch = useDispatch();

    const { taskDetails, getStudentTaskDetails, addStudentTaskResponseId, addStudentCourseTaskDetails } = useSelector(
        (state: any) => state.DashboardReducer
    );


    const [question, setQuestion] = useState(value)
    const { focus, setFocus } = useApp()



    const normalizedEmployeeLog = (data: any) => {
        
        return data?.map((el: any) => {
            console.log("66666666666", el);

            return {
                // sI: el.id,
                'Sample Input':el?.i?.length > 1 ? el?.i?.join('\n'):el?.i,
                output: el?.o?.length > 1 ? el?.o?.join('\n') : el?.o,
            };
        });
    };


    return (
        <div className='container-fluid pt-5 py-3 ' id={"Questions"} ref={ref} >
            <div className='pb-3 display-4'>Question</div>
            <div className='row '>
                <div className='col-sm-6'>
                    <Card className='' >
                        <h3 className='text-info'>{translate('course.question')}</h3>
                        <div className='overflow-auto scroll-hidden mb--1' style={{ height: '35.5vh' }}>
                            {/* <p className='font-weight-normal text-justify text-dark'>{taskDetails?.name || ''}</p> */}
                            <p className='font-weight-normal text-justify text-dark'>{taskDetails?.problem_statement || ''}</p>
                        </div>
                    </Card>
                </div>
                <div className='col-sm-6 '>
                    <Card className=''>
                        <h3 className='text-info'>{translate('course.rules')}</h3>
                        <ul
                            id="tabs-icons-text"
                            role="tablist"
                            className='overflow-auto scroll-hidden mb--1'
                            style={{ height: '35.5vh' }}
                        >
                            <ol className='ml--5'>
                                {taskDetails && taskDetails?.rules?.length > 0 && taskDetails?.rules?.map((it: any, index: number) => {
                                    return (
                                        <>
                                            <li className="text-dark" >{it.value}
                                                <ol type='a' className="text-dark" >
                                                    {it && it?.child?.length > 0 && it?.child?.map((cIt1: any) => {
                                                        return (
                                                            <>
                                                                <li className='text-justify font-weight-normal'>{cIt1?.value}</li>
                                                                <ol type='i' className="text-dark" >
                                                                    {cIt1 && cIt1?.child?.length > 0 && cIt1?.child?.map((cIt2: any) => {
                                                                        return (
                                                                            <>
                                                                                <li className='text-justify font-weight-normal'>{cIt2?.value}</li>
                                                                                <ol className="text-dark" >

                                                                                    {cIt2 && cIt2?.child?.length > 0 && cIt2?.child?.map((cIt3: any) => {
                                                                                        return (
                                                                                            <>
                                                                                                <li className='text-justify font-weight-normal'>{cIt3?.value}</li>
                                                                                                <ol type='a'>
                                                                                                    {cIt3 && cIt3?.child?.length > 0 && cIt3?.child?.map((cIt4: any) => {
                                                                                                        return (
                                                                                                            <>
                                                                                                                <li className='text-justify font-weight-normal'>{cIt4?.value}</li>
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
                                                                                </ol>
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
                    </Card>
                </div>
            </div>

                <div className='col sm-6 m-0 p-0'>

                    <Card className=''>
                        <h3 className='text-info'>{translate('course.sampleI/O')}</h3>
                        <div className='overflow-auto scroll-hidden mx--4'> 
                        {/* style={{ height: '30.5vh' }} */}
                            {taskDetails &&
                                (<CommonTable
                                    noHeader
                                    displayDataSet={normalizedEmployeeLog(taskDetails.sample_io)}
                                />)
                            }
                        </div>
                    </Card>

            </div>
            <div className='col sm-6 m-0 p-0'>
                <Card className='' >
                    <h3 className='text-info'>{translate('course.writtenQuestion')}</h3>
                    <div className='overflow-auto scroll-hidden' style={{ height: '20.5vh' }}>
                        <textarea
                            className="form-control"
                            placeholder="Type the Question"
                            value={value}
                            onChange={(e) => {
                                if (setFocus)
                                    setFocus('')
                                if (onInputChange) {
                                    setQuestion(e.target.value)
                                    onInputChange(e.target.value)
                                }
                            }}
                            style={{ resize: 'none',height:'15vh' }}
                        />

                    </div>
                    {!showAddSubmit && <div className='float-right pr-sm-0 pr-lg-0 pr-7'>
                        <Button text={translate('common.submit')}
                            isLoading={isLoading}
                            onClick={() => {
                                if (question) {
                                    if (onSubmit) {
                                        onSubmit(question)
                                    }
                                }
                                else {
                                    showToast('error', 'The question input field cannot be empty')
                                }
                                // questionInputValidation()
                                // onSubmit()
                                // console.log("clicked");
                            }} />
                    </div>}
                </Card>

            </div>
        </div>
    )
}
)

export { GuestQuestion };
