import { Image } from '@Components'
import { useNavigation } from '@Hooks'
import { VideoPlayerYoutube } from '@Modules'
import { fetchStudentSectionTypeVideo } from '@Redux'
import { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'


interface ViewStudentVideoPageTaskProps {
    id?: any;
}

const ViewStudentVideoPageTask = ({ id }: ViewStudentVideoPageTaskProps) => {
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
                <Image src={videoBlogResponse?.thumbnail}
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

export { ViewStudentVideoPageTask }

