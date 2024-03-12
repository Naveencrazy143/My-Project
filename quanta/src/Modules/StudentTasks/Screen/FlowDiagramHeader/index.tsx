import { Button } from '@Components'
import { useApp } from '@Contexts';
import { useNavigation } from '@Hooks'
import { translate } from '@I18n';
import { isBackNavigation } from '@Redux';
import { GUEST_PATH, ROUTES } from '@Routes'
import { SERVER } from '@Services';
import { trace } from 'console';
import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
interface Props {
    ref?: any;
    onInputChange?: (value) => void;
    img?: string;
    showAddSubmit?: boolean
    isGuest?: boolean
    filter?: string
    isStudentQuestionCreation?: boolean
}
const FlowDiagramHeader = React.forwardRef(({ ref, img, showAddSubmit = false, isGuest = false, isStudentQuestionCreation = false, filter, ...props }: Props) => {
    const { goTo } = useNavigation()
    const dispatch = useDispatch();
    const { focus, setFocus } = useApp()

    const { studentFlowDiagramData } = useSelector((state: any) => state.DashboardReducer);
    const { flowDiagramImageUrl } = useSelector(
        (state: any) => state.StudentReducer
    );
    const [image, setImage] = useState('')
    console.log("studentFlowDiagramData==>", studentFlowDiagramData)
    console.log("img===>", img)

    

    return (
        <>
            <div className=' container-fluid' id='FlowDiagram' ref={ref}>
                {/* <div className='pt-6 pb-4 display-4 ' >{translate("guest.flowDiagram")}</div> */}
                <h3 className='text-info pt-3'>{translate('guest.flowDiagram')!}</h3>
                {!showAddSubmit && <Button
                    text={img ? translate("common.edit") : translate("guest.clickToDraw")}
                    className='mt--5 float-right'
                    onClick={() => {
                        if (setFocus) {
                            setFocus('')
                        }
                        dispatch(isBackNavigation(false))
                        if (isGuest) {
                            goTo(GUEST_PATH.GUEST_FLOW_DIAGRAM)

                        }
                        else if (isStudentQuestionCreation) {
                            goTo(ROUTES.HOME.STUDENT_FLOW_DIAGRAM, false)
                        }
                        else {
                            goTo(ROUTES.HOME.FLOWDIAGRAM, false)
                        }
                    }}
                />}
                <div className='text-center pb-5'>
                    <img src={(img && SERVER + img) || 'https://www.ntaskmanager.com/wp-content/uploads/2020/02/flow-charting.png'} alt='...Image'
                        width={img ? '30%' : '100%'}
                        style={{ filter: filter }}></img>
                </div>

            </div>
        </>
    )
}
)

export { FlowDiagramHeader }