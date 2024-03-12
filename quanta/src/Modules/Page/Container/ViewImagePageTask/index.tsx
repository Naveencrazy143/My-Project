import React, { useEffect, useState } from 'react'
import { ViewImagePageTaskProps } from './interface'
import { Image, StepContainer } from '@Components'
import { fetchSectionTypeImage, getPageSectionTypeId } from '@Redux'
import { useDispatch } from 'react-redux'
import { DropDownMenuArrow } from '@Modules'
import { ROUTES } from '@Routes'
import { useNavigation } from '@Hooks'
import { SERVER } from '@Services'


const ViewImagePageTask = ({ id, onDeleteClick, pageSectionId }: ViewImagePageTaskProps) => {
    const [imageBlogResponse, setImageBlogResponse] = useState<any>({})
    const { goTo } = useNavigation()
    const dispatch = useDispatch();

    console.log('imageBlogResponse', imageBlogResponse);
    

//we get the id from AdminPage to call the api by using useEffect method


    useEffect(() => {
        getSectionTypeImage()
    }, [id])

    const getSectionTypeImage = () => {
        const params = {
            image_section_id: id
        }

        dispatch(fetchSectionTypeImage({
            params,
            onSuccess: (response: any) => () => {

                setImageBlogResponse(response)


                console.log('jlkjlkjlkjl', JSON.stringify(response) + '======');


            },
            onError: (error: any) => () => { }
        }))

    }

    return (
        <div className='p-3'>
            <div className='text-right'>
                <DropDownMenuArrow
                    
                    onAddClick={() => {
                        dispatch(getPageSectionTypeId(imageBlogResponse))
                        goTo('/dashboard/' + ROUTES.ADMIN.ADD_PAGE_TASK, false)


                    }}
                    onDeleteClick={() => {
                        if(onDeleteClick){
                            onDeleteClick(imageBlogResponse)
                        }
                    }}
                />
            </div>
            <div>
                <h1>{imageBlogResponse?.alt_text}</h1>
            </div>
            <div className='py-3 pb-3'>
                <Image src={imageBlogResponse && imageBlogResponse?.image && SERVER + imageBlogResponse?.image}
                    alt={imageBlogResponse?.alt_text} width={imageBlogResponse?.view_type === 'S' ? "25%" : imageBlogResponse?.view_type === 'M' ? '50%' : '70%'}
                />
            </div>
            <div className='py-3 pb-3 text-justify'>
                <StepContainer strData={imageBlogResponse?.sub_text} />
            </div>
        </div>
    )
}

export { ViewImagePageTask }
