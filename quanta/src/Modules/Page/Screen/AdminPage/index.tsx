import { Back, Button, Card, DragAndReorder, FileUpload, Modal, NoRecordsFound, PageDndModal } from '@Components'
import { useLoader, useNavigation } from '@Hooks'
import { fetchCourses, fetchPageSections, fetchSectionTypeTitle, getPageSectionTypeId, isBackNavigation, postGenericBatchCrudDetails, postGenericCrudDetails, settingCurrentCourse, settingCurrentCourseSection, syncDetails } from '@Redux';
import { ROUTES } from '@Routes';
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from "react-redux";
import { ViewImageBlog, ViewListBlog, ViewMdBlog, ViewParagraphBlog, ViewTitleBlog, ViewVideoBlog } from '@Modules';
import { translate } from '@I18n';
import { showToast } from '@Utils';



interface HierarchicalProps {
  showCheckBox?: boolean;
  showActiveBranch?: boolean
}

const AdminPage = ({ showCheckBox = true, showActiveBranch = true }: HierarchicalProps) => {

  const { courseTopicName, pageSections } = useSelector(
    (state: any) => state.DashboardReducer
  );

  const { isSync } = useSelector(
    (state: any) => state.AppReducer
  );

  const { goTo } = useNavigation()
  const dispatch = useDispatch();
  const [isModalOpen, setIsModalOpen] = useState(false)
  const deleteModalLoader = useLoader(false)
  const [deleteItems, setDeleteItems] = useState<any>('')
  const [isDndModalOpen, setIsDndModalOpen] = useState(false)

  const [submitLoader, setSubmitLoader] = useState(false)
  const [isPageDataExist, setIsPageDataExist] = useState(false)



  useEffect(() => {
    // if (!isSync.pageSection)
    getPageSections()

    // return ()=>{
    //   dispatch(fetchPageSections({}))
    // }
  }, [])

  //get page section to list section_type in the page screen 

  const getPageSections = () => {
    const params = {
      page_id: courseTopicName?.page_id
    }

    dispatch(fetchPageSections({
      params,
      onSuccess: (success: any) => () => {
        setIsPageDataExist(true)
        dispatch(syncDetails({ ...isSync, 'pageSection': true }))
      },
      onError: (error: string) => () => {
      },
    }))
  }

  //handleSectionDelete to delete  page_section_type

  const handleSectionDelete = (el: any) => {
    const params = {
      mq: "post__PageSections",
      data: { id: el?.page_section?.id },
      force_delete: true
    }
    deleteModalLoader.showLoader()

    dispatch(postGenericCrudDetails({
      params,
      onSuccess: (success: any) => () => {
        deleteModalLoader.hideLoader()
        getPageSections()
        setIsModalOpen(false)
        setDeleteItems('')
        showToast('success', 'Record Deleted')

      },
      onError: (error: string) => () => {
        deleteModalLoader.hideLoader()

      },
    }))
  }

  /// this function getPageComponents used for list the section_type dynamically
  //we get the params form pageNO: 201

  function getPageComponents(item: any) {
    let components = <></>

    switch (item.section_type) {
      case 'TS':
        components = <div className='border py-2'>
          <ViewTitleBlog
            id={item?.title_section?.id}
            onDeleteClick={(val) => {
              setIsModalOpen(true)
              setDeleteItems(val)
            }}
          />
        </div>
        break
      case 'IS':
        components = <div className='border py-2'><ViewImageBlog id={item?.image_section?.id}
          onDeleteClick={(val) => {
            setIsModalOpen(true)
            setDeleteItems(val)
          }}
        /></div>
        break;
      case 'VS':
        components = <div className='border py-2'> <ViewVideoBlog id={item?.video_section?.id}
          onDeleteClick={(val) => {
            setIsModalOpen(true)
            setDeleteItems(val)
          }}
        /></div>
        break;
      case 'PS':
        components = <div className='border py-2'><ViewParagraphBlog id={item?.paragraph_section?.id}
          onDeleteClick={(val) => {
            setIsModalOpen(true)
            setDeleteItems(val)
          }}
        /></div>
        break;
      case 'LS':
        components = <div className='border py-2'> <ViewListBlog id={item?.list_section?.id}
          onDeleteClick={(val) => {
            setIsModalOpen(true)
            setDeleteItems(val)
          }}
        /></div>
        break;
      case 'MDS':
        components = <div className='border py-2'><ViewMdBlog id={item?.md_section?.id}
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
    console.log("para,,s==>", params)
    setSubmitLoader(true)
    dispatch(postGenericBatchCrudDetails({
      params,
      onSuccess: (success: any) => () => {
        setSubmitLoader(false)
        showToast('success', success.message)
        getPageSections()
      },
      onError: (error: any) => () => {
        setSubmitLoader(false)
        showToast('error',error?.error_message)
      }
    }))
  }

  return (
    <>
      <div className='container-fluid py-2  h-100v'>
        <div className='pb-2'>
          <Back text={courseTopicName?.name} onClick={() => {
            // dispatch(fetchPageSections({}))
            dispatch(isBackNavigation(true))

          }} />
        </div>
        <Card className=' '>
          <div className='row float-right pr-3'>
            <div className=' d-flex '>
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
              {pageSections && pageSections?.length > 1 && <PageDndModal
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
                text={translate("course.add")!}
                onClick={() => {
                  goTo('/dashboard' + ROUTES.ADMIN.ADD_BLOG)
                }}
              />
            </div>
          </div>
          <div className='row  mt-5'>
            <div className='col'>

              {
                isPageDataExist && pageSections && pageSections.length > 0 ? pageSections.map((eachPages) => {
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
            onClick={() => {
              handleSectionDelete(deleteItems)
            }}
          />
        </div>
      </Modal>
    </>
  )
}

export { AdminPage }