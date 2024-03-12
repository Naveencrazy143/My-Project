import React from 'react';
import { Button as RSButton } from 'reactstrap';
import { ButtonProps } from './interfaces';
import { Image } from '@Components'
import { Spinner as RsSpinner } from 'reactstrap'


function Button({
  text, color = 'primary', variant = 'default', size = 'sm', isLoading = false, buttonIcon, icon, iconHeight, iconWidth, ...rest
}: ButtonProps) {
  
  return (
    <>
      {variant === 'default' && <RSButton className='shadow-none' type={'button'} size={size} color={color} {...rest} >{!isLoading ? text :
        <div className='px-3'>
          <RsSpinner
            as="span"
            variant="warning"
            size="sm"
            role="status"
            aria-hidden="true"
            animation="grow" />
        </div>
      }</RSButton>}

      {(variant === 'icon' || variant === 'icon-with-text') &&
        <RSButton type={'button'} size={size} className={'btn-icon'} color={color} {...rest} >
          {
            <span className={`btn-inner--icon ${variant === 'icon-with-text' && 'mr-1'}`}>
              <Image src={icon} height={iconHeight} width={iconWidth} />
            </span>
          }
          {
            variant === 'icon-with-text' &&
            <span className={'btn-inner--text'}>{text}</span>
          }
        </RSButton>
      }

      {variant === 'icon-rounded' &&
        <RSButton type={'button'} size={size} className={'btn-icon-only rounded-circle'} color={color} {...rest} >
          <span className={'btn-inner--icon'}>
            <i className={`${buttonIcon}`} />
          </span>
        </RSButton>
      }
    </>
  )
}
export { Button };
