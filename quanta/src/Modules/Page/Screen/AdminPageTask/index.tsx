import { Back, Button, Card, Divider, DragAndReorder, DropDown, FileUpload, Input, Modal, NoRecordsFound, PageDndModal } from '@Components'
import { useLoader, useNavigation } from '@Hooks'
import { fetchCourses, fetchGetPages, fetchPageSections, fetchSectionTypeTitle, getPageSectionTypeId, isBackNavigation, postAddCourseTask, postGenericBatchCrudDetails, postGenericCrudDetails, settingCurrentCourse, settingCurrentCourseSection, settingMinimumSpentMinutes, settingPageTaskTitle, settingTaskMetaId, settingTaskPageAndMetaId, settingTaskPageId, syncDetails } from '@Redux';
import { ROUTES } from '@Routes';
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from "react-redux";
import { ViewImageBlog, ViewImagePageTask, ViewListBlog, ViewListPageTask, ViewMdBlog, ViewMdPageTask, ViewParagraphBlog, ViewParagraphPageTask, ViewTitleBlog, ViewTitlePageTask, ViewVideoBlog, ViewVideoPageTask } from '@Modules';
import { translate } from '@I18n';
import { showToast } from '@Utils';



interface HierarchicalProps {
  showCheckBox?: boolean;
  showActiveBranch?: boolean
}

const MINIMUM_SPENT_TIME = [
  { id: '15', name: '15 min' },
  { id: '30', name: '30 min' },
  { id: '45', name: '45 min' },
  { id: '60', name: '1 hr' },
]

