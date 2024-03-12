
export interface CommentSectionProps {
    name?: string;
    message?: any;
    isSender?: boolean;
    senderSrc?: string;
    receiverSrc?: string;
    onClick?: () => void;
    onChange?: (val) => void;
    value?: string;
    onRefresh?: () => void;
    isLoading?: boolean
    height?:string;
    messageLength?: string | undefined;
    onPopUp?:()=> void;
    onPopClose?:()=> void;
    isPopUp?: boolean;
    id?: string;
}