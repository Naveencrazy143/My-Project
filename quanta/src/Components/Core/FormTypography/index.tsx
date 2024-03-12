import React from 'react'

type ScreenTitleProps = {
    title: string;
    additionclass?: string;
    subTitle?: string;
}

function FormTypography({ title, additionclass, subTitle }: ScreenTitleProps) {

    return (
        <div className='mt-4'>
            <h5 className={`ct-title ${additionclass} text-muted`} >{title}</h5>
            <h4 className={`ct-title ${additionclass} `} >{subTitle}</h4>
        </div>
    )
}

export { FormTypography };