import { Image, StepContainer } from '@Components'
import { DynamicHeight, useNavigation } from '@Hooks'
import { DropDownMenuArrow, VideoPlayerYoutube } from '@Modules'
import { fetchSectionTypeVideo, getPageSectionTypeId } from '@Redux'
import { ROUTES } from '@Routes'
import { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { ViewVideoPageTaskProps } from './interface'
import { SERVER } from '@Services'


const ViewVideoPageTask = ({ id, onDeleteClick, pageSectionId }: ViewVideoPageTaskProps) => {
    console.log("ididid==>", id)
    const [videoBlogResponse, setVideoBlogResponse] = useState<any>({})
    const dispatch = useDispatch();
    const { goTo } = useNavigation()
    const dynamicHeight: any = DynamicHeight()




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

    const calculateHalfOfTheScreenHeight = () => {

        const screenHeight = dynamicHeight.dynamicHeight
        let halfOfTheScreenHeight: any = 70 / 100 * screenHeight

        return halfOfTheScreenHeight
    }

    const calculateTheScreenWidth = () => {

        const screenWidth = dynamicHeight.dynamicWidth
        let halfOfTheScreenWidth: any = 70 / 100 * screenWidth

        return halfOfTheScreenWidth
    }

    const opts = {
        height: calculateHalfOfTheScreenHeight(),
        width: dynamicHeight.dynamicWidth <= 992 ? dynamicHeight.dynamicWidth - 80 : calculateTheScreenWidth(),
        playerVars: {
            autoplay: 0,
            modestbranding: 1,
            controls: 1,
            showinfo: 0,
            showRelatedVideos: false,
            rel: 0
        }
    };

    return (
        <div className='p-3'>
            <div className='text-right'>
                <DropDownMenuArrow

                    onAddClick={() => {
                        dispatch(getPageSectionTypeId(videoBlogResponse))
                        goTo('/dashboard/' + ROUTES.ADMIN.ADD_PAGE_TASK, false)


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
                <Image src={videoBlogResponse && videoBlogResponse?.thumbnail && SERVER + videoBlogResponse?.thumbnail}
                    alt={videoBlogResponse?.alt_text } width={"68.8%"}
                />
            </div>
            <div className='py-3 pb-3 '>
                <VideoPlayerYoutube
                    videoId={videoBlogResponse?.url}
                    videoStyle={opts}
                />
            </div>
            <div className='py-3 pb-3 '>
                <StepContainer strData={videoBlogResponse?.description} />
            </div>
        </div>
    )
}

export { ViewVideoPageTask }

