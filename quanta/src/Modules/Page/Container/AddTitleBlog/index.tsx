import { Button, Input, InputHeading } from '@Components'
import { AddTitleBlogProps } from './interface'
import { ROUTES } from '@Routes'
import { useNavigation } from '@Hooks'
import { useSelector } from 'react-redux'
import { translate } from '@I18n'

const AddTitleBlog = ({ titleValue, onChangeTitle, descriptionValue, onChangeDescription, onClick, isLoading, referenceName, onChangeReferenceName }: AddTitleBlogProps) => {

    const { editSectionType } = useSelector((state: any) => state.DashboardReducer);
    const { goTo } = useNavigation()

    return (
        <>
            <div>
                <div className='col'>
                    <Input
                        id={'title'}
                        heading={translate("common.title")!}
                        placeholder={translate("common.title")!}
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
                        <InputHeading heading={translate("course.description")!} />
                        <textarea className="form-control" id="description"
                            value={descriptionValue}
                            placeholder={translate("page.writeDescription")!}
                            onChange={(val) => {
                                if (onChangeDescription) {
                                    onChangeDescription(val)
                                }
                            }} />
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

export { AddTitleBlog }
