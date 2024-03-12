import { Back, Card, DropDown } from '@Components'
import React, { useEffect, useState } from 'react'
import { AddImageBlog, AddMarkDownBlog, AddParagraphBlog, AddTitleBlog, AddVideoBlog, AddListBlog } from "@Modules";
import { useDispatch, useSelector } from "react-redux";
import { fetchPageSections, getPageSectionTypeId, postGenericCrudDetails, postPageSection, syncDetails } from '@Redux';
import { convertToUpperCase, showToast } from '@Utils';
import { DynamicHeight } from '@Hooks';
import { translate } from '@I18n';

const BLOG_LIST = [
    { id: 'TS', name: 'Title' },
    { id: 'IS', name: 'Image' },
    { id: 'VS', name: 'Video' },
    { id: 'PS', name: 'Paragraph' },
    { id: 'LS', name: 'List' },
    // { id: 'MDS', name: 'Mark down' },
];

const AddBlog = () => {
    const { courseTopicName, pageSections, studentProcedureData, editSectionType } = useSelector((state: any) => state.DashboardReducer);
    const [blogType, setBlogType] = useState('')
    const [imageSrc, setImageSrc] = useState('');

    const { isSync } = useSelector(
        (state: any) => state.AppReducer
    );
    const dynamicHeight: any = DynamicHeight()


    const [title, setTitle] = useState<any>('')
    const [description, setDescription] = useState<any>('')
    const [Attachment, setAttachment] = useState<any>('')
    const [url, setUrl] = useState<any>('')
    const [list, setList] = useState<any>([])
    const [markDown, setMarkDown] = useState<any>('')
    const [alt, setAlt] = useState<any>('')
    const [reactQuillText, setReactQuillText] = useState('');
    const [submitLoader, setSubmitLoader] = useState(false)
    const [orderSequence, setOrderSequence] = useState<any>('')
    const [subText, setSubText] = useState<string>('')
    const [reference, setReference] = useState('')
    const [imageSize, setImageSize] = useState('')
    let imageUrlValue2 = editSectionType && imageSrc && imageSrc.toString().slice(0,1) === '/'
    

    const dispatch = useDispatch();


    //handleFileSelect this function is convert png to base64

    const handleFileSelect = (event) => {
        const file = event.target.files[0];
        const url = URL.createObjectURL(file);
        const xhr = new XMLHttpRequest();
        xhr.open("GET", url);
        xhr.responseType = "arraybuffer";
        xhr.onload = function () {
            const arr: any = new Uint8Array(this.response);
            const raw = String.fromCharCode.apply(null, arr);
            const b64 = btoa(raw);
            setImageSrc(b64)
        };
        xhr.send();
    };

    useEffect(() => {
        if (editSectionType?.id) {
            getPageSections()
        }
        prefillStates()
        return () => {
            dispatch(getPageSectionTypeId(undefined))
        };
        // handleClickData()
    }, [])


    const getPageSections = () => {
        const params = {
            page_id: courseTopicName?.page_id
        }
        dispatch(fetchPageSections({
            params,
            onSuccess: (success: any) => () => {
            },
            onError: (error: string) => () => {
            },
        }))
    }


    function convertMarkdownToBase64(markdown) {
        const base64Encoded = btoa(markdown);
        setReactQuillText(base64Encoded)
    }
    const onSubmitEmptyStates = () => {
        setTitle('')
        setAlt('')
        setAttachment('')
        setDescription('')
        setImageSrc('')
        setList('')
        setMarkDown('')
        setOrderSequence('')
        setReactQuillText('')
        setSubText('')
        setReference('')
        setImageSize('')
    }

    //prefillStates this function is used to prefill the state

    const prefillStates = () => {
        pageSections && pageSections.length > 0 && pageSections?.filter((el: any) => {
            if (el.id === editSectionType?.page_section?.id) {
                setBlogType(el?.section_type)
                setOrderSequence(el?.order_sequence)
                setTitle(editSectionType?.title)
                setAlt(editSectionType?.alt_text)
                setDescription(editSectionType?.description)
                setSubText(editSectionType?.sub_text)
                setImageSrc(editSectionType?.image || editSectionType?.thumbnail)
                setList(editSectionType?.list)
                setUrl(editSectionType?.url)
                setReference(editSectionType?.reference_name)
                setImageSize(editSectionType?.view_type)
            }
            else {

            }

        })

    }


    //addPageHandler this function is used to add page list section type by using generic crud

    const addPageHandler = (listValue: any) => {
        setSubmitLoader(true)

        const params = {
            ...(editSectionType && { id: editSectionType?.page_section?.id }),
            page_id: courseTopicName?.page_id,
            title: courseTopicName?.name,
            description: courseTopicName?.description,
            section_type: blogType,
            reference_name: reference,
            ...(blogType === "TS" && {
                title_section: {
                    ...(editSectionType && { id: editSectionType?.id }),
                    title: title,
                    description: description,
                    reference_name: reference
                }
            }),
            ...(blogType === "IS" && {
                image_section: {
                    ...(editSectionType && { id: editSectionType?.id }),
                    sub_text: subText,
                    alt_text: alt,
                    ...(!imageUrlValue2 && { image: imageSrc }),
                    ...(imageSize && { view_type: imageSize }),
                    reference_name: reference

                }
            }),
            ...(blogType === "VS" && {
                video_section: {
                    ...(editSectionType && { id: editSectionType?.id }),
                    title: title,
                    description: description,
                    url: url,
                    reference_name: reference,
                    ...(!imageUrlValue2 && { thumbnail: imageSrc }),

                }
            }),
            ...(blogType === "PS" && {
                paragraph_section: {
                    ...(editSectionType && { id: editSectionType?.id }),
                    title: title,
                    description: description,
                    reference_name: reference

                }
            }),
            ...(blogType === "LS" && {
                list_section: {
                    ...(editSectionType && { id: editSectionType?.id }),
                    title: title,
                    list: listValue,
                    reference_name: reference,
                    description: title
                }
            }),
            ...(blogType === "MDS" && {
                md_section: {
                    ...(editSectionType && { id: editSectionType?.id }),
                    title: title,
                    description: description,
                    mark_down: reactQuillText,
                    reference_name: reference
                }
            }),

            ...(editSectionType ? { order_sequence: orderSequence }
                : { order_sequence: pageSections && pageSections.length > 0 ? pageSections[pageSections.length - 1].order_sequence + 1 : pageSections.length + 1 })
        }

        dispatch(postPageSection({
            params,
            onSuccess: (success: any) => () => {
                dispatch(syncDetails({ ...isSync, 'pageSection': false }))
                setSubmitLoader(false)
                onSubmitEmptyStates()
                // getPageSections()
                setBlogType('')
                dispatch(getPageSectionTypeId(undefined))
                showToast('success', success.message)
            },
            onError: (error: any) => () => {
                setSubmitLoader(false)
                if (error.status_code === 0) {
                    showToast('error', error.error_message)
                }
            },
        }))

    }


    const listValidationHandler = (arr: Array<any>) => {
        let bool = false
        const getCurrentNodeRecursive = (
            arr: Array<any>
        ) => {
            arr.forEach((it, index) => {
                if (it.value === '') {
                    bool = true
                }
                else {
                    getCurrentNodeRecursive(it.child);
                }
            });
        }
        getCurrentNodeRecursive(arr);
        if (bool) {
            return true
        }
        else {
            return false;
        }
    };


    //validationHandler this function is used for validate all state


    const validationHandler = (listValue) => {
        let isExist: boolean = true
        if (blogType === 'TS') {
            if (title === '') {
                showToast('error', 'Please fill title')
                isExist = false
            }
            else if (reference === '') {
                showToast('error', 'Please fill Reference Name')
                isExist = false
            }
            else if (description === '') {
                showToast('error', 'Please fill description')
                isExist = false
            } else if (isExist) {
                addPageHandler(listValue)
            }
        }

        else if (blogType === 'PS') {
            if (title === '') {
                showToast('error', 'Please fill title')
                isExist = false
            }
            else if (reference === '') {
                showToast('error', 'Please fill Reference Name')
                isExist = false
            }
            else if (description === '') {
                showToast('error', 'Please fill description')
                isExist = false
            } else if (isExist) {
                addPageHandler(listValue)
            }
        }
        else if (blogType === 'IS') {
            if (alt === '') {
                showToast('error', 'Please fill alt text')
                isExist = false
            }
            else if (reference === '') {
                showToast('error', 'Please fill Reference Name')
                isExist = false
            }
            else if (subText === '') {
                showToast('error', 'Please fill sub text')
                isExist = false
            } else if (!imageSrc) {
                showToast('error', 'Please select image')
                isExist = false
            } else if (!imageSize) {
                showToast('error', 'Please select size of image')
                isExist = false
            }
            else if (isExist) {
                addPageHandler(listValue)
            }
        }
        else if (blogType === 'VS') {
            if (title === '') {
                showToast('error', 'Please fill title')
                isExist = false
            }
            else if (reference === '') {
                showToast('error', 'Please fill Reference Name')
                isExist = false
            }
            else if (url === '') {
                showToast('error', 'Please fill url')
                isExist = false
            } else if (!imageSrc) {
                showToast('error', 'Please select image')
                isExist = false
            } else if (description === '') {
                showToast('error', 'Please fill description')
                isExist = false
            }
            else if (isExist) {
                addPageHandler(listValue)
            }
        }
        else if (blogType === 'LS') {
            if (title === '') {
                showToast('error', 'Please fill title')
                isExist = false
            }
            else if (reference === '') {
                showToast('error', 'Please fill Reference Name')
                isExist = false
            }
            else if (listValidationHandler(listValue)) {
                showToast('error', 'Please fill all the list fields')
                isExist = false
            }
            else {
                addPageHandler(listValue)
            }
        }
    }

    return (
        <>
            <div className='py-2 container-fluid'>
                <div className=''>
                    <Back text={`${editSectionType ? translate("common.edit")! : translate("course.add")!} ${translate("course.section")!}`}
                        onClick={() => dispatch(getPageSectionTypeId(undefined))}
                    />
                </div>
                <Card className=' mt-0' style={{ height: dynamicHeight.dynamicWidth <= 1400 ? dynamicHeight.dynamicHeight - 30 : dynamicHeight.dynamicHeight - 100 }} >
                    <div className='row pb-4 pl-3'>
                        <div className='col-sm-3'>
                            <DropDown
                                heading={translate("course.sectionType")!}
                                data={BLOG_LIST}
                                placeholder={translate("course.sectionType")!}
                                value={blogType}
                                onChange={(e) => {
                                    setBlogType(e.target.value)
                                }}
                                disabled={editSectionType && true}
                            />
                        </div>
                    </div>
                    <div className='row pt-2 overflow-auto scroll-hidden' style={{ height: dynamicHeight.dynamicWidth <= 1400 ? dynamicHeight.dynamicHeight - 170 : dynamicHeight.dynamicHeight - 230 }}>
                        {blogType === 'TS' ? <div className='col-sm-12'>
                            <AddTitleBlog
                                descriptionValue={description}
                                titleValue={title}
                                onChangeTitle={(e) => { setTitle(convertToUpperCase(e.target.value)) }}
                                onChangeDescription={(e) => { setDescription(convertToUpperCase(e.target.value)) }}
                                isLoading={submitLoader}
                                onClick={() => {
                                    if (!submitLoader) {
                                        validationHandler('')
                                        dispatch(getPageSectionTypeId(undefined))
                                    }

                                }}
                                onChangeReferenceName={(e) => { setReference(e.target.value) }}
                                referenceName={editSectionType?.reference_name}

                            />
                        </div>
                            : blogType === 'IS' ? <div className='col-sm-12'>
                                <AddImageBlog
                                    descriptionValue={subText}
                                    titleValue={alt}
                                    imageBs64={!imageUrlValue2 && imageSrc}
                                    responseImage={imageUrlValue2 && imageSrc}
                                    handleFileSelect={(e) => handleFileSelect(e)}
                                    onChangeTitle={(e) => { setAlt(convertToUpperCase(e.target.value)) }}
                                    onChangeDescription={(e) => { setSubText(convertToUpperCase(e.target.value)) }}
                                    isLoading={submitLoader}
                                    onClick={() => {
                                        if (!submitLoader) {
                                            validationHandler('')
                                            dispatch(getPageSectionTypeId(undefined))
                                        }
                                    }}
                                    onChangeReferenceName={(e) => { setReference(e.target.value) }}
                                    referenceName={editSectionType?.reference_name}
                                    onChangeSize={(e) => setImageSize(e.target.value)}
                                    imageSizeValue={imageSize}
                                />
                            </div>
                                : blogType === 'VS' ? <div className='col-sm-12'>
                                    <AddVideoBlog
                                        onChangeUrl={(e) => { setUrl(e.target.value) }}
                                        titleValue={title}
                                        urlValue={url}
                                        imageBs64={!imageUrlValue2 && imageSrc}
                                        responseImage={imageUrlValue2 && imageSrc}
                                        descriptionValue={description}
                                        onChangeTitle={(e) => { setTitle(convertToUpperCase(e.target.value)) }}
                                        onChangeDescription={(e) => { setDescription(convertToUpperCase(e.target.value)) }}
                                        handleFileSelect={(e) => handleFileSelect(e)}
                                        isLoading={submitLoader}
                                        onClick={() => {
                                            if (!submitLoader) {
                                                validationHandler('')
                                                dispatch(getPageSectionTypeId(undefined))
                                            }
                                        }}
                                        onChangeReferenceName={(e) => { setReference(e.target.value) }}
                                        referenceName={editSectionType?.reference_name}

                                    />
                                </div>
                                    : blogType === 'PS' ? <div className='col-sm-12'>
                                        <AddParagraphBlog
                                            onChangeTitle={(e) => { setTitle(convertToUpperCase(e.target.value)) }}
                                            titleValue={title}
                                            descriptionValue={description}
                                            onChangeDescription={(e) => { setDescription(convertToUpperCase(e.target.value)) }}
                                            isLoading={submitLoader}
                                            onClick={() => {
                                                if (!submitLoader) {
                                                    validationHandler('')
                                                    dispatch(getPageSectionTypeId(undefined))
                                                }

                                            }}
                                            onChangeReferenceName={(e) => { setReference(e.target.value) }}
                                            referenceName={editSectionType?.reference_name}
                                        />
                                    </div>
                                        : blogType === 'LS' ? <div className='col-sm-12'>
                                            <AddListBlog
                                                onChangeTitle={(e) => { setTitle(convertToUpperCase(e.target.value)) }}
                                                titleValue={title}
                                                value={list}
                                                isLoading={submitLoader}
                                                onClick={(val) => {
                                                    if (!submitLoader) {
                                                        // setList(val)
                                                        validationHandler(val)
                                                    }

                                                }}
                                                onChangeReferenceName={(e) => { setReference(e.target.value) }}
                                                referenceName={editSectionType?.reference_name}

                                            />
                                        </div>
                                            : blogType === 'MDS' ? <div className='col-sm-12'>
                                                <AddMarkDownBlog
                                                    onChangeTitle={(e) => { setTitle(e.target.value) }}
                                                    onChangeDescription={(e) => { setDescription(e.target.value) }}
                                                    isLoading={submitLoader}
                                                    onClick={() => {
                                                        if (!submitLoader) {
                                                            validationHandler('')
                                                            dispatch(getPageSectionTypeId(undefined))
                                                            onSubmitEmptyStates()
                                                        }
                                                    }}
                                                    onChangeQuill={(val) => {
                                                        // console.log('ererere', val)
                                                        convertMarkdownToBase64(val)
                                                    }}
                                                // referenceName={editSectionType?.reference_name}

                                                // onChangeReferenceName={(e) => { setReference(e.target.value) }}
                                                // quillValue={reactQuillText}
                                                />
                                            </div>
                                                : <></>}
                    </div>
                </Card>
            </div>

        </>
    )
}

export { AddBlog }