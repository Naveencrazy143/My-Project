import React, { useEffect, useState } from "react";
import { ModalProps } from "./interfaces";
import { Modal as RsModal } from "reactstrap";
import { Spinner } from '@Components';
import { translate } from "@I18n";
import { DynamicHeight } from "@Hooks";

function Modal({
  isOpen,
  children,
  title,
  subTitle,
  size = "md",
  onClose,
  isHeaderChildren,
  isModalLoading,
  titleClassname,
  onTemplateClick,
  isDownloadTemplate,
  margin='ml--3',
  ...rest
}: ModalProps) {
  const dynamicHeight: any = DynamicHeight()

  const[display,setDisplay]=useState('none')


//   const openModal=()=> {
//     if (isOpen){
//       setDisplay('block')
//     }
//     else {
//       setDisplay('none')
//     }
//  }
 
//  const closeModal=()=> {
//   //  setModelShow('')
//    setDisplay('none')
//  }
 
   useEffect(() => {
     if (isOpen) {
       document.body.style.overflow = 'hidden';
     }
     else {
       document.body.style.overflow = 'unset';
     }
   }, [isOpen])
 
  return (
    <RsModal
      className={`modal-dialog-centered modal-${size} zoom `}
      isOpen={isOpen}
      fade={false} 
      {...rest}
    >
      {isModalLoading && <Spinner />}
      <div className={"modal-header "}>
        {title && <h3 className={` col ${margin}   ${titleClassname}`}>{title}</h3>}
        
        {isHeaderChildren &&
          <>
            {isHeaderChildren}
          </>}
        <button
          aria-label={"Close"}
          className={"close"}
          data-dismiss={"modal"}
          type={"button"}
          onClick={() => {
            if (onClose) {
              onClose();
            }
          }}
        >
          <span aria-hidden={true} className="mr--2 ">×</span>
        </button>
      </div>
      {isDownloadTemplate && <div className="ml-4 mt--2 font-weight-light h5 text-primary" >
          <a role={'button'} onClick={onTemplateClick} >{translate("course.downloadTemplate")}</a>
        </div>}
      <div className="modal-body">{children}</div>
    </RsModal>
  );
}

export { Modal };
export type { ModalProps };
