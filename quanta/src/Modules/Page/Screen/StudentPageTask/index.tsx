import { Back, Button, NoRecordsFound } from '@Components';
import { useNavigation } from '@Hooks';
import { TopicSection, ViewMdBlog, ViewStudentImageBlog, ViewStudentListBlog, ViewStudentParagraphBlog, ViewStudentTitleBlog, ViewStudentVideoBlog } from '@Modules';
import { fetchStudentPageSections, isBackNavigation, postStudentCourseTasksDetails, taskTypeHandler } from '@Redux';
import { showToast } from '@Utils';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from "react-redux";



interface HierarchicalProps {
  showCheckBox?: boolean;
  showActiveBranch?: boolean
}

const StudentPageTask = ({ }: HierarchicalProps) => {

  const { courseTopicName, studentPageSections, isBack, getStudentTaskDetails } = useSelector(
    (state: any) => state.DashboardReducer
  );
  const { goTo, goBack } = useNavigation()
  const dispatch = useDispatch();
  const [isPageDataExist, setIsPageDataExist] = useState(false)
  const [startTime, setStartTime] = useState<any>(null);
  const [elapsedTime, setElapsedTime] = useState<any>(null);
  const [spentDuration, setSpentDuration] = useState('')
  const [isSubmitLoader, setIsSubmitLoader] = useState(false)


  console.log("getStudentTaskDetails==>", getStudentTaskDetails)
  useEffect(() => {

    // if (!isBack) {
    getStudentPageSections()
    // }
    // else {
    //   dispatch(isBackNavigation(false))
    // }

  }, [])

  // spend minutes calculation and useeffect

  useEffect(() => {
    setStartTime(Date.now()); // set the start time when component mounts
  }, []);

  useEffect(() => {
    if (startTime) {
      const intervalId = setInterval(() => {
        const now = Date.now();
        const elapsed = now - startTime;
        setElapsedTime(elapsed);
        setSpentDuration(formatTime(elapsed))
      }, 1000); // update elapsed time every second

      return () => clearInterval(intervalId); // cleanup function to clear the interval when component unmounts
    }
  }, [startTime]);

  const formatTime = (time: any) => {
    const minutes = Math.floor(time / 60000);
    const seconds = Math.floor((time % 60000) / 1000);
    const formattedMinutes = String(minutes).padStart(2, '0');
    const formattedSeconds = String(seconds).padStart(2, '0');
    return `${formattedMinutes}:${formattedSeconds}`;
  };
  
  const onSubmitPageTask = () => {
    let slicedSpentDuration = +spentDuration?.slice(0, 2) 
    let minimumSpentMinutes = +getStudentTaskDetails[0]?.task_meta?.details?.minimum_spent_mins
    if (slicedSpentDuration >= minimumSpentMinutes) {
      setIsSubmitLoader(true)
      const params = {
        task_meta_id: getStudentTaskDetails[0]?.task_meta?.id,
        spent_hours: spentDuration,
        is_completed: true,
        ...(getStudentTaskDetails && getStudentTaskDetails.length> 0 && getStudentTaskDetails[0]?.student_course_task_meta_id && {id: getStudentTaskDetails[0]?.student_course_task_meta_id})
      }

      dispatch(postStudentCourseTasksDetails({
        params,
        onSuccess: (success: any) => () => {
          showToast("success", success.message)
          setIsSubmitLoader(false)
          goBack()
        },
        onError: (error: any) => () => {
          setIsSubmitLoader(false)
          if(error?.status_code === 0 ){
          showToast('error', error?.error_message)
          }
        },
      }))
    }
    else {
      showToast('error', "You haven't completed the minimum spent minutes!")
    }

  }

  const getStudentPageSections = () => {
    const params = {
      page_id: getStudentTaskDetails[0]?.task_meta?.details?.page
    }

    dispatch(fetchStudentPageSections({
      params,
      onSuccess: (success: any) => () => {
        setIsPageDataExist(true)
        // getSectionTypes(success?.details)
      },
      onError: (error: any) => () => {
        // showToast('error', 'Network error')
      },
    }))
  }

  /// this function getPageComponents used for list the section_type dynamically
  //we get the params form pageNO: 137

  function getPageComponents(item: any) {

    let components = <></>

    switch (item.section_type) {
      case 'TS':
        components = <div className=' py-2'>
          <ViewStudentTitleBlog
            id={item.title_section_id}
          />
        </div>
        break
      case 'IS':
        components = <div className=' py-2'><ViewStudentImageBlog id={item.image_section_id}

        /></div>
        break;
      case 'VS':
        components = <div className=' py-2'> <ViewStudentVideoBlog id={item.video_section_id}
        /></div>
        break;
      case 'PS':
        components = <div className=' py-2'><ViewStudentParagraphBlog id={item.paragraph_section_id}

        /></div>
        break;
      case 'LS':
        components = <div className=' py-2'> <ViewStudentListBlog id={item.list_section_id}

        /></div>
        break;
      case 'MDS':
        components = <div className=' py-2'><ViewMdBlog id={item.md_section_id}
        /></div>
        break;


      default:
        return <></>
    }

    return components

  }


  return (
    <>
      <div className='container-fluid py-2 zoom h-100v'>
        <div className='row justify-content-between'>
          <Back text={courseTopicName?.name} onClick={() => {
            dispatch(isBackNavigation(true))
            dispatch(taskTypeHandler('1')) // redux state to set default value as 'System Tasks' in dropdown select
          }} />
          <div className='pt-4'>
            <Button
              text={"Submit"}
              disabled = {getStudentTaskDetails[0]?.student_course_task_meta_id && true}
              isLoading={isSubmitLoader}
              onClick={() => {
                onSubmitPageTask()
              }}
            />
          </div>

        </div>


        {studentPageSections && studentPageSections.length > 0 && <div>

          {
            isPageDataExist && studentPageSections && studentPageSections.length > 0 ? studentPageSections.map((eachPages) => {
              return getPageComponents(eachPages)
            })
              :
              <div className=" d-flex justify-content-center align-items-center" style={{
                height: "77.2vh"
              }}>
                <NoRecordsFound />
              </div>
          }
        </div>}
      </div>
    </>
  )
}

export { StudentPageTask };