const AdminPageTask = ({ showCheckBox = true, showActiveBranch = true }: HierarchicalProps) => {

  const { courseTopicName, pageSections, pageTaskTitle, taskPageAndMetaId, currentTaskItem, editSectionType, pageList, courseTopicTasks, pageTaskMetaId, taskPageId, minumumSpentMinutes } = useSelector(
    (state: any) => state.DashboardReducer
  );

  const { isSync } = useSelector(
    (state: any) => state.AppReducer
  );

  const { goTo } = useNavigation()
  const dispatch = useDispatch();
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [isPageListModalOpen, setIsPageListModalOpen] = useState(false)
  const deleteModalLoader = useLoader(false)
  const [deleteItems, setDeleteItems] = useState<any>('')
  const [isDndModalOpen, setIsDndModalOpen] = useState(false)

  const [submitLoader, setSubmitLoader] = useState(false)
  const [isDeletedLoader, setIsDeleteLoader] = useState(false)
  const [isPageDataExist, setIsPageDataExist] = useState(false)

  //   console.log("currentTaskItem======>", currentTaskItem)
  //   console.log("editSectionType==>", editSectionType)
  // console.log("taskPageId====>",taskPageId)

  useEffect(() => {
    // if (!isSync.pageSection)
    if (currentTaskItem || taskPageId) {
      // console.log("useeffff called")
      getPageSections('')
    }
    // return ()=>{
    //   dispatch(fetchPageSections({}))
    // }
  }, [])

  useEffect(() => {
    dispatch(getPageSectionTypeId(undefined))
    // dispatch(settingTaskMetaId(undefined))
  }, [])

  //get page section to list section_type in the page screen 

  const getPageSections = (pageId: any) => {
    console.log("pageiddddd===>", pageId)
    // console.log("taskpageiddddd===>", taskPageId)

    const params = {
      page_id: pageId || currentTaskItem?.task_meta?.details?.page || taskPageAndMetaId?.taskPageId || taskPageId
    }

    dispatch(fetchPageSections({
      params,
      onSuccess: (success: any) => () => { //pageSections
        console.log("pagesectionsuccesss===>", success)
        setIsPageDataExist(true)
        // dispatch(syncDetails({ ...isSync, 'pageSection': true }))
      },
      onError: (error: any) => () => {
      },
    }))
  }

  //handleSectionDelete to delete  page_section_type

  const handleSectionDelete = (el: any) => {
    setIsDeleteLoader(true)
    const params = {
      mq: "post__PageSections",
      data: { id: el?.page_section?.id },
      force_delete: true
    }
    // deleteModalLoader.showLoader()

    dispatch(postGenericCrudDetails({
      params,
      onSuccess: (success: any) => () => {
        // deleteModalLoader.hideLoader()
        getPageSections('')
        setIsModalOpen(false)
        setIsDeleteLoader(false)
        setDeleteItems('')
        showToast('success', 'Record Deleted')

      },
      onError: (error: any) => () => {
        // deleteModalLoader.hideLoader()
        setIsDeleteLoader(false)

      },
    }))
  }


  const getPages = () => {
    const params = {}
    deleteModalLoader.showLoader()

    dispatch(fetchGetPages({
      params,
      onSuccess: (success: any) => () => {
        setIsPageListModalOpen(true)
      },
      onError: (error: any) => () => {

      },
    }))
  }

  console.log("taskmetaifffddd==>", taskPageAndMetaId)
  console.log("currentTaskItem=====888>", currentTaskItem)


  const addPageHandler = (page: any) => {
    console.log("paggggeeeeeee00===>",page)

    setSubmitLoader(true)

    const params = {
      task_meta_type: "PGE",
      name: page.title,
      tag: "JS",
      description: page.description,
      is_manditory: true,
      topic_id: courseTopicName?.id,
      title: page.title,
      order_sequence: courseTopicTasks.length === 0 ? 1 : courseTopicTasks.length + 1,
      page_id: page?.id,
      minimum_spent_mins: minumumSpentMinutes,
      ...((currentTaskItem || taskPageAndMetaId)&& { id: currentTaskItem ? currentTaskItem?.task_meta?.id : taskPageAndMetaId?.taskMetaId })
    }

    dispatch(postAddCourseTask({ // addCourseTaskMeta
      params,
      onSuccess: (success: any) => () => {
        console.log("successssssssssssssexisting==>", success)
        setSubmitLoader(false)
        showToast('success', success.message)
        dispatch(settingTaskMetaId(success?.details?.id))
        dispatch(settingTaskPageId(currentTaskItem ? page?.id : success?.details?.page_id))
        getPageSections(success?.details?.page_id ||  page?.id  )
        setIsPageListModalOpen(false)
      },
      onError: (error: any) => () => {
        setSubmitLoader(false)
        if (error.status_code === 0) {
          showToast('error', error.error_message)
        }
      },
    }))
  }

  // console.log("pagetaskmetaidddd==>", pageTaskMetaId)

  // console.log("pageList==>", pageList)

  /// this function getPageComponents used for list the section_type dynamically
  // we get the params form pageNO: 201

  function getPageComponents(item: any) {
    console.log("itemmmempagge==>", item)
    let components = <></>

    switch (item.section_type) {
      case 'TS':
        components = <div className='border py-2'>
          <ViewTitlePageTask
            id={item?.title_section?.id}
            pageSectionId={item?.id}
            onDeleteClick={(val) => {
              setIsModalOpen(true)
              setDeleteItems(val)
            }}
          />
        </div>
        break
      case 'IS':
        components = <div className='border py-2'>
          <ViewImagePageTask
            id={item?.image_section?.id}
            pageSectionId={item?.id}
            onDeleteClick={(val) => {
              setIsModalOpen(true)
              setDeleteItems(val)
            }}
          /></div>
        break;
      case 'VS':
        components = <div className='border py-2'>
          <ViewVideoPageTask
            id={item?.video_section?.id}
            pageSectionId={item?.id}
            onDeleteClick={(val) => {
              setIsModalOpen(true)
              setDeleteItems(val)
            }}
          /></div>
        break;
      case 'PS':
        components = <div className='border py-2'>
          <ViewParagraphPageTask
            id={item?.paragraph_section?.id}
            pageSectionId={item?.id}
            onDeleteClick={(val) => {
              setIsModalOpen(true)
              setDeleteItems(val)
            }}
          /></div>
        break;
      case 'LS':
        components = <div className='border py-2'>
          <ViewListPageTask
            id={item?.list_section?.id}
            pageSectionId={item?.id}
            onDeleteClick={(val) => {
              setIsModalOpen(true)
              setDeleteItems(val)
            }}
          /></div>
        break;
      case 'MDS':
        components = <div className='border py-2'>
          <ViewMdPageTask
            id={item?.md_section?.id}
            pageSectionId={item?.id}
            onDeleteClick={(val) => {
              setIsModalOpen(true)
              setDeleteItems(val)
            }}
          /></div>
        break;


      default:
        return <></>
    }

    return components

  }

  //this function onSubmitDnd used for dnd 

  function onSubmitDnd(params: any) {
    // console.log("para,,s==>", params)
    setSubmitLoader(true)
    dispatch(postGenericBatchCrudDetails({
      params,
      onSuccess: (success: any) => () => {
        setSubmitLoader(false)
        showToast('success', success.message)
        getPageSections('')
      },
      onError: (error: any) => () => {
        setSubmitLoader(false)
        showToast('error', error?.error_message)
      }
    }))
  }
  console.log("minimumSpentMinutes=>", minumumSpentMinutes);

  return (
    <>
      <div className='container-fluid py-2  h-100v'>
        <div className='pb-2'>
          <Back text={courseTopicName?.name} onClick={() => {
            // dispatch(fetchPageSections({}))
            // dispatch(isBackNavigation(true))

          }} />
        </div>
        <Card className=' '>
          <div className='row justify-content-between'>

            <div className='col-sm-3'>
              <Input
                heading={'Page Title'}
                placeholder={'Page Title'}
                value={pageTaskTitle}
                onChange={(e) => {
                  dispatch(settingPageTaskTitle(e.target.value))
                }}
              />
            </div>
            <div>
              {/* <DropDown
                data={MINIMUM_SPENT_TIME}
                heading={'Minimum Spent minutes'}
                placeholder={'Minimum Spent minutes'}
                onChange={(e) => {
                  console.log("eelelee===>",e.target)
                  dispatch(settingMinimumSpentMinutes(e.target.value))
                }}
                value={minumumSpentMinutes}
              /> */}

              <Input
                // data={MINIMUM_SPENT_TIME}
                heading={'Minimum Spent minutes'}
                placeholder={'Minimum Spent minutes'}
                onChange={(e) => {
                  dispatch(settingMinimumSpentMinutes(e.target.value))
                }}
                value={minumumSpentMinutes}
              />
            </div>
            <div className='float-right pr-3'>
              <div className='d-flex '>

                <FileUpload
                  title={translate("course.uploadPageDetails")!}
                  onSelect={(data) => {
                    // setTopicBulkUploadData(data)
                  }}
                  onSubmitClick={() => {
                    console.log("submitted successfully")
                  }}
                />
                {/* <div> */}
                {pageSections && pageSections?.length > 1 &&
                  <PageDndModal
                    title={translate("course.pageTitleData")!}
                    isLoading={submitLoader}
                    dndData={pageSections}
                    isDndModalOpen={isDndModalOpen}
                    onSubmitClick={(data) => {
                      const params = {
                        mq: "post__PageSections",
                        data: data
                      }
                      onSubmitDnd(params)
                    }}
                  />}

                <Button
                  text={"Use Existing Page"}
                  onClick={() => {
                    if (pageTaskTitle && minumumSpentMinutes) {
                      getPages()
                    } else {
                      showToast("error", "Please fill Page Title & minimum watch hours")
                    }
                  }}
                />
                <Button
                  text={'Create'}
                  onClick={() => {
                    if (pageTaskTitle && minumumSpentMinutes) {
                      goTo('/dashboard/' + ROUTES.ADMIN.ADD_PAGE_TASK)
                    }
                    else {
                      showToast("error", "Please fill Page Title & minimum watch hours")
                    }
                  }}
                />
              </div>
            </div>
          </div>
          <div className='row  mt-5'>
            <div className='col'>

              {
                // isPageDataExist && pageSections && pageSections.length > 0 ? pageSections.map((eachPages) => {
                (currentTaskItem || taskPageAndMetaId?.taskPageId || taskPageId) && pageSections && pageSections.length > 0 ? pageSections.map((eachPages: any) => {

                  return [getPageComponents(eachPages),
                  ]
                })
                  :
                  <div className=" d-flex justify-content-center align-items-center" style={{
                    height: "77.2vh"
                  }}>
                    <NoRecordsFound />
                  </div>
              }
            </div>
          </div>
        </Card>
      </div>
      <Modal isOpen={isModalOpen} onClose={() => {
        setIsModalOpen(false)
      }}
        title={`Do you want to delete the selected item ?`} titleClassname={'text-muted fw-light'}
        isModalLoading={deleteModalLoader.loader}
      >
        <div className="mt--4 ml--1">
          <h2>{deleteItems && deleteItems?.alt_text ? deleteItems?.alt_text : deleteItems?.title}</h2>
        </div>

        <div className='text-right'>
          <Button
            color={'secondary'}
            text={translate('common.cancel')}
            onClick={() => {
              setIsModalOpen(false)
            }}
          />
          <Button

            text={'Proceed'}
            isLoading={isDeletedLoader}
            onClick={() => {
              handleSectionDelete(deleteItems)
            }}
          />
        </div>
      </Modal>

      <Modal isOpen={isPageListModalOpen} onClose={() => {
        setIsPageListModalOpen(false)
      }}
        title={`Existing Page List`} titleClassname={'text-muted fw-light'}
        isModalLoading={submitLoader}
        size={'lg'}
      >
        {pageList && pageList.length > 0 && pageList.map((page: any, idx: number) => {
          let pageIndex = { ...page, index: idx + 1 }
          return (
            <>
              <h4 className='pointer font-weight-light' onClick={() => {
                console.log("callleddd")
                addPageHandler(page)
              }}>{page.title}</h4>
              {pageIndex.index < pageList.length ? <Divider /> : <></>}
            </>
          )
        })}
      </Modal>
    </>
  )
}

export { AdminPageTask }