export interface ProfileCardProps {
    name?: string;
    bgImage?: string;
    photo?: string;
    subText?: string;
    height?: string;
    mobileNumber?: string;
    qualification?:string;
    editOnClick?:()=>void;
    mediaData?:any;
    isShowEdit?:boolean;
    isStudent?:boolean
}
