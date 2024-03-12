import { Card } from '@Components'
import React, { useEffect, useState } from 'react'

import { useNavigation } from '@Hooks'
import { fetchSectionTypeTitle, fetchStudentSectionTypeTitle, getPageSectionTypeId } from '@Redux'
import { useDispatch, useSelector } from 'react-redux'
import { DropDownMenuArrow } from '@Modules'
import { ROUTES } from '@Routes'


 interface ViewStudentTitleBlogProps {
    id?: any;
}

const ViewStudentTitleBlog = ({ id,}: ViewStudentTitleBlogProps) => {




    const { goTo } = useNavigation()
    const dispatch = useDispatch();
    const [titleBlogResponse, setTitleBlogResponse] = useState<any>({})
    const [titleId, setTitleId] = useState<any>('')

    console.log("titleblogResponse", id)

//we get the id from studentPage to call the api by using useEffect method



    useEffect(() => {

        const params = {
            title_section_id: id
        }

        dispatch(fetchStudentSectionTypeTitle({
            params,
            onSuccess: (response: any) => () => {
                console.log('response',response);

                setTitleBlogResponse(response)


                


            },
            onError: (error: any) => () => {
                console.log('adad')
             }
        }))
    }, [id])



    return (
        <div className='p-3'>
            {titleBlogResponse &&
                <>
                    <div >
                        <h1 className='toUpperCase'>{titleBlogResponse?.title}</h1>
                    </div>
                    <div className='py-3 pb-3 text-justify'>
                        <p >{titleBlogResponse?.description}</p>
                    </div>
                </>
            }
        </div>
    )
}

export { ViewStudentTitleBlog } 