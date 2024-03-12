import { icons } from '@Assets';
import { Modal, Image, Button } from '@Components';
import { translate } from '@I18n';
import { showToast } from '@Utils';
import React, { useRef, useState } from 'react'
import { Col, ListGroup, ListGroupItem, Row, Button as RSButton } from 'reactstrap';
// import * as XLSX from 'xlsx'

interface UploadProps {
    onSelect?: (value) => void;
    isOpen?: boolean;
    size?: 'sm';
    title?: string;
    onSubmitClick?: (data) => void
    isUploadModalOpen?: boolean;
    isDownloadTemplate?: boolean;
    onTemplateClick?: any;
}

function FileUpload({ onSelect, isOpen, size, title, onSubmitClick, isUploadModalOpen = false, isDownloadTemplate= false, onTemplateClick }: UploadProps) {
    // const fileInputRef = useRef<any>();
    const [isOpenModal, setIsOpenModal] = useState(isOpen)
    const [fileName, setFileName] = useState('')
    const [fileData, setFileData] = useState<any>()

    const selectHandler = (e: any) => {
        console.log('e', e);
        let fileName = document.getElementById('selectImage') as HTMLInputElement | null;
        let check = fileName && fileName.value.toLowerCase()

        if (check != null) {
            const file = e.target.files[0];
            console.log("filefile", file);
            setFileName(file.name)

            const name = file.name.split(".")
            let reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = () => {
                let encoded = reader && reader.result && reader.result.toString().replace('data:', '')
                    .replace(/^.+,/, '');
                if (onSelect) {
                    onSelect(encoded);
                    setFileData(encoded)
                }
                console.log('encidededed-================>', encoded);
            }
        }
        else if (check != null) {
            showToast("error", 'Please upload Excel files only.')
        }
    }

    const handleRefClick = () => {
        const input = document.getElementById('selectImage') as HTMLInputElement | null;
        if (input != null) {
            input.click()
        }
    };

    return (
        <div>

            <span className=" ni ni-cloud-upload-96 mt-1 mr-2 ni-lg pointer" onClick={() => {
                setIsOpenModal(!isOpenModal)
                // handleRefClick
            }}  ></span>

            <Modal
                isOpen={isOpenModal}
                size={size}
                onClose={() => setIsOpenModal(!isOpenModal)}
                title={title}
                isDownloadTemplate={isDownloadTemplate}
                onTemplateClick={onTemplateClick}
            >
                <div
                    className="dropzone dropzone-multiple"
                    id="dropzone-multiple"
                >

                    {!fileData && (
                        <div className="dz-default dz-message"
                            onClick={() => {
                                handleRefClick()

                            }}
                        >
                            <input id='selectImage' type="file"
                                hidden onChange={(e) => selectHandler(e)} accept="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel" />
                            <button className="dz-button" type="button">{translate("course.dropFileHereToUpload")!}</button>
                        </div>

                    )}


                    {fileName && (
                        <div className="mt-3">
                            <Row className=" align-items-center">
                                <Col className=" col-auto">
                                    <div className=" avatar">
                                        <img
                                            alt="..."
                                            className=" avatar-img rounded"
                                            src={icons.excel}
                                        />
                                    </div>
                                </Col>
                                <div className=" col ml--3">
                                    <h4 className=" mb-1" >
                                        {fileName}
                                    </h4>
                                </div>
                                <Col className=" col-auto">
                                    <RSButton
                                        size="sm"
                                        color="danger"
                                        onClick={() => {
                                            setFileData('')
                                            setFileName('')
                                        }}
                                    >
                                        <i className="fas fa-trash" />
                                    </RSButton>
                                </Col>
                            </Row>
                        </div>
                    )}
                </div>

                <div className="text-right mt-3">
                    <Button
                        color={'primary'}
                        text={translate("common.submit")!}
                        onClick={() => {
                            if (onSubmitClick) {
                                setFileData('')
                                setFileName('')
                                onSubmitClick(fileData)
                                if (!isUploadModalOpen) { setIsOpenModal(!isOpenModal) }
                            }
                        }}
                    />
                </div>
            </Modal>
        </div>
    )
}

export { FileUpload }