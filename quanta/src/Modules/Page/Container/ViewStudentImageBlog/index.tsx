import { Image } from '@Components'
import { useNavigation } from '@Hooks'
import { fetchStudentSectionTypeImage } from '@Redux'
import { SERVER } from '@Services'
import { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'

interface ViewStudentImageBlogProps {
    id?: any;
}



const ViewStudentImageBlog = ({ id }: ViewStudentImageBlogProps) => {

    
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
                <Image src={imageBlogResponse && imageBlogResponse?.image && SERVER + imageBlogResponse?.image}
                    alt={imageBlogResponse?.alt_text} width={imageBlogResponse?.view_type === 'S' ? "20%" : imageBlogResponse?.view_type === 'M' ? '35%' : '50%'}
                />
            </div>
            <div className='py-3 pb-3 text-justify' >
                <p>{imageBlogResponse?.sub_text}</p>
            </div>
        </div>
    )
}

export { ViewStudentImageBlog }

