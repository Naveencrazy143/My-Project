import React, { useEffect, useState } from 'react'
import { Image } from '@Components'
import { fetchSectionTypeImage, fetchStudentSectionTypeImage, getPageSectionTypeId } from '@Redux'
import { useDispatch, useSelector } from 'react-redux'
import { DropDownMenuArrow } from '@Modules'
import { ROUTES } from '@Routes'
import { useNavigation } from '@Hooks'

interface ViewStudentImagePageTaskProps {
    id?: any;
}



const ViewStudentImagePageTask = ({ id }: ViewStudentImagePageTaskProps) => {

    
    const [imageBlogResponse, setImageBlogResponse] = useState<any>({})
    const { goTo } = useNavigation()
    const dispatch = useDispatch();




//we get the id from studentPage to call the api by using useEffect method



    useEffect(() => {
        getStudentSectionTypeImage()
    }, [id])

    const getStudentSectionTypeImage = () => {
        const params = {
            image_section_id: id
        }

        dispatch(fetchStudentSectionTypeImage({
            params,
            onSuccess: (response: any) => () => {

                setImageBlogResponse(response)

            },
            onError: (error: any) => () => { }
        }))

    }

    return (
        <div className='p-3'>
            <div>
                <h1>{imageBlogResponse?.alt_text}</h1>
            </div>
            <div className='py-3 pb-3' >
                <Image src={imageBlogResponse && imageBlogResponse?.image}
                    alt={imageBlogResponse?.alt_text} width={imageBlogResponse?.view_type === 'S' ? "20%" : imageBlogResponse?.view_type === 'M' ? '35%' : '50%'}
                />
            </div>
            <div className='py-3 pb-3 text-justify' >
                <p>{imageBlogResponse?.sub_text}</p>
            </div>
        </div>
    )
}

export { ViewStudentImagePageTask }
