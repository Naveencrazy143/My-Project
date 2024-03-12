import { Value } from "classnames";

export interface InputWithImageProps {
    placeholder?: string;
    image?: string;
    onChange?: (val) => void;
    onClick?: () => void;
    value?: string;
    ref?: any;
    onFocus?: () => void;
    onBlur?: (e:any) => void
}