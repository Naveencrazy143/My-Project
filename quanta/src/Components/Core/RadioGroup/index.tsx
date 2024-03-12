import { Button } from '@Components'
import React, { useState } from 'react'
import { ButtonGroup } from 'reactstrap'

interface RadioProps {
    onButtonClick?: (item) => void;
    isActive?: string;
    data?: any
}

function RadioGroup({ onButtonClick, isActive, data }: RadioProps) {

    // const [isActive, setIsActive] = useState('')


    return (
        <div className=''>
            <ButtonGroup className="btn-group-toggle " data-toggle="buttons">
                {data && data?.length > 0 && data.map((el) => {
                    return (
                        <Button
                            className={`${isActive === el.value && 'active'}`}
                            // color="secondary"
                            onClick={() => {
                                if (onButtonClick) {
                                    onButtonClick(el.value)
                                }
                            }}
                            text={el.value}>

                            <input
                                autoComplete="off"
                                name="options"
                                type="radio"
                                value={isActive}
                            />
                        </Button>
                    )
                })}
            </ButtonGroup>




        </div>
    )
}

export { RadioGroup }