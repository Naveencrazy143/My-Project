import React from 'react'
import { DropDownMenuArrowProps } from './interface'

import { UncontrolledDropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap'
import { useNavigation } from '@Hooks'
import { ROUTES } from '@Routes'
import { translate } from '@I18n'

function DropDownMenuArrow({ onAddClick, onDeleteClick, onAssignCourse, isStudent = false, showEdit = false, isAddChild = false, onAddChild, onAddRemark,onVideoCall, showDelete = false, disabled = false, isVideoCall = false }: DropDownMenuArrowProps) {
  const { goTo } = useNavigation()

  return (
    <div>
      <UncontrolledDropdown>
        <DropdownToggle
          disabled={disabled}
          color=""
          size="sm"
          className="btn-icon-only text-light shadow-none"
          onClick={(e) =>
            e.stopPropagation()
          }
        >
          <i className="fas fa-ellipsis-v" />
        </DropdownToggle>
        <DropdownMenu className="dropdown-menu-arrow" right>
          {/* shadow-none border border-black */}
          {/* {isStudent && (
            <DropdownItem
              // href="#pablo"
              onClick={(e) => { if (onAssignCourse) { onAssignCourse(e) } }}
            >
              {translate("course.assignCourse")}
            </DropdownItem>
          )} */}
          {isStudent && (
            <DropdownItem
              // href="#pablo"
              onClick={(e) => { if (onAddRemark) { onAddRemark(e) } }}
            >
              {translate("admin.remark")}
            </DropdownItem>
          )}
          {!showEdit && (
            <DropdownItem
              // href="#pablo"
              onClick={(e) => { if (onAddClick) { onAddClick(e) } }}
            >
              {translate("common.edit")}
            </DropdownItem>
          )}
          {!showDelete && <DropdownItem
            // href="#pablo"
            onClick={(e) => { if (onDeleteClick) { onDeleteClick(e) } }}
          >
            {translate("common.delete")}
          </DropdownItem>}

          {isAddChild && (
            <DropdownItem
              // href="#pablo"
              onClick={(e) => { if (onAddChild) { onAddChild(e) } }}
            >
              {translate("course.addChild")}
            </DropdownItem>
          )}

          {isVideoCall && (
            <DropdownItem
              // href="#pablo"
              onClick={(e) => { if (onVideoCall) { onVideoCall(e) } }}
            >
              {"Video Call"}
            </DropdownItem>
          )}
        </DropdownMenu>
      </UncontrolledDropdown>
    </div>
  )
}

export { DropDownMenuArrow }

