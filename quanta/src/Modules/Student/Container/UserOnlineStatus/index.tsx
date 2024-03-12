import { icons } from "@Assets"
import { Button, Card, Divider, Image, InputWithImage, NoRecordsFound, Spinner } from "@Components"
import { DynamicHeight } from "@Hooks"
import { translate } from "@I18n"
import { convertToUpperCase, getTimelineRelativeTimeFormat } from "@Utils"
import moment from "moment"
import { useState } from "react"
import { ListGroup, ListGroupItem } from "reactstrap"
import { userOnlineStatusProps } from "./interface"
import { SERVER } from "@Services"

const UserOnlineStatus = ({ onNameClick, onClick, data, onImageClick, className, isViewClick = false, onChange, onSearchClick, isLoading, onBlur, onFocus }: userOnlineStatusProps) => {
  const [isAddClick, setIsAddClick] = useState(isViewClick)


  const dynamicHeight: any = DynamicHeight()



  let currentTime = moment().format("YYYY-MM-DD")
  var fiveMinutesAgoStatus = moment().subtract(5, 'minutes').format("YYYY-MM-DD HH:mm:ss");

  const activeStatus = (value) => {
    if (value) {
      const convert = moment(value).format("YYYY-MM-DD HH:mm:ss")
      console.log("fiveMinutesAgoStatus", fiveMinutesAgoStatus, "convert", convert);

      if (fiveMinutesAgoStatus < convert) {
        return true
      }
    }

    else {
      return false
    }

  }

  const findLastActiveAt = (value) => {

    if (value) {
      const convert = moment(value).format("YYYY-MM-DD")

      if (fiveMinutesAgoStatus < convert) {
        return ''
      }
      else {

        if (convert === currentTime) {
          return getTimelineRelativeTimeFormat(value)
        }
        else {
          return getTimelineRelativeTimeFormat(value)
        }
      }
    }

    else {
      return ''
    }

  }

  return (
    <>
      <Card className={className}
        style={{ height: isAddClick ? dynamicHeight.dynamicWidth <= 1400 ? dynamicHeight.dynamicHeight + 15 : dynamicHeight.dynamicHeight - 50 : "5em" }}>
        <div className="row">
          <div className="col">
            <h3>{translate("admin.activeStatus")}</h3>
            {isAddClick &&
              <div className="mt-3 mb--2 mr--5">
                <InputWithImage image="search" placeholder={translate("auth.search")!} onChange={(text: string) => {
                  if (onChange)
                    onChange(text)
                }} onClick={onSearchClick}
                  onBlur={onBlur}
                  onFocus={onFocus}
                />
              </div>
            }
          </div>
          <div className="text-right pr-3">
            <Button text={isAddClick ? translate("course.hide") : translate("course.view")} size={'sm'} onClick={() => {
              if (onClick) {
                setIsAddClick(!isAddClick)
                onClick(isAddClick)
              }
            }}
            />
          </div>
        </div>

        {isAddClick && <div className={`mt-3 overflow-auto scroll-hidden `}
          style={{ height: isAddClick ? dynamicHeight.dynamicWidth <= 1400 ? dynamicHeight.dynamicHeight - 130 : dynamicHeight.dynamicHeight - 220 : 0 }}

        >

          {data && data.length > 0 ?
            data.map((item: any) => {

              return (
                <>
                  {isLoading &&
                    <div className="mt--6 ml--3">
                      <Spinner />
                    </div>
                  }

                  {!isLoading && (
                    <ListGroup className="list my--3" flush>
                      <ListGroupItem className="ml--2">
                        <div className="row align-items-center">
                          <div className="col-auto">
                            <a
                              className="avatar rounded-circle"
                              // href="#pablo"
                              onClick={onImageClick}
                            >
                              <Image
                                alt="..."
                                size={'md'}
                                variant={'rounded'}
                                src={item?.user_photo ? SERVER + item.user_photo : icons.profile}
                              />
                            </a>
                          </div>
                          <div className="col ml--2">
                            <h4 className="mb-0">
                              <a href="#pablo" onClick={onNameClick}>
                                {convertToUpperCase(item.user_details.name)}
                              </a>
                            </h4>
                            <div className="row m-0">
                              <span className={`text-${activeStatus(item.last_active_time) ? 'success' : 'muted'} mr-1`}>●</span>
                              <h6 className="text-muted ls-1" style={{ marginTop: 6 }}>{item.last_active_time && activeStatus(item.last_active_time) ? 'ONLINE' : 'OFFLINE'}</h6>
                            </div>
                            <div>
                              {/* <h6>{item.last_active_time ? activeStatus(item.last_active_time) ? "" : `Last active:  ${findLastActiveAt(item.last_active_time)}` : ''}</h6> */}
                              <h6>
                                {item.last_active_time ?
                                  activeStatus(item.last_active_time) ? "" :
                                    <span className="text-muted">Last Active: {findLastActiveAt(item.last_active_time)}</span> :
                                  ''}
                              </h6>
                            </div>

                          </div>
                        </div>
                        <Divider space="2" />
                      </ListGroupItem>
                    </ListGroup>
                  )}
                </>

              )
            }) :
            <div className=" d-flex justify-content-center align-items-center mt--5" style={{
              height: '77.6vh'
            }}>

              <NoRecordsFound />
            </div>
          }
        </div>}

      </Card>
    </>
  )
}

export { UserOnlineStatus }

