import { RsButtonProps, Color, ButtonVariants } from '@Components'

export interface ButtonProps extends RsButtonProps {
    text?: string | null | undefined
    color?: Color | '#fcfafa'
    variant?: ButtonVariants
    size?: 'sm' | 'md' | 'lg';
    isLoading?:boolean;
    buttonIcon?: string;
    icon?:string | undefined
}