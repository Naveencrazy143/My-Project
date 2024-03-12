import { icons } from "@Assets";
import { Button, Card, CommonTable, DragAndReorder, Image, Input, Modal, Divider, NoRecordsFound, Dropzone, FileUpload, Checkbox } from '@Components';
import { DynamicHeight, useLoader, useModal, useNavigation } from '@Hooks';
import { translate } from '@I18n';
import { AdminNavbar, DropDownMenuArrow, ProgressTrackCard } from "@Modules";
import { fetchCourses, getCourseTopicParentData, getCourseTopicParentChildData, fetchCourseTemplates, fetchCourseTopics, handleDndModal, isBackNavigation, postGenericBatchCrudDetails, postBulkUploadSection, postBulkUploadTopics, postGenericCrudDetails, settingCourseTopicName, settingCurrentCourse, settingCurrentCourseSection, settingDefaultCourse, syncDetails, postAddCourseSection, postAddCourseTopic, postAddCourseTask } from '@Redux';
import { ROUTES } from "@Routes";
import { SERVER } from "@Services";
import { getImageUrl, showToast, convertToUpperCase, filteredDescription, downloadFile, urlDownloader } from '@Utils';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from "react-redux";

function AdminCourseSection() {

  const { goTo } = useNavigation()

  const dispatch = useDispatch();
  const modal = useModal(false)
  const dynamicHeight: any = DynamicHeight()

  const { registeredCourses, courseTopics, dashboardDetails, isOpenDndModal, currentCourse, currentCourseSectionObject, defaultCourse, courseTopicName, isBack, courseTopicsParentData, courseTopicsParentChildData } = useSelector(
    (state: any) => state.DashboardReducer
  );

  const { isSync } = useSelector(
    (state: any) => state.AppReducer
  );
  const [checked, setChecked] = useState(false);

  // const [courseTopicsParentData, setCourseTopicsParentData] = useState<any>([])
  // const [courseTopicsParentChildData, setCourseTopicsParentChildData] = useState<any>()
  const [tableTitle, setTableTitle] = useState<any>(currentCourse[0]?.sections[0])
  const [modalTitle, setModalTitle] = useState('')
  const [addCourseSectionModal, setAddCourseSectionModal] = useState(false)
  const [addCourseTopicModal, setAddCourseTopicModal] = useState(false)
  const [addCourseTopicTasksModal, setAddCourseTopicTasksModal] = useState(false)

  const [currentCourseSection, setCurrentCourseSection] = useState(currentCourse[0]?.sections[0]?.id)
  const [currentCourseTopicParent, setCurrentCourseTopicParent] = useState<any>()
  const [dragAndReorderData, setDragAndReorderData] = useState([]);
  const [image, setImage] = useState<any>(null)
  const courseTopicLoader = useLoader(false)
  const ProgressTrackCardLoader = useLoader(false)
  const postGenericCrudDetailsLoader = useLoader(false)
  const [isAddCourseSectionLoader, setIsAddCourseSectionLoader] = useState(false)
  const courseSectionModalLoader = useLoader(false)
  const [currentEditItemId, setCurrentEditItemId] = useState<any>()
  const [currentDeleteItem, setCurrentDeleteItem] = useState<any>()
  const [deleteModal, setDeleteModal] = useState(false)
  const [deleteGenericCRUDParams, setDeleteGenericCRUDParams] = useState<any>()
  const [currentKey, setCurrentKey] = useState("")
  const [topicBulkUploadData, setTopicBulkUploadData] = useState<any>()
  const [sectionBulkUploadData, setSectionBulkUploadData] = useState<any>()

  const [isBulkUploadModalOpen, setIsBulkUploadModalOpen] = useState<boolean>(false)



  let imageUrlValue = image && image.toString().includes('https')

  const [addCourseDetails, setAddCourseDetails] = useState<any>({
    name: '', description: ''
  })

  //currentCourseSectionObject


  useEffect(() => {

    /**
     * initially data getting for course topics
     */


    if (!isSync.courseTopics) {
      if (currentCourseSectionObject) {
        setTableTitle(currentCourseSectionObject.length < 1 ? currentCourse[0]?.sections[0] : currentCourseSectionObject)
        getCourseTopics(currentCourseSectionObject)
        setCurrentCourseSection(currentCourseSectionObject)
      }
      else if (currentCourse[0]?.sections.length > 0) {
        getCourseTopics(currentCourse[0]?.sections[0])
        setCurrentCourseSection(currentCourse[0]?.sections[0])
      }
      else {
        dispatch(settingDefaultCourse(''))
        dispatch(getCourseTopicParentData([]))
        setTableTitle('')
      }
    }

  }, [currentCourse])

  useEffect(() => {


    if (!isSync.courseTopics) {
      setTableTitle(currentCourseSectionObject.length < 1 ? currentCourse[0]?.sections[0] : currentCourseSectionObject)
      dispatch(syncDetails({ ...isSync, 'courseTopics': false }))

      let isParentTopics = courseTopics?.filter((el) => el.is_parent === true)
      dispatch(getCourseTopicParentData(isParentTopics))
      setDragAndReorderData(isParentTopics)
    }
  }, [])
  // useEffect(() => {
  //   window.addEventListener(
  //     "popstate",
  //     (event) => {
  //       if (event.state) {
  //         dispatch(isBackNavigation(true))
  //       }
  //     },
  //     false
  //   );
  // }, []);



  /**
   * Api for getting all courses list
   */

  const getCourses = () => {
    ProgressTrackCardLoader.showLoader()

    const params = {}

    //Api

    dispatch(fetchCourses({
      params,
      onSuccess: (success: any) => () => {
        ProgressTrackCardLoader.hideLoader()

        let current = success.filter((item) => item.name === currentCourse[0].name)
        dispatch(settingCurrentCourse(current))
        dispatch(settingCurrentCourseSection(current[0].sections[0]))

      },
      onError: (error: string) => () => {
        ProgressTrackCardLoader.hideLoader()
      },
    }))
  }

  // postBulkUploadTopics

  const bulkUploadTopics = () => {

    const params = {
      csv_file: topicBulkUploadData,
      code: currentCourseSectionObject?.code
    }
    setIsBulkUploadModalOpen(true)

    dispatch(postBulkUploadTopics({
      params,
      onSuccess: (success: any) => () => {
        showToast('success', success.message)
        getCourseTopics(currentCourseSectionObject.length < 1 ? currentCourse[0]?.sections[0] : currentCourseSectionObject)
        setIsBulkUploadModalOpen(false)
      },
      onError: (error: any) => () => {
        setIsBulkUploadModalOpen(true)
        if (error?.status_code === 0) {
          showToast('error', error?.error_message)
        }
      },
    }))

  }

  const bulkUploadSection = () => {

    const params = {
      csv_file: sectionBulkUploadData,
      code: currentCourse[0].code
    }
    setIsBulkUploadModalOpen(true)
    dispatch(postBulkUploadSection({
      params,
      onSuccess: (success: any) => () => {
        getCourses()
        showToast('success', success.message)
        setIsBulkUploadModalOpen(false)
      },
      onError: (error: any) => () => {
        setIsBulkUploadModalOpen(true)
        if (error?.status_code === 0) {
          showToast('error', error?.error_message)
        }
      },
    }))

  }

  const getCourseTopics = (item) => {
    courseTopicLoader.showLoader()

    setTableTitle(item)

    const params = {
      course_section_id: item?.id
    }

    //Api
    dispatch(fetchCourseTopics({
      params,
      onSuccess: (success: any) => () => {
        dispatch(syncDetails({ ...isSync, 'courseTopics': true }))
        courseTopicLoader.hideLoader()
        let isParentTopics = success?.filter((el) => el.is_parent === true)
        dispatch(getCourseTopicParentData(isParentTopics))
        setDragAndReorderData(isParentTopics)
      },
      onError: (error: any) => () => {
        courseTopicLoader.hideLoader()
      },
    }))
  }

  /**
   * Function is called for getting an child topics of the  parents
   */

  const getCourseTopicsParentChild = (item: any) => {
    let childTopics = courseTopics?.filter((el: any) => item.id === el.parent_id)
    dispatch(getCourseTopicParentChildData(childTopics))
    setModalTitle(item.name)
    if (childTopics) {
      modal.onChange(true)
    }
  }



  /**
   * Table render data set
   */

  const normalizedParentData = (data: any) => {
    return data.map((el: any, index: any) => {

      let isChild = courseTopics?.some((item) => item?.parent_id === el.id)

      return {
        // [`${translate("page.image")!}`]:
        //   <Image
        //     variant={'rounded'}
        //     alt="..."
        //     src={el.thumbnail ? getImageUrl(el.thumbnail) : icons.defaultImage}
        //   />,
        [`${translate("course.topic")!}`]: <div className="text-wrap">
          {el.name.length > 20 ? (
            <div>
              {el.is_manditory &&
                <span className={`text-danger mr-1`} style={{ marginLeft: '-12px' }}> ●</span>
              }
              {el?.name?.substring(0, 20)}<br />
              {el?.name?.substring(20)}


            </div>) : (
            <div>
              {el.is_manditory &&
                <span className={`text-danger mr-1`} style={{ marginLeft: '-12px' }}> ●</span>
              }
              {el.name}
            </div>
          )
          }
        </div>,

        [`${translate("common.action")!}`]: <div
          className="text-center py-1 mr-6"
          style={{ width: '35px' }}
          onClick={(e) => {
            if (isChild) {
              e.preventDefault();
              e.stopPropagation();
              getCourseTopicsParentChild(el)
              setCurrentCourseTopicParent(el)
            }

          }}
        >
          {isChild && <Image className=" " src={icons.dropDown} height={10} width={15} />}</div>,
        " ":
          <Button size="sm" text={translate("common.task")}
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              dispatch(isBackNavigation(false))
              dispatch(settingCourseTopicName(el))
              goTo('/dashboard' + ROUTES.HOME.ADMIN_TOPIC_SECTION, false)
            }}
          />,

        "":
          <Button size="sm" text={translate("course.pages")}
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              dispatch(settingCourseTopicName(el))
              // generatePageId(el)
              dispatch(isBackNavigation(false))

              goTo('/dashboard' + ROUTES.ADMIN.ADMIN_PAGE, false)
            }}
          />
        ,

        "  ": <><DropDownMenuArrow
          isAddChild
          onAddClick={(e) => {
            // e.preventDefault();
            e.stopPropagation();
            setCurrentEditItemId(el.id)
            setAddCourseDetails({
              name: el.name, description: el.description
            })
            setChecked(el.is_manditory)
            setImage(getImageUrl(el.thumbnail))

            el.is_parent ? setAddCourseTopicModal(!addCourseTopicModal) : setAddCourseTopicTasksModal(!addCourseTopicTasksModal)
          }
          }

          onDeleteClick={(e) => {
            e.stopPropagation();
            setCurrentDeleteItem(el)
            setDeleteModal(!deleteModal)
            setDeleteGenericCRUDParams({ mq: "course__Topic", data: { id: el.id }, force_delete: true })
            setCurrentKey('Course Topic')
          }}

          onAddChild={(e) => {
            e.preventDefault();
            e.stopPropagation();
            setCurrentCourseTopicParent(el)
            setAddCourseTopicTasksModal(!addCourseTopicTasksModal)
          }}
        />
        </>,

      };
    });
  };


  const breadCrumbsData: any = [
    { id: 1, title: 'Dashboard' },
    { id: 2, title: 'Admin Course / Javascript' },

  ]

  /**
   * Post validate input fields
   */

  const validateInputFields = () => {
    if (!addCourseDetails?.name) {
      showToast('error', translate('course.nameCannotBeEmpty ')!)
      return false
    }
    else if (!addCourseDetails?.description) {
      showToast('error', translate('course.descriptionCannotBeEmpty ')!)
      return false
    }
    else {
      return true
    }
  }

  // add course section api

  function onSubmitCourseSection() {
    if (validateInputFields()) {
      const params = {
        name: convertToUpperCase(addCourseDetails.name),
        description: convertToUpperCase(addCourseDetails.description),
        ...(!currentEditItemId && { order_sequence: currentCourse[0]?.sections.length + 1 }),
        course_id: currentCourse.length > 0 ? currentCourse[0]?.id : registeredCourses[0].id,
        is_manditory: checked,
        ...(currentEditItemId && { id: currentEditItemId }),
        ...(!image?.includes('https') && !image?.includes('http') && { thumbnail: image }),
      }

      setIsAddCourseSectionLoader(true)

      dispatch(postAddCourseSection({
        params,
        onSuccess: (success: any) => () => {
          dispatch(syncDetails({ ...isSync, 'courseTopics': false }))
          setChecked(false)
          showToast('success', success.message)
          setImage(null)
          // postGenericCrudDetailsLoader.hideLoader()
          setIsAddCourseSectionLoader(false)
          const params = {}

          dispatch(fetchCourses({
            params,
            onSuccess: (success: any) => () => {
              dispatch(settingDefaultCourse(success[0].sections))
              let current = success.filter((item) => item.name === currentCourse[0].name)

              let editedTopicName = current[0].sections.filter((el) => el.id === currentEditItemId)
              dispatch(settingCurrentCourseSection(editedTopicName[0]))

              dispatch(settingCurrentCourse(current))
              setIsAddCourseSectionLoader(false)
            },
            onError: (error: any) => () => {
              // postGenericCrudDetailsLoader.hideLoader()
              setIsAddCourseSectionLoader(false)
            },
          }))

          setAddCourseDetails({
            name: "", description: ""
          })
          setCurrentEditItemId(undefined)
          setImage(null)
          setAddCourseSectionModal(false)
        },
        onError: (error: any) => () => {
          // postGenericCrudDetailsLoader.hideLoader()
          // console.log("errorr==>",error);
          if (error?.status_code === 0) {
            showToast("error", error?.errors?.description[0])
          }
          setIsAddCourseSectionLoader(false)
        },
      }))
    }
  }

  // add course topic
  function onSubmitCourseTopic() {
    const params = {
      tag: 'JS',
      name: convertToUpperCase(addCourseDetails.name),
      description: convertToUpperCase(addCourseDetails.description),
      course_id: currentCourse.length > 0 ? currentCourse[0]?.id : registeredCourses[0].id,
      course_section_id: currentCourseSectionObject ? currentCourseSectionObject?.id : currentCourse[0]?.sections[0].id,
      is_manditory: checked,
      is_parent: true,
      ...(!currentEditItemId && { order_sequence: courseTopicsParentData.length + 1 }),
      ...(!imageUrlValue && image !== null && { thumbnail: image }),
      ...(currentEditItemId && { id: currentEditItemId }),
      ...(!currentEditItemId && {
        page: {
          title: convertToUpperCase(addCourseDetails.name),
          description: convertToUpperCase(addCourseDetails.description)
        }
      })
    }

    if (validateInputFields()) {
      setIsAddCourseSectionLoader(true)
      dispatch(postAddCourseTopic({
        params,
        onSuccess: (success: any) => () => {
          dispatch(syncDetails({ ...isSync, 'courseTopics': false }))
          setChecked(false)
          showToast('success', success.message)
          setImage(null)
          setIsAddCourseSectionLoader(false)

          setAddCourseDetails({
            name: "", description: ""
          })
          setCurrentEditItemId(undefined)
          setImage(null)
          setAddCourseTopicModal(false)
          getCourseTopics(currentCourseSectionObject ? currentCourseSectionObject : currentCourse[0]?.sections[0])
        },
        onError: (error: any) => () => {
          if (error?.status_code === 0) {
            showToast("error", error?.errors?.description[0])
          }
          setIsAddCourseSectionLoader(false)

        },
      }))

    }

  }

  // add course sub topic
  function onSubmitCourseSubTopic() {
    const params = {
      tag: 'JS',
      name: convertToUpperCase(addCourseDetails.name),
      description: convertToUpperCase(addCourseDetails.description),
      course_id: currentCourse.length > 0 ? currentCourse[0]?.id : registeredCourses[0].id,
      course_section_id: currentCourseSectionObject ? currentCourseSectionObject?.id : currentCourse[0]?.sections[0].id,
      is_parent: false,
      is_manditory: checked,
      parent_id: currentCourseTopicParent.id,
      ...(!currentEditItemId && { order_sequence: !courseTopicsParentChildData ? 1 : courseTopicsParentChildData.length + 1 }),
      ...(!imageUrlValue && image !== null && { thumbnail: image }),
      ...(currentEditItemId && { id: currentEditItemId }),
      ...(!currentEditItemId && {
        page: {
          title: convertToUpperCase(addCourseDetails.name),
          description: convertToUpperCase(addCourseDetails.description)
        }
      })
    }

    if (validateInputFields()) {
      setIsAddCourseSectionLoader(true)
      dispatch(postAddCourseTopic({
        params,
        onSuccess: (success: any) => () => {
          dispatch(syncDetails({ ...isSync, 'courseTopics': false }))
          setChecked(false)
          showToast('success', success.message)
          setImage(null)
          setIsAddCourseSectionLoader(false)

          setAddCourseDetails({
            name: "", description: ""
          })
          setCurrentEditItemId(undefined)
          setImage(null)
          modal.onChange(false)
          getCourseTopics(currentCourseSectionObject ? currentCourseSectionObject : currentCourse[0]?.sections[0])
          setAddCourseTopicTasksModal(false)
        },
        onError: (error: any) => () => {
          if (error?.status_code === 0) {
            showToast("error", error?.errors?.description[0])
          }
          setIsAddCourseSectionLoader(false)
        },
      }))
    }
  }

  /**
   * Api for deleting SECTION,TOPIC,and SUB TOPICS (Generic CRUD)
   */

  const onDeleteHandler = (params: any, key: string) => {
    setIsAddCourseSectionLoader(true)
    dispatch(postGenericCrudDetails({
      params,
      onSuccess: (success: any) => () => {
        setIsAddCourseSectionLoader(false)
        showToast('success', success.message)
        setImage(null)
        modal.onChange(false)

        if (key === "Course Section") {
          getCourses()
          dispatch(settingCurrentCourseSection(''))
          getCourseTopics(currentCourse[0]?.sections[0])
          setCurrentCourseSection(currentCourse[0]?.sections[0])
          setAddCourseSectionModal(false)
          setDeleteModal(false)

        }
        else if (key === 'Course Topic') {

          setDeleteModal(false)
          setAddCourseTopicModal(false)
          getCourseTopics(currentCourseSectionObject ? currentCourseSectionObject : currentCourse[0]?.sections[0])
        }
        else {

          modal.onChange(false)
          setDeleteModal(false)
          getCourseTopics(currentCourseSectionObject ? currentCourseSectionObject : currentCourse[0]?.sections[0])
          setAddCourseTopicTasksModal(false)
        }
      },
      onError: (error: string) => () => {
        setIsAddCourseSectionLoader(false)
      },
    }))

  }

  const onChangeHandler = (e) => {
    setAddCourseDetails({ ...addCourseDetails, [e.target.name]: e.target.value })
  }

  /**
   * Api for drag and reorder the SECTION,TOPIC,and SUB TOPICS (Generic CRUD batch details)
   */

  function onSubmitDnd(params: any, key: string) {
    courseSectionModalLoader.showLoader()
    dispatch(postGenericBatchCrudDetails({
      params,
      onSuccess: (success: any) => () => {
        if (key === 'courseSection') {
          courseSectionModalLoader.hideLoader()
          showToast('success', success.message)
          dispatch(handleDndModal(true))
          getCourses()

        }
        else if (key === 'courseTopic') {
          courseSectionModalLoader.hideLoader()
          showToast('success', success.message)
          dispatch(handleDndModal(true))
          getCourseTopics(currentCourseSection)
        }
        else {
          modal.onChange(!modal.visible)
          courseSectionModalLoader.hideLoader()
          showToast('success', success.message)
          dispatch(handleDndModal(false))
          getCourseTopics(currentCourseSection)

        }

      },
      onError: (error: any) => () => {
        courseSectionModalLoader.hideLoader()
        dispatch(handleDndModal(true))
      }
    }))
  }

  const onTemplateClickHandler = (e: any, type: string) => {

    e.stopPropagation()
    e.preventDefault()
    const params = {
      course_templates_type: type
    }
    dispatch(fetchCourseTemplates({
      params,
      onSuccess: (success: any) => () => {
        console.log("success============", SERVER + success[0]?.course_section_template);

        download(type === 'SEC' ? success[0]?.course_section_template : success[0]?.course_topic_template)
      },
      onError: (error: any) => () => {

      },
    }))
  }

  function download(downloadTemplate) {
    const fileUrl = downloadTemplate;
  
    fetch(fileUrl)
      .then(response => response.blob())
      .then(blob => {
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = 'bulk_upload_course_section.csv';
        link.click();
        URL.revokeObjectURL(url);
      })
      .catch(error => {
        console.error('Error downloading file:', error);
      });
  }
  

  return (
    <>
      <div className="">
        <AdminNavbar userName={dashboardDetails?.user_details?.name} userProfile={dashboardDetails?.user_details?.photo} isBack={true} />
      </div>
      <div className="container-fluid pt-4" >
        {/* <div style={{ margin: '0px -39px 0px -39px' }}>
        </div> */}
        {/* <div className="py-4">

          {dashboardDetails?.user_details?.is_faculty && (
            <div className='text-right' >
              <Button
                size={'sm'}
                text={translate("course.assignCourse")}
                onClick={() => { goTo('/dashboard' + ROUTES.ADMIN.ASSIGN_COURSE_STUDENTS) }}
              />

            </div>
          )}
        </div> */}

        <div className="row " >
          <div className="col-xl-8 col-sm-12 col-md-6 order-1 ">
            <Card style={{ height: dynamicHeight.dynamicWidth <= 1400 ? dynamicHeight.dynamicHeight - 45 : dynamicHeight.dynamicHeight - 107 }} upload>
              <div className="row">
                <div className="col ">
                  <h2 className="h3 ">{tableTitle?.name}</h2>
                  <h5 className="mt--2 text-muted ">{filteredDescription(tableTitle?.description || '')}</h5>
                  {tableTitle && <h6 className="text-muted ls-1 mt--2">
                    {`${courseTopicsParentData?.length}/${courseTopicsParentData?.length} ${courseTopicsParentData?.length > 1 ? 'Topics' : 'Topic'}`}
                  </h6>}

                </div>

                <div className="pr-3">
                  <div className=" float-right d-flex">

                    <div className="">
                      <FileUpload
                        title={translate("course.uploadTopicDetails")!}
                        onSelect={(data) => {
                          setTopicBulkUploadData(data)

                        }}
                        onSubmitClick={() => {
                          bulkUploadTopics()
                        }}
                        isDownloadTemplate
                        onTemplateClick={(e: any) => onTemplateClickHandler(e, 'TPC')}
                        isOpen={isBulkUploadModalOpen}
                        isUploadModalOpen={isBulkUploadModalOpen}
                      />
                    </div>
                    {courseTopicsParentData && courseTopicsParentData?.length > 1 && (
                      <DragAndReorder
                        title={translate('course.courseSectionTopic')!}
                        isDndModalOpen={isOpenDndModal}
                        dndData={dragAndReorderData}
                        onSubmitClick={(topic) => {
                          const params = {
                            mq: "course__Topic",
                            data: topic
                          }
                          onSubmitDnd(params, "courseTopic")
                        }}
                      />
                    )}


                    <Button
                      className="btn float-right"
                      color="primary"
                      onClick={() => {
                        setAddCourseTopicModal(!addCourseTopicModal)
                      }}
                      size="sm"
                      text={translate('course.add')}
                    />
                  </div>

                </div>

              </div>

              {/**
                 * Topic table (left card)
                 */}

              {courseTopicsParentData && courseTopicsParentData?.length > 0 ?
                <div className=" overflow-auto scroll-hidden mt--2 "
                  style={{
                    height: dynamicHeight.dynamicWidth <= 1400 ? dynamicHeight.dynamicHeight - 133 : dynamicHeight.dynamicHeight - 195,
                    margin: '0px -39px 0px -39px'
                  }}
                >
                  <CommonTable
                    isLoading={courseTopicLoader.loader}
                    displayDataSet={normalizedParentData(courseTopicsParentData)}
                  />
                </div>
                :
                <div className=" d-flex justify-content-center align-items-center errorTopicCard" >
                  <NoRecordsFound />
                </div>
              }
            </Card>


          </div>

          <div className="col-sm-4 col-md-6 col-xl-4 order-2  ">

            {/**
               * Course section card (right card)
               */}

            {registeredCourses && registeredCourses?.length > 0 &&
              <ProgressTrackCard
                dragAndDrop={true}
                isImage
                showUpload={true}
                uploadTitle={translate("course.uploadSectionDetails")!}
                title={convertToUpperCase(currentCourse[0]?.name || registeredCourses[0].name)}
                isLoading={ProgressTrackCardLoader.loader}
                headerButton={translate('course.add')!}
                data={currentCourse.length > 0 ? currentCourse[0]?.sections : defaultCourse}
                taskCompletionRatio={`${currentCourse[0]?.sections?.length || defaultCourse?.length}/${currentCourse[0]?.sections?.length || defaultCourse?.length}`}
                completionRatioText={currentCourse[0]?.sections?.length > 1 ? 'Sections' : 'Section'}
                isDndModalOpen={isOpenDndModal}
                isDropDownMenuArrow={true}
                isDownloadTemplate
                onTemplateClick={(e: any) => onTemplateClickHandler(e, 'SEC')}
                onClick={(item) => {
                  dispatch(settingCurrentCourseSection(item))
                  setCurrentCourseSection(item)
                  getCourseTopics(item)
                }}
                onAddClick={() => {
                  setAddCourseSectionModal(true)
                }}
                dropDownClick={(item) => {
                  setCurrentEditItemId(item.id)
                  setAddCourseDetails({
                    name: item.name, description: item.description
                  })
                  setChecked(item.is_manditory)


                  setImage(getImageUrl(item.thumbnail))
                  setAddCourseSectionModal(true)
                }}
                dropDownDeleteClick={(item) => {
                  setCurrentDeleteItem(item)
                  setDeleteGenericCRUDParams({ mq: "course__CourseSection", data: { id: item.id }, force_delete: true })
                  setCurrentKey("Course Section")
                  setDeleteModal(!deleteModal)

                }}
                dndData={currentCourse.length > 0 ? currentCourse[0]?.sections : defaultCourse}
                onSubmitDndClick={(course) => {
                  const params = {
                    mq: "course__CourseSection",
                    data: course
                  }

                  onSubmitDnd(params, "courseSection")
                }}

                onFileSelect={(data) => {
                  setSectionBulkUploadData(data)
                }}
                onSubmitFileUpload={() => {
                  bulkUploadSection()
                }}
                isOpen={isBulkUploadModalOpen}
                isUploadModalOpen={isBulkUploadModalOpen}
              />
            }

          </div>
        </div>

      </div>

      {/**
       * child topic modal
       */}
      <Modal isOpen={modal.visible} onClose={() => modal.onChange(!modal.visible)} title={modalTitle} isHeaderChildren={

        <div className="text-right ml-9 pl-5">

          {courseTopicsParentChildData && courseTopicsParentChildData?.length > 1 && (
            <DragAndReorder
              title={modalTitle}
              dndData={courseTopicsParentChildData}
              isDndModalOpen={isOpenDndModal}
              onSubmitClick={(topic) => {
                const params = {
                  mq: "course__Topic",
                  data: topic
                }

                onSubmitDnd(params, 'courseTopicChild')
              }}
            />
          )}

        </div>
      }
        size='lg'
      >
        {courseTopicsParentChildData && courseTopicsParentChildData?.length > 0 ?
          <div className=" overflow-auto" style={{ marginLeft: '-37px', marginRight: '-37px' }} >
            <CommonTable displayDataSet={normalizedParentData(courseTopicsParentChildData)}
              // tableOnClick={(e, index, item) => {
              //   e.stopPropagation();
              //   dispatch(settingCourseTopicName(courseTopicsParentChildData[index]))
              //   goTo('/dashboard' + ROUTES.HOME.ADMIN_TOPIC_SECTION, false)
              // }}
              noHeader

            />
          </div>
          : <NoRecordsFound />}
      </Modal>

      {/* Generic CRUD Course section adding modal */}

      <Modal isOpen={addCourseSectionModal} onClose={() => {
        setImage(null)
        setChecked(false)
        setAddCourseSectionModal(!addCourseSectionModal)
        setAddCourseDetails({
          name: "", description: ""
        })
        setCurrentEditItemId(undefined)

      }} title={currentEditItemId ? translate("course.editCourseSection")! : translate('course.addCourseSection')!}>
        <div className="mt--4 pb-3">
          <h4>{translate("common.selectImage")!}</h4>
          <Dropzone variant='ICON'
            icon={image}
            onSelect={(image) => {
              let encoded = image.toString().replace(/^data:(.*,)?/, '');
              setImage(encoded)
            }
            } />
        </div>
        <Input
          heading={translate('auth.name')}
          placeholder={translate('auth.name')!}
          value={addCourseDetails.name}
          name={'name'}
          onChange={(e) => onChangeHandler(e)}
        />
        <label className='form-control-label'>{translate('course.description')}</label>
        <textarea
          cols={5}
          name={'description'}
          value={addCourseDetails.description}
          className="form-control"
          placeholder={translate('course.typeHere')!}
          onChange={(e) => {
            onChangeHandler(e)
          }}
        />
        <div className='float-right'>
          <div className="mt-2" >
            <Checkbox
              id='1'
              text={translate("admin.isMandatory")!}
              variant={'info'}
              checked={checked}
              onCheckChange={() => {
                setChecked(!checked)
              }}
            />
          </div>
          <div className=" text-right">
            <Button onClick={() => {
              onSubmitCourseSection()
            }} text={translate('common.submit')} size={'sm'} isLoading={isAddCourseSectionLoader} />
          </div>
        </div>
      </Modal>

      {/* Generic CRUD Course section topic adding modal */}

      <Modal isOpen={addCourseTopicModal}
        isModalLoading={postGenericCrudDetailsLoader.loader}
        onClose={() => {
          setImage(null)
          setChecked(false)
          setAddCourseTopicModal(!addCourseTopicModal)
          setAddCourseDetails({
            name: "", description: ""
          })
          setCurrentEditItemId(undefined)

        }}
        title={currentEditItemId ? translate("course.editCourseSectionTopic")! : translate('course.addCourseSectionTopic')!}>
        <div className="mt--4 pb-3">
          <h4>{translate("common.selectImage")!}</h4>
          <Dropzone
            variant='ICON'
            icon={image}
            onSelect={(image) => {
              let encoded = image.toString().replace(/^data:(.*,)?/, '');
              setImage(encoded)
            }
            } />
        </div>
        <Input
          heading={translate('auth.name')}
          placeholder={translate('auth.name')!}
          value={addCourseDetails.name}
          name={'name'}
          onChange={(e) => onChangeHandler(e)}
        />
        <label className='form-control-label'>{translate('course.description')}</label>
        <textarea
          cols={5}
          name={'description'}
          value={addCourseDetails.description}
          className="form-control"
          placeholder={translate('course.typeHere')!}
          onChange={(e) => {
            onChangeHandler(e)
          }}
        />

        <div className='float-right'>
          <div className="mt-2" >
            <Checkbox
              id='1'
              text={translate("admin.isMandatory")!}
              variant={'info'}
              checked={checked}
              onCheckChange={() => {
                setChecked(!checked)
              }}
            />
          </div>
          <div className=" text-right">
            <Button onClick={() => {
              if (currentCourse[0]?.sections.length > 0 || registeredCourses[0].sections.length > 0) {
                onSubmitCourseTopic()
              }
              else {
                showToast('info', 'Please add atleast one Course Section')
                setAddCourseDetails({
                  name: null, description: null
                })
                setAddCourseTopicModal(!addCourseTopicModal)
              }

            }} text={translate('common.submit')} size={'sm'} isLoading={isAddCourseSectionLoader} />
          </div>
        </div>

      </Modal>

      {/* Generic CRUD Course section child Topics adding modal */}

      <Modal isOpen={addCourseTopicTasksModal}
        isModalLoading={postGenericCrudDetailsLoader.loader}
        onClose={() => {
          setImage(null)
          setChecked(false)
          setAddCourseTopicTasksModal(!addCourseTopicTasksModal)
          setAddCourseDetails({
            name: "", description: ""
          })
          setCurrentEditItemId(undefined)

        }}
        title={translate('course.addCourseSectionTopic')!} >
        <div className="mt--5 ml--1">
          <h5 >{'Under  ' + currentCourseTopicParent?.name}</h5>
        </div>
        <div className="mt-4 pb-3">
          <h4>Select Image</h4>
          <Dropzone variant='ICON'
            icon={image}
            onSelect={(image) => {
              let encoded = image.toString().replace(/^data:(.*,)?/, '');
              setImage(encoded)
            }
            } />
        </div>
        <Input
          heading={translate('auth.name')}
          placeholder={translate('auth.name')!}
          value={addCourseDetails.name}
          name={'name'}
          onChange={(e) => onChangeHandler(e)}
        />
        <label className='form-control-label'>{translate('course.description')}</label>
        <textarea
          cols={5}
          name={'description'}
          value={addCourseDetails.description}
          className="form-control"
          placeholder={translate('course.typeHere')!}
          onChange={(e) => {
            onChangeHandler(e)
          }}
        />
        <div className="float-right ">
          <div className="mt-2" >
            <Checkbox
              id='1'
              text='isMandatory'
              variant={'info'}
              checked={checked}
              // defaultChecked={false}
              onCheckChange={() => {
                setChecked(!checked)
              }}
            />
          </div>
          <div className="text-right">
            <Button onClick={() => {
              onSubmitCourseSubTopic()
            }} text={translate('common.submit')} size={'sm'} isLoading={isAddCourseSectionLoader} />
          </div>
        </div>
      </Modal>

      {/**
       * delete modal
       */}

      <Modal isOpen={deleteModal} onClose={() => { setDeleteModal(!deleteModal) }} title={`Do you want to delete the selected ${currentKey} ?`} titleClassname={'text-muted fw-light'}
      >
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
            isLoading={isAddCourseSectionLoader}
            text={translate("common.proceed")!}
            onClick={() => {
              onDeleteHandler(deleteGenericCRUDParams, currentKey)
            }}
          />
        </div>
      </Modal>
    </>
  );
}

export { AdminCourseSection };

