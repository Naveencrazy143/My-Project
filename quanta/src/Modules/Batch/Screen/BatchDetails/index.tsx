import { useNavigation } from '@Hooks'
import { AssignBatchToStudent, ScheduledMeetingList } from '@Modules'
import classnames from 'classnames'
import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { Nav, NavItem, NavLink } from 'reactstrap'


const LIST_ITEMS = [
    { id: 1, name: 'BASIC INFO', },
    { id: 2, name: 'BATCH INFO', },
]

function BatchDetails() {

    const [selectedNav, setSelectedNav] = useState<any>(1)
    const dispatch = useDispatch()

    const { goTo } = useNavigation()

    return (
        <div className='container-fluid pt-4'>
            <div className='row '>
                {LIST_ITEMS && LIST_ITEMS.map((el) => {
                    return (
                        <>
                            <div className='col-sm-6'>
                                <Nav
                                    className="nav-fill flex-column flex-sm-row pointer"
                                    id="tabs-text"
                                    pills
                                    role="tablist"
                                >
                                    <NavItem>
                                        <NavLink
                                            aria-selected={selectedNav === el.id}
                                            className={classnames("mb-sm-3 mb-md-0", {
                                                active: selectedNav === el.id
                                            })}
                                            onClick={() => {
                                                setSelectedNav(el?.id)
                                            }}
                                            role="tab"
                                        >
                                            {el.name}
                                        </NavLink>
                                    </NavItem>
                                </Nav>
                            </div>
                        </>
                    )
                })

                }
            </div>
            <div className='pt-4'>
                <div>
                    {selectedNav === 1 && <ScheduledMeetingList />}
                    {selectedNav === 2 && <AssignBatchToStudent />}
                </div>
            </div>
        </div>

    )
}

export { BatchDetails }
