import { Back, Button, Card, Divider, DragAndReorder, DropDown, FileUpload, Modal, NoRecordsFound } from '@Components';
import { DynamicHeight, useLoader, useNavigation } from '@Hooks';
import { translate } from '@I18n';
import { fetchCourseTemplates, fetchCourseTopicTasks, handleDndModal, isBackNavigation, postBulkUploadTasks, postGenericBatchCrudDetails, postGenericCrudDetails, settingCurrentTaskItem, settingMinimumSpentMinutes, settingPageTaskTitle, settingTaskMetaId, settingTaskPageAndMetaId, settingTaskPageId } from '@Redux';
import { ROUTES } from '@Routes';
import { showToast, urlDownloader } from '@Utils';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { GetCommunityCard, GetLinkedInCommunityCard, GetMockInterviewCard, GetPageCard, GetSoftwareDevelopmentCard, GetSoftwareScreeningCard, GetVideoScreeningCard } from '../../../AdminTaskCreation/Container/AdminTaskMetaCard';

const TASK_TYPE: any = [{ id: '-1', name: 'All' },
{ id: "345d084a-c312-4210-bd06-12e4292df491", name: "Realtime" },
{ id: "c2a67b48-e4e2-460e-bc4b-651f9a5cc309", name: "Basics" }]

const TASK_META_TYPE = [
  { id: 1, title: "Software Development" },
  { id: 2, title: "Video" },
  { id: 3, title: "Mock Interview" },
  // { id: 4, title: "One to One Screening" },
  // { id: 5, title: "AI Screening" },
  { id: 4, title: "Page" },
  // { id: 7, title: "LinkedIn community" },
  { id: 5, title: "Community" },
  { id: 6, title: "Software Development Screening" },


]

