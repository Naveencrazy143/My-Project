export interface AddParagraphBlogProps {
    onChangeTitle?: (val)=> void;
    titleValue?: string;
    descriptionValue?: string;
    onChangeDescription?: (val)=> void;
    onClick?: (val)=> void;
    value?: any;
    onSubmit?: (value) => void;
    onInputChange?: (value) => void;
    showAddSubmit?: boolean
    isLoading?: boolean;
    onChangeReferenceName?: (val) => void;
    referenceName?: string;
    }