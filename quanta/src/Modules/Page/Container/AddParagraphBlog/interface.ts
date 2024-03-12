export interface AddParagraphBlogProps {
    onChangeTitle?: (val)=> void;
    titleValue?: string;
    descriptionValue?: string;
    onChangeDescription?: (val)=> void;
    onClick?: ()=> void;
    isLoading?: boolean;
    onChangeReferenceName?: (val) => void;
    referenceName?: string;
    }