function AdminTopicSection() {

  const dispatch = useDispatch();
  const { goTo } = useNavigation()

  const { courseTopicTasks, courseTopicName, isBack } = useSelector(
    (state: any) => state.DashboardReducer
  );
  const dynamicHeight: any = DynamicHeight()
  const [deleteModal, setDeleteModal] = useState(false)
  const [currentDeleteItem, setCurrentDeleteItem] = useState<any>()
  const [taskType, setTaskType] = useState('-1')
  const [taskBulkUploadData, setTaskBulkUploadData] = useState<any>()
  const [isBulkUploadModalOpen, setIsBulkUploadModalOpen] = useState<boolean>(false)
  const [isTaskMetaModalOpen, setIsTaskMetaModalOpen] = useState(false)
  const [dragReorderData, setDragReorderData] = useState([])
  const [isDeleteLoader, setIsDeleteLoader] = useState(false)

  useEffect(() => {
    if (!isBack) {
      getCourseTopicTasks('-1')
  }
    else {
      dispatch(isBackNavigation(false))
    }

  }, [])

  useEffect(() => {
    dispatch(settingCurrentTaskItem(undefined))
    dispatch(settingPageTaskTitle(undefined))
    dispatch(settingTaskPageAndMetaId(undefined))
    dispatch(settingTaskMetaId(undefined))
    dispatch(settingTaskPageId(undefined))
    dispatch(settingMinimumSpentMinutes(undefined))

  }, [])

  // postBulkUploadTasks

  const bulkUploadTasks = () => {

    const params = {
      csv_file: taskBulkUploadData,
      code: courseTopicName?.code
    }
    setIsBulkUploadModalOpen(true)

    dispatch(postBulkUploadTasks({
      params,
      onSuccess: (success: any) => () => {
        setIsBulkUploadModalOpen(false)
        showToast('success', success.message)
        getCourseTopicTasks('-1')
      },
      onError: (error: any) => () => {
        setIsBulkUploadModalOpen(true)
        if (error?.status_code === 0) {
          showToast('error', error?.error_message)
        }
      },
    }))

  }

  // template download
  const onTemplateClickHandler = (e: any, type: string) => {
    e.stopPropagation()
    e.preventDefault()
    const params = {
      course_templates_type: type
    }
    dispatch(fetchCourseTemplates({
      params,
      onSuccess: (success: any) => () => {
        urlDownloader(success[0]?.course_task_template)
      },
      onError: (error: any) => () => {

      },
    }))
  }

  const getCourseTopicTasks = (typeId) => {

    const params = {
      topic_id: courseTopicName?.id,
      ...(typeId !== '-1' && { task_type_id: typeId })
    }

    dispatch(fetchCourseTopicTasks({ // getTaskItems api
      params,
      onSuccess: (success: any) => () => {
        console.log("succuucucpageecjecl==>", success)
      },
      onError: (error: string) => () => {
      }
    }))
  }

  const handleDndSubmit = (subTopic: any) => {

    const params = {
      mq: "course__TaskItem",
      data: subTopic
    }
    dispatch(postGenericBatchCrudDetails({
      params,
      onSuccess: (success: any) => () => {
        showToast('success', success.message)
        getCourseTopicTasks("-1")
        dispatch(handleDndModal(true))
      },
      onError: (error: string) => () => {
        dispatch(handleDndModal(true))
      }
    }))
  }

  const onDeleteHandler = (item) => {
    setIsDeleteLoader(true)
    const params = {
      mq: "course__TaskItem",
      data: { id: item.id },
      force_delete: true,
    }

    dispatch(postGenericCrudDetails({
      params,
      onSuccess: (success: any) => () => {
        showToast('success', success.message)
        setIsDeleteLoader(false)
        setDeleteModal(!deleteModal)
        getCourseTopicTasks("-1")
      },
      onError: (error: any) => () => {
        setIsDeleteLoader(false)
      },
    }))
  }


  const manageTaskHandler = (currentItem: any, screen: any) => {

    if (screen === 'Software Development') {
      goTo('/dashboard' + ROUTES.HOME.QUESTION_CREATION)
    }

    else if (screen === 'Video') {
      goTo('/dashboard/' + ROUTES.ADMIN.ADD_VIDEO_TASK)
    }

    else if (screen === 'Mock Interview') {
      // dispatch(settingIsOpenTaskTypeModal(!isOpenTaskTypeModal))
      goTo('/dashboard/' + ROUTES.ADMIN.ADD_MOCK_INTERVIEW)
    }

    else if (screen === 'Page') {
      goTo('/dashboard/' + ROUTES.ADMIN.ADMIN_PAGE_TASK)
    }

    // else if (screen === 'LinkedIn community') {
    //   goTo('/dashboard/' + ROUTES.ADMIN.LINKEDIN_COMMUNITY_GROUP_LISTING)
    // }

    else if (screen === 'Community') {
      goTo('/dashboard/' + ROUTES.ADMIN.COMMUNITY_GROUP_LISTING)
    }

    else if (screen === 'Software Development Screening') {
      goTo('/dashboard/' + ROUTES.ADMIN.ADD_SOFTWARE_SCREENING)
    }

    else if (currentItem?.task_meta?.task_meta_type === 'SWD') {
      dispatch(settingCurrentTaskItem(currentItem))
      goTo('/dashboard' + ROUTES.HOME.QUESTION_CREATION)
    }

    else if (currentItem?.task_meta?.task_meta_type === 'VDO') {
      dispatch(settingCurrentTaskItem(currentItem))
      goTo('/dashboard/' + ROUTES.ADMIN.ADD_VIDEO_TASK)
    }

    else if (currentItem?.task_meta?.task_meta_type === 'MI') {
      dispatch(settingCurrentTaskItem(currentItem))
      goTo('/dashboard/' + ROUTES.ADMIN.ADD_MOCK_INTERVIEW)
    }

    else if (currentItem?.task_meta?.task_meta_type === 'LC') {
      dispatch(settingCurrentTaskItem(currentItem))
      goTo('/dashboard/' + ROUTES.ADMIN.LINKEDIN_COMMUNITY_GROUP_LISTING)
    }

    else if (currentItem?.task_meta?.task_meta_type === 'COM') {
      dispatch(settingCurrentTaskItem(currentItem))
      goTo('/dashboard/' + ROUTES.ADMIN.COMMUNITY_GROUP_LISTING)
    }

    else if (currentItem?.task_meta?.task_meta_type === 'SCR' || currentItem?.task_meta?.task_meta_type === 'AI') {
      dispatch(settingCurrentTaskItem(currentItem))
      goTo('/dashboard/' + ROUTES.ADMIN.ADD_SOFTWARE_SCREENING)
    }

    else if (currentItem?.task_meta?.task_meta_type === 'PGE') {
      console.log("currentItem?.task_meta==>",currentItem?.task_meta);
      
      dispatch(settingCurrentTaskItem(currentItem))
      dispatch(settingTaskPageAndMetaId({taskMetaId: currentItem?.task_meta?.id, taskPageId: currentItem?.task_meta?.details?.page}))
      dispatch(settingPageTaskTitle(currentItem?.task_meta?.name))
      dispatch(settingMinimumSpentMinutes(currentItem?.task_meta?.details?.minimum_spent_mins))
      goTo('/dashboard/' + ROUTES.ADMIN.ADMIN_PAGE_TASK)
    }

  }

  useEffect(() => {
    dragAndReorderDataHandler()
  }, [courseTopicTasks])

  const dragAndReorderDataHandler = () => {
    const courseTopicTasksData = courseTopicTasks && courseTopicTasks.length > 0 && courseTopicTasks.map((item) => {
      return { id: item.id, name: item.task_meta.name }
    })
    setDragReorderData(courseTopicTasksData)
  }


  const getNormalizedTaskMetaTypeCard = (item, index) => {

    const type = item.task_meta.task_meta_type

    switch (type) {
      case "SWD":

        return <GetSoftwareDevelopmentCard
          data={item}
          onDeleteClick={() => {
            setCurrentDeleteItem(item)
            setDeleteModal(!deleteModal)
          }}
          onEditClick={() => {
            dispatch(isBackNavigation(false))
            manageTaskHandler(item, "")
          }}
        />

      case "VDO":

        return <GetVideoScreeningCard
          data={item}
          onDeleteClick={() => {
            setCurrentDeleteItem(item)
            setDeleteModal(!deleteModal)
          }}
          onEditClick={() => {
            dispatch(isBackNavigation(false))
            manageTaskHandler(item, "")
          }}
        />

      case "PGE":
        return <GetPageCard
          data={item}
          onDeleteClick={() => {
            setCurrentDeleteItem(item)
            setDeleteModal(!deleteModal)
          }}
          onEditClick={() => {
            dispatch(isBackNavigation(false))
            manageTaskHandler(item, "")
          }}
        />

      case "LC":

        return <GetLinkedInCommunityCard
          data={item}
          onDeleteClick={() => {
            setCurrentDeleteItem(item)
            setDeleteModal(!deleteModal)
          }}
          onEditClick={() => {
            dispatch(isBackNavigation(false))
            manageTaskHandler(item, "")
          }}
        />

        case "COM":

        return <GetCommunityCard
          data={item}
          onDeleteClick={() => {
            setCurrentDeleteItem(item)
            setDeleteModal(!deleteModal)
          }}
          onEditClick={() => {
            dispatch(isBackNavigation(false))
            manageTaskHandler(item, "")
          }}
        />

      case "MI":
        return <GetMockInterviewCard
          data={item}

          onDeleteClick={() => {
            setCurrentDeleteItem(item)
            setDeleteModal(!deleteModal)
          }}
          onEditClick={() => {
            dispatch(isBackNavigation(false))
            manageTaskHandler(item, "")
          }}
        />
      case "SCR":
        return <GetSoftwareScreeningCard
          data={item}
          onDeleteClick={() => {
            setCurrentDeleteItem(item)
            setDeleteModal(!deleteModal)
          }}
          onEditClick={() => {
            dispatch(isBackNavigation(false))
            manageTaskHandler(item, "")
          }}
        />

        case "SCR":
        return <GetSoftwareScreeningCard
          data={item}
          onDeleteClick={() => {
            setCurrentDeleteItem(item)
            setDeleteModal(!deleteModal)
          }}
          onEditClick={() => {
            dispatch(isBackNavigation(false))
            manageTaskHandler(item, "")
          }}
        />
      default:
    }
  }

  return (
    <>
      <div className='container-fluid pt-2 '>
        <div className='pb-2' onClick={() => {
          dispatch(isBackNavigation(true))
        }}>
          <Back text={courseTopicName?.name} />
        </div>


        <Card className=' mt-0 ' >
          <div className="row pb-2" >
            <div className='col'>
              <div className='float-right d-flex'>
                <div>
                  <FileUpload
                    title={translate("course.uploadTaskDetails")!}
                    onSelect={(data) => {
                      setTaskBulkUploadData(data)
                    }}
                    onSubmitClick={() => {
                      bulkUploadTasks()
                    }}
                    isDownloadTemplate
                    onTemplateClick={(e: any) => onTemplateClickHandler(e, 'TSK')}
                    isOpen={isBulkUploadModalOpen}
                    isUploadModalOpen={isBulkUploadModalOpen}
                  />
                </div>

                {courseTopicTasks && courseTopicTasks?.length > 1 && (
                  <DragAndReorder
                    title={translate('course.topicSection')!}
                    dndData={dragReorderData}
                    onSubmitClick={(data) => handleDndSubmit(data)}
                  />
                )}


                {/* <div className="col-sm-2 text-right"> */}
                <Button
                  // className="btn float-right mr--4"
                  color="primary"
                  onClick={() => {
                    // dispatch(isBackNavigation(false))
                    // manageTaskHandler(undefined)
                    setIsTaskMetaModalOpen(true)

                  }}
                  size="sm"
                  text={translate('course.add')!}

                />
              </div>
              <div className='col-xl-4 col-s-0 col-8 dropDown-style mt-2'>
                <DropDown
                  placeholder='Task type'
                  data={TASK_TYPE}
                  value={taskType}
                  onChange={(e) => {
                    setTaskType(e.target.value)
                    getCourseTopicTasks(e.target.value)

                  }}
                />
              </div>

            </div>
          </div>
        </Card>


        {courseTopicTasks && courseTopicTasks?.length > 0 ?

          <div className='overflow-auto scroll-hidden ' style={{ height: dynamicHeight.dynamicWidth <= 1400 ? dynamicHeight.dynamicHeight - 125 : dynamicHeight.dynamicHeight - 230 }}>
            {courseTopicTasks.map((el, index) => {
              return (
                <>
                  {getNormalizedTaskMetaTypeCard(el, index)}
                </>
              )
            })}
          </div>

          // <div className="overflow-auto scroll-hidden"
          //   style={{ height: dynamicHeight.dynamicWidth <= 1400 ? dynamicHeight.dynamicHeight - 125 : dynamicHeight.dynamicHeight - 205, margin: '0px -39px 0px -39px' }}
          // >
          //   <CommonTable displayDataSet={normalizedTaskData(courseTopicTasks)}
          //     isLoading={taskLoader.loader}
          //   />
          // </div>
          :
          <div className=" d-flex justify-content-center align-items-center" style={{
            height: "73.2vh"
          }}>
            <NoRecordsFound />
          </div>
        }
      </div>



      <Modal isOpen={deleteModal} onClose={() => { setDeleteModal(!deleteModal) }} title={`Do you want to delete the selected task ?`} titleClassname={'text-muted font-weight-normal'}>
        <div className="mt--4 ml--1">
          <h2>{currentDeleteItem?.name}</h2>
        </div>

        <div className='text-right'>
          <Button
            color={'secondary'}
            text={translate('common.cancel')}
            onClick={() => { setDeleteModal(!deleteModal) }}
          />
          <Button
            text={translate("common.proceed")!}
            isLoading={isDeleteLoader}
            onClick={() => {
              onDeleteHandler(currentDeleteItem)
            }}
          />
        </div>
      </Modal>

      <Modal isOpen={isTaskMetaModalOpen} onClose={() => { setIsTaskMetaModalOpen(false) }} title={`Task Meta Type`} titleClassname={'font-weight-bold'}>
        <div className="mt--4 ml--1">
          {TASK_META_TYPE.length > 0 && TASK_META_TYPE.map((metaType) => {
            return (
              <>
                <h4 className='pointer font-weight-light' onClick={() => {
                  dispatch(isBackNavigation(false))
                  manageTaskHandler(undefined, metaType.title)
                }}>{metaType.title}</h4>
                {metaType.id < TASK_META_TYPE.length ? <Divider /> : <></>}
              </>
            )
          })}
        </div>
      </Modal>
    </>
  )
}

export { AdminTopicSection };
