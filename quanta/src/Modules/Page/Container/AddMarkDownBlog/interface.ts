export interface AddMarkDownBlogProps {
    onChangeTitle?: (val)=> void;
    titleValue?: string;
    descriptionValue?: string;
    onChangeDescription?: (val)=> void;
    onClick?: ()=> void;
    onChangeQuill?: (val) => void;
    quillValue?: string;
    isLoading?: boolean
    }