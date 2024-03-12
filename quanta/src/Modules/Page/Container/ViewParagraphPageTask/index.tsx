import { Card, StepContainer } from '@Components'
import React, { useEffect, useState } from 'react'
import { ViewParagraphPageTaskProps } from './interface'
import { useNavigation } from '@Hooks'
import { fetchSectionTypeParagraph, fetchSectionTypeTitle, getPageSectionTypeId } from '@Redux'
import { useDispatch, useSelector } from 'react-redux'
import { DropDownMenuArrow } from '@Modules'
import { ROUTES } from '@Routes'

const ViewParagraphPageTask = ({ id, onDeleteClick, pageSectionId }: ViewParagraphPageTaskProps) => {

    const { goTo } = useNavigation()
    const dispatch = useDispatch();
    const [paragraphBlogResponse, setParagraphBlogResponse] = useState<any>({})

//we get the id from AdminPage to call the api by using useEffect method


    useEffect(() => {
        getSectionTypeParagraph()
    }, [id])

    const getSectionTypeParagraph = () => {
        const params = {
            paragraph_section_id: id
        }

        dispatch(fetchSectionTypeParagraph({
            params,
            onSuccess: (response: any) => () => {

                setParagraphBlogResponse(response)


                console.log(JSON.stringify(response) + '======');


            },
            onError: (error: any) => () => { }
        }))
    }

    return (
        <div className='p-3'>
            <div className='text-right'>
                <DropDownMenuArrow

                    onAddClick={() => {
                        dispatch(getPageSectionTypeId(paragraphBlogResponse))
                        goTo('/dashboard/' + ROUTES.ADMIN.ADD_PAGE_TASK, false)


                    }}
                    onDeleteClick={() => {
                        if(onDeleteClick){
                            onDeleteClick(paragraphBlogResponse)
                        }

                    }}
                />
            </div>
            {paragraphBlogResponse &&
                <>
                    <div className='py-3 pb-3'>
                        <h1 className='toUpperCase'>{paragraphBlogResponse?.title}</h1>
                    </div>
                    <div className='py-3 pb-3 text-justify'>
                        <StepContainer strData={paragraphBlogResponse?.description} />
                    </div>
                </>
            }
        </div>
    )
}

export { ViewParagraphPageTask } 