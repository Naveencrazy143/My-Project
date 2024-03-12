import React, { useEffect, useState } from 'react'
import { Image } from '@Components'
import { fetchSectionTypeImage, fetchSectionTypeVideo, fetchStudentSectionTypeVideo, getPageSectionTypeId } from '@Redux'
import { useDispatch } from 'react-redux'
import {  VideoPlayerYoutube } from '@Modules'
import { ROUTES } from '@Routes'
import { useNavigation } from '@Hooks'
import { SERVER } from '@Services'


interface ViewStudentVideoBlogProps {
    id?: any;
}

const ViewStudentVideoBlog = ({ id }: ViewStudentVideoBlogProps) => {
    const [videoBlogResponse, setVideoBlogResponse] = useState<any>({})
    const dispatch = useDispatch();
    const { goTo } = useNavigation()


//we get the id from studentPage to call the api by using useEffect method


    useEffect(() => {
        viewStudentSectionTypeVideo()
    }, [id])

    const viewStudentSectionTypeVideo = () => {
        const params = {
            video_section_id: id
        }

        dispatch(fetchStudentSectionTypeVideo({
            params,
            onSuccess: (response: any) => () => {

                setVideoBlogResponse(response)


            },
            onError: (error: any) => () => { }
        }))
    }

    return (
        <div className='p-3'>
            <div>
                <h1>{videoBlogResponse?.title}</h1>
            </div>
            <div className='py-3 pb-3' >
                <Image src={videoBlogResponse && videoBlogResponse?.thumbnail && SERVER + videoBlogResponse?.thumbnail}
                    alt={videoBlogResponse?.alt_text} width={"68.8%"}
                />
            </div>
            <div className='py-3 pb-3' >
                <VideoPlayerYoutube
                    videoId={videoBlogResponse?.url}

                />
            </div>
            <div className='py-3 pb-3 text-justify'>
                <p>{videoBlogResponse?.description}</p>
            </div>
        </div>
    )
}

export { ViewStudentVideoBlog }
