export interface userOnlineStatusProps {
    onNameClick?: () => void;
    onClick?: (bool: boolean) => void;
    data?: any;
    onImageClick?: () => void;
    onAddClick?: boolean;
    isViewClick?: boolean;
    onChange?: (val) => void;
    onSearchClick?: () => void;
    className?: string;
    isLoading?: boolean;
    onFocus?: () => void;
    onBlur?: () => void;
    isButtonView?:boolean
    cardHeight?:any
}