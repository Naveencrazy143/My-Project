export interface ListComponentProps {
    data?: any
    title?: string
    onCheckChange?: (val) => void
    checked?:boolean
    id?:string
    text?:string
    checkBox?:boolean
    style?:string
    isEdit?: boolean;
}