import React, { useEffect, useState } from 'react'
import { ViewVideoBlogProps } from './interface'
import { Image, StepContainer } from '@Components'
import { fetchSectionTypeImage, fetchSectionTypeVideo, getPageSectionTypeId } from '@Redux'
import { useDispatch } from 'react-redux'
import { DropDownMenuArrow, VideoPlayerYoutube } from '@Modules'
import { ROUTES } from '@Routes'
import { useNavigation } from '@Hooks'
import { SERVER } from '@Services'


const ViewVideoBlog = ({ id, onDeleteClick }: ViewVideoBlogProps) => {
    console.log("ididid==>", id)
    const [videoBlogResponse, setVideoBlogResponse] = useState<any>({})
    const dispatch = useDispatch();
    const { goTo } = useNavigation()



    //we get the id from AdminPage to call the api by using useEffect method

    useEffect(() => {
        viewSectionTypeVideo()
    }, [id])

    const viewSectionTypeVideo = () => {
        const params = {
            video_section_id: id
        }

        dispatch(fetchSectionTypeVideo({
            params,
            onSuccess: (response: any) => () => {

                setVideoBlogResponse(response)


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
                        dispatch(getPageSectionTypeId(videoBlogResponse))
                        goTo('/dashboard' + ROUTES.ADMIN.ADD_BLOG, false)


                    }}
                    onDeleteClick={() => {
                        if (onDeleteClick) {
                            onDeleteClick(videoBlogResponse)
                        }

                    }}
                />
            </div>
            <div>
                <h1>{videoBlogResponse?.title}</h1>
            </div>
            <div className='py-3 pb-3'>
                <Image src={videoBlogResponse?.thumbnail && SERVER + videoBlogResponse?.thumbnail}
                    alt={videoBlogResponse?.alt_text} width={"68.8%"}
                />
            </div>
            <div className='py-3 pb-3 '>
                <VideoPlayerYoutube
                    videoId={videoBlogResponse?.url}

                />
            </div>
            <div className='py-3 pb-3 '>
                <StepContainer strData={videoBlogResponse?.description} />
            </div>
        </div>
    )
}

export { ViewVideoBlog }
