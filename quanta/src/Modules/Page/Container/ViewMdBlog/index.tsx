import React, { useEffect, useState } from 'react'
import { ViewMdBlogProps } from './interface'
import { Image } from '@Components'
import { fetchSectionTypeImage, fetchSectionTypeMd, getPageSectionTypeId } from '@Redux'
import { useDispatch } from 'react-redux'
import { DropDownMenuArrow } from '@Modules'
import { ROUTES } from '@Routes'
import { useNavigation } from '@Hooks'


const ViewMdBlog = ({ id, onDeleteClick }: ViewMdBlogProps) => {
    const [mdBlogResponse, setMdBlogRespponse] = useState<any>({})
    const dispatch = useDispatch();
    const { goTo } = useNavigation()

    console.log('imageBlogResponse', mdBlogResponse);

//we get the id from AdminPage to call the api by using useEffect method


    useEffect(() => {
        getSectionTypeMd()
    }, [id])

    const getSectionTypeMd = ()=>{
        const params = {
            md_section_id: id
        }

        dispatch(fetchSectionTypeMd({
            params,
            onSuccess: (response: any) => () => {

                setMdBlogRespponse(response)


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
                        dispatch(getPageSectionTypeId(mdBlogResponse))
                        goTo('/dashboard' + ROUTES.ADMIN.ADD_BLOG, false)


                    }}
                    onDeleteClick={() => {
                        if(onDeleteClick){
                            onDeleteClick(mdBlogResponse)
                        }

                    }}
                />
            </div>
            <div>
                <h1>{mdBlogResponse?.title}</h1>
            </div>
            {/* <div className=''>
                <Image src={mdBlogResponse && mdBlogResponse?.image }
                alt={mdBlogResponse?.alt_text} width={"50%"}
                />
            </div> */}
            <div className='pt-3'>
                <p>{mdBlogResponse?.mark_down}</p>
            </div>
        </div>
    )
}

export { ViewMdBlog }
