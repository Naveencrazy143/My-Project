import { Button, Card, Checkbox } from '@Components';
import { ListTypeComponent } from '@Modules';
import { fetchTaskObject } from '@Redux';
// import html2canvas from 'html2canvas';
import { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigation } from '@Hooks';
import { filteredName, showToast } from '@Utils';

function DownloadAsImage() {
  const questionRef = useRef<any>(null);
  const codeRef = useRef<any>(null);
  const sampleIORef = useRef<any>(null);
  const flowDiagramRef = useRef<any>(null);
  const procedureRef = useRef<any>(null);
  const rulesRef = useRef<any>(null);
  const [style, setStyle] = useState<any>()
  const [margin, setMargin] = useState<any>()
  const [padding, setPadding] = useState<any>()
  const dispatch = useDispatch();
  const { goTo, goBack } = useNavigation()
  const ref = useRef<any>(null);






  const viewTaskRef = [
    { id: "QT", ref: questionRef, name: "Question" },
    { id: "IT", ref: sampleIORef, name: "SampleIO" },
    { id: "RT", ref: rulesRef, name: "Rules" },
    { id: "PT", ref: procedureRef, name: "Procedure" },
    { id: "FT", ref: flowDiagramRef, name: "Flow_Diagram" },
    { id: "CT", ref: codeRef, name: "Code" },

  ]
  const [array, setArray] = useState<any>([])




  const { getTaskObject } = useSelector(
    (state: any) => state.GuestReducer
  );
  const [checkedTaskType, setCheckedTaskType] = useState<any>([])

  function checkedCoursesHandler(evt: any) {
    const isChecked = evt.target.checked;
    if (isChecked) {
      setCheckedTaskType([...checkedTaskType as never, evt.target.id as never])
    } else {
      let filtered = checkedTaskType.filter(item => item !== evt.target.id)
      setCheckedTaskType(filtered)
    }
    console.log("hi")

  }

  console.log("checkedTaskType", checkedTaskType)



  useEffect(() => {
    // downloadImage()
    let count = Math.round(getTaskObject?.question.length / 2013)

    getCurrentNodeRecursive(getTaskObject?.question, count)


  }, [array])

  const filteredName1 = () => {
    if (getTaskObject?.question.length > 2013) {
      console.log("filteredName1", getTaskObject?.question.substring(0, 2013))

      console.log("filteredName13", getTaskObject?.question.substring(2013, 4016))
    }
    else {
      // console.log("filteredName12", getTaskObject?.question.substring(0, 2013))
    }
  }


  // const getCurrentNodeRecursive = async (
  //   arr: any,
  //   count: number
  // ) => {
  //   let length = 0
  //   let subLength = 2013

  //   for (let i = 0; i < count; i++) {
  //     console.log("count", length, subLength)
  //     if (arr.length > 2013) {

  //       array.push({
  //         id: 'QT' + (array.length + 1),
  //         value: getTaskObject?.question.substring(length, subLength),
  //         ref: ref
  //       })
  //       length = length + 2013
  //       subLength = subLength + 2013

  //     }
  //   }

  // }

  const getCurrentNodeRecursive = (arr: any, count: number) => {

    let length = 0;
    let subLength = 2013;
    for (let i = 0; i < count; i++) {

      console.log("count", length, subLength);
      if (arr.length > 0) {
        array.push(
          {
            id: "QT" + (array.length + 1),
            value: arr.substring(length, subLength),
            ref,
          },
        );
        length = length + 2013;
        subLength = subLength + 2013;
      }
    }
  };

  // let gggx

  // async function downloadImage() {

  //   if (checkedTaskType.length === 0) {
  //     showToast("error", 'Please Select any of the Checkbox to Download Image ')
  //   }
  //   else {
  //     await setStyle("d-none")
  //     await setPadding('50px 220px 100px 60px')
  //     viewTaskRef.forEach((el) => {
  //       checkedTaskType.forEach((type) => {
  //         if (el.id === type) {
  //           html2canvas(el.ref.current, { width: 1200, height: 627, backgroundColor: "rgb(10, 168, 244)", }).then(canvas => {
  //             const imgData = canvas.toDataURL('image/png');
  //             const link = document.createElement('a');
  //             link.download = `${(el.name)}.EDAT-image.png`;
  //             link.href = imgData;
  //             link.click();
  //           })
  //         }
  //         else {

  //         }
  //       });
  //     })
  //   }

  //   setStyle("")
  //   setPadding("")
  //   setCheckedTaskType([])
  // }

  return (
    <div className='container-fluid zoom pt-4' style={{ backgroundImage: "linear-gradient(315deg, rgb(4, 93, 233) 0%, rgb(9, 198, 500) 74%)" }}>
      {/* {array.map((el: any) => {
        console.log("el===>", el)
        return (
          <>
            <div className='' ref={el.ref} style={{ margin: margin, padding: padding }}>
              <Card className='' style={{ backgroundColor: ' rgba(0,0,0,.75)' }}>
                <div className='row justify-content-between'>
                  <h2 className='text-white ml-3'>{"Question"}</h2>
                  <div className={`mr-2 ${style}`}>
                    <Checkbox
                      id={'QT'}
                      text={''}
                      onCheckChange={(e) => checkedCoursesHandler(e)}
                      checked={checkedTaskType.includes("QT")}
                    />
                  </div>
                </div>
                <p className='text-white text-justify'>{el.value}</p>
                <p className={`text-right mb--3 ${!style ? 'd-none' : ''}`} style={{ color: "rgb(9, 191, 254)", fontSize: '10px' }}> {"@Powered by "}<strong>{"EDAT"}</strong></p>
              </Card>
            </div>
          </>
        )
      })} */}
      <div className='pointer ml--2 mb-4'>
        <i style={{ WebkitTextStroke: "0.7px" }} className="bi bi-arrow-left text-white fa-lg pl-3" onClick={() => {
          dispatch(fetchTaskObject(undefined))
          goBack()
        }}></i>
        <span className='h3 pl-2 text-white  '>{"View"}</span>
      </div>
      <div className='' ref={questionRef} style={{ margin: margin, padding: padding }}>
        <Card className='' style={{ backgroundColor: ' rgba(0,0,0,.75)' }}>
          <div className='row justify-content-between'>
            <h2 className='text-white ml-3'>{"Question"}</h2>
            <div className={`mr-2 ${style}`}>
              <Checkbox
                id={'QT'}
                text={''}
                onCheckChange={(e) => checkedCoursesHandler(e)}
                checked={checkedTaskType.includes("QT")}
              />
            </div>
          </div>
          <p className='text-white text-justify'>{getTaskObject?.question}</p>
          <p className={`text-right mb--3 ${!style ? 'd-none' : ''}`} style={{ color: "rgb(9, 191, 254)", fontSize: '10px' }}> {"@Powered by "}<strong>{"EDAT"}</strong></p>
        </Card>
      </div>
      <div className='' ref={sampleIORef} style={{ margin: margin, padding: padding }} >
        <Card className='' style={{ backgroundColor: ' rgba(0,0,0,.75)' }}>
          <div>
            {getTaskObject && getTaskObject?.sampleIO && getTaskObject?.sampleIO.length > 0 && getTaskObject?.sampleIO.map((el) => {
              return (
                <>
                  <div className='row justify-content-between'>
                    <h2 className='text-white ml-3'>{"Sample I/O"}</h2>
                    <div className={`mr-2 ${style}`}>
                      <Checkbox
                        id={'IT'}
                        text={''}
                        onCheckChange={(e) => checkedCoursesHandler(e)}
                        checked={checkedTaskType.includes("IT")}
                      />
                    </div>
                  </div>
                  <div className='row justify-content-around '>
                    <div>
                      <h4 className='text-white '>{"Sample Input"}</h4>
                      <ul className='text-white text-justify ml--4'>
                        {el.input.map((it) => {
                          return (
                            <>
                              <li className=' font-weight-light' style={{ fontSize: '14px' }}>{it.value}</li>
                            </>
                          )
                        })
                        }
                      </ul >
                    </div>
                    <div>
                      <h4 className='text-white'>{"Sample Output"}</h4>
                      <ul className='text-white ml--4 text-justify'>
                        {el.output.map((it) => {
                          return (
                            <>
                              <li className=' font-weight-light' style={{ fontSize: '14px' }}>{it.value}</li>
                            </>
                          )
                        })
                        }
                      </ul >
                    </div>
                  </div>
                </>
              )
            })

            }
          </div >
          <p className={`text-right mb--3 ${!style ? 'd-none' : ''}`} style={{ color: "rgb(9, 191, 254)", fontSize: '10px' }}> {"@Powered by "}<strong>{"EDAT"}</strong></p>
        </Card>
      </div>
      <div className='' ref={rulesRef} style={{ margin: margin, padding: padding }}>
        <ListTypeComponent
          title={"Rules"}
          data={getTaskObject?.rules}
          id='RT'
          style={style}
          checkBox
          checked={checkedTaskType.includes("RT")}
          onCheckChange={(e) => checkedCoursesHandler(e)}
        />
      </div>
      <div className='' ref={procedureRef} style={{ margin: margin, padding: padding }} >
        <ListTypeComponent
          title={"Procedure"}
          data={getTaskObject?.procedure}
          id='PT'
          style={style}
          checkBox
          checked={checkedTaskType.includes("PT")}
          onCheckChange={(e) => checkedCoursesHandler(e)}
        />
      </div>
      {/* <div className='p-4' ref={codeRef} style={{ backgroundImage: "linear-gradient(315deg, rgb(4, 93, 233) 0%, rgb(20, 198, 500) 74%)" }}>
        <Card className='' style={{ backgroundColor: ' rgba(0,0,0,.75)' }}>
          <h4 className='text-white'>{"Flow Diagram"}</h4>
          <div className='text-center py-5'>
            <img src={getTaskObject?.flowDiagramImage} alt='...'
              width={'30%'}
              style={{ filter: "invert(100%)" }}></img>
          </div>
        </Card>
      </div> */}
      <div className='' ref={codeRef} style={{ margin: margin, padding: padding }}>
        <Card className='' style={{ backgroundColor: ' rgba(0,0,0,.75)' }}>
          <div className='row justify-content-between'>
            <h2 className='text-white ml-3'>{"Code"}</h2>
            <div className={`mr-2 ${style}`}>
              <Checkbox
                id={'CT'}
                text={''}
                onCheckChange={(e) => checkedCoursesHandler(e)}
                checked={checkedTaskType.includes("CT")}
              />
            </div>
          </div>
          <p className='text-white text-justify'>{getTaskObject?.code}</p>
          <p className={`text-right mb--3 ${!style ? 'd-none' : ''}`} style={{ color: "rgb(9, 191, 254)", fontSize: '10px' }}> {"@Powered by "}<strong>{"EDAT"}</strong></p>
        </Card>
      </div>
      <div className=' pb-4 text-right'>
        <Button style={{ backgroundImage: "linear-gradient(315deg, rgb(4, 93, 233) 0%, rgb(9, 198, 500) 74%)" }}
          text={"Download as Image"}
          size='md'
          onClick={() => {
            // downloadImage()

          }} />
      </div>
    </div>
  );
}

export { DownloadAsImage }
