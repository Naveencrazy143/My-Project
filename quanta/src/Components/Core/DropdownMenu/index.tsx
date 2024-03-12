import { DropDownMenuArrowProps } from './interface'

import { UncontrolledDropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap'
import { useNavigation } from '@Hooks'

function DropDownMenu({ data, onItemClick, disabled = false }: DropDownMenuArrowProps) {
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

                    {data && data.length > 0 && data.map((el: any) => {
                        return (
                            <DropdownItem
                                onClick={(e) => { if (onItemClick) { onItemClick(e, el) } }}>
                                {el.name}
                            </DropdownItem>
                        )
                    })}

                </DropdownMenu>
            </UncontrolledDropdown>
        </div>
    )
}

export { DropDownMenu }

