import React, { forwardRef, useRef } from 'react'
import { InputProps } from './interfaces'
import { Input as RsInput, FormGroup } from 'reactstrap'
import { InputHeading } from '@Components'

function Input({ id, className, heading, variant = 'default', Class, value, ...rest }: InputProps) {
    return (
        <FormGroup>
            <InputHeading Class={`${Class}`} heading={heading} id={id} />
            <RsInput className={`${className}  ${variant !== 'default' && 'form-control-' + variant}`} id={id} value={value} autoComplete="off" {...rest}></RsInput>
        </FormGroup>
    )
}
export { Input }
export type{ InputProps} 