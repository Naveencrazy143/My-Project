import { StepContainer } from '@Components'
import { useNavigation } from '@Hooks'
import { fetchStudentSectionTypeParagraph } from '@Redux'
import { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'

interface ViewStudentParagraphPageTaskProps {
    id?: any;
}

const ViewStudentParagraphPageTask = ({ id}: ViewStudentParagraphPageTaskProps) => {

    const { goTo } = useNavigation()
    const dispatch = useDispatch();
    const [paragraphBlogResponse, setParagraphBlogResponse] = useState<any>({})

//we get the id from studentPage to call the api by using useEffect method

    useEffect(() => {
        getStudentSectionTypeParagraph()
    }, [id])

    const getStudentSectionTypeParagraph = () => {
        const params = {
            paragraph_section_id: id
        }

        dispatch(fetchStudentSectionTypeParagraph({
            params,
            onSuccess: (response: any) => () => {

                setParagraphBlogResponse(response)


            },
            onError: (error: any) => () => { }
        }))
    }

    return (
        <div className='p-3'>
            {paragraphBlogResponse &&
                <>
                    <div>
                        <h1 className='toUpperCase'>{paragraphBlogResponse?.title}</h1>
                    </div>
                    <div className='py-3 pb-3 text-justify' >
                        <StepContainer strData={paragraphBlogResponse?.description} />


                    </div>
                </>
            }
        </div>
    )
}

export { ViewStudentParagraphPageTask }
