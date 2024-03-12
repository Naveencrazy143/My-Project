import React from "react";
import { CardProps } from "./interfaces";
import {
  Card as RsCard,
  CardBody,
  CardTitle,
  CardHeader,
  CardFooter,
} from "reactstrap";
import { Button, DragAndReorder, FileUpload, Spinner } from "@Components";
import { translate } from "@I18n";

function Card({
  title,
  children,
  taskCompletionRatio,
  isCardBody = false,
  completionRatioText,
  isCardFooter = false,
  footerChildren,
  isHeaderChildren,
  isLoading = false,
  onAddClick,
  Class,
  buttonText,
  upload = false,
  onFileSelect,
  onSubmitFileUpload,
  uploadTitle,
  data,
  dragAndDrop = false,
  onSubmitDndClick,
  dndData,
  isDndModalOpen,
  onTemplateClick,
  isDownloadTemplate = false,
  isOpen, 
  isUploadModalOpen,
  CardBodyStyle,
  ...rest
}: CardProps) {

  return (
    <RsCard {...rest} >
      {isLoading && <Spinner />}

      {!isLoading && (
        <>
          {title &&  (
            <CardTitle>
              <CardHeader >
                <div className="row">
                  <div className="col">
                    <h5 className="h3 mb-0">{title}</h5>
                    {taskCompletionRatio && (
                      <h6 className="text-muted ls-1">{`${taskCompletionRatio} ${completionRatioText}`}</h6>
                    )}
                  </div>
                  <div className="pr-3">
                    <div className="float-right d-flex">
                      {(upload || isDownloadTemplate) && (
                        <div className="">
                          <FileUpload
                            title={uploadTitle}
                            onSelect={(data) => {
                              if (onFileSelect) {
                                onFileSelect(data)
                              }
                            }}
                            onSubmitClick={(data) => {
                              if (onSubmitFileUpload) {
                                onSubmitFileUpload(data)
                              }
                            }}
                            onTemplateClick={onTemplateClick}
                            isDownloadTemplate
                            isOpen={isOpen}
                            isUploadModalOpen={isUploadModalOpen}
                          />
                        </div>
                      )}

                      {dragAndDrop && data && data?.length > 1 && (
                        <div>
                          <DragAndReorder
                            title={translate("course.courseSectionTopic")!}
                            dndData={dndData}
                            isDndModalOpen={isDndModalOpen}
                            onSubmitClick={(data) => { if (onSubmitDndClick) onSubmitDndClick(data) }}
                          />

                        </div>
                      )}

                      {isHeaderChildren && (
                        <div className="">{isHeaderChildren}</div>
                      )}
                      {buttonText && (
                        <div className="">
                          <Button
                            className="btn float-right"
                            color="primary"
                            onClick={onAddClick}
                            size="sm"
                            text={buttonText}
                          />
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </CardHeader>
            </CardTitle>
          )}

          {!isCardBody ? (
            <CardBody style={CardBodyStyle}>{children}</CardBody>
          ) : (
            <div>{children}</div>
          )}
          {isCardFooter && <CardFooter>{footerChildren}</CardFooter>}
        </>
      )}
    </RsCard>
  );
}

export { Card };
