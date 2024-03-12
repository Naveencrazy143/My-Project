import React from "react";
import { RsCardProps, Color } from '@Components'
export interface CardProps extends RsCardProps {
    title?: string;
    children: React.ReactNode
    color?: Color
    taskCompletionRatio?: string
    isCardBody?: boolean
    footerChildren?: React.ReactNode;
    onAddClick?: () => void;
    isHeaderChildren?: React.ReactNode
    buttonText?: string
    Class?: string
    isLoading?: boolean;
    completionRatioText?: string;
    isSearch?: boolean
    upload?: boolean;
    onFileSelect?: (data) => void;
    onSubmitFileUpload?: (data) => void;
    uploadTitle?: string;
    dragAndDrop?: boolean
    data?: any
    onSubmitDndClick?: (data: any) => void;
    dndData?: any;
    isDndModalOpen?: boolean;
    onTemplateClick?: any;
    isDownloadTemplate?: boolean;
    isOpen?:  boolean;
    isUploadModalOpen?: boolean;
    CardBodyStyle?:any
}