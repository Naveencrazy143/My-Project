import React from 'react'
import { Progress } from 'reactstrap'
import { ProgressBarProps } from './interface'
function ProgressBar({ variant = 'default', size = 'md', max, value, ...rest }: ProgressBarProps) {


    return (
        <Progress
            color={variant}
            className={`progress-${size} mb-0`}
            max={max}
            value={value}
          />
    )
}

export { ProgressBar }