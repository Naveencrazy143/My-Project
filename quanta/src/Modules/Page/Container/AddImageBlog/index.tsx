import { Button, DropDown, Image, Input, InputHeading } from '@Components'
import { AddImageBlogProps } from './interface'
import { useSelector } from 'react-redux';
import { translate } from '@I18n';
import { SERVER } from '@Services';

const SIZE = [
    { id: 'S', name: 'Small' },
    { id: 'M', name: 'Medium' },
    { id: 'L', name: 'Large' },
]
const AddImageBlog = ({ onChangeTitle, titleValue, descriptionValue, onChangeDescription, onClick, handleFileSelect, alt, isLoading, imageBs64, responseImage, referenceName, onChangeReferenceName, onChangeSize, imageSizeValue }: AddImageBlogProps) => {

    const { editSectionType } = useSelector((state: any) => state.DashboardReducer);


    return (
        <>
            <div>
                <div className='col'>
                    <Input
                        id={'alt'}
                        heading={translate("page.alt")!}
                        placeholder={translate("page.altText")!}
                        type={'text'}
                        value={titleValue}
                        onChange={(val) => {
                            if (onChangeTitle) {
                                onChangeTitle(val)
                            }
                        }}
                    />
                    <Input
                        id={'reference name'}
                        heading={translate("page.referenceName")!}
                        placeholder={translate("page.referenceName")!}
                        type={'text'}
                        value={referenceName}
                        onChange={(val) => {
                            if (onChangeReferenceName) {
                                onChangeReferenceName(val)
                            }
                        }}
                        disabled={editSectionType ? true : false}
                    />
                    <div className="form-group">
                        <InputHeading heading={translate("page.subText")} />
                        <textarea className="form-control" id="sub text"
                            value={descriptionValue}
                            placeholder={translate("page.writeSubText")!}
                            onChange={(val) => {
                                if (onChangeDescription) {
                                    onChangeDescription(val)
                                }
                            }} />
                    </div>

                    <div className='mt-4'>
                        <DropDown
                            heading={translate("page.imageSize")}
                            data={SIZE}
                            placeholder={translate("page.selectSize")!}
                            value={imageSizeValue}
                            onChange={(val) => {
                                if (onChangeSize) {
                                    onChangeSize(val)
                                }
                            }
                            }
                        />
                    </div>

                    <div className='mt-4'>
                        <Input
                            id={'image'}
                            type={'file'}
                            heading={translate("page.image")!}
                            // value={imageValue}
                            onChange={(e) => {
                                if (handleFileSelect) {
                                    handleFileSelect(e)
                                }
                            }}
                        />
                    </div>

                    <div className='mt-3'>
                        {imageBs64 ? <Image
                            src={`data:image/jpeg;base64,${imageBs64}`}
                        /> :
                            <Image
                                src={responseImage && SERVER + responseImage}
                            />
                        }

                    </div>

                    <div className='text-right pt-5'>
                        <Button
                            isLoading={isLoading}
                            text={translate("common.submit")!}
                            size={'md'}
                            onClick={onClick}
                        />
                    </div>
                </div>
            </div>

        </>
    )
}

export { AddImageBlog }
