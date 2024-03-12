import React from 'react';
import { Badge as RSBadge } from 'reactstrap';
import { BadgeProps } from './interfaces';

function Badge({ text, size = 'md', className, onClick, ...rest }: BadgeProps) {
  return (
    <RSBadge {...rest} className={`${className} ${size && `badge-${size}`}`} onClick={onClick}>
      {text}
    </RSBadge>
  )
}
export { Badge };

