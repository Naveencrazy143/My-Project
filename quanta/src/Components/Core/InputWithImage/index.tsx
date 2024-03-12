import { useRef } from 'react';
import { FormGroup, Input, InputGroup, InputGroupAddon, InputGroupText } from 'reactstrap'
import { Button } from '../Button'
import { InputWithImageProps } from './interface'

function InputWithImage({ placeholder, image, onChange, onClick, ref, value, onFocus, onBlur, ...rest }: InputWithImageProps) {



    return (
        <>
            <div>
                <FormGroup>
                    <InputGroup
                    >
                        <Input
                            ref={ref}
                            placeholder={placeholder}
                            onChange={onChange}
                            value={value}
                            onFocus={onFocus}
                            onBlur={onBlur}
                            {...rest}
                        />
                        <InputGroupAddon addonType="append">
                            <InputGroupText>
                                <i className={`bi bi-${image} text-primary`} onClick={onClick} />
                            </InputGroupText>
                        </InputGroupAddon>
                    </InputGroup>
                </FormGroup>
            </div>
        </>
    )
}

export { InputWithImage }

