export type DropDownMenuArrowProps = {
    onAddClick?: (e:React.MouseEvent<HTMLElement>)=> void;
    onDeleteClick?: (e: React.MouseEvent<HTMLElement>)=> void;
    onAssignCourse?: (e: React.MouseEvent<HTMLElement>)=> void;
    isStudent?:boolean;
    onAddChild?:(e: React.MouseEvent<HTMLElement>)=> void;
    isAddChild?:boolean
    showEdit?:boolean
    onAddRemark?:(e: React.MouseEvent<HTMLElement>)=> void;
    showDelete?: boolean;
    disabled?: boolean;
    isVideoCall?:boolean;
    onVideoCall?:(e: React.MouseEvent<HTMLElement>)=> void;
}