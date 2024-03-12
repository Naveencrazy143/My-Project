import { useNavigation } from '@Hooks'
import { DropDownMenuArrow } from '@Modules'
import { fetchSectionTypeTitle, getPageSectionTypeId } from '@Redux'
import { ROUTES } from '@Routes'
import { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { ViewTitlePageTaskProps } from './interface'
import { StepContainer } from '@Components'

          
const ViewTitlePageTask = ({ id, onAddClick, editId, onDeleteClick, pageSectionId }: ViewTitlePageTaskProps) => {

    const { goTo } = useNavigation()
    const dispatch = useDispatch();
    const [titleBlogResponse, setTitleBlogResponse] = useState<any>({})
    const [titleId, setTitleId] = useState<any>('')


//we get the id from AdminPage to call the api by using useEffect method

    useEffect(() => {
        getSectionTypeTitle()
    }, [id])

    const getSectionTypeTitle = () =>{
        
        const params = {
            title_section_id: id
        }

        dispatch(fetchSectionTypeTitle({
            params,
            onSuccess: (response: any) => () => {
                setTitleBlogResponse(response)

            },
            onError: (error: any) => () => { }
        }))
    }

// console.log("titleBlogResponse==>",titleBlogResponse)

    return (
        <div className='p-3'>
            <div className='text-right'>
                <DropDownMenuArrow

                    onAddClick={() => {
                        dispatch(getPageSectionTypeId(titleBlogResponse))
                        goTo('/dashboard/' + ROUTES.ADMIN.ADD_PAGE_TASK, false)


                    }}
                    onDeleteClick={() => {

                        if (onDeleteClick) {
                            // dispatch(getPageSectionTypeId(titleBlogResponse))
                            onDeleteClick(titleBlogResponse)
                        }
                    }}
                />
            </div>
            {titleBlogResponse &&
                <>
                    <div>
                        <h1 className='toUpperCase'>{titleBlogResponse?.title}</h1>
                    </div>
                    <div className='py-3 pb-3 text-justify'>
                        <StepContainer strData={titleBlogResponse?.description} />
                    </div>
                </>
            }
        </div>
    )
}

export { ViewTitlePageTask }
