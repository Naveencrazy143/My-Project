import { Button, Card, Input, DropDown, Back } from '@Components'
import { DynamicHeight, useInput, useNavigation } from '@Hooks'
import { translate } from '@I18n'
import React, { useState } from 'react'
import { Form } from 'reactstrap'
import { useDispatch, useSelector } from "react-redux";
import { isBackNavigation, postRaiseAnonymousComplaint } from '@Redux'
import { convertToUpperCase, showToast } from '@Utils'
import { ROUTES } from '@Routes'


const ISSUE_LIST = [
    { id: "Management", name: 'Management' },
    { id: "Office premises", name: 'Office premises' },
    { id: 'Co-worker', name: 'Co-worker' },
    { id: 'Transit', name: 'Transit' },
    { id: 'Others', name: 'Others' },
]

interface AnonymousComplaintProps {
    zoom?: string
}

function AnonymousComplaint({ zoom = '' }: AnonymousComplaintProps) {

    const [issueType, setIssueType] = useState<any>('')
    const [issueDetails, setIssueDetails] = useState('')
    const [submitLoader, setSubmitLoader] = useState(false)
    const dynamicHeight: any = DynamicHeight()


    const issue = useInput('')
    const dispatch = useDispatch()
    const { goTo } = useNavigation()

    const validateInputFields = () => {
        if (!issueType) {
            showToast('error', 'Issue type cannot be empty')
            return false
        }
        else if (!issue.value) {
            showToast('error', 'Issue field cannot be empty')
            return false
        }
        else if (!issueDetails) {
            showToast('error', 'Issue details field cannot be empty')
            return false
        }
        else {
            return true
        }
    }

    const emptyStates = () => {
        setIssueType("")
        setIssueDetails("")
        issue.set("")
    }

    function handleSubmit() {
        if (validateInputFields()) {

            const params = {
                title: issue.value,
                description: issueDetails,
                tags: issueType
            }
            setSubmitLoader(true)
            dispatch(postRaiseAnonymousComplaint({
                params,
                onSuccess: (success: any) => () => {
                    setSubmitLoader(false)
                    showToast('success', success.message)
                    emptyStates()
                },
                onError: (error: any) => () => {
                    setSubmitLoader(false)
                    if (error?.status_code === 0) {
                        showToast('error', error?.error_message)
                    }
                },
            }))
        }

    }

    return (
        <div className={`container-fluid pt-4 pb-xl-0 pb-1 ${zoom}`} >
            <Card className='overflow-auto scroll-hidden mt-0' style={{ height: dynamicHeight.dynamicWidth <= 1400 ? dynamicHeight.dynamicHeight + 20 : dynamicHeight.dynamicHeight - 50 }}>
                <div className=''
                    onClick={() => {
                        dispatch(isBackNavigation(true))
                    }}>
                    <Back text={translate("anonymousComplaint.title")!} />
                    <h5 className='mt--2  font-weight-normal text-muted'>{translate("anonymousComplaint.subText")!}</h5>
                </div>

                <Form className='mt-5'>
                    <DropDown
                        heading={translate("anonymousComplaint.issueType")!}
                        placeholder={translate("anonymousComplaint.issueType")!}
                        data={ISSUE_LIST}
                        value={issueType}
                        onChange={(e) => {
                            setIssueType(e.target.value)
                        }}
                    />
                    <div className='mt-5'>
                        <Input
                            id={'Issue'}
                            heading={translate("anonymousComplaint.issue")!}
                            placeholder={translate("anonymousComplaint.issue")!}
                            type={'text'}
                            value={convertToUpperCase(issue.value)}
                            onChange={issue.onChange}
                        />
                    </div>
                    <div>
                        <div className='mb-1 mt-5'>
                            <label className={`form-control-label`}>{translate("anonymousComplaint.issueDetails")!}</label>
                        </div>
                        <textarea
                            id={'Issue Details'}
                            className="form-control"
                            placeholder={translate("anonymousComplaint.issueDetails")!}
                            value={issueDetails}
                            onChange={(e) => {
                                setIssueDetails(convertToUpperCase(e.target.value))
                            }}
                            style={{ resize: 'none', height: '15vh' }}
                        />
                    </div>
                    <div className='text-right mt-5'>
                        <Button
                            isLoading={submitLoader}
                            text={translate('common.submit')}
                            size={'md'}
                            onClick={() => {
                                if (!submitLoader) {
                                    handleSubmit()
                                }
                            }}
                        />
                    </div>
                </Form>
            </Card>
        </div>
    )
}

export { AnonymousComplaint }