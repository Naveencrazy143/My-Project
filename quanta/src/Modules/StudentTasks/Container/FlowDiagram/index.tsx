import { Back, Button } from "@Components";
import { TDDocument, TDExport, TDExportType, Tldraw, TldrawApp, useFileSystem } from "@tldraw/tldraw";
import React, { useEffect } from "react";
import { useState } from "react";
import { translate } from '@I18n'
import { useDispatch, useSelector } from "react-redux";
import { addStudentCourseTaskResponseId, fetchStudentCourseTasksDetails, fetchTaskDetails, isBackNavigation, postStudentCourseTasksDetails, postTaskByStudent, settingStudentFlowDiagramData, settingStudentProcedureData, settingStudentProgramData, settingStudentWrittenQuestion } from '@Redux';
import { showToast } from '@Utils';
import moment from 'moment';
import { useNavigation } from '@Hooks'
import { ROUTES } from "@Routes";

const ACTION = 'download' as 'download' | 'open'

const FlowDiagram = () => {

  const dispatch = useDispatch();
  const { goTo, goBack } = useNavigation()

  const { getStudentTaskDetails, studentWrittenQuestion, studentProcedureData, addStudentTaskResponseId, studentProgramData } = useSelector(
    (state: any) => state.DashboardReducer
  );


  const [myDocument, setMyDocument] = useState<any>({
    id: 'doc',
    version: TldrawApp.version,
    pages: {
      page1: {
        id: 'page1',
        shapes: {},
        bindings: {},
      },
    },
    pageStates: {
      page1: {
        id: 'page1',
        selectedIds: [],
        currentParentId: 'page1',
        camera: {
          point: [0, 0],
          zoom: 1,
        },
      },
    },
    assets: {},
  })

  const [url, setUrl] = useState<any>()
  const [base64Data, setBase64Data] = useState<any>()
  const fileSystemEvents = useFileSystem();
  const [isSubmit, setIsSubmit] = useState(false)
  const [flowDiagramData, setFlowDiagramData] = useState<any>({
    id: 'doc',
    version: TldrawApp.version,
    pages: {
      page1: {
        id: 'page1',
        shapes: {},
        bindings: {},
      },
    },
    pageStates: {
      page1: {
        id: 'page1',
        selectedIds: [],
        currentParentId: 'page1',
        camera: {
          point: [0, 0],
          zoom: 1,
        },
      },
    },
    assets: {},
  })

  useEffect(() => {
    getStudentCourseTaskDetails()
    handleClickData()
  }, [url])


  const handleExport = React.useCallback(async (app: TldrawApp, info: TDExport) => {
    // When a user exports, the default behavior is to download
    // the exported data as a file. If the onExport callback is
    // provided, it will be called instead.

    // Download the file
    const blobUrl = URL.createObjectURL(info.blob)
    const link = document.createElement('a')
    link.href = blobUrl
    console.log("urlll", link, "ooo", info.blob);
    setUrl(link.href)

    // link.download = info.name + '.' + info.type
    // link.click()
  }, [])


  const handleClickData = async () => {

    const xhr = new XMLHttpRequest();
    xhr.open("GET", url);
    xhr.responseType = "arraybuffer";
    xhr.onload = function () {
      const arr: any = new Uint8Array(this.response);
      const raw = String.fromCharCode.apply(null, arr);
      const b64 = btoa(raw);
      if (url) {
        onSubmit(b64)
      }
      setBase64Data(b64)
      // console.log("b64", b64);
    };
    xhr.send();
  };



  const handleExportPNG = React.useCallback(() => {
    flowDiagramData?.exportImage(TDExportType.PNG, { scale: 1, quality: 3, color: 'white' })
  }, [flowDiagramData])

  // function trigger() {
  //   const event = new KeyboardEvent('keypress', {
  //     key: 'enter',
  //   });

  // }


  const onSubmit = (base64) => {
    let date = moment().format("YYYY-MM-DD")


    const params = {
      start_date: date,
      ...((getStudentTaskDetails[0]?.student_course_task_meta_id) && { id: getStudentTaskDetails[0]?.student_course_task_meta_id }),
      base_status: "ST",
      is_inprogress: true,
      task_meta_id: getStudentTaskDetails[0]?.id,
      formulated_question: studentWrittenQuestion,
      procedure: studentProcedureData,
      flow_diagram: [flowDiagramData.state.document],
      ...(studentProgramData && { program: btoa(studentProgramData) }),
      image_of_flow_diagram: base64
    }

    setIsSubmit(true)

    dispatch(postStudentCourseTasksDetails({
      params,
      onSuccess: (success) => () => {
        goBack()
        setIsSubmit(false)
        if (success) {
          showToast('success', success.message)
        }
      },
      onError: (error: any) => () => {
        setIsSubmit(false)
        if (error?.status_code === 0) {
          showToast("error", error?.error_message)
        }
      }
    }))
  }


  //.............................................................................
  const getStudentCourseTaskDetails = () => {

    const params = {
      student_task_meta_id: getStudentTaskDetails[0]?.student_course_task_meta_id
    }

    dispatch(fetchStudentCourseTasksDetails({
      params,
      onSuccess: (success) => () => {
        console.log("dessssuuc==>", success)
        dispatch(addStudentCourseTaskResponseId(success?.details?.id))
        if (success?.details?.details?.student_course_task?.flow_diagram.length > 0) {
          setMyDocument(success?.details?.details?.student_course_task?.flow_diagram[0])
        }

        dispatch(settingStudentWrittenQuestion(success?.details?.details?.student_course_task?.formulated_question))
        dispatch(settingStudentProcedureData(success?.details?.details?.student_course_task?.procedure ? success?.details?.details?.student_course_task?.procedure : []))
        dispatch(settingStudentFlowDiagramData(success?.details?.details?.student_course_task?.flow_diagram ? success?.details?.details?.student_course_task?.flow_diagram : []))
        dispatch(settingStudentProgramData(success?.details?.details?.student_course_task?.program !== null ? atob(success?.details?.details?.student_course_task?.program) : ""))

      },
      onError: () => () => { }
    }))
  }

  return (
    <>
      <div className=" h-100vh pl-2"  >
        <div className="">
          <Tldraw

            document={myDocument}
            onExport={handleExport}
            autofocus
            showMenu={false}
            showStyles={false}
            showZoom={false}
            disableAssets={true}
            showPages={false}
            // {...fileSystemEvents}
            onChange={(app: any) => {
              // setMyDocument(app.state.document)
              setFlowDiagramData(app)
            }}
          />
        </div>
        <div className="" style={{ position: 'absolute', zIndex: 100 }} onClick={() => {
          dispatch(isBackNavigation(true))
        }}>
          <Back />
        </div>
        <div className="mr-5" style={{
          position: 'absolute',
          bottom: 0,
          right: 0,
          zIndex: 100,
          marginBottom: '9px'
        }}>
          <Button text={translate("common.submit")!} isLoading={isSubmit} onClick={() => {
            handleExportPNG()
            handleClickData()
            // trigger()
            if (Object.keys(flowDiagramData.state.document).length !== 0) {
              dispatch(settingStudentFlowDiagramData(flowDiagramData.state.document))
            }
            console.log("123", flowDiagramData.state.document)
          }} />
        </div>
      </div >

    </>

  );
}


export { FlowDiagram }