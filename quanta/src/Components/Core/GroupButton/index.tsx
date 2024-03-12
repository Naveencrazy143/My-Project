import React, { useState } from 'react'
import { ButtonGroup, Button } from 'reactstrap'


interface ButtonGroupProps {
    heading?: string | null;
    placeholder?: string;
    data?: Array<{ id?: string | number; name?: string; value?: string, title?: string, type?: string, group_name?: string, text?: string, other?: string }>;
    onClick?: (item)=> void;
    defaultSelected?: string
    size?: 'sm' | 'md' | 'lg'
    color?: string
    value?:string
}


const GroupButton: React.FC<ButtonGroupProps> = ({ data, onClick, defaultSelected = 'tamil', size, color = 'info' ,value}) => {
    const [oo,setOO] = useState<any>()
    console.log('hkhjhljhlkhlkhlkOO',oo)
    return (
        <>
            <ButtonGroup className="btn-group-toggle" data-toggle="buttons">
                {data && data.length > 0 && data.map((item, index) => (

                    <Button className={''} color="secondary" key={index} onClick={()=>{
                        if(onClick){
                            onClick(item)
                        }
                        }}>
                        <input
                            autoComplete="off"
                            name="options"
                            type="radio"
                            value={''}
                        />
                       {item.title}
                    </Button>
                ))}
            </ButtonGroup>
        </>
    )
}

export { GroupButton }