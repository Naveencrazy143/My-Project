import { Card } from '@Components'
import React, { useEffect, useState } from 'react'
import { ViewListPageTaskProps } from './interface'
import { useNavigation } from '@Hooks'
import { fetchSectionTypeList, getPageSectionTypeId } from '@Redux'
import { useDispatch, useSelector } from 'react-redux'
import { DropDownMenuArrow } from '@Modules'
import { ROUTES } from '@Routes'

const ViewListPageTask = ({ id, onDeleteClick, pageSectionId }: ViewListPageTaskProps) => {

    const { goTo } = useNavigation()
    const dispatch = useDispatch();
    const [listBlogResponse, setListBlogResponse] = useState<any>({})

//we get the id from AdminPage to call the api by using useEffect method

    useEffect(() => {
        getSectionTypeList()
    }, [id])

    const getSectionTypeList = () => {
        const params = {
            list_section_id: id
        }
        dispatch(fetchSectionTypeList({
            params,
            onSuccess: (success: any) => () => {
                console.log("Response=--->", success)
                setListBlogResponse(success)
            },
            onError: (error: any) => () => { }
        }))
    }

    return (
        <div className='p-3'>
            <div className='text-right'>
                <DropDownMenuArrow

                    onAddClick={() => {
                        dispatch(getPageSectionTypeId(listBlogResponse))
                        goTo('/dashboard/' + ROUTES.ADMIN.ADD_PAGE_TASK, false)


                    }}
                    onDeleteClick={() => {
                        if(onDeleteClick){
                            onDeleteClick(listBlogResponse)
                        }

                    }}
                />
            </div>
            <div>
                {listBlogResponse &&
                    <>
                        <div>
                            <h1 className='toUpperCase'>{listBlogResponse?.title}</h1>
                        </div>
                        <div>
                            <ol className=''>
                                {listBlogResponse && listBlogResponse?.list && listBlogResponse?.list.length > 0 && listBlogResponse?.list?.map((it: any, index: number) => {
                                    return (
                                        <>
                                            <li className="text-dark" >{it.value}
                                                <ol type='a' className="text-dark" >
                                                    {it && it?.child?.length > 0 && it?.child?.map((cIt1: any) => {
                                                        return (
                                                            <>
                                                                <li className='text-justify font-weight-normal'>{cIt1?.value}</li>
                                                                <ol type='i' className="text-dark" >
                                                                    {cIt1 && cIt1?.child?.length > 0 && cIt1?.child?.map((cIt2: any) => {
                                                                        return (
                                                                            <>
                                                                                <li className='text-justify font-weight-normal'>{cIt2?.value}</li>
                                                                                <ol className="text-dark" >

                                                                                    {cIt2 && cIt2?.child?.length > 0 && cIt2?.child?.map((cIt3: any) => {
                                                                                        return (
                                                                                            <>
                                                                                                <li className='text-justify font-weight-normal'>{cIt3?.value}</li>
                                                                                                <ol type='a'>
                                                                                                    {cIt3 && cIt3?.child?.length > 0 && cIt3?.child?.map((cIt4: any) => {
                                                                                                        return (
                                                                                                            <>
                                                                                                                <li className='text-justify font-weight-normal'>{cIt4?.value}</li>
                                                                                                                <ol type='i'>
                                                                                                                    {cIt4 && cIt4?.child?.length > 0 && cIt4?.child?.map((cIt5: any) => {
                                                                                                                        return (
                                                                                                                            <>
                                                                                                                                <li className='text-justify font-weight-normal'>{cIt5?.value}</li>
                                                                                                                            </>
                                                                                                                        )
                                                                                                                    })}
                                                                                                                </ol>
                                                                                                            </>
                                                                                                        )
                                                                                                    })}
                                                                                                </ol>
                                                                                            </>
                                                                                        )
                                                                                    })}
                                                                                </ol>
                                                                            </>
                                                                        )
                                                                    })}
                                                                </ol>
                                                            </>
                                                        )
                                                    })}
                                                </ol>
                                            </li>
                                        </>
                                    );
                                })}
                            </ol>
                        </div>
                    </>
                }
            </div>
        </div>
    )
}

export { ViewListPageTask } 