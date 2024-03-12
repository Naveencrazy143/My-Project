import { Back, Button, Card, CommonTable, DropDown, DropDownMenu, NoRecordsFound } from '@Components'
import { DynamicHeight, useLoader, useNavigation } from '@Hooks'
import { DropDownMenuArrow } from '@Modules'
import { getCourseBatches, settingSelectedBatchDetails } from '@Redux'
import { ROUTES } from '@Routes'
import { getDisplayDateFromMoment } from '@Utils'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { translate } from '@I18n';



const DROPDOWN_ITEM = [
    { id: 1, name: 'Edit' },
    { id: 2, name: 'Add student' }
]

function BatchGroupListing() {

    const dynamicHeight: any = DynamicHeight()
    const dispatch = useDispatch()
    const { goTo } = useNavigation()


    const { courseBatchesList, currentCourse, registeredCourses } = useSelector(
        (state: any) => state.DashboardReducer
    );

    const [course, setCourse] = useState('')
    const [coursesList, setCoursesList] = useState([])
    const batchListLoader = useLoader(false)

    useEffect(() => {
        getCourseBatchesList()

        if (registeredCourses.length > 0) {
            let allObj = { id: '-1', name: 'All' }
            let branchesObj: any = [allObj, ...registeredCourses]
            setCoursesList(branchesObj)
        }


    }, [])

    const getCourseBatchesList = (courseId?: string) => {

        const params = {
            ...(currentCourse && { course_id: currentCourse[0].id }),
            ...(courseId && courseId != '-1' && { course_id: courseId })
        }
        batchListLoader.showLoader()
        dispatch(getCourseBatches({
            params,
            onSuccess: (success) => () => { batchListLoader.hideLoader() },
            onError: (error) => () => { batchListLoader.hideLoader() }
        }))
    }

    const dropdownMenuItemActionHandler = (dropdownItem: any, data?: any) => {

        switch (dropdownItem.name) {
            case 'Edit':
                manageRoutingHandler(data)
                break;

            case 'Add student':
                dispatch(settingSelectedBatchDetails(data))
                goTo('/dashboard' + ROUTES.ADMIN.ASSIGN_BATCH_TO_STUDENT)
                break;

        }
    }

    const normalizedBatchData = (data: any) => {
        return data.map((el: any) => {
            return {
                [currentCourse ? `${translate('batch.batchName')}` : `${translate('course.course')}`]: currentCourse ? el.batch_name : el.course?.name,
                [`${translate('auth.branch')}`]: el?.company_branch?.name,
                [currentCourse ? `${translate('course.course')}` : `${translate('batch.batchName')}`]: currentCourse ? el?.course?.name : el?.batch_name,
                [`${translate('batch.duration')}`]: `${getDisplayDateFromMoment(el?.start_date)} - ${getDisplayDateFromMoment(el?.end_date)} `,
                [`${translate('course.students')}`]: el?.student_count + '/' + el?.student_limit,
                "": <>
                    <DropDownMenu
                        data={DROPDOWN_ITEM}
                        onItemClick={(e, item) => {
                            e.stopPropagation()
                            dropdownMenuItemActionHandler(item, el)
                        }}
                    />
                </>
            };
        });
    };

    const manageRoutingHandler = (data) => {
        data ? dispatch(settingSelectedBatchDetails(data)) : dispatch(settingSelectedBatchDetails(data))
        goTo('/dashboard' + ROUTES.ADMIN.BATCH_CREATION)

    }

    return (
        <div className={`container-fluid pt-2 pb-xl-0 pb-1`}>
            <Back text={currentCourse ? currentCourse[0].name + translate('batch.batchesList')!  : translate('batch.batchesList')!} />
            {/* <h2>{'Batches List'}</h2> */}

            <Card className='overflow-auto scroll-hidden mt-0' style={{ height: dynamicHeight.dynamicWidth <= 1400 ? dynamicHeight.dynamicHeight + 20 : dynamicHeight.dynamicHeight - 95 }}>
                <div className='text-right'>
                    <Button
                        text={translate('batch.createNewBatch')!}
                        size={'sm'}
                        onClick={() => {
                            manageRoutingHandler(undefined)
                        }}
                    />
                </div>

                {!currentCourse && (
                    <div className='col-sm-4'>
                        <DropDown
                            data={coursesList}
                            placeholder={translate('course.course')!}
                            heading={translate('course.course')!}
                            value={course}
                            onChange={(e) => {
                                setCourse(e.target.value)
                                getCourseBatchesList(e.target.value)
                            }}
                        />
                    </div>
                )}
                {courseBatchesList && courseBatchesList?.length > 0 ?
                    <div className=" overflow-auto " style={{ marginLeft: '-39px', marginRight: '-39px' }}>
                        <CommonTable displayDataSet={normalizedBatchData(courseBatchesList)}
                            isLoading={batchListLoader.loader}
                            tableOnClick={(e, index) => {
                                const currentItem = courseBatchesList[index]
                                dispatch(settingSelectedBatchDetails(currentItem))
                                goTo('/dashboard' + ROUTES.ADMIN.BATCH_DETAILS)

                            }}
                        />
                    </div>
                    : <div className='d-flex justify-content-center align-items-center' style={{ height: dynamicHeight.dynamicWidth <= 1400 ? dynamicHeight.dynamicHeight - 100 : dynamicHeight.dynamicHeight - 150 }} ><NoRecordsFound /></div>
                }
            </Card>
        </div>
    )
}

export { BatchGroupListing }