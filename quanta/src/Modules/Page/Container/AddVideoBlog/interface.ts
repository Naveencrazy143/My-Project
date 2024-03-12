export interface HeadingProps {
  onChangeTitle?: (e) => void
  onChangeUrl?: (e) => void
  handleFileSelect?: (e) => void
  onChangeDescription?: (e) => void
  titleValue?: string
  urlValue?: string
  imageBs64?: any
  descriptionValue?: string;
  onClick?: () => void;
  isLoading?: boolean
  responseImage?: string;
  onChangeReferenceName?: (val) => void;
  referenceName?: string;
}