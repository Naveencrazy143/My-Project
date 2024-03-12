export interface AddImagePageTaskProps {
    onChangeTitle?: (val) => void;
    titleValue?: string;
    descriptionValue?: string;
    onChangeDescription?: (val) => void;
    onClick: () => void;
    handleFileSelect?: (val) => void;
    imageBs64?: any;
    alt?: string;
    isLoading?: boolean;
    setImageBase64?: (val) => void
    responseImage?: string;
    onChangeReferenceName?: (val) => void;
    referenceName?: string;
    onChangeSize?: (val) => void;
    imageSizeValue?: string
}