import { Card } from '@Components'
import React from 'react'
import { useSelector } from 'react-redux';
import { FlowDiagramHeader, ListTypeComponent } from "@Modules"
// import { Card } from 'reactstrap';

const ComponentToPrint = React.forwardRef((props, ref: any) => {

    const { downloadTaskType, getTaskObject } = useSelector(
        (state: any) => state.GuestReducer
    );

    const viewTaskType = (type) => {

        return downloadTaskType.find((it) => it === type)
    }

    return (
        <div ref={ref} className='container-fluid zoom pt-4 pb-1' style={{ backgroundImage: " linear-gradient(315deg, #045de9 0%, #09c6f9 74%)" }}>

            {viewTaskType("QT") && <Card className='' style={{ backgroundColor: ' rgba(0,0,0,.75)' }}>
                <h4 className='text-white'>{"Question"}</h4>
                <p className='text-white text-justify'>{getTaskObject.question}</p>
            </Card>}
            {viewTaskType("IT") &&<Card className='' style={{ backgroundColor: ' rgba(0,0,0,.75)' }}>
                <div>
                    {getTaskObject && getTaskObject?.sampleIO && getTaskObject?.sampleIO.length > 0 && getTaskObject?.sampleIO.map((el) => {
                        return (
                            <div className='row justify-content-around '>
                                <div>
                                    <h4 className='text-white'>{"Sample Input"}</h4>
                                    <ul className='text-white ml--4'>


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

                                    <ul className='text-white ml--4'>

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
                        )
                    })

                    }
                </div>
            </Card>}
            {viewTaskType("RT") &&<ListTypeComponent title={"Rules"} data={getTaskObject?.rules} />}
            {viewTaskType("PT") &&<ListTypeComponent title={"Procedure"} data={getTaskObject?.procedure} />}
            {/* {viewTaskType("FT") &&<Card className='' style={{ backgroundColor: ' rgba(0,0,0,.75)' }}>
                <h4 className='text-white'>{"Flow Diagram"}</h4>
                <div className='text-center py-5'>
                    <img src={getTaskObject?.flowDiagramImage} alt='...'
                        width={'30%'}
                        style={{ filter: "invert(100%)" }}></img>
                </div>
            </Card>} */}
            {viewTaskType("CT") &&<Card className='' style={{ backgroundColor: ' rgba(0,0,0,.75)' }}>
                <h4 className='text-white'>{"Code"}</h4>
                <p className='text-white text-justify'>{getTaskObject.code}</p>
            </Card>}



        </div>
    )
}
)

export { ComponentToPrint }
