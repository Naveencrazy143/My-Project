import { Back, Card, DropDown, Input, Image, Button, Dropzone } from '@Components'
import { DynamicHeight, useNavigation } from '@Hooks'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { translate } from '@I18n';
import { fetchTaskDetails, postAddCourseTask } from '@Redux';
import { getImageUrl, showToast } from '@Utils';

const COMMUNITY_TYPE = [
    { id: 1, name: 'Opened group', value: 'Opened group' },
    { id: 2, name: 'Closed group', value: 'Closed group' }

]

interface LinkedInCommunityProps {
    onAddCommunity?: (item: any) => void
}

function AddCommunity({ onAddCommunity }: LinkedInCommunityProps) {

    const { currentTaskItem, communityItem } = useSelector((state: any) => state.DashboardReducer);

    const [title, setTitle] = useState("")
    const [description, setDescription] = useState("")
    const [url, setUrl] = useState("")
    const [communityType, setCommunityType] = useState('GB')
    const [communityCode, setCommunityCode] = useState<any>({ class: 'btn-icon-only rounded-circle btn btn-global', icon: 'ni ni-world-2' })

    useEffect(() => {
        if (communityItem) {
            prefillDetails()
        }
    }, [])

console.log("communityitem==>", communityItem)
    const prefillDetails = () => {
        setTitle(communityItem?.title)
        setDescription(communityItem?.description)
        setUrl(communityItem?.url)
        setCommunityCode(communityItem.code)
    }


    const validatePostParams = () => {

        if (!title) {
            showToast("error", "Title field cannot be empty")
            return false
        } else if (!description) {
            showToast("error", "Description field cannot be empty")
            return false
        } else if (!communityType) {
            showToast("error", "Please select Community type")
            return false
        }
        else if (!url) {
            showToast("error", "URL field cannot be empty")
            return false
        }
        else {
            return true
        }
    }



    // const handleClick = () => {
    //     window.open('https://www.linkedin.com/groups/25827', '_blank');
    // };


    return (
        <div className=''>

            <div className="mt--4 mb-2">
                <Button
                    className={` btn-icon-only rounded-circle ${communityCode === 'FACEBOOK' ? "btn btn-facebook" : "btn btn-light"}`}
                    size={'md'}
                    variant={'icon-rounded'}
                    buttonIcon={'fab fa-facebook'}
                    onClick={() => {
                        setCommunityType('FB')
                        setCommunityCode('FACEBOOK')
                    }}
                />
                <Button
                    className={` btn-icon-only rounded-circle ${communityCode === 'GOOGLE' ? "btn-google-plus" : "btn btn-light"} btn btn-google`}
                    size={'md'}
                    variant={'icon-rounded'}
                    buttonIcon={'fab fa-google-plus-g'}
                    onClick={() => {
                        setCommunityType('GL')
                        setCommunityCode('GOOGLE')

                    }}
                />
                <Button
                    className={` btn-icon-only rounded-circle ${communityCode === 'LINKEDIN' ? "btn btn-facebook" : "btn btn-light"}`}
                    size={'md'}
                    variant={'icon-rounded'}
                    buttonIcon={'bi bi-linkedin'}
                    onClick={() => {
                        setCommunityType('LN')
                        setCommunityCode('LINKEDIN')
                    }}
                />
                <Button
                    className={`btn-icon-only rounded-circle ${communityCode === 'YOUTUBE' ? "btn btn-youtube" : "btn btn-light"}`}
                    size={'md'}
                    variant={'icon-rounded'}
                    buttonIcon={'fab fa-youtube'}
                    onClick={() => {
                        setCommunityType('YT')
                        setCommunityCode('YOUTUBE')

                    }}
                />

                <Button
                    className={`btn-icon-only rounded-circle  ${communityCode === 'TELEGRAM' ? "btn btn-twitter" : "btn btn-light"}`}
                    size={'md'}
                    variant={'icon-rounded'}
                    buttonIcon={'ni ni-send'}
                    onClick={() => {
                        setCommunityType('TG')
                        setCommunityCode('TELEGRAM')
                    }}
                />

                <Button
                    className={`btn-icon-only rounded-circle ${communityCode === 'INSTAGRAM' ? "btn btn-youtube" : "btn btn-light"}`}
                    size={'md'}
                    variant={'icon-rounded'}
                    buttonIcon={'fab fa-instagram'}
                    onClick={() => {
                        setCommunityType('IG')
                        setCommunityCode('INSTAGRAM')
                    }}
                />
                <Button
                    className={`btn-icon-only rounded-circle  ${communityCode === 'TWITTER' ? "btn btn-twitter" : "btn btn-light"}`}
                    size={'md'}
                    variant={'icon-rounded'}
                    buttonIcon={'fab fa-twitter'}
                    onClick={() => {
                        setCommunityType('TR')
                        setCommunityCode('TWITTER')

                    }}
                />
                <Button
                    className={`btn-icon-only rounded-circle ${communityCode === 'GLOBAL' ? "btn btn-global" : "btn btn-light"}`}
                    size={'md'}
                    variant={'icon-rounded'}
                    buttonIcon={'ni ni-world-2'}
                    onClick={() => {
                        setCommunityType('GB')
                        setCommunityCode('GLOBAL')
                    }}
                />
            </div>

            <div>
                <Input
                    heading={translate("common.title")!}
                    placeholder={translate("common.title")!}
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                />
            </div>

            <div>
                <Input
                    heading={translate("course.description")!}
                    placeholder={translate("course.description")!}
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                />
            </div>

            <div className='mt-4'>
                <Input
                    heading={'Url'}
                    placeholder={'Url'}
                    value={url}
                    onChange={(e) => setUrl(e.target.value)}
                />
            </div>

            <div className='text-right'>
                <Button
                    size={'sm'}
                    text={translate('common.submit')!}
                    onClick={() => {

                        const dataSet = { title: title, description: description, url: url, code: communityCode}
                        if (onAddCommunity && validatePostParams()) {
                            onAddCommunity(dataSet)
                        }
                    }}
                />
            </div>
            {/* </Card> */}
        </div>
    )
}

export { AddCommunity }