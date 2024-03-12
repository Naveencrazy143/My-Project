import { Back, Button } from "@Components";
import { useNavigation } from '@Hooks';
import { translate } from "@I18n";
import { fetchGuestTaskDetails, isBackNavigation, postAddTaskByGuest, settingStudentFlowDiagramData, settingStudentProcedureData, settingStudentProgramData, settingStudentWrittenQuestion } from '@Redux';
import { showToast } from "@Utils";
import { TDExport, TDExportType, Tldraw, TldrawApp, useFileSystem } from "@tldraw/tldraw";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

const ACTION = 'download' as 'download' | 'open'

const GuestFlowDiagram = () => {

  const dispatch = useDispatch();
  const { goTo, goBack } = useNavigation()

  const { getStudentTaskDetails, studentWrittenQuestion, studentProcedureData, addStudentTaskResponseId, studentProgramData } = useSelector(
    (state: any) => state.DashboardReducer
  );

  const { selectedGuestTask } = useSelector(
    (state: any) => state.GuestReducer
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
    getGuestTaskDetails()
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


  const onSubmit = (base64) => {

    const params = {
      id: selectedGuestTask?.task_meta_details?.id,
      flow_diagram: [flowDiagramData.state.document],
      image_of_flow_diagram: base64
    }

    dispatch(postAddTaskByGuest({
      params,
      onSuccess: (success: any) => () => {
        showToast('success', success.message)
        goBack()
        // disableCopyRightClickDnd(false)

      },
      onError: (error: string) => () => {

      },
    }))

  }

  const getGuestTaskDetails = () => {
    const params = {
      task_meta_id: selectedGuestTask?.task_meta_details?.id,
    }

    dispatch(fetchGuestTaskDetails({
      params,
      onSuccess: (success) => () => {
        if (success?.details?.task_answer_details?.flow_diagram.length > 0) {
          setMyDocument(success?.details?.task_answer_details?.flow_diagram[0])
        }
        // dispatch(settingStudentWrittenQuestion(success?.details?.task_answer_details?.formulated_question))
        dispatch(settingStudentProcedureData(success?.details?.task_answer_details?.procedure))
        dispatch(settingStudentFlowDiagramData(success?.details?.task_answer_details?.flow_diagram))
        dispatch(settingStudentProgramData(success?.details?.task_answer_details?.program !== null ? atob(success?.details?.task_answer_details?.program) : ""))

      },
      onError: (error) => () => {
      }
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
          <Button text={translate("common.submit")} onClick={() => {
            handleExportPNG()
            handleClickData()
            // trigger()
            if (Object.keys(flowDiagramData.state.document).length !== 0) {
              dispatch(settingStudentFlowDiagramData(flowDiagramData.state.document))
            }
          }} />
        </div>
      </div >

    </>

  );
}


export { GuestFlowDiagram };
