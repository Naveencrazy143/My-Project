export interface ProfilePictureProps {
    bgImage?: any;
    photo?: string;
    children?: React.ReactNode
    onClick?: () => void;
    isUserProfile?:boolean;
    editOnClick?:()=>void;
    isShowEdit?:boolean
}
