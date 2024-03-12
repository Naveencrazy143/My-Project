import React, { useState, useRef, useMemo, useCallback, useContext, useEffect } from "react"
import { Button, Card, Image, InputHeading } from "@Components";
import { icons } from "@Assets";
import { translate } from "@I18n";
import { AppContext, useApp } from "@Contexts";
import { settingStudentProcedureData } from "@Redux";
import { useDispatch, useSelector } from "react-redux";
import { showToast } from "@Utils";
import { ListComponent } from "@Modules";

interface Props {
  ref?: any;
  onSubmit?: (value) => void;
  value?: any
  onInputChange?: (value) => void;
  showAddSubmit?: boolean
  isLoading?: boolean
  disabled?: boolean
  showSubmitButton?: boolean

}

const ADD = 1
const UPDATE = 2
const DELETE = 3

const Procedure = React.forwardRef(({ onSubmit, onInputChange, value, ref, showAddSubmit = false, isLoading, disabled = false, showSubmitButton = false }: Props) => {
  const { focus, setFocus } = useApp()
  const dispatch = useDispatch()
  console.log("valueeueeee==>",value)
  // const [focus, setFocus] = useState('')
  const { studentProcedureData, editQuestion} = useSelector((state: any) => state.DashboardReducer);

  const [procedures, setProcedures] = useState<any>(value && value.length > 0 ? value : [
    {
      id: 1, value: "", child: []
    },
  ])
console.log("procedureee value==>",value)
  useEffect(() => {
    if (value && value.length > 0)
      setProcedures(value)
  }, [value])


  const getCurrentNode = (arr: Array<any>, id: string, current: number, updatedValue: string) => {

    const getCurrentNodeRecursive = (
      id: string,
      arr: Array<any>
    ) =>
      arr.forEach((it, index) => {
        if (it.id === id) {

          if (current === DELETE) {
            arr.splice(index, 1);
          }

          if (current === ADD) {
            it.child = [...it.child, {
              id: (Math.random() + 1).toString(36).substring(7), value:
                '', child: []
            }]
          } else if (current === UPDATE) {
            it.value = updatedValue
          }
        }
        else {
          getCurrentNodeRecursive(id, it.child);
        }
      });
    getCurrentNodeRecursive(id, arr);
    return arr;
  };



  const LiComponent = (item, index) => {

    return (
      <>
        <div className="row mt-2">
          <div className="col">
            <h5>{typeof (item.id) == 'number' ? item.id : ''}</h5>
            <textarea
              disabled={disabled}
              id={item.id}
              autoFocus={item.id === focus}
              style={{ resize: "none" }}
              cols={5}
              className="form-control"
              placeholder="Type Here"
              value={item.value}
              onFocus={(e) => {
                var temp_value = e.target.value
                e.target.value = ''
                e.target.value = temp_value
              }}
              onChange={(e) => {
                if (setFocus) {
                  setFocus(item.id)
                  const updatedNode = [...getCurrentNode(procedures, item.id, UPDATE, e.target.value)]
                  dispatch(settingStudentProcedureData(updatedNode))
                  setProcedures(updatedNode)
                }
              }}
            />
          </div>
          {!showAddSubmit && disabled === false &&
            <>
              <div className="mt-4 d-none d-xl-block">
                <div onClick={() => {
                  let updatedNode = [...getCurrentNode(procedures, item.id, DELETE, '')]
                  dispatch(settingStudentProcedureData(updatedNode))

                  setProcedures(updatedNode)

                }}>
                  {item.id !== 1 && (
                    <div>
                      <Image src={icons.deleteGrey} height={20} onClick={() => { }} />
                    </div>
                  )}
                </div>
                <div className='mt-sm-2'>
                  <Button
                    text={'Add Sub'}
                    size={"sm"}
                    onClick={() => {
                      let updatedNode = [...getCurrentNode(procedures, item.id, ADD, '')]
                      dispatch(settingStudentProcedureData(updatedNode))

                      setProcedures(updatedNode)
                    }}
                  />
                </div>
              </div>
              <div className="mt-xl-4 mt-sm-0 mt-3 col-sm-12 d-block d-sm-none">
                <span onClick={() => {
                  let updatedNode = [...getCurrentNode(procedures, item.id, DELETE, '')]
                  dispatch(settingStudentProcedureData(updatedNode))

                  setProcedures(updatedNode)

                }}>
                  {item.id !== 1 && (
                    <div className="float-right">
                      <Image src={icons.deleteGrey} height={20} onClick={() => { }} />
                    </div>
                  )}
                </span>
                <div className='mt-sm-2 mr-2 float-right'>
                  <Button
                    text={'Add Sub'}
                    size={"sm"}
                    onClick={() => {
                      let updatedNode = [...getCurrentNode(procedures, item.id, ADD, '')]
                      dispatch(settingStudentProcedureData(updatedNode))

                      setProcedures(updatedNode)
                    }}
                  />
                </div>
              </div>
            </>
          }

        </div>
        {
          item.child &&
          item.child.map((item: any, index: number) => (
            <div className="ml-3">
              {LiComponent(item, index)}
            </div>
          ))}
      </>
    );
  };


  // const renderInput = () => {
  //   return procedures && procedures.length > 0 && procedures?.map((item: any, index: number) => {
  //     return <LiComponent key={item.id} item={item} index={index} />
  //   })

  // }

  const validateRulesParams = (arr: Array<any>) => {

    let isValid = true

    const getCurrentNodeRecursive = (
      arr: Array<any>
    ) =>
      arr.forEach((it, index) => {

        if (it?.value === '') {
          showToast('error', 'The procedure input field cannot be empty')
          return isValid = false;
        }
        getCurrentNodeRecursive(it.child);
      });

    getCurrentNodeRecursive(arr);
    return isValid;
  };
console.log("procedures========", procedures)
  return (
    <>
      <div className="container-fluid" id="Procedure" ref={ref}>
        {/* <div className='pb-3 display-4'>{translate("guest.procedure")!}</div> */}
        {editQuestion?.editRules ? <ListComponent data={studentProcedureData} title={'Procedure'} isEdit />
        :
        <Card>
          {/* <div className="card-header">
            <h3 className="mb-0 text-dark  p-2">{"Procedure"} </h3>
          </div> */}
          <form id="create-form">
            <div className="row">
              <div className="col-sm-12  my-3 pr-5">
                <h3 className='text-info'>{translate('guest.procedure')!}</h3>

                <div
                  id="tabs-icons-text"
                  role="tablist">
                  {
                    procedures && procedures.length > 0 && procedures?.map((item: any, index: number) => {
                      return LiComponent(item, index)
                    })
                  }
                </div>
                {!showAddSubmit && disabled === false && <div className="text-right mt-4 mr--3">
                  <Button
                    text={translate("guest.addAnother")}
                    size={"sm"}
                    onClick={() => {
                      let newInput = { id: procedures.length + 1, value: '', no: procedures.length + 1, child: [] }
                      dispatch(settingStudentProcedureData([...procedures, newInput]))

                      setProcedures([...procedures, newInput])
                    }}
                  />
                  {!showSubmitButton && (
                    <Button
                      text={translate("common.submit")}
                      size={"sm"}
                      isLoading={isLoading}
                      onClick={() => {
                        if (setFocus) {
                          setFocus('')
                        }
                        const validated = validateRulesParams(procedures)
                        if (validated) {
                          if (onSubmit) {
                            dispatch(settingStudentProcedureData(procedures))

                            onSubmit(procedures)
                          }
                        }


                        console.log(JSON.stringify(procedures) + "=====adad==");

                      }}
                    />
                  )}
                </div>}
              </div>
            </div>
          </form>
        </Card>}
      </div>
    </>
  )
}
)

export { Procedure };