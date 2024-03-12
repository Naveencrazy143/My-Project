import { useNavigation } from '@Hooks'
import { fetchStudentSectionTypeList } from '@Redux'
import { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'

interface ViewStudentListPageTaskProps {
    id?: any;
}

const ViewStudentListPageTask = ({ id }: ViewStudentListPageTaskProps) => {

    const { goTo } = useNavigation()
    const dispatch = useDispatch();
    const [listBlogResponse, setListBlogResponse] = useState<any>({})

//we get the id from studentPage to call the api by using useEffect method

    useEffect(() => {
        getStudentSectionTypeList()
    }, [id])

    const getStudentSectionTypeList = () => {
        const params = {
            list_section_id: id
        }
        dispatch(fetchStudentSectionTypeList({
            params,
            onSuccess: (success: any) => () => {
                console.log("Response=--->", success)
                setListBlogResponse(success)
            },
            onError: (error: any) => () => { }
        }))
    }

    return (
        <div className='p-3  '>
            <div className=''>
                {listBlogResponse &&
                    <>
                        <div>
                            <h1 className='toUpperCase'>{listBlogResponse?.title}</h1>
                        </div>
                        <ul className='ml--3 '>

                            {listBlogResponse && listBlogResponse?.list && listBlogResponse?.list.length > 0 && listBlogResponse?.list?.map((it: any, index: number) => {
                                return (
                                    <>
                                        <li className="" >{it.value}
                                            <ul>

                                                {it && it?.child?.length > 0 && it?.child?.map((cIt1: any) => {
                                                    return (
                                                        <>
                                                            <li className=' font-weight-normal'>{cIt1?.value}
                                                                <ul>

                                                                    {cIt1 && cIt1?.child?.length > 0 && cIt1?.child?.map((cIt2: any) => {
                                                                        return (
                                                                            <>
                                                                                <li className=' font-weight-normal '>{cIt2?.value}</li>


                                                                                {cIt2 && cIt2?.child?.length > 0 && cIt2?.child?.map((cIt3: any) => {
                                                                                    return (
                                                                                        <>
                                                                                            <li className=' font-weight-normal '>{cIt3?.value}</li>

                                                                                            {cIt3 && cIt3?.child?.length > 0 && cIt3?.child?.map((cIt4: any) => {
                                                                                                return (
                                                                                                    <>
                                                                                                        <li className=' font-weight-normal'>{cIt4?.value}</li>

                                                                                                        {cIt4 && cIt4?.child?.length > 0 && cIt4?.child?.map((cIt5: any) => {
                                                                                                            return (
                                                                                                                <>
                                                                                                                    <li className=' font-weight-normal'>{cIt5?.value}</li>
                                                                                                                </>
                                                                                                            )
                                                                                                        })}

                                                                                                    </>
                                                                                                )
                                                                                            })}

                                                                                        </>
                                                                                    )
                                                                                })}

                                                                            </>
                                                                        )
                                                                    })}
                                                                </ul>
                                                            </li>

                                                        </>
                                                    )
                                                })}

                                            </ul>

                                        </li>
                                    </>
                                );
                            })}
                        </ul>

                    </>
                }
            </div>
        </div>
    )
}

export { ViewStudentListPageTask }
