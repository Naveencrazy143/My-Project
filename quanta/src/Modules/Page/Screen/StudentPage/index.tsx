import { Back, Card, NoRecordsFound } from '@Components';
import { useNavigation } from '@Hooks';
import { TopicSection, ViewMdBlog, ViewStudentImageBlog, ViewStudentListBlog, ViewStudentParagraphBlog, ViewStudentTitleBlog, ViewStudentVideoBlog } from '@Modules';
import { fetchStudentPageSections, isBackNavigation, taskTypeHandler } from '@Redux';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from "react-redux";



interface HierarchicalProps {
  showCheckBox?: boolean;
  showActiveBranch?: boolean
}

const StudentPage = ({ }: HierarchicalProps) => {

  const { courseTopicName, studentPageSections, isBack } = useSelector(
    (state: any) => state.DashboardReducer
  );
  const { goTo } = useNavigation()
  const dispatch = useDispatch();
  const [isPageDataExist, setIsPageDataExist] = useState(false)


  useEffect(() => {

    // if (!isBack) {
    getStudentPageSections()
    // }
    // else {
    //   dispatch(isBackNavigation(false))
    // }

  }, [])

  const getStudentPageSections = () => {
    const params = {
      page_id: courseTopicName?.page_id
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
        <div onClick={() => {
          dispatch(isBackNavigation(true))
          dispatch(taskTypeHandler('1')) // redux state to set default value as 'System Tasks' in dropdown select
        }}>
          <Back text={courseTopicName?.name} />
        </div>


        <div className='row'>
          {studentPageSections && studentPageSections.length > 0 && <div className='col-sm-6'>
            {/* <Card> */}

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
            {/* </Card> */}
          </div>
          }
          <div className={`${studentPageSections.length > 0 ? 'col-sm-6' : 'col-sm-12'}`}>
            <TopicSection />
          </div>
        </div>
      </div>
    </>
  )
}

export { StudentPage };

