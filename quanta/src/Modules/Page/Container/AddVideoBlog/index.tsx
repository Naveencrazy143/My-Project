import { Button, Input, InputHeading, Image } from '@Components'
import { HeadingProps } from './interface'
import { useSelector } from 'react-redux';
import { translate } from '@I18n';
import { SERVER } from '@Services';

const AddVideoBlog = ({ onChangeTitle, onChangeDescription, handleFileSelect, onChangeUrl, onClick, titleValue, imageBs64, descriptionValue, urlValue, isLoading, responseImage, referenceName, onChangeReferenceName }: HeadingProps) => {
    const { editSectionType } = useSelector((state: any) => state.DashboardReducer);


    console.log("111111111", imageBs64)
    console.log("222222222", responseImage)


    return (
        <>
            <div className='col'>
                <div>
                    <Input
                        heading={translate("common.title")!}
                        placeholder={translate("common.title")!}
                        onChange={(e) => {
                            if (onChangeTitle) {
                                onChangeTitle(e)
                            }
                        }}
                        value={titleValue}
                        id={"Title"}

                    />
                </div>
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
                <div>
                    <Input
                        heading={'Url'}
                        placeholder={'Url'}
                        onChange={(e) => {
                            if (onChangeUrl) {
                                onChangeUrl(e)
                            }
                        }}
                        value={urlValue}
                        id={"Url"}
                    />
                </div>
                <div>
                    <Input
                        id={'attachment'}
                        type={'file'}
                        heading={translate("page.attachment")!}
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
                <div className="form-group pt-3">
                    <InputHeading heading={translate("course.description")!} id={"Description"} />
                    <textarea
                        className="form-control"
                        id={"Description"}
                        placeholder={translate("page.writeDescription")!}
                        onChange={(e) => {
                            if (onChangeDescription) {
                                onChangeDescription(e)
                            }
                        }}
                        value={descriptionValue}
                    />
                </div>
                <div className='text-right pt-2 pb-3'>
                    <Button
                        isLoading={isLoading}
                        text={translate("common.submit")!}
                        size={'md'}
                        onClick={onClick}
                    />
                </div>
            </div>

        </>
    )

}

export { AddVideoBlog }
