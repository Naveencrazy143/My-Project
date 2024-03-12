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

function AddLinkedInCommunity({ onAddCommunity }: LinkedInCommunityProps) {

    const dispatch = useDispatch()
    const dynamicHeight: any = DynamicHeight()
    const { goTo, goBack } = useNavigation()

    const {  currentTaskItem, linkedInCommunityItem } = useSelector((state: any) => state.DashboardReducer);

    const [title, setTitle] = useState("")
    const [description, setDescription] = useState("")
    const [url, setUrl] = useState("")
    const [communityType, setCommunityType] = useState('')
    const [imageSrc, setImageSrc] = useState('');

    let imageUrlValue = currentTaskItem && imageSrc && imageSrc.toString().includes('https')


    useEffect(() => {
        if (linkedInCommunityItem) {
            prefillDetails()
        }
    }, [])


    const prefillDetails = () => {
        setTitle(linkedInCommunityItem?.group_title)
        setDescription(linkedInCommunityItem?.description)
        setUrl(linkedInCommunityItem?.url)
        setCommunityType(linkedInCommunityItem?.type)
        setImageSrc(getImageUrl(linkedInCommunityItem?.thumbnail))
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
            {/* <Back text={currentTaskItem ? 'Edit LinkedIn community' : 'Add LinkedIn community'} /> */}
            {/* <Card className='overflow-auto scroll-hidden mt-0 ' style={{ height: dynamicHeight.dynamicWidth <= 1400 ? dynamicHeight.dynamicHeight - 30 : dynamicHeight.dynamicHeight - 100 }}> */}

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

            <div>
                <DropDown
                    heading={'Community type'}
                    placeholder={'Community type'}
                    data={COMMUNITY_TYPE}
                    value={communityType}
                    onChange={(e) => { setCommunityType(e.target.value) }}
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

            <label className={`form-control-label`}>{'Thumbnail'}</label>
            <div>
                <Dropzone variant='ICON'
                    icon={imageSrc}
                    onSelect={(image) => {
                        let encoded = image.toString().replace(/^data:(.*,)?/, '');
                        setImageSrc(encoded)
                    }}
                    size={'xl'}
                />
            </div>

            <div className='text-right'>
                <Button
                    size={'sm'}
                    text={translate('common.submit')!}
                    onClick={() => {

                        const dataSet = { group_title: title, description: description, url: url, type: communityType, thumbnail: imageSrc }
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

export { AddLinkedInCommunity